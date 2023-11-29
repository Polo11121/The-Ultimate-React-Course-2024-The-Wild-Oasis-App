/* eslint-disable no-unused-vars */
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabinId: number;
          cabinPrice: number;
          createdAt: string;
          endDate: string;
          extrasPrice: number;
          guestId: number;
          hasBreakfast: boolean;
          id: number;
          isPaid: boolean;
          numGuests: number;
          numNights: number;
          observations: string;
          startDate: string;
          status: string;
          totalPrice: number;
        };
        Insert: {
          cabinId?: number;
          cabinPrice?: number;
          createdAt?: string;
          endDate?: string;
          extrasPrice?: number;
          guestId?: number;
          hasBreakfast?: boolean;
          id?: number;
          isPaid?: boolean;
          numGuests?: number;
          numNights?: number;
          observations?: string;
          startDate?: string;
          status?: string;
          totalPrice?: number;
        };
        Update: {
          cabinId?: number;
          cabinPrice?: number;
          createdAt?: string;
          endDate?: string;
          extrasPrice?: number;
          guestId?: number;
          hasBreakfast?: boolean;
          id?: number;
          isPaid?: boolean;
          numGuests?: number;
          numNights?: number;
          observations?: string;
          startDate?: string;
          status?: string;
          totalPrice?: number;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_cabinId_fkey";
            columns: ["cabinId"];
            isOneToOne: false;
            referencedRelation: "cabins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_guestId_fkey";
            columns: ["guestId"];
            isOneToOne: false;
            referencedRelation: "guests";
            referencedColumns: ["id"];
          }
        ];
      };
      cabins: {
        Row: {
          createdAt: string;
          description: string;
          discount: number;
          id: number;
          image: string;
          maxCapacity: number;
          name: string;
          regularPrice: number;
        };
        Insert: {
          createdAt?: string;
          description?: string;
          discount?: number;
          id?: number;
          image?: string;
          maxCapacity?: number;
          name?: string;
          regularPrice?: number;
        };
        Update: {
          createdAt?: string;
          description?: string;
          discount?: number;
          id?: number;
          image?: string;
          maxCapacity?: number;
          name?: string;
          regularPrice?: number;
        };
        Relationships: [];
      };
      guests: {
        Row: {
          countryFlag: string;
          createdAt: string;
          email: string;
          fullName: string;
          id: number;
          nationalId: string;
          nationality: string;
        };
        Insert: {
          countryFlag?: string;
          createdAt?: string;
          email?: string;
          fullName?: string;
          id?: number;
          nationalId?: string;
          nationality?: string;
        };
        Update: {
          countryFlag?: string;
          createdAt?: string;
          email?: string;
          fullName?: string;
          id?: number;
          nationalId?: string;
          nationality?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfastPrice: number;
          createdAt: string;
          id: number;
          maxBookingLength: number;
          maxGuestsPerBooking: number;
          minBookingLength: number;
        };
        Insert: {
          breakfastPrice?: number;
          createdAt?: string;
          id?: number;
          maxBookingLength?: number;
          maxGuestsPerBooking?: number;
          minBookingLength?: number;
        };
        Update: {
          breakfastPrice?: number;
          createdAt?: string;
          id?: number;
          maxBookingLength?: number;
          maxGuestsPerBooking?: number;
          minBookingLength?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ChannelType: "TEXT" | "AUDIO" | "VIDEO";
      MemberRole: "ADMIN" | "MODERATOR" | "GUEST";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type Product = {
  productName: string;
  price: string;
  description: string;
};

export type Company = {
  companyName: string;
  phrase: string;
};

export type StatusTagName = "unconfirmed" | "checked-in" | "checked-out";

export type statusTagType = "blue" | "green" | "silver";
