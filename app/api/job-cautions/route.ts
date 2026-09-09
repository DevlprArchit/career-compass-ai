import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const { jobText } = body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && jobText) {
    const candidateModels = ["gemini-3.6-flash"];
    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { 
            responseMimeType: "application/json",
            temperature: 0.1
          }
        });

        const prompt = `You are the CareerCompass Placement Protection & Job Scam Detection AI.
Analyze this job posting specification intended for college students or freshers:

Posting Text:
"""${jobText}"""

TASK:
1. Scan for critical red flags:
   - Upfront deposit, equipment fees, or registration costs (HIGH SCAM RISK).
   - Ghost listing indicators or vague company identity.
   - Chronologically impossible fresher requirements (e.g. 5+ years in ChatGPT/LLMs).
   - Uncompensated multi-week trial work or predatory training bonds.
2. Compute an overall Scam Risk Score from 0 to 100:
   - 0 - 25: Low Risk / Standard Posting
   - 26 - 65: Moderate Caution / Suspicious terms
   - 66 - 100: High Risk Scam / Predatory

Return ONLY a JSON object strictly matching this schema:
{
  "riskScore": 85,
  "riskLevel": "High Risk Scam" | "Moderate Caution" | "Verified Low Risk",
  "actionRecommendation": "1-2 sentences on exactly how the student should respond",
  "warnings": [
    {
      "type": "string category name",
      "severity": "high" | "medium",
      "detail": "concise explanation of the specific red flag"
    }
  ]
}`;

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 12s")), 12000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const parsed = JSON.parse(result.response.text());
        if (parsed.warnings && parsed.warnings.length > 0) {
          return NextResponse.json(parsed);
        }
      } catch (error: any) {
        console.warn(`Gemini job cautions model ${modelName} error:`, error.message);
      }
    }
  }

  // Heuristic Fallback
  const text = (jobText || "").toLowerCase();
  const warnings: { type: string; severity: 'high' | 'medium'; detail: string }[] = [];
  let riskScore = 12;

  if (text.includes("fee") || text.includes("wire") || text.includes("deposit") || text.includes("pay") || text.includes("registration") || text.includes("transfer")) {
    riskScore = 92;
    warnings.push({
      type: "Upfront Fee / Wire Transfer Scam",
      severity: "high",
      detail: "Demanding upfront deposits, hardware fees, or paid registration is a verified predatory scam. Legitimate tech employers never demand money from candidates."
    });
  }

  if ((text.includes("5+") || text.includes("8+") || text.includes("10+")) && (text.includes("chatgpt") || text.includes("langchain") || text.includes("generative ai") || text.includes("fresher"))) {
    riskScore = Math.max(riskScore, 65);
    warnings.push({
      type: "Chronologically Impossible Fresher Demands",
      severity: "medium",
      detail: "Requiring 5+ years in modern generative AI and LLMs for fresher roles is an indicator of an unrealistic or copy-pasted ghost job listing."
    });
  }

  if (warnings.length === 0) {
    warnings.push({
      type: "Clean Specification Review",
      severity: "medium",
      detail: "No conspicuous upfront fee demands, wire transfers, or extreme chronological contradictions detected."
    });
  }

  const riskLevel = riskScore >= 66 ? "High Risk Scam" : (riskScore >= 26 ? "Moderate Caution" : "Verified Low Risk");

  return NextResponse.json({
    riskScore,
    riskLevel,
    actionRecommendation: riskScore >= 66 
      ? "Do NOT share personal financial information or transfer any funds. Report this recruiter to your university placement cell."
      : "Standard job description format. Ensure you clarify compensation structure and mentor support during preliminary recruiter calls.",
    warnings
  });
}
