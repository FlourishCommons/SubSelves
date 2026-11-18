/**
 * Consumer-facing "Strategies for Common Problems" tracks.
 *
 * These are original plain-language paraphrases of parts-work strategy
 * material (see docs/theory/lane-d-user-content.md). No source text is
 * reproduced, and licensed/branded terms are intentionally excluded
 * (see the do-not-use list in that digest).
 *
 * Part names mentioned in `summary` and `steps` are made clickable by
 * `src/content/partMentions.ts`; `keyParts` are shown as explicit chips.
 */

export interface StrategyTrack {
  id: string;
  /** The common problem this track addresses. */
  problem: string;
  /** Friendly name for the guided track. */
  trackName: string;
  /** One-paragraph framing of how the method applies. */
  summary: string;
  /** Ordered, concrete steps. Part names inside these are clickable. */
  steps: string[];
  /** Notable part types involved, shown as chips (canonical names). */
  keyParts: string[];
  /** Optional safety or scope caution. */
  caution?: string;
}

export const strategyTracks: StrategyTrack[] = [
  {
    id: 'addiction',
    problem: 'Addiction & Codependence',
    trackName: 'Sobriety & Inner Safety',
    summary:
      'An Addict or Compulsive One part works hard to distract your Young Voices from painful feelings — shame, loneliness, anxiety. The urge is a protector with an outdated method, not an enemy.',
    keyParts: [
      'Addict or Compulsive One',
      'Shamed Child',
      'Nurturer(s) or Loving Parent',
      'Critic or Shamer or Blamer',
      'Skeptic or Doubter',
    ],
    steps: [
      'Picture your life with the addictive pattern no longer running the show. What becomes possible? Let that picture pull you forward.',
      'Help your Inner Leader take the lead. Notice any part that wants relief right now, and let it know you see it.',
      'Take an inventory of the parts involved: the Addict part, the young parts it protects, and the critics that pile on shame.',
      'Interview the Addict part. Ask what it is protecting you from feeling, and thank it for the relief it has provided.',
      'Strengthen your Nurturer part so your young parts have comfort that does not cost you tomorrow.',
      'Rescue each pained young part — bring it out of the past and into present-day safety, one at a time.',
      'Retrain the Critic and Perfectionist so they stop adding shame to the mix.',
      'Negotiate a new role for the Addict part. You never fire a part; its energy simply gets a new job.',
      'Address the Skeptic and Saboteur parts that quietly expect you to fail. They need reassurance and evidence.',
    ],
    caution:
      'If you are managing a substance dependence, do this alongside medical and professional support — never instead of it.',
  },
  {
    id: 'aggression',
    problem: 'Aggression & Abuse',
    trackName: 'Assertion Over Aggression',
    summary:
      'Aggressive young parts combine with protectors that numb or disconnect, and your Inner Leader goes offline. The goal is assertive strength without harm.',
    keyParts: [
      'Rageful or Aggressive Child',
      'Entitled One',
      'Frustrated or Impatient Child',
      'Defiant or Stubborn or Rebel',
      'Anesthetist or Numb-er or Blocker',
      'Nurturer(s) or Loving Parent',
    ],
    steps: [
      'Picture respectful, firm assertion — saying what you need without attack. Hold that as the target.',
      'Help your Inner Leader come back online, and unblend from the heat of the moment.',
      'Practice noticing the build-up early: body signals, rising tone, tightening.',
      'Strengthen the Nurturer so your young parts feel held rather than dangerous.',
      'Reach the young parts behind the aggression — the aggressive, Entitled, Impatient, Insecure, and Rebel kids — and hear their side.',
      'Teach those parts about needs, empathy, and the difference between assertion and aggression.',
      'Interview the aggressive protector, thank it, and offer it a new role as a Peaceful Warrior.',
      'Practice a two-person awareness exercise: hold both your inner world and the other person in mind at once.',
      'Audit the influences (people, media, environments) that feed the aggressive parts, and adjust what you take in.',
    ],
  },
  {
    id: 'anger',
    problem: 'Anger & Rage Attacks',
    trackName: 'Anger as Signal',
    summary:
      'A frustrated young part gets triggered, your Inner Leader goes offline, and a Numb-er part has been holding the pressure until it erupts. Anger is information — the work is to use it, not explode or bury it.',
    keyParts: [
      'Frustrated or Impatient Child',
      'Hurt or Resentful Child',
      'Anesthetist or Numb-er or Blocker',
      'Critic or Shamer or Blamer',
      'Nurturer(s) or Loving Parent',
    ],
    steps: [
      'Learn to read anger as a signal about unmet needs rather than a verdict about who you are.',
      'Help your Inner Leader take the lead before the pressure builds.',
      'Strengthen the Nurturer so your young parts have somewhere to bring the heat.',
      'Reach the angry, frustrated, and hurt young parts, and let them speak.',
      'Grieve and, in time, forgive the past pain that fuels the charge — at your own pace.',
      'Befriend the Numb-er part. Thank it for holding so much, then retrain or reassign it.',
      'Teach every part about your rights, your needs, and respectful assertion.',
      'Rule out chemical and medical contributors (substances, sleep, health) with a professional.',
    ],
    caution:
      'If anger has caused harm to you or others, seek professional support. This companion is not a crisis or safety service.',
  },
  {
    id: 'anxiety',
    problem: 'Chronic Anxiety & Panic',
    trackName: 'Fear to Fuel',
    summary:
      'A cluster of scared young parts plus Worrier, Catastrophizer, and Pessimist protectors keep the alarm on full-time. Normal fear is useful; chronic alarm is a protector that has lost the off-switch.',
    keyParts: [
      'Anxious or Scared or Worried Child',
      'Abandoned Child',
      'Hurt or Resentful Child',
      'Worrier or Cautious One',
      'Catastrophizer',
      'Pessimist',
      'Nurturer(s) or Loving Parent',
    ],
    steps: [
      'Imagine life with normal, proportionate fear — enough to warn you, not enough to run you.',
      'Help your Inner Leader lead, and notice the part that is scanning for danger right now.',
      'Strengthen the Nurturer so the scared young parts have a safe base.',
      'Reach the scared, abandoned, and hurt young parts. Show them the past danger is gone, and offer age-appropriate reassurance about the present.',
      'Interview the Worrier, Catastrophizer, and Pessimist. Thank them for trying to keep you safe, show them how they frighten the young parts, then retrain or reassign them.',
      'Audit the people and situations that spike your alarm. Set boundaries, limit contact where needed, and practice acceptance of what you cannot change.',
      'Practice small, planned risks to teach your system that discomfort is survivable.',
    ],
    caution:
      'Panic and anxiety can have medical drivers — pair this track with professional care.',
  },
  {
    id: 'procrastination',
    problem: 'Procrastination',
    trackName: 'Action Unstuck',
    summary:
      'A Saboteur part protects a Shamed Child from the pain of success-then-rejection, so it stalls you before you can be judged. The delay is a shield.',
    keyParts: [
      'Self-saboteur or Fail-er or Screw Up',
      'Shamed Child',
      'Critic or Shamer or Blamer',
      'Perfectionist',
    ],
    steps: [
      'Interview the Saboteur: what does it believe will happen if you go ahead and succeed?',
      'Learn its protective intent — it is guarding a young part from humiliation.',
      'Negotiate a new role for the Saboteur (for example, a focus or follow-through guide).',
      'Reassure the Shamed Child that your worth does not depend on the outcome.',
      'Quiet the Critic and Perfectionist so the standard becomes "done and human," not flawless.',
    ],
  },
];

export function getStrategyTrack(id: string): StrategyTrack | undefined {
  return strategyTracks.find(t => t.id === id);
}

export function getAllStrategyTracks(): StrategyTrack[] {
  return [...strategyTracks];
}
