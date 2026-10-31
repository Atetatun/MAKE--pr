-- PortoCraft Database Schema
-- Copy-paste this into Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Templates table
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  preview_url TEXT,
  styles JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO templates (name, slug, description, styles) VALUES
  (
    'Professional',
    'professional',
    'Clean and professional CV template',
    '{"colors": {"primary": "#1e3a8a", "accent": "#0ea5e9"}, "fonts": {"heading": "Inter", "body": "Open Sans"}}'::jsonb
  ),
  (
    'Creative',
    'creative',
    'Creative and bold CV template',
    '{"colors": {"primary": "#f97316", "accent": "#0ea5e9"}, "fonts": {"heading": "Inter", "body": "Open Sans"}}'::jsonb
  ),
  (
    'Minimal',
    'minimal',
    'Minimalist CV template',
    '{"colors": {"primary": "#0f172a", "accent": "#64748b"}, "fonts": {"heading": "Inter", "body": "Open Sans"}}'::jsonb
  );

-- 3. CVs table
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id INT NOT NULL REFERENCES templates(id),
  name TEXT NOT NULL DEFAULT 'Untitled CV',
  data JSONB NOT NULL DEFAULT '{
    "header": {"name": "", "email": "", "phone": "", "location": ""},
    "summary": {"text": ""},
    "experience": [],
    "education": [],
    "skills": [],
    "projects": []
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on user_id for faster queries
CREATE INDEX cvs_user_id_idx ON cvs(user_id);
CREATE INDEX cvs_updated_at_idx ON cvs(updated_at DESC);

-- 4. AI Usage tracking (future)
CREATE TABLE ai_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  tokens_used INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ai_usage_user_id_idx ON ai_usage(user_id);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for CVs
CREATE POLICY "Users can view their own CVs" ON cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CVs" ON cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs" ON cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs" ON cvs
  FOR DELETE USING (auth.uid() = user_id);

-- 7. RLS Policies for AI Usage
CREATE POLICY "Users can view their own AI usage" ON ai_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI usage" ON ai_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 8. Templates are public (no RLS needed, already readable by all)

-- Done! Your database is ready.
