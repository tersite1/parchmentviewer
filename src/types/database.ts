export type PlaceCategory = 'cafe' | 'restaurant' | 'culture' | 'bar' | 'stay';

export interface MenuItem {
  name: string;
  price: string;
}

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  category: PlaceCategory;
  vibe: string | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  address: string | null;
  region_id: string | null;
  source_post_url: string | null;
  status: 'pending' | 'published' | 'rejected';
  curator_notes: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Curator info
  curated_by: string | null;
  curator_id: string | null;
  // Menu items for cafe/restaurant
  menu_items: MenuItem[] | null;
}

export interface SourceAccount {
  id: string;
  platform: string;
  username: string;
  is_active: boolean;
  last_scraped_at: string | null;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  place_id: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      places: {
        Row: Place;
        Insert: Omit<Place, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Place, 'id' | 'created_at' | 'updated_at'>>;
      };
      source_accounts: {
        Row: SourceAccount;
        Insert: Omit<SourceAccount, 'id' | 'created_at'>;
        Update: Partial<Omit<SourceAccount, 'id' | 'created_at'>>;
      };
    };
  };
}
