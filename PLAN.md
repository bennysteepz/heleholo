# heleholo — Decentralized Tours on Oahu

> *"Hele holo"* is Hawaiian for "let's go" or "go fast/go ride." The name says it all.

---

## The Idea

Tourism in Waikiki is dominated by big hotel lobbies, bus tour operators, and activity desks that take massive cuts and pack tourists into generic experiences. Meanwhile, thousands of rideshare drivers — many of them born-and-raised locals with deep island knowledge, genuine stories, and natural charisma — circle Oahu every day, delivering zero of that value.

**heleholo decentralizes tours the same way:**
- Uber decentralized taxis
- Airbnb decentralized short-term rentals
- Turo decentralized car rentals

Tourists book a local driver-guide directly through the app. The driver picks their own routes, sets their own vibe, and earns significantly more per hour than a standard rideshare. Money flows directly to local Oahu residents instead of corporate hotel lobby operators.

---

## Why Now, Why Waikiki

- **Boots on the ground:** Lease in Waikiki through May 1, 2027 — time to build, launch, and prove the model locally.
- **Strong local network:** Connections in sales and marketing already on-island.
- **Rideshare driver supply:** Oahu has a dense rideshare driver base, many of whom want higher-earning opportunities and the freedom that comes with freelance work.
- **Tourism demand:** Waikiki hosts millions of visitors per year, most of whom are underserved by rigid, overpriced big-bus tours.
- **Low competition:** No dominant local player in the decentralized tour space on Oahu.

---

## The Value Exchange

Understanding what each side of the marketplace brings is the foundation of the product.

### Locals (Driver-Guides)
| Want | Offer |
|---|---|
| Money — meaningful income above rideshare rates | Insight — genuine local knowledge tourists can't Google |
| Freedom — freelance schedule, no boss | Vehicles — already own or operate a car |

### Tourists
| Want | Offer |
|---|---|
| Ethical traveling — money going directly to locals | Money |
| A "true" local experience — not a scripted bus tour | |

The match is clean. heleholo is the layer that connects them.

---

## Target Market

**Narrow focus first.** The more flexibility offered upfront, the harder it is to build, quantify, and iterate. The MVP targets:

- **Tourists:** Visitors to Waikiki who are independently minded — staying at Airbnbs or boutique hotels, not booked on pre-packaged resort tours. Aged roughly 25–45, interested in authentic local culture, food, and adventure. Value ethical travel and want their money to reach real people.
- **Driver-Guides:** Two types of locals exist, and each needs a different onboarding approach:
  - **Locals who know what they want** — already have a signature route or story in mind, just need a platform to sell it.
  - **Locals who don't** — have the personality and vehicle but need prompting, structure, and route suggestions to get started.

Both types are valuable. The product and onboarding must serve both.

---

## Discovery — What Tourists See First

The first screen a tourist opens determines everything. Based on our first team meeting, the MVP browse experience is built around three filters:

1. **Activity** — what kind of experience? (e.g. scenic drive, food tour, surf culture, hiking drop-off, historical, hidden gems)
2. **Schedule** — when? (today, this weekend, specific date/time)
3. **Person** — who's guiding? (browse by driver profile, vibe, language, reviews)

The goal is to make it feel less like booking a service and more like picking a person you want to spend a few hours with. The guide *is* the product.

---

## User Profiles

Both tourists and driver-guides set up a profile at onboarding.

**Tourist profile includes:**
- Age range
- Interests (adventure, food, culture, history, beaches, nightlife, etc.)
- This powers personalized recommendations and helps driver-guides know who they're hosting.

**Driver-guide profile includes:**
- Bio and origin story (grew up here? moved here when? what do you love about Oahu?)
- Vehicle info
- Languages spoken
- Signature routes or areas they love
- Availability and pricing
- Short intro video (optional but high-converting)

---

## How It Works

### For Tourists
1. Open heleholo, filter by activity / schedule / person.
2. Browse driver-guide profiles: bio, reviews, sample routes, languages, pricing, vibe.
3. Book a tour — hourly, half-day, or full-day — with transparent pricing.
4. Get picked up at their location: hotel, Airbnb, beach, wherever.
5. Enjoy a personalized island experience. Leave a review.

### For Driver-Guides
1. Apply to become a heleholo driver-guide (background check, vehicle check, short video intro).
2. Set availability, pricing, and highlight routes (North Shore, Diamond Head, Haleiwa, hidden spots, food tours, etc.).
3. Accept bookings through the app.
4. Display a heleholo electronic sign on the dashboard — same visibility as Uber/Lyft signs, but for tours.
5. Get paid directly. heleholo takes a small platform fee.

---

## Cancellation Policy

Cancellations are a real risk for driver-guides who block time and decline other work. The platform must protect their income:
- Tourist cancels 24+ hours out: full refund to tourist.
- Tourist cancels within 24 hours: driver-guide keeps 50%.
- Tourist cancels within 2 hours or no-shows: driver-guide keeps 100%.
- Driver-guide cancels: tourist gets full refund + priority rebooking credit.

*These numbers are a starting point — refine based on driver feedback during beta.*

---

## Revenue Model

| Stream | Details |
|---|---|
| Platform fee | ~15–20% of each booking (vs. 30–50% taken by hotel activity desks) |
| Driver-guide sign rental | Optional monthly fee for branded electronic dashboard signs |
| Premium listings | Featured placement for top-rated guides |
| Future: corporate/group | Pre-arranged group tours for companies, weddings, events |

---

## Product — React Native App

### Tech Stack
- **Framework:** React Native (Expo) — single codebase for iOS and Android
- **Design:** Figma — all screens mocked before any code is written
- **Backend:** Supabase (auth, database, real-time)
- **Payments:** Stripe Connect (direct payouts to drivers)
- **Maps:** Google Maps API / Mapbox
- **Notifications:** Expo Push Notifications
- **Media:** Cloudinary (driver profile photos, route highlight videos)

### MVP Screens

**Tourist flow:**
- [ ] Onboarding + profile setup (age, interests)
- [ ] Browse: map view + list view with filters (activity / schedule / person)
- [ ] Driver-guide profile page (bio, routes, reviews, pricing, intro video)
- [ ] Booking flow (date/time, duration, confirm, pay)
- [ ] Active tour view
- [ ] Review + tip screen

**Driver-guide flow:**
- [ ] Onboarding + profile setup (bio, vehicle, routes, pricing)
- [ ] Dashboard (availability toggle, upcoming bookings, earnings)
- [ ] Booking management (accept/decline, chat with tourist)
- [ ] Earnings history

**Admin:**
- [ ] Driver approval queue

### Design Principle
The more flexibility offered to users, the harder it is to build and quantify. Start simple: fixed tour durations, a defined set of activity categories, and a clear booking flow. Expand options only once the core loop is proven.

---

## Go-To-Market — Waikiki Launch

### Phase 0 — Foundation (Now → Month 1)
- [ ] Complete Figma mockups for all MVP screens
- [ ] Recruit first 10–15 driver-guides from local Uber/Lyft driver community
- [ ] Set up Stripe Connect, legal structure (LLC), and basic insurance requirements
- [ ] Build and test MVP internally

### Phase 1 — Soft Launch (Month 2–3)
- [ ] Launch with 10 driver-guides, invite-only tourist access
- [ ] Word of mouth through local network and hospitality contacts
- [ ] Place heleholo signs in driver vehicles
- [ ] Gather reviews, iterate fast on UX friction points

### Phase 2 — Public Launch (Month 3–5)
- [ ] Open app to all tourists in App Store + Google Play
- [ ] Social media push (Instagram, TikTok) — authentic local content, driver stories
- [ ] Partner with local Airbnb hosts to recommend heleholo to their guests
- [ ] Flyering/QR codes in Waikiki: International Market Place, Kalakaua Ave, Royal Hawaiian Center

### Phase 3 — Scale (Month 6–12)
- [ ] Expand driver-guide roster to 50+
- [ ] Add specialized tour categories (food, surf culture, Hawaiian history, adventure/hiking drop-off)
- [ ] Corporate/group bookings feature
- [ ] Explore expansion to Maui, Big Island

---

## Market Research Targets

Before and during launch, gather intel from these channels:
- **Tour bus lines** — pricing, routes, customer complaints
- **Hostels** — guests there are the exact tourist profile: independent, price-conscious, experience-hungry
- **Airport drop-off zones** — high volume of newly-arrived tourists; prime for QR code distribution and driver-guide recruitment

---

## Legal & Compliance Checklist
- [ ] Form LLC in Hawaii
- [ ] Research GET (General Excise Tax) requirements for tour operators
- [ ] Ensure driver-guides are classified correctly (1099 contractor model)
- [ ] Review Hawaii tour operator licensing requirements
- [ ] Consult insurance broker for ride-share + tour liability coverage
- [ ] Review Stripe Connect requirements for marketplace payouts

---

## Competitive Differentiation

| | heleholo | Big Bus Tours | Hotel Activity Desks | Airbnb Experiences |
|---|---|---|---|---|
| Local, personalized guide | ✅ | ❌ | ❌ | ✅ |
| On-demand / flexible timing | ✅ | ❌ | ❌ | ❌ |
| Transparent pricing | ✅ | ❌ | ❌ | ✅ |
| Driver earns full margin | ✅ | ❌ | ❌ | Partial |
| Private experience | ✅ | ❌ | ❌ | ❌ |
| Door-to-door pickup | ✅ | ❌ | ❌ | ❌ |
| Ethical / money to locals | ✅ | ❌ | ❌ | Partial |

---

## Metrics to Track at Launch
- Driver-guide signups and approval rate
- Tourist bookings per week
- Average booking value
- Driver earnings per tour (vs. equivalent rideshare hours)
- Tourist review scores
- Cancellation rate (tourist-initiated vs. driver-initiated)
- Repeat booking rate

---

## Open Questions
- Do drivers need a separate tour guide license in Hawaii beyond a standard driver's license?
- What is the optimal platform fee to attract drivers while sustaining the business?
- Should heleholo own/lease the electronic signs, or require drivers to purchase them?
- What's the right insurance model — platform policy vs. driver-owned?
- For locals who don't have a defined route yet: what does the onboarding flow look like to help them build one?
- At what booking volume does a dedicated operations person on the ground make sense?

---

## Meeting Log

| Date | Key Decisions |
|---|---|
| Jun 23, 2026 | First team meeting. Aligned on value exchange framework, two types of driver-guides, tourist profile setup, MVP filter UX (activity/schedule/person), cancellation risk, and market research targets (bus lines, hostels, airport). |

---

*Built in Waikiki. For Waikiki. By people who actually live here.*
