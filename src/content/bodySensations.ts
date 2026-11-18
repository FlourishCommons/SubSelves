// Sensations supplied by the user. Repeated names in different categories have distinct IDs.
export interface BodySensation { id: string; name: string; category: string; typicalBodyParts: string[]; commonlyWithEmotions: string[] }
export const BODY_SENSATIONS: BodySensation[] = [
  {
    "id": "piercing",
    "name": "piercing",
    "category": "pain",
    "typicalBodyParts": [
      "head",
      "chest",
      "stomach",
      "limbs",
      "back"
    ],
    "commonlyWithEmotions": [
      "hurt",
      "sharp pain"
    ]
  },
  {
    "id": "melting",
    "name": "melting",
    "category": "softness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "tender",
      "loving",
      "releasing"
    ]
  },
  {
    "id": "fluttery",
    "name": "fluttery",
    "category": "movement",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "excited",
      "nervous"
    ]
  },
  {
    "id": "chilled",
    "name": "chilled",
    "category": "temperature",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "scared",
      "uncomfortable"
    ]
  },
  {
    "id": "buzzing",
    "name": "buzzing",
    "category": "mixed",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "excited",
      "anxious",
      "alive"
    ]
  },
  {
    "id": "pounding",
    "name": "pounding",
    "category": "pulsing",
    "typicalBodyParts": [
      "head",
      "body"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "angry",
      "heart racing"
    ]
  },
  {
    "id": "sick",
    "name": "sick",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "disgusted",
      "ill"
    ]
  },
  {
    "id": "hard",
    "name": "hard",
    "category": "texture",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "tense",
      "rigid",
      "defensive"
    ]
  },
  {
    "id": "flushed",
    "name": "flushed",
    "category": "energised",
    "typicalBodyParts": [
      "face"
    ],
    "commonlyWithEmotions": [
      "embarrassed",
      "ashamed",
      "hot"
    ]
  },
  {
    "id": "throbbing",
    "name": "throbbing",
    "category": "pulsing",
    "typicalBodyParts": [
      "head",
      "chest",
      "stomach",
      "limbs",
      "back"
    ],
    "commonlyWithEmotions": [
      "pain",
      "tender",
      "constricted"
    ]
  },
  {
    "id": "quivery",
    "name": "quivery",
    "category": "trembling",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "vulnerable",
      "emotional"
    ]
  },
  {
    "id": "pulsing",
    "name": "pulsing",
    "category": "pulsing",
    "typicalBodyParts": [
      "body",
      "chest"
    ],
    "commonlyWithEmotions": [
      "alive",
      "energised",
      "constricted"
    ]
  },
  {
    "id": "lax",
    "name": "lax",
    "category": "lightness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "relaxed",
      "loose"
    ]
  },
  {
    "id": "tight",
    "name": "tight",
    "category": "tension",
    "typicalBodyParts": [
      "body",
      "limbs",
      "chest",
      "stomach",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "constricted",
      "disgusted"
    ]
  },
  {
    "id": "jagged",
    "name": "jagged",
    "category": "pain",
    "typicalBodyParts": [
      "head",
      "chest",
      "stomach",
      "limbs",
      "back"
    ],
    "commonlyWithEmotions": [
      "hurt",
      "raw"
    ]
  },
  {
    "id": "queasy",
    "name": "queasy",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "disgusted",
      "uncomfortable"
    ]
  },
  {
    "id": "jittery",
    "name": "jittery",
    "category": "movement",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared",
      "nervous",
      "guilty"
    ]
  },
  {
    "id": "clammy",
    "name": "clammy",
    "category": "moisture",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared",
      "uncomfortable"
    ]
  },
  {
    "id": "numb",
    "name": "numb",
    "category": "numbness",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "depressed",
      "ashamed",
      "dissociated",
      "constricted"
    ]
  },
  {
    "id": "cool",
    "name": "cool",
    "category": "temperature",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "calm",
      "constricted"
    ]
  },
  {
    "id": "jumpy",
    "name": "jumpy",
    "category": "movement",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared",
      "startled"
    ]
  },
  {
    "id": "goose-bumpy",
    "name": "goose bumpy",
    "category": "energised",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "excited",
      "scared",
      "moved"
    ]
  },
  {
    "id": "pulsing-energised",
    "name": "pulsing",
    "category": "energised",
    "typicalBodyParts": [
      "body",
      "chest"
    ],
    "commonlyWithEmotions": [
      "alive",
      "energised"
    ]
  },
  {
    "id": "bilious",
    "name": "bilious",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "disgusted",
      "angry"
    ]
  },
  {
    "id": "restricted",
    "name": "restricted",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "constricted",
      "scared"
    ]
  },
  {
    "id": "dizzy",
    "name": "dizzy",
    "category": "disorientation",
    "typicalBodyParts": [
      "head"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "overwhelmed",
      "faint"
    ]
  },
  {
    "id": "contracted",
    "name": "contracted",
    "category": "tension",
    "typicalBodyParts": [
      "shoulders",
      "back"
    ],
    "commonlyWithEmotions": [
      "constricted",
      "defensive"
    ]
  },
  {
    "id": "tender",
    "name": "tender",
    "category": "mixed",
    "typicalBodyParts": [
      "chest",
      "heart"
    ],
    "commonlyWithEmotions": [
      "vulnerable",
      "loving",
      "hurt"
    ]
  },
  {
    "id": "silky",
    "name": "silky",
    "category": "softness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "pleasant",
      "smooth"
    ]
  },
  {
    "id": "deep",
    "name": "deep",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "relaxed",
      "calm"
    ]
  },
  {
    "id": "quivering",
    "name": "quivering",
    "category": "mixed",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "vulnerable",
      "emotional",
      "trembling"
    ]
  },
  {
    "id": "damp",
    "name": "damp",
    "category": "moisture",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "uncomfortable"
    ]
  },
  {
    "id": "constricted",
    "name": "constricted",
    "category": "tension",
    "typicalBodyParts": [
      "body",
      "limbs",
      "chest",
      "stomach",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "angry",
      "guilty",
      "constricted"
    ]
  },
  {
    "id": "sticky",
    "name": "sticky",
    "category": "moisture",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "uncomfortable",
      "unpleasant"
    ]
  },
  {
    "id": "fast",
    "name": "fast",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared",
      "angry"
    ]
  },
  {
    "id": "heavy",
    "name": "heavy",
    "category": "weight",
    "typicalBodyParts": [
      "eyes",
      "head"
    ],
    "commonlyWithEmotions": [
      "sad",
      "depressed",
      "ashamed"
    ]
  },
  {
    "id": "cold",
    "name": "cold",
    "category": "temperature",
    "typicalBodyParts": [
      "hands",
      "feet",
      "body"
    ],
    "commonlyWithEmotions": [
      "scared",
      "constricted",
      "numb"
    ]
  },
  {
    "id": "cramped",
    "name": "cramped",
    "category": "tension",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "uncomfortable",
      "constricted"
    ]
  },
  {
    "id": "knotted",
    "name": "knotted",
    "category": "tension",
    "typicalBodyParts": [
      "shoulders",
      "back",
      "neck",
      "limbs"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "angry",
      "disgusted"
    ]
  },
  {
    "id": "sore",
    "name": "sore",
    "category": "pain",
    "typicalBodyParts": [
      "head",
      "chest",
      "stomach",
      "limbs",
      "back"
    ],
    "commonlyWithEmotions": [
      "hurt",
      "tender",
      "vulnerable"
    ]
  },
  {
    "id": "tingling",
    "name": "tingling",
    "category": "energised",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "excited",
      "anxious",
      "anticipation"
    ]
  },
  {
    "id": "pressure",
    "name": "pressure",
    "category": "tension",
    "typicalBodyParts": [
      "eyes",
      "head"
    ],
    "commonlyWithEmotions": [
      "stressed",
      "overwhelmed"
    ]
  },
  {
    "id": "prickly",
    "name": "prickly",
    "category": "mixed",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "irritable",
      "defensive",
      "uncomfortable"
    ]
  },
  {
    "id": "nauseous",
    "name": "nauseous",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "disgusted",
      "sick"
    ]
  },
  {
    "id": "bloated",
    "name": "bloated",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "full",
      "uncomfortable"
    ]
  },
  {
    "id": "ragged",
    "name": "ragged",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "crying",
      "distressed"
    ]
  },
  {
    "id": "pounding-energised",
    "name": "pounding",
    "category": "energised",
    "typicalBodyParts": [
      "chest",
      "heart"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "excited",
      "angry"
    ]
  },
  {
    "id": "soft",
    "name": "soft",
    "category": "softness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "gentle",
      "tender",
      "relaxed"
    ]
  },
  {
    "id": "warm",
    "name": "warm",
    "category": "energised",
    "typicalBodyParts": [
      "body",
      "chest",
      "face"
    ],
    "commonlyWithEmotions": [
      "happy",
      "content",
      "loved"
    ]
  },
  {
    "id": "limp",
    "name": "limp",
    "category": "lightness",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "exhausted",
      "depleted"
    ]
  },
  {
    "id": "fuzzy",
    "name": "fuzzy",
    "category": "disorientation",
    "typicalBodyParts": [
      "head"
    ],
    "commonlyWithEmotions": [
      "confused",
      "anxious",
      "disconnected"
    ]
  },
  {
    "id": "dull",
    "name": "dull",
    "category": "numbness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "depressed",
      "disconnected"
    ]
  },
  {
    "id": "twitchy",
    "name": "twitchy",
    "category": "energised",
    "typicalBodyParts": [
      "hands"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "restless"
    ]
  },
  {
    "id": "rush",
    "name": "rush",
    "category": "movement",
    "typicalBodyParts": [
      "body",
      "chest"
    ],
    "commonlyWithEmotions": [
      "angry",
      "urgent",
      "panicked"
    ]
  },
  {
    "id": "pounding-cardiovascular",
    "name": "pounding",
    "category": "cardiovascular",
    "typicalBodyParts": [
      "chest",
      "heart"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "angry",
      "energised"
    ]
  },
  {
    "id": "wobbly",
    "name": "wobbly",
    "category": "trembling",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "vulnerable",
      "weak",
      "uncertain"
    ]
  },
  {
    "id": "wobbly-weakness",
    "name": "wobbly",
    "category": "weakness",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "vulnerable",
      "uncertain",
      "weak"
    ]
  },
  {
    "id": "slow",
    "name": "slow",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "relaxed",
      "calm"
    ]
  },
  {
    "id": "itchy",
    "name": "itchy",
    "category": "energised",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "restless",
      "uncomfortable"
    ]
  },
  {
    "id": "breathless",
    "name": "breathless",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared",
      "energised"
    ]
  },
  {
    "id": "stretchy",
    "name": "stretchy",
    "category": "texture",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "flexible",
      "expanding"
    ]
  },
  {
    "id": "prickly-pain",
    "name": "prickly",
    "category": "pain",
    "typicalBodyParts": [
      "skin"
    ],
    "commonlyWithEmotions": [
      "angry",
      "uncomfortable",
      "vulnerable",
      "constricted"
    ]
  },
  {
    "id": "clenched",
    "name": "clenched",
    "category": "tension",
    "typicalBodyParts": [
      "face"
    ],
    "commonlyWithEmotions": [
      "angry",
      "anxious",
      "constricted",
      "disgusted"
    ]
  },
  {
    "id": "shaky",
    "name": "shaky",
    "category": "trembling",
    "typicalBodyParts": [
      "hands"
    ],
    "commonlyWithEmotions": [
      "scared",
      "anxious",
      "vulnerable"
    ]
  },
  {
    "id": "sweaty",
    "name": "sweaty",
    "category": "moisture",
    "typicalBodyParts": [
      "hands"
    ],
    "commonlyWithEmotions": [
      "scared",
      "anxious",
      "hot"
    ]
  },
  {
    "id": "trembly",
    "name": "trembly",
    "category": "trembling",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared"
    ]
  },
  {
    "id": "shivery",
    "name": "shivery",
    "category": "temperature",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "scared",
      "cold"
    ]
  },
  {
    "id": "electric",
    "name": "electric",
    "category": "energised",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "excited",
      "energised"
    ]
  },
  {
    "id": "streaming",
    "name": "streaming",
    "category": "energised",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "energised",
      "flowing"
    ]
  },
  {
    "id": "trembling",
    "name": "trembling",
    "category": "trembling",
    "typicalBodyParts": [
      "hands"
    ],
    "commonlyWithEmotions": [
      "scared",
      "emotional",
      "vulnerable"
    ]
  },
  {
    "id": "twitchy-trembling",
    "name": "twitchy",
    "category": "trembling",
    "typicalBodyParts": [
      "hands"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "restless"
    ]
  },
  {
    "id": "warm-temperature",
    "name": "warm",
    "category": "temperature",
    "typicalBodyParts": [
      "body",
      "chest",
      "face"
    ],
    "commonlyWithEmotions": [
      "happy",
      "loved",
      "tender",
      "openhearted"
    ]
  },
  {
    "id": "buzzy",
    "name": "buzzy",
    "category": "energised",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "excited",
      "anxious",
      "guilty"
    ]
  },
  {
    "id": "congested",
    "name": "congested",
    "category": "texture",
    "typicalBodyParts": [
      "throat"
    ],
    "commonlyWithEmotions": [
      "blocked",
      "stuffed",
      "constricted"
    ]
  },
  {
    "id": "vibrating",
    "name": "vibrating",
    "category": "trembling",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "energised"
    ]
  },
  {
    "id": "weak",
    "name": "weak",
    "category": "weakness",
    "typicalBodyParts": [
      "limbs",
      "arms",
      "legs"
    ],
    "commonlyWithEmotions": [
      "tired",
      "depleted"
    ]
  },
  {
    "id": "heart-pounding",
    "name": "heart-pounding",
    "category": "cardiovascular",
    "typicalBodyParts": [
      "chest",
      "heart"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "excited",
      "scared"
    ]
  },
  {
    "id": "achy",
    "name": "achy",
    "category": "pain",
    "typicalBodyParts": [
      "head",
      "chest",
      "stomach",
      "limbs",
      "back"
    ],
    "commonlyWithEmotions": [
      "vulnerable",
      "hurt",
      "tired"
    ]
  },
  {
    "id": "bursting",
    "name": "bursting",
    "category": "energised",
    "typicalBodyParts": [
      "chest",
      "heart"
    ],
    "commonlyWithEmotions": [
      "excited",
      "joyful"
    ]
  },
  {
    "id": "shallow",
    "name": "shallow",
    "category": "breathing",
    "typicalBodyParts": [
      "chest",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "scared"
    ]
  },
  {
    "id": "acidic",
    "name": "acidic",
    "category": "digestive",
    "typicalBodyParts": [
      "stomach"
    ],
    "commonlyWithEmotions": [
      "disgusted",
      "upset"
    ]
  },
  {
    "id": "headachy",
    "name": "headachy",
    "category": "pain",
    "typicalBodyParts": [
      "head"
    ],
    "commonlyWithEmotions": [
      "stressed",
      "anxious",
      "tired"
    ]
  },
  {
    "id": "thick",
    "name": "thick",
    "category": "weight",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "depressed",
      "sluggish",
      "constricted"
    ]
  },
  {
    "id": "faint",
    "name": "faint",
    "category": "disorientation",
    "typicalBodyParts": [
      "head"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "overwhelmed",
      "weak"
    ]
  },
  {
    "id": "effervescent",
    "name": "effervescent",
    "category": "energised",
    "typicalBodyParts": [
      "body"
    ],
    "commonlyWithEmotions": [
      "joyful",
      "excited"
    ]
  },
  {
    "id": "dry",
    "name": "dry",
    "category": "dryness",
    "typicalBodyParts": [
      "eyes"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "thirsty",
      "uncomfortable"
    ]
  },
  {
    "id": "loose",
    "name": "loose",
    "category": "lightness",
    "typicalBodyParts": [],
    "commonlyWithEmotions": [
      "relaxed",
      "released"
    ]
  },
  {
    "id": "tense",
    "name": "tense",
    "category": "tension",
    "typicalBodyParts": [
      "body",
      "limbs",
      "chest",
      "stomach",
      "throat"
    ],
    "commonlyWithEmotions": [
      "anxious",
      "angry",
      "scared",
      "guilty"
    ]
  }
];
