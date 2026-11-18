'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useParts } from '@/lib/hooks/useParts';
import { getPartArt } from '@/content/partArt';
import { getGroupInfo } from '@/content/taxonomy';
import { getDialogueTemplate } from '@/content/dialogueTemplates';
import { Suspense } from 'react';

function PartDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const { parts, updatePart, removePart, loading } = useParts();
  const part = parts.find(p => p.id === id);
  const groupInfo = part ? getGroupInfo(part.group) : null;
  const art = part ? getPartArt(part.name, part.group) : undefined;

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: part?.name || '',
    role: part?.role || '',
    fear: part?.fear || '',
    bodyLocation: part?.bodyLocation || '',
    notes: part?.notes || '',
    message: part?.message || '',
    wantsMeToKnow: part?.wantsMeToKnow || '',
    ratherBeDoing: part?.ratherBeDoing || '',
    protecting: part?.protecting || '',
    needs: part?.needs || '',
    thinksIAmAge: part?.thinksIAmAge || '',
    trustsSelf: part?.trustsSelf === true ? 'true' : part?.trustsSelf === false ? 'false' : '',
    gender: part?.gender || '',
    imageType: part?.imageType || '',
  });
  const [saving, setSaving] = useState(false);

  if (loading || !part) {
    return <main className="flex-1 p-6 flex items-center justify-center">Loading…</main>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        trustsSelf: formData.trustsSelf === 'true' ? true : formData.trustsSelf === 'false' ? false : undefined,
      };
      await updatePart(id, payload);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`Delete "${part.name}"? This cannot be undone.`)) {
      await removePart(id);
    }
  };

  const template = part ? getDialogueTemplate(part.group) : null;

  return (
    <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {groupInfo?.emoji} {part.name}
        </h1>
        <p className="text-ink/65 mt-1 capitalize">{part.group} • {groupInfo?.label}</p>
      </header>

      {art && (
        <section className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm shadow-teal/5">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
            <Image
              src={art.thumbnail}
              alt={`Symbolic artwork for ${part.name}`}
              width={512}
              height={512}
              className="h-40 w-40 shrink-0 self-center rounded-2xl object-cover sm:self-start"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
                  Symbolic scene
                </h2>
                {art.provisional && (
                  <span className="rounded-full bg-golden-tint px-2 py-0.5 text-[11px] font-semibold text-golden-deep">
                    Provisional
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-ink/80">{art.scene}</p>
              <p className="mt-4 text-sm leading-6 text-ink/60">{art.meaning}</p>
              <p className="mt-4 text-xs leading-5 text-ink/45">
                Artwork is an interpretive invitation, not a diagnosis.
                {art.sourceUrl && (
                  <>
                    {' '}
                    <a
                      href={art.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-teal-deep underline decoration-teal/30 underline-offset-2 hover:text-teal"
                    >
                      View source description
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      )}

      {editing ? (
        <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="edit-heading">
          <h2 id="edit-heading" className="text-xl font-semibold">Edit Part</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
              <input
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">Role / Job *</label>
              <textarea
                id="role"
                required
                rows={2}
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="fear" className="block text-sm font-medium mb-1">Fear *</label>
              <textarea
                id="fear"
                required
                rows={2}
                value={formData.fear}
                onChange={e => setFormData(prev => ({ ...prev, fear: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="bodyLocation" className="block text-sm font-medium mb-1">Location or Sensation</label>
              <input
                id="bodyLocation"
                value={formData.bodyLocation}
                onChange={e => setFormData(prev => ({ ...prev, bodyLocation: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Its message or complaint</label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="wantsMeToKnow" className="block text-sm font-medium mb-1">What it wants me to know</label>
              <textarea
                id="wantsMeToKnow"
                rows={3}
                value={formData.wantsMeToKnow}
                onChange={e => setFormData(prev => ({ ...prev, wantsMeToKnow: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="fear" className="block text-sm font-medium mb-1">Fear *</label>
              <textarea
                id="fear"
                required
                rows={2}
                value={formData.fear}
                onChange={e => setFormData(prev => ({ ...prev, fear: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="protecting" className="block text-sm font-medium mb-1">Other part it&apos;s protecting</label>
              <input
                id="protecting"
                value={formData.protecting}
                onChange={e => setFormData(prev => ({ ...prev, protecting: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="ratherBeDoing" className="block text-sm font-medium mb-1">What it would rather be doing</label>
              <textarea
                id="ratherBeDoing"
                rows={3}
                value={formData.ratherBeDoing}
                onChange={e => setFormData(prev => ({ ...prev, ratherBeDoing: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="needs" className="block text-sm font-medium mb-1">What it needs from you</label>
              <textarea
                id="needs"
                rows={2}
                value={formData.needs}
                onChange={e => setFormData(prev => ({ ...prev, needs: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="thinksIAmAge" className="block text-sm font-medium mb-1">Thinks I am this age</label>
              <input
                id="thinksIAmAge"
                value={formData.thinksIAmAge}
                onChange={e => setFormData(prev => ({ ...prev, thinksIAmAge: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="trustsSelf" className="block text-sm font-medium mb-1">Trust the self</label>
              <select
                id="trustsSelf"
                value={formData.trustsSelf}
                onChange={e => setFormData(prev => ({ ...prev, trustsSelf: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              >
                <option value="">Unset</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
              <input
                id="gender"
                value={formData.gender}
                onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="imageType" className="block text-sm font-medium mb-1">Image Type</label>
              <select
                id="imageType"
                value={formData.imageType}
                onChange={e => setFormData(prev => ({ ...prev, imageType: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              >
                <option value="">Unset</option>
                <option value="Template">Template</option>
                <option value="Symbol">Symbol</option>
                <option value="Emoji">Emoji</option>
                <option value="Photo">Photo</option>
                <option value="None">None</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                id="notes"
                rows={2}
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-2 border border-ink/15 rounded-lg bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-teal text-ivory rounded-lg hover:bg-teal-deep disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-6" aria-labelledby="details-heading">
            <h2 id="details-heading" className="text-lg font-semibold">Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-ink/60">Role / Job</dt>
                <dd className="mt-1">{part.role}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink/60">Fear</dt>
                <dd className="mt-1">{part.fear}</dd>
              </div>
              {part.bodyLocation && (
                <div>
                  <dt className="text-sm text-ink/60">Body Location</dt>
                  <dd className="mt-1">📍 {part.bodyLocation}</dd>
                </div>
              )}
              {part.notes && (
                <div>
                  <dt className="text-sm text-ink/60">Notes</dt>
                  <dd className="mt-1">{part.notes}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-ink/60">Discovered</dt>
                <dd className="mt-1">{new Date(part.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </section>

          {(() => {
            type InterviewKey = 'message' | 'wantsMeToKnow' | 'ratherBeDoing' | 'protecting' | 'needs' | 'thinksIAmAge' | 'trustsSelf' | 'gender' | 'imageType';
            interface InterviewField {
              key: InterviewKey;
              label: string;
              transform?: (v: unknown) => string;
            }
            const interviewFields: InterviewField[] = [
              { key: 'message', label: 'Its message or complaint' },
              { key: 'wantsMeToKnow', label: 'What it wants me to know' },
              { key: 'ratherBeDoing', label: 'What it would rather be doing' },
              { key: 'protecting', label: "Other part it's protecting" },
              { key: 'needs', label: 'What it needs from you' },
              { key: 'thinksIAmAge', label: 'Thinks I am this age' },
              { key: 'trustsSelf', label: 'Trust the self', transform: (v: unknown) => (v as boolean) ? 'Yes' : 'No' },
              { key: 'gender', label: 'Gender' },
              { key: 'imageType', label: 'Image Type', transform: (v: unknown) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
            ];
            const hasAny = interviewFields.some(f => part[f.key]);
            if (!hasAny) return null;
            return (
              <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="interview-heading">
                <h2 id="interview-heading" className="text-lg font-semibold">Part Interview</h2>
                <dl className="space-y-4">
                  {interviewFields.map(f => {
                    const value = part[f.key];
                    if (!value) return null;
                    const display = f.transform ? f.transform(value) : value;
                    return (
                      <div key={f.key}>
                        <dt className="text-sm text-ink/60">{f.label}</dt>
                        <dd className="mt-1">{display}</dd>
                      </div>
                    );
                  })}
                </dl>
              </section>
            );
          })()}

          {template && (
            <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="dialogue-heading">
              <h2 id="dialogue-heading" className="text-lg font-semibold">Dialogue Guide</h2>
              <div className="space-y-3">
                <div className="p-4 bg-apricot-tint border border-apricot/30 rounded-lg">
                  <dt className="text-sm font-medium text-apricot-deep">Avoid</dt>
                  <dd className="mt-1 text-apricot-deep">{template.avoid}</dd>
                </div>
                <div className="p-4 bg-sage-tint border border-sage/30 rounded-lg">
                  <dt className="text-sm font-medium text-sage-deep">Try Instead</dt>
                  <dd className="mt-1 text-sage-deep">{template.try}</dd>
                </div>
                <p className="text-sm text-ink/65">{template.explanation}</p>
              </div>
            </section>
          )}

          <section className="bg-white rounded-xl border border-ink/10 p-6 space-y-4" aria-labelledby="category-info-heading">
            <h2 id="category-info-heading" className="text-lg font-semibold">About This Group</h2>
            {groupInfo && (
              <div className="space-y-2">
                <p>{groupInfo.description}</p>
                <div>
                  <dt className="text-sm font-medium">Example names:</dt>
                  <dd className="mt-1 text-sm text-ink/65">{groupInfo.exampleNames.join(', ')}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium">Common triggers:</dt>
                  <dd className="mt-1 text-sm text-ink/65">{groupInfo.commonTriggers.join(', ')}</dd>
                </div>
              </div>
            )}
          </section>

          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 border border-ink/15 rounded-lg hover:bg-teal-tint/60"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-apricot-deep text-ivory rounded-lg hover:bg-ink"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default function PartDetailPage() {
  return (
    <Suspense fallback={<div className="flex-1 p-6 max-w-3xl mx-auto w-full">Loading…</div>}>
      <PartDetailContent />
    </Suspense>
  );
}