# CareerCompass AI

CareerCompass AI is an AI-driven career consultant platform designed to guide students and professionals into AI & Machine Learning Engineering.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Google GenAI / Anthropic Claude**.

---

## Brand & Design System

- **Metaphor**: A genuine path with waypoints you move along (not a generic grid of cards).
- **Ink** (`#12203A`): Deep navy-ink for primary text, headers, and primary buttons.
- **Paper** (`#F6F5F1`): Quiet, cool off-white background.
- **Path** (`#2F6F5E`): Muted pine-green for progress bars, roadmap lines, and completed states.
- **Waypoint** (`#E2A33B`): Amber-gold accent used strictly on the current active milestone and the Readiness Score ring.
- **Caution** (`#B3452C`): Muted brick-red for job posting warnings and weak skill markers.
- **Typography**: Fraunces (Headings/Display) & Inter (UI/Data).

---

## Core Features

1. **Adaptive Skills Assessment**: Dynamic diagnostic test with difficulty adjustments covering Deep Learning, Transformers, Classical ML, and MLOps.
2. **AI Skill Report ("Cheat Sheet")**: Concrete feedback report with an overall readiness score ring in waypoint gold, per-skill progress bars, and targeted learning recommendations.
3. **Personalized Milestone Roadmap**: An ordered vertical path connecting all 6 foundational competencies, directly linking to complete, verified full courses and playlists on YouTube:
   - Milestone 1: Mathematical Foundations & Vector Calculus (*3Blue1Brown*)
   - Milestone 2: Classical Machine Learning & Statistics (*StatQuest / Andrew Ng*)
   - Milestone 3: Deep Learning & Neural Networks from Scratch (*Andrej Karpathy Zero to Hero*)
   - Milestone 4: Transformers & Modern NLP Architectures (*Andrej Karpathy nanoGPT / Hugging Face*)
   - Milestone 5: Generative AI, RAG & Autonomous Agent Systems (*Krish Naik / freeCodeCamp*)
   - Milestone 6: Production MLOps, Serving & Quantization (*DataTalks.Club MLOps Zoomcamp*)
4. **AI Mock Interview Simulation**: Turn-by-turn interactive technical screen with follow-up probing questions and a post-interview evaluation report.
5. **Job Cautions Analyzer**: Real-time scanner for job postings that highlights ghost listing indicators, scam fees, and unrealistic requirements.

---

## Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure Environment
cp .env.local.example .env.local

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and execute the contents of `supabase/schema.sql`.
4. Copy your project URL and anon public key from **Project Settings $\rightarrow$ API** into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## Deploy to Vercel (Online Hosting)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/career-compass-ai.git
   git push -u origin main
   ```
2. In [Vercel](https://vercel.com):
   - Import your GitHub repository.
   - Add your Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GEMINI_API_KEY` (from Google AI Studio)
   - Click **Deploy**.
