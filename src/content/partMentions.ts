/**
 * "Part mention" recognition + linking.
 *
 * Strategy text names part *types* (e.g., "Critic", "Numb-er", "Nurturer",
 * or just "aggressive"/"Entitled" in an enumeration). This module finds those
 * names in free text and resolves a click target:
 *   - if the user already has a matching part  -> /parts/<id>
 *   - otherwise                               -> /parts?add=<name>&group=<g>
 * so a name in the copy becomes a link the user can follow or act on.
 *
 * Matching rules:
 *   - case-insensitive, whole-word, and tolerant of a trailing plural "s"
 *     (so "critics" and "Critic" both link)
 *   - longest alias wins, so "numb-er" beats "numb" and "aggressive child"
 *     beats "aggressive"
 * The registry is curated (not auto-derived) so only meaningful part names
 * become links and generic words ("part", "self", "kids") never do.
 */

import { defaultParts } from './defaultParts';
import type { PartGroup } from '@/lib/types';

export interface PartMentionSpec {
  /** Canonical name shown/passed through when creating a part. */
  canonical: string;
  /** Matching name in the default library, if any (for group + prefill). */
  defaultPartName?: string;
  /** Group to use when there is no library entry (for the add-part flow). */
  defaultGroup?: PartGroup;
  /** Lowercased phrases that should link to this part. */
  aliases: string[];
}

/**
 * Curated mention registry. `defaultPartName` points at an entry in
 * `defaultParts` when one exists; without it, clicking offers to create a
 * new part with the canonical name (in `defaultGroup` when known).
 */
export const partMentionSpecs: PartMentionSpec[] = [
  { canonical: 'Critic or Shamer or Blamer', defaultPartName: 'Critic or Shamer or Blamer', aliases: ['critic', 'shamer', 'blamer'] },
  { canonical: 'Perfectionist', defaultPartName: 'Perfectionist', aliases: ['perfectionist'] },
  { canonical: 'Anesthetist or Numb-er or Blocker', defaultPartName: 'Anesthetist or Numb-er or Blocker', aliases: ['numb-er', 'numbing', 'numb', 'blocker', 'anesthetist'] },
  { canonical: 'Nurturer(s) or Loving Parent', defaultPartName: 'Nurturer(s) or Loving Parent', aliases: ['nurturer'] },
  { canonical: 'Self-saboteur or Fail-er or Screw Up', defaultPartName: 'Self-saboteur or Fail-er or Screw Up', aliases: ['saboteur', 'self-saboteur'] },
  { canonical: 'Worrier or Cautious One', defaultPartName: 'Worrier or Cautious One', aliases: ['worrier'] },
  { canonical: 'Catastrophizer', defaultPartName: 'Catastrophizer', aliases: ['catastrophizer', 'catastrophiser'] },
  { canonical: 'Pessimist', defaultGroup: 'guardian', aliases: ['pessimist'] },
  { canonical: 'Analyzer or Thinker', defaultPartName: 'Analyzer or Thinker', aliases: ['analyzer'] },
  { canonical: 'Addict or Compulsive One', defaultPartName: 'Addict or Compulsive One', aliases: ['addict'] },
  { canonical: 'Rager (may be an inner child)', defaultPartName: 'Rager (may be an inner child)', aliases: ['rager'] },
  { canonical: 'Skeptic or Doubter', defaultPartName: 'Skeptic or Doubter', aliases: ['skeptic', 'doubter'] },
  { canonical: 'Controller or Manipulator or User', defaultPartName: 'Controller or Manipulator or User', aliases: ['controller', 'manipulator'] },
  { canonical: 'Magician or Illusionist or Denier', defaultPartName: 'Magician or Illusionist or Denier', aliases: ['magician'] },
  { canonical: 'Egotist or Narissist', defaultPartName: 'Egotist or Narissist', aliases: ['egotist'] },
  { canonical: 'Entitled One', defaultPartName: 'Entitled One', aliases: ['entitled kid', 'entitled one', 'entitled child', 'entitled'] },
  { canonical: 'Defiant or Stubborn or Rebel', defaultPartName: 'Defiant or Stubborn or Rebel', aliases: ['rebel', 'defiant', 'stubborn'] },
  { canonical: 'Procrastinator or Evader', defaultPartName: 'Procrastinator or Evader', aliases: ['procrastinator'] },
  { canonical: 'Frustrated or Impatient Child', defaultPartName: 'Frustrated or Impatient Child', aliases: ['impatient child', 'frustrated child', 'impatient', 'frustrated'] },
  { canonical: 'Rageful or Aggressive Child', defaultPartName: 'Rageful or Aggressive Child', aliases: ['rageful child', 'aggressive child', 'aggressive part', 'aggressive', 'rageful'] },
  { canonical: 'Shamed Child', defaultPartName: 'Shamed Child', aliases: ['shamed child'] },
  { canonical: 'Abandoned Child', defaultPartName: 'Abandoned Child', aliases: ['abandoned child', 'abandoned'] },
  { canonical: 'Hurt or Resentful Child', defaultPartName: 'Hurt or Resentful Child', aliases: ['hurt child', 'resentful child', 'hurt', 'resentful'] },
  { canonical: 'Anxious or Scared or Worried Child', defaultPartName: 'Anxious or Scared or Worried Child', aliases: ['scared child', 'anxious child', 'worried child', 'scared', 'anxious', 'worried'] },
  { canonical: 'Insecure Child', defaultGroup: 'innerKid', aliases: ['insecure child', 'insecure kid', 'insecure'] },
  { canonical: 'Peaceful Warrior', defaultGroup: 'guardian', aliases: ['peaceful warrior'] },
];

export interface MentionMatch {
  /** Inclusive start index in the source text. */
  start: number;
  /** Exclusive end index. */
  end: number;
  /** The exact substring that matched. */
  text: string;
  /** Canonical part name to pass through. */
  canonical: string;
  /** Matching default-library part name, if any. */
  defaultPartName?: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// alias(lowercased) -> spec, built once. Longest aliases win at match time.
const aliasToSpec = new Map<string, PartMentionSpec>();
for (const spec of partMentionSpecs) {
  for (const alias of spec.aliases) {
    const key = alias.toLowerCase();
    if (!aliasToSpec.has(key)) aliasToSpec.set(key, spec);
  }
}

const aliasAlternation = [...aliasToSpec.keys()]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join('|');

// Whole-word match, tolerant of a trailing plural "s".
const mentionRegex = new RegExp(`(?<![a-z0-9])(${aliasAlternation})s?(?![a-z0-9])`, 'gi');

/**
 * Find all part mentions in `text`, non-overlapping, left-to-right.
 */
export function findPartMentions(text: string): MentionMatch[] {
  const matches: MentionMatch[] = [];
  let lastEnd = 0;
  mentionRegex.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = mentionRegex.exec(text)) !== null) {
    if (m.index < lastEnd) continue; // skip overlaps
    const lower = m[0].toLowerCase();
    const spec = aliasToSpec.get(lower) ?? (lower.endsWith('s') ? aliasToSpec.get(lower.slice(0, -1)) : undefined);
    if (!spec) continue;
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      canonical: spec.canonical,
      defaultPartName: spec.defaultPartName,
    });
    lastEnd = m.index + m[0].length;
  }
  return matches;
}

export interface PartLike {
  id: string;
  name: string;
}

function resolveGroup(spec?: PartMentionSpec): PartGroup | undefined {
  if (spec?.defaultPartName) {
    return defaultParts.find(p => p.name === spec.defaultPartName)?.group;
  }
  return spec?.defaultGroup;
}

function findUserPartFor(spec: PartMentionSpec, userParts: PartLike[]): PartLike | undefined {
  const canonicalLc = spec.canonical.toLowerCase();
  return userParts.find(p => {
    const name = p.name.toLowerCase();
    return name === canonicalLc || spec.aliases.some(alias => name.includes(alias));
  });
}

function addHref(spec: PartMentionSpec | undefined, canonical: string): string {
  const params = new URLSearchParams();
  params.set('add', spec?.defaultPartName ?? canonical);
  const group = resolveGroup(spec);
  if (group) params.set('group', group);
  return `/parts?${params.toString()}`;
}

/**
 * Resolve where a mention should link for a given user.
 * - matching user part -> `/parts/<id>`
 * - otherwise          -> `/parts?add=<name>` (+ group when known)
 */
export function resolvePartHref(
  match: Pick<MentionMatch, 'canonical' | 'defaultPartName'> & { text: string },
  userParts: PartLike[]
): string {
  const spec = partMentionSpecs.find(s => s.canonical === match.canonical);
  const found = spec
    ? findUserPartFor(spec, userParts)
    : userParts.find(p => p.name.toLowerCase().includes(match.text.toLowerCase()));
  return found ? `/parts/${found.id}` : addHref(spec, match.canonical);
}

/**
 * Resolve a link for a canonical part name (used by `keyParts` chips).
 * Matches the user's parts via the registry aliases, else the add-part flow.
 */
export function resolvePartHrefByName(name: string, userParts: PartLike[]): string {
  const spec = partMentionSpecs.find(s => s.canonical === name);
  const found = spec ? findUserPartFor(spec, userParts) : undefined;
  return found ? `/parts/${found.id}` : addHref(spec, name);
}

/** Short, friendly label for a canonical part name (first option, no parens). */
export function shortPartLabel(name: string): string {
  const first = name.split(' or ')[0] ?? name;
  return first.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}
