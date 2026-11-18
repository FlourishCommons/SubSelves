import type { PartGroup } from '@/lib/types';

export interface DialogueTemplate {
  group: PartGroup;
  avoid: string;
  try: string;
  explanation: string;
}

export const dialogueTemplates: DialogueTemplate[] = [
  {
    group: 'manager',
    avoid: '"Stop trying to control everything." / "You are being too rigid." / "Just let go already."',
    try: '"I see how hard you are working to keep life running smoothly. What are you afraid would happen if you eased up a little?"',
    explanation: 'Guiding Voices protect by managing proactively. Criticism makes them double down. Acknowledging their effort and asking about their fear builds trust.',
  },
  {
    group: 'guardian',
    avoid: '"You are being destructive." / "Why can you not just cope?" / "This is self-sabotage." / "Stop being so negative."',
    try: '"I know you are trying to protect me from something painful. The distress must be intense for you to go to these lengths. What are you shielding me from?"',
    explanation: 'Protective Voices react to overwhelm or perceived danger — including crisis responders like the Numb-er, Saboteur, or Addict. Shame fuels their urgency. Naming the underlying pain or threat meets their true need.',
  },
  {
    group: 'innerKid',
    avoid: '"You are too sensitive." / "That was a long time ago — move on." / "There is nothing wrong with you." / "Grow up."',
    try: '"I am here now. You do not have to carry this alone. Tell me what it was like for you back then."',
    explanation: 'Young Voices carry buried pain and outdated beliefs. Dismissal reinforces isolation. Steady presence and invitation to share begins the process of bringing them to present safety.',
  },
  {
    group: 'spiritual',
    avoid: '"That is just imagination." / "You are not real." / "Prove it."',
    try: '"Thank you for being here. What wisdom or perspective do you want to share with me today?"',
    explanation: 'Guiding Presence parts may appear as spiritual guides or transcendent wisdom. Skepticism creates distance. Respectful engagement allows their supportive role to unfold naturally.',
  },
];

export function getDialogueTemplate(group: PartGroup): DialogueTemplate {
  return dialogueTemplates.find(t => t.group === group) || dialogueTemplates[0];
}