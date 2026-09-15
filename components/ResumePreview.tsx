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
    : "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  // Template-specific style modifiers
  const isCompact = tmpl === "compact";
  const isMinimal = tmpl === "minimal";
  const isClassic = tmpl === "classic";

  return (
    <div 
      id="resume-print-area"
      className={`ats-resume-sheet bg-white text-[#151E33] shadow-lg rounded-sm border border-[#E8EAE4] min-h-[1050px] w-full max-w-[820px] mx-auto p-8 sm:p-12 transition-all ${className}`}
      style={{
        fontFamily,
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        color: "#151E33",
        lineHeight: 1.45
      }}
    >
      {/* Decorative Accent Line for Modern Template */}
      {tmpl === "modern" && (
        <div 
          className="ats-accent-bar w-full h-1.5 mb-6 rounded-full" 
          style={{ backgroundColor: accentColor, height: "4px", marginBottom: "16px", borderRadius: "9999px" }}
        />
      )}

      {/* HEADER SECTION */}
      <header 
        className={`ats-header pb-4 border-b border-gray-200 ${isMinimal ? "text-left" : "text-center"}`}
        style={{
          borderBottom: "1.5px solid #E5E7EB",
          paddingBottom: "12px",
          textAlign: isMinimal ? "left" : "center"
        }}
      >
        <h1 
          className={`ats-candidate-name font-semibold tracking-tight ${
            isClassic ? "font-display text-3xl" : isCompact ? "text-2xl" : "text-3xl"
          }`}
          style={{
            margin: "0 0 6px 0",
            fontSize: isCompact ? "20pt" : "24pt",
            fontWeight: 700,
            color: isMinimal ? "#151E33" : accentColor,
            letterSpacing: "-0.02em"
          }}
        >
          {data.personalInfo.name || "Your Full Name"}
        </h1>

        <div 
          className="ats-contact-row flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-2 font-mono"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: isMinimal ? "flex-start" : "center",
            gap: "4px 10px",
            fontSize: "9.5pt",
            color: "#4B5563",
            fontFamily: "monospace, Courier, sans-serif"
          }}
        >
          {data.personalInfo.email && <span className="ats-contact-item">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="ats-contact-item">• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="ats-contact-item">• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && (
            <span className="ats-contact-item">• <span className="underline">{data.personalInfo.linkedin}</span></span>
          )}
          {data.personalInfo.github && (
            <span className="ats-contact-item">• <span className="underline">{data.personalInfo.github}</span></span>
          )}
          {data.personalInfo.portfolio && (
            <span className="ats-contact-item">• <span className="underline">{data.personalInfo.portfolio}</span></span>
          )}
        </div>
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {data.summary && (
        <section className="ats-section mt-5" style={{ marginTop: "16px", pageBreakInside: "avoid" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Professional Summary
          </h2>
          <p 
            className="ats-summary-text text-xs sm:text-[13px] text-gray-700 leading-relaxed"
            style={{
              fontSize: "10pt",
              color: "#374151",
              lineHeight: 1.5,
              margin: 0
            }}
          >
            {data.summary}
          </p>
        </section>
      )}

      {/* TECHNICAL & PROFESSIONAL SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section className="ats-section mt-5" style={{ marginTop: "16px", pageBreakInside: "avoid" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Core Competencies & Skills
          </h2>
          <div 
            className="ats-skills-wrap flex flex-wrap gap-1.5 pt-0.5"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              paddingTop: "2px"
            }}
          >
            {data.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="ats-skill-badge text-[11px] font-mono px-2.5 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200"
                style={{
                  fontSize: "9pt",
                  fontFamily: "monospace, Courier, sans-serif",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  backgroundColor: "#F3F4F6",
                  color: "#1F2937",
                  border: "1px solid #E5E7EB",
                  display: "inline-block"
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* WORK & PRACTICAL EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section className="ats-section mt-5" style={{ marginTop: "16px" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-3 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Work & Practical Experience
          </h2>
          <div className="ats-experience-list space-y-3.5" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="ats-item" style={{ pageBreakInside: "avoid" }}>
                <div 
                  className="ats-item-header flex justify-between items-baseline text-xs sm:text-[13px]"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "3px"
                  }}
                >
                  <div className="ats-item-title">
                    <span className="font-bold text-gray-900" style={{ fontWeight: 700, color: "#111827", fontSize: "10.5pt" }}>
                      {exp.role}
                    </span>
                    {exp.company && (
                      <span className="text-gray-600 font-medium" style={{ color: "#4B5563", fontSize: "10pt" }}>
                        {" "}— {exp.company}
                      </span>
                    )}
                  </div>
                  <span 
                    className="ats-item-date font-mono text-[11px] text-gray-500 shrink-0 ml-2"
                    style={{
                      fontSize: "9pt",
                      color: "#6B7280",
                      fontFamily: "monospace, Courier, sans-serif",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {exp.duration}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul 
                    className="ats-bullets list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12px] text-gray-700 leading-normal"
                    style={{
                      margin: "4px 0 0 0",
                      paddingLeft: "18px",
                      listStyleType: "disc",
                      fontSize: "9.5pt",
                      color: "#374151",
                      lineHeight: 1.45
                    }}
                  >
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: "2px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PROJECTS & PRACTICAL WORK */}
      {data.projects && data.projects.length > 0 && (
        <section className="ats-section mt-5" style={{ marginTop: "16px" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-3 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Featured Projects & Practical Work
          </h2>
          <div className="ats-projects-list space-y-3.5" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="ats-item" style={{ pageBreakInside: "avoid" }}>
                <div 
                  className="ats-item-header flex justify-between items-baseline text-xs sm:text-[13px]"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "3px"
                  }}
                >
                  <div className="ats-item-title">
                    <span className="font-bold text-gray-900" style={{ fontWeight: 700, color: "#111827", fontSize: "10.5pt" }}>
                      {proj.name}
                    </span>
                    {proj.techStack && (
                      <span 
                        className="text-gray-500 font-mono text-[11px]"
                        style={{ color: "#6B7280", fontSize: "9pt", fontFamily: "monospace, Courier, sans-serif" }}
                      >
                        {" "} | {proj.techStack}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span 
                      className="ats-item-link font-mono text-[11px] text-gray-500 underline ml-2"
                      style={{
                        fontSize: "9pt",
                        color: "#6B7280",
                        fontFamily: "monospace, Courier, sans-serif",
                        whiteSpace: "nowrap",
                        textDecoration: "underline"
                      }}
                    >
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul 
                    className="ats-bullets list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12px] text-gray-700 leading-normal"
                    style={{
                      margin: "4px 0 0 0",
                      paddingLeft: "18px",
                      listStyleType: "disc",
                      fontSize: "9.5pt",
                      color: "#374151",
                      lineHeight: 1.45
                    }}
                  >
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: "2px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION & ACADEMIC STANDING */}
      {data.education && data.education.length > 0 && (
        <section className="ats-section mt-5" style={{ marginTop: "16px", pageBreakInside: "avoid" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Education & Academic Background
          </h2>
          <div className="ats-education-list space-y-2" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {data.education.map((edu, idx) => (
              <div 
                key={idx} 
                className="ats-edu-item flex justify-between items-baseline text-xs sm:text-[13px]"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline"
                }}
              >
                <div>
                  <span className="font-bold text-gray-900" style={{ fontWeight: 700, color: "#111827", fontSize: "10pt" }}>
                    {edu.degree}
                  </span>
                  {edu.institution && (
                    <span className="text-gray-600" style={{ color: "#4B5563", fontSize: "10pt" }}>
                      , {edu.institution}
                    </span>
                  )}
                  {edu.score && (
                    <span 
                      className="text-gray-500 font-mono text-[11px]"
                      style={{ color: "#6B7280", fontSize: "9pt", fontFamily: "monospace, Courier, sans-serif" }}
                    >
                      {" "} (CGPA/Grade: {edu.score})
                    </span>
                  )}
                </div>
                <span 
                  className="font-mono text-[11px] text-gray-500 shrink-0 ml-2"
                  style={{
                    fontSize: "9pt",
                    color: "#6B7280",
                    fontFamily: "monospace, Courier, sans-serif",
                    whiteSpace: "nowrap"
                  }}
                >
                  {edu.duration}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VERIFIED INDUSTRY CERTIFICATIONS */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="ats-section mt-5" style={{ marginTop: "16px", pageBreakInside: "avoid" }}>
          <h2 
            className="ats-section-title text-xs font-mono uppercase tracking-widest font-bold pb-1 mb-2 border-b border-gray-150"
            style={{
              color: accentColor,
              borderBottom: "1.5px solid #E5E7EB",
              paddingBottom: "3px",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "10.5pt",
              fontWeight: 700,
              fontFamily: "monospace, Courier, sans-serif"
            }}
          >
            Verified Certifications & Credentials
          </h2>
          <ul 
            className="ats-bullets list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12px] text-gray-700"
            style={{
              margin: "4px 0 0 0",
              paddingLeft: "18px",
              listStyleType: "disc",
              fontSize: "9.5pt",
              color: "#374151"
            }}
          >
            {data.certifications.map((cert, idx) => (
              <li key={idx} style={{ marginBottom: "2px" }}>
                <span className="font-medium text-gray-800" style={{ color: "#1F2937" }}>{cert}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
