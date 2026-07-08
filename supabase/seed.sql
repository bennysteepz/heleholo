-- ============================================================
-- HELEHOLO SEED DATA
-- Paste into Supabase SQL Editor and run.
-- Safe to re-run: uses ON CONFLICT DO NOTHING.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. SCHEMA
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       text NOT NULL,
  role            text NOT NULL DEFAULT 'tourist',
  bio             text,
  avatar_url      text,
  languages       text[]  DEFAULT '{}',
  rating          numeric(3,2),
  review_count    int     DEFAULT 0,
  response_time   text,
  years_on_oahu   int,
  verified        boolean DEFAULT false,
  driver_verified boolean DEFAULT false,
  vehicle_make    text,
  vehicle_model   text,
  vehicle_color   text,
  vehicle_year    int,
  neighborhoods   text[]  DEFAULT '{}',
  categories      text[]  DEFAULT '{}',
  home_city       text,
  home_country    text,
  interests       text[]  DEFAULT '{}',
  created_at      timestamptz DEFAULT now()
);

-- Adventures (formerly "tours") — the top-level bookable experience
CREATE TABLE IF NOT EXISTS public.adventures (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id        uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           text NOT NULL,
  description     text,
  category        text,
  duration_hours  numeric(4,1),
  price_per_person numeric(8,2),
  max_guests      int DEFAULT 4,
  neighborhood    text,
  pickup_area     text,
  included        text[]  DEFAULT '{}',
  photo_url       text,
  rating          numeric(3,2),
  review_count    int     DEFAULT 0,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

-- Adventure legs — ordered stops/checkpoints within an adventure,
-- checked off as the guide and tourist move through the day.
CREATE TABLE IF NOT EXISTS public.adventure_legs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id    uuid REFERENCES public.adventures(id) ON DELETE CASCADE,
  title           text NOT NULL,
  description     text,
  duration_minutes int,
  order_index     int NOT NULL,
  location_name   text,
  is_optional     boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reviews (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id uuid REFERENCES public.adventures(id) ON DELETE CASCADE,
  tourist_id   uuid REFERENCES public.profiles(id),
  guide_id     uuid REFERENCES public.profiles(id),
  rating       int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body         text,
  created_at   timestamptz DEFAULT now()
);


-- ────────────────────────────────────────────────────────────
-- 2. ROW LEVEL SECURITY — allow public reads
-- ────────────────────────────────────────────────────────────

ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adventures     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adventure_legs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews        ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.profiles       TO anon, authenticated;
GRANT SELECT ON public.adventures     TO anon, authenticated;
GRANT SELECT ON public.adventure_legs TO anon, authenticated;
GRANT SELECT ON public.reviews        TO anon, authenticated;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='profiles'       AND policyname='public read profiles')       THEN CREATE POLICY "public read profiles"       ON public.profiles       FOR SELECT USING (true); END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='adventures'     AND policyname='public read adventures')     THEN CREATE POLICY "public read adventures"     ON public.adventures     FOR SELECT USING (true); END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='adventure_legs' AND policyname='public read adventure_legs') THEN CREATE POLICY "public read adventure_legs" ON public.adventure_legs FOR SELECT USING (true); END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='reviews'        AND policyname='public read reviews')        THEN CREATE POLICY "public read reviews"        ON public.reviews        FOR SELECT USING (true); END IF;
END $$;


-- ────────────────────────────────────────────────────────────
-- 3. GUIDE PROFILES  (ids: guide_01 … guide_10)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.profiles (id, full_name, role, bio, avatar_url, languages, rating, review_count,
  response_time, years_on_oahu, verified, driver_verified, vehicle_make, vehicle_model,
  vehicle_color, vehicle_year, neighborhoods, categories)
VALUES

('00000000-0000-0000-0001-000000000001',
 'Kai Nakamura', 'guide',
 'Born and raised on Oʻahu. I spend most mornings surfing before work and still get excited showing visitors the places I grew up. I love small food spots, coastal drives, and making sure nobody leaves feeling like they only saw the tourist version of Hawaiʻi.',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
 ARRAY['English','Japanese'], 4.98, 186, 'Usually within 8 min', 33, true, true,
 'Toyota','4Runner','Blue',2022,
 ARRAY['Kaimukī'],ARRAY['Local Food','Scenic Drive','Hidden Spots']),

('00000000-0000-0000-0001-000000000002',
 'Leilani Kealoha', 'guide',
 'I spent fifteen years teaching elementary school before becoming a full-time guide. My favorite days are slow ones — lookouts, fruit stands, easy hikes, and helping families discover places they''d never find on their own.',
 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
 ARRAY['English','Hawaiian'], 4.96, 231, 'Usually within 12 min', 41, true, true,
 'Honda','Pilot','White',2023,
 ARRAY['Kāneʻohe','Kailua'],ARRAY['Family Friendly','Hidden Spots','History & Culture']),

('00000000-0000-0000-0001-000000000003',
 'Mason Reyes', 'guide',
 'I''m a photographer who accidentally became a guide after friends kept asking me to show them around. If you''re after sunrise, beaches, or the perfect vacation photos, that''s probably where we''ll end up.',
 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
 ARRAY['English','Spanish'], 4.94, 94, 'Usually within 6 min', 11, true, true,
 'Jeep','Wrangler','Sand',2021,
 ARRAY['Waikīkī','Hawaiʻi Kai'],ARRAY['Photography','Sunrise Hike','Scenic Drive']),

('00000000-0000-0000-0001-000000000004',
 'Noa Silva', 'guide',
 'I grew up fishing the North Shore long before every beach had a pin on someone''s map. I like taking people somewhere they can actually relax instead of waiting in line for a picture.',
 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
 ARRAY['English'], 5.00, 308, 'Usually within 20 min', 52, true, true,
 'Toyota','Tacoma','Forest Green',2020,
 ARRAY['Haleʻiwa','North Shore'],ARRAY['Surf Culture','Hidden Spots','Scenic Drive']),

('00000000-0000-0000-0001-000000000005',
 'Malia Santos', 'guide',
 'Good food has always been my love language. Every tour somehow turns into talking story over poke, malasadas, garlic shrimp, or whatever small spot is having a good day.',
 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
 ARRAY['English','Tagalog'], 4.97, 149, 'Usually within 10 min', 24, true, true,
 'Subaru','Outback','Pearl White',2023,
 ARRAY['Kapolei','Honolulu'],ARRAY['Local Food','Family Friendly','Hidden Spots']),

('00000000-0000-0000-0001-000000000006',
 'Ethan Kim', 'guide',
 'I worked in hotels for years before realizing I''d rather spend real time with people than stand behind a desk. My tours are relaxed, flexible, and built around what you actually enjoy.',
 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
 ARRAY['English','Korean'], 4.92, 82, 'Usually within 15 min', 18, true, true,
 'Tesla','Model Y','Charcoal',2022,
 ARRAY['Pearl City','Honolulu'],ARRAY['Scenic Drive','Photography','Family Friendly']),

('00000000-0000-0000-0001-000000000007',
 'Kaleo Ahuna', 'guide',
 'If you''re hoping to spend the day checking boxes, I''m probably not your guide. If you want to stop whenever something looks interesting, take the long way, and leave room for surprises, we''ll get along great.',
 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80',
 ARRAY['English'], 4.99, 267, 'Usually within 18 min', 46, true, true,
 'Ford','Bronco','Cactus Gray',2021,
 ARRAY['Haleʻiwa','North Shore'],ARRAY['Surf Culture','Scenic Drive','Hidden Spots']),

('00000000-0000-0000-0001-000000000008',
 'Sarah Chang', 'guide',
 'I love introducing first-time visitors to the island without overwhelming them. Think coffee shops, beaches, short walks, and a pace that actually feels like vacation.',
 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
 ARRAY['English','Mandarin'], 4.95, 71, 'Usually within 5 min', 9, true, true,
 'Toyota','RAV4 Hybrid','Silver',2021,
 ARRAY['Honolulu','Kaimukī','Waikīkī'],ARRAY['Local Food','Scenic Drive','Family Friendly']),

('00000000-0000-0000-0001-000000000009',
 'Daniel Kaʻeo', 'guide',
 'I spent years working on boats before switching careers. Ocean viewpoints, coastal roads, and good conversations usually make for the best days.',
 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
 ARRAY['English'], 4.93, 118, 'Usually within 25 min', 38, true, true,
 'Honda','Passport','Dark Blue',2022,
 ARRAY['Hawaiʻi Kai','Waimānalo'],ARRAY['Scenic Drive','Photography','History & Culture']),

('00000000-0000-0000-0001-000000000010',
 'Jasmine Flores', 'guide',
 'I believe every visitor deserves one day that doesn''t feel like they''re following someone else''s itinerary. We''ll build the day together — food, views, history, or a little bit of everything.',
 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
 ARRAY['English','Tagalog'], 4.97, 204, 'Usually within 9 min', 16, true, true,
 'Mazda','CX-5','Red',2020,
 ARRAY['Mōʻiliʻili','Honolulu'],ARRAY['Hidden Spots','History & Culture','Local Food'])

ON CONFLICT (id) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 3. TOURIST PROFILES  (ids: tourist_01 … tourist_10)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.profiles (id, full_name, role, avatar_url, languages, interests, home_city, home_country, review_count)
VALUES

('00000000-0000-0000-0002-000000000001',
 'Emily Chen', 'tourist',
 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
 ARRAY['English','Mandarin'], ARRAY['Local Food','Coffee','Hidden Spots'],
 'Vancouver','Canada', 2),

('00000000-0000-0000-0002-000000000002',
 'Daniel Brooks', 'tourist',
 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80',
 ARRAY['English'], ARRAY['Hiking','Photography','Scenic Drives'],
 'Seattle','USA', 1),

('00000000-0000-0000-0002-000000000003',
 'Mia Rodriguez', 'tourist',
 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
 ARRAY['English','Spanish'], ARRAY['Beaches','Local Food','Music'],
 'Austin','USA', 0),

('00000000-0000-0000-0002-000000000004',
 'Sophie Martin', 'tourist',
 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
 ARRAY['French','English'], ARRAY['Family Friendly','Easy Hikes','History'],
 'Montréal','Canada', 1),

('00000000-0000-0000-0002-000000000005',
 'Ben Wilson', 'tourist',
 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
 ARRAY['English'], ARRAY['Surf Culture','North Shore','Scenic Drives'],
 'Sydney','Australia', 3),

('00000000-0000-0000-0002-000000000006',
 'Priya Patel', 'tourist',
 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
 ARRAY['English','Hindi'], ARRAY['Scenic Drives','Photography','Food'],
 'London','UK', 1),

('00000000-0000-0000-0002-000000000007',
 'Lukas Weber', 'tourist',
 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80',
 ARRAY['German','English'], ARRAY['History & Culture','Nature','Coffee'],
 'Munich','Germany', 0),

('00000000-0000-0000-0002-000000000008',
 'Hannah Lee', 'tourist',
 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
 ARRAY['Korean','English'], ARRAY['Sunrise','Photography','Cafes'],
 'Seoul','South Korea', 2),

('00000000-0000-0000-0002-000000000009',
 'Olivia Parker', 'tourist',
 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
 ARRAY['English'], ARRAY['First Trip','Local Food','Beaches'],
 'Chicago','USA', 0),

('00000000-0000-0000-0002-000000000010',
 'Marco Rossi', 'tourist',
 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&q=80',
 ARRAY['Italian','English'], ARRAY['Food','Neighborhoods','Design'],
 'Milan','Italy', 1)

ON CONFLICT (id) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 4. ADVENTURES  (ids: adv_01 … adv_12)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.adventures (id, guide_id, title, description, category, duration_hours,
  price_per_person, max_guests, neighborhood, pickup_area, included, photo_url, rating, review_count, is_active)
VALUES

('00000000-0000-0000-0003-000000000001',
 '00000000-0000-0000-0001-000000000003',
 'Makapuʻu Sunrise with Malasadas After',
 'Start before the crowds and catch sunrise over the east side from one of Oahu''s most beautiful coastal lookouts. Mason keeps the pace easy, helps with photos, and knows the best angles without making it feel like a photoshoot. Afterward, stop for malasadas and coffee before heading back to Waikīkī.',
 'Sunrise Hike', 4.0, 145.00, 3,
 'Hawaiʻi Kai / Makapuʻu', 'Waikīkī hotels',
 ARRAY['Hotel pickup','Photo help','Bottled water','Malasada stop','Flexible return'],
 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80',
 4.95, 64, true),

('00000000-0000-0000-0003-000000000002',
 '00000000-0000-0000-0001-000000000001',
 'Kaimukī Food Crawl Locals Actually Do',
 'Skip the tourist restaurants and spend an afternoon eating through one of Honolulu''s best local food neighborhoods. Kai mixes poke, coffee, plate lunch, bakeries, and whatever is actually good that week. It feels less like a tour and more like tagging along with a friend who knows where to park.',
 'Local Food', 3.5, 118.00, 4,
 'Kaimukī', 'Waikīkī / Ala Moana',
 ARRAY['Pickup','3–4 food stops','Neighborhood walk','Local recommendations'],
 'https://images.unsplash.com/photo-1546833999-b4573f3a9268?w=800&q=80',
 4.98, 107, true),

('00000000-0000-0000-0003-000000000003',
 '00000000-0000-0000-0001-000000000007',
 'North Shore Surf Culture Without the Tour Bus',
 'See the North Shore through someone who knows when to stop, when to keep driving, and when the beach is too crowded to bother. Kaleo shares surf stories, quiet lookouts, shrimp stops, and the rhythm of the coast without turning it into a lecture. The day is flexible depending on waves, traffic, and what you''re curious about.',
 'Surf Culture', 6.0, 215.00, 4,
 'North Shore', 'Waikīkī / Ko Olina optional',
 ARRAY['Pickup','Scenic stops','Beach time','Local lunch stop','Cooler with water'],
 'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=800&q=80',
 4.99, 151, true),

('00000000-0000-0000-0003-000000000004',
 '00000000-0000-0000-0001-000000000002',
 'Windward Oahu at Your Own Pace',
 'A gentle east-side day built for families, first-timers, or anyone who doesn''t want to rush. Leilani keeps the route flexible with lookout stops, short walks, fruit stands, and kid-friendly breaks. It is private, calm, and easy to adjust if someone gets tired.',
 'Family Friendly', 5.0, 165.00, 5,
 'Kāneʻohe / Kailua', 'Waikīkī hotels',
 ARRAY['Pickup','Car seats on request','Water','Snack stop','Flexible itinerary'],
 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
 4.96, 89, true),

('00000000-0000-0000-0003-000000000005',
 '00000000-0000-0000-0001-000000000004',
 'Hidden Beaches and Scenic Pullouts',
 'Noa''s route changes depending on weather, crowds, and surf, which is exactly the point. You''ll visit quieter beach areas, coastal pullouts, and places where you can actually sit and breathe. This is not a checklist tour — it is a slower North Shore day with space to enjoy where you are.',
 'Hidden Spots', 5.5, 190.00, 3,
 'North Shore', 'North Shore / Waikīkī by request',
 ARRAY['Pickup','Beach mat','Cooler with water','Flexible stops','Local lunch recommendation'],
 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
 5.00, 132, true),

('00000000-0000-0000-0003-000000000006',
 '00000000-0000-0000-0001-000000000005',
 'Eat Like You Have Family Here',
 'Malia builds the day around what you actually like to eat, then adds the places she would take visiting cousins. Expect poke, bakeries, plate lunch, Filipino-Hawaii favorites, or garlic shrimp depending on timing. The best part is the conversation between stops.',
 'Local Food', 4.0, 135.00, 4,
 'Honolulu / West Side', 'Waikīkī / Kapolei',
 ARRAY['Pickup','3 food stops','Local ordering help','Printed recommendation list'],
 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
 4.97, 74, true),

('00000000-0000-0000-0003-000000000007',
 '00000000-0000-0000-0001-000000000006',
 'Oahu Photo Day: Lookouts, Beaches, and Coffee',
 'A comfortable private drive for travelers who want beautiful photos without feeling rushed. Ethan combines scenic pullouts, coffee stops, and flexible timing based on light and weather. Good for couples, solo travelers, and anyone who wants memories that feel natural.',
 'Photography', 5.0, 175.00, 3,
 'Honolulu / East Side', 'Waikīkī / Ala Moana',
 ARRAY['Pickup','Photo stop planning','Water','Coffee stop','Phone photo help'],
 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
 4.92, 58, true),

('00000000-0000-0000-0003-000000000008',
 '00000000-0000-0000-0001-000000000008',
 'First Day on Oahu',
 'Perfect for your first full day when you want orientation without committing to a long tour. Sarah helps you understand neighborhoods, beaches, food spots, parking, and what is actually worth booking later. It is part mini-tour, part local survival guide.',
 'Scenic Drive', 3.0, 95.00, 3,
 'Honolulu / Diamond Head / Kaimukī', 'Waikīkī hotels',
 ARRAY['Pickup','Neighborhood orientation','Coffee stop','Personalized recommendations'],
 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=800&q=80',
 4.95, 41, true),

('00000000-0000-0000-0003-000000000009',
 '00000000-0000-0000-0001-000000000009',
 'East Side Ocean Road',
 'Follow the coast east with someone who knows the ocean side of Oahu well. Daniel keeps the day relaxed with cliffs, beach views, short stops, and stories from years working on the water. It is a good fit if you want views, conversation, and no pressure.',
 'Scenic Drive', 4.5, 155.00, 4,
 'Hawaiʻi Kai / Waimānalo', 'Waikīkī / Hawaiʻi Kai',
 ARRAY['Pickup','Scenic stops','Bottled water','Optional short walk','Lunch recommendation'],
 'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?w=800&q=80',
 4.93, 62, true),

('00000000-0000-0000-0003-000000000010',
 '00000000-0000-0000-0001-000000000010',
 'Custom Honolulu Day: Food, History, and Hidden Corners',
 'Jasmine builds a custom day based on your interests, whether that means old Honolulu, local food, neighborhoods, or quiet scenic spots. She is especially good at mixing culture and casual stops so the day never feels like school. Great for travelers who want depth without a rigid itinerary.',
 'History & Culture', 5.0, 160.00, 4,
 'Honolulu', 'Waikīkī / Honolulu',
 ARRAY['Pickup','Custom itinerary','2–3 stops','Food recommendations','Water'],
 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
 4.97, 112, true),

('00000000-0000-0000-0003-000000000011',
 '00000000-0000-0000-0001-000000000002',
 'Easy Kailua Morning with Beach Time',
 'A calm morning on the windward side with beach time, short scenic stops, and an easy pace. Leilani keeps the plan flexible for kids, grandparents, or anyone who wants a beautiful day without overdoing it. The route can include snacks, a lookout, and time to just sit by the water.',
 'Family Friendly', 4.0, 140.00, 5,
 'Kailua', 'Waikīkī hotels',
 ARRAY['Pickup','Beach mat','Water','Kid-friendly pacing','Snack stop'],
 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
 4.96, 48, true),

('00000000-0000-0000-0003-000000000012',
 '00000000-0000-0000-0001-000000000004',
 'North Shore Slow Loop',
 'A full slow loop through the North Shore with fewer crowds and more time outside the car. Noa chooses stops based on conditions that day, not a script. Expect beaches, views, food, and a quieter version of Oahu than most visitors see.',
 'Scenic Drive', 7.0, 245.00, 3,
 'North Shore', 'Waikīkī by request / North Shore',
 ARRAY['Pickup','Cooler with water','Beach mat','Lunch stop','Flexible route'],
 'https://images.unsplash.com/photo-1589308078055-63e0c7d4e95e?w=800&q=80',
 5.00, 96, true)

ON CONFLICT (id) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 5. ADVENTURE LEGS
-- ────────────────────────────────────────────────────────────

INSERT INTO public.adventure_legs (adventure_id, title, description, duration_minutes, order_index, location_name, is_optional)
VALUES

-- ADV 1: Makapu'u Sunrise
('00000000-0000-0000-0003-000000000001','Hotel pickup','Mason meets you in the lobby. Bring a light layer — it''s cooler before sunrise.',15,1,'Your Waikīkī hotel',false),
('00000000-0000-0000-0003-000000000001','Drive to Makapuʻu','Scenic drive along the coast as the sky begins to lighten.',30,2,'H1 east / Kalaniana''ole Hwy',false),
('00000000-0000-0000-0003-000000000001','Sunrise at the lookout','Arrive before first light. Mason helps find the best angles for photos.',45,3,'Makapuʻu Lookout',false),
('00000000-0000-0000-0003-000000000001','Coastal trail walk','Short walk along the bluff with lighthouse views. Optional and easy.',25,4,'Makapuʻu Lighthouse Trail',true),
('00000000-0000-0000-0003-000000000001','Malasada stop','Leonard''s or Agnes — depending on what''s open. Coffee and malasadas.',30,5,'Kaimukī / Honolulu',false),

-- ADV 2: Kaimuki Food Crawl
('00000000-0000-0000-0003-000000000002','Pickup from Waikīkī','Kai comes to you. Usually done within 10 min of the scheduled time.',15,1,'Waikīkī / Ala Moana',false),
('00000000-0000-0000-0003-000000000002','Poke stop','First stop is a proper poke bar. You pick your base and mix-ins, Kai explains the options.',30,2,'Kaimukī poke bar',false),
('00000000-0000-0000-0003-000000000002','Coffee & neighborhood walk','Local café with good espresso. Walk the block and Kai points out spots you''d never notice.',25,3,'Wai''alae Ave',false),
('00000000-0000-0000-0003-000000000002','Bakery stop','Portuguese malasadas or Japanese mochi depending on the day.',20,4,'Kaimukī bakery',false),
('00000000-0000-0000-0003-000000000002','Plate lunch finish','Classic Hawaiian plate lunch to end the afternoon. Two scoops rice, mac salad.',35,5,'Local plate lunch counter',false),

-- ADV 3: North Shore Surf Culture
('00000000-0000-0000-0003-000000000003','Pickup from Waikīkī','Ford Bronco pickup. Board shorts optional — Kaleo will have you sorted.',20,1,'Waikīkī hotels',false),
('00000000-0000-0000-0003-000000000003','H2 north — scenic drive','Kaleo points out landmarks, shares North Shore history, and keeps it casual.',40,2,'H2 North / Kamehameha Hwy',false),
('00000000-0000-0000-0003-000000000003','Haleʻiwa town stop','Walk the town, grab a coffee. Kaleo knows which surf shop is worth visiting.',30,3,'Haleʻiwa Town',false),
('00000000-0000-0000-0003-000000000003','Pipeline & Sunset Beach','Watch waves, hear stories about competitive surf season. Timing depends on conditions.',50,4,'Ehukai / Sunset Beach',false),
('00000000-0000-0000-0003-000000000003','Shrimp truck lunch','Famous Giovanni''s or Romy''s depending on lines. Eaten outside, North Shore style.',40,5,'Kahuku shrimp trucks',false),
('00000000-0000-0000-0003-000000000003','Turtle Beach (optional)','If time allows, Laniakea Beach for turtle sightings.',20,6,'Laniakea Beach',true),

-- ADV 4: Windward Oahu
('00000000-0000-0000-0003-000000000004','Hotel pickup','Leilani''s white Pilot. Car seats available — let her know in advance.',15,1,'Waikīkī hotels',false),
('00000000-0000-0000-0003-000000000004','Nuʻuanu Pali Lookout','Dramatic views over the windward coast. Easy walk, kids love it.',30,2,'Nuʻuanu Pali Lookout',false),
('00000000-0000-0000-0003-000000000004','Fruit stand stop','Local roadside fruit stand on the windward side. Fresh coconut and seasonal fruit.',20,3,'Windward side fruit stand',false),
('00000000-0000-0000-0003-000000000004','Kailua town','Stroll through Kailua''s boutiques, get shave ice, or just sit outside.',35,4,'Kailua Town',false),
('00000000-0000-0000-0003-000000000004','Kailua Beach','End the day at one of Oahu''s best beaches. Calm water, white sand, plenty of space.',45,5,'Kailua Beach Park',false),

-- ADV 5: Hidden Beaches
('00000000-0000-0000-0003-000000000005','Pickup — conditions check','Noa reads the morning surf report and picks the route accordingly.',15,1,'North Shore / Waikīkī',false),
('00000000-0000-0000-0003-000000000005','First quiet beach stop','A less-trafficked beach access Noa has been using for years.',60,2,'North Shore beach access',false),
('00000000-0000-0000-0003-000000000005','Coastal bluff pullout','Cliffside ocean views. No crowds, no signs pointing to it.',25,3,'North Shore bluffs',false),
('00000000-0000-0000-0003-000000000005','Second hidden beach','Second stop depends on conditions. Usually quieter than the first.',60,4,'North Shore secret beach',false),
('00000000-0000-0000-0003-000000000005','Local lunch','Noa''s go-to lunch recommendation nearby. Nothing fancy.',35,5,'North Shore local spot',false),

-- ADV 6: Eat Like Family
('00000000-0000-0000-0003-000000000006','Pickup','Malia will already be talking when she pulls up.',15,1,'Waikīkī / Kapolei',false),
('00000000-0000-0000-0003-000000000006','Poke bar — Malia''s choice','She orders first and explains the combinations while you pick yours.',30,2,'Honolulu poke bar',false),
('00000000-0000-0000-0003-000000000006','Malasada or bakery stop','Portuguese or Filipino baked goods depending on where''s freshest that day.',25,3,'West Honolulu bakery',false),
('00000000-0000-0000-0003-000000000006','Plate lunch','Full Hawaiian-style plate lunch. Malia explains what''s on the menu.',40,4,'Local plate lunch',false),
('00000000-0000-0000-0003-000000000006','Garlic shrimp (optional)','West side shrimp trucks if there''s time and appetite left.',35,5,'West Oahu shrimp trucks',true),

-- ADV 7: Oahu Photo Day
('00000000-0000-0000-0003-000000000007','Pickup from Waikīkī','Ethan''s Tesla — spotless. He''ll check the day''s light conditions beforehand.',15,1,'Waikīkī / Ala Moana',false),
('00000000-0000-0000-0003-000000000007','Diamond Head viewpoint','Classic Honolulu backdrop without the hike crowds. Ethan knows the angles.',35,2,'Diamond Head area',false),
('00000000-0000-0000-0003-000000000007','Coffee stop','Good espresso and a chance to plan the next few stops based on light.',25,3,'Honolulu coffee shop',false),
('00000000-0000-0000-0003-000000000007','Scenic coastal pullout','East-side coastal road with water views and natural light.',40,4,'East Oahu coast',false),
('00000000-0000-0000-0003-000000000007','Beach stop — golden hour (optional)','If timing aligns with late afternoon, a beach stop with great light.',45,5,'East side beach',true),

-- ADV 8: First Day on Oahu
('00000000-0000-0000-0003-000000000008','Hotel pickup — orientation chat','Sarah starts the day explaining the island''s layout so everything makes sense.',15,1,'Waikīkī hotel',false),
('00000000-0000-0000-0003-000000000008','Kapiolani Park & Diamond Head','Overview of the south-east end. Walk or just drive through.',30,2,'Kapiolani Park',false),
('00000000-0000-0000-0003-000000000008','Kaimukī neighborhood drive','Sarah points out the coffee shops, restaurants, and blocks worth returning to.',25,3,'Kaimukī',false),
('00000000-0000-0000-0003-000000000008','Coffee stop & local tip session','Best conversation of the morning. Sarah gives honest advice on what to skip.',30,4,'Kaimukī coffee shop',false),

-- ADV 9: East Side Ocean Road
('00000000-0000-0000-0003-000000000009','Pickup from Waikīkī / Hawaiʻi Kai','Daniel''s dark blue Passport. Quiet, punctual.',15,1,'Waikīkī / Hawaiʻi Kai',false),
('00000000-0000-0000-0003-000000000009','Hawaiʻi Kai Marina viewpoint','First ocean stop with calm water and marina views.',20,2,'Hawaiʻi Kai Marina',false),
('00000000-0000-0000-0003-000000000009','Hanauma Bay overlook','Views from above without the crowds in the water. Daniel shares the geology.',25,3,'Hanauma Bay Lookout',false),
('00000000-0000-0000-0003-000000000009','Makapuʻu cliffs & blowhole','Sea cliffs and blowhole views. Short walk on flat ground.',35,4,'Makapuʻu / Blowhole',false),
('00000000-0000-0000-0003-000000000009','Waimānalo beach stop','One of Oahu''s longest and least crowded beaches. Time to sit and breathe.',45,5,'Waimānalo Beach',false),

-- ADV 10: Custom Honolulu Day
('00000000-0000-0000-0003-000000000010','Pre-tour interest chat','Jasmine asks what you''re curious about before deciding the route.',15,1,'Waikīkī hotel pickup',false),
('00000000-0000-0000-0003-000000000010','Historic Honolulu','Chinatown, old downtown, Iolani Palace area — context and stories.',45,2,'Downtown Honolulu',false),
('00000000-0000-0000-0003-000000000010','Local lunch stop','Restaurant chosen based on your interests that morning.',40,3,'Honolulu neighborhood',false),
('00000000-0000-0000-0003-000000000010','Hidden neighborhood','A residential block or quiet street Jasmine returns to regularly.',30,4,'Mōʻiliʻili / Kaimukī',false),
('00000000-0000-0000-0003-000000000010','Scenic viewpoint close','End somewhere with a view. Punchbowl, Tantalus, or Liliha depending on timing.',30,5,'Honolulu viewpoint',false),

-- ADV 11: Easy Kailua Morning
('00000000-0000-0000-0003-000000000011','Hotel pickup','Leilani''s Pilot. Easy morning energy, kid-friendly pace.',15,1,'Waikīkī hotels',false),
('00000000-0000-0000-0003-000000000011','Pali Lookout (optional)','If kids are up for it — short walk with big views. Otherwise skip.',25,2,'Nuʻuanu Pali',true),
('00000000-0000-0000-0003-000000000011','Kailua town & snack stop','Walk the boutiques, grab shave ice or açaí.',30,3,'Kailua Town',false),
('00000000-0000-0000-0003-000000000011','Kailua Beach','Main event. Beach mat out, water in the cooler, no rush.',60,4,'Kailua Beach Park',false),

-- ADV 12: North Shore Slow Loop
('00000000-0000-0000-0003-000000000012','Pickup — early start','Noa prefers leaving by 7am to beat traffic over the mountains.',15,1,'Waikīkī / North Shore',false),
('00000000-0000-0000-0003-000000000012','Haleʻiwa town','Coffee and a slow walk through town. No rush.',35,2,'Haleʻiwa',false),
('00000000-0000-0000-0003-000000000012','Sunset Beach & surroundings','Noa picks the specific beach access based on conditions.',60,3,'Sunset Beach / Ehukai',false),
('00000000-0000-0000-0003-000000000012','Waimea Bay stop','Depending on season — cliff jumping or just sitting by the water.',40,4,'Waimea Bay',false),
('00000000-0000-0000-0003-000000000012','Lunch stop','Shrimp truck or sit-down depending on preference.',45,5,'Kahuku / North Shore',false),
('00000000-0000-0000-0003-000000000012','Turtle Beach return','Laniakea on the way back south. Turtles almost always present.',25,6,'Laniakea Beach',false);


-- ────────────────────────────────────────────────────────────
-- 6. REVIEWS (25 total)
-- ────────────────────────────────────────────────────────────

INSERT INTO public.reviews (adventure_id, tourist_id, guide_id, rating, body, created_at)
VALUES

('00000000-0000-0000-0003-000000000002','00000000-0000-0000-0002-000000000001','00000000-0000-0000-0001-000000000001',5,
 'Kai made the afternoon feel like hanging out with a friend who knows every good place to eat. We had poke, coffee, and a bakery stop I never would have found from Google. It was exactly what I wanted after two days in Waikīkī.',
 '2026-06-19'),

('00000000-0000-0000-0003-000000000002','00000000-0000-0000-0002-000000000010','00000000-0000-0000-0001-000000000001',5,
 'This was my favorite food experience in Honolulu. Kai explained the neighborhood without making it feel like a lecture, and every stop felt chosen instead of copied from a blog.',
 '2026-05-28'),

('00000000-0000-0000-0003-000000000002','00000000-0000-0000-0002-000000000009','00000000-0000-0000-0001-000000000001',5,
 'I was nervous booking something private, but Kai was professional, kind, and easy to talk to. The food was great, but the best part was getting honest advice about what else to do during my trip.',
 '2026-04-17'),

('00000000-0000-0000-0003-000000000001','00000000-0000-0000-0002-000000000002','00000000-0000-0000-0001-000000000003',5,
 'Mason nailed the timing. We got there before it felt crowded, he helped us find great photo angles, and the malasadas after sunrise were such a good call.',
 '2026-06-08'),

('00000000-0000-0000-0003-000000000001','00000000-0000-0000-0002-000000000008','00000000-0000-0000-0001-000000000003',5,
 'I booked this mostly for photos and it was even better than expected. Mason knew exactly where the light would hit and made the whole morning feel calm instead of staged.',
 '2026-05-21'),

('00000000-0000-0000-0003-000000000001','00000000-0000-0000-0002-000000000006','00000000-0000-0000-0001-000000000003',4,
 'Beautiful morning and Mason was lovely. The only downside was waking up so early, which is obviously the point of sunrise, but travelers should know it is a real early start.',
 '2026-03-30'),

('00000000-0000-0000-0003-000000000004','00000000-0000-0000-0002-000000000004','00000000-0000-0000-0001-000000000002',5,
 'Leilani was amazing with our kids. She adjusted the day when they got tired, found easy snack stops, and made us feel completely comfortable the whole time.',
 '2026-06-02'),

('00000000-0000-0000-0003-000000000004','00000000-0000-0000-0002-000000000007','00000000-0000-0000-0001-000000000002',5,
 'I appreciated how much context Leilani gave without overwhelming us. The day was peaceful, beautiful, and very different from a standard bus tour.',
 '2026-04-24'),

('00000000-0000-0000-0003-000000000008','00000000-0000-0000-0002-000000000009','00000000-0000-0000-0001-000000000008',5,
 'This was the perfect first-day tour. Sarah helped me understand the island, gave realistic food and beach recommendations, and saved me from wasting money on things I almost booked.',
 '2026-06-25'),

('00000000-0000-0000-0003-000000000008','00000000-0000-0000-0002-000000000003','00000000-0000-0000-0001-000000000008',5,
 'Sarah has such a calm energy. We did coffee, a few scenic stops, and she helped us figure out what neighborhoods we wanted to come back to.',
 '2026-05-11'),

('00000000-0000-0000-0003-000000000003','00000000-0000-0000-0002-000000000005','00000000-0000-0000-0001-000000000007',5,
 'Kaleo was exactly what I hoped for. No fake performance, no rushing, just real North Shore stories, surf spots, and a lunch stop that felt local.',
 '2026-06-14'),

('00000000-0000-0000-0003-000000000003','00000000-0000-0000-0002-000000000002','00000000-0000-0000-0001-000000000007',5,
 'We changed plans halfway through because Kaleo said another beach would be better that day. He was right. That flexibility made the tour feel totally different from anything packaged.',
 '2026-04-05'),

('00000000-0000-0000-0003-000000000007','00000000-0000-0000-0002-000000000006','00000000-0000-0000-0001-000000000006',5,
 'Ethan''s car was spotless, he was on time, and the route was beautiful. He helped us get photos without turning the day into an awkward photoshoot.',
 '2026-06-01'),

('00000000-0000-0000-0003-000000000007','00000000-0000-0000-0002-000000000008','00000000-0000-0000-0001-000000000006',4,
 'Very comfortable and well planned. I wish we had a little more time at one beach stop, but Ethan was clear about timing and traffic, which I appreciated.',
 '2026-04-19'),

('00000000-0000-0000-0003-000000000010','00000000-0000-0000-0002-000000000010','00000000-0000-0000-0001-000000000010',5,
 'Jasmine understood exactly what I meant by wanting to see Honolulu beyond hotels. We mixed food, history, and small streets I would never have noticed alone.',
 '2026-06-07'),

('00000000-0000-0000-0003-000000000010','00000000-0000-0000-0002-000000000007','00000000-0000-0000-0001-000000000010',5,
 'This felt thoughtful from start to finish. Jasmine asked good questions before the tour and built a day that matched my interests instead of forcing a fixed plan.',
 '2026-05-03'),

('00000000-0000-0000-0003-000000000006','00000000-0000-0000-0002-000000000001','00000000-0000-0000-0001-000000000005',5,
 'Malia''s food tour was warm, funny, and delicious. She ordered things we would have been too shy to try and explained everything in a way that made the day feel personal.',
 '2026-06-11'),

('00000000-0000-0000-0003-000000000006','00000000-0000-0000-0002-000000000003','00000000-0000-0000-0001-000000000005',5,
 'We ate so much and laughed the whole time. Malia felt like the auntie friend everyone wishes they had when visiting a new place.',
 '2026-04-29'),

('00000000-0000-0000-0003-000000000005','00000000-0000-0000-0002-000000000005','00000000-0000-0000-0001-000000000004',5,
 'Noa does not overtalk, which I liked. He knew when to explain something and when to just let us sit by the water. One of the best days of the trip.',
 '2026-05-19'),

('00000000-0000-0000-0003-000000000012','00000000-0000-0000-0002-000000000006','00000000-0000-0000-0001-000000000004',5,
 'This was expensive compared with other options, but it felt worth it. Noa adjusted the route around crowds and gave us a North Shore day that felt peaceful instead of chaotic.',
 '2026-03-16'),

('00000000-0000-0000-0003-000000000011','00000000-0000-0000-0002-000000000004','00000000-0000-0000-0001-000000000002',5,
 'Leilani made everything easy with our family. The beach time was relaxed, the kids were happy, and nobody felt rushed.',
 '2026-05-30'),

('00000000-0000-0000-0003-000000000009','00000000-0000-0000-0002-000000000009','00000000-0000-0000-0001-000000000009',5,
 'Daniel was quiet at first but incredibly kind and knowledgeable. The coastal drive was beautiful, and I liked that the tour never felt performative.',
 '2026-05-09'),

('00000000-0000-0000-0003-000000000009','00000000-0000-0000-0002-000000000007','00000000-0000-0000-0001-000000000009',4,
 'Great views and a calm guide. I would have liked a little more history, but as a scenic drive it was excellent.',
 '2026-02-22'),

('00000000-0000-0000-0003-000000000010','00000000-0000-0000-0002-000000000001','00000000-0000-0000-0001-000000000010',5,
 'Jasmine gave us the custom day we hoped for. We saw neighborhoods, ate well, and had conversations that made Honolulu feel much more real.',
 '2026-03-12'),

('00000000-0000-0000-0003-000000000006','00000000-0000-0000-0002-000000000010','00000000-0000-0000-0001-000000000005',4,
 'The food was excellent and Malia was very generous with local recommendations. I would have preferred one more sit-down stop, but overall it was a memorable afternoon.',
 '2026-02-09');
