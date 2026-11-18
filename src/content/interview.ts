export interface InterviewQuestion {
  id: string;
  question: string;
  field: keyof import('@/lib/types').Part | 'livingInPastCheck';
  hint: string;
}

export const firstInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'name',
    question: 'What name would you like me to call you?',
    field: 'name',
    hint: 'Any name the part offers — a nickname, a descriptor, or "I don\'t have one."',
  },
  {
    id: 'age',
    question: 'How old are you?',
    field: 'age',
    hint: 'May be a number, a range ("around 5"), or a felt sense ("very young"). Different from your body age.',
  },
  {
    id: 'whereLive',
    question: 'Where do you live — inside, outside, or a specific place?',
    field: 'image',
    hint: 'Parts often have an inner location: "in my chest," "behind my eyes," "in a dark room," "far away."',
  },
  {
    id: 'liveWithAnyone',
    question: 'Do you live with anyone else in there?',
    field: 'image',
    hint: 'Other parts may share the same inner space. This maps alliances and conflicts.',
  },
  {
    id: 'job',
    question: 'What is your job — what do you do for me?',
    field: 'role',
    hint: 'Every part has a function: protecting, managing, distracting, holding pain, organizing, achieving...',
  },
  {
    id: 'likeJob',
    question: 'Do you like your job?',
    field: 'likesJob',
    hint: 'Parts often hate their jobs but feel they must do them. A "no" opens the door to reassignment.',
  },
  {
    id: 'ifStopped',
    question: 'What would happen if you stopped doing this job?',
    field: 'wouldHappenIfStop',
    hint: 'The core fear. Usually an old catastrophe: "Everything falls apart," "I\'ll be abandoned," "The pain will destroy us."',
  },
  {
    id: 'wantHelp',
    question: 'Would you like help with this job?',
    field: 'needs',
    hint: 'Most parts say yes. This is the invitation to collaborate. Note what kind of help they want.',
  },
  {
    id: 'year',
    question: 'What year is it for you?',
    field: 'livingInPastCheck',
    hint: 'If the answer differs from the current year, the part is *living in the past* (the theory\'s "exile" state). This drives the rescuing flow.',
  },
  {
    id: 'fear',
    question: 'What are you most afraid of?',
    field: 'fear',
    hint: 'The core fear driving the part\'s behavior. Often matches "what if I stopped" but can be more specific.',
  },
  {
    id: 'need',
    question: 'What do you need — from me, from others, or from life?',
    field: 'needs',
    hint: 'The unmet need beneath the fear. Safety, love, recognition, rest, autonomy, play...',
  },
];

export function getInterviewQuestion(id: string): InterviewQuestion | undefined {
  return firstInterviewQuestions.find(q => q.id === id);
}

export function getInterviewQuestions(): InterviewQuestion[] {
  return [...firstInterviewQuestions];
}