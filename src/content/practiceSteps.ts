import type { JourneyPhase, JournalKind, PartGroup, PracticeKind } from '@/lib/types';

/**
 * Typed step model for the guided practice runner on /session.
 *
 * Unlike the free-form `sessionFlow` (a generic script) the per-practice
 * scripts below are fully authored and typed so the runner can:
 *  - let the user pick / access a part at any step (choosePart),
 *  - capture a journal answer inline at any step (journal),
 *  - take a closing free-form note (reflection),
 *  - and resume from the exact step later.
 *
 * Both `/practice` and `/session` use this runner so part selection, journaling,
 * and resume work the same way from either route.
 */

export interface PracticeStepBase {
  /** Unique within a practice (prefixed with the practice's short code). */
  id: string;
  title: string;
  /** Main guidance for the step. */
  text?: string;
  phase?: JourneyPhase;
  durationSec?: number;
}

export interface InstructionStep extends PracticeStepBase {
  type: 'instruction';
  /** A gentle thought to carry forward (no saving). */
  followUp?: string;
}

export interface ChoosePartStep extends PracticeStepBase {
  type: 'choosePart';
  /** What role this part plays, e.g. "the part you want to talk with". */
  role: string;
  /** Groups to surface first in the parts drawer. */
  suggestedGroups?: PartGroup[];
  /** Suggested default-library names offered when the user has none yet. */
  suggestedParts?: string[];
  /** Allow selecting more than one part. */
  multiple?: boolean;
  /** Whether a selection is required to continue. */
  required?: boolean;
}

export interface JournalStep extends PracticeStepBase {
  type: 'journal';
  question: string;
  /** Journal channel to file the entry under. */
  journalKind?: JournalKind;
  /** Attach the entry to the part chosen earlier in this practice. */
  linkToPart?: boolean;
}

export interface ReflectionStep extends PracticeStepBase {
  type: 'reflection';
  question: string;
}

export type PracticeStep =
  | InstructionStep
  | ChoosePartStep
  | JournalStep
  | ReflectionStep;

const instr = (
  id: string,
  title: string,
  text: string,
  phase?: JourneyPhase,
  followUp?: string,
): InstructionStep => ({ type: 'instruction', id, title, text, phase, followUp });

const pick = (
  id: string,
  title: string,
  text: string,
  role: string,
  opts: Omit<ChoosePartStep, 'type' | 'id' | 'title' | 'text' | 'role'> = {},
): ChoosePartStep => ({ type: 'choosePart', id, title, text, role, ...opts });

const ask = (
  id: string,
  title: string,
  question: string,
  opts: Omit<JournalStep, 'type' | 'id' | 'title' | 'question'> = {},
): JournalStep => ({ type: 'journal', id, title, question, ...opts });

const reflect = (
  id: string,
  title: string,
  question: string,
  phase?: JourneyPhase,
): ReflectionStep => ({ type: 'reflection', id, title, question, phase });

export const practiceScripts: Record<PracticeKind, PracticeStep[]> = {
  // ── Going Inside — foundational awareness ────────────────────────────────
  goingInside: [
    instr(
      'gi-1',
      'Prepare Your Space',
      'Set aside a few undistracted minutes in a quiet place. Make a gentle agreement with yourself: "If things feel overwhelming, I will pause and ground."',
      1,
    ),
    instr(
      'gi-2',
      'Arrive',
      'Take three slow breaths. Feel your feet on the floor and your weight in the chair. There is nowhere else to be right now.',
      1,
    ),
    instr(
      'gi-3',
      'Notice What Is Here',
      'Bring your attention inward. Notice what is present — sensations, emotions, images, voices, or a quiet knowing. If something feels like it has taken over, silently say: "I see you. You are a part of me, not all of me."',
      2,
    ),
    pick(
      'gi-4',
      'Which Part Stands Out?',
      'Notice if one part feels most active right now. You can choose it from your map, or simply keep noticing without choosing.',
      'the part you notice most right now',
      { required: false },
    ),
    ask('gi-5', 'What Do You Sense?', 'Where do you sense this part, and what is it like — heavy, tight, buzzy, or quiet?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 2,
    }),
    instr(
      'gi-6',
      'Close',
      'When you feel complete, thank the part for showing up. Gently widen your attention back to the room.',
      5,
    ),
    reflect('gi-r', 'Closing Reflection', 'What did you notice about yourself or a part today that you want to remember?', 5),
  ],

  // ── Dialogue — the first interview ───────────────────────────────────────
  dialogue: [
    instr(
      'dl-1',
      'Prepare',
      'Settle into a quiet, undistracted space. Take a few slow breaths and let your body relax.',
      1,
    ),
    instr(
      'dl-2',
      'Unblend First',
      'Step back from any part that currently feels like "you": "I see you. You are a part of me, not all of me." You want to listen to it, not speak as it.',
      2,
    ),
    pick('dl-3', 'Choose the Part to Talk With', 'Bring to mind a part you are curious about — a feeling, voice, or pattern.', 'the part you want to get to know', {
      required: true,
      phase: 2,
    }),
    instr(
      'dl-4',
      'Invite It Closer',
      'Ask inwardly: "May I get to know you better?" Then wait and listen. Do not force an answer — notice whatever comes.',
      3,
    ),
    ask('dl-5', 'Its Name, Age & Place', 'What name, age, and place does this part show you?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    ask('dl-6', 'Its Job', 'What job does it do for you? What is it trying to protect you from, or prevent?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    ask('dl-7', 'How It Feels About Its Job', 'Does it like its job? What does it think would happen if it stopped?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    ask('dl-8', 'Its Time', 'What year is it for this part? How old does it experience itself as being?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    ask('dl-9', 'Its Fear & Need', 'What is it most afraid of? What does it need from you?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    ask('dl-10', 'Anything Else?', 'Is there anything else it wants you to know, or wants you to say?', {
      journalKind: 'interview',
      linkToPart: true,
      phase: 3,
    }),
    instr(
      'dl-11',
      'Offer Appreciation',
      'Let it know you see how hard it works and that it is not alone. Appreciation, not agreement, is what opens the door.',
      4,
    ),
    ask('dl-12', 'What Shifted?', 'How did the part respond to being seen? What shifted?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 4,
    }),
    instr('dl-13', 'Close', 'Thank the part, and gently return your attention to the room.', 5),
    reflect('dl-r', 'Closing Reflection', 'What is one thing you learned about this part that changed how you see it?', 5),
  ],

  // ── Self-Energy — accessing the 8 Cs ─────────────────────────────────────
  selfEnergy: [
    instr('se-1', 'Prepare', 'Find a calm, quiet moment. Let your body soften and your breathing slow.', 1),
    instr('se-2', 'Arrive', 'Take a few slow breaths. Feel yourself here, present and supported.', 1),
    instr(
      'se-3',
      'Recall Calm',
      'Bring to mind a moment when you felt genuinely calm, safe, or connected. Let that feeling return — even faintly — and let it expand.',
      3,
    ),
    instr(
      'se-4',
      'Invite the 8 Cs',
      'From this steadier place, invite the qualities of your Inner Leader: calm, curiosity, clarity, compassion, confidence, creativity, courage, and connection.',
      3,
    ),
    ask('se-5', 'Where Are You Now?', 'Which of the 8 Cs feels most available right now — and which is hardest to reach?', {
      journalKind: 'reflection',
      phase: 3,
    }),
    instr('se-6', 'Rest & Return', 'Stay here a moment, then gently return to your day carrying this steadiness with you.', 5),
    reflect('se-r', 'Closing Reflection', 'What helped you most in accessing calm today?', 5),
  ],

  // ── Unblending — step back from a part ───────────────────────────────────
  unblending: [
    instr('ub-1', 'Prepare', 'Settle into a quiet space. Take a few slow breaths and let your body relax.', 1),
    instr(
      'ub-2',
      'Notice What Is Dominating',
      'Notice an emotion, voice, urge, or story that feels like your whole reality right now — as if there is no distance between you and it.',
      2,
    ),
    ask('ub-3', 'Name It', 'Complete the sentence: "A part of me is feeling ___."', {
      journalKind: 'reflection',
      phase: 2,
    }),
    pick('ub-4', 'Choose the Part You Are Blended With', 'Bring this dominant part into focus.', 'the part taking over right now', {
      required: true,
      phase: 2,
    }),
    instr(
      'ub-5',
      'Step Back',
      'Silently say: "I see you. You are a part of me, not all of me." Imagine stepping back a few inches to watch it from a little distance.',
      2,
    ),
    instr(
      'ub-6',
      'Check the 8 Cs',
      'Can you feel even a little curiosity or compassion toward it from here? If not, look for another part reacting — that may be the one you are blended with.',
      2,
    ),
    ask('ub-7', 'What Do You Notice Now?', 'From a little distance, what do you notice about this part?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 3,
    }),
    instr('ub-8', 'Close', 'Thank the part for letting you step back, and gently return to the room.', 5),
    reflect('ub-r', 'Closing Reflection', 'What helped you step back today — and what made it harder?', 5),
  ],

  // ── Rescuing — retrieve a young part ─────────────────────────────────────
  rescuing: [
    instr(
      'rs-1',
      'Prepare & Unblend',
      'Settle in, then step back from anything that feels like "you" right now: "I see you. You are a part of me, not all of me."',
      1,
    ),
    instr(
      'rs-2',
      'Find a Young Part Stuck in the Past',
      'Notice a young part that still feels far from present safety — as if it lives in a different year, or feels very small.',
      2,
    ),
    pick(
      'rs-3',
      'Choose the Protective Voice First',
      'Rescue work always begins with the protector\'s permission. Choose the part that guards this young one.',
      'the Protective Voice guarding this young part',
      { suggestedGroups: ['guardian'], required: true, phase: 2 },
    ),
    instr(
      'rs-4',
      'Befriend the Protector',
      'Thank it for protecting the child. Then ask: "What would you need to trust that it is safe now?"',
      3,
    ),
    ask('rs-5', 'What Does the Protector Need?', 'What does the Protective Voice need to feel it is safe for the child to come to the present?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 3,
    }),
    pick('rs-6', 'Choose the Young Part', 'With the protector\'s agreement, bring the young part into focus.', 'the young part to bring to safety', {
      suggestedGroups: ['innerKid'],
      required: true,
      phase: 3,
    }),
    instr(
      'rs-7',
      'Invite It to Your Safe Haven',
      'Invite the child to your Safe Haven. Describe present-time cues: today\'s date, your adult body, the safe room you are in right now.',
      4,
    ),
    instr(
      'rs-8',
      'Let Your Nurturer Meet the Child',
      'Say inwardly: "You are safe now. It is over. I am here." Let the child absorb this at its own pace.',
      4,
    ),
    ask('rs-9', 'How Did It Respond?', 'How did the young part respond — and how did the protector feel seeing it safe?', {
      journalKind: 'rescue',
      linkToPart: true,
      phase: 4,
    }),
    instr('rs-10', 'Close', 'Thank both parts. Return gently, carrying the sense that the child is not alone.', 5),
    reflect('rs-r', 'Closing Reflection', 'What felt most important about bringing this young part to safety?', 5),
  ],

  // ── Reassignment — give a part a new, fitting role ───────────────────────
  reassignment: [
    instr(
      'ra-1',
      'Prepare & Unblend',
      'Settle in, then step back from anything that feels like "you" right now: "I see you. You are a part of me, not all of me."',
      1,
    ),
    pick('ra-2', 'Choose the Part With an Outdated Job', 'Think of a part whose job no longer fits — one that once helped but now causes strain.', 'the part whose job feels outdated', {
      required: true,
      phase: 2,
    }),
    instr(
      'ra-3',
      'Build Relationship First',
      'Thank it honestly: "I see how hard you have worked. I understand why you took this job." No part is reassigned without being respected.',
      2,
    ),
    instr('ra-4', 'Explore the Job and Fear', 'Ask: "Do you like this job? What would happen if you stopped?"', 4),
    ask('ra-5', 'What Is It Afraid Would Happen?', 'What does this part fear would happen if it stopped doing its job?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 4,
    }),
    instr(
      'ra-6',
      'Share Present Reality',
      'Reassure it: "Things have changed. I am an adult now, with resources you did not know about."',
      4,
    ),
    instr(
      'ra-7',
      'Invite a New Role',
      'Ask: "Would you consider a new role that uses your gifts in a way that feels good to you?" Examples: a Critic → Discerning Advisor; a Perfectionist → Quality Guide; a Saboteur → Creative Risk-Assessor; a Numb-er → Rest Coordinator. Let the part choose.',
      5,
    ),
    ask('ra-8', 'What New Role Emerged?', 'What new role did the part choose — or what did it say?', {
      journalKind: 'reflection',
      linkToPart: true,
      phase: 5,
    }),
    instr(
      'ra-9',
      'Close',
      'Whatever the answer, thank it. Parts are never fired — they evolve. Trust builds over time.',
      5,
    ),
    reflect('ra-r', 'Closing Reflection', "How do you feel about this part's new role — and what will you watch for next time?", 5),
  ],

  // ── Safe Haven — build an internal refuge ────────────────────────────────
  safeHaven: [
    instr('sh-1', 'Prepare', 'Find a quiet, comfortable space where you will not be disturbed.', 1),
    instr('sh-2', 'Arrive & Access Calm', 'Take a few slow breaths and recall a moment of calm to steady yourself.', 1),
    instr(
      'sh-3',
      'Invite a Safe Place',
      'Let an image, feeling, or sense of complete safety arise — real or imagined. There is no wrong answer.',
      2,
    ),
    ask('sh-4', 'Describe Your Safe Haven', 'Describe your Safe Haven: light, temperature, sounds, textures, and any presence figure who belongs there.', {
      journalKind: 'reflection',
      phase: 2,
    }),
    instr(
      'sh-5',
      'Spend Time There',
      'Let your system absorb the safety. Young parts are always welcome here, and can return whenever they need.',
      4,
    ),
    instr('sh-6', 'Set the Intention', 'Say inwardly: "This is my Safe Haven. I can return anytime."', 4),
    instr('sh-7', 'Return', 'When you feel complete, gently return your attention to the room.', 5),
    reflect('sh-r', 'Closing Reflection', 'How did it feel to create or return to your Safe Haven?', 5),
  ],

  // ── Teamwork — an inner council meeting ──────────────────────────────────
  teamwork: [
    instr(
      'tw-1',
      'Prepare & Unblend',
      'Access your strongest Inner Leader energy — curiosity and compassion. You are the calm chair of this meeting, not a participant in the conflict.',
      1,
    ),
    instr('tw-2', 'Set the Agenda', 'Decide what the council will discuss today: a decision, a conflict, or a challenge.', 5),
    pick('tw-3', 'Invite the Parts', 'Choose the parts who have a stake in this topic.', 'parts with a stake in this', {
      multiple: true,
      required: true,
      phase: 5,
    }),
    instr(
      'tw-4',
      'Go Around the Circle',
      'Let each part share its perspective without interruption. Listen with the 8 Cs; do not take sides.',
      5,
    ),
    instr('tw-5', 'Notice Alliances & Conflicts', 'See where parts agree and where they are polarized.', 5),
    instr(
      'tw-6',
      'Facilitate Negotiation',
      'Ask: "Can we find a solution that honors both needs?" If a protector blocks, hear its fear. If a young part is scared, invite your Nurturer to sit with it.',
      5,
    ),
    ask('tw-7', 'What Does Each Part Want?', 'What did each part want? Is there a shared need underneath?', {
      journalKind: 'council',
      phase: 5,
    }),
    instr('tw-8', 'Reach a Decision', 'State the agreement clearly: "We agree to ___."', 5),
    ask('tw-9', 'Minutes', 'Decision and commitments — who will do what, and when will you meet again?', {
      journalKind: 'council',
      phase: 5,
    }),
    instr('tw-10', 'Close', 'Thank every part for contributing. Return gently to your day.', 5),
    reflect('tw-r', 'Closing Reflection', 'How did it feel to lead this meeting, and what will you carry forward?', 5),
  ],
};

/** Ordered steps for a practice (empty array if unknown). */
export function getPracticeSteps(kind: PracticeKind): PracticeStep[] {
  return practiceScripts[kind] ?? [];
}
