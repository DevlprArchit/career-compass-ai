"use client";

import React, { useState, useEffect } from "react";
import { 
  UserProfile, 
  cleanBadge 
} from "@/lib/discovery-engine";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Code2, 
  Edit3, 
  Share2, 
  Check, 
  Plus, 
  X, 
  Camera, 
  Award, 
  FileText, 
  Mic, 
  Gauge, 
  Terminal, 
  Sparkles, 
  Settings, 
  Download, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Star
} from "lucide-react";

interface StudentProfileProps {
  user: UserProfile | null;
  onUpdateUser: (updated: UserProfile) => void;
  onNavigateToTab: (tab: any) => void;
}

const COVER_PRESETS = [
  { id: "ocean", name: "Ocean Blue", class: "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" },
  { id: "emerald", name: "Emerald Pro", class: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-500" },
  { id: "sunset", name: "Sunset Blaze", class: "bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600" },
  { id: "violet", name: "Cyber Violet", class: "bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500" },
  { id: "dark", name: "Midnight Stealth", class: "bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900" }
];

export default function StudentProfile({ user, onUpdateUser, onNavigateToTab }: StudentProfileProps) {
  // State for active profile tab
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "projects" | "settings">("overview");

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form Fields for Editing - Pure real data derived from user intake
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || (user?.name ? user.name.toLowerCase().replace(/[^a-z0-9]/g, "_") : ""),
    bio: user?.bio || "",
    college: user?.college || "",
    degree: user?.degree || "",
    graduationYear: user?.graduationYear || "",
    location: user?.location || "",
    targetRole: user?.targetRole || user?.specializationTrade || "",
    targetCtc: user?.targetCtc || (user?.targetCompanyTier ? (user.targetCompanyTier === "Tier-1 Tech" ? "₹28 - 45 LPA" : user.targetCompanyTier === "High-Growth Unicorn" ? "₹18 - 32 LPA" : "₹10 - 20 LPA") : ""),
    githubUrl: user?.githubUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
    leetcodeUrl: user?.leetcodeUrl || "",
    portfolioUrl: user?.portfolioUrl || "",
    coverColor: user?.coverColor || "ocean"
  });

  // Skills Manager State - User's real verified skills
  const [skills, setSkills] = useState<string[]>(() => {
    if (user?.skillsList && user.skillsList.length > 0) return user.skillsList;
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("careercompass_profile_skills");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [newSkillInput, setNewSkillInput] = useState("");

  // Projects State - Real user projects persisted in localStorage
  const [projects, setProjects] = useState<Array<{
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
  }>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("careercompass_profile_projects");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // Dynamic ATS Score from user's actual resume
  const [atsScoreDisplay, setAtsScoreDisplay] = useState<string>("--");
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedAts = localStorage.getItem("careercompass_resume_ats");
        if (savedAts) {
          const parsed = JSON.parse(savedAts);
          if (typeof parsed.atsScore === "number") {
            setAtsScoreDisplay(`${parsed.atsScore}%`);
            return;
          }
        }
        const savedResume = localStorage.getItem("careercompass_resume");
        if (savedResume) {
          setAtsScoreDisplay("Draft Ready");
          return;
        }
      } catch {}
      setAtsScoreDisplay("--");
    }
  }, []);

  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectTech, setNewProjectTech] = useState("");
  const [newProjectGithub, setNewProjectGithub] = useState("");

  // Update form data if user prop changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        username: user.username || (user.name ? user.name.toLowerCase().replace(/[^a-z0-9]/g, "_") : prev.username),
        bio: user.bio || prev.bio,
        college: user.college || prev.college,
        degree: user.degree || prev.degree,
        graduationYear: user.graduationYear || prev.graduationYear,
        location: user.location || prev.location,
        targetRole: user.targetRole || user.specializationTrade || prev.targetRole,
        targetCtc: user.targetCtc || prev.targetCtc,
        githubUrl: user.githubUrl || prev.githubUrl,
        linkedinUrl: user.linkedinUrl || prev.linkedinUrl,
        leetcodeUrl: user.leetcodeUrl || prev.leetcodeUrl,
        portfolioUrl: user.portfolioUrl || prev.portfolioUrl,
        coverColor: user.coverColor || prev.coverColor
      }));
      if (user.skillsList && user.skillsList.length > 0) {
        setSkills(user.skillsList);
      }
    }
  }, [user]);

  // Handle Save Profile
  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...(user || {
        id: "student-" + Date.now(),
        email: "candidate@college.edu",
        codingExperience: "Intermediate",
        dsaCount: "30-75",
        targetCompanyTier: "Tier-1 Tech",
        placementTimeline: "3-6 Months",
        weeklyHours: 15,
        cgpaBand: "8.0 - 9.0",
        specializationTrade: "Computer Science",
        createdAt: new Date().toISOString()
      }),
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      college: formData.college,
      degree: formData.degree,
      graduationYear: formData.graduationYear,
      location: formData.location,
      targetRole: formData.targetRole,
      targetCtc: formData.targetCtc,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      leetcodeUrl: formData.leetcodeUrl,
      portfolioUrl: formData.portfolioUrl,
      coverColor: formData.coverColor,
      skillsList: skills
    };
    onUpdateUser(updated);
    try {
      localStorage.setItem("careercompass_user", JSON.stringify(updated));
      localStorage.setItem("careercompass_profile_skills", JSON.stringify(skills));
    } catch {}
    setIsEditModalOpen(false);
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    const updated = [...skills, trimmed];
    setSkills(updated);
    setNewSkillInput("");
    try {
      localStorage.setItem("careercompass_profile_skills", JSON.stringify(updated));
    } catch {}
    if (user) {
      onUpdateUser({ ...user, skillsList: updated });
    }
  };

  // Remove Skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    try {
      localStorage.setItem("careercompass_profile_skills", JSON.stringify(updated));
    } catch {}
    if (user) {
      onUpdateUser({ ...user, skillsList: updated });
    }
  };

  // Delete Project
  const handleDeleteProject = (indexToDelete: number) => {
    const updated = projects.filter((_, idx) => idx !== indexToDelete);
    setProjects(updated);
    try {
      localStorage.setItem("careercompass_profile_projects", JSON.stringify(updated));
    } catch {}
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    const techArray = newProjectTech
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const newProj = {
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim() || "Technical project built for placement portfolio.",
      techStack: techArray.length > 0 ? techArray : ["Software Development"],
      githubUrl: newProjectGithub.trim() || undefined
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem("careercompass_profile_projects", JSON.stringify(updated));
    } catch {}
    setNewProjectTitle("");
    setNewProjectDesc("");
    setNewProjectTech("");
    setNewProjectGithub("");
    setNewProjectModal(false);
  };

  // Copy Profile Link
  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Active cover gradient
  const activeCoverClass = COVER_PRESETS.find(p => p.id === formData.coverColor)?.class || COVER_PRESETS[0].class;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* 1. COMMERCIAL HEADER & COVER BANNER */}
      <div className="relative rounded-2xl overflow-hidden bg-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld">
        {/* Cover Photo Banner */}
        <div className={`h-48 sm:h-60 w-full ${activeCoverClass} relative transition-all duration-300 border-b-2 border-[#1E1B18]`}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          {/* Quick Cover Palette Switcher */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#FAF6EE]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border-2 border-[#1E1B18] shadow-overworld text-[#1E1B18] text-xs">
            <span className="font-pixel mr-1 hidden sm:inline text-[11px]">PALETTE:</span>
            {COVER_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => {
                  setFormData(prev => ({ ...prev, coverColor: preset.id }));
                  if (user) onUpdateUser({ ...user, coverColor: preset.id });
                }}
                className={`w-4 h-4 rounded-full border-2 border-[#1E1B18] transition-transform ${
                  formData.coverColor === preset.id ? "scale-125 ring-2 ring-[#D9822B]" : "opacity-80 hover:opacity-100"
                } ${preset.class}`}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-[#1E1B18] bg-[#1E1B18] shadow-overworld flex items-center justify-center text-[#F2EAD6] text-3xl sm:text-4xl font-bold font-pixel select-none overflow-hidden">
                {formData.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() || "SC"}
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-[#2D6A4F] border-2 border-[#1E1B18] rounded-full shadow-xs" title="Active Student" />
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="uiverse-btn-tactile bg-[#1E1B18] hover:bg-[#2D2A26] text-[#FAF6EE] text-xs font-pixel px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition-all border-2 border-[#1E1B18] shadow-overworld"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleShareProfile}
                className="uiverse-btn-tactile bg-[#FAF6EE] hover:bg-[#EAE0CA] text-[#1E1B18] text-xs font-pixel px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition-all border-2 border-[#1E1B18] shadow-overworld"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Share Profile"}</span>
              </button>
            </div>
          </div>

          {/* Name & Bio Info */}
          <div className="space-y-2 mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] font-display tracking-tight">
                {formData.name || "Candidate Profile"}
              </h1>
              {formData.username && (
                <span className="text-xs font-mono font-medium text-[#1E1B18] bg-[#EAE0CA] px-2.5 py-0.5 rounded-lg border-2 border-[#1E1B18]">
                  @{formData.username}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-pixel text-[#2D6A4F] bg-[#2D6A4F]/10 border-2 border-[#2D6A4F] px-2.5 py-0.5 rounded-lg shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Verified Candidate</span>
              </span>
            </div>

            <p className="text-sm text-[#1E1B18]/80 max-w-2xl leading-relaxed">
              {formData.bio || (formData.name ? "Engineering candidate preparing for campus recruitment and technical interviews." : "No bio added yet. Click 'Edit Profile' to add your summary, target trade, and career links.")}
            </p>

            {/* Academic & Geographic Meta Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#1E1B18]/70 font-medium">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#2A6F97]" />
                <span>{formData.degree ? `${formData.degree}${formData.graduationYear ? ` (Class of ${formData.graduationYear})` : ""}` : "Degree not specified"}</span>
              </div>
              <span className="text-[#1E1B18]/30">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#1E1B18]/70" />
                <span>{formData.college || "College not specified"}</span>
              </div>
              <span className="text-[#1E1B18]/30">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#BA3B46]" />
                <span>{formData.location || "Location not specified"}</span>
              </div>
            </div>

            {/* Target Role & CTC Banner */}
            <div className="inline-flex items-center gap-2 bg-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld rounded-xl px-3.5 py-2 text-xs text-[#1E1B18] mt-2">
              <Briefcase className="w-3.5 h-3.5 text-[#2A6F97]" />
              <span className="font-pixel text-[11px]">TARGET:</span>
              <span className="font-semibold">{cleanBadge(formData.targetRole || user?.specializationTrade || "Software Engineering")}</span>
              <span className="text-[#1E1B18]/30">|</span>
              <span className="font-pixel text-[11px]">BAND:</span>
              <span className="text-[#2A6F97] font-mono font-bold">{formData.targetCtc || "Market Competitive"}</span>
            </div>
          </div>
        </div>

        {/* 2. STATS RIBBON (OVERWORLD RETRO METRIC COUNTER) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border-t-2 border-[#1E1B18] bg-[#EAE0CA]/60 divide-x-2 divide-[#1E1B18] text-center">
          <div 
            onClick={() => onNavigateToTab("report")}
            className="p-3.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors"
          >
            <span className="block text-xl font-bold text-[#1E1B18] font-display">
              {user?.testsCompleted ?? (user?.readinessScore !== null && user?.readinessScore !== undefined ? 1 : 0)}
            </span>
            <span className="text-[11px] text-[#1E1B18]/70 font-pixel">Tests Taken</span>
          </div>

          <div 
            onClick={() => onNavigateToTab("interview")}
            className="p-3.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors"
          >
            <span className="block text-xl font-bold text-[#1E1B18] font-display">
              {user?.interviewsCompleted ?? 0}
            </span>
            <span className="text-[11px] text-[#1E1B18]/70 font-pixel">AI Interviews</span>
          </div>

          <div 
            onClick={() => onNavigateToTab("report")}
            className="p-3.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors"
          >
            <span className="block text-xl font-bold text-[#2A6F97] font-display">
              {user?.readinessScore !== null && user?.readinessScore !== undefined ? `${user.readinessScore}%` : "--"}
            </span>
            <span className="text-[11px] text-[#1E1B18]/70 font-pixel">Readiness Fit</span>
          </div>

          <div 
            onClick={() => onNavigateToTab("resume")}
            className="p-3.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors"
          >
            <span className="block text-xl font-bold text-[#2D6A4F] font-display">
              {atsScoreDisplay}
            </span>
            <span className="text-[11px] text-[#1E1B18]/70 font-pixel">ATS Resume</span>
          </div>

          <div 
            onClick={() => setActiveTab("skills")}
            className="p-3.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors col-span-2 sm:col-span-1"
          >
            <span className="block text-xl font-bold text-[#D9822B] font-display">
              {skills.length}
            </span>
            <span className="text-[11px] text-[#1E1B18]/70 font-pixel">Verified Skills</span>
          </div>
        </div>
      </div>

      {/* 3. COMMERCIAL TABBED NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-xs font-pixel rounded-xl border-2 border-[#1E1B18] transition-all whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-[#1E1B18] text-[#FAF6EE] shadow-overworld translate-x-[-1px] translate-y-[-1px]"
              : "bg-[#FAF6EE] text-[#1E1B18] hover:bg-[#EAE0CA]"
          }`}
        >
          Overview & Links
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 text-xs font-pixel rounded-xl border-2 border-[#1E1B18] transition-all whitespace-nowrap ${
            activeTab === "skills"
              ? "bg-[#1E1B18] text-[#FAF6EE] shadow-overworld translate-x-[-1px] translate-y-[-1px]"
              : "bg-[#FAF6EE] text-[#1E1B18] hover:bg-[#EAE0CA]"
          }`}
        >
          Skills & Tech Stack ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 text-xs font-pixel rounded-xl border-2 border-[#1E1B18] transition-all whitespace-nowrap ${
            activeTab === "projects"
              ? "bg-[#1E1B18] text-[#FAF6EE] shadow-overworld translate-x-[-1px] translate-y-[-1px]"
              : "bg-[#FAF6EE] text-[#1E1B18] hover:bg-[#EAE0CA]"
          }`}
        >
          Projects & Code ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 text-xs font-pixel rounded-xl border-2 border-[#1E1B18] transition-all whitespace-nowrap ${
            activeTab === "settings"
              ? "bg-[#1E1B18] text-[#FAF6EE] shadow-overworld translate-x-[-1px] translate-y-[-1px]"
              : "bg-[#FAF6EE] text-[#1E1B18] hover:bg-[#EAE0CA]"
          }`}
        >
          Account Settings
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left 2 Cols: About & Learning Journey */}
          <div className="md:col-span-2 space-y-6">
            {/* About Card */}
            <div className="bg-[#FAF6EE] rounded-2xl p-6 border-2 border-[#1E1B18] shadow-overworld space-y-4">
              <h3 className="text-xs font-pixel text-[#1E1B18] uppercase tracking-wider">
                ABOUT CANDIDATE
              </h3>
              <p className="text-sm text-[#1E1B18]/80 leading-relaxed">
                {formData.bio}
              </p>
              <div className="pt-3 border-t-2 border-[#1E1B18]/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-[#1E1B18]/60 font-pixel block">ACADEMIC SEMESTER</span>
                  <span className="text-xs font-semibold text-[#1E1B18]">{user?.semesterOrStatus || "1st / 2nd Year"}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#1E1B18]/60 font-pixel block">CODING EXP</span>
                  <span className="text-xs font-semibold text-[#1E1B18]">{user?.codingExperience || "Beginner"}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#1E1B18]/60 font-pixel block">DSA SOLVE COUNT</span>
                  <span className="text-xs font-semibold text-[#1E1B18]">{user?.dsaCount || "0 – 25 Problems"}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#FAF6EE] rounded-2xl p-6 border-2 border-[#1E1B18] shadow-overworld space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-pixel text-[#2A6F97] uppercase tracking-wider">
                  RECOMMENDED NEXT STEPS
                </span>
                <span className="text-xs text-[#1E1B18] font-pixel bg-[#EAE0CA] px-2.5 py-0.5 rounded-lg border-2 border-[#1E1B18]">
                  STEP-BY-STEP
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => onNavigateToTab("report")}
                  className="bg-[#F2EAD6] p-4 rounded-xl border-2 border-[#1E1B18] shadow-overworld hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#2A6F97] border-2 border-[#1E1B18] flex items-center justify-center text-[#FAF6EE] font-pixel text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-[#1E1B18] font-pixel">5-Min Quiz</h4>
                  <p className="text-xs text-[#1E1B18]/70">Test your foundations & get a calibrated readiness score.</p>
                </div>

                <div 
                  onClick={() => onNavigateToTab("interview")}
                  className="bg-[#F2EAD6] p-4 rounded-xl border-2 border-[#1E1B18] shadow-overworld hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] border-2 border-[#1E1B18] flex items-center justify-center text-[#FAF6EE] font-pixel text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-[#1E1B18] font-pixel">Voice Interview</h4>
                  <p className="text-xs text-[#1E1B18]/70">Practice spoken answers with Alex, our senior recruiter.</p>
                </div>

                <div 
                  onClick={() => onNavigateToTab("resume")}
                  className="bg-[#F2EAD6] p-4 rounded-xl border-2 border-[#1E1B18] shadow-overworld hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D9822B] border-2 border-[#1E1B18] flex items-center justify-center text-[#FAF6EE] font-pixel text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-[#1E1B18] font-pixel">ATS Resume</h4>
                  <p className="text-xs text-[#1E1B18]/70">Auto-generate a clean, recruiter-compliant PDF resume.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Social & Coding Links */}
          <div className="space-y-6">
            <div className="bg-[#FAF6EE] rounded-2xl p-6 border-2 border-[#1E1B18] shadow-overworld space-y-4">
              <h3 className="text-xs font-pixel text-[#1E1B18] uppercase tracking-wider">
                DEVELOPER & SOCIAL LINKS
              </h3>
              <div className="space-y-3">
                <a
                  href={formData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border-2 border-[#1E1B18] bg-[#F2EAD6] hover:bg-[#EAE0CA] shadow-overworld transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#1E1B18]" />
                    <div>
                      <span className="text-xs font-pixel text-[#1E1B18] block">GitHub Profile</span>
                      <span className="text-xs text-[#1E1B18]/70 font-mono truncate max-w-[160px] block">
                        {formData.githubUrl.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1E1B18]/50 group-hover:text-[#1E1B18]" />
                </a>

                <a
                  href={formData.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border-2 border-[#1E1B18] bg-[#F2EAD6] hover:bg-[#EAE0CA] shadow-overworld transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#2A6F97]" />
                    <div>
                      <span className="text-xs font-pixel text-[#1E1B18] block">LinkedIn Profile</span>
                      <span className="text-xs text-[#1E1B18]/70 font-mono truncate max-w-[160px] block">
                        {formData.linkedinUrl.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1E1B18]/50 group-hover:text-[#2A6F97]" />
                </a>

                <a
                  href={formData.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border-2 border-[#1E1B18] bg-[#F2EAD6] hover:bg-[#EAE0CA] shadow-overworld transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-[#D9822B]" />
                    <div>
                      <span className="text-xs font-pixel text-[#1E1B18] block">LeetCode Profile</span>
                      <span className="text-xs text-[#1E1B18]/70 font-mono truncate max-w-[160px] block">
                        {formData.leetcodeUrl.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1E1B18]/50 group-hover:text-[#D9822B]" />
                </a>

                {formData.portfolioUrl && (
                  <a
                    href={formData.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border-2 border-[#1E1B18] bg-[#F2EAD6] hover:bg-[#EAE0CA] shadow-overworld transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-[#2D6A4F]" />
                      <div>
                        <span className="text-xs font-pixel text-[#1E1B18] block">Portfolio Website</span>
                        <span className="text-xs text-[#1E1B18]/70 font-mono truncate max-w-[160px] block">
                          {formData.portfolioUrl.replace("https://", "")}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1E1B18]/50 group-hover:text-[#2D6A4F]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SKILLS & TECH STACK */}
      {activeTab === "skills" && (
        <div className="bg-[#FAF6EE] rounded-2xl p-6 border-2 border-[#1E1B18] shadow-overworld space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1E1B18]/20 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#1E1B18] font-display">
                Skills & Technical Competencies
              </h3>
              <p className="text-xs text-[#1E1B18]/70">
                Add, remove, or organize programming languages, frameworks, and tools you have practiced.
              </p>
            </div>

            {/* Add Skill Input Form */}
            <form onSubmit={handleAddSkill} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Docker, TypeScript..."
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                className="text-xs px-3.5 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D9822B] w-48 sm:w-56 font-mono"
              />
              <button
                type="submit"
                className="uiverse-btn-tactile bg-[#2D6A4F] hover:bg-[#255740] text-white text-xs font-pixel px-3 py-2 rounded-xl flex items-center gap-1 shadow-overworld border-2 border-[#1E1B18] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Interactive Skill Pills */}
          <div className="space-y-3">
            <span className="text-xs font-pixel uppercase text-[#1E1B18]/60 block">
              ACTIVE SKILL PILLS ({skills.length})
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-[#F2EAD6] hover:bg-[#EAE0CA] border-2 border-[#1E1B18] text-[#1E1B18] text-xs font-mono font-semibold px-3 py-1.5 rounded-xl shadow-overworld transition-all"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#1E1B18]/50 hover:text-[#BA3B46] ml-0.5 rounded-full p-0.5 transition-colors"
                    title={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="pt-4 border-t-2 border-[#1E1B18]/20 space-y-2">
            <span className="text-xs text-[#1E1B18]/70 font-pixel block">
              Quick Suggestions to Add:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript", "PostgreSQL", "FastAPI", "Docker", "Tailwind CSS", "MongoDB", "Redux", "Linux", "PyTorch", "GraphQL"]
                .filter(s => !skills.includes(s))
                .map(suggested => (
                  <button
                    key={suggested}
                    onClick={() => {
                      const updated = [...skills, suggested];
                      setSkills(updated);
                      if (user) onUpdateUser({ ...user, skillsList: updated });
                    }}
                    className="text-xs bg-[#FAF6EE] hover:bg-[#EAE0CA] border-2 border-[#1E1B18] text-[#1E1B18] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-mono shadow-xs"
                  >
                    <Plus className="w-3 h-3 text-[#2D6A4F]" />
                    <span>{suggested}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E1B18] font-display">
                Featured Engineering Projects
              </h3>
              <p className="text-xs text-[#1E1B18]/70">
                Showcase your hands-on code to recruiters and hiring managers.
              </p>
            </div>
            <button
              onClick={() => setNewProjectModal(true)}
              className="uiverse-btn-tactile bg-[#1E1B18] hover:bg-[#2D2A26] text-[#FAF6EE] text-xs font-pixel px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-overworld border-2 border-[#1E1B18] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-[#1E1B18] rounded-2xl bg-[#FAF6EE]">
              <Code2 className="w-10 h-10 text-[#1E1B18]/40 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-[#1E1B18] font-pixel">No Projects Added Yet</h4>
              <p className="text-xs text-[#1E1B18]/70 max-w-md mx-auto mt-1 mb-4">
                Add your personal, academic, or hackathon projects to showcase your practical skills. These will also sync directly with your AI Resume Builder!
              </p>
              <button
                type="button"
                onClick={() => setNewProjectModal(true)}
                className="uiverse-btn-tactile inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D6A4F] hover:bg-[#255740] text-white rounded-xl text-xs font-pixel shadow-overworld border-2 border-[#1E1B18] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6EE] rounded-2xl p-5 border-2 border-[#1E1B18] shadow-overworld hover:shadow-overworld-lg transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#1E1B18] font-display">{proj.title}</h4>
                      <div className="flex items-center gap-1.5">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[#1E1B18]/60 hover:text-[#1E1B18] p-1">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(idx)}
                          className="text-[#1E1B18]/50 hover:text-[#BA3B46] p-1 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#1E1B18]/80 leading-relaxed mt-1.5">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t-2 border-[#1E1B18]/20">
                    {proj.techStack.map(tech => (
                      <span key={tech} className="text-xs bg-[#F2EAD6] text-[#1E1B18] border border-[#1E1B18]/40 font-medium px-2 py-0.5 rounded-md font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Project Modal */}
          {newProjectModal && (
            <div className="fixed inset-0 z-50 bg-[#1E1B18]/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#FAF6EE] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-overworld-lg border-2 border-[#1E1B18] animate-scaleUp">
                <div className="flex items-center justify-between border-b-2 border-[#1E1B18]/20 pb-3">
                  <h3 className="text-sm font-bold text-[#1E1B18] font-pixel">ADD NEW PROJECT</h3>
                  <button onClick={() => setNewProjectModal(false)} className="text-[#1E1B18]/60 hover:text-[#1E1B18]">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddProject} className="space-y-3">
                  <div>
                    <label className="text-xs font-pixel text-[#1E1B18] block mb-1">PROJECT TITLE</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Key-Value Store"
                      value={newProjectTitle}
                      onChange={e => setNewProjectTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-pixel text-[#1E1B18] block mb-1">DESCRIPTION</label>
                    <textarea
                      rows={3}
                      placeholder="What does it build, solve, or demonstrate?"
                      value={newProjectDesc}
                      onChange={e => setNewProjectDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-pixel text-[#1E1B18] block mb-1">TECH STACK (COMMA-SEPARATED)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Go, PostgreSQL, Redis"
                      value={newProjectTech}
                      onChange={e => setNewProjectTech(e.target.value)}
                      className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-pixel text-[#1E1B18] block mb-1">GITHUB / REPO URL (OPTIONAL)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/your-username/repo"
                      value={newProjectGithub}
                      onChange={e => setNewProjectGithub(e.target.value)}
                      className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setNewProjectModal(false)}
                      className="uiverse-btn-tactile text-xs px-4 py-2 border-2 border-[#1E1B18] bg-[#FAF6EE] hover:bg-[#EAE0CA] rounded-xl text-[#1E1B18] font-pixel shadow-overworld"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="uiverse-btn-tactile bg-[#2D6A4F] hover:bg-[#255740] text-white text-xs font-pixel px-4 py-2 rounded-xl shadow-overworld border-2 border-[#1E1B18]"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-[#FAF6EE] rounded-2xl p-6 border-2 border-[#1E1B18] shadow-overworld space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#1E1B18] font-display">
              Account & Placement Preferences
            </h3>
            <p className="text-xs text-[#1E1B18]/70">
              Manage your personal data, reset assessment states, or export your placement portfolio.
            </p>
          </div>

          <div className="space-y-4 divide-y-2 divide-[#1E1B18]/20">
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-pixel text-[#1E1B18] block">DOWNLOAD PROFILE DATA</span>
                <span className="text-xs text-[#1E1B18]/70">Export your diagnostic scores and verified skills as a JSON report.</span>
              </div>
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user || formData, null, 2));
                  const dlAnchor = document.createElement("a");
                  dlAnchor.setAttribute("href", dataStr);
                  dlAnchor.setAttribute("download", `${formData.username}_placement_profile.json`);
                  dlAnchor.click();
                }}
                className="uiverse-btn-tactile bg-[#F2EAD6] hover:bg-[#EAE0CA] text-[#1E1B18] text-xs font-pixel px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 border-2 border-[#1E1B18] shadow-overworld"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-pixel text-[#1E1B18] block">RETAKE DIAGNOSTIC TEST</span>
                <span className="text-xs text-[#1E1B18]/70">Reset your diagnostic score to retake the foundational test with new questions.</span>
              </div>
              <button
                onClick={() => onNavigateToTab("report")}
                className="uiverse-btn-tactile bg-[#2A6F97] hover:bg-[#205372] text-white text-xs font-pixel px-3.5 py-2 rounded-xl border-2 border-[#1E1B18] shadow-overworld"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E1B18]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6EE] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-overworld-lg border-2 border-[#1E1B18] my-8 animate-scaleUp">
            <div className="flex items-center justify-between border-b-2 border-[#1E1B18]/20 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#2A6F97]" />
                <h3 className="text-base font-bold text-[#1E1B18] font-pixel">EDIT STUDENT PROFILE</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#1E1B18]/60 hover:text-[#1E1B18]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">FULL NAME</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">USERNAME (@)</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">HEADLINE / BIO</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">COLLEGE / UNIVERSITY</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">GRADUATION YEAR</label>
                  <input
                    type="text"
                    value={formData.graduationYear}
                    onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">TARGET CTC BAND</label>
                  <input
                    type="text"
                    value={formData.targetCtc}
                    onChange={e => setFormData({ ...formData, targetCtc: e.target.value })}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">GITHUB PROFILE URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">LINKEDIN PROFILE URL</label>
                <input
                  type="text"
                  value={formData.linkedinUrl}
                  onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-pixel text-[#1E1B18] block mb-1">LEETCODE PROFILE URL</label>
                <input
                  type="text"
                  value={formData.leetcodeUrl}
                  onChange={e => setFormData({ ...formData, leetcodeUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 border-2 border-[#1E1B18] bg-[#F2EAD6] text-[#1E1B18] rounded-xl focus:ring-2 focus:ring-[#D9822B] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-[#1E1B18]/20">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="uiverse-btn-tactile text-xs px-4 py-2 border-2 border-[#1E1B18] bg-[#FAF6EE] hover:bg-[#EAE0CA] rounded-xl text-[#1E1B18] font-pixel shadow-overworld"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="uiverse-btn-tactile bg-[#2D6A4F] hover:bg-[#255740] text-white text-xs font-pixel px-4 py-2 rounded-xl shadow-overworld border-2 border-[#1E1B18]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
