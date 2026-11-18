export interface TroubleshootingEntry {
  id: string;
  title: string;
  signs: string[];
  causes: string[];
  options: string[];
}

export const troubleshooting: TroubleshootingEntry[] = [
  {
    id: 'focus',
    title: 'Trouble Staying Focused "Inside"',
    signs: [
      'Mind wanders to outer tasks, noises, or worries',
      'Fell asleep or zoned out during practice',
      'Cannot sustain inner attention for more than a few seconds',
      'Frustration or self-criticism about "not doing it right"',
    ],
    causes: [
      'Nervous system not yet settled — survival brain prioritizes outer scanning',
      'A Protective Voice (e.g., Worrier, Analyzer, Critic) pulls attention outward to avoid inner contact',
      'Fatigue, hunger, or physiological dysregulation',
      'Unrealistic expectation that inner focus should feel like meditation "bliss"',
    ],
    options: [
      'Shorten sessions: 2–3 minutes of quality beats 20 minutes of struggle',
      'Use the Session Setup checklist: undistracted time, comfortable posture, physiological needs met',
      'Ground first: 5-4-3-2-1 senses, push feet into floor, name 3 things you see/hear/feel',
      'Try non-visual channels: "What do you sense/feel/know?" — you do not need to visualize',
      'Ask: "Is a part pulling me away? Who does not want me to go inside?" — then dialogue with *that* part',
      'Practice "micro-unblending" throughout the day: "A part of me is distracted" — builds the muscle',
    ],
  },
  {
    id: 'imaging',
    title: 'Difficulty Imaging Parts',
    signs: [
      '"I cannot see anything" — no visual images of parts',
      'Feeling inadequate or "broken" because others describe vivid inner figures',
      'Getting stuck trying to force a visualization',
    ],
    causes: [
      'Natural variation: many people are non-visual — inner experience comes as felt sense, inner knowing, voices, body sensations, or metaphor',
      'A Blocker part may be preventing images to protect a vulnerable Young Voice',
      'Trying too hard — effort creates tension that blocks subtle perception',
    ],
    options: [
      'Reminder: You do not need to visualize. Parts work uses ALL channels: inner voices, emotions, body sensations, "just knowing," hunches, memories, writing, drawing, movement',
      'Switch channels: "If this part had a voice, what would it sound like?" "Where do you feel it in your body?" "If it were a color/texture/temperature, what would it be?"',
      'Ask the Blocker question: "Is there a part that does not want an image to appear? What is it protecting?"',
      'Use the "change chairs" method: physically move to a different seat and speak *as* the part, then return and respond as Inner Leader',
      'Write or draw without planning — let the hand move. Symbolic output often bypasses visual blocks',
    ],
  },
  {
    id: 'silent',
    title: 'A Part Will Not / Cannot Talk',
    signs: [
      'Silence, blankness, or "I don\'t know" when you ask a question',
      'Part seems present but refuses to engage',
      'Frustration or giving up after repeated attempts',
    ],
    causes: [
      'A Protective Voice (Blocker, Skeptic, Critic) is intercepting — it does not trust the process or fears what the silent part might reveal',
      'The silent part is a Young Voice too terrified to speak — silence *is* its communication',
      'The part communicates non-verbally (sensation, emotion, image) and you are only listening for words',
      'Inner Leader is blended with a part that demands immediate verbal answers',
    ],
    options: [
      'Unblend first. Check: "Am I blended with a part that wants an answer *now*?"',
      'Ask: "Who does not want this part to speak?" — then dialogue with *that* Protective Voice first',
      'Reframe silence: "Your silence tells me something. Are you scared? Is it not safe yet?" — wait patiently',
      'Offer non-verbal options: "Can you show me with a sensation? An image? A color? A gesture?"',
      'Try the "change chairs" method: sit in the part\'s seat and let it express without words',
      'Reassure: "You do not have to talk. I will stay with you. We can just be here together." — trust builds over repetitions',
    ],
  },
  {
    id: 'resistance',
    title: 'A Part Resists Change',
    signs: [
      'Part agrees in session but reverts afterward',
      '"This will not work," "Nothing changes," "I cannot trust"',
      'Polarization: two parts locked in opposition (e.g., Critic vs. Rebel, Perfectionist vs. Procrastinator)',
      'Saboteur activates when progress appears — "see, it failed"',
    ],
    causes: [
      'The part\'s fear is real to it — change = danger/death in its internal logic',
      'Trust level too low — the part has not yet experienced Inner Leader keeping things safe',
      'The part is *living in the past* — it does not know the present is different',
      'A Protective Voice guards the resistant part and blocks change to maintain the status quo',
      'Inner Leader is not consistently leading — blending still frequent',
    ],
    options: [
      'Patience framing: "Resistance is a part doing its job. I will get to know *that* part."',
      'Rank-order parts: Which part is most afraid? Start there. Build trust bottom-up.',
      'Check "living in the past": "What year is it for you?" — if past, rescuing precedes reassignment',
      'Trust-building trials: "Inner Leader, lead for 30 minutes. Part, watch and report back: Was I safe?" Repeat. Trust grows 0→5 over time.',
      'Involve the Nurturer (a Guiding Voice) to soothe the afraid part while Inner Leader negotiates',
      'Never "fire" parts. Reassure: "You will never be banished. Your talents are needed — just in a new way."',
      'For polarization: hear each side fully, then ask "What do you both want for me?" — often the same core need (safety, love)',
    ],
  },
  {
    id: 'doubt',
    title: 'Doubt & Skepticism',
    signs: [
      '"This feels made up / like I am talking to myself"',
      '"Parts are not real — this is just imagination"',
      'Intellectual understanding without felt shift',
      'Quitting early because "it is not working"',
    ],
    causes: [
      'A Skeptic/Doubter Protective Voice guards against hope — hope feels dangerous (past disappointments)',
      'Cultural conditioning: only the rational mind is "real"; inner multiplicity pathologized',
      'Expecting dramatic, instant transformation — the process is gradual and relational',
      'Blended with a part that *needs* this to fail to protect a vulnerable Young Voice',
    ],
    options: [
      'Name the Skeptic: "A part of me doubts this. Hello, Skeptic. What are you protecting me from?" — dialogue with it first',
      'Reframe: "Parts are functional neural networks. You experience them as voices/feelings/sensations. The map is not the territory, but the map helps navigation."',
      'Lower the bar: "I do not need to believe. I just need to try the practice and notice what happens." — treat as experiment',
      'Reassure all parts: "No part will be fired, killed, or exiled. This is about collaboration, not elimination."',
      'Track micro-wins: one moment of unblending, one flash of curiosity, one night of better sleep — data over drama',
      'Read "Resistance Is a Part" and "All Parts Protect" articles. Understanding the logic reduces shame.',
    ],
  },
];

export function getTroubleshootingEntry(id: string): TroubleshootingEntry | undefined {
  return troubleshooting.find(t => t.id === id);
}

export function getAllTroubleshooting(): TroubleshootingEntry[] {
  return [...troubleshooting];
}