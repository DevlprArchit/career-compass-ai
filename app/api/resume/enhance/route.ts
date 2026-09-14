import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ACTIVE_GEMINI_MODELS } from "@/lib/gemini-safe-json";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { section, text, role } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided for enhancement." }, { status: 400 });
    }

    if (!genAI) {
      // Fallback enhancement if API key is not configured
      const polishedFallback = section === "summary"
        ? `Results-driven software engineer targeting ${role || "tech roles"}, demonstrating strong analytical thinking, hands-on development experience, and consistent problem-solving skills across modern frameworks.`
        : `Architected and implemented core modules for ${text.trim()}, improving performance, test coverage, and reliability across modern production workflows.`;

      return NextResponse.json({ polished: polishedFallback });
    }

    let polished = "";

    const prompt = `You are an elite Tech Resume Editor & Career Consultant from Draftline AI.
Your task is to rewrite and polish the following candidate resume ${section === "summary" ? "Professional Summary" : "Bullet Point"} for a candidate targeting: "${role || "Software Engineer"}".

ORIGINAL TEXT:
"${text}"

RULES:
1. Start bullet points with strong action verbs (e.g., "Architected", "Engineered", "Optimized", "Spearheaded").
2. Include quantifiable impact or technical context where appropriate.
3. Make it concise, punchy, and highly appealing to both ATS parsers and hiring managers.
4. Return ONLY the enhanced text without quotation marks, markdown headings, or conversational pleasantries.`;

    for (const modelName of ACTIVE_GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 12s")), 12000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        polished = result.response.text().trim().replace(/^["']|["']$/g, "");
        if (polished) break;
      } catch (err) {
        console.warn(`Resume enhance fallback from ${modelName}:`, err);
      }
    }

    if (!polished) {
      polished = section === "summary"
        ? `Accomplished engineer specializing in ${role || "high-impact technology"}, recognized for designing scalable architectures, accelerating feature delivery, and implementing resilient coding standards.`
        : `Architected and optimized high-performance components for ${text.trim()}, reducing execution overhead and ensuring seamless integration with production services.`;
    }

    return NextResponse.json({ polished });
  } catch (error: any) {
    console.warn("Resume enhance API error:", error);
    return NextResponse.json({ 
      polished: "Engineered scalable software solutions with clean architecture, robust testing, and modern industry standards." 
    });
  }
}
