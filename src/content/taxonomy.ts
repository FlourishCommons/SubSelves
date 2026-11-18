import type { PartGroup } from '@/lib/types';

export interface PartGroupInfo {
  key: PartGroup;
  label: string;
  emoji: string;
  description: string;
  exampleNames: string[];
  commonTriggers: string[];
}

export const partGroups: PartGroupInfo[] = [
  {
    key: 'manager',
    label: 'Guiding Voices',
    emoji: '🧭',
    description: 'Parts that proactively run daily life — planning, organizing, achieving, analyzing, nurturing. They work to keep things running smoothly and prevent problems before they arise.',
    exampleNames: ['The Nurturer', 'The Organizer', 'The Planner', 'The Analyzer', 'The Teacher', 'The Achiever'],
    commonTriggers: ['Uncertainty', 'Potential failure', 'Social judgment', 'Loss of control', 'Overwhelm', 'Need for structure'],
  },
  {
    key: 'guardian',
    label: 'Protective Voices',
    emoji: '🛡️',
    description: 'Parts that activate to defend the system when pain or threat breaks through — including crisis responders using extreme methods. They protect by criticizing, numbing, worrying, blocking, or sabotaging.',
    exampleNames: ['The Critic', 'The Perfectionist', 'The Worrier', 'The Catastrophizer', 'The Numb-er', 'The Saboteur', 'The Blocker', 'The Addict', 'The Aggressor', 'The Controller'],
    commonTriggers: ['Intense emotions', 'Trauma reminders', 'Shame spirals', 'Feeling trapped', 'Hopelessness', 'Perceived danger', 'Vulnerability'],
  },
  {
    key: 'innerKid',
    label: 'Young Voices',
    emoji: '🧸',
    description: 'Developmentally young, vulnerable parts carrying feelings and beliefs from earlier life. They may be scared, shamed, abandoned, hurt, angry, or playful. Some are stuck in the past (livingInPast flag).',
    exampleNames: ['The Scared One', 'The Shamed One', 'The Abandoned One', 'The Playful One', 'The Curious One', 'The Angry One', 'The Hurt One', 'The Lost One', 'The Rebel', 'The Victim'],
    commonTriggers: ['Rejection', 'Criticism', 'Loneliness', 'Helplessness', 'Being unseen', 'Abandonment cues', 'Shame triggers'],
  },
  {
    key: 'spiritual',
    label: 'Guiding Presence',
    emoji: '✨',
    description: 'Optional: parts experienced as spiritual guides, higher wisdom, or transcendent presence. This group can be toggled off in settings. Not required for the core method.',
    exampleNames: ['The Guide', 'The Wise Presence', 'Inner Light', 'Higher Self', 'Spiritual Companion'],
    commonTriggers: ['Deep stillness', 'Prayer or meditation', 'Moments of grace', 'Profound nature experiences', 'Desire for meaning'],
  },
];

export const innerLeader = {
  label: 'Inner Leader',
  emoji: '☀️',
  description: 'The natural leadership part of you — calm, curious, clear, compassionate, confident, creative, courageous, connected. It perceives reality, seeks counsel, delegates, decides, and acts. It feels the full range of emotions and cannot force parts; it earns their trust to lead.',
  qualities: ['calm', 'curious', 'clear', 'compassionate', 'confident', 'creative', 'courageous', 'connected'] as const,
};

export function getGroupInfo(group: PartGroup): PartGroupInfo {
  return partGroups.find(g => g.key === group) || partGroups[0];
}