-- HIR-219: persist resume image URL so annotated view shows in history and on reload
--
-- 1. Add resume_image_url column to resume_analyses
-- 2. Create private storage bucket for resume images
-- 3. RLS policies: users can only access their own folder ({user_id}/...)

ALTER TABLE resume_analyses ADD COLUMN resume_image_url TEXT NULL;

-- Create the storage bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume-images', 'resume-images', false)
ON CONFLICT (id) DO NOTHING;

-- RLS: authenticated users can SELECT objects in their own folder
CREATE POLICY "Users can read own resume images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'resume-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- RLS: authenticated users can INSERT objects in their own folder
CREATE POLICY "Users can upload own resume images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resume-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
