import {
  partsRepo,
  checkInsRepo,
  journalRepo,
  practiceRepo,
  assessmentsRepo,
  settingsRepo,
  trustTrialsRepo,
  councilsRepo,
  bodySignalsRepo,
  havenRepo,
  practiceProgressRepo,
  sharedPartsRepo,
  followsRepo,
  heartsRepo,
  commentsRepo,
  activitiesRepo,
  notificationsRepo,
  shareRequestsRepo,
  communityPartsRepo,
} from './db';
import type { Part, CheckIn, JournalEntry, PracticeSession, AssessmentResult, UserSettings, TrustTrial, CouncilMeeting, BodySignal, SafeHaven, PracticeProgress, SharedPart, Follow, Heart, Comment, Activity, Notification, ShareRequest, CommunityPart } from '@/lib/types';

export interface BackupData {
  app: 'subselves';
  version: 3;
  exportedAt: string;
  data: {
    parts: Part[];
    checkIns: CheckIn[];
    journal: JournalEntry[];
    practice: PracticeSession[];
    assessments: AssessmentResult[];
    settings: UserSettings[];
    trustTrials: TrustTrial[];
    councils: CouncilMeeting[];
    bodySignals: BodySignal[];
    haven: SafeHaven[];
    practiceProgress: PracticeProgress[];
    sharedParts: SharedPart[];
    follows: Follow[];
    hearts: Heart[];
    comments: Comment[];
    activities: Activity[];
    notifications: Notification[];
    shareRequests: ShareRequest[];
    communityParts: CommunityPart[];
  };
}

type StoreKey = keyof BackupData['data'];

interface StoreConfig<K extends StoreKey> {
  name: K;
  repo: {
    getAll(): Promise<BackupData['data'][K]>;
    clear(): Promise<void>;
    put(item: BackupData['data'][K][number]): Promise<void>;
  };
}

const STORES: StoreConfig<StoreKey>[] = [
  { name: 'parts', repo: partsRepo },
  { name: 'checkIns', repo: checkInsRepo },
  { name: 'journal', repo: journalRepo },
  { name: 'practice', repo: practiceRepo },
  { name: 'assessments', repo: assessmentsRepo },
  { name: 'settings', repo: settingsRepo },
  { name: 'trustTrials', repo: trustTrialsRepo },
  { name: 'councils', repo: councilsRepo },
  { name: 'bodySignals', repo: bodySignalsRepo },
  { name: 'haven', repo: havenRepo },
  { name: 'practiceProgress', repo: practiceProgressRepo },
  { name: 'sharedParts', repo: sharedPartsRepo },
  { name: 'follows', repo: followsRepo },
  { name: 'hearts', repo: heartsRepo },
  { name: 'comments', repo: commentsRepo },
  { name: 'activities', repo: activitiesRepo },
  { name: 'notifications', repo: notificationsRepo },
  { name: 'shareRequests', repo: shareRequestsRepo },
  { name: 'communityParts', repo: communityPartsRepo },
];

export async function exportBackup(): Promise<BackupData> {
  const data: BackupData['data'] = {
    parts: [] as Part[],
    checkIns: [] as CheckIn[],
    journal: [] as JournalEntry[],
    practice: [] as PracticeSession[],
    assessments: [] as AssessmentResult[],
    settings: [] as UserSettings[],
    trustTrials: [] as TrustTrial[],
    councils: [] as CouncilMeeting[],
    bodySignals: [] as BodySignal[],
    haven: [] as SafeHaven[],
    practiceProgress: [] as PracticeProgress[],
    sharedParts: [] as SharedPart[],
    follows: [] as Follow[],
    hearts: [] as Heart[],
    comments: [] as Comment[],
    activities: [] as Activity[],
    notifications: [] as Notification[],
    shareRequests: [] as ShareRequest[],
    communityParts: [] as CommunityPart[],
  };

  for (const store of STORES) {
    (data as Record<StoreKey, unknown[]>)[store.name] = await store.repo.getAll();
  }

  return {
    app: 'subselves',
    version: 3,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackup(backup: BackupData): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date(backup.exportedAt).toISOString().split('T')[0];
  a.download = `subselves-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function isBackupData(backup: unknown): backup is BackupData {
  if (!backup || typeof backup !== 'object') return false;
  const b = backup as Record<string, unknown>;
  if (b.app !== 'subselves') return false;
  if (b.version !== 1 && b.version !== 2 && b.version !== 3) return false;
  if (typeof b.exportedAt !== 'string') return false;
  if (!b.data || typeof b.data !== 'object') return false;
  const data = b.data as Record<string, unknown>;
  for (const store of STORES) {
    if (!Array.isArray(data[store.name])) return false;
  }
  return true;
}

export { isBackupData as validateBackup };

export async function importBackup(backup: BackupData): Promise<void> {
  for (const store of STORES) {
    await store.repo.clear();
    const records = backup.data[store.name] ?? [];
    for (const record of records) {
      await store.repo.put(record);
    }
  }
}

export async function eraseAllData(): Promise<void> {
  for (const store of STORES) {
    await store.repo.clear();
  }
}

export function getBackupSummary(backup: BackupData): string {
  const lines = ['This backup contains:'];
  for (const store of STORES) {
    const count = backup.data[store.name].length;
    if (count > 0) {
      lines.push(`  • ${store.name}: ${count} record${count !== 1 ? 's' : ''}`);
    }
  }
  lines.push('');
  lines.push('⚠️ This will REPLACE all your current data. Continue?');
  return lines.join('\n');
}