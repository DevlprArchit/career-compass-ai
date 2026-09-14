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

// Helper to guarantee valid UUID for Postgres tables
export function toValidUuid(id: string): string {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return id;
  }
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `00000000-0000-4000-8000-${hex.repeat(3).substring(0, 12)}`;
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
  const safeId = toValidUuid(profile.userId);
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: safeId,
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
  const safeId = toValidUuid(session.userId);
  const { data, error } = await supabase
    .from('interview_sessions')
    .insert({
      user_id: safeId,
      target_role: session.targetRole,
      turns: session.turns,
      feedback_report: session.feedback
    });
  return { data, error };
}

// 3. Complete User Session Persistence (First Test + Latest Interview + Profile)
export async function saveCompleteUserSession(sessionData: {
  user: any;
  score?: number | null;
  tradeFit?: any;
  skillMatrix?: any;
  interviewTurns?: any[];
  candidateScorecard?: any;
}) {
  const supabase = getSupabaseClient();
  const userId = sessionData.user?.id || "user-" + (sessionData.user?.email || "candidate");
  const safeId = toValidUuid(userId);

  // 1. Upsert Profile
  const profilePayload = {
    id: safeId,
    name: sessionData.user?.name || "Candidate",
    target_role: sessionData.user?.targetRole || sessionData.user?.specializationTrade || "AI / ML Engineer",
    experience_level: sessionData.user?.degree || sessionData.user?.semesterOrStatus || "entry",
    industry: sessionData.user?.bio || "Software Engineering",
    readiness_score: sessionData.score ?? (sessionData.user?.readinessScore || 75),
    updated_at: new Date().toISOString()
  };

  const { error: profileError } = await supabase.from('profiles').upsert(profilePayload);

  // 2. Save Assessment if present
  if (sessionData.score !== undefined && sessionData.score !== null) {
    try {
      await supabase.from('assessments').insert({
        user_id: safeId,
        target_role: sessionData.user?.targetRole || sessionData.user?.specializationTrade || "AI / ML Engineer",
        status: 'completed',
        overall_score: sessionData.score,
        skill_breakdown: sessionData.skillMatrix || {},
        narrative_cheat_sheet: sessionData.tradeFit ? JSON.stringify(sessionData.tradeFit) : null,
        completed_at: new Date().toISOString()
      });
    } catch {}
  }

  // 3. Save Interview Session if present
  if (sessionData.candidateScorecard && sessionData.interviewTurns && sessionData.interviewTurns.length > 1) {
    try {
      await supabase.from('interview_sessions').insert({
        user_id: safeId,
        target_role: sessionData.user?.targetRole || sessionData.user?.specializationTrade || "AI / ML Engineer",
        turns: sessionData.interviewTurns,
        feedback_report: sessionData.candidateScorecard
      });
    } catch {}
  }

  return { success: !profileError };
}

// 4. Load Complete Historical User Data from Supabase
export async function loadCompleteUserSession(identifier: string) {
  const supabase = getSupabaseClient();
  const safeId = toValidUuid(identifier);

  try {
    // 1. Fetch Profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .or(`id.eq.${safeId},name.ilike.%${identifier}%`)
      .limit(1)
      .single();

    // 2. Fetch Latest Assessment
    const { data: assessment } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', safeId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // 3. Fetch Latest Interview Session
    const { data: interview } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('user_id', safeId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return {
      profile,
      assessment,
      interview
    };
  } catch {
    return { profile: null, assessment: null, interview: null };
  }
}

// 5. AWS Student Builder Campus Leader Application Submissions
export async function submitAwsLeaderApplication(app: {
  appId: string;
  name: string;
  email: string;
  college: string;
  degree?: string;
  graduationYear?: string;
  githubOrLinkedin?: string;
  preferredTrack?: string;
  priorCloudExperience?: string;
  leadershipReason?: string;
}) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('aws_applications')
    .insert({
      app_id: app.appId,
      name: app.name,
      email: app.email,
      college: app.college,
      degree: app.degree,
      graduation_year: app.graduationYear,
      github_or_linkedin: app.githubOrLinkedin,
      preferred_track: app.preferredTrack,
      prior_experience: app.priorCloudExperience,
      leadership_reason: app.leadershipReason,
      initiative: 'AWS Student Builder Campus Leader',
      project_credit: 'Team Udbhav by Archit Sharma'
    });
  return { data, error };
}

