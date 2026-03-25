export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage_log: {
        Row: {
          created_at: string
          id: string
          usage_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          usage_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          usage_type?: string
          user_id?: string
        }
        Relationships: []
      }
      client_reviews: {
        Row: {
          client_name: string
          created_at: string
          id: string
          last_viewed_at: string | null
          password: string
          review_url: string
        }
        Insert: {
          client_name: string
          created_at?: string
          id: string
          last_viewed_at?: string | null
          password: string
          review_url: string
        }
        Update: {
          client_name?: string
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          password?: string
          review_url?: string
        }
        Relationships: []
      }
      email_gate_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          context: string | null
          created_at: string
          id: string
          locale: string | null
          message: string
          page: string | null
          rating: number | null
          type: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          locale?: string | null
          message: string
          page?: string | null
          rating?: number | null
          type?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          locale?: string | null
          message?: string
          page?: string | null
          rating?: number | null
          type?: string | null
        }
        Relationships: []
      }
      guide_progress: {
        Row: {
          data: Json
          guide_key: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          data?: Json
          guide_key: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          data?: Json
          guide_key?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interview_questions: {
        Row: {
          answer_en: string | null
          answer_zh: string | null
          audience: string[] | null
          category: string
          difficulty: number
          id: number
          question_en: string
          question_zh: string
          source: string | null
          tags: string[] | null
        }
        Insert: {
          answer_en?: string | null
          answer_zh?: string | null
          audience?: string[] | null
          category: string
          difficulty?: number
          id: number
          question_en: string
          question_zh: string
          source?: string | null
          tags?: string[] | null
        }
        Update: {
          answer_en?: string | null
          answer_zh?: string | null
          audience?: string[] | null
          category?: string
          difficulty?: number
          id?: number
          question_en?: string
          question_zh?: string
          source?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
      resume_analyses: {
        Row: {
          analysis_result: Json | null
          created_at: string
          id: string
          language: string | null
          overall_score: number | null
          resume_text: string | null
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          id?: string
          language?: string | null
          overall_score?: number | null
          resume_text?: string | null
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          id?: string
          language?: string | null
          overall_score?: number | null
          resume_text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      resume_leads: {
        Row: {
          analysis_result: Json | null
          created_at: string
          current_company_type: string | null
          email: string
          id: string
          industry: string | null
          input_method: string | null
          job_title: string | null
          language: string | null
          name: string | null
          overall_score: number | null
          resume_file_url: string | null
          resume_text: string | null
          seniority_level: string | null
          target_readiness: string | null
          user_agent: string | null
          years_experience: string | null
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          current_company_type?: string | null
          email: string
          id?: string
          industry?: string | null
          input_method?: string | null
          job_title?: string | null
          language?: string | null
          name?: string | null
          overall_score?: number | null
          resume_file_url?: string | null
          resume_text?: string | null
          seniority_level?: string | null
          target_readiness?: string | null
          user_agent?: string | null
          years_experience?: string | null
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          current_company_type?: string | null
          email?: string
          id?: string
          industry?: string | null
          input_method?: string | null
          job_title?: string | null
          language?: string | null
          name?: string | null
          overall_score?: number | null
          resume_file_url?: string | null
          resume_text?: string | null
          seniority_level?: string | null
          target_readiness?: string | null
          user_agent?: string | null
          years_experience?: string | null
        }
        Relationships: []
      }
      salary_checks: {
        Row: {
          created_at: string
          experience: string | null
          id: string
          job_title: string
          lang: string | null
          median: number | null
          role: string
          salary: number
          sector: string | null
          verdict: string | null
        }
        Insert: {
          created_at?: string
          experience?: string | null
          id?: string
          job_title: string
          lang?: string | null
          median?: number | null
          role: string
          salary: number
          sector?: string | null
          verdict?: string | null
        }
        Update: {
          created_at?: string
          experience?: string | null
          id?: string
          job_title?: string
          lang?: string | null
          median?: number | null
          role?: string
          salary?: number
          sector?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_email_gate: { Args: { p_email: string }; Returns: boolean }
      count_ai_usage_this_month: {
        Args: { p_usage_type: string; p_user_id: string }
        Returns: number
      }
      count_resume_analyses_this_month: {
        Args: { p_email: string }
        Returns: number
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      mark_review_viewed: { Args: { review_id: string }; Returns: undefined }
      verify_client_password: {
        Args: { input_password: string }
        Returns: {
          review_id: string
          review_url: string
        }[]
      }
      verify_review_password: {
        Args: { input_password: string; review_id: string }
        Returns: {
          client_name: string
          is_valid: boolean
          review_url: string
        }[]
      }
      verify_review_password_secure: {
        Args: { p_input_password: string; p_review_id: string }
        Returns: {
          client_name: string
          review_url: string
          success: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
