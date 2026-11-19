'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { bodyRegionsFront, bodyRegionsBack, bodySilhouettePath, bodyPartCatalog } from '@/content/bodyRegions';
import type { BodyRegions, BodyRegion } from '@/content/bodyRegions';
import { BODY_SENSATIONS } from '@/content/bodySensations';

export interface Sensation {
  id: string;
  name: string;
  category: string;
  typicalBodyParts?: string[];
  commonlyWithEmotions?: string[];
}

export interface SelectedSensation {
  sensationId: string;
  intensity: number;
  bodyRegionId: string;
}

interface BodyAwarenessProps {
  initialSensations?: SelectedSensation[];
  onChange?: (sensations: SelectedSensation[]) => void;
  emotion?: string;
  suggestedSensations?: Sensation[];
  allSensations?: Sensation[];
  readOnly?: boolean;
  showSummary?: boolean;
  mapHeight?: number;
}

const ALL_SENSATIONS: Sensation[] = BODY_SENSATIONS;

const brandColors = {
  teal: '#246B68', tealDeep: '#1B524F', tealTint: '#E3EFED',
  apricot: '#EF9476', apricotDeep: '#8F422C', apricotTint: '#FBE8E1',
  golden: '#EAC461', goldenDeep: '#7A5C18', goldenTint: '#FBF1D8',
  periwinkle: '#929AD5', periwinkleDeep: '#4F5A9E', periwinkleTint: '#EAECF8',
  sage: '#9BBE9A', sageDeep: '#446E43', sageTint: '#EAF1E7',
  ivory: '#FCFAF6', ink: '#263735', inkMuted: '#6B7A78',
};

const regionColors = {
  none: 'transparent', low: '#EAF1E7', medium: '#FBF1D8', high: '#FBE8E1',
  selected: '#E3EFED', selectedBorder: '#246B68', hover: '#EAECF8',
};


// Original SubSelves line icons: restrained, rounded geometry and brand-only colors.
// Decorative icons never use emoji, red, or external icon assets.
const partIconPalettes = [
  { stroke: '#1B524F', background: '#E3EFED' },
  { stroke: '#8F422C', background: '#FBE8E1' },
  { stroke: '#7A5C18', background: '#FBF1D8' },
  { stroke: '#4F5A9E', background: '#EAECF8' },
  { stroke: '#446E43', background: '#EAF1E7' },
] as const;

function BodyPartIcon({ partKey, region, size = 20 }: { partKey: string; region: string; size?: number }) {
  const seed = Array.from(partKey).reduce((n, c) => n + c.charCodeAt(0), 0);
  const palette = partIconPalettes[seed % partIconPalettes.length];
  const k = partKey.toLowerCase();
  const r = region.toLowerCase();
  const common = { fill: 'none', stroke: palette.stroke, strokeWidth: 1.65, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let glyph: React.ReactNode;
  if (k.includes('heart')) {
    glyph = <path {...common} d="M12 20s-7.5-4.8-7.5-10.2a4.2 4.2 0 0 1 7.5-2.5 4.2 4.2 0 0 1 7.5 2.5C19.5 15.2 12 20 12 20Z" />;
  } else if (k.includes('eye') || k.includes('eyelid') || k.includes('eyebrow')) {
    glyph = <><path {...common} d="M3.5 12s3.2-4.8 8.5-4.8 8.5 4.8 8.5 4.8-3.2 4.8-8.5 4.8S3.5 12 3.5 12Z" /><circle cx="12" cy="12" r="2.2" fill={palette.stroke} /></>;
  } else if (k.includes('ear')) {
    glyph = <path {...common} d="M8 17.5c0-2.8-3-3.1-3-7.6a7 7 0 0 1 14 0c0 4.4-3.5 4.3-4.5 7.6-.6 2-1.7 3-3.5 3-1.7 0-2.6-1.1-2.6-2.4M9 10a3 3 0 0 1 6 0c0 2-2.6 2.4-2.6 4.5" />;
  } else if (k.includes('hand') || k.includes('finger') || k.includes('thumb') || k.includes('palm') || k.includes('wrist')) {
    glyph = <path {...common} d="M8 11V5.5a1.2 1.2 0 0 1 2.4 0V10 4.4a1.2 1.2 0 0 1 2.4 0V10 5.3a1.2 1.2 0 0 1 2.4 0v5.2-3.1a1.2 1.2 0 0 1 2.4 0v7.1c0 4-2.6 6.2-6.3 6.2-2.4 0-3.9-1.4-5.3-3.4L4.5 15a1.5 1.5 0 0 1 2.5-1.7L8 14" />;
  } else if (k.includes('foot') || k.includes('feet') || k.includes('toe') || k.includes('heel') || k.includes('ankle') || k.includes('arch')) {
    glyph = <path {...common} d="M9 3.5v8.3c0 2.3-3.7 2.5-4.5 5.3-.5 1.8.8 3.4 2.8 3.4h10.2c2.1 0 3-1.4 2-3.2-.8-1.4-3-1.7-4.8-2.6-1.4-.7-1.9-1.8-1.9-3.7V3.5M8 16.8h8" />;
  } else if (k.includes('spine') || k.includes('back') || k.includes('tailbone')) {
    glyph = <><path {...common} d="M12 3v18M7.5 5.5 12 7l4.5-1.5M7.5 9.5 12 11l4.5-1.5M7.5 13.5 12 15l4.5-1.5M8.5 17.5 12 19l3.5-1.5" /></>;
  } else if (k.includes('lung') || k.includes('breath') || k.includes('rib') || k.includes('diaphragm') || k.includes('chest')) {
    glyph = <><path {...common} d="M12 4v8M10 9C8 5 5.5 6.5 4.5 10c-1.2 4-1 8.5 2.5 9 3.5.4 4-4.5 4-7M14 9c2-4 4.5-2.5 5.5 1 1.2 4 1 8.5-2.5 9-3.5.4-4-4.5-4-7" /></>;
  } else if (k.includes('head') || k.includes('face') || k.includes('jaw') || k.includes('nose') || k.includes('lip') || k.includes('cheek') || k.includes('temple') || k.includes('scalp') || k.includes('sinus') || k.includes('tongue') || k.includes('teeth') || k.includes('forehead')) {
    glyph = <><path {...common} d="M12 3a7 7 0 0 0-7 7v3c0 2 1.5 2.5 2 4.2.7 2.5 2.7 3.8 5 3.8s4.3-1.3 5-3.8c.5-1.7 2-2.2 2-4.2v-3a7 7 0 0 0-7-7Z" /><path {...common} d="M9 11h.2m5.6 0h.2M10 16c1.3 1 2.7 1 4 0" /></>;
  } else if (k.includes('neck') || k.includes('throat') || k.includes('collarbone')) {
    glyph = <path {...common} d="M9 3v6c0 2-1.2 3.4-3.5 4.4L3 15m12-12v6c0 2 1.2 3.4 3.5 4.4L21 15M7 15c1.5 2 3.2 3 5 3s3.5-1 5-3M8 21h8" />;
  } else if (k.includes('stomach') || k.includes('belly') || k.includes('intestine') || k.includes('navel') || k.includes('solar') || r === 'abdomen') {
    glyph = <><path {...common} d="M9 3v6c0 2-3 2.5-3 6a6 6 0 0 0 12 0c0-3-2.5-4-4-4V3" /><path {...common} d="M9 15c1.5-2 4.5-2 6 0" /></>;
  } else if (k.includes('pelvi') || k.includes('hip') || k.includes('groin') || k.includes('glute') || k.includes('psoas')) {
    glyph = <path {...common} d="M5 5c0 4-1 6 1 9l6 6 6-6c2-3 1-5 1-9M5 8l7 5 7-5M12 13v7" />;
  } else if (k.includes('leg') || k.includes('knee') || k.includes('calf') || k.includes('shin') || k.includes('thigh')) {
    glyph = <path {...common} d="M7 3h10l-1 8-2 4v6h-4v-6l-2-4-1-8ZM8 11h8" />;
  } else if (k.includes('arm') || k.includes('elbow') || k.includes('shoulder') || k.includes('forearm')) {
    glyph = <path {...common} d="M7 4c-2 2-2 5-1 8l3 7c.5 1.2 2.5 1.2 3 0l2-4 3 2c1.4.9 3-.8 2-2.3l-4-5-1-5M7 8l7-3" />;
  } else if (k.includes('skin')) {
    glyph = <><path {...common} d="M4 8c3-4 5 4 8 0s5 4 8 0M4 14c3-4 5 4 8 0s5 4 8 0" /></>;
  } else {
    glyph = <><circle {...common} cx="12" cy="12" r="7" /><path {...common} d="M12 7v10M7 12h10" /></>;
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
    <rect x="0.5" y="0.5" width="23" height="23" rx="7" fill={palette.background} />
    {glyph}
  </svg>;
}

const SENSATION_CATEGORIES = ['temperature', 'pressure', 'movement', 'texture', 'pain', 'other'] as const;

export default function BodyAwareness({
  initialSensations = [],
  onChange,
  emotion,
  suggestedSensations = [],
  allSensations = ALL_SENSATIONS,
  readOnly = false,
  showSummary = true,
  mapHeight = 400,
}: BodyAwarenessProps) {
  const [selectedSensations, setSelectedSensations] = useState<SelectedSensation[]>(initialSensations);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [partSearch, setPartSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [bodyView, setBodyView] = useState<'front' | 'back'>('front');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [expandedSensationId, setExpandedSensationId] = useState<string | null>(null);

  const bodySvgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressRegionClick = useRef(false);

  const switchBodyView = (next: 'front' | 'back') => {
    setBodyView(next);
    setSelectedRegion(null);
    setHoveredRegion(null);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const bodyRegions = bodyView === 'front' ? bodyRegionsFront : bodyRegionsBack;

  const zoomWidth = 230 / zoomLevel;
  const zoomHeight = 600 / zoomLevel;
  const clampCenter = (x: number, y: number, zoom: number) => ({
    x: Math.max(135 + 115 / zoom, Math.min(365 - 115 / zoom, x)),
    y: Math.max(0 + 300 / zoom, Math.min(600 - 300 / zoom, y)),
  });

  const changeZoom = useCallback((next: number) => {
    const zoom = Math.max(1, Math.min(4, next));
    setZoomLevel(zoom);
    setPanPosition(prev => {
      const center = clampCenter(250 + prev.x, 300 + prev.y, zoom);
      return { x: center.x - 250, y: center.y - 300 };
    });
  }, []);

  useEffect(() => {
    const svg = bodySvgRef.current;
    if (!svg) return;
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      if (e.deltaY === 0) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? svg.clientHeight : 1;
      const delta = Math.max(-100, Math.min(100, e.deltaY * unit));
      changeZoom(zoomLevel * Math.exp(-delta * 0.01));
    };
    svg.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg.removeEventListener('wheel', handleWheel);
  }, [zoomLevel, changeZoom]);

  const getSensationsForRegion = (k: string) => selectedSensations.filter(s => s.bodyRegionId === k);

  const handlePointerDown = (e: React.PointerEvent) => {
    suppressRegionClick.current = false;
    if (zoomLevel > 1 && e.isPrimary && e.button === 0) {
      dragRef.current = { x: e.clientX, y: e.clientY, moved: false };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    suppressRegionClick.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = Math.min(rect.width / (230 / zoomLevel), rect.height / (600 / zoomLevel));
    setPanPosition(prev => {
      const c = clampCenter(250 + prev.x - dx / scale, 300 + prev.y - dy / scale, zoomLevel);
      return { x: c.x - 250, y: c.y - 300 };
    });
    d.x = e.clientX;
    d.y = e.clientY;
  };

  const handlePointerUp = () => { dragRef.current = null; };
  const handlePointerCancel = () => { dragRef.current = null; };

  const relevantSensations = useMemo(() => {
    if (!emotion) return [];
    return suggestedSensations.filter(s =>
      s.typicalBodyParts?.some(p =>
        p.toLowerCase().includes(emotion.toLowerCase()) ||
        emotion.toLowerCase().includes(p.toLowerCase())
      ) || s.category === 'temperature' || s.category === 'pressure'
    );
  }, [emotion, suggestedSensations]);

  // Suggestions use the dataset's typical_body_parts; they are not saved until clicked.
  const suggestedForPart = useMemo(() => {
    if (!selectedRegion) return [];
    const part = bodyPartCatalog.find(p => p.key === selectedRegion);
    const region = `${selectedRegion} ${part?.label || ''} ${part?.region || ''}`.toLowerCase();
    const aliases: Record<string, string[]> = {
      heart: ['heart', 'chest'], abdomen: ['stomach'], belly: ['stomach'],
      upper_stomach: ['stomach'], lower_stomach: ['stomach'],
      throat: ['throat'], skin: ['skin'], whole_body: ['body'], entire_body: ['body'], all_over: ['body'],
    };
    return allSensations.filter(s => (s.typicalBodyParts || []).some(p => {
      const term = p.toLowerCase();
      if (term === 'body') return ['whole_body','entire_body','all_over'].includes(selectedRegion);
      if (term === 'limbs') return /arm|leg|hand|foot|thigh|calf|knee|elbow|wrist|ankle/.test(region);
      if (term === 'back') return /back|spine|shoulder_blade/.test(region);
      return region.includes(term) || (aliases[selectedRegion] || []).includes(term);
    }));
  }, [selectedRegion, allSensations]);

  const sensationsByCategory = useMemo(() => {
    const filtered = searchQuery
      ? allSensations.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : allSensations;
    return filtered.reduce((acc, s) => {
      const cat = s.category || 'other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(s);
      return acc;
    }, {} as Record<string, Sensation[]>);
  }, [allSensations, searchQuery]);

  const categories = ['all', ...Object.keys(sensationsByCategory).sort()];

  const displaySensations = useMemo(() => {
    if (searchQuery) return allSensations.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return activeCategory === 'all' ? Object.values(sensationsByCategory).flat() : sensationsByCategory[activeCategory] || [];
  }, [searchQuery, activeCategory, sensationsByCategory, allSensations]);

  const getRegionOpacity = useCallback((k: string) => {
    const rs = selectedSensations.filter(s => s.bodyRegionId === k);
    if (!rs.length) return 0.15;
    const avg = rs.reduce((a, b) => a + b.intensity, 0) / rs.length;
    return 0.2 + (avg / 10) * 0.6;
  }, [selectedSensations]);

  const handleRegionClick = useCallback((k: string) => {
    if (readOnly) return;
    setSelectedRegion(selectedRegion === k ? null : k);
    setExpandedSensationId(null);
  }, [readOnly, selectedRegion]);

  const handleToggleSensation = useCallback((id: string) => {
    if (readOnly) return;
    const br = selectedRegion;
    const exists = selectedSensations.some(s => s.sensationId === id && s.bodyRegionId === br);
    if (exists) {
      setSelectedSensations(prev => prev.filter(s => !(s.sensationId === id && s.bodyRegionId === br)));
      setExpandedSensationId(null);
    } else {
      setSelectedSensations(prev => [...prev, { sensationId: id, intensity: 5, bodyRegionId: br || 'general' }]);
      setTimeout(() => setExpandedSensationId(id), 0);
    }
  }, [readOnly, selectedRegion, selectedSensations]);

  const getSensationIntensity = useCallback((id: string) => {
    const br = selectedRegion;
    return selectedSensations.find(s => s.sensationId === id && s.bodyRegionId === br)?.intensity || 5;
  }, [selectedRegion, selectedSensations]);

  const isSensationSelected = useCallback((id: string) => {
    const br = selectedRegion;
    return selectedSensations.some(s => s.sensationId === id && s.bodyRegionId === br);
  }, [selectedRegion, selectedSensations]);

  const updateIntensity = useCallback((id: string, val: number) => {
    if (readOnly) return;
    const br = selectedRegion;
    setSelectedSensations(prev => prev.map(s => s.sensationId === id && s.bodyRegionId === br ? { ...s, intensity: val } : s));
  }, [readOnly, selectedRegion]);

  const removeSensation = useCallback((id: string) => {
    if (readOnly) return;
    const br = selectedRegion;
    setSelectedSensations(prev => prev.filter(s => !(s.sensationId === id && s.bodyRegionId === br)));
    setExpandedSensationId(null);
  }, [readOnly, selectedRegion]);

  useEffect(() => { onChange?.(selectedSensations); }, [selectedSensations, onChange]);

  if (viewMode === 'list') return renderListView();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-ink">Body Awareness</h3>
          {emotion && (
            <p className="text-sm text-ink/60 mt-1">
              Notice sensations related to <span className="font-medium text-teal-deep">{emotion}</span>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('map')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${['map'].includes(viewMode) ? 'bg-teal text-ivory' : 'border border-ink/15 bg-white text-ink/70 hover:border-teal/40'}`}>🗺️ Body Map</button>
          <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${['list'].includes(viewMode) ? 'bg-teal text-ivory' : 'border border-ink/15 bg-white text-ink/70 hover:border-teal/40'}`}>📋 List View</button>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-ink/10 bg-white p-4 lg:p-6 lg:order-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-ink">{bodyView === 'front' ? 'Front View' : 'Back View'}</h4>
            <div className="flex gap-2">
              <button onClick={() => switchBodyView('front')} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${bodyView === 'front' ? 'bg-teal-tint text-teal-deep' : 'bg-white text-ink/70 hover:bg-teal-tint/60 border border-ink/15'}`}>Front</button>
              <button onClick={() => switchBodyView('back')} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${bodyView === 'back' ? 'bg-teal-tint text-teal-deep' : 'bg-white text-ink/70 hover:bg-teal-tint/60 border border-ink/15'}`}>Back</button>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap justify-end gap-2" role="group" aria-label="Body map zoom controls">
            <button type="button" aria-label="Zoom out" disabled={zoomLevel <= 1} onClick={() => changeZoom(zoomLevel - 0.5)} className="min-h-10 min-w-10 rounded-lg border border-ink/15 bg-white text-ink/70 disabled:opacity-40 hover:bg-teal-tint/60"><svg className="mx-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
            <button type="button" aria-label="Zoom in" disabled={zoomLevel >= 4} onClick={() => changeZoom(zoomLevel + 0.5)} className="min-h-10 min-w-10 rounded-lg border border-ink/15 bg-white text-ink/70 disabled:opacity-40 hover:bg-teal-tint/60"><svg className="mx-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
            <button type="button" onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); }} className="min-h-10 rounded-lg border border-ink/15 bg-white px-3 text-xs text-ink/70 hover:bg-teal-tint/60">Reset</button>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-ink/10" style={{ height: `${mapHeight}px`, backgroundColor: brandColors.ivory }}>
            <svg
              key={bodyView}
              ref={bodySvgRef}
              viewBox={`${250 + panPosition.x - zoomWidth / 2} ${300 + panPosition.y - zoomHeight / 2} ${zoomWidth} ${zoomHeight}`}
              style={{ touchAction: zoomLevel > 1 ? 'none' : 'pan-y', cursor: zoomLevel > 1 ? 'grab' : 'default' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onLostPointerCapture={handlePointerCancel}
              role="group"
              aria-label={`${bodyView === 'front' ? 'Front' : 'Back'} body regions`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
            >
              <path d={bodySilhouettePath} fill={brandColors.sageTint} stroke={brandColors.sage} strokeWidth={0.8} strokeLinejoin="round" pointerEvents="none" />
              {Object.entries(bodyRegions).sort(([a], [b]) => Number(a === 'heart' || a === 'spine') - Number(b === 'heart' || b === 'spine')).map(([k, r]) => {
                const sel = selectedRegion === k;
                const hov = hoveredRegion === k;
                const rs = getSensationsForRegion(k);
                const has = rs.length > 0;
                const op = getRegionOpacity(k);
                return (
                  <g key={k}>
                    <path
                      d={r.path}
                      fill={k === 'heart' ? (sel ? brandColors.tealDeep : hov ? brandColors.teal : has ? brandColors.sage : brandColors.teal) : sel ? brandColors.tealTint : hov ? brandColors.periwinkleTint : has ? brandColors.sageTint : bodyView === 'back' ? '#D6E6E1' : '#E3EFED'}
                      fillOpacity={k === 'heart' ? (sel ? 1 : hov ? 0.95 : has ? 0.9 : 0.8) : sel ? 0.7 : hov ? 0.6 : has ? 0.15 + op * 0.35 : 0.42}
                      stroke={k === 'heart' ? brandColors.tealDeep : sel ? brandColors.tealDeep : brandColors.sage}
                      strokeOpacity={sel ? 0.9 : hov ? 0.7 : 0.45}
                      strokeWidth={sel ? 1.5 : 0.8}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      pointerEvents="visiblePainted"
                      role="button"
                      tabIndex={0}
                      aria-label={r.label}
                      aria-pressed={sel}
                      className="cursor-pointer transition-colors duration-200 motion-reduce:transition-none"
                      onClick={(e) => { if (suppressRegionClick.current) return; handleRegionClick(k); }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRegionClick(k); } }}
                      onMouseEnter={() => setHoveredRegion(k)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <title>{r.label}{has ? ` (${rs.length} sensations)` : ''}</title>
                    </path>
                  </g>
                );
              })}
            </svg>

            <button type="button" onClick={() => switchBodyView(bodyView === 'front' ? 'back' : 'front')} aria-label={`Switch to ${bodyView === 'front' ? 'back' : 'front'} view`} title={`Switch to ${bodyView === 'front' ? 'back' : 'front'} view`} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors hover:bg-teal-tint/60">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" /></svg>
            </button>

            <div className="mt-4 p-3 rounded-lg border border-ink/10 bg-ivory">
              <p className="text-xs font-medium text-ink/50 mb-2">Legend</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-ink/60">
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-transparent border border-ink/20"></div><span>None</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.low, opacity: 0.5 }}></div><span>Low</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.medium, opacity: 0.7 }}></div><span>Medium</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.high }}></div><span>High</span></div>
                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded border-2" style={{ backgroundColor: regionColors.selected, borderColor: regionColors.selectedBorder }}></div><span>Selected</span></div>
              </div>
              <p className="text-xs text-ink/50 mt-2">Tip: Click a region to add sensations. Ctrl+scroll to zoom, drag to pan.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-4 lg:p-6 lg:order-1">
          <div className="mb-4">
            <label htmlFor="body-part-search" className="mb-1 block text-sm font-medium text-ink">Select any body part</label>
            <input id="body-part-search" type="search" value={partSearch} onChange={e => setPartSearch(e.target.value)} placeholder="Search body parts…" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
            <div className="mt-2 max-h-32 overflow-y-auto flex flex-wrap gap-1.5">
              {bodyPartCatalog.filter(p => `${p.label} ${p.region}`.toLowerCase().includes(partSearch.toLowerCase())).map(p =>
                <button key={p.key} type="button" onClick={() => { setSelectedRegion(p.key); setExpandedSensationId(null); }}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs text-left font-medium ${selectedRegion === p.key ? 'bg-teal-tint border-teal text-teal-deep' : 'bg-white border-ink/15 text-ink/70'}`}>
                  <BodyPartIcon partKey={p.key} region={p.region} /> <span>{p.label}</span>
                </button>)}
            </div>
          </div>
          {!selectedRegion ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="mb-4"><BodyPartIcon partKey="whole_body" region="Overall" size={56} /></div>
              <p className="font-semibold text-ink">Click on a body part</p>
              <p className="text-sm text-ink/50 mt-2">to explore and map your physical sensations</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-ink">{bodyRegions[selectedRegion as keyof BodyRegions]?.label || bodyPartCatalog.find(p => p.key === selectedRegion)?.label || selectedRegion}</h4>
                <button onClick={() => setSelectedRegion(null)} className="p-2 rounded-lg hover:bg-teal-tint text-ink/60 transition-colors" aria-label="Close region"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="mb-4 rounded-xl border border-teal/20 bg-teal-tint/40 p-3" aria-live="polite">
                <h5 className="text-sm font-semibold text-teal-deep mb-2">Mapped sensations for this body part</h5>
                {getSensationsForRegion(selectedRegion).length ? (
                  <div className="flex flex-wrap gap-2">
                    {getSensationsForRegion(selectedRegion).map(mapped => {
                      const sensation = allSensations.find(s => s.id === mapped.sensationId);
                      return <button key={mapped.sensationId} type="button" onClick={() => setExpandedSensationId(mapped.sensationId)}
                        className="rounded-lg border border-teal/30 bg-white px-3 py-2 text-left text-sm text-teal-deep whitespace-normal break-words">
                        {sensation?.name || mapped.sensationId} · {mapped.intensity}/10
                      </button>;
                    })}
                  </div>
                ) : <p className="text-sm text-ink/60">No sensations mapped yet. Choose one below to attach it to this body part.</p>}
              </div>
              {suggestedForPart.length > 0 && (
                <div className="mb-4 rounded-lg border border-ink/10 bg-ivory p-3">
                  <h5 className="text-sm font-semibold mb-2">Common sensations for this area (suggestions)</h5>
                  <div className="flex flex-wrap gap-2">{suggestedForPart.slice(0, 12).map(s => (
                    <button key={s.id} type="button" onClick={() => { if (!isSensationSelected(s.id)) handleToggleSensation(s.id); }}
                      className={`rounded-md border px-2 py-1 text-sm whitespace-normal ${isSensationSelected(s.id) ? 'border-teal bg-teal-tint text-teal-deep' : 'border-ink/15 bg-white'}`}>
                      {s.name}{isSensationSelected(s.id) ? ' ✓' : ' +'}
                    </button>
                  ))}</div>
                </div>
              )}
              <p className="text-sm text-ink/60 mb-4">What sensations do you feel in your {(bodyRegions[selectedRegion as keyof BodyRegions]?.label || bodyPartCatalog.find(p => p.key === selectedRegion)?.label || selectedRegion).toLowerCase()}?</p>
              {relevantSensations.length > 0 && (
                <div className="mb-4 p-3 rounded-lg border border-apricot/30 bg-apricot-tint">
                  <p className="text-xs font-semibold text-apricot-deep mb-2 flex items-center gap-1.5">⭐ Common for {emotion}:</p>
                  <div className="flex flex-wrap gap-1">
                    {relevantSensations.slice(0, 6).map(s => {
                      const sel = isSensationSelected(s.id);
                      return (
                        <button key={s.id} onClick={() => handleToggleSensation(s.id)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${sel ? 'bg-apricot text-ivory' : 'bg-white text-apricot-deep border border-apricot/40 hover:bg-apricot-tint'}`}>
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="relative mb-3">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search sensations…" className="w-full pl-9 pr-4 py-2 text-sm border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none" />
              </div>

              {!searchQuery && (
                <div className="flex gap-1.5 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)} className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === c ? 'bg-teal text-ivory' : 'bg-ivory text-ink/70 hover:bg-teal-tint/60 border border-ink/10'}`}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto">
                {displaySensations.map(s => {
                  const sel = isSensationSelected(s.id);
                  const int = getSensationIntensity(s.id);
                  const exp = expandedSensationId === s.id;
                  return (
                    <div key={s.id} className="relative">
                      <button onClick={() => handleToggleSensation(s.id)} className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${sel ? 'bg-teal text-ivory border-2 border-teal-deep' : 'bg-white text-ink border-2 border-ink/15 hover:border-teal/40 hover:bg-teal-tint/60'}`}>
                        <div className="flex items-center justify-between"><span className="whitespace-normal break-words text-left leading-snug">{s.name}</span>{sel && <span className="ml-1 text-xs font-bold">{int}</span>}</div>
                      </button>
                      {sel && exp && (
                        <div className="absolute z-50 left-full top-0 ml-2 w-64 pointer-events-none">
                          <div className="pointer-events-auto bg-white rounded-lg shadow-xl border-2 border-teal p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-ink">{s.name}</span>
                              <button onClick={(e) => { e.stopPropagation(); setExpandedSensationId(null); }} className="text-ink/40 hover:text-ink/60"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            </div>
                            <div className="flex items-center justify-between text-xs text-ink/60 mb-2"><span>Intensity</span><span className="font-bold text-teal-deep">{int}/10</span></div>
                            <input type="range" min="1" max="10" value={int} onChange={(e) => { e.stopPropagation(); updateIntensity(s.id, parseInt(e.target.value)); }} className="w-full mb-2" />
                            <div className="flex justify-between text-xs text-ink/50 mb-3"><span>Mild</span><span>Intense</span></div>
                            <button onClick={(e) => { e.stopPropagation(); removeSensation(s.id); }} className="w-full text-xs text-apricot-deep hover:text-apricot font-medium py-2 hover:bg-apricot-tint/60 rounded transition-colors">Remove</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {displaySensations.length === 0 && <div className="text-center py-8 text-ink/50 text-sm">No sensations found</div>}
            </div>
          )}

          {showSummary && selectedSensations.length > 0 && (
            <div className="mt-6 rounded-xl border border-ink/10 bg-ivory p-4">
              <h4 className="font-semibold text-ink mb-3">Your Body Sensation Map</h4>
              <div className="space-y-3">
                {(() => {
                  const g: Record<string, SelectedSensation[]> = {};
                  selectedSensations.forEach(s => { if (!g[s.bodyRegionId]) g[s.bodyRegionId] = []; g[s.bodyRegionId].push(s); });
                  return Object.entries(g).map(([rid, sens]) => {
                    const r = bodyRegions[rid as keyof BodyRegions];
                    const lbl = r?.label || rid;
                    return (
                      <div key={rid} className="p-3 rounded-lg border border-teal/30 bg-teal-tint/50">
                        <div className="font-medium text-teal-deep mb-2">{lbl}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {sens.map(({ sensationId, intensity }) => {
                            const sn = allSensations.find(s => s.id === sensationId);
                            if (!sn) return null;
                            return (
                              <div key={sensationId} className="inline-flex items-center gap-1.5 bg-white border border-teal/40 px-2.5 py-1 rounded-full text-sm">
                                <span className="font-medium">{sn.name}</span>
                                <span className="text-teal-deep font-bold">{intensity}/10</span>
                                <button type="button" onClick={() => removeSensation(sensationId)} className="ml-0.5 -mr-0.5 rounded-full p-0.5 text-teal-deep hover:bg-teal-tint/60" aria-label={`Remove ${sn.name}`}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function renderListView() {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-ink/10 bg-white p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">Select Body Region</h4>
          <input type="search" aria-label="Search body parts" placeholder="Search all body parts…" value={partSearch} onChange={e => setPartSearch(e.target.value)} className="mb-3 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pb-2">
            {[{ key: 'all', label: 'Overall' }, ...bodyPartCatalog.filter(p => `${p.label} ${p.region}`.toLowerCase().includes(partSearch.toLowerCase())).map(p => ({ key: p.key, label: p.label }))].map(({ key, label }) => {
              const sel = selectedRegion === key;
              return (
                <button key={key} type="button" onClick={() => { setSelectedRegion(sel ? null : key); setViewMode('map'); }} aria-pressed={sel} className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${sel ? 'bg-teal-tint text-teal-deep border border-teal/30' : 'bg-white text-ink/70 border border-ink/15 hover:border-teal/40 hover:bg-teal-tint/60'}`}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {relevantSensations.length > 0 && (
          <div className="p-4 rounded-lg border border-apricot/30 bg-apricot-tint">
            <p className="text-sm font-medium text-apricot-deep mb-3">⭐ Common for {emotion}:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {relevantSensations.slice(0, 8).map(s => {
                const sel = selectedSensations.some(x => x.sensationId === s.id);
                return <button key={s.id} onClick={() => handleToggleSensation(s.id)} className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${sel ? 'bg-apricot text-ivory' : 'bg-white text-apricot-deep border border-apricot/40 hover:bg-apricot-tint'}`}>{s.name}</button>;
              })}
            </div>
          </div>
        )}

        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search sensations…" className="w-full pl-9 pr-4 py-3 text-sm border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal outline-none" />
        </div>

        {!searchQuery && (
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === c ? 'bg-teal text-ivory' : 'bg-ivory text-ink/70 hover:bg-teal-tint/60 border border-ink/10'}`}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {displaySensations.map(s => {
            const sel = isSensationSelected(s.id);
            const int = sel ? getSensationIntensity(s.id) : 5;
            const exp = expandedSensationId === s.id;
            return (
              <div key={s.id} className="relative">
                <button onClick={() => handleToggleSensation(s.id)} className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${sel ? 'bg-teal text-ivory border-2 border-teal-deep' : 'bg-white text-ink border-2 border-ink/15 hover:border-teal/40 hover:bg-teal-tint/60'}`}>
                  <div className="flex items-center justify-between"><span className="whitespace-normal break-words text-left leading-snug">{s.name}</span>{sel && <span className="ml-1 text-xs font-bold">{int}</span>}</div>
                </button>
                {sel && exp && (
                  <div className="absolute z-50 left-full top-0 ml-2 w-64 pointer-events-none">
                    <div className="pointer-events-auto bg-white rounded-lg shadow-xl border-2 border-teal p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-ink">{s.name}</span>
                        <button onClick={(e) => { e.stopPropagation(); setExpandedSensationId(null); }} className="text-ink/40 hover:text-ink/60"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-ink/60 mb-2"><span>Intensity</span><span className="font-bold text-teal-deep">{int}/10</span></div>
                      <input type="range" min="1" max="10" value={int} onChange={(e) => { e.stopPropagation(); updateIntensity(s.id, parseInt(e.target.value)); }} className="w-full mb-2" />
                      <div className="flex justify-between text-xs text-ink/50 mb-3"><span>Mild</span><span>Intense</span></div>
                      <button onClick={(e) => { e.stopPropagation(); removeSensation(s.id); }} className="w-full text-xs text-apricot-deep hover:text-apricot font-medium py-2 hover:bg-apricot-tint/60 rounded transition-colors">Remove</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {displaySensations.length === 0 && <div className="text-center py-8 text-ink/50 text-sm">No sensations found</div>}

        {showSummary && selectedSensations.length > 0 && (
          <div className="rounded-xl border border-ink/10 bg-ivory p-4">
            <h4 className="font-semibold text-ink mb-3">Your Body Sensation Map</h4>
            <div className="space-y-3">
              {(() => {
                const g: Record<string, SelectedSensation[]> = {};
                selectedSensations.forEach(s => { if (!g[s.bodyRegionId]) g[s.bodyRegionId] = []; g[s.bodyRegionId].push(s); });
                return Object.entries(g).map(([rid, sens]) => {
                  const r = bodyRegions[rid as keyof BodyRegions];
                  const lbl = r?.label || rid;
                  return (
                    <div key={rid} className="p-3 rounded-lg border border-teal/30 bg-teal-tint/50">
                      <div className="font-medium text-teal-deep mb-2">{lbl}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {sens.map(({ sensationId, intensity }) => {
                          const sn = allSensations.find(s => s.id === sensationId);
                          if (!sn) return null;
                          return (
                            <div key={sensationId} className="inline-flex items-center gap-1.5 bg-white border border-teal/40 px-2.5 py-1 rounded-full text-sm">
                              <span className="font-medium">{sn.name}</span>
                              <span className="text-teal-deep font-bold">{intensity}/10</span>
                              <button type="button" onClick={() => removeSensation(sensationId)} className="ml-0.5 -mr-0.5 rounded-full p-0.5 text-teal-deep hover:bg-teal-tint/60" aria-label={`Remove ${sn.name}`}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }
}