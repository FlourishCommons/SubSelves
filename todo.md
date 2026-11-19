# SubSelves — Development TODO / Progress Log

## Completed Features

### Brand System & Global Styling
- [x] Finalized brand palette (Teal, Apricot, Golden, Periwinkle, Sage, Ivory, Ink + tints)
- [x] Replaced globals.css with brand tokens; removed dark mode
- [x] Applied brand tokens globally across `src/app/**` and `src/components/**`
- [x] Landing page: hero with interactive Part conversation, breathing exercise
- [x] TopNav: logo image before Dashboard link; active states fixed

### Parts Library & Artwork
- [x] Extracted 100 part artworks (icons + thumbnails) from source zips → `public/part-art/`
- [x] Generated `partArt.ts` from symbolism guide with metadata (icon, thumbnail, scene, meaning, sourceUrl, provisional flag)
- [x] Full gallery at `/parts/library` with category filters, search, category-colored circular rings
- [x] Category ring updates: Protective Voices (guardian) now uses **golden** instead of teal
- [x] Ring thickness scales proportionally via container queries (2px at 128px)
- [x] Added "Library" link to top nav; fixed active-state logic
- [x] Updated `PartsLibraryDemo` and `HeroPartConversation` to use guardian=golden consistently
- [x] Scene index badge [i] on thumbnails instead of text on RHS

### Practice Library Dynamic Runner
- [x] Replaced static `/practice` page with dynamic SessionRunner (shared with `/session`)
- [x] Dialogue practice expanded to 11 granular journal steps
- [x] Added HeroPartConversation component with 4 part personas
- [x] BodyAwareness component for mapping body sensations (interactive SVG + list view)
- [x] BreathingCircle component for grounding exercises
- [x] PracticePickerView updated with "Practice Library" header

### Practice Library & Dynamic Runner
- [x] Replaced static `/practice` page with dynamic SessionRunner (shared with `/session`)
- [x] Dialogue practice expanded to 11 granular journal steps
- [x] Added HeroPartConversation component with 4 part personas
- [x] BodyAwareness component for mapping body sensations (interactive SVG + list view)
- [x] BreathingCircle component for grounding exercises
- [x] PracticePickerView updated with "Practice Library" header

### Social / Collaborative Infrastructure
- [x] New database schema (IndexedDB) with social stores:
  - `sharedParts` - Users' parts made visible to others (public, followers, private)
  - `follows` - Follow relationships between users
  - `hearts` - Reactions ("hearts") on shared parts/comments
  - `comments` - Threaded comments on shared parts
  - `activities` - Activity feed (shared_part, hearted_part, commented_part, followed_user, created_part)
  - `notifications` - Notifications (heart_received, comment_received, follow_received, etc.)
  - `shareRequests` - Private share requests (pending/accepted/declined)
  - `communityParts` - Curated community library entries
- [x] New Types (types.ts): UserProfile, SharingSettings, Follow, Heart, Comment, Activity, Notification, ShareRequest, CommunityPart, SharedPart, UserStats
- [x] DB name: `innerharmony` → `subselves`, version: 4 → 5
- [x] Repos added: sharedPartsRepo, followsRepo, heartsRepo, commentsRepo, activitiesRepo, notificationsRepo, shareRequestsRepo, communityPartsRepo
- [x] Backup version: 2 → 3, includes all new stores, app: 'subselves'

### UI Components
- [x] UserMenu component (`src/components/UserMenu.tsx`) — dropdown with profile links, logout
- [x] TopNav updated to use UserMenu component
- [x] Profile page (`/profile`) — full profile editing (bio, avatar, privacy, sharing settings)
- [x] Community page (`/community`) — three tabs (Library, People, Feed), search, filters, follow/unfollow, hearts, part detail modal with BodyAwareness
- [x] Profile page (`/profile`) — full profile editing (bio, avatar, privacy, sharing settings)
- [x] Updated TopNav with logo image (priority, unoptimized) and UserMenu
- [x] Updated LibraryPicker with internal search state, "Library" button in PartsDrawer
- [x] BodyAwareness component integrated in part detail modal
- [x] Brand renamed: InnerHarmony → SubSelves

### Parts Library UI
- [x] Scene index badge [i] on thumbnails instead of text on RHS
- [x] "Browse artwork" → "Browse library" text
- [x] Logo updated with new logo-2.png (priority, unoptimized)

### Build & Quality
- [x] All TypeScript compilation passes
- [x] ESLint passes
- [x] Production build passes
- [x] All routes compile: `/`, `/profile`, `/community`, `/parts`, `/parts/library`, `/practice`, `/session`, etc.

---

## In Progress / Next Steps

### Sharing Workflow (Partially Implemented)
- [x] Share buttons exist in Library and Community pages (UI buttons, handlers log to console)
- [x] PartsDrawer "Library" button opens picker, auto-adds part
- [ ] Full share dialog with options (Public / Followers / Private)
- [ ] Private share requests (shareRequests store exists, UI needed)
- [ ] Share request approval flow
- [ ] Share from part detail page

### Community Features (Partially Implemented)
- [x] Community page with 3 tabs (Library, People, Feed)
- [x] Search and filtering (by group, visibility)
- [x] Follow/unfollow users
- [x] Heart shared parts
- [x] View part details with BodyAwareness modal
- [ ] Comment threads on shared parts
- [ ] Activity feed (real data)
- [ ] Notifications page (`/notifications`)
- [ ] Community part curation

### User Settings & Profile
- [x] Profile page (`/profile`) — full editing (bio, avatar, privacy, sharing settings)
- [ ] Settings page (`/settings`) — integrate sharing settings UI
- [ ] Avatar upload (currently URL only)
- [ ] Account deletion

### Notifications & Activity
- [ ] Notifications page (`/notifications`)
- [ ] Real-time notification badge in TopNav
- [ ] Activity feed with real data (currently placeholder)

### Share Requests (Private Shares)
- [ ] Share request modal (send to specific users)
- [ ] Request approval/decline flow
- [ ] Incoming/outgoing request management

### Community Library Curation
- [ ] CommunityPart curation UI (admin/moderator)
- [ ] Featured parts, tags, categories
- [ ] Part ratings/reviews

### Testing & Polish
- [ ] E2E tests for critical flows
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (ARIA, keyboard nav)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Error boundaries

---

## Database Schema (Current)

| Store | Indexes |
|-------|---------|
| parts | by-group |
| checkIns | by-date |
| journal | by-part, by-date |
| practice | by-kind, by-date |
| assessments | by-date |
| settings | — |
| trustTrials | by-partId |
| councils | by-date |
| bodySignals | by-date |
| haven | — |
| practiceProgress | — |
| users | by-email |
| **sharedParts** | by-ownerId, by-visibility |
| **follows** | by-followerId, by-followingId |
| **hearts** | by-targetId, by-userId |
| **comments** | by-sharedPartId, by-userId |
| **activities** | by-userId, by-createdAt |
| **notifications** | by-userId, by-read |
| **shareRequests** | by-fromUserId, by-toUserId, by-status |
| **communityParts** | by-curatorId, by-featured |

**DB**: `subselves` v5

---

## Commands

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Lint
npx eslint src/

# Build
npm run build

# Clear all data (dev)
# In browser console:
await (await import('@/lib/storage/db')).clearAllData()
```

---

## Routes

| Route | Status |
|-------|--------|
| `/` | ✅ Landing with hero, breathing, features |
| `/profile` | ✅ Full profile editing |
| `/community` | ✅ Library/People/Feed tabs |
| `/parts` | ✅ User's parts + add form |
| `/parts/library` | ✅ Full gallery with filters |
| `/parts/[id]` | ✅ Part detail with BodyAwareness |
| `/practice` | ✅ Dynamic runner |
| `/session` | ✅ Dynamic runner (shared) |
| `/practice` | ✅ Dynamic runner |
| `/session` | ✅ Dynamic runner |
| `/journal` | ✅ |
| `/learn` | ✅ |
| `/check-in` | ✅ |
| `/settings` | ⚠️ Basic |
| `/notifications` | ❌ Placeholder |
| `/donate` | ✅ |
| `/source-map` | ✅ |
| `/progress` | ✅ |

---

## Next Priority

1. **Share dialog implementation** — Wire up share buttons to open modal with Public/Followers/Private options
2. **Share requests UI** — Private share requests with approval flow
3. **Comments on shared parts** — Threaded comments
4. **Notifications page** — Unified inbox
5. **Settings page** — Integrate sharing settings
5. **Settings page** — Integrate sharing settings
</think>
<tool_call>
<function=write>
<parameter=content>
# SubSelves — Development TODO / Progress Log

## Completed Features

### Brand System & Global Styling
- [x] Finalized brand palette (Teal, Apricot, Golden, Periwinkle, Sage, Ivory, Ink + tints)
- [x] Replaced globals.css with brand tokens; removed dark mode
- [x] Applied brand tokens globally across `src/app/**` and `src/components/**`
- [x] Landing page: hero with interactive Part conversation, breathing exercise
- [x] TopNav: logo image before Dashboard link; active states fixed

### Parts Library & Artwork
- [x] Extracted 100 part artworks (icons + thumbnails) from source zips → `public/part-art/`
- [x] Generated `partArt.ts` from symbolism guide with metadata (icon, thumbnail, scene, meaning, sourceUrl, provisional flag)
- [x] Full gallery at `/parts/library` with category filters, search, category-colored circular rings
- [x] Category ring updates: Protective Voices (guardian) now uses **golden** instead of teal
- [x] Ring thickness scales proportionally via container queries (2px at 128px)
- [x] Added "Library" link to top nav; fixed active-state logic
- [x] Updated `PartsLibraryDemo` and `HeroPartConversation` to use guardian=golden consistently
- [x] Scene index badge [i] on thumbnails instead of text on RHS

### Practice Library Dynamic Runner
- [x] Replaced static `/practice` page with dynamic SessionRunner (shared with `/session`)
- [x] Dialogue practice expanded to 11 granular journal steps
- [x] Added HeroPartConversation component with 4 part personas
- [x] BodyAwareness component for mapping body sensations (interactive SVG + list view)
- [x] BreathingCircle component for grounding exercises
- [x] PracticePickerView updated with "Practice Library" header

### Social / Collaborative Infrastructure
- [x] New database schema (IndexedDB) with social stores:
  - `sharedParts` - Users' parts made visible to others (public, followers, private)
  - `follows` - Follow relationships between users
  - `hearts` - Reactions ("hearts") on shared parts/comments
  - `comments` - Threaded comments on shared parts
  - `activities` - Activity feed (shared_part, hearted_part, commented_part, followed_user, created_part)
  - `notifications` - Notifications (heart_received, comment_received, follow_received, etc.)
  - `shareRequests` - Private share requests (pending/accepted/declined)
  - `communityParts` - Curated community library entries
- [x] New Types (types.ts): UserProfile, SharingSettings, Follow, Heart, Comment, Activity, Notification, ShareRequest, CommunityPart, SharedPart, UserStats
- [x] DB name: `innerharmony` → `subselves`, version: 4 → 5
- [x] Repos added: sharedPartsRepo, followsRepo, heartsRepo, commentsRepo, activitiesRepo, notificationsRepo, shareRequestsRepo, communityPartsRepo
- [x] Backup version: 2 → 3, includes all new stores, app: 'subselves'

### UI Components
- [x] UserMenu component (`src/components/UserMenu.tsx`) — dropdown with profile links, logout
- [x] TopNav updated to use UserMenu component
- [x] Profile page (`/profile`) — full profile editing (bio, avatar, privacy, sharing settings)
- [x] Community page (`/community`) — three tabs (Library, People, Feed), search, filters, follow/unfollow, hearts, part detail modal with BodyAwareness
- [x] Profile page (`/profile`) — full profile editing
- [x] Community page (`/community`) — full community page
- [x] New database schema with social features
- [x] Updated TopNav with logo image (priority, unoptimized) and UserMenu
- [x] Updated LibraryPicker with internal search state, "Library" button in PartsDrawer
- [x] BodyAwareness component integrated in part detail modal
- [x] Brand renamed: InnerHarmony → SubSelves

### Parts Library UI
- [x] Scene index badge [i] on thumbnails instead of text on RHS
- [x] "Browse artwork" → "Browse library" text
- [x] Logo updated with new logo-2.png (priority, unoptimized)

### Build & Quality
- [x] All TypeScript compilation passes
- [x] ESLint passes
- [x] Production build passes
- [x] All routes compile: `/`, `/profile`, `/community`, `/parts`, `/parts/library`, `/practice`, `/session`, etc.

---

## In Progress / Next Steps

### Sharing Workflow (Partially Implemented)
- [x] Share buttons exist in Library and Community pages (UI buttons, handlers log to console)
- [x] PartsDrawer "Library" button opens picker, auto-adds part
- [ ] Full share dialog with options (Public / Followers / Private)
- [ ] Private share requests (shareRequests store exists, UI needed)
- [ ] Share request approval flow
- [ ] Share from part detail page

### Community Features (Partially Implemented)
- [x] Community page with 3 tabs (Library, People, Feed)
- [x] Search and filtering (by group, visibility)
- [x] Follow/unfollow users
- [x] Heart shared parts
- [x] View part details with BodyAwareness modal
- [ ] Comment threads on shared parts
- [ ] Activity feed (real data)
- [ ] Notifications page (`/notifications`)
- [ ] Community part curation

### User Settings & Profile
- [x] Profile page (`/profile`) — full profile editing (bio, avatar, privacy, sharing settings)
- [ ] Settings page (`/settings`) — integrate sharing settings UI
- [ ] Avatar upload (currently URL only)
- [ ] Account deletion

### Notifications & Activity
- [ ] Notifications page (`/notifications`)
- [ ] Real-time notification badge in TopNav
- [ ] Activity feed with real data (currently placeholder)

### Share Requests (Private Shares)
- [ ] Share request modal (send to specific users)
- [ ] Request approval/decline flow
- [ ] Incoming/outgoing request management

### Community Library Curation
- [ ] CommunityPart curation UI (admin/moderator)
- [ ] Featured parts, tags, categories
- [ ] Part ratings/reviews

### Testing & Polish
- [ ] E2E tests for critical flows
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (ARIA, keyboard nav)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Error boundaries

---

## Database Schema (Current)

| Store | Indexes |
|-------|---------|
| parts | by-group |
| checkIns | by-date |
| journal | by-part, by-date |
| practice | by-kind, by-date |
| assessments | by-date |
| settings | — |
| trustTrials | by-partId |
| councils | by-date |
| bodySignals | by-date |
| haven | — |
| practiceProgress | — |
| users | by-email |
| **sharedParts** | by-ownerId, by-visibility |
| **follows** | by-followerId, by-followingId |
| **hearts** | by-targetId, by-userId |
| **comments** | by-sharedPartId, by-userId |
| **activities** | by-userId, by-createdAt |
| **notifications** | by-userId, by-read |
| **shareRequests** | by-fromUserId, by-toUserId, by-status |
| **communityParts** | by-curatorId, by-featured |

**DB**: `subselves` v5

---

## Commands

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Lint
npx eslint src/

# Build
npm run build

# Clear all data (dev)
# In browser console:
await (await import('@/lib/storage/db')).clearAllData()
```

---

## Routes

| Route | Status |
|-------|--------|
| `/` | ✅ Landing with hero, breathing, features |
| `/profile` | ✅ Full profile editing |
| `/community` | ✅ Library/People/Feed tabs |
| `/parts` | ✅ User's parts + add form |
| `/parts/library` | ✅ Full gallery with filters |
| `/parts/[id]` | ✅ Part detail with BodyAwareness |
| `/practice` | ✅ Dynamic runner |
| `/session` | ✅ Dynamic runner (shared) |
| `/practice` | ✅ Dynamic runner |
| `/session` | ✅ Dynamic runner |
| `/journal` | ✅ |
| `/learn` | ✅ |
| `/check-in` | ✅ |
| `/settings` | ⚠️ Basic |
| `/notifications` | ❌ Placeholder |
| `/donate` | ✅ |
| `/source-map` | ✅ |
| `/progress` | ✅ |

---

## Next Priority

1. **Share dialog implementation** — Wire up share buttons to open modal with Public/Followers/Private options
2. **Share requests UI** — Private share requests with approval flow
3. **Comments on shared parts** — Threaded comments
4. **Notifications page** — Unified inbox
5. **Settings page** — Integrate sharing settings