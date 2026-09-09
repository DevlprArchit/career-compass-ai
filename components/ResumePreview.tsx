"use client";

import React from "react";

export interface ResumeData {
  title?: string;
  template?: "modern" | "minimal" | "classic" | "compact";
  colorTheme?: "teal" | "navy" | "crimson" | "slate";
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio?: string;
  };
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    techStack: string;
    link?: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    duration: string;
    score?: string;
  }[];
  certifications: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
  className?: string;
}

export default function ResumePreview({ data, className = "" }: ResumePreviewProps) {
  const tmpl = data.template || "modern";

  const colorThemes = {
    teal: "#0F6E64",
    navy: "#12203A",
    crimson: "#BE123C",
    slate: "#334155"
  };

  const accentColor = colorThemes[data.colorTheme || "teal"] || colorThemes.teal;

  // Font family based on template
  const fontFamily = tmpl === "classic" 
    ? "Georgia, 'Times New Roman', serif" 
    : "var(--font-inter), system-ui, sans-serif";

  // Template-specific style modifiers
  const isCompact = tmpl === "compact";
  const isMinimal = tmpl === "minimal";
  const isClassic = tmpl === "classic";

  return (
    <div 
      id="resume-print-area"
      className={`bg-white text-[#151E33] shadow-lg rounded-sm border border-[#E8EAE4] min-h-[1050px] w-full max-w-[800px] mx-auto p-8 sm:p-12 transition-all ${className}`}
      style={{ fontFamily, "--accent-color": accentColor } as React.CSSProperties}
    >
      {/* Decorative Accent Line for Modern Template */}
      {tmpl === "modern" && (
        <div 
          className="w-full h-1.5 mb-6 rounded-full" 
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* HEADER SECTION */}
      <header className={`pb-4 border-b border-gray-200 ${isMinimal ? "text-left" : "text-center"}`}>
        <h1 
          className={`font-semibold tracking-tight text-ink ${
            isClassic ? "font-display text-3xl" : isCompact ? "text-2xl" : "text-3xl"
          }`}
          style={isMinimal ? {} : { color: accentColor }}
        >
          {data.personalInfo.name || "Your Full Name"}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-2 font-mono">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && (
            <span>• <span className="underline">{data.personalInfo.linkedin}</span></span>
          )}
          {data.personalInfo.github && (
            <span>• <span className="underline">{data.personalInfo.github}</span></span>
          )}
          {data.personalInfo.portfolio && (
            <span>• <span className="underline">{data.personalInfo.portfolio}</span></span>
          )}
        </div>
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {data.summary && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
            {data.summary}
          </p>
        </section>
      )}

      {/* TECHNICAL SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Technical Competencies & Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {data.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* WORK & INTERNSHIP EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-3 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Work & Practical Experience
          </h2>
          <div className="space-y-3.5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                  <div>
                    <span className="font-bold text-gray-900">{exp.role}</span>
                    {exp.company && <span className="text-gray-600 font-medium"> — {exp.company}</span>}
                  </div>
                  <span className="font-mono text-[11px] text-gray-500 shrink-0 ml-2">{exp.duration}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12px] text-gray-700 leading-normal">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KEY PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-3 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Engineering Projects & Capstones
          </h2>
          <div className="space-y-3.5">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                  <div>
                    <span className="font-bold text-gray-900">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-gray-500 font-mono text-[11px]"> | {proj.techStack}</span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="font-mono text-[11px] text-gray-500 underline ml-2">{proj.link}</span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12px] text-gray-700 leading-normal">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Education & Academic Standing
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-xs sm:text-[13px]">
                <div>
                  <span className="font-bold text-gray-900">{edu.degree}</span>
                  {edu.institution && <span className="text-gray-600">, {edu.institution}</span>}
                  {edu.score && <span className="text-gray-500 font-mono text-[11px]"> (CGPA/Grade: {edu.score})</span>}
                </div>
                <span className="font-mono text-[11px] text-gray-500 shrink-0 ml-2">{edu.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VERIFIED CERTIFICATIONS */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mt-5">
          <h2 
            className="text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{ color: accentColor }}
          >
            Verified Industry Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12px] text-gray-700">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>
                <span className="font-medium text-gray-800">{cert}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
