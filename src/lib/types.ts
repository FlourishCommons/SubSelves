// ───────────────────────────────────────────────────────────────────────────
// InnerHarmony — core domain types
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
