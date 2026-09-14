import { createBrowserClient } from '@supabase/ssr';

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rgxmotfhyivbxwubggcf.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneG1vdGZoeWl2Ynh3dWJnZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3OTIxOTMsImV4cCI6MjEwNDM2ODE5M30.RZ0mNDtXFVnWY_i7BQhDZg4f1XhQNQlHlCdzaFevOqg';

  return createBrowserClient(supabaseUrl, supabaseKey);
}

// 1. Supabase Authentication Helper Functions
export async function signUpWithSupabase(email: string, password: string, name: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name
      }
    }
  });
  return { data, error };
}

export async function signInWithSupabase(email: string, password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signInWithGoogleOAuth() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined
    }
  });
  return { data, error };
}

export async function signOutFromSupabase() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

// 2. Real Database Query Functions
export async function saveProfileToSupabase(profile: {
  userId: string;
  name: string;
  targetRole: string;
  experienceLevel: string;
  readinessScore: number;
}) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: profile.userId,
      name: profile.name,
      target_role: profile.targetRole,
      experience_level: profile.experienceLevel,
      readiness_score: profile.readinessScore,
      updated_at: new Date().toISOString()
    });
  return { data, error };
}

export async function fetchCoursesFromSupabase() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('milestone_order', { ascending: true });
  return { data, error };
}

export async function saveInterviewSessionToSupabase(session: {
  userId: string;
  targetRole: string;
  turns: any[];
  feedback: any;
}) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('interview_sessions')
    .insert({
      user_id: session.userId,
      target_role: session.targetRole,
      turns: session.turns,
      feedback_report: session.feedback
    });
  return { data, error };
}
