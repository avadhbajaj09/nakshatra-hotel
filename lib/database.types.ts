export type Database = {
  public: {
    Tables: {
      room_categories: {
        Row: { id: number; slug: string; name: string; description: string; base_price: number; total_rooms: number; max_guests: number; active: boolean; sort_order: number; featured_image_url: string; gallery_image_urls: string[]; updated_at: string };
        Insert: { id?: number; slug: string; name: string; description?: string; base_price: number; total_rooms?: number; max_guests?: number; active?: boolean; sort_order?: number; featured_image_url?: string; gallery_image_urls?: string[]; updated_at?: string };
        Update: { name?: string; description?: string; base_price?: number; total_rooms?: number; max_guests?: number; active?: boolean; sort_order?: number; featured_image_url?: string; gallery_image_urls?: string[]; updated_at?: string };
        Relationships: [];
      };
      meal_options: {
        Row: { id: number; slug: string; name: string; price_per_guest: number; description: string; active: boolean; updated_at: string };
        Insert: { id?: number; slug: string; name: string; price_per_guest?: number; description?: string; active?: boolean; updated_at?: string };
        Update: { name?: string; price_per_guest?: number; description?: string; active?: boolean; updated_at?: string };
        Relationships: [];
      };
      availability: {
        Row: { id: number; room_slug: string; date: string; available_rooms: number; price_override: number | null; note: string; updated_at: string };
        Insert: { id?: number; room_slug: string; date: string; available_rooms: number; price_override?: number | null; note?: string; updated_at?: string };
        Update: { available_rooms?: number; price_override?: number | null; note?: string; updated_at?: string };
        Relationships: [];
      };
      bookings: {
        Row: { id: number; reference: string; status: string; source: string; room_slug: string; room_name: string; guest_name: string; phone: string; email: string; check_in: string; check_out: string; guests: number; meal_plan: string; total: number; arrival: string; requests: string; payment_method: string; created_at: string; updated_at: string };
        Insert: { id?: number; reference: string; status?: string; source?: string; room_slug: string; room_name: string; guest_name: string; phone: string; email?: string; check_in: string; check_out: string; guests: number; meal_plan?: string; total?: number; arrival?: string; requests?: string; payment_method?: string; created_at?: string; updated_at?: string };
        Update: { status?: string; updated_at?: string };
        Relationships: [];
      };
      enquiries: {
        Row: { id: number; type: string; name: string; phone: string; email: string; preferred_date: string | null; message: string; status: string; source: string; created_at: string };
        Insert: { id?: number; type?: string; name: string; phone: string; email?: string; preferred_date?: string | null; message?: string; status?: string; source?: string; created_at?: string };
        Update: { status?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
