import type { PartGroup, AssessmentKind } from '@/lib/types';

export interface AssessmentOption {
  text: string;
  weights: Partial<Record<PartGroup, number>>;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: AssessmentOption[];
}

export const groupingStarterQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    prompt: 'When something stressful happens, what tends to show up first?',
    options: [
      { text: 'An urge to plan, organize, or get control of the situation', weights: { manager: 2 } },
      { text: 'A need to escape, numb out, or make the feeling stop immediately', weights: { guardian: 2 } },
      { text: 'A sense of feeling small, overwhelmed, or like a younger version of yourself', weights: { innerKid: 2 } },
      { text: 'A quiet ability to pause and notice what\'s happening inside', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q2',
    prompt: 'How do you usually relate to your own critical or judgmental thoughts?',
    options: [
      { text: 'They run the show — I find myself constantly evaluating and correcting', weights: { manager: 2 } },
      { text: 'I try to silence them with distraction, substances, or shutting down', weights: { guardian: 2 } },
      { text: 'They feel like truth — I just *am* those criticisms', weights: { innerKid: 2 } },
      { text: 'I can notice them as "a critical part" without fully buying in', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q3',
    prompt: 'When a strong emotion rises (fear, sadness, anger), what\'s your typical response?',
    options: [
      { text: 'Analyze it, rationalize it, or push through to stay functional', weights: { manager: 2 } },
      { text: 'React impulsively or seek immediate relief however I can', weights: { guardian: 2 } },
      { text: 'Get completely flooded — the emotion takes over entirely', weights: { innerKid: 2 } },
      { text: 'Acknowledge it and get curious about what part is feeling it', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q4',
    prompt: 'What\'s your experience with rest and downtime?',
    options: [
      { text: 'Uncomfortable — guilt or anxiety kicks in when I\'m not productive', weights: { manager: 2 } },
      { text: 'I overdo it — binge, scroll, sleep, or zone out for hours', weights: { guardian: 2 } },
      { text: 'I collapse but still feel restless and uneasy underneath', weights: { innerKid: 2 } },
      { text: 'I can genuinely relax and recharge without inner conflict', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q5',
    prompt: 'In close relationships, what pattern feels most familiar?',
    options: [
      { text: 'I manage the other person\'s feelings, anticipate needs, avoid conflict', weights: { manager: 2 } },
      { text: 'I pull away, shut down, or sabotage when things get too close', weights: { guardian: 2 } },
      { text: 'I feel unlovable, fear abandonment, or hide who I really am', weights: { innerKid: 2 } },
      { text: 'I can set boundaries and ask for what I need, even when it\'s hard', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q6',
    prompt: 'When you make a mistake, the inner voice tends to say:',
    options: [
      { text: '"You should have known better. Do it perfectly next time."', weights: { manager: 2 } },
      { text: '"Who cares? Nothing matters. Let\'s just check out."', weights: { guardian: 2 } },
      { text: '"See? You\'re fundamentally flawed. You\'ll never get it right."', weights: { innerKid: 2 } },
      { text: '"Okay, that happened. What can I learn from this?"', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q7',
    prompt: 'How do you handle uncertainty about the future?',
    options: [
      { text: 'Over-prepare, research excessively, create backup plans for everything', weights: { manager: 2 } },
      { text: 'Avoid thinking about it; distract with activities or substances', weights: { guardian: 2 } },
      { text: 'Feel paralyzed by dread or a sense that something terrible is coming', weights: { innerKid: 2 } },
      { text: 'Accept not knowing; focus on what I can influence today', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
  {
    id: 'q8',
    prompt: 'When you think about difficult memories from your past:',
    options: [
      { text: 'I intellectualize — analyze patterns but stay disconnected from the feeling', weights: { manager: 2 } },
      { text: 'I avoid it entirely — too painful, I\'d rather not go there', weights: { guardian: 2 } },
      { text: 'I feel the raw pain as if it\'s happening right now', weights: { innerKid: 2 } },
      { text: 'I can witness the memories with compassion for my younger self', weights: { manager: 1, guardian: 1, innerKid: 1 } },
    ],
  },
];

export function scoreGroupingStarter(answers: Record<string, string>): PartGroup[] {
  const scores: Record<PartGroup, number> = { manager: 0, guardian: 0, innerKid: 0, spiritual: 0 };

  Object.entries(answers).forEach(([questionId, optionText]) => {
    const question = groupingStarterQuestions.find(q => q.id === questionId);
    if (!question) return;
    const option = question.options.find(o => o.text === optionText);
    if (!option) return;
    (Object.entries(option.weights) as [PartGroup, number][]).forEach(([group, weight]) => {
      scores[group] += weight;
    });
  });

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return [];

  return (Object.entries(scores) as [PartGroup, number][])
    .filter(([, score]) => score === maxScore)
    .map(([group]) => group);
}

export const groupingStarterKind: AssessmentKind = 'grouping';