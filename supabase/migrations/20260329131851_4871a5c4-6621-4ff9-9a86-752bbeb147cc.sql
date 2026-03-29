ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_topic text;
ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_format text;
ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_tone text;
ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_cta text;
ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_audience text;
ALTER TABLE threads_posts ADD COLUMN IF NOT EXISTS content_tagged_at timestamptz;