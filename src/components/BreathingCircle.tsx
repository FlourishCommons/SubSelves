'use client';

import { useEffect, useState } from 'react';

interface BreathingCircleProps {
  inhaleDuration?: number;
  exhaleDuration?: number;
  holdDuration?: number;
  size?: number;
  className?: string;
}

export function BreathingCircle({
  inhaleDuration = 4000,
  exhaleDuration = 6000,
  holdDuration = 1000,
  size = 200,
  className = '',
}: BreathingCircleProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [scale, setScale] = useState(0.6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    let timeout: NodeJS.Timeout;

    const runCycle = () => {
      // Inhale
      setPhase('inhale');
      setScale(1);
      timeout = setTimeout(() => {
        // Hold
        setPhase('hold');
        timeout = setTimeout(() => {
          // Exhale
          setPhase('exhale');
          setScale(0.6);
          timeout = setTimeout(() => {
            setCycleCount(c => c + 1);
            runCycle();
          }, exhaleDuration);
        }, holdDuration);
      }, inhaleDuration);
    };

    runCycle();

    return () => clearTimeout(timeout);
  }, [isPlaying, inhaleDuration, exhaleDuration, holdDuration]);

  const toggle = () => setIsPlaying(p => !p);
  const reset = () => {
    setIsPlaying(false);
    setPhase('inhale');
    setScale(0.6);
    setCycleCount(0);
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Outer guide ring */}
        <svg
          width={size}
          height={size}
          className="absolute text-ink/10"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 2}
            fill="none"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Breathing circle */}
        <div
          className="rounded-full bg-teal/20 transition-all duration-1000 ease-in-out"
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            transformOrigin: 'center',
          }}
          role="img"
          aria-label={`Breathing circle, currently ${phase}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-teal-deep font-medium text-lg">
              {phase === 'inhale' && 'Breathe in'}
              {phase === 'hold' && 'Hold'}
              {phase === 'exhale' && 'Breathe out'}
            </span>
          </div>
        </div>

        {/* Phase indicator ring */}
        <svg
          width={size + 16}
          height={size + 16}
          className="absolute -top-2 -left-2 text-teal/30"
          aria-hidden="true"
        >
          <circle
            cx={(size + 16) / 2}
            cy={(size + 16) / 2}
            r={size / 2 + 6}
            fill="none"
            strokeWidth="3"
            strokeDasharray={`${Math.PI * (size + 12)} 0`}
            strokeDashoffset={0}
            style={{
              strokeDasharray: `${Math.PI * (size + 12)} ${Math.PI * (size + 12)}`,
              strokeDashoffset: phase === 'inhale' ? 0 : phase === 'hold' ? Math.PI * (size + 12) / 2 : Math.PI * (size + 12),
              transition: 'stroke-dashoffset 1000ms ease-in-out',
            }}
          />
        </svg>
      </div>

      <div className="flex items-center gap-4 text-sm text-ink/60">
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-white text-teal-deep font-medium hover:bg-teal-tint transition-colors"
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Start
            </>
          )}
        </button>

        <button
          onClick={reset}
          disabled={!isPlaying && cycleCount === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/15 bg-white text-ink/60 font-medium hover:bg-teal-tint/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        {cycleCount > 0 && (
          <span className="text-ink/50">
            {cycleCount} cycle{cycleCount !== 1 ? 's' : ''} completed
          </span>
        )}
      </div>

      <p className="text-center text-sm text-ink/55 max-w-xs">
        {phase === 'inhale' && 'Inhale slowly through your nose…'}
        {phase === 'hold' && 'Hold gently…'}
        {phase === 'exhale' && 'Exhale slowly through your mouth…'}
      </p>
    </div>
  );
}