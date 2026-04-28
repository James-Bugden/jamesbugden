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
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      error_log: {
        Row: {
          anon_id: string | null
          created_at: string
          id: string
          message: string
          metadata: Json
          page: string | null
          session_id: string | null
          source: string
          stack: string | null
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json
          page?: string | null
          session_id?: string | null
          source: string
          stack?: string | null
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json
          page?: string | null
          session_id?: string | null
          source?: string
          stack?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tracks: {
        Row: {
          created_at: string
          event_name: string
          event_type: string
          id: string
          metadata: Json | null
          page: string
        }
        Insert: {
          created_at?: string
          event_name: string
          event_type: string
          id?: string
          metadata?: Json | null
          page: string
        }
        Update: {
          created_at?: string
          event_name?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page?: string
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
          metadata: Json | null
          page: string | null
          rating: number | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          locale?: string | null
          message: string
          metadata?: Json | null
          page?: string | null
          rating?: number | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          locale?: string | null
          message?: string
          metadata?: Json | null
          page?: string | null
          rating?: number | null
          type?: string | null
          user_id?: string | null
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
      guide_reads: {
        Row: {
          anon_id: string | null
          copy_actions: number
          cta_clicks: number
          ended_at: string | null
          guide_lang: string
          guide_slug: string
          id: string
          marked_complete: boolean
          metadata: Json
          reached_bottom: boolean
          scroll_depth_pct: number | null
          session_id: string | null
          started_at: string
          time_on_page_sec: number | null
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          copy_actions?: number
          cta_clicks?: number
          ended_at?: string | null
          guide_lang?: string
          guide_slug: string
          id?: string
          marked_complete?: boolean
          metadata?: Json
          reached_bottom?: boolean
          scroll_depth_pct?: number | null
          session_id?: string | null
          started_at?: string
          time_on_page_sec?: number | null
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          copy_actions?: number
          cta_clicks?: number
          ended_at?: string | null
          guide_lang?: string
          guide_slug?: string
          id?: string
          marked_complete?: boolean
          metadata?: Json
          reached_bottom?: boolean
          scroll_depth_pct?: number | null
          session_id?: string | null
          started_at?: string
          time_on_page_sec?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_reads_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
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
      profiles: {
        Row: {
          career_phase: string | null
          company: string | null
          country: string | null
          created_at: string | null
          daily_task_completed_at: string | null
          email: string | null
          full_name: string | null
          id: string
          job_search_stage: string | null
          job_title: string | null
          last_viewed_guide: string | null
          last_viewed_guide_at: string | null
          linkedin_url: string | null
          nps_last_shown_at: string | null
          onboarding_completed: boolean | null
          target_industry: string | null
          target_role: string | null
          tuesday_email_opted_in: boolean
          updated_at: string
          user_id: string
          whats_new_v2_seen: boolean
        }
        Insert: {
          career_phase?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          daily_task_completed_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          job_search_stage?: string | null
          job_title?: string | null
          last_viewed_guide?: string | null
          last_viewed_guide_at?: string | null
          linkedin_url?: string | null
          nps_last_shown_at?: string | null
          onboarding_completed?: boolean | null
          target_industry?: string | null
          target_role?: string | null
          tuesday_email_opted_in?: boolean
          updated_at?: string
          user_id: string
          whats_new_v2_seen?: boolean
        }
        Update: {
          career_phase?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          daily_task_completed_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          job_search_stage?: string | null
          job_title?: string | null
          last_viewed_guide?: string | null
          last_viewed_guide_at?: string | null
          linkedin_url?: string | null
          nps_last_shown_at?: string | null
          onboarding_completed?: boolean | null
          target_industry?: string | null
          target_role?: string | null
          tuesday_email_opted_in?: boolean
          updated_at?: string
          user_id?: string
          whats_new_v2_seen?: boolean
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
      sessions: {
        Row: {
          anon_id: string
          browser: string | null
          device_type: string | null
          duration_sec: number | null
          ended_at: string | null
          entry_page: string | null
          exit_page: string | null
          id: string
          is_returning: boolean
          language: string | null
          last_seen_at: string
          metadata: Json
          pages_viewed: number
          referrer: string | null
          started_at: string
          timezone: string | null
          tool_action_count: number
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          viewport_h: number | null
          viewport_w: number | null
        }
        Insert: {
          anon_id: string
          browser?: string | null
          device_type?: string | null
          duration_sec?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_returning?: boolean
          language?: string | null
          last_seen_at?: string
          metadata?: Json
          pages_viewed?: number
          referrer?: string | null
          started_at?: string
          timezone?: string | null
          tool_action_count?: number
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewport_h?: number | null
          viewport_w?: number | null
        }
        Update: {
          anon_id?: string
          browser?: string | null
          device_type?: string | null
          duration_sec?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_returning?: boolean
          language?: string | null
          last_seen_at?: string
          metadata?: Json
          pages_viewed?: number
          referrer?: string | null
          started_at?: string
          timezone?: string | null
          tool_action_count?: number
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          viewport_h?: number | null
          viewport_w?: number | null
        }
        Relationships: []
      }
      share_clicks: {
        Row: {
          channel: string
          created_at: string
          id: string
          page: string
        }
        Insert: {
          channel: string
          created_at?: string
          id?: string
          page: string
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          page?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      threads_demographics: {
        Row: {
          breakdown_type: string
          breakdown_value: string
          fetched_at: string | null
          id: string
          percentage: number | null
        }
        Insert: {
          breakdown_type: string
          breakdown_value: string
          fetched_at?: string | null
          id?: string
          percentage?: number | null
        }
        Update: {
          breakdown_type?: string
          breakdown_value?: string
          fetched_at?: string | null
          id?: string
          percentage?: number | null
        }
        Relationships: []
      }
      threads_link_clicks: {
        Row: {
          clicks: number | null
          created_at: string | null
          id: string
          link_url: string
          metric_date: string
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          link_url: string
          metric_date: string
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          link_url?: string
          metric_date?: string
        }
        Relationships: []
      }
      threads_posts: {
        Row: {
          content_audience: string | null
          content_cta: string | null
          content_format: string | null
          content_tagged_at: string | null
          content_tone: string | null
          content_topic: string | null
          conversation_rate: number | null
          created_at: string | null
          detected_language: string | null
          engagement_rate: number | null
          fetched_at: string | null
          hashtag: string | null
          id: string
          image_analyzed_at: string | null
          image_description: string | null
          image_tags: string[] | null
          is_quote_post: boolean | null
          likes: number | null
          media_id: string
          media_type: string | null
          media_url: string | null
          permalink: string | null
          posted_at: string | null
          quotes: number | null
          replies: number | null
          reposts: number | null
          shares: number | null
          shortcode: string | null
          text_content: string | null
          text_length: number | null
          thumbnail_url: string | null
          updated_at: string | null
          views: number | null
          virality_rate: number | null
        }
        Insert: {
          content_audience?: string | null
          content_cta?: string | null
          content_format?: string | null
          content_tagged_at?: string | null
          content_tone?: string | null
          content_topic?: string | null
          conversation_rate?: number | null
          created_at?: string | null
          detected_language?: string | null
          engagement_rate?: number | null
          fetched_at?: string | null
          hashtag?: string | null
          id?: string
          image_analyzed_at?: string | null
          image_description?: string | null
          image_tags?: string[] | null
          is_quote_post?: boolean | null
          likes?: number | null
          media_id: string
          media_type?: string | null
          media_url?: string | null
          permalink?: string | null
          posted_at?: string | null
          quotes?: number | null
          replies?: number | null
          reposts?: number | null
          shares?: number | null
          shortcode?: string | null
          text_content?: string | null
          text_length?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
          views?: number | null
          virality_rate?: number | null
        }
        Update: {
          content_audience?: string | null
          content_cta?: string | null
          content_format?: string | null
          content_tagged_at?: string | null
          content_tone?: string | null
          content_topic?: string | null
          conversation_rate?: number | null
          created_at?: string | null
          detected_language?: string | null
          engagement_rate?: number | null
          fetched_at?: string | null
          hashtag?: string | null
          id?: string
          image_analyzed_at?: string | null
          image_description?: string | null
          image_tags?: string[] | null
          is_quote_post?: boolean | null
          likes?: number | null
          media_id?: string
          media_type?: string | null
          media_url?: string | null
          permalink?: string | null
          posted_at?: string | null
          quotes?: number | null
          replies?: number | null
          reposts?: number | null
          shares?: number | null
          shortcode?: string | null
          text_content?: string | null
          text_length?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
          views?: number | null
          virality_rate?: number | null
        }
        Relationships: []
      }
      threads_user_insights: {
        Row: {
          created_at: string | null
          follower_count: number | null
          id: string
          metric_date: string
          profile_views: number | null
          total_likes: number | null
          total_quotes: number | null
          total_replies: number | null
          total_reposts: number | null
        }
        Insert: {
          created_at?: string | null
          follower_count?: number | null
          id?: string
          metric_date: string
          profile_views?: number | null
          total_likes?: number | null
          total_quotes?: number | null
          total_replies?: number | null
          total_reposts?: number | null
        }
        Update: {
          created_at?: string | null
          follower_count?: number | null
          id?: string
          metric_date?: string
          profile_views?: number | null
          total_likes?: number | null
          total_quotes?: number | null
          total_replies?: number | null
          total_reposts?: number | null
        }
        Relationships: []
      }
      tool_completions: {
        Row: {
          action: string
          anon_id: string | null
          created_at: string
          duration_ms: number | null
          id: string
          lang: string | null
          outcome: Json
          session_id: string | null
          success: boolean
          tool: string
          user_id: string | null
        }
        Insert: {
          action: string
          anon_id?: string | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          lang?: string | null
          outcome?: Json
          session_id?: string | null
          success?: boolean
          tool: string
          user_id?: string | null
        }
        Update: {
          action?: string
          anon_id?: string | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          lang?: string | null
          outcome?: Json
          session_id?: string | null
          success?: boolean
          tool?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_completions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_documents: {
        Row: {
          created_at: string
          data: Json
          id: string
          linked_job_id: string | null
          name: string
          settings: Json
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json
          id?: string
          linked_job_id?: string | null
          name?: string
          settings?: Json
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          linked_job_id?: string | null
          name?: string
          settings?: Json
          type?: string
          updated_at?: string
          user_id?: string
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
      count_user_documents: {
        Args: { p_type: string; p_user_id: string }
        Returns: number
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      mark_review_viewed: { Args: { review_id: string }; Returns: undefined }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
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
