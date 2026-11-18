import type { JourneyPhase } from '@/lib/types';

export interface SessionStep {
  id: string;
  title: string;
  prompt: string;
  followUp?: string;
  durationSec?: number;
  phase?: JourneyPhase;
}

export const sessionFlow: SessionStep[] = [
  // Phase 1: Understand & Prepare — Setup/Preparation
  {
    id: 'prepare',
    title: 'Prepare Your Space',
    prompt: 'Set aside undistracted time. Choose a comfortable, quiet place. Have water, a notebook, or whatever helps you feel supported. Make a gentle agreement with yourself: "If things feel overwhelming, I will pause and ground." Check that your physiological needs are met (not hungry, not exhausted).',
    followUp: 'Do you feel ready to turn inward, or do you need a few more minutes to settle?',
    durationSec: 60,
    phase: 1,
  },
  {
    id: 'arrive',
    title: 'Arrive',
    prompt: 'Take a few slow breaths. Notice your body in this moment — feet on the floor, weight in the chair. Let yourself land here. There is nowhere else to be.',
    followUp: 'What do you notice as you settle in?',
    durationSec: 30,
    phase: 1,
  },
  // Phase 2: Meet & Map — Unblending (prerequisite)
  {
    id: 'unblend',
    title: 'Step Back / Unblend',
    prompt: 'Notice if any part feels like it has "taken over" — its emotions or beliefs feel like *your* reality right now. If so, silently say: "I see you. You are a part of me, not all of me." Imagine stepping back a few inches, watching that part from a little distance. You are the one noticing.',
    followUp: 'Can you sense a shift — even subtle — between "being" the part and "witnessing" the part?',
    durationSec: 45,
    phase: 2,
  },
  {
    id: 'identify',
    title: 'Identify a Part',
    prompt: 'Bring to mind a situation, feeling, or pattern that has been active lately. Notice if a particular part of you shows up — a voice, a sensation, an image, a felt sense, or a knowing. You do not need to visualize; any channel works.',
    followUp: 'Can you sense where this part is in or around your body? What is its quality — heavy, tight, buzzy, quiet?',
    durationSec: 60,
    phase: 2,
  },
  // Phase 3: Communicate
  {
    id: 'curiosity',
    title: 'Bring Curiosity',
    prompt: 'Turn toward this part with genuine interest — not to fix or change it, just to know it. Ask silently: "What would you like me to know about you?" Stay open to words, images, feelings, or a quiet sense.',
    followUp: 'Notice any shift, even subtle, as you offer curiosity.',
    durationSec: 60,
    phase: 3,
  },
  {
    id: 'toward',
    title: 'Check How You Feel Toward the Part',
    prompt: 'Notice your attitude toward this part. Annoyed, afraid, judgmental, loving, indifferent, numb? There is no wrong answer — just honest noticing. If you feel critical or afraid, can that reaction itself be seen as *another* part?',
    followUp: 'What does this tell you about your inner system right now?',
    durationSec: 45,
    phase: 3,
  },
  {
    id: 'interview',
    title: 'First Interview',
    prompt: 'Gently ask the part: "What name would you like?" ... "How old are you?" ... "Where do you live — inside, outside, a specific place?" ... "Do you live with anyone else in there?" ... "What is your job — what do you do for me?" ... "Do you like your job?" ... "What would happen if you stopped?" ... "Would you like help with this job?" ... "What year is it for you?" ... "What are you most afraid of?" ... "What do you need?"',
    followUp: 'Listen for answers — they may come as words, images, feelings, or a quiet knowing. Take your time.',
    durationSec: 120,
    phase: 3,
  },
  // Phase 4: Free & Resolve
  {
    id: 'role',
    title: 'Explore Role and Fear',
    prompt: 'Ask the part: "What are you trying to do for me? What are you afraid would happen if you did not do this job?" Listen deeply. The fear is usually old and protective.',
    followUp: 'Does the fear make sense given what this part has been through?',
    durationSec: 60,
    phase: 4,
  },
  {
    id: 'compassion',
    title: 'Offer Compassion & Witness',
    prompt: 'Let the part know you see its effort and understand its fear. You might say internally: "I see how hard you are working. I understand why you are afraid. Thank you for trying to protect me. You are not alone anymore."',
    followUp: 'Notice how the part responds to being truly witnessed.',
    durationSec: 60,
    phase: 4,
  },
  {
    id: 'rescue',
    title: 'Optional: Invite Rescue (if living in the past)',
    prompt: 'If this part is a Young Voice stuck in the past (you sensed a different year, or it feels very young), and you have a Safe Haven configured: "Would you like to visit a safe place in the present? My Nurturer can meet you there. You can see that the danger is over." Do not rush. The Guardian protecting this child must be befriended first.',
    followUp: 'This step is readiness-gated. Only proceed if it feels natural, safe, and the Guardian agrees.',
    durationSec: 120,
    phase: 4,
  },
  {
    id: 'unburden',
    title: 'Optional: Invite Release of Old Burdens',
    prompt: 'If the part feels ready, ask: "Is there something you are carrying that you would like to release — an old belief, an emotion, a memory?" Imagine it leaving in whatever way feels right: light, breath, water, wind, earth. The part sets the pace.',
    followUp: 'This step is optional. Only proceed if it feels natural and safe.',
    durationSec: 90,
    phase: 4,
  },
  // Phase 5: Harmonize
  {
    id: 'reassign',
    title: 'Optional: Explore a New Role',
    prompt: 'If the part\'s old job is complete, ask: "Would you like a new role — one that fits who you are now?" Listen for what emerges. A Critic might become a Discerning Advisor. A Saboteur might become a Creative Risk-Assessor. The part chooses.',
    followUp: 'Parts are never fired. They are invited to evolve.',
    durationSec: 60,
    phase: 5,
  },
  {
    id: 'close',
    title: 'Gratitude and Close',
    prompt: 'Thank the part for sharing. Let it know you will check in again. Take a few breaths. Wiggle fingers and toes. Notice how you feel now compared to the start.',
    followUp: 'You might jot a brief note about what you discovered.',
    durationSec: 30,
    phase: 5,
  },
];

export const sessionFlowByKind = {
  goingInside: sessionFlow.filter(s => [1, 2].includes(s.phase || 0)).slice(0, 4),
  dialogue: sessionFlow.filter(s => s.id !== 'rescue' && s.id !== 'reassign'),
  selfEnergy: sessionFlow.filter(s => [1, 5].includes(s.phase || 0)).slice(0, 3).concat(sessionFlow.slice(-1)),
  unblending: sessionFlow.filter(s => [1, 2].includes(s.phase || 0)),
  rescuing: sessionFlow.filter(s => s.id !== 'reassign'),
  reassignment: sessionFlow,
  safeHaven: sessionFlow.filter(s => [1, 2, 4].includes(s.phase || 0)),
  teamwork: sessionFlow.filter(s => s.phase === 5).concat(sessionFlow.slice(-1)),
};