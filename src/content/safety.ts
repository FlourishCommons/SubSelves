export const safetyDisclaimer = `SubSelves is an educational self-exploration companion inspired by parts-work and sub-personality traditions in psychology. It is NOT therapy, NOT a substitute for professional mental health care, and does NOT provide diagnosis, treatment, or clinical advice. Use at your own discretion. If you are in crisis, experiencing severe distress, or have a history of complex trauma, please seek support from a qualified mental health professional.`;

export const attribution = `SubSelves is an independent, non-commercial project inspired by parts-work and sub-personality traditions in psychology. It is not affiliated with, endorsed by, or certified by any professional therapy organization.

With heartfelt gratitude to Peter K. Gerlach, MSW (1938–2015), whose remarkable free online work at sfhelp.org helped shape the understanding of parts and inner systems reflected in this app. He gave away a lifetime of clinical wisdom and experience — openly, generously, and without charge — so that others could heal and break cycles of wounds and unawareness. His generosity and his mission live on. Thank you, Pete.

We also honor everyone who shares their knowledge freely for the benefit of others.`;

export interface CrisisResource {
  name: string;
  description: string;
  phone?: string;
  url?: string;
  regions: string[];
}

export const crisisResources: CrisisResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline (USA)',
    description: 'Call or text 988 for free, confidential support 24/7.',
    phone: '988',
    url: 'https://988lifeline.org',
    regions: ['US'],
  },
  {
    name: 'Crisis Text Line (USA)',
    description: 'Text HOME to 741741 for free, 24/7 crisis support.',
    phone: '741741',
    url: 'https://www.crisistextline.org',
    regions: ['US'],
  },
  {
    name: 'Samaritans (UK)',
    description: 'Call 116 123 for free, confidential emotional support 24/7.',
    phone: '116 123',
    url: 'https://www.samaritans.org',
    regions: ['UK'],
  },
  {
    name: 'Crisis Services Canada',
    description: 'Call 1-833-456-4566 or text 45645 for 24/7 support.',
    phone: '1-833-456-4566',
    url: 'https://www.crisisservicescanada.ca',
    regions: ['CA'],
  },
  {
    name: 'Lifeline (Australia)',
    description: 'Call 13 11 14 for 24/7 crisis support.',
    phone: '13 11 14',
    url: 'https://www.lifeline.org.au',
    regions: ['AU'],
  },
  {
    name: 'International Association for Suicide Prevention',
    description: 'Global directory of crisis centers and helplines.',
    url: 'https://www.iasp.info/resources/Crisis_Centres/',
    regions: ['Global'],
  },
  {
    name: 'Befrienders Worldwide',
    description: 'Global network of emotional support helplines.',
    url: 'https://www.befrienders.org/',
    regions: ['Global'],
  },
  {
    name: 'Find A Helpline',
    description: 'Searchable database of local crisis lines by country.',
    url: 'https://findahelpline.com',
    regions: ['Global'],
  },
];

export function getCrisisResourcesForRegion(regionCode: string): CrisisResource[] {
  return crisisResources.filter(r => r.regions.includes(regionCode) || r.regions.includes('Global'));
}