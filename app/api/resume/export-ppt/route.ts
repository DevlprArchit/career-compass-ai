import { NextRequest, NextResponse } from "next/server";
import pptxgen from "pptxgenjs";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { resumeData, selectedTrackTitle } = await req.json();

    if (!resumeData) {
      return NextResponse.json({ error: "Missing resume data." }, { status: 400 });
    }

    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    pres.author = resumeData.personalInfo?.name || "Candidate";
    pres.company = "CareerCompass AI";
    pres.title = `${resumeData.personalInfo?.name || "Candidate"} - Engineering Portfolio Resume`;

    const trackTitle = selectedTrackTitle || "Software Engineer";

    // SLIDE 1: Executive Profile & Technical Competencies
    const slide1 = pres.addSlide();
    slide1.background = { color: "FAF8F3" };

    // Header Banner Box
    slide1.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 0.5, w: 12.1, h: 1.3,
      fill: { color: "1E1B18" }, line: { color: "D9822B", width: 2 }, rectRadius: 0.1
    });
    slide1.addText(resumeData.personalInfo?.name || "Candidate Name", {
      x: 0.9, y: 0.65, w: 11.5, h: 0.55,
      fontSize: 24, bold: true, color: "FAF6EE", fontFace: "Arial"
    });
    const contactRow = [
      trackTitle,
      resumeData.personalInfo?.email,
      resumeData.personalInfo?.phone,
      resumeData.personalInfo?.location,
      resumeData.personalInfo?.linkedin ? "LinkedIn: " + resumeData.personalInfo.linkedin : "",
      resumeData.personalInfo?.github ? "GitHub: " + resumeData.personalInfo.github : ""
    ].filter(Boolean).join("  •  ");
    slide1.addText(contactRow, {
      x: 0.9, y: 1.2, w: 11.5, h: 0.45,
      fontSize: 11, color: "EAE0CA", fontFace: "Arial"
    });

    // Executive Summary Card
    slide1.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 2.1, w: 12.1, h: 1.8,
      fill: { color: "FFFFFF" }, line: { color: "1E1B18", width: 1.5 }, rectRadius: 0.1
    });
    slide1.addText("EXECUTIVE PROFESSIONAL SUMMARY", {
      x: 0.9, y: 2.25, w: 11.5, h: 0.35,
      fontSize: 11, bold: true, color: "D9822B", fontFace: "Arial"
    });
    slide1.addText(resumeData.summary || "Results-driven engineer specializing in production development, algorithmic problem solving, and modern cloud architectures.", {
      x: 0.9, y: 2.65, w: 11.5, h: 1.1,
      fontSize: 12, color: "2D2A26", fontFace: "Arial", lineSpacingMultiple: 1.25
    });

    // Skills Matrix Card
    slide1.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 4.2, w: 12.1, h: 2.5,
      fill: { color: "FFFFFF" }, line: { color: "1E1B18", width: 1.5 }, rectRadius: 0.1
    });
    slide1.addText("CORE TECHNICAL COMPETENCIES & STACK", {
      x: 0.9, y: 4.35, w: 11.5, h: 0.35,
      fontSize: 11, bold: true, color: "2D6A4F", fontFace: "Arial"
    });
    const allSkills = (resumeData.skills || []).length > 0
      ? resumeData.skills.join("   •   ")
      : "Python • JavaScript • TypeScript • Next.js • Tailwind CSS • SQL • Git • REST APIs";
    slide1.addText(allSkills, {
      x: 0.9, y: 4.8, w: 11.5, h: 1.7,
      fontSize: 12, color: "1E1B18", fontFace: "Arial", lineSpacingMultiple: 1.3
    });

    // SLIDE 2: Engineering Projects & Experience
    const slide2 = pres.addSlide();
    slide2.background = { color: "FAF8F3" };
    slide2.addText("PROJECTS & PRODUCTION EXPERIENCE", {
      x: 0.6, y: 0.5, w: 12.1, h: 0.5,
      fontSize: 20, bold: true, color: "1E1B18", fontFace: "Arial"
    });

    let projectY = 1.2;
    const projectsToExport = (resumeData.projects || []).slice(0, 3);
    if (projectsToExport.length === 0) {
      projectsToExport.push({
        name: `${trackTitle} Full-Stack Architecture`,
        techStack: "Python, Next.js, PostgreSQL, Docker",
        bullets: [
          "Architected full-lifecycle production software handling concurrent asynchronous queries.",
          "Designed high-performance API endpoints and secure authentication flows."
        ]
      });
    }

    projectsToExport.forEach((proj: any) => {
      slide2.addShape(pres.ShapeType.roundRect, {
        x: 0.6, y: projectY, w: 12.1, h: 1.6,
        fill: { color: "FFFFFF" }, line: { color: "1E1B18", width: 1.2 }, rectRadius: 0.1
      });
      slide2.addText(`${proj.name}   [${proj.techStack || "Core Stack"}]`, {
        x: 0.9, y: projectY + 0.12, w: 11.5, h: 0.35,
        fontSize: 13, bold: true, color: "1E1B18", fontFace: "Arial"
      });
      const bulletsText = (proj.bullets || [])
        .filter(Boolean)
        .map((b: string) => `•  ${b}`)
        .join("\n") || "• Built and deployed production software modules with measurable performance gains.";
      slide2.addText(bulletsText, {
        x: 0.9, y: projectY + 0.5, w: 11.5, h: 0.95,
        fontSize: 10.5, color: "4B453D", fontFace: "Arial", lineSpacingMultiple: 1.2
      });
      projectY += 1.8;
    });

    // SLIDE 3: Education, Credentials & AWS Student Builder Recognition
    const slide3 = pres.addSlide();
    slide3.background = { color: "FAF8F3" };
    slide3.addText("ACADEMIC FOUNDATIONS & VERIFIED CREDENTIALS", {
      x: 0.6, y: 0.5, w: 12.1, h: 0.5,
      fontSize: 20, bold: true, color: "1E1B18", fontFace: "Arial"
    });

    // Academic Background
    slide3.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 1.2, w: 12.1, h: 1.6,
      fill: { color: "FFFFFF" }, line: { color: "1E1B18", width: 1.2 }, rectRadius: 0.1
    });
    slide3.addText("EDUCATION & DEGREE", {
      x: 0.9, y: 1.35, w: 11.5, h: 0.35,
      fontSize: 11, bold: true, color: "D9822B", fontFace: "Arial"
    });
    const eduLines = (resumeData.education || []).map((e: any) => 
      `• ${e.degree} — ${e.institution} (${e.duration}) ${e.score ? `[CGPA/GPA: ${e.score}]` : ""}`
    ).join("\n") || "• Bachelor of Technology in Computer Science & Engineering";
    slide3.addText(eduLines, {
      x: 0.9, y: 1.75, w: 11.5, h: 0.9,
      fontSize: 11.5, color: "1E1B18", fontFace: "Arial"
    });

    // Certifications Card
    slide3.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 3.1, w: 12.1, h: 2.4,
      fill: { color: "FFFFFF" }, line: { color: "1E1B18", width: 1.2 }, rectRadius: 0.1
    });
    slide3.addText("ACCREDITED CERTIFICATIONS & AWS STUDENT BUILDER DISTINCTION", {
      x: 0.9, y: 3.25, w: 11.5, h: 0.35,
      fontSize: 11, bold: true, color: "2D6A4F", fontFace: "Arial"
    });
    const certLines = (resumeData.certifications || []).map((c: string) => `✓  ${c}`).join("\n") 
      || "✓  AWS Skill Builder Cloud Practitioner Essentials\n✓  Python Data Structures & Algorithms Mastery";
    slide3.addText(certLines, {
      x: 0.9, y: 3.7, w: 11.5, h: 1.2,
      fontSize: 11, color: "1E1B18", fontFace: "Arial", lineSpacingMultiple: 1.2
    });

    // Attribution footer badge in presentation
    slide3.addText("Official Participant: AWS Student Builder Program • Led by Archit Sharma (Campus Leader, HIET Shahpur)", {
      x: 0.9, y: 5.1, w: 11.5, h: 0.35,
      fontSize: 10, italic: true, bold: true, color: "D9822B", fontFace: "Arial"
    });

    const buffer = await pres.write({ outputType: "nodebuffer" }) as Buffer;

    const candidateSlug = (resumeData.personalInfo?.name || "Candidate").trim().replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${candidateSlug}_Executive_Resume.pptx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": buffer.length.toString(),
      }
    });
  } catch (error) {
    console.error("Failed to generate PPTX:", error);
    return NextResponse.json({ error: "Failed to generate PPTX presentation." }, { status: 500 });
  }
}
