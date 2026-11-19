// ───────────────────────────────────────────────────────────────────────────
// SubSelves — core domain types
//
// Taxonomy is theory-faithful (see docs/theory/theory-mapping.md §3):
//   Groups: manager (Guiding Voices) | guardian (Protective Voices)
//           | innerKid (Young Voices) | spiritual (Guiding Presence, optional)
//   "Living in the past" and "disowned" are FLAGS, not groups.
// IFS-branded terms (firefighter/exile) are intentionally NOT used.
// ───────────────────────────────────────────────────────────────────────────

export type PartGroup = 'manager' | 'guardian' | 'innerKid' | 'spiritual';

export type PartStatus =
  | 'meeting'
  | 'dialoguing'
  | 'trusting'
  | 'retrained'
  | 'reassigned';

/** A sensation selected for a specific body region on a part. */
export interface SelectedSensation {
  sensationId: string;
  intensity: number;
  bodyRegionId: string;
}

export interface Part {
  id: string;
  name: string;
  group: PartGroup;
  /** The part's current job / role in the inner system. */
  role: string;
  /** Optional finer description of what the part does for you. */
  primaryJob?: string;
  /** Does the part like its job? (from the first-interview question set) */
  likesJob?: boolean;
  /** What the part believes would happen if it stopped doing its job. */
  wouldHappenIfStop?: string;
  age?: number | string;
  gender?: string;
  /** Free-text or reference to an image the part presents as. */
  image?: string;
  /** Core fear this part holds. */
  fear: string;
  /** Underlying need this part is trying to meet. */
  needs?: string;
  primaryEmotion?: string;
  bodyLocation?: string;
  /** Part is stuck in the past / trauma era (theory's "exile" state). */
  livingInPast?: boolean;
  /** Part pushed outside awareness (disowned). */
  disowned?: boolean;
  /** Self-trust level, 0–5 (from trust-building trials). */
  trustLevel?: number;
  /** Ids of parts (usually innerKid) this part protects. */
  protectiveOf?: string[];
  /** Ids of parts this part works well with. */
  alliances?: string[];
  /** Ids of parts this part is in opposition with (polarization). */
  conflicts?: string[];
  status?: PartStatus;
  /** New role negotiated during reassignment. */
  newRole?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;

  /** Mapped body sensations for this part (from BodyAwareness). */
  bodySensations?: SelectedSensation[];

  // Interview profile fields (all optional, additive)
  /** Its message or complaint */
  message?: string;
  /** What it wants me to know */
  wantsMeToKnow?: string;
  /** What it would rather be doing */
  ratherBeDoing?: string;
  /** Thinks I am this age */
  thinksIAmAge?: number | string;
  /** Trust the self (Yes/No) */
  trustsSelf?: boolean;
  /** Other part it's protecting (free text) */
  protecting?: string;
  /** Image Type */
  imageType?: string;
}

export interface EightCs {
  calm: number;
  curious: number;
  clear: number;
  compassionate: number;
  confident: number;
  creative: number;
  courageous: number;
  connected: number;
}

export interface CheckIn {
  id: string;
  date: string;
  mood: number;
  /** Part observed during the check-in. */
  activePartId?: string;
  /** Part that appears to be "driving" right now. */
  drivingPartId?: string;
  blended: boolean;
  /** Whether Self appeared to be leading this moment. */
  selfLed?: boolean;
  eightCs: EightCs;
  notes?: string;
}

export type JournalKind =
  | 'dialogue'
  | 'reflection'
  | 'unburdening'
  | 'interview'
  | 'conflict'
  | 'rescue'
  | 'council'
  | 'dream';

export type JournalChannel = 'text' | 'voice' | 'image' | 'body' | 'dream';

export interface JournalEntry {
  id: string;
  partId?: string;
  prompt?: string;
  body: string;
  kind: JournalKind;
  channel?: JournalChannel;
  bodyLocation?: string;
  createdAt: string;
}

export type PracticeKind =
  | 'goingInside'
  | 'dialogue'
  | 'selfEnergy'
  | 'unblending'
  | 'rescuing'
  | 'reassignment'
  | 'safeHaven'
  | 'teamwork';

export type JourneyPhase = 1 | 2 | 3 | 4 | 5;

export interface PracticeSession {
  id: string;
  kind: PracticeKind;
  /** Which of the 5 journey phases this session belongs to. */
  phase?: JourneyPhase;
  /** Named technique used (e.g. "first interview", "change chairs"). */
  technique?: string;
  targetPartIds?: string[];
  /** Did Self lead this session? */
  selfLed?: boolean;
  /** Count of blending events noticed during the session. */
  blendingEvents?: number;
  /** Journal entries captured during the guided practice (in order). */
  journalEntryIds?: string[];
  completedAt: string;
  durationSec?: number;
  notes?: string;
}

/** A trial period where a distrustful part watches Self lead (theory p.6/p.7). */
export interface TrustTrial {
  id: string;
  partId: string;
  startedAt: string;
  endedAt?: string;
  selfKeptSafe?: boolean;
  partFeedback?: string;
}

/** Inner council meeting (phase 5; may ship in v1.1). */
export interface CouncilMeeting {
  id: string;
  date: string;
  agenda: string[];
  attendeePartIds: string[];
  decisions: string[];
  minutes?: string;
}

/** A logged physical sensation — one of the communication channels. */
export interface BodySignal {
  id: string;
  date: string;
  sensation: string;
  location?: string;
  intensity?: number;
  partId?: string;
}

/** User's chosen safe/comfortable place used in rescuing & dialogs. */
export interface SafeHaven {
  id: string;
  placeDescription: string;
  presenceFigure?: string;
  updatedAt: string;
}

export type AssessmentKind = 'teamMap' | 'pulse' | 'spotter' | 'grouping';

export interface AssessmentResult {
  id: string;
  createdAt: string;
  kind: AssessmentKind;
  answers?: Record<string, string>;
  /** Groups the light "grouping" starter suggests seeding, if used. */
  suggestedGroups?: PartGroup[];
  /** Self-leadership pulse score (0–10), for kind 'pulse'. */
  selfLeadershipScore?: number;
}

/** Saved in-progress state for a guided practice, so it can be resumed. */
export interface PracticeProgress {
  /** One saved progress per practice kind (id === kind). */
  id: string;
  kind: PracticeKind;
  /** Index of the step the user is currently on. */
  stepIndex: number;
  /** Selected part ids keyed by step id (choosePart steps). */
  partSelections: Record<string, string[]>;
  /** Journal entry ids keyed by step id (journal steps). */
  journalEntryIds: Record<string, string>;
  /** Free-form note captured for the final reflection step, if any. */
  reflection?: string;
  startedAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string;
  onboardingComplete: boolean;
  displayName?: string;
  /** Optional spirituality / Guiding Presence module. */
  spiritualityEnabled?: boolean;
  /** Preferred crisis-resource region code (e.g. 'US', 'UK'). */
  region?: string;
}

/** A local-first account. The password is never stored in plain text. */
export interface User {
  id: string;
  email: string;
  /** PBKDF2 hash in the form `pbkdf2$iterations$salt$hash`. */
  passwordHash: string;
  displayName: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt?: string;
}

/** Safe account shape for UI/state: excludes the password hash. */
export type PublicUser = Omit<User, 'passwordHash'>;

/* ════════════════════════════════════════════════════════════════════════
 * SOCIAL / COLLABORATIVE TYPES
 * ═══════════════════════════════════════════════════════════════════════ */

/** Extended public profile for social features. */
export interface UserProfile extends PublicUser {
  /** Short bio shown on profile and when sharing parts. */
  bio?: string;
  /** Avatar image (URL or base64). */
  avatar?: string;
  /** Whether profile is public (discoverable in community). */
  publicProfile?: boolean;
  /** Settings for who can see shared parts. */
  sharingSettings?: SharingSettings;
  /** Counts for social UI. */
  stats?: UserStats;
}

/** Who can share parts with this user / who can discover their shares. */
export interface SharingSettings {
  /** Who can share parts directly with me. */
  receiveSharesFrom: 'anyone' | 'followers' | 'none';
  /** Whether my shared parts appear in community library. */
  allowPublicLibrary?: boolean;
  /** Require approval before a shared part appears in my library. */
  requireApproval?: boolean;
}

/** Aggregated counts for profile cards. */
export interface UserStats {
  partsCount: number;
  sharedPartsCount: number;
  followersCount: number;
  followingCount: number;
  heartsReceived: number;
}

/** A follow relationship between users. */
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

/** A reaction ("heart") on a shared part or comment. */
export interface Heart {
  id: string;
  targetType: 'sharedPart' | 'comment';
  targetId: string;
  userId: string;
  createdAt: string;
}

/** Comment on a shared part. */
export interface Comment {
  id: string;
  sharedPartId: string;
  userId: string;
  body: string;
  parentCommentId?: string; // for replies
  createdAt: string;
  updatedAt?: string;
}

/** A shared part — a user's part made visible to others. */
export interface SharedPart {
  id: string;
  /** The original part ID (from owner's parts). */
  sourcePartId: string;
  /** Owner of the original part. */
  ownerId: string;
  /** Snapshot of the part at time of sharing (in case original changes). */
  partSnapshot: Part;
  /** Owner's optional note about why they're sharing. */
  shareNote?: string;
  /** Visibility: 'public' (community library) | 'followers' | 'private' (specific users). */
  visibility: 'public' | 'followers' | 'private';
  /** Specific user IDs this is shared with (if visibility === 'private'). */
  sharedWithUserIds?: string[];
  /** Whether the owner allows others to comment. */
  allowComments?: boolean;
  /** Whether the owner allows hearts. */
  allowHearts?: boolean;
  createdAt: string;
  updatedAt?: string;
  /** Aggregated counts (denormalized for fast reads). */
  heartsCount?: number;
  commentsCount?: number;
}

/** Activity feed item for the community feed. */
export type ActivityType =
  | 'shared_part'
  | 'hearted_part'
  | 'commented_part'
  | 'followed_user'
  | 'created_part';

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  /** The primary entity this activity relates to. */
  targetType: 'sharedPart' | 'user' | 'part';
  targetId: string;
  /** Optional metadata (e.g., comment preview, heart type). */
  metadata?: Record<string, unknown>;
  createdAt: string;
}

/** Notification for a user. */
export type NotificationType =
  | 'heart_received'
  | 'comment_received'
  | 'follow_received'
  | 'share_request'
  | 'share_approved'
  | 'mention';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  actorId: string; // who triggered it
  targetType: 'sharedPart' | 'comment' | 'user';
  targetId: string;
  read: boolean;
  createdAt: string;
}

/** A request to share a part with a specific user (for private shares). */
export interface ShareRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  sharedPartId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  respondedAt?: string;
}

/** Community-curated part entry (approved for public library). */
export interface CommunityPart {
  id: string;
  /** The shared part this entry is based on. */
  sharedPartId: string;
  /** Curator who added it to the library. */
  curatorId: string;
  /** Tags for discoverability. */
  tags: string[];
  /** Featured in "Parts of the Week" etc. */
  featured?: boolean;
  addedAt: string;
}

/* ═════════════════════════════════════════════════════════════════════════
 * EXTENDED USER TYPE (replace User in db schema)
 * ═══════════════════════════════════════════════════════════════════════ */

/** A local-first account with social fields. The password is never stored in plain text. */
export interface User {
  id: string;
  email: string;
  /** PBKDF2 hash in the form `pbkdf2$iterations$salt$hash`. */
  passwordHash: string;
  displayName: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt?: string;

  // Social fields
  /** Short bio shown on profile and when sharing parts. */
  bio?: string;
  /** Avatar image (URL or base64). */
  avatar?: string;
  /** Whether profile is public (discoverable in community). */
  publicProfile?: boolean;
  /** Settings for who can see shared parts. */
  sharingSettings?: SharingSettings;
}
