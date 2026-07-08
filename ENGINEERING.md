# heleholo — Technical Engineering Plan

> This document covers the full engineering blueprint for the heleholo React Native app: architecture, data models, API design, screen-by-screen build plan, and development workflow.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Repository Structure](#repository-structure)
3. [User Types & Auth](#user-types--auth)
4. [Data Models](#data-models)
5. [API / Backend Design](#api--backend-design)
6. [Screen Inventory](#screen-inventory)
7. [Core Features — Implementation Notes](#core-features--implementation-notes)
8. [Payments — Stripe Connect](#payments--stripe-connect)
9. [Maps & Location](#maps--location)
10. [Notifications](#notifications)
11. [Media Storage](#media-storage)
12. [Admin Panel](#admin-panel)
13. [Development Phases](#development-phases)
14. [Environment Setup](#environment-setup)
15. [Open Engineering Questions](#open-engineering-questions)

---

## Tech Stack

| Layer | Tool | Reason |
|---|---|---|
| Mobile framework | React Native (Expo SDK 51+) | Single codebase for iOS + Android, fast iteration |
| Language | TypeScript | Type safety across the whole stack |
| Navigation | Expo Router (file-based) | Clean, predictable routing; deep link support |
| State management | Zustand | Lightweight, no boilerplate |
| Backend / DB | Supabase | Postgres + auth + real-time + storage, self-hostable |
| Auth | Supabase Auth | Email/password + OAuth (Apple, Google) |
| Payments | Stripe Connect (Express accounts) | Direct payouts to driver-guides |
| Maps | React Native Maps + Google Maps SDK | Familiar UX, strong iOS + Android support |
| Push notifications | Expo Notifications | Works with both platforms, easy setup |
| Media | Supabase Storage (images) + Mux (video) | Mux handles adaptive streaming for guide intro videos |
| Forms | React Hook Form + Zod | Validation and form state without overhead |
| Styling | NativeWind (Tailwind for RN) | Consistent design tokens, fast styling |
| Design handoff | Figma | All screens designed before code is written |
| CI/CD | EAS Build + EAS Submit | Expo's build and App Store/Play Store pipeline |

---

## Repository Structure

```
heleholo/
├── app/                        # Expo Router screens (file-based routing)
│   ├── (auth)/                 # Unauthenticated screens
│   │   ├── welcome.tsx
│   │   ├── sign-up.tsx
│   │   └── sign-in.tsx
│   ├── (tourist)/              # Tourist tab layout
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Browse / discovery
│   │   ├── guide/[id].tsx      # Driver-guide profile
│   │   ├── book/[id].tsx       # Booking flow
│   │   ├── tour/[id].tsx       # Active tour view
│   │   └── profile.tsx         # Tourist profile
│   ├── (guide)/                # Driver-guide tab layout
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Guide dashboard
│   │   ├── bookings.tsx        # Manage bookings
│   │   ├── earnings.tsx        # Earnings history
│   │   └── profile.tsx         # Guide profile editor
│   ├── (admin)/                # Admin screens (role-gated)
│   │   └── approvals.tsx
│   └── _layout.tsx             # Root layout, auth redirect logic
├── components/                 # Shared UI components
│   ├── ui/                     # Primitives (Button, Card, Input, etc.)
│   ├── GuideCard.tsx
│   ├── BookingCard.tsx
│   ├── FilterBar.tsx
│   └── MapView.tsx
├── lib/                        # Utilities and service clients
│   ├── supabase.ts
│   ├── stripe.ts
│   └── notifications.ts
├── store/                      # Zustand stores
│   ├── authStore.ts
│   ├── bookingStore.ts
│   └── guideStore.ts
├── hooks/                      # Custom React hooks
│   ├── useGuides.ts
│   ├── useBookings.ts
│   └── useLocation.ts
├── types/                      # Shared TypeScript types
│   └── index.ts
├── constants/                  # App-wide constants
│   ├── categories.ts           # Tour activity categories
│   └── config.ts
├── supabase/                   # Supabase local config
│   ├── migrations/             # DB migration files
│   └── seed.sql
├── assets/
├── app.json
├── eas.json
└── package.json
```

---

## User Types & Auth

### Three roles

| Role | Description |
|---|---|
| `tourist` | Books tours, browses guides |
| `guide` | Offers tours, manages bookings, receives payouts |
| `admin` | Approves guide applications, manages platform |

### Sign-up flow

1. User opens app → sees **Welcome** screen with two paths: "I'm a tourist" / "I'm a local guide"
2. Role is stored in the `profiles` table at sign-up and determines which tab layout loads.
3. A user can only hold one role in the MVP. Role-switching is a post-MVP feature.

### Auth methods (MVP)
- Email + password
- Sign in with Apple (required for iOS App Store)
- Sign in with Google

### Session handling
- Supabase Auth handles JWT tokens + refresh automatically.
- On app launch, `_layout.tsx` checks session and redirects to the correct tab group or the auth flow.

---

## Data Models

All tables live in Supabase (Postgres). Row-level security (RLS) policies enforce that users can only read/write their own data.

### `profiles`
```sql
id              uuid  PRIMARY KEY  -- matches auth.users.id
role            text               -- 'tourist' | 'guide' | 'admin'
full_name       text
avatar_url      text
age_range       text               -- tourist only: '18-24' | '25-34' | '35-44' | '45+'
interests       text[]             -- tourist only: ['food', 'adventure', 'culture', ...]
languages       text[]             -- guide only
bio             text               -- guide only
origin_story    text               -- guide only
intro_video_url text               -- guide only
stripe_account_id text            -- guide only (Stripe Connect account)
is_approved     boolean            -- guide only, set by admin
created_at      timestamptz
```

### `vehicles`
```sql
id          uuid  PRIMARY KEY
guide_id    uuid  REFERENCES profiles(id)
make        text
model       text
year        int
color       text
plate       text
photo_url   text
```

### `tours` (a guide's offered experiences)
```sql
id              uuid  PRIMARY KEY
guide_id        uuid  REFERENCES profiles(id)
title           text
description     text
category        text   -- 'scenic' | 'food' | 'surf' | 'history' | 'adventure' | 'hidden_gems'
duration_hours  int    -- 1 | 2 | 4 | 8
price_per_hour  numeric
max_guests      int    -- MVP: 1-4
photos          text[]
is_active       boolean
created_at      timestamptz
```

### `availability`
```sql
id          uuid  PRIMARY KEY
guide_id    uuid  REFERENCES profiles(id)
date        date
start_time  time
end_time    time
is_booked   boolean  DEFAULT false
```

### `bookings`
```sql
id              uuid  PRIMARY KEY
tour_id         uuid  REFERENCES tours(id)
tourist_id      uuid  REFERENCES profiles(id)
guide_id        uuid  REFERENCES profiles(id)
status          text   -- 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
start_datetime  timestamptz
duration_hours  int
guest_count     int
total_price     numeric
platform_fee    numeric
guide_payout    numeric
pickup_location text
stripe_payment_intent_id  text
cancelled_by    text   -- 'tourist' | 'guide'
cancelled_at    timestamptz
created_at      timestamptz
```

### `reviews`
```sql
id          uuid  PRIMARY KEY
booking_id  uuid  REFERENCES bookings(id)
tourist_id  uuid  REFERENCES profiles(id)
guide_id    uuid  REFERENCES profiles(id)
rating      int    -- 1-5
body        text
tip_amount  numeric  DEFAULT 0
created_at  timestamptz
```

### `messages`
```sql
id          uuid  PRIMARY KEY
booking_id  uuid  REFERENCES bookings(id)
sender_id   uuid  REFERENCES profiles(id)
body        text
created_at  timestamptz
```

---

## API / Backend Design

heleholo uses **Supabase Edge Functions** (Deno/TypeScript) for business logic that can't run client-side — primarily payments and webhook handling.

### Edge Functions

| Function | Trigger | Purpose |
|---|---|---|
| `create-payment-intent` | Tourist confirms booking | Create Stripe PaymentIntent, calculate platform fee vs. guide payout |
| `confirm-booking` | Stripe webhook: `payment_intent.succeeded` | Set booking status to `confirmed`, notify guide |
| `handle-cancellation` | Tourist/guide cancels | Apply cancellation policy, issue refund via Stripe, notify both parties |
| `payout-guide` | Booking marked `completed` | Release held funds to guide's Stripe Connect account |
| `approve-guide` | Admin approves | Flip `is_approved`, create Stripe Connect account for guide, send welcome notification |

### Realtime subscriptions (Supabase Realtime)
- `bookings` table — tourist and guide both subscribe to booking status changes
- `messages` table — in-booking chat, live updates

---

## Screen Inventory

### Auth Screens
| Screen | File | Notes |
|---|---|---|
| Welcome / role select | `(auth)/welcome.tsx` | "I'm a tourist" / "I'm a local guide" — sets role before sign-up |
| Sign up | `(auth)/sign-up.tsx` | Email/password + Apple/Google, role-aware |
| Sign in | `(auth)/sign-in.tsx` | |

### Tourist Screens
| Screen | File | Notes |
|---|---|---|
| Browse (home) | `(tourist)/index.tsx` | Filter bar (activity / schedule / person), list + map toggle |
| Guide profile | `(tourist)/guide/[id].tsx` | Bio, tours offered, reviews, intro video, Book button |
| Booking flow | `(tourist)/book/[id].tsx` | Select date/time, duration, guest count, pickup location, pay |
| Active tour | `(tourist)/tour/[id].tsx` | Live status, guide contact, map |
| Review + tip | Part of tour/[id].tsx | Triggered when guide marks tour complete |
| Tourist profile | `(tourist)/profile.tsx` | Edit interests, age range, past bookings |

### Guide Screens
| Screen | File | Notes |
|---|---|---|
| Dashboard | `(guide)/index.tsx` | Availability toggle, today's bookings, earnings summary |
| Booking management | `(guide)/bookings.tsx` | Pending → accept/decline, upcoming, past |
| Earnings history | `(guide)/earnings.tsx` | Per-booking breakdown, Stripe payout status |
| Guide profile editor | `(guide)/profile.tsx` | Bio, routes, vehicle, intro video upload, pricing |

### Admin Screens
| Screen | File | Notes |
|---|---|---|
| Approval queue | `(admin)/approvals.tsx` | Review guide applications, approve/reject |

---

## Core Features — Implementation Notes

### Browse & Filtering
- Default view: list of available guides for **today**.
- Three filter dimensions map to query params: `?category=food&date=2026-07-10&sort=rating`
- Map view uses `react-native-maps` with custom markers per guide (avatar + category icon).
- Guides only appear in browse if `is_approved = true` and they have at least one active `availability` slot.

### Two Types of Guide Onboarding
- **Guide who knows what they want:** Standard form — fill in bio, add routes, set pricing, go.
- **Guide who doesn't:** Guided wizard with prompts: *"What's your favorite spot on the island?"*, *"What do people always ask you about?"*, *"Pick 3 categories that fit you."* — wizard outputs a draft bio and suggested tour listing for them to edit.

### Booking State Machine
```
pending → confirmed → active → completed
                   ↘ cancelled
```
- `pending`: Tourist paid, waiting on guide to accept.
- `confirmed`: Guide accepted. Payment held by Stripe.
- `active`: Tour is happening (guide starts it in the app).
- `completed`: Guide ends tour. Review + tip prompt fires for tourist. Payout releases to guide.
- `cancelled`: Either party cancelled. Cancellation policy logic runs in Edge Function.

### In-App Chat
- Scoped to a specific booking — tourist and guide can message each other once booking is `confirmed`.
- Built on Supabase Realtime subscriptions to the `messages` table.
- No general messaging — keeps support surface small.

### Reviews
- Review prompt appears for tourist only after booking reaches `completed`.
- Guide's average rating is computed as a Postgres view, not stored — avoids stale data.
- Guides with < 3 reviews show "New guide" badge instead of a rating.

---

## Payments — Stripe Connect

heleholo uses **Stripe Connect Express** — the simplest model for a marketplace.

### Flow
1. Guide signs up → Admin approves → heleholo calls Stripe to create an Express account for the guide → guide completes Stripe onboarding (identity verification, bank account).
2. Tourist books → `create-payment-intent` Edge Function creates a PaymentIntent with `application_fee_amount` (heleholo's cut) and `transfer_data.destination` (guide's Stripe account).
3. Payment is authorized but not captured until guide accepts.
4. Guide accepts → payment captured.
5. Tour completes → funds transfer to guide's account automatically.
6. Cancellations → Edge Function calls Stripe refund API based on cancellation policy tier.

### Platform fee calculation
```
total_price = duration_hours * price_per_hour * guest_count
platform_fee = total_price * 0.18   // 18% — adjustable
guide_payout = total_price - platform_fee
```

---

## Maps & Location

- `react-native-maps` with Google Maps provider (iOS + Android).
- On the browse screen, guides are plotted by their **general neighborhood** (not exact address) for privacy.
- During an active tour, the tourist sees the guide's live location (guide opts in; location shared only during `active` booking window).
- Pickup location is entered as free text by the tourist at booking, with Google Places Autocomplete for convenience.

---

## Notifications

Using **Expo Push Notifications** + Supabase Edge Functions to trigger them.

| Event | Who gets notified |
|---|---|
| New booking request | Guide |
| Booking confirmed by guide | Tourist |
| Booking cancelled | Both |
| Tourist message received | Guide |
| Guide message received | Tourist |
| Tour starting soon (1 hour before) | Both |
| Review request | Tourist (after completion) |
| Payout sent | Guide |

---

## Media Storage

| Media type | Storage | Notes |
|---|---|---|
| Profile avatars | Supabase Storage | Public bucket, resized on upload |
| Tour photos | Supabase Storage | Up to 6 per tour listing |
| Vehicle photos | Supabase Storage | |
| Guide intro videos | Mux | Adaptive streaming, thumbnail generation, max 2 min |

---

## Admin Panel

MVP admin is a simple gated screen inside the app (role = `admin`).

**Approval queue flow:**
1. Guide submits application (profile + vehicle info + intro video).
2. Admin sees card with all info + video player.
3. Admin taps Approve → Edge Function runs: sets `is_approved = true`, triggers Stripe Connect account creation, sends guide a welcome push notification.
4. Admin taps Reject → guide notified with rejection reason.

Post-MVP: move admin to a web dashboard (Supabase Studio or a lightweight Next.js app).

---

## Development Phases

### Phase 0 — Setup (Week 1–2)
- [ ] Initialize Expo project with TypeScript + Expo Router
- [ ] Configure Supabase project, run initial migrations
- [ ] Set up NativeWind, folder structure, ESLint/Prettier
- [ ] Configure EAS Build for dev/staging/production
- [ ] Build auth flow end-to-end (sign up, sign in, role routing)
- [ ] Stub all screen files so navigation works

### Phase 1 — Guide Side (Week 3–4)
- [ ] Guide onboarding wizard (both types)
- [ ] Guide profile editor
- [ ] Tour listing creation
- [ ] Availability calendar
- [ ] Guide dashboard shell

### Phase 2 — Tourist Side (Week 5–6)
- [ ] Browse screen with filter bar
- [ ] Guide profile view
- [ ] Map view with guide markers
- [ ] Tourist profile setup

### Phase 3 — Booking & Payments (Week 7–8)
- [ ] Booking flow UI
- [ ] Stripe Connect integration (guide onboarding + PaymentIntent)
- [ ] Edge Functions: create-payment-intent, confirm-booking, handle-cancellation, payout-guide
- [ ] Booking state machine + real-time status updates

### Phase 4 — Communication & Reviews (Week 9)
- [ ] In-app chat (Supabase Realtime)
- [ ] Push notifications (all events)
- [ ] Review + tip flow

### Phase 5 — Admin & Polish (Week 10)
- [ ] Admin approval queue
- [ ] Guide intro video upload (Mux)
- [ ] Error handling, loading states, empty states
- [ ] Accessibility pass

### Phase 6 — QA & Launch Prep (Week 11–12)
- [ ] End-to-end testing on real iOS + Android devices
- [ ] App Store + Google Play submissions via EAS Submit
- [ ] Stripe live mode setup
- [ ] Beta TestFlight with first driver-guides

---

## Environment Setup

### Prerequisites
- Node.js 20+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Supabase CLI: `brew install supabase/tap/supabase`
- Stripe CLI: `brew install stripe/stripe-cli/stripe`

### Environment variables (`.env.local`)
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # server-side / Edge Functions only
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=               # Edge Functions only
STRIPE_WEBHOOK_SECRET=           # Edge Functions only
EXPO_PUBLIC_GOOGLE_MAPS_KEY=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
```

### Local dev
```bash
npx supabase start          # spins up local Postgres + auth
npx expo start              # starts Expo dev server
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

---

## Open Engineering Questions

- Should guide location sharing during active tours use Expo Location background task or only foreground? (battery vs. accuracy tradeoff)
- Is Mux worth the cost at MVP scale, or start with Supabase Storage for video and migrate later?
- Should the booking chat persist after tour completion for dispute resolution, or delete after 30 days?
- Do we need a web app at all for MVP, or is the mobile app sufficient?
- At what point do we need a dedicated Supabase instance vs. the free tier? (free tier: 500MB DB, 1GB storage, 50MB file uploads)

---

*Last updated: Jul 7, 2026*
