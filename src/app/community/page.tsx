'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sharedPartsRepo, followsRepo, usersRepo } from '@/lib/storage/db';
import type { SharedPart, PublicUser, Follow } from '@/lib/types';
import BodyAwareness from '@/components/BodyAwareness';

interface SharedPartWithOwner extends SharedPart {
  owner: PublicUser;
  isFollowing: boolean;
  isHearted: boolean;
}

export default function CommunityPage() {
  const [sharedParts, setSharedParts] = useState<SharedPartWithOwner[]>([]);
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'library' | 'people' | 'feed'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<SharedPartWithOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'public' | 'followers'>('all');

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const { usersRepo } = await import('@/lib/storage/db');
    const settings = await (await import('@/lib/storage/db')).settingsRepo.get('user');
    if (settings) {
      setCurrentUserId(settings.id);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [sharedPartsData, usersData, followsData] = await Promise.all([
        sharedPartsRepo.getAll(),
        usersRepo.getAll(),
        followsRepo.getAll(),
      ]);

      const usersMap = new Map(usersData.map(u => [u.id, u]));
      const followsSet = new Set(followsData.filter(f => f.followerId === currentUserId).map(f => f.followingId));

      const enrichedParts: SharedPartWithOwner[] = sharedPartsData
        .filter(sp => sp.visibility === 'public' || (sp.visibility === 'followers' && currentUserId && (sp.sharedWithUserIds?.includes(currentUserId!) || followsSet.has(sp.ownerId))))
        .map(sp => ({
          ...sp,
          owner: usersMap.get(sp.ownerId)!,
          isFollowing: followsSet.has(sp.ownerId),
          isHearted: false, // would need hearts data
        }));

      setSharedParts(enrichedParts);
      setUsers(usersData.filter(u => u.id !== currentUserId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUserId]);

  const filteredParts = useMemo(() => {
    return sharedParts.filter(sp => {
      const matchesSearch = searchQuery === '' ||
        sp.partSnapshot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.owner.displayName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = filterGroup === 'all' || sp.partSnapshot.group === filterGroup;
      const matchesVisibility = filterVisibility === 'all' || sp.visibility === filterVisibility;
      return matchesSearch && matchesGroup && matchesVisibility;
    });
  }, [sharedParts, searchQuery, filterGroup, filterVisibility]);

  const handleFollow = async (userId: string) => {
    if (!currentUserId) return;
    const { followsRepo } = await import('@/lib/storage/db');
    const isFollowing = users.find(u => u.id === userId)?.id && 
      (await import('@/lib/storage/db')).followsRepo.getAll().then(f => f.some(f => f.followerId === currentUserId && f.followingId === userId));

    if (isFollowing) {
      const follows = await (await import('@/lib/storage/db')).followsRepo.getAll();
      const follow = follows.find(f => f.followerId === currentUserId && f.followingId === userId);
      if (follow) await (await import('@/lib/storage/db')).followsRepo.delete(follow.id);
    } else {
      await (await import('@/lib/storage/db')).followsRepo.put({
        id: crypto.randomUUID(),
        followerId: currentUserId,
        followingId: userId,
        createdAt: new Date().toISOString(),
      });
    }
    loadData();
  };

  const handleHeart = async (sharedPartId: string) => {
    if (!currentUserId) return;
    const { heartsRepo } = await import('@/lib/storage/db');
    const hearts = await (await import('@/lib/storage/db')).heartsRepo.getAll();
    const existing = hearts.find(h => h.targetId === sharedPartId && h.userId === currentUserId);
    if (existing) {
      await (await import('@/lib/storage/db')).heartsRepo.delete(existing.id);
    } else {
      await (await import('@/lib/storage/db')).heartsRepo.put({
        id: crypto.randomUUID(),
        targetType: 'sharedPart',
        targetId: sharedPartId,
        userId: currentUserId,
        createdAt: new Date().toISOString(),
      });
    }
    loadData();
  };

  const handleShare = async (partId: string) => {
    // Would open a share modal
    console.log('Share part:', partId);
  };

  if (loading) {
    return <main className="flex-1 p-6 flex items-center justify-center"><div className="animate-pulse">Loading…</div></main>;
  }

  return (
    <main className="flex-1 bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Community</h1>
            <p className="mt-3 text-base leading-7 text-ink/65">
              Discover parts shared by the community, follow explorers, and share your own.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="community-search" className="sr-only">Search community</label>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="community-search" type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search parts, people…" className="h-11 w-full rounded-full border border-ink/10 bg-white pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20" />
          </div>

          <div className="flex flex-wrap gap-2">
            <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="h-11 px-4 py-2 rounded-full border border-ink/10 bg-white text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 appearance-none">
              <option value="all">All groups</option>
              <option value="manager">Guiding Voices</option>
              <option value="guardian">Protective Voices</option>
              <option value="innerKid">Young Voices</option>
              <option value="spiritual">Guiding Presence</option>
            </select>
            <select value={filterVisibility} onChange={e => setFilterVisibility(e.target.value as any)} className="h-11 px-4 py-2 rounded-full border border-ink/10 bg-white text-sm text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 appearance-none">
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="followers">Followers only</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Community sections">
          {(['library', 'people', 'feed'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} aria-selected={activeTab === tab} role="tab" className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${activeTab === tab ? 'border-teal bg-teal text-ivory' : 'border-ink/15 bg-white text-ink/70 hover:border-teal/40'}`}>
              {tab === 'library' && '📚 Library'}
              {tab === 'people' && '👥 People'}
              {tab === 'feed' && '📜 Feed'}
            </button>
          ))}
        </div>

        {activeTab === 'library' && (
          <div className="mt-10 space-y-12">
            {filteredParts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/20 bg-white px-6 py-14 text-center">
                <p className="text-base font-semibold text-ink">No parts match your filters.</p>
                <p className="mt-2 text-sm text-ink/55">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredParts.map(sp => {
                  const art = sp.partSnapshot.image ? sp.partSnapshot.image : null;
                  return (
                    <article key={sp.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm shadow-teal/5 transition-shadow hover:shadow-md hover:shadow-teal/10">
                      <div className="relative aspect-square overflow-hidden bg-ivory">
                        {sp.partSnapshot.image && (
                          <Image src={sp.partSnapshot.image} alt={`Art for ${sp.partSnapshot.name}`} fill sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                        )}
                        <div className="absolute inset-0 flex items-end justify-between p-2 pointer-events-none">
                          <span className="text-xs font-medium bg-teal/90 text-ivory px-1.5 py-0.5 rounded capitalize">{sp.partSnapshot.group}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={e => { e.stopPropagation(); handleHeart(sp.id); }} className="p-1.5 bg-white/90 backdrop-blur rounded-full hover:bg-teal-tint/60 transition-colors" aria-label="Heart">
                              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                            <button onClick={e => { e.stopPropagation(); handleShare(sp.id); }} className="p-1.5 bg-white/90 backdrop-blur rounded-full hover:bg-teal-tint/60 transition-colors" aria-label="Share">
                              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.5 9 12c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5c0 .5-.062.99-.184 1.459l1.031 1.031c.265.265.46.672.46 1.113 0 .44-.196.848-.5.1.14-.5.28-.997.46-1.5.14-.5.28-.997.46-1.5l1.031-1.031c.46-.46.66-1.13.5-1.5A4.49 4.49 0 0015 6c-2.485 0-4.5 2.015-4.5 4.5 0 .5.062.99.184 1.459l-1.03 1.03c-.265.265-.46.672-.46 1.113 0 .44.196.848.5 1.1.14.5.28.997.46 1.5l1.03 1.03c.265.265.46.672.46 1.113 0 .44-.196.848-.5 1.1-.14.5-.28.997-.46 1.5l-1.03 1.03c-.46.46-.66.672-.5 1.1-.14.5-.28.997-.46 1.5l-1.03 1.03c-.265.265-.46.672-.46 1.113 0 .44.196.848.5 1.1.14.5.28.997.46 1.5l1.03 1.03c.265.265.46.672.46 1.113 0 .44-.196.848-.5 1.1-.14.5-.28.997-.46 1.5l-1.03 1.03c-.265.265-.46.672-.46 1.113 0 .44.196.848.5 1.1.14.5.28.997.46 1.5l1.03 1.03c.265.265.46.672.46 1.113 0 .44-.196.848-.5 1.1-.14.5-.28.997-.46 1.5l-1.03 1.03c-.265.265-.46.672-.46 1.113 0 .44.196.848.5 1.1.14.5.28.997.46 1.5l1.03 1.03c.265.265.46.672.46 1.113 0 .44-.196.848-.5 1.1-.14.5-.28.997-.46 1.5" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-base font-semibold leading-snug text-ink">{sp.partSnapshot.name}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/60">{sp.owner.displayName}</p>
                        <div className="mt-auto pt-4 flex items-center gap-2">
                          <button onClick={() => handleFollow(sp.ownerId)} className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border {sp.isFollowing ? 'bg-teal text-ivory border-teal' : 'bg-white text-teal border-teal'}">{sp.isFollowing ? 'Following' : 'Follow'}</button>
                          <button onClick={() => setSelectedPart(sp)} className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-ink/15 hover:bg-teal-tint/60">View</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="mt-10 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map(u => {
                const isFollowing = false; // would need follows data
                return (
                  <article key={u.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm shadow-teal/5 transition-shadow hover:shadow-md hover:shadow-teal/10">
                    <div className="flex items-center justify-center gap-4 p-4">
                      {u.avatar ? (
                        <Image src={u.avatar} alt="" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-tint text-2xl font-semibold text-teal-deep">
                          {u.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="font-semibold text-ink truncate">{u.displayName}</h3>
                        <p className="text-sm text-ink/60">@{(u as any).username || u.email.split('@')[0]}</p>
                      </div>
                      <button onClick={() => handleFollow(u.id)} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${false ? 'bg-teal text-ivory' : 'bg-white text-teal border-teal border'}`}>
                        {false ? 'Following' : 'Follow'}
                      </button>
                    </div>
                    <div className="px-4 pb-4">
                      <button onClick={() => handleFollow(u.id)} className="w-full px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border {false ? 'bg-teal text-ivory border-teal' : 'bg-white text-teal border-teal border'}">
                        {false ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="mt-10 space-y-6">
            <div className="rounded-xl border border-ink/10 bg-white p-6 text-center">
              <p className="text-ink/60">Activity feed coming soon.</p>
            </div>
          </div>
        )}

        {selectedPart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" onClick={() => setSelectedPart(null)}>
            <div className="bg-white rounded-2xl border border-ink/10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-ink/10 sticky top-0 bg-white z-10">
                <h2 className="text-lg font-semibold">Part Details</h2>
                <button onClick={() => setSelectedPart(null)} className="p-2 rounded-lg hover:bg-teal-tint text-ink/60" aria-label="Close"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <BodyAwareness
                  initialSensations={selectedPart?.partSnapshot.bodySensations || []}
                  onChange={() => {}}
                  emotion={selectedPart.partSnapshot.group}
                  readOnly
                  showSummary={false}
                  mapHeight={300}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}