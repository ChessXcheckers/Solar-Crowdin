export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string
          account_type: Database["public"]["Enums"]["account_type_enum"] | null
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          name: string
          sort_code: string
          status: Database["public"]["Enums"]["account_status_enum"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_number: string
          account_type?: Database["public"]["Enums"]["account_type_enum"] | null
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          name: string
          sort_code?: string
          status?: Database["public"]["Enums"]["account_status_enum"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_number?: string
          account_type?: Database["public"]["Enums"]["account_type_enum"] | null
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          name?: string
          sort_code?: string
          status?: Database["public"]["Enums"]["account_status_enum"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          created_at: string
          decimals: number
          id: string
          is_active: boolean
          name: string
          symbol: string
          type: Database["public"]["Enums"]["currency_type_enum"]
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          decimals: number
          id?: string
          is_active?: boolean
          name: string
          symbol: string
          type: Database["public"]["Enums"]["currency_type_enum"]
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          decimals?: number
          id?: string
          is_active?: boolean
          name?: string
          symbol?: string
          type?: Database["public"]["Enums"]["currency_type_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          from_currency: string
          id: string
          last_updated: string
          rate: number
          source: string | null
          to_currency: string
        }
        Insert: {
          from_currency: string
          id?: string
          last_updated?: string
          rate: number
          source?: string | null
          to_currency: string
        }
        Update: {
          from_currency?: string
          id?: string
          last_updated?: string
          rate?: number
          source?: string | null
          to_currency?: string
        }
        Relationships: [
          {
            foreignKeyName: "exchange_rates_from_currency_fkey"
            columns: ["from_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "exchange_rates_to_currency_fkey"
            columns: ["to_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
        ]
      }
      impact_projects: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          funding_current: number | null
          funding_target: number | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          start_date: string | null
          status: Database["public"]["Enums"]["project_status_enum"] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          funding_current?: number | null
          funding_target?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status_enum"] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          funding_current?: number | null
          funding_target?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status_enum"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string | null
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          kyc_completed_at: string | null
          kyc_status: string | null
          last_name: string | null
          phone_number: string | null
          postal_code: string | null
          profile_completed: boolean | null
          updated_at: string | null
        }
        Insert: {
          account_type?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id: string
          kyc_completed_at?: string | null
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          postal_code?: string | null
          profile_completed?: boolean | null
          updated_at?: string | null
        }
        Update: {
          account_type?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          kyc_completed_at?: string | null
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          postal_code?: string | null
          profile_completed?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_contributions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          project_id: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          project_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          project_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_contributions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "impact_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contributions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string | null
          amount: number
          category: string | null
          created_at: string | null
          description: string
          id: string
          impact_score: number | null
          recipient: string | null
          status: Database["public"]["Enums"]["transaction_status_enum"] | null
          transaction_type: Database["public"]["Enums"]["transaction_type_enum"]
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          impact_score?: number | null
          recipient?: string | null
          status?: Database["public"]["Enums"]["transaction_status_enum"] | null
          transaction_type: Database["public"]["Enums"]["transaction_type_enum"]
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          impact_score?: number | null
          recipient?: string | null
          status?: Database["public"]["Enums"]["transaction_status_enum"] | null
          transaction_type?: Database["public"]["Enums"]["transaction_type_enum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_impact: {
        Row: {
          co2_offset_kg: number | null
          created_at: string | null
          id: string
          last_calculated_at: string | null
          plastic_prevented_kg: number | null
          projects_supported: number | null
          total_impact_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          co2_offset_kg?: number | null
          created_at?: string | null
          id?: string
          last_calculated_at?: string | null
          plastic_prevented_kg?: number | null
          projects_supported?: number | null
          total_impact_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          co2_offset_kg?: number | null
          created_at?: string | null
          id?: string
          last_calculated_at?: string | null
          plastic_prevented_kg?: number | null
          projects_supported?: number | null
          total_impact_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_impact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_account_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      account_status_enum: "pending" | "active" | "suspended" | "closed"
      account_type_enum: "current" | "savings" | "investment"
      currency_type_enum: "fiat" | "crypto" | "cbdc"
      project_status_enum: "active" | "completed" | "upcoming"
      transaction_status_enum: "pending" | "completed" | "failed"
      transaction_type_enum: "credit" | "debit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status_enum: ["pending", "active", "suspended", "closed"],
      account_type_enum: ["current", "savings", "investment"],
      currency_type_enum: ["fiat", "crypto", "cbdc"],
      project_status_enum: ["active", "completed", "upcoming"],
      transaction_status_enum: ["pending", "completed", "failed"],
      transaction_type_enum: ["credit", "debit"],
    },
  },
} as const
