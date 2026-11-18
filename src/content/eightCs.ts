export interface CQuality {
  key: keyof EightCs;
  label: string;
  description: string;
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

export const eightCsList: CQuality[] = [
  {
    key: 'calm',
    label: 'Calm',
    description: 'A steady, grounded presence that can observe without being swept away.',
  },
  {
    key: 'curious',
    label: 'Curious',
    description: 'Genuine interest in understanding your inner experience without judgment.',
  },
  {
    key: 'clear',
    label: 'Clear',
    description: 'Seeing situations and inner dynamics as they are, without distortion.',
  },
  {
    key: 'compassionate',
    label: 'Compassionate',
    description: 'Warmth and care toward all parts, especially the wounded ones.',
  },
  {
    key: 'confident',
    label: 'Confident',
    description: 'Trust in your capacity to handle what arises and lead your system.',
  },
  {
    key: 'creative',
    label: 'Creative',
    description: 'Openness to new perspectives, solutions, and ways of relating to parts.',
  },
  {
    key: 'courageous',
    label: 'Courageous',
    description: 'Willingness to face difficult emotions and protect vulnerable parts.',
  },
  {
    key: 'connected',
    label: 'Connected',
    description: 'Feeling linked to yourself, others, and something larger than the moment.',
  },
];

export const defaultEightCs: EightCs = {
  calm: 5,
  curious: 5,
  clear: 5,
  compassionate: 5,
  confident: 5,
  creative: 5,
  courageous: 5,
  connected: 5,
};

export function getCQuality(key: keyof EightCs): CQuality {
  return eightCsList.find(c => c.key === key) || eightCsList[0];
}