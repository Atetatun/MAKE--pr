# PortoCraft Backend

Backend for PortoCraft - Web CV & Portfolio Builder with AI Auto-Write and ATS Checker.

## Setup

### Prerequisites
- Node.js 18+
- Supabase account
- OpenAI API key (for AI features)

### Installation

1. Clone repo
```bash
git clone https://github.com/riskiriski0429/MAKE-PR.git
cd portocraft-backend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials and API keys.

4. Start server
```bash
npm run dev
```

Server runs on http://localhost:3000

## API Endpoints

### Auth
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### CVs
- `GET /api/cvs` - List user CVs (protected)
- `GET /api/cvs/:id` - Get CV (protected)
- `POST /api/cvs` - Create CV (protected)
- `PUT /api/cvs/:id` - Update CV (protected)
- `POST /api/cvs/:id/save-progress` - Auto-save CV (protected)
- `DELETE /api/cvs/:id` - Delete CV (protected)

### Templates
- `GET /api/templates` - List templates
- `GET /api/templates/:id` - Get template

### AI
- `POST /api/ai/generate` - Generate text (protected)

### ATS
- `POST /api/ats/check` - Check ATS compatibility (protected)

### Health
- `GET /health` - Health check

## Database Schema

### Tables
- `users` - User accounts (managed by Supabase Auth)
- `cvs` - User CV projects
- `templates` - CV templates
- `ai_usage` - Track AI API usage (future)

### Setup Supabase Tables

```sql
-- CVs table
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id INT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled CV',
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  preview_url TEXT,
  styles JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default templates
INSERT INTO templates (name, slug, description) VALUES
  ('Professional', 'professional', 'Clean and professional CV template'),
  ('Creative', 'creative', 'Creative and bold CV template'),
  ('Minimal', 'minimal', 'Minimalist CV template');
```

## Environment Variables

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_openai_key
```

## Development

- `npm run dev` - Run with auto-reload
- `npm start` - Run production

## Error Handling

All endpoints return JSON with error messages:
```json
{ "error": "Error message here" }
```

## Next Steps

1. Implement OpenAI integration for AI Auto-Write
2. Implement PDF export
3. Add more ATS validation rules
4. Setup database migrations
5. Add rate limiting
6. Add input validation
7. Add logging system
