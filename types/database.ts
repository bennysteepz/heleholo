export type UserRole = 'tourist' | 'guide' | 'admin';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'cancelled';

export type TourCategory =
  | 'scenic'
  | 'food'
  | 'surf'
  | 'history'
  | 'adventure'
  | 'hidden_gems';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  age_range: string | null;
  interests: string[] | null;
  languages: string[] | null;
  bio: string | null;
  origin_story: string | null;
  intro_video_url: string | null;
  stripe_account_id: string | null;
  is_approved: boolean | null;
  created_at: string;
}

export interface Vehicle {
  id: string;
  guide_id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  photo_url: string | null;
}

export interface Tour {
  id: string;
  guide_id: string;
  title: string;
  description: string;
  category: TourCategory;
  duration_hours: number;
  price_per_hour: number;
  max_guests: number;
  photos: string[];
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  tour_id: string;
  tourist_id: string;
  guide_id: string;
  status: BookingStatus;
  start_datetime: string;
  duration_hours: number;
  guest_count: number;
  total_price: number;
  platform_fee: number;
  guide_payout: number;
  pickup_location: string;
  stripe_payment_intent_id: string | null;
  cancelled_by: 'tourist' | 'guide' | null;
  cancelled_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  tourist_id: string;
  guide_id: string;
  rating: number;
  body: string;
  tip_amount: number;
  created_at: string;
}

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

// Placeholder — replace with generated types from `supabase gen types`
export type Database = any;
