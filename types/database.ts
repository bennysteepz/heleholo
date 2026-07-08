export type UserRole = 'tourist' | 'guide' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  bio?: string;
  avatar_url?: string;
  languages: string[];
  rating?: number;
  review_count: number;
  response_time?: string;
  years_on_oahu?: number;
  verified: boolean;
  driver_verified: boolean;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  vehicle_year?: number;
  neighborhoods: string[];
  categories: string[];
  home_city?: string;
  home_country?: string;
  interests: string[];
  created_at: string;
}

/** A bookable experience — consists of one or more ordered legs. */
export interface Adventure {
  id: string;
  guide_id: string;
  title: string;
  description?: string;
  category: string;
  duration_hours: number;
  price_per_person: number;
  max_guests: number;
  neighborhood?: string;
  pickup_area?: string;
  included: string[];
  photo_url?: string;
  rating?: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
  // joined fields (optional)
  guide?: Profile;
  legs?: AdventureLeg[];
}

/**
 * A single stop or phase within an adventure.
 * Checked off by the guide as the day progresses.
 */
export interface AdventureLeg {
  id: string;
  adventure_id: string;
  title: string;
  description?: string;
  duration_minutes?: number;
  order_index: number;
  location_name?: string;
  is_optional: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  adventure_id: string;
  tourist_id: string;
  guide_id: string;
  rating: number;
  body?: string;
  created_at: string;
  // joined
  tourist?: Profile;
}

export interface Booking {
  id: string;
  adventure_id: string;
  tourist_id: string;
  guide_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  booked_date: string;
  guests: number;
  total_price: number;
  pickup_location?: string;
  notes?: string;
  created_at: string;
  // joined
  adventure?: Adventure;
  tourist?: Profile;
}

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles:       { Row: Profile };
      adventures:     { Row: Adventure };
      adventure_legs: { Row: AdventureLeg };
      reviews:        { Row: Review };
      bookings:       { Row: Booking };
      messages:       { Row: Message };
    };
  };
};
