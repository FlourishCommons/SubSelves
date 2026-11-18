'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usersRepo } from '@/lib/storage/db';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import type { PublicUser, User } from '@/lib/types';

const SESSION_KEY = 'innerharmony.currentUserId';
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  displayName?: string;
  onboardingComplete?: boolean;
}

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  register: (input: RegisterInput) => Promise<PublicUser>;
  login: (input: LoginInput) => Promise<PublicUser>;
  logout: () => void;
  updateUser: (id: string, input: UpdateUserInput) => Promise<PublicUser>;
  deleteUser: (id: string) => Promise<void>;
  listUsers: () => Promise<PublicUser[]>;
  getCurrentUser: () => PublicUser | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function assertValidEmail(email: string): void {
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error('Enter a valid email address.');
  }
}

function assertValidPassword(password: string): void {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
}

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    onboardingComplete: user.onboardingComplete,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function readSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function writeSessionId(id: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (id) {
      window.localStorage.setItem(SESSION_KEY, id);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Storage can be unavailable in private modes; the in-memory session still works.
  }
}

async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await usersRepo.getAll();
  return users.find((user) => user.email === email);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      const sessionId = readSessionId();
      if (!sessionId) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const stored = await usersRepo.get(sessionId);
        if (mounted) {
          if (stored) {
            setUser(toPublicUser(stored));
          } else {
            writeSessionId(null);
          }
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        writeSessionId(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<PublicUser> => {
    const email = normalizeEmail(input.email);
    const displayName = input.displayName.trim();

    assertValidEmail(email);
    assertValidPassword(input.password);

    if (!displayName) {
      throw new Error('Display name is required.');
    }

    if (await findUserByEmail(email)) {
      throw new Error('An account with that email already exists.');
    }

    const now = new Date().toISOString();
    const created: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash: await hashPassword(input.password),
      displayName,
      onboardingComplete: false,
      createdAt: now,
      updatedAt: now,
    };

    await usersRepo.put(created);
    writeSessionId(created.id);
    const publicUser = toPublicUser(created);
    setUser(publicUser);
    return publicUser;
  }, []);

  const login = useCallback(async (input: LoginInput): Promise<PublicUser> => {
    const email = normalizeEmail(input.email);
    assertValidEmail(email);

    if (!input.password) {
      throw new Error('Password is required.');
    }

    const stored = await findUserByEmail(email);
    const passwordMatches = stored
      ? await verifyPassword(input.password, stored.passwordHash)
      : false;

    if (!stored || !passwordMatches) {
      throw new Error('Invalid email or password.');
    }

    writeSessionId(stored.id);
    const publicUser = toPublicUser(stored);
    setUser(publicUser);
    return publicUser;
  }, []);

  const logout = useCallback(() => {
    writeSessionId(null);
    setUser(null);
  }, []);

  const updateUser = useCallback(
    async (id: string, input: UpdateUserInput): Promise<PublicUser> => {
      const existing = await usersRepo.get(id);
      if (!existing) {
        throw new Error('Account not found.');
      }

      const updated: User = {
        ...existing,
        updatedAt: new Date().toISOString(),
      };

      if (input.displayName !== undefined) {
        const displayName = input.displayName.trim();
        if (!displayName) throw new Error('Display name is required.');
        updated.displayName = displayName;
      }

      if (input.email !== undefined) {
        const email = normalizeEmail(input.email);
        assertValidEmail(email);
        const duplicate = await findUserByEmail(email);
        if (duplicate && duplicate.id !== id) {
          throw new Error('An account with that email already exists.');
        }
        updated.email = email;
      }

      if (input.password !== undefined) {
        assertValidPassword(input.password);
        updated.passwordHash = await hashPassword(input.password);
      }

      if (input.onboardingComplete !== undefined) {
        updated.onboardingComplete = input.onboardingComplete;
      }

      await usersRepo.put(updated);
      const publicUser = toPublicUser(updated);
      setUser((current) => (current?.id === id ? publicUser : current));
      return publicUser;
    },
    []
  );

  const deleteUser = useCallback(
    async (id: string): Promise<void> => {
      await usersRepo.delete(id);
      setUser((current) => {
        if (current?.id !== id) return current;
        writeSessionId(null);
        return null;
      });
    },
    []
  );

  const listUsers = useCallback(async (): Promise<PublicUser[]> => {
    const users = await usersRepo.getAll();
    return users
      .map(toPublicUser)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }, []);

  const getCurrentUser = useCallback(() => user, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
      updateUser,
      deleteUser,
      listUsers,
      getCurrentUser,
    }),
    [
      user,
      loading,
      register,
      login,
      logout,
      updateUser,
      deleteUser,
      listUsers,
      getCurrentUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
