-- ==========================================================
-- CareerCompass AI — Supabase Database Architecture
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase Auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_role TEXT NOT NULL DEFAULT 'AI / ML Engineer',
    industry TEXT DEFAULT 'Technology',
    experience_level TEXT NOT NULL DEFAULT 'entry',
    resume_url TEXT,
    readiness_score INT DEFAULT 70,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Course Catalog Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_order INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    why_matters TEXT NOT NULL,
    skill_tags TEXT[] NOT NULL,
    format TEXT DEFAULT 'video_playlist',
    duration_hours INT NOT NULL,
    youtube_url TEXT NOT NULL,
    creator TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Adaptive Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress',
    overall_score INT,
    skill_breakdown JSONB DEFAULT '{}'::jsonb,
    narrative_cheat_sheet TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 4. User Milestones / Progress Tracking
CREATE TABLE IF NOT EXISTS public.user_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    milestone_order INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'locked',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Mock Interview Sessions
CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    turns JSONB DEFAULT '[]'::jsonb,
    feedback_report JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Row Level Security (RLS) Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public profiles can be viewed and edited by owner" ON public.profiles;
DROP POLICY IF EXISTS "Courses are readable by all authenticated and anonymous users" ON public.courses;
DROP POLICY IF EXISTS "Assessments are accessible only by owner" ON public.assessments;
DROP POLICY IF EXISTS "Milestones are accessible only by owner" ON public.user_milestones;
DROP POLICY IF EXISTS "Interview sessions are accessible only by owner" ON public.interview_sessions;

CREATE POLICY "Public profiles can be viewed and edited by owner"
    ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Courses are readable by all authenticated and anonymous users"
    ON public.courses FOR SELECT USING (true);

CREATE POLICY "Assessments are accessible only by owner"
    ON public.assessments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Milestones are accessible only by owner"
    ON public.user_milestones FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Interview sessions are accessible only by owner"
    ON public.interview_sessions FOR ALL USING (auth.uid() = user_id);

-- ==========================================================
-- SEED DATA: Verified YouTube Courses (Individual Inserts)
-- ==========================================================
DELETE FROM public.courses;

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    1,
    'Mathematical Foundations & Vector Calculus',
    'Geometric visualization of vector transformations, matrix multiplications, determinants, and eigenvectors.',
    'Essential for backpropagation, loss landscapes, and matrix multiplications.',
    ARRAY['linear-algebra', 'calculus', 'numpy', 'vectors'],
    25,
    'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    '3Blue1Brown'
);

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    2,
    'Classical Machine Learning & Statistical Modeling',
    'Visual derivations of Decision Trees, Random Forests, XGBoost, and evaluation metrics by Josh Starmer.',
    'Tabular data and statistical foundations make up 70% of industry models.',
    ARRAY['scikit-learn', 'xgboost', 'bias-variance', 'statistics'],
    40,
    'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF',
    'StatQuest / Andrew Ng'
);

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    3,
    'Deep Learning & Neural Networks from Scratch',
    'Build micrograd, autograd, MLP, and backpropagation mechanics from scratch in PyTorch.',
    'Must be able to derive computational graphs and optimize PyTorch models without black-box abstractions.',
    ARRAY['pytorch', 'backprop', 'autograd', 'optimizers'],
    35,
    'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
    'Andrej Karpathy (Zero to Hero)'
);

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    4,
    'Transformers & Modern NLP Architectures',
    'Coding nanoGPT step-by-step: tokenization, attention heads, residual connections, and layer normalization.',
    'Self-attention, multi-head attention, and causal masking power all modern LLMs.',
    ARRAY['transformers', 'attention-mechanisms', 'huggingface'],
    30,
    'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    'Andrej Karpathy nanoGPT'
);

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    5,
    'Generative AI, RAG & Autonomous Agent Systems',
    'Hands-on implementations of OpenAI/Gemini APIs, LangChain agents, ChromaDB/FAISS vector retrieval, and end-to-end RAG.',
    'Production enterprise demand: semantic chunking, vector embeddings, and LangChain/LlamaIndex agents.',
    ARRAY['rag', 'vector-databases', 'langchain', 'lora-finetuning'],
    35,
    'https://www.youtube.com/playlist?list=PLZoTAELRMXVNbOXGEBP_Wd-bypY8N_P_1',
    'Krish Naik'
);

INSERT INTO public.courses (milestone_order, title, description, why_matters, skill_tags, duration_hours, youtube_url, creator)
VALUES (
    6,
    'Production MLOps, Serving & Quantization',
    'Experiment tracking (MLflow), pipeline orchestration (Prefect), Docker deployment, and drift monitoring.',
    'Deploying models via async FastAPI, Docker containerization, and TensorRT/vLLM batching.',
    ARRAY['mlops', 'fastapi', 'docker', 'model-serving', 'vllm'],
    30,
    'https://www.youtube.com/playlist?list=PL3MmuxUbc_hIhxl5Ji8t4v6daBQUptpwP',
    'DataTalks.Club MLOps Zoomcamp'
);
