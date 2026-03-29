
-- Threads analytics tables

CREATE TABLE threads_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id TEXT UNIQUE NOT NULL,
  text_content TEXT,
  media_type TEXT,
  permalink TEXT,
  shortcode TEXT,
  is_quote_post BOOLEAN DEFAULT false,
  posted_at TIMESTAMPTZ,
  media_url TEXT,
  thumbnail_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  replies INTEGER DEFAULT 0,
  reposts INTEGER DEFAULT 0,
  quotes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  image_description TEXT,
  image_tags TEXT[],
  image_analyzed_at TIMESTAMPTZ,
  text_length INTEGER GENERATED ALWAYS AS (COALESCE(length(text_content), 0)) STORED,
  detected_language TEXT GENERATED ALWAYS AS (
    CASE
      WHEN text_content ~ '[一-龥㐀-䶵]' THEN 'zh'
      ELSE 'en'
    END
  ) STORED,
  hashtag TEXT GENERATED ALWAYS AS (
    CASE
      WHEN text_content ~ '#\w+' THEN substring(text_content from '#(\w+)')
      ELSE NULL
    END
  ) STORED,
  engagement_rate NUMERIC(6,5) GENERATED ALWAYS AS (
    CASE WHEN views > 0
      THEN (likes + replies + reposts + quotes)::NUMERIC / views
      ELSE 0
    END
  ) STORED,
  virality_rate NUMERIC(6,5) GENERATED ALWAYS AS (
    CASE WHEN views > 0
      THEN (reposts + quotes + shares)::NUMERIC / views
      ELSE 0
    END
  ) STORED,
  conversation_rate NUMERIC(6,5) GENERATED ALWAYS AS (
    CASE WHEN views > 0
      THEN replies::NUMERIC / views
      ELSE 0
    END
  ) STORED,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE threads_user_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_date DATE NOT NULL,
  profile_views INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_replies INTEGER DEFAULT 0,
  total_reposts INTEGER DEFAULT 0,
  total_quotes INTEGER DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(metric_date)
);

CREATE TABLE threads_link_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_date DATE NOT NULL,
  link_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(metric_date, link_url)
);

CREATE TABLE threads_demographics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  breakdown_type TEXT NOT NULL,
  breakdown_value TEXT NOT NULL,
  percentage NUMERIC(5,2),
  fetched_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(breakdown_type, breakdown_value)
);

-- Indexes
CREATE INDEX idx_posts_posted_at ON threads_posts(posted_at DESC);
CREATE INDEX idx_posts_engagement ON threads_posts(engagement_rate DESC);
CREATE INDEX idx_posts_views ON threads_posts(views DESC);
CREATE INDEX idx_posts_virality ON threads_posts(virality_rate DESC);
CREATE INDEX idx_posts_language ON threads_posts(detected_language);
CREATE INDEX idx_posts_hashtag ON threads_posts(hashtag);
CREATE INDEX idx_posts_quote ON threads_posts(is_quote_post);
CREATE INDEX idx_posts_image_tags ON threads_posts USING GIN(image_tags);
CREATE INDEX idx_insights_date ON threads_user_insights(metric_date DESC);
CREATE INDEX idx_clicks_date ON threads_link_clicks(metric_date DESC);

-- RLS
ALTER TABLE threads_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads_user_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads_link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads_demographics ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access posts" ON threads_posts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access insights" ON threads_user_insights FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access clicks" ON threads_link_clicks FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access demographics" ON threads_demographics FOR ALL USING (auth.role() = 'service_role');

-- Admin read access
CREATE POLICY "Admin read posts" ON threads_posts FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admin read insights" ON threads_user_insights FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admin read clicks" ON threads_link_clicks FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admin read demographics" ON threads_demographics FOR SELECT USING (is_admin(auth.uid()));
