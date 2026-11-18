import type { PracticeKind } from '@/lib/types';

export interface PracticeDefinition {
  kind: PracticeKind;
  title: string;
  description: string;
  suggestedDurationSec: number;
  scriptLines: string[];
}

export const practices: PracticeDefinition[] = [
  {
    kind: 'goingInside',
    title: 'Going Inside',
    description: 'A foundational practice to shift from outer focus to inner awareness. Learn to locate and witness parts.',
    suggestedDurationSec: 300,
    scriptLines: [
      'Find a comfortable position. Close your eyes or soften your gaze.',
      'Take three slow breaths. Inhale through the nose, exhale through the mouth.',
      'Bring your attention inward. Notice the landscape inside — sensations, emotions, images, voices, or a quiet knowing.',
      'Without judging, simply notice: Is there a part that feels active right now?',
      'Where do you sense it? Chest, throat, belly, shoulders, behind the eyes, or nowhere specific?',
      'Turn toward it with curiosity. "Hello. I notice you are here."',
      'Stay with it for a few breaths. Notice if it shifts or reveals something.',
      'When you feel complete, thank the part. Gently bring awareness back to the room.',
    ],
  },
  {
    kind: 'dialogue',
    title: 'Dialogue with a Part',
    description: 'A structured conversation with a specific part to understand its role, fears, and needs. Always unblend first.',
    suggestedDurationSec: 600,
    scriptLines: [
      'Settle in with a few breaths. Recall the part you want to connect with.',
      'Unblend first: "I see you. You are a part of me, not all of me." Step back and witness.',
      'Invite it closer: "I would like to get to know you better. May I ask you some questions?"',
      'Ask: "What name would you like?" ... "How old are you?" ... "Where do you live?" ... "Do you live with anyone?"',
      'Ask: "What is your job? What do you do for me?" Listen for the answer.',
      'Ask: "Do you like your job? What would happen if you stopped?" Listen.',
      'Ask: "What year is it for you?" (This reveals if the part is living in the past.)',
      'Ask: "What are you most afraid of? What do you need?"',
      'Offer appreciation: "Thank you for sharing. I see how hard you work. You are not alone."',
      'Check: "Is there anything else you want me to know?"',
      'Close: "I will come back. You are not alone." Return awareness to the room.',
    ],
  },
  {
    kind: 'selfEnergy',
    title: 'Accessing Inner Leader Energy',
    description: 'Cultivate the 8 Cs (calm, curious, clear, compassionate, confident, creative, courageous, connected) as a leadership state.',
    suggestedDurationSec: 420,
    scriptLines: [
      'Settle in. Take a few grounding breaths.',
      'Bring to mind a moment when you felt truly calm — a memory, a place, a sensation.',
      'Let that calm expand. Notice the quality of steadiness.',
      'Now invite curiosity: a gentle "I wonder" toward your inner world.',
      'Invite clarity: seeing things as they are, without the story.',
      'Invite compassion: warmth toward whatever you find inside.',
      'Invite confidence: trust in your capacity to be with whatever arises.',
      'Invite creativity: openness to new ways of relating to your parts.',
      'Invite courage: willingness to stay present with discomfort.',
      'Invite connection: sense of belonging to yourself and something larger.',
      'Rest in this combined quality for a few breaths. This is Inner Leader energy.',
      'Gently return, carrying this quality forward.',
    ],
  },
  {
    kind: 'unblending',
    title: 'Unblending Practice',
    description: 'Practice stepping back from a blended part to access Inner Leader. Essential prerequisite for all deeper work.',
    suggestedDurationSec: 360,
    scriptLines: [
      'Settle in. Notice what is dominating your awareness right now — an emotion, a voice, a urge, a story.',
      'Name it: "A part of me is feeling [anxious / angry / critical / numb / driven]."',
      'Say internally: "I see you. You are a part of me, not all of me."',
      'Imagine stepping back a few inches. You are the one noticing. The part is over there.',
      'Check: From this distance, can you feel any of the 8 Cs toward that part — even a little curiosity or compassion?',
      'If not, the part you are blended with might be a Protective Voice. Ask: "Is there another part reacting to this one?"',
      'Continue stepping back until you sense some Inner Leader quality (calm, curiosity, clarity, compassion...).',
      'From this place, you can now choose to dialogue, or simply be with the part.',
      'Practice this several times a day — it builds the "unblending muscle."',
    ],
  },
  {
    kind: 'rescuing',
    title: 'Rescuing Young Parts',
    description: 'Bring a Young Voice stuck in the past to present safety. CRITICAL: Befriend the Protective Voice guarding the child FIRST. Never rush. Never "fire" parts.',
    suggestedDurationSec: 720,
    scriptLines: [
      'Begin with unblending. Access Inner Leader energy (calm, curious, compassionate).',
      'Identify a Young Voice that feels stuck in the past (you sensed a different year, or it feels very young).',
      'FIRST: Find the Protective Voice guarding this child. Ask: "Who is watching over this young part?"',
      'Befriend that Protective Voice: "I see you protecting them. Thank you. What do you need to trust that it is safe now?"',
      'Only when the Protective Voice agrees: Invite the Young Voice to visit a Safe Haven in the present.',
      'Describe your Safe Haven: a place of safety, comfort, and present-time cues (today\'s date, your adult body, current surroundings).',
      'Have your Nurturer (a Guiding Voice) meet the child there. "You are safe now. The danger is over. I am here."',
      'Show the child present-time evidence: "Look — today is [date]. I am [your age]. We are safe."',
      'Let the child absorb this at their pace. They may cry, play, sleep, or explore.',
      'When the child feels settled, ask the Protective Voice: "How does it feel to see them safe?"',
      'Thank all parts involved. Close with gratitude. Return to the room slowly.',
    ],
  },
  {
    kind: 'reassignment',
    title: 'Reassigning Roles',
    description: 'Negotiate a new, preferred role for a part whose old job is outdated. The part chooses — never fired, never forced.',
    suggestedDurationSec: 480,
    scriptLines: [
      'Begin with unblending and Inner Leader access.',
      'Identify a part whose job feels outdated — a Critic, Perfectionist, Saboteur, Numb-er, or overworking Guiding Voice.',
      'Build relationship first: "I see how hard you have worked. I understand why you took this job."',
      'Ask: "Do you like this job? What would happen if you stopped?" Honor the fear.',
      'Share present reality: "Things have changed. I am an adult now. I have resources you did not know about."',
      'Invite: "Would you be willing to consider a new role — one that uses your talents in a way that feels good to YOU?"',
      'Brainstorm together: A Critic → Discerning Advisor. A Perfectionist → Quality Guide. A Saboteur → Creative Risk Assessor. A Numb-er → Rest Coordinator.',
      'Let the part choose. No pressure. "Take your time. I will ask again later."',
      'If they agree, celebrate: "Welcome to your new role. I trust you."',
      'If they decline, respect it: "I hear you. We will revisit when you are ready." Trust builds over time.',
      'Close with gratitude. Return to the room.',
    ],
  },
  {
    kind: 'safeHaven',
    title: 'Configure Your Safe Haven',
    description: 'Create or update your inner safe place used in rescuing and other practices. Can be a real or imagined location.',
    suggestedDurationSec: 300,
    scriptLines: [
      'Settle in with a few breaths. Access Inner Leader calm.',
      'Invite an image, feeling, or sense of a place where you feel completely safe, comfortable, and at peace.',
      'It can be real (a childhood hideout, a beach, a forest clearing) or imagined (a cozy room, a garden, a cloud).',
      'Notice the sensory details: light, temperature, sounds, smells, textures.',
      'Is there a presence figure there — a guide, an animal, a spiritual presence, a wise elder? (Optional.)',
      'Spend time there. Let your system absorb the safety.',
      'When ready, set the intention: "This is my Safe Haven. I can return here anytime. Young parts are welcome here."',
      'Make a brief note of the description for future reference.',
      'Gently return, carrying the sense of safety with you.',
    ],
  },
  {
    kind: 'teamwork',
    title: 'Inner Council / Teamwork',
    description: 'Convene parts for a council meeting. Build partnerships, resolve conflicts, make decisions as a team. Phase 5 practice.',
    suggestedDurationSec: 600,
    scriptLines: [
      'Begin with unblending and strong Inner Leader access. You are the chair of this meeting.',
      'Set an agenda: "Today we are discussing [topic — e.g., a decision, a conflict, a new challenge]."',
      'Invite relevant parts: "Who has a stake in this? Who wants to speak?"',
      'Go around: Each part shares its perspective, concern, or desire. No interrupting. Inner Leader listens with the 8 Cs.',
      'Notice alliances and conflicts. "I see Part A and Part B both want safety but disagree on how."',
      'Facilitate negotiation: "Can we find a solution that honors both needs?"',
      'If a Protective Voice blocks: "I hear your fear. What would you need to feel safe enough to try?"',
      'If a Young Voice is scared: "Nurturer, can you sit with them while we work?"',
      'Reach a decision or agreement. State it clearly: "We agree to [action]."',
      'Assign follow-up: "Part X will monitor. Part Y will support. We meet again in [timeframe]."',
      'Take "minutes" — jot the key points, decisions, and commitments.',
      'Thank all attendees. Close the council. Return to the room.',
    ],
  },
];

export function getPractice(kind: PracticeKind): PracticeDefinition {
  return practices.find(p => p.kind === kind) || practices[0];
}