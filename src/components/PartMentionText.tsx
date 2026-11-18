'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParts } from '@/lib/hooks/useParts';
import { findPartMentions, resolvePartHref } from '@/content/partMentions';

interface PartMentionTextProps {
  text: string;
  className?: string;
}

export function PartMentionText({ text, className }: PartMentionTextProps) {
  const { parts } = useParts();

  const matches = useMemo(() => findPartMentions(text), [text]);

  const segments = useMemo(() => {
    if (matches.length === 0) {
      return [{ type: 'text' as const, content: text }];
    }

    const result: Array<{ type: 'text' | 'link'; content: string; href?: string }> = [];
    let lastEnd = 0;

    for (const match of matches) {
      if (match.start > lastEnd) {
        result.push({ type: 'text' as const, content: text.slice(lastEnd, match.start) });
      }
      const href = resolvePartHref(match, parts);
      result.push({ type: 'link' as const, content: match.text, href });
      lastEnd = match.end;
    }

    if (lastEnd < text.length) {
      result.push({ type: 'text' as const, content: text.slice(lastEnd) });
    }

    return result;
  }, [text, matches, parts]);

  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.type === 'text' ? (
          <span key={index}>{segment.content}</span>
        ) : (
          <Link
            key={index}
            href={segment.href!}
            className="underline underline-offset-2 decoration-dotted decoration-teal hover:bg-teal-tint rounded-[2px] px-[1px] -mx-[1px] transition-colors"
          >
            {segment.content}
          </Link>
        )
      )}
    </span>
  );
}