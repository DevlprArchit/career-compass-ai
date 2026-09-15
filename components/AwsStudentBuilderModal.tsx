"use client";

import React, { useState, useEffect } from "react";
import { 
  Award, 
  Sparkles, 
  Cloud, 
  Gift, 
  Users, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  DollarSign, 
  FileText, 
  Send, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { submitAwsLeaderApplication } from "@/lib/supabase/client";

interface AwsStudentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  initialCollege?: string;
  initialDegree?: string;
}

export default function AwsStudentBuilderModal({
  isOpen,
  onClose,
  initialName = "",
  initialEmail = "",
  initialCollege = "",
  initialDegree = ""
}: AwsStudentBuilderModalProps) {
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    college: initialCollege,
    degree: initialDegree,
    graduationYear: "2026",
    githubOrLinkedin: "",
    preferredTrack: "AWS Certified Cloud Practitioner (CLF-C02)",
    priorCloudExperience: "beginner",
    leadershipReason: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      // Check existing application in storage
      if (typeof window !== "undefined") {
        try {
          const savedApp = localStorage.getItem("careercompass_aws_application");
          if (savedApp) {
            const parsed = JSON.parse(savedApp);
            if (parsed.appId) {
              setSubmittedAppId(parsed.appId);
              return;
            }
          }
        } catch {}
      }

      setFormData(prev => ({
        ...prev,
        name: prev.name || initialName,
        email: prev.email || initialEmail,
        college: prev.college || initialCollege,
        degree: prev.degree || initialDegree
      }));
    }
  }, [isOpen, initialName, initialEmail, initialCollege, initialDegree]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.college.trim()) {
      alert("Please fill in your name, email, and college.");
      return;
    }

    setIsSubmitting(true);
    const appId = "AWS-HIET-" + Math.floor(1000 + Math.random() * 9000);

    const payload = {
      appId,
      ...formData,
      submittedAt: new Date().toISOString(),
      initiative: "AWS Student Builder Campus Leader",
      projectCredit: "Archit Sharma · Campus Leader, Himachal Institute of Engineering and Technology, Shahpur (HIET, Shahpur)"
    };

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("careercompass_aws_application", JSON.stringify(payload));
      } catch {}
    }

    // Save to Supabase
    try {
      await submitAwsLeaderApplication(payload);
    } catch (err) {
      console.warn("Supabase lead submission fallback:", err);
    }

    setIsSubmitting(false);
    setSubmittedAppId(appId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FAF8F3] rounded-2xl border-2 border-[#1E1B18] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#1E1B18] text-[#FAF8F3] flex items-start justify-between relative">
          <div className="space-y-1.5 pr-6">
            <div className="inline-flex items-center gap-2 bg-[#D9822B] text-white px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-bold font-pixel tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Campus Leader Opportunity</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-white">
              AWS Student Builder · Campus Group Leader
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF8F3]/80">
              <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
              <span className="font-medium text-[#FAF8F3]">
                An initiative led by <strong className="text-[#D9822B]">Archit Sharma</strong> · Campus Leader for Himachal Institute of Engineering and Technology, Shahpur (HIET, Shahpur)
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF8F3] transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {submittedAppId ? (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#2D6A4F]/10 border-2 border-[#2D6A4F] text-[#2D6A4F] mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full border border-[#2D6A4F]/20">
                  Application ID: {submittedAppId}
                </span>
                <h3 className="text-xl font-bold text-[#1E1B18] font-display pt-2">
                  Application Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#1E1B18]/70 max-w-md mx-auto">
                  Thank you for applying to the <strong>AWS Student Builder Campus Leader Initiative</strong>, an official program led by <strong>Archit Sharma</strong>, Campus Leader for Himachal Institute of Engineering and Technology, Shahpur (HIET, Shahpur).
                </p>
              </div>

              {/* Status Tracker */}
              <div className="bg-[#FAF6EE] p-4 rounded-xl border-2 border-[#1E1B18] text-left space-y-2.5 max-w-md mx-auto text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E1B18]">Review Status</span>
                  <span className="text-[#D9822B] font-bold">● In Review</span>
                </div>
                <div className="h-1.5 bg-[#EAE0CA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D9822B] w-2/3 rounded-full" />
                </div>
                <p className="text-[11px] text-[#1E1B18]/65 leading-relaxed">
                  Our coordinator team will review your college profile and dispatch swags, free AWS credits, and leader orientation details directly to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSubmittedAppId(null)}
                  className="px-4 py-2 text-xs font-bold text-[#1E1B18] border-2 border-[#1E1B18] rounded-xl bg-[#FAF6EE] hover:bg-[#EAE0CA]"
                >
                  Edit Application
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1E1B18] hover:bg-[#2D2A26] rounded-xl border-2 border-[#1E1B18]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <>
              {/* Perks Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                <div className="p-3 rounded-xl border-2 border-[#1E1B18] bg-[#FAF6EE] space-y-1 shadow-xs">
                  <Gift className="w-4 h-4 text-[#D9822B]" />
                  <h4 className="text-xs font-bold text-[#1E1B18]">AWS Goodies</h4>
                  <p className="text-[10px] text-[#1E1B18]/65">T-shirts, stickers, hoodies & bottles</p>
                </div>
                <div className="p-3 rounded-xl border-2 border-[#1E1B18] bg-[#FAF6EE] space-y-1 shadow-xs">
                  <Users className="w-4 h-4 text-[#2A6F97]" />
                  <h4 className="text-xs font-bold text-[#1E1B18]">Campus Leader</h4>
                  <p className="text-[10px] text-[#1E1B18]/65">Lead student cloud meetups & workshops</p>
                </div>
                <div className="p-3 rounded-xl border-2 border-[#1E1B18] bg-[#FAF6EE] space-y-1 shadow-xs">
                  <DollarSign className="w-4 h-4 text-[#2D6A4F]" />
                  <h4 className="text-xs font-bold text-[#1E1B18]">AWS Credits</h4>
                  <p className="text-[10px] text-[#1E1B18]/65">Free AWS account credits to deploy apps</p>
                </div>
                <div className="p-3 rounded-xl border-2 border-[#1E1B18] bg-[#FAF6EE] space-y-1 shadow-xs">
                  <Award className="w-4 h-4 text-[#BA3B46]" />
                  <h4 className="text-xs font-bold text-[#1E1B18]">Free Vouchers</h4>
                  <p className="text-[10px] text-[#1E1B18]/65">100% exam vouchers & official courses</p>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Archit Sharma"
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">Student Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="student@college.edu or gmail"
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">College / University *</label>
                    <input
                      type="text"
                      required
                      value={formData.college}
                      onChange={(e) => setFormData(p => ({ ...p, college: e.target.value }))}
                      placeholder="e.g. Institute of Technology"
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">Degree & Major</label>
                    <input
                      type="text"
                      value={formData.degree}
                      onChange={(e) => setFormData(p => ({ ...p, degree: e.target.value }))}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">LinkedIn or GitHub Profile</label>
                    <input
                      type="url"
                      value={formData.githubOrLinkedin}
                      onChange={(e) => setFormData(p => ({ ...p, githubOrLinkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/... or github.com/..."
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E1B18] block">Target AWS Track</label>
                    <select
                      value={formData.preferredTrack}
                      onChange={(e) => setFormData(p => ({ ...p, preferredTrack: e.target.value }))}
                      className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                    >
                      <option value="AWS Certified Cloud Practitioner (CLF-C02)">AWS Certified Cloud Practitioner (CLF-C02)</option>
                      <option value="AWS Certified Solutions Architect Associate (SAA-C03)">AWS Solutions Architect Associate (SAA-C03)</option>
                      <option value="AWS Certified Developer Associate">AWS Developer Associate</option>
                      <option value="Generative AI & Machine Learning on AWS (Bedrock)">Generative AI on AWS (Amazon Bedrock)</option>
                      <option value="Serverless & Cloud DevOps">Serverless & Cloud DevOps</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1B18] block">
                    Why would you like to become an AWS Student Builder Campus Leader? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.leadershipReason}
                    onChange={(e) => setFormData(p => ({ ...p, leadershipReason: e.target.value }))}
                    placeholder="Tell us about your passion for cloud, student developer communities, or projects you want to build on AWS..."
                    className="w-full text-xs p-2.5 rounded-xl border-2 border-[#1E1B18] bg-white text-[#1E1B18] focus:outline-none focus:ring-2 focus:ring-[#D9822B]"
                  />
                </div>

                {/* HIET Campus Leader Banner */}
                <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#1E1B18]/15 flex items-center justify-between text-[11px] text-[#1E1B18]/70">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    <span>Initiative led by <strong>Archit Sharma</strong> · Campus Leader, HIET Shahpur</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#2D6A4F] font-bold">100% Free Access</span>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-bold text-[#1E1B18] hover:bg-[#EAE0CA] rounded-xl border-2 border-[#1E1B18] bg-[#FAF6EE]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#D9822B] hover:bg-[#C07224] rounded-xl border-2 border-[#1E1B18] shadow-overworld flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Campus Leader Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
