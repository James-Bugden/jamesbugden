-- Migration: Add user_id column to event_tracks table
-- Cutover date: 2026-04-27 UTC
-- 
-- This migration adds a nullable user_id column to track which authenticated user
-- performed each event. Pre-existing rows will have user_id = null.
-- Post-cutover, authenticated events will have user_id populated automatically.
-- Anonymous events (including pre-cutover) retain user_id = null.

-- Add nullable user_id column with foreign key reference to auth.users
ALTER TABLE public.event_tracks
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create function to automatically set user_id on insert
CREATE OR REPLACE FUNCTION public.set_event_track_user_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Set user_id to the authenticated user's ID, or null for anonymous requests
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run the function before insert
CREATE TRIGGER set_event_track_user_id_trigger
  BEFORE INSERT ON public.event_tracks
  FOR EACH ROW
  EXECUTE FUNCTION public.set_event_track_user_id();

-- Add index for performance on user_id queries
CREATE INDEX IF NOT EXISTS event_tracks_user_id_idx ON public.event_tracks(user_id);