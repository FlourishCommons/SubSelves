'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPartArt } from '@/content/partArt';
import type { PartGroup } from '@/lib/types';

interface DemoMessage {
  role: 'part' | 'self';
  text: string;
}

interface DemoPart {
  name: string;
  group: PartGroup;
  label: string;
  messages: DemoMessage[];
}

const demoParts: DemoPart[] = [
  {
    name: 'Worrier or Cautious One',
    group: 'guardian',
    label: 'Worrier',
    messages: [
      { role: 'part', text: 'I keep bracing for something bad to happen.' },
      { role: 'self', text: 'I see you. You are trying to keep us safe.' },
      { role: 'part', text: 'I did not know I could put it down for a moment.' },
    ],
  },
  {
    name: 'Planner or Organizer',
    group: 'manager',
    label: 'Planner',
    messages: [
      { role: 'part', text: 'If I stop planning, everything will fall apart.' },
      { role: 'self', text: 'You carry a lot. What would help you trust this moment?' },
      { role: 'part', text: 'Maybe I can set down the list for a minute.' },
    ],
  },
  {
    name: 'Friendly or Social or Playful Child',
    group: 'innerKid',
    label: 'Playful',
    messages: [
      { role: 'part', text: 'Is there room for me here too?' },
      { role: 'self', text: 'Yes. You belong here, exactly as you are.' },
      { role: 'part', text: 'I have missed being welcome.' },
    ],
  },
  {
    name: 'Spiritual One (Higher-Power liaison)',
    group: 'spiritual',
    label: 'Spiritual',
    messages: [
      { role: 'part', text: 'There is a quiet knowing beneath all this.' },
      { role: 'self', text: 'I am listening.' },
      { role: 'part', text: 'You are not alone in this.' },
    ],
  },
];

const groupStyles: Record<
  PartGroup,
  { ring: string; tint: string; border: string; label: string }
> = {
  manager: {
    ring: 'border-apricot',
    tint: 'bg-apricot-tint',
    border: 'border-apricot/40',
    label: 'text-apricot-deep',
  },
  guardian: {
    ring: 'border-golden',
    tint: 'bg-golden-tint',
    border: 'border-golden/40',
    label: 'text-golden-deep',
  },
  innerKid: {
    ring: 'border-periwinkle',
    tint: 'bg-periwinkle-tint',
    border: 'border-periwinkle/40',
    label: 'text-periwinkle-deep',
  },
  spiritual: {
    ring: 'border-sage',
    tint: 'bg-sage-tint',
    border: 'border-sage/40',
    label: 'text-sage-deep',
  },
};

function PartAvatar({ name, group }: { name: string; group: PartGroup }) {
  const art = getPartArt(name, group);
  const styles = groupStyles[group];

  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-ivory p-0.5 ${styles.ring}`}
    >
      {art ? (
        <Image
          src={art.icon}
          alt=""
          width={32}
          height={32}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-teal-tint text-xs font-semibold text-teal-deep">
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}

function SelfAvatar() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-teal/50 bg-ivory text-xs font-semibold text-teal-deep">
      S
    </span>
  );
}

export function HeroPartConversation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const activePart = demoParts[activeIndex];
  const styles = groupStyles[activePart.group];
  const nextMessage = activePart.messages[visibleCount];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(activePart.messages.length);
      return;
    }

    setVisibleCount(0);
    const timers = activePart.messages.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 450 + index * 750)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activePart]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
          A conversation with a part
        </p>
        <span className="shrink-0 rounded-full bg-teal-tint px-2.5 py-1 text-[11px] font-medium text-teal-deep">
          Interactive
        </span>
      </div>

      <div
        className="mt-4 grid grid-cols-4 gap-2"
        role="group"
        aria-label="Choose a part to preview a conversation"
      >
        {demoParts.map((part, index) => {
          const isActive = index === activeIndex;
          const partStyles = groupStyles[part.group];

          return (
            <button
              key={part.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              aria-label={`Preview a conversation with the ${part.label} part`}
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2 text-center transition-colors ${
                isActive
                  ? `${partStyles.border} ${partStyles.tint}`
                  : 'border-ink/10 bg-white hover:border-teal/30 hover:bg-teal-tint/40'
              }`}
            >
              <PartAvatar name={part.name} group={part.group} />
              <span
                className={`text-[11px] font-medium leading-tight ${
                  isActive ? partStyles.label : 'text-ink/60'
                }`}
              >
                {part.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-5 min-h-[14.5rem] space-y-3"
        aria-live="polite"
        aria-atomic="false"
      >
        {activePart.messages.slice(0, visibleCount).map((message, index) => {
          const isSelf = message.role === 'self';

          return (
            <div
              key={`${activePart.name}-${index}`}
              className={`flex animate-[hero-message-in_320ms_ease-out_both] items-start gap-2.5 ${
                isSelf ? 'flex-row-reverse' : ''
              }`}
            >
              {isSelf ? (
                <SelfAvatar />
              ) : (
                <PartAvatar name={activePart.name} group={activePart.group} />
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 text-ink ${
                  isSelf
                    ? 'rounded-tr-md border-2 border-teal/50 bg-ivory'
                    : `rounded-tl-md border ${styles.border} ${styles.tint}`
                }`}
              >
                <p
                  className={`mb-1 text-[11px] font-semibold uppercase tracking-wider ${
                    isSelf ? 'text-teal-deep' : styles.label
                  }`}
                >
                  {isSelf ? 'Self' : activePart.label}
                </p>
                {message.text}
              </div>
            </div>
          );
        })}

        {nextMessage && (
          <div
            className={`flex items-start gap-2.5 ${
              nextMessage.role === 'self' ? 'flex-row-reverse' : ''
            }`}
            aria-hidden="true"
          >
            {nextMessage.role === 'self' ? (
              <SelfAvatar />
            ) : (
              <PartAvatar name={activePart.name} group={activePart.group} />
            )}
            <div
              className={`flex items-center gap-1 rounded-2xl px-3.5 py-3 ${
                nextMessage.role === 'self'
                  ? 'rounded-tr-md border-2 border-teal/50 bg-ivory text-teal-deep'
                  : `rounded-tl-md border ${styles.border} ${styles.tint} ${styles.label}`
              }`}
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-ink/55">
        <span className="flex h-2 w-2 rounded-full bg-sage" />
        Held with compassion, at your pace
      </div>
    </div>
  );
}
