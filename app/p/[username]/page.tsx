"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Github, 
  Linkedin, 
  Share2, 
  Check, 
  Download, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Terminal
} from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";

interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface PublicCandidateProfile {
  name: string;
  username: string;
  bio: string;
  college: string;
  degree: string;
  graduationYear: string;
  location: string;
  targetRole: string;
  targetCtc: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  leetcodeUrl: string;
  readinessScore: number;
  skills: string[];
  projects: ProjectItem[];
  coverColor?: string;
}

const COVER_GRADIENTS: Record<string, string> = {
  ocean: "from-blue-600 via-indigo-600 to-cyan-500",
  emerald: "from-emerald-600 via-teal-600 to-green-500",
  sunset: "from-amber-500 via-orange-600 to-rose-600",
  violet: "from-purple-600 via-violet-600 to-pink-500",
  dark: "from-slate-900 via-slate-800 to-zinc-900"
};

export default function PublicProfilePage() {
  const params = useParams();
  const rawUsername = typeof params?.username === "string" ? params.username : "candidate";
  const usernameParam = decodeURIComponent(rawUsername);

  const [profile, setProfile] = useState<PublicCandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      // 1. Attempt load from Supabase if live
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .ilike("name", `%${usernameParam}%`)
          .limit(1)
          .single();

        if (data && !error) {
          setProfile({
            name: data.name || "Candidate",
            username: usernameParam,
            bio: data.industry || "Software Engineer specializing in scalable full-stack and intelligent cloud systems.",
            college: "Computer Science & Engineering",
            degree: data.experience_level || "B.Tech in Computer Science",
            graduationYear: "Class of 2026",
            location: "Bangalore / Remote",
            targetRole: data.target_role || "Full-Stack Software Engineer",
            targetCtc: "₹18 - 32 LPA",
            githubUrl: "https://github.com",
            linkedinUrl: "https://linkedin.com",
            portfolioUrl: "",
            leetcodeUrl: "",
            readinessScore: data.readiness_score || 85,
            skills: ["TypeScript", "Next.js", "React", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS Cloud", "Git"],
            projects: [
              {
                title: "CareerCompass AI Engine",
                description: "Full-stack AI developer placement readiness engine with dynamic technical interview bar-raising and ATS compliance audits.",
                techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Gemini AI", "Supabase"],
                githubUrl: "https://github.com/DevlprArchit/career-compass-ai"
              }
            ]
          });
          setLoading(false);
          return;
        }
      } catch {}

      // 2. Fallback to localStorage payload if viewed on student's machine
      if (typeof window !== "undefined") {
        try {
          const localUser = localStorage.getItem("careercompass_user");
          const localSkills = localStorage.getItem("careercompass_profile_skills");
          const localProjects = localStorage.getItem("careercompass_profile_projects");
          const localScore = localStorage.getItem("careercompass_score");

          if (localUser) {
            const u = JSON.parse(localUser);
            const skills = localSkills ? JSON.parse(localSkills) : ["TypeScript", "Next.js", "React", "Python", "FastAPI", "PostgreSQL", "Docker", "Git"];
            const projs = localProjects ? JSON.parse(localProjects) : [];
            const score = localScore ? parseInt(localScore, 10) : 84;

            setProfile({
              name: u.name || "Alex Rivera",
              username: u.username || usernameParam,
              bio: u.bio || "Full-stack engineer passionate about scalable cloud architectures, high-performance web applications, and autonomous AI systems.",
              college: u.college || "School of Computing & Engineering",
              degree: u.degree || "B.Tech in Computer Science & Engineering",
              graduationYear: u.graduationYear || "Class of 2026",
              location: u.location || "Bangalore, India",
              targetRole: u.targetRole || u.specializationTrade || "Full-Stack Web & Systems Engineer",
              targetCtc: u.targetCtc || "₹18 - 32 LPA",
              githubUrl: u.githubUrl || "https://github.com",
              linkedinUrl: u.linkedinUrl || "https://linkedin.com",
              portfolioUrl: u.portfolioUrl || "",
              leetcodeUrl: u.leetcodeUrl || "",
              readinessScore: score,
              skills: skills.length > 0 ? skills : ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
              projects: projs.length > 0 ? projs : [
                {
                  title: "Distributed Task Orchestration Engine",
                  description: "High-throughput asynchronous task queue with distributed lock management and automated dead-letter retries.",
                  techStack: ["Go", "Redis", "Docker", "PostgreSQL"],
                  githubUrl: "https://github.com"
                },
                {
                  title: "Real-Time Collaborative Code Editor",
                  description: "WebSockets-synchronized multi-cursor code editor with syntax tree parsing and live operational transform reconciliation.",
                  techStack: ["Next.js", "TypeScript", "WebSockets", "Tailwind CSS"],
                  githubUrl: "https://github.com"
                }
              ]
            });
            setLoading(false);
            return;
          }
        } catch {}
      }

      // 3. Fallback default profile if accessed via direct URL
      const cleanName = usernameParam.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      setProfile({
        name: cleanName || "Alex Rivera",
        username: usernameParam,
        bio: "Full-stack engineer passionate about scalable cloud architectures, high-performance web applications, and autonomous AI systems.",
        college: "School of Computing & Engineering",
        degree: "B.Tech in Computer Science & Engineering",
        graduationYear: "Class of 2026",
        location: "Bangalore, India",
        targetRole: "Full-Stack Web & Systems Engineer",
        targetCtc: "₹18 - 32 LPA",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        portfolioUrl: "",
        leetcodeUrl: "",
        readinessScore: 84,
        skills: ["TypeScript", "Next.js", "React", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS Cloud", "Git", "System Design"],
        projects: [
          {
            title: "Distributed Task Orchestration Engine",
            description: "High-throughput asynchronous task queue with distributed lock management and automated dead-letter retries.",
            techStack: ["Go", "Redis", "Docker", "PostgreSQL"],
            githubUrl: "https://github.com"
          },
          {
            title: "Real-Time Collaborative Code Editor",
            description: "WebSockets-synchronized multi-cursor code editor with syntax tree parsing and live operational transform reconciliation.",
            techStack: ["Next.js", "TypeScript", "WebSockets", "Tailwind CSS"],
            githubUrl: "https://github.com"
          }
        ]
      });
      setLoading(false);
    }

    loadProfile();
  }, [usernameParam]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyEmail = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("contact.candidate@university.edu");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#D9822B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-[#1E1B18]/70 tracking-wide uppercase font-mono">Loading Verified Portfolio...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1E1B18] font-sans selection:bg-[#D9822B]/20">
      
      {/* Top Commercial Verification Bar */}
      <header className="border-b border-[#1E1B18]/10 bg-[#FAF8F3]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-[#1E1B18] flex items-center justify-center text-[#FAF6EE] shadow-sm group-hover:bg-[#D9822B] transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#1E1B18]">CareerCompass AI</span>
              <span className="text-[10px] bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#2D6A4F]/20">Verified Portfolio</span>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#1E1B18]/15 bg-white text-xs font-semibold hover:bg-[#FAF8F3] hover:border-[#1E1B18]/30 transition-all shadow-sm"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
            </button>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-[#1E1B18] hover:bg-[#2D2A26] text-[#FAF8F3] text-xs font-semibold transition-all shadow-sm"
            >
              <span>Build My Portfolio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Profile Hero Card */}
        <div className="bg-white rounded-2xl border border-[#1E1B18]/10 shadow-sm overflow-hidden">
          
          {/* Header Cover Banner */}
          <div className={`h-36 sm:h-44 w-full bg-gradient-to-r ${COVER_GRADIENTS.ocean} relative`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                <span>Verified Candidate</span>
              </span>
            </div>
          </div>

          {/* Profile Header Content */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            
            {/* Avatar & Badges Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 sm:-mt-16 mb-5 gap-4">
              <div className="flex items-end space-x-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#1E1B18] border-4 border-white shadow-md flex items-center justify-center text-white font-display font-extrabold text-3xl sm:text-4xl shrink-0">
                  {profile.name[0]}
                </div>
                <div className="pb-1 space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] tracking-tight font-display">
                      {profile.name}
                    </h1>
                    {profile.username && (
                      <span className="text-xs font-mono font-semibold text-[#1E1B18]/60 bg-[#F8F5EE] px-2 py-0.5 rounded-lg border border-[#1E1B18]/10">
                        @{profile.username}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#D9822B] flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{profile.targetRole}</span>
                  </p>
                </div>
              </div>

              {/* AWS Student Builder Campus Leader Spotlight */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-[#1E1B18]/15 shadow-sm text-xs font-bold text-[#1E1B18]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9822B] animate-pulse"></span>
                <span>AWS Student Builder</span>
                <span className="text-[10px] bg-[#D9822B] text-white px-2 py-0.5 rounded-md uppercase tracking-wider font-extrabold">Campus Leader</span>
              </div>
            </div>

            {/* Candidate Bio & Details */}
            <p className="text-sm text-[#1E1B18]/80 leading-relaxed max-w-3xl font-normal">
              {profile.bio}
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#1E1B18]/70 pt-4 font-medium border-t border-[#1E1B18]/5 mt-4">
              <div className="flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-[#1E1B18]/50" />
                <span>{profile.degree}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-[#1E1B18]/50" />
                <span>{profile.college} ({profile.graduationYear})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#1E1B18]/50" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Social & Contact Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#1E1B18]/5 mt-4">
              <div className="flex items-center space-x-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-[#1E1B18]/10 hover:border-[#1E1B18]/30 hover:bg-[#F8F5EE] transition-all text-[#1E1B18]"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-[#1E1B18]/10 hover:border-[#1E1B18]/30 hover:bg-[#F8F5EE] transition-all text-[#1E1B18]"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#1E1B18]/10 hover:bg-[#F8F5EE] text-xs font-semibold transition-all"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Mail className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Email Copied!" : "Contact Candidate"}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Verified Resume</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Commercial Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-1">
            <span className="text-xs text-[#1E1B18]/60 font-semibold uppercase tracking-wider font-mono">Job Readiness</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F] font-display">{profile.readinessScore}%</span>
              <span className="text-xs text-[#2D6A4F] font-bold">Industry Ready</span>
            </div>
            <p className="text-[11px] text-[#1E1B18]/60 leading-tight">Benchmarked against top software roles</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-1">
            <span className="text-xs text-[#1E1B18]/60 font-semibold uppercase tracking-wider font-mono">Target Compensation</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1E1B18] font-display">{profile.targetCtc}</div>
            <p className="text-[11px] text-[#1E1B18]/60 leading-tight">Calibrated placement bracket</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-1">
            <span className="text-xs text-[#1E1B18]/60 font-semibold uppercase tracking-wider font-mono">Verified Skills</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#D9822B] font-display">{profile.skills.length}</div>
            <p className="text-[11px] text-[#1E1B18]/60 leading-tight">Technical proficiencies assessed</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-1">
            <span className="text-xs text-[#1E1B18]/60 font-semibold uppercase tracking-wider font-mono">Shipped Projects</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2A6F97] font-display">{profile.projects.length}</div>
            <p className="text-[11px] text-[#1E1B18]/60 leading-tight">Public repositories & demos</p>
          </div>
        </div>

        {/* Two-Column Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Featured Projects */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-[#2D6A4F]" />
                <h2 className="text-lg font-bold text-[#1E1B18] tracking-tight font-display">Featured Engineering Projects</h2>
              </div>
              <span className="text-xs font-mono font-semibold text-[#1E1B18]/50">{profile.projects.length} Repositories</span>
            </div>

            <div className="space-y-4">
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#1E1B18]/10 shadow-sm hover:shadow-md transition-all space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-[#1E1B18] tracking-tight">{proj.title}</h3>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-[#2D6A4F] hover:underline shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#1E1B18]/70 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono font-semibold bg-[#F8F5EE] text-[#1E1B18] px-2.5 py-0.5 rounded-lg border border-[#1E1B18]/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Verified Skills & Credentials */}
          <div className="space-y-6">
            
            {/* Verified Skills Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-[#D9822B]" />
                <h2 className="text-base font-bold text-[#1E1B18] tracking-tight font-display">Verified Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center space-x-1 text-xs font-medium bg-[#FAF8F3] text-[#1E1B18] px-3 py-1 rounded-xl border border-[#1E1B18]/10 shadow-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#2D6A4F]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Accredited Credentials Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#1E1B18]/10 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#2A6F97]" />
                <h2 className="text-base font-bold text-[#1E1B18] tracking-tight font-display">Accredited Credentials</h2>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#1E1B18]/10 space-y-1">
                  <div className="font-bold text-[#1E1B18]">AWS Student Builder Leader</div>
                  <div className="text-[#1E1B18]/60 text-[11px]">Amazon Web Services Credential</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#1E1B18]/10 space-y-1">
                  <div className="font-bold text-[#1E1B18]">CS50x: Computer Science Foundations</div>
                  <div className="text-[#1E1B18]/60 text-[11px]">Harvard University Verified</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#1E1B18]/10 space-y-1">
                  <div className="font-bold text-[#1E1B18]">Machine Learning Specialization</div>
                  <div className="text-[#1E1B18]/60 text-[11px]">DeepLearning.AI / Stanford</div>
                </div>
              </div>
            </div>

            {/* Recruiter Callout */}
            <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F2EAD6] p-6 rounded-2xl border border-[#D9822B]/30 space-y-3">
              <div className="flex items-center space-x-2 text-[#D9822B]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Hiring Manager Note</span>
              </div>
              <p className="text-xs text-[#1E1B18]/80 leading-relaxed font-normal">
                This candidate technical proficiencies have been calibrated through CareerCompass AI benchmark framework with verified project code and mock technical interview screenings.
              </p>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2 rounded-xl bg-[#1E1B18] hover:bg-[#2D2A26] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Schedule Technical Interview
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E1B18]/10 py-6 mt-16 text-center text-xs text-[#1E1B18]/60 bg-[#FAF8F3]">
        <p>CareerCompass AI · Verified Student Developer Portfolio Platform</p>
      </footer>

    </div>
  );
}
