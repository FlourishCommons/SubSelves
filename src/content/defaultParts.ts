import type { PartGroup } from '@/lib/types';

export interface DefaultPart {
  /** Suggested display name, adapted from the reference part library. */
  name: string;
  /** Which of the four groups this part belongs to. */
  group: PartGroup;
}

/**
 * Curated library of named parts used to offer "start from a known part"
 * suggestions when adding a part to the system map.
 *
 * Source mapping of the theory reference folders (name-only adaptation —
 * no source text is reproduced):
 *   C (child)    -> innerKid  (Young Voices)
 *   G (guardian) -> guardian  (Protective Voices)
 *   M (manager)  -> manager   (Guiding Voices)
 *
 * Names are suggestions only; users can rename or write their own.
 */
export const defaultParts: DefaultPart[] = [
  { name: '(True) Self or Leader or Coach or CEO', group: 'manager' },
  { name: 'Achiever or Do-er or Driver', group: 'manager' },
  { name: 'Analyzer or Thinker', group: 'manager' },
  { name: 'Far Seer', group: 'manager' },
  { name: 'Healer or Health Director', group: 'manager' },
  { name: 'Humanitarian', group: 'manager' },
  { name: 'Learner or Student', group: 'manager' },
  { name: 'Manipulator', group: 'manager' },
  { name: 'Moralizer or Rule Keeper', group: 'manager' },
  { name: 'Nurturer(s) or Loving Parent', group: 'manager' },
  { name: 'Observer or Reporter', group: 'manager' },
  { name: 'Pace-setter or Balancer', group: 'manager' },
  { name: 'Philosopher', group: 'manager' },
  { name: 'Planner or Organizer', group: 'manager' },
  { name: 'Practical Adult ("Common Sense")', group: 'manager' },
  { name: 'Prioritizer', group: 'manager' },
  { name: 'Professor or Teacher', group: 'manager' },
  { name: 'Survivor', group: 'manager' },
  { name: 'Wise One or Sage or Crone', group: 'manager' },
  { name: 'Addict or Compulsive One', group: 'guardian' },
  { name: 'Anesthetist or Numb-er or Blocker', group: 'guardian' },
  { name: 'Avoider or Fugitive or Runner', group: 'guardian' },
  { name: 'Catastrophizer', group: 'guardian' },
  { name: 'Competitor or Opponent', group: 'guardian' },
  { name: 'Con artist or Thief or Cheat', group: 'guardian' },
  { name: 'Controller or Manipulator or User', group: 'guardian' },
  { name: 'Critic or Shamer or Blamer', group: 'guardian' },
  { name: 'Cynic', group: 'guardian' },
  { name: 'Daredevil', group: 'guardian' },
  { name: 'Distracter or Defocuser', group: 'guardian' },
  { name: 'Egotist or Narissist', group: 'guardian' },
  { name: 'Entertainer or Clown or Joker', group: 'guardian' },
  { name: 'Entitled One or Jealous One', group: 'guardian' },
  { name: 'Fanatic or Terrorist or Zealot', group: 'guardian' },
  { name: 'Fantasizer or Dreamer', group: 'guardian' },
  { name: 'Flirt or Seducer', group: 'guardian' },
  { name: 'Hermit or Loner or Recluse', group: 'guardian' },
  { name: 'Hypochondriac or Sick One', group: 'guardian' },
  { name: 'Irresponsible One', group: 'guardian' },
  { name: 'Jealous or Envious One', group: 'guardian' },
  { name: 'Judge or bigot', group: 'guardian' },
  { name: 'Liar or Spy or Secret Keeper', group: 'guardian' },
  { name: 'Magician or Illusionist or Denier', group: 'guardian' },
  { name: 'Nagger or Reminder', group: 'guardian' },
  { name: 'Nihilist or Fatalist', group: 'guardian' },
  { name: 'Obsesser', group: 'guardian' },
  { name: 'People-Pleaser or Peacemaker', group: 'guardian' },
  { name: 'Perfectionist', group: 'guardian' },
  { name: 'Predictor', group: 'guardian' },
  { name: 'Pretender or Phony or Politician', group: 'guardian' },
  { name: 'Procrastinator or Evader', group: 'guardian' },
  { name: 'Rager (may be an inner child)', group: 'guardian' },
  { name: 'Rationalizer or Explainer or Justifier', group: 'guardian' },
  { name: 'Rebel or Defiant One or Rule Breaker', group: 'guardian' },
  { name: 'Replayer or Repeater', group: 'guardian' },
  { name: 'Represser or Stuffer', group: 'guardian' },
  { name: 'Righteous or Pious One', group: 'guardian' },
  { name: 'Self-saboteur or Fail-er or Screw Up', group: 'guardian' },
  { name: 'Skeptic or Doubter', group: 'guardian' },
  { name: 'Slob or Apathetic-Lazy One', group: 'guardian' },
  { name: 'Taskmaster or Overseer', group: 'guardian' },
  { name: 'Vagabond or Drifter or Bum', group: 'guardian' },
  { name: 'Victim or Martyr or Loser', group: 'guardian' },
  { name: 'Warrior or Amazon', group: 'guardian' },
  { name: 'Weirdo', group: 'guardian' },
  { name: 'Whiner or Complainer', group: 'guardian' },
  { name: 'Worrier or Cautious One', group: 'guardian' },
  { name: 'Abandoned Child', group: 'innerKid' },
  { name: 'Anxious or Scared or Worried Child', group: 'innerKid' },
  { name: 'Awed or Amazed Child', group: 'innerKid' },
  { name: 'Bored Child', group: 'innerKid' },
  { name: 'Creative Child or Artist or Inventor', group: 'innerKid' },
  { name: 'Curious Child or Explorer', group: 'innerKid' },
  { name: 'Defiant or Stubborn or Rebel', group: 'innerKid' },
  { name: 'Delighted or Excited child', group: 'innerKid' },
  { name: 'Entitled One', group: 'innerKid' },
  { name: 'Friendly or Happy Child', group: 'innerKid' },
  { name: 'Friendly or Social or Playful Child', group: 'innerKid' },
  { name: 'Frustrated or Impatient Child', group: 'innerKid' },
  { name: 'Grieving Child', group: 'innerKid' },
  { name: 'Guilty Child', group: 'innerKid' },
  { name: 'Helpless Child or Victim', group: 'innerKid' },
  { name: 'Hurt or Resentful Child', group: 'innerKid' },
  { name: 'Hyper Child', group: 'innerKid' },
  { name: 'Hypervigilant Protector', group: 'innerKid' },
  { name: 'Innocent or Naive (Trusting) Child', group: 'innerKid' },
  { name: 'Joker or Clown or Trickster or Imp', group: 'innerKid' },
  { name: 'Lonely or Needy Child', group: 'innerKid' },
  { name: 'Lost or Orphan Child', group: 'innerKid' },
  { name: 'Loving or Loyal Child', group: 'innerKid' },
  { name: 'Overwhelmed or Paralyzed Child', group: 'innerKid' },
  { name: 'Rageful or Aggressive Child', group: 'innerKid' },
  { name: 'Resilient Warrior', group: 'innerKid' },
  { name: 'Responsible Child or Little Adult', group: 'innerKid' },
  { name: 'Selfish or Entitled Child', group: 'innerKid' },
  { name: 'Sensual or Sexual One (often a teen)', group: 'innerKid' },
  { name: 'Shamed Child', group: 'innerKid' },
  { name: 'Sly or Dishonest Child', group: 'innerKid' },
  { name: 'Worried Child', group: 'innerKid' },
  { name: 'Spiritual One (Higher-Power liaison)', group: 'spiritual' },
];

/** Default parts for a single group, in library order. */
export function getDefaultPartsByGroup(group: PartGroup): DefaultPart[] {
  return defaultParts.filter(p => p.group === group);
}
