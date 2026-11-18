import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { Part, CheckIn, JournalEntry, PracticeSession, AssessmentResult, UserSettings, TrustTrial, CouncilMeeting, BodySignal, SafeHaven, PartGroup, PracticeProgress, User } from '@/lib/types';

interface InnerHarmonyDB extends DBSchema {
  parts: { key: string; value: Part; indexes: { 'by-group': PartGroup } };
  checkIns: { key: string; value: CheckIn; indexes: { 'by-date': string } };
  journal: { key: string; value: JournalEntry; indexes: { 'by-part': string; 'by-date': string } };
  practice: { key: string; value: PracticeSession; indexes: { 'by-kind': string; 'by-date': string } };
  assessments: { key: string; value: AssessmentResult; indexes: { 'by-date': string } };
  settings: { key: string; value: UserSettings };
  trustTrials: { key: string; value: TrustTrial; indexes: { 'by-partId': string } };
  councils: { key: string; value: CouncilMeeting; indexes: { 'by-date': string } };
  bodySignals: { key: string; value: BodySignal; indexes: { 'by-date': string } };
  haven: { key: string; value: SafeHaven };
  practiceProgress: { key: string; value: PracticeProgress };
  users: { key: string; value: User; indexes: { 'by-email': string } };
}

type StoreName = 'parts' | 'checkIns' | 'journal' | 'practice' | 'assessments' | 'settings' | 'trustTrials' | 'councils' | 'bodySignals' | 'haven' | 'practiceProgress' | 'users';

type StoreValue<S extends StoreName> = InnerHarmonyDB[S]['value'];

const DB_NAME = 'innerharmony';
const DB_VERSION = 4;

/**
 * Declarative schema: every store that must exist at the current DB_VERSION,
 * together with the indexes it should carry. Used to make the `upgrade`
 * callback idempotent and self-healing from ANY previous version.
 */
const STORE_SCHEMA: Array<{ name: StoreName; indexes: Array<[string, string]> }> = [
  { name: 'parts', indexes: [['by-group', 'group']] },
  { name: 'checkIns', indexes: [['by-date', 'date']] },
  { name: 'journal', indexes: [['by-part', 'partId'], ['by-date', 'createdAt']] },
  { name: 'practice', indexes: [['by-kind', 'kind'], ['by-date', 'completedAt']] },
  { name: 'assessments', indexes: [['by-date', 'createdAt']] },
  { name: 'settings', indexes: [] },
  { name: 'trustTrials', indexes: [['by-partId', 'partId']] },
  { name: 'councils', indexes: [['by-date', 'date']] },
  { name: 'bodySignals', indexes: [['by-date', 'date']] },
  { name: 'haven', indexes: [] },
  { name: 'practiceProgress', indexes: [] },
  { name: 'users', indexes: [['by-email', 'email']] },
];

let dbPromise: Promise<IDBPDatabase<InnerHarmonyDB>> | null = null;

/**
 * Ensure every store/index from STORE_SCHEMA exists.
 *
 * IMPORTANT: this runs inside the `upgrade` callback, i.e. inside the
 * versionchange transaction. It must therefore be synchronous and must never
 * call `db.transaction(...)` (that throws InvalidStateError while a
 * versionchange transaction is active and would abort the whole upgrade,
 * surfacing as an `AbortError`).
 */
function ensureSchema(db: IDBPDatabase<InnerHarmonyDB>) {
  // Use the raw IndexedDB API here: store/index names are dynamic, and this
  // keeps the callback free of idb's per-store generic typing. It stays
  // synchronous and only creates what is missing, so it can never throw.
  const raw = db as unknown as IDBDatabase;
  for (const { name, indexes } of STORE_SCHEMA) {
    if (!raw.objectStoreNames.contains(name)) {
      const store = raw.createObjectStore(name, { keyPath: 'id' });
      for (const [indexName, keyPath] of indexes) {
        store.createIndex(indexName, keyPath);
      }
    }
  }
}

/**
 * One-time legacy data migration, run in a NORMAL transaction after the
 * connection is open (never inside the versionchange transaction).
 *
 * v1 stored parts with a `category` field (`manager` | `firefighter` | `exile`)
 * and no `group`. Convert them to the current taxonomy. Idempotent: only
 * records that still have `category` and no `group` are touched.
 */
async function runMigrations(db: IDBPDatabase<InnerHarmonyDB>): Promise<void> {
  const tx = db.transaction('parts', 'readwrite');
  let cursor = await tx.store.openCursor();
  while (cursor) {
    const part = cursor.value as Part & { category?: string };
    if (part.category && !part.group) {
      const groupMap: Record<string, PartGroup> = {
        manager: 'manager',
        firefighter: 'guardian',
        exile: 'innerKid',
      };
      const newGroup = groupMap[part.category] ?? 'manager';
      const updated: Part & { category?: string } = {
        ...part,
        group: newGroup,
        livingInPast: part.category === 'exile' ? true : (part.livingInPast ?? false),
      };
      delete updated.category;
      await cursor.update(updated);
    }
    cursor = await cursor.continue();
  }
  await tx.done;
}

function getDB(): Promise<IDBPDatabase<InnerHarmonyDB>> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB not available on server'));
  }
  if (!dbPromise) {
    const opened = openDB<InnerHarmonyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        ensureSchema(db);
      },
      blocked() {
        console.warn('[db] Upgrade blocked by another open tab/connection.');
      },
      blocking() {
        console.warn('[db] This connection is blocking a newer version; closing so it can upgrade.');
        dbPromise?.then((db) => db.close()).catch(() => {});
      },
      terminated() {
        console.warn('[db] Connection terminated by the browser.');
        dbPromise = null;
      },
    }).catch((err) => {
      // Never permanently poison the cache: allow a later attempt to retry.
      dbPromise = null;
      throw err;
    });

    dbPromise = opened.then(async (db) => {
      try {
        await runMigrations(db);
      } catch (err) {
        // A failed data migration must not break the whole app; schema is intact.
        console.error('[db] Migration failed:', err);
      }
      return db;
    });
  }
  return dbPromise;
}

export interface Repository<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T | undefined>;
  put(item: T): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

function createRepo<S extends StoreName>(storeName: S): Repository<StoreValue<S>> {
  return {
    async getAll() {
      const db = await getDB();
      return db.getAll(storeName);
    },
    async get(id: string) {
      const db = await getDB();
      return db.get(storeName, id);
    },
    async put(item: StoreValue<S>) {
      const db = await getDB();
      await db.put(storeName, item);
    },
    async delete(id: string) {
      const db = await getDB();
      await db.delete(storeName, id);
    },
    async clear() {
      const db = await getDB();
      await db.clear(storeName);
    },
  };
}

export const partsRepo = createRepo('parts');
export const checkInsRepo = createRepo('checkIns');
export const journalRepo = createRepo('journal');
export const practiceRepo = createRepo('practice');
export const assessmentsRepo = createRepo('assessments');
export const settingsRepo = createRepo('settings');
export const trustTrialsRepo = createRepo('trustTrials');
export const councilsRepo = createRepo('councils');
export const bodySignalsRepo = createRepo('bodySignals');
export const havenRepo = createRepo('haven');
export const practiceProgressRepo = createRepo('practiceProgress');
export const usersRepo = createRepo('users');

export async function seedIfNeeded(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const settings = await settingsRepo.get('user');
    if (!settings) {
      await settingsRepo.put({ id: 'user', onboardingComplete: false, displayName: undefined, spiritualityEnabled: false });
    }
  } catch {
    // Ignore errors during seeding
  }
}
