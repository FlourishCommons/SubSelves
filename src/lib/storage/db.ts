import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { Part, CheckIn, JournalEntry, PracticeSession, AssessmentResult, UserSettings, TrustTrial, CouncilMeeting, BodySignal, SafeHaven, PartGroup, PracticeProgress, User, SharedPart, Follow, Heart, Comment, Activity, Notification, ShareRequest, CommunityPart, UserProfile, UserStats } from '@/lib/types';

interface SubSelvesDB extends DBSchema {
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
  sharedParts: { key: string; value: SharedPart; indexes: { 'by-ownerId': string; 'by-visibility': string } };
  follows: { key: string; value: Follow; indexes: { 'by-followerId': string; 'by-followingId': string } };
  hearts: { key: string; value: Heart; indexes: { 'by-targetId': string; 'by-userId': string } };
  comments: { key: string; value: Comment; indexes: { 'by-sharedPartId': string; 'by-userId': string } };
  activities: { key: string; value: Activity; indexes: { 'by-userId': string; 'by-createdAt': string } };
  notifications: { key: string; value: Notification; indexes: { 'by-userId': string; 'by-read': string } };
  shareRequests: { key: string; value: ShareRequest; indexes: { 'by-fromUserId': string; 'by-toUserId': string; 'by-status': string } };
  communityParts: { key: string; value: CommunityPart; indexes: { 'by-curatorId': string; 'by-featured': string } };
}

type StoreName = 'parts' | 'checkIns' | 'journal' | 'practice' | 'assessments' | 'settings' | 'trustTrials' | 'councils' | 'bodySignals' | 'haven' | 'practiceProgress' | 'users' | 'sharedParts' | 'follows' | 'hearts' | 'comments' | 'activities' | 'notifications' | 'shareRequests' | 'communityParts';

type StoreValue<S extends StoreName> = SubSelvesDB[S]['value'];

const DB_NAME = 'subselves';
const DB_VERSION = 5;

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
  { name: 'sharedParts', indexes: [['by-ownerId', 'ownerId'], ['by-visibility', 'visibility']] },
  { name: 'follows', indexes: [['by-followerId', 'followerId'], ['by-followingId', 'followingId']] },
  { name: 'hearts', indexes: [['by-targetId', 'targetId'], ['by-userId', 'userId']] },
  { name: 'comments', indexes: [['by-sharedPartId', 'sharedPartId'], ['by-userId', 'userId']] },
  { name: 'activities', indexes: [['by-userId', 'userId'], ['by-createdAt', 'createdAt']] },
  { name: 'notifications', indexes: [['by-userId', 'userId'], ['by-read', 'read']] },
  { name: 'shareRequests', indexes: [['by-fromUserId', 'fromUserId'], ['by-toUserId', 'toUserId'], ['by-status', 'status']] },
  { name: 'communityParts', indexes: [['by-curatorId', 'curatorId'], ['by-featured', 'featured']] },
];

let dbPromise: Promise<IDBPDatabase<SubSelvesDB>> | null = null;

/**
 * Ensure every store/index from STORE_SCHEMA exists.
 *
 * IMPORTANT: this runs inside the `upgrade` callback, i.e. inside the
 * versionchange transaction. It must therefore be synchronous and must never
 * call `db.transaction(...)` (that throws InvalidStateError while a
 * versionchange transaction is active and would abort the whole upgrade,
 * surfacing as an `AbortError`).
 */
function ensureSchema(db: IDBPDatabase<SubSelvesDB>) {
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
async function runMigrations(db: IDBPDatabase<SubSelvesDB>): Promise<void> {
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

export function getDB(): Promise<IDBPDatabase<SubSelvesDB>> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB not available on server'));
  }
  if (!dbPromise) {
    const opened = openDB<SubSelvesDB>(DB_NAME, DB_VERSION, {
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
export const sharedPartsRepo = createRepo('sharedParts');
export const followsRepo = createRepo('follows');
export const heartsRepo = createRepo('hearts');
export const commentsRepo = createRepo('comments');
export const activitiesRepo = createRepo('activities');
export const notificationsRepo = createRepo('notifications');
export const shareRequestsRepo = createRepo('shareRequests');
export const communityPartsRepo = createRepo('communityParts');

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

/**
 * Clear all data (for testing or account deletion).
 */
export async function clearAllData(): Promise<void> {
  if (typeof window === 'undefined') return;
  const db = await getDB();
  const tx = db.transaction([
    'parts', 'checkIns', 'journal', 'practice', 'assessments',
    'trustTrials', 'councils', 'bodySignals', 'haven', 'practiceProgress',
    'sharedParts', 'follows', 'hearts', 'comments', 'activities',
    'notifications', 'shareRequests', 'communityParts',
    'settings', 'users'
  ], 'readwrite');
  await Promise.all([
    tx.objectStore('parts').clear(),
    tx.objectStore('checkIns').clear(),
    tx.objectStore('journal').clear(),
    tx.objectStore('practice').clear(),
    tx.objectStore('assessments').clear(),
    tx.objectStore('trustTrials').clear(),
    tx.objectStore('councils').clear(),
    tx.objectStore('bodySignals').clear(),
    tx.objectStore('haven').clear(),
    tx.objectStore('practiceProgress').clear(),
    tx.objectStore('sharedParts').clear(),
    tx.objectStore('follows').clear(),
    tx.objectStore('hearts').clear(),
    tx.objectStore('comments').clear(),
    tx.objectStore('activities').clear(),
    tx.objectStore('notifications').clear(),
    tx.objectStore('shareRequests').clear(),
    tx.objectStore('communityParts').clear(),
    tx.objectStore('settings').clear(),
    tx.objectStore('users').clear(),
  ]);
  await tx.done;
}
