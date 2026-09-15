import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safeParseLLMJson, ACTIVE_GEMINI_MODELS } from "@/lib/gemini-safe-json";

interface QuestionAnswerSummary {
  questionId: string;
  category: string;
  question: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
}

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const {
    degree,
    semester,
    cgpaBand,
    codingExperience,
    dsaCount,
    trade,
    tradeId,
    targetCompanyTier,
    placementTimeline,
    weeklyHours,
    answers: rawAnswers = []
  } = body;

  const answers: QuestionAnswerSummary[] = Array.isArray(rawAnswers) ? rawAnswers : [];
  const totalQuestions = answers.length || 6;
  const correctCount = answers.filter((a: QuestionAnswerSummary) => a.isCorrect).length;
  const diagnosticAccuracy = Math.round((correctCount / totalQuestions) * 100);

  // 1. Calculate Dynamic Algorithmic Baselines (Accurate, proportional mathematics)
  let dsaScore = 25;
  const dsaStr = String(dsaCount || "").toLowerCase();
  if (dsaStr.includes("150") || dsaStr.includes("100") || dsaStr.includes("75+")) dsaScore = 94;
  else if (dsaStr.includes("75") || dsaStr.includes("50-75") || dsaStr.includes("50")) dsaScore = 80;
  else if (dsaStr.includes("25") || dsaStr.includes("30") || dsaStr.includes("20-50")) dsaScore = 64;
  else if (dsaStr.includes("10") || dsaStr.includes("1-20")) dsaScore = 42;
  else dsaScore = 25;

  let expScore = 35;
  const expStr = String(codingExperience || "").toLowerCase();
  if (expStr.includes("advanced") || expStr.includes("production") || expStr.includes("3+")) expScore = 95;
  else if (expStr.includes("intermediate") || expStr.includes("1-2") || expStr.includes("moderate")) expScore = 72;
  else expScore = 38;

  let cgpaScore = 65;
  const cgpaStr = String(cgpaBand || "");
  if (cgpaStr.includes("9") || cgpaStr.includes("8.5")) cgpaScore = 94;
  else if (cgpaStr.includes("8") || cgpaStr.includes("7.5")) cgpaScore = 82;
  else if (cgpaStr.includes("7") || cgpaStr.includes("6.5")) cgpaScore = 68;
  else cgpaScore = 55;

  // Real, dynamic readiness calculation (scales from 28% to 96% based on actual performance)
  const calculatedReadinessScore = Math.min(
    96,
    Math.max(28, Math.round(0.40 * diagnosticAccuracy + 0.30 * dsaScore + 0.15 * cgpaScore + 0.15 * expScore))
  );
  const calculatedTradeFit = Math.min(
    96,
    Math.max(30, Math.round(0.55 * diagnosticAccuracy + 0.30 * expScore + 0.15 * dsaScore))
  );

  // Group correct and incorrect categories
  const correctCategories: string[] = answers
    .filter((a: QuestionAnswerSummary) => a.isCorrect)
    .map((a: QuestionAnswerSummary) => a.category || "");
  const incorrectCategories: string[] = answers
    .filter((a: QuestionAnswerSummary) => !a.isCorrect)
    .map((a: QuestionAnswerSummary) => a.category || "");

  // Default dynamic skill matrix heuristics
  const defaultSkillMatrix = [
    {
      name: "Core Syntax & Foundations",
      score: correctCategories.some((c: string) => c.toLowerCase().includes("syntax") || c.toLowerCase().includes("protocol") || c.toLowerCase().includes("foundations") || c.toLowerCase().includes("http")) ? 88 : 52,
      benchmark: 75,
      status: correctCategories.some((c: string) => c.toLowerCase().includes("syntax") || c.toLowerCase().includes("protocol") || c.toLowerCase().includes("foundations") || c.toLowerCase().includes("http")) ? "Strong" : "Focus Area"
    },
    {
      name: "Data Structures & Types",
      score: correctCategories.some((c: string) => c.toLowerCase().includes("structure") || c.toLowerCase().includes("tabular") || c.toLowerCase().includes("type") || c.toLowerCase().includes("json")) ? 84 : 58,
      benchmark: 70,
      status: correctCategories.some((c: string) => c.toLowerCase().includes("structure") || c.toLowerCase().includes("tabular") || c.toLowerCase().includes("type") || c.toLowerCase().includes("json")) ? "Strong" : "Focus Area"
    },
    {
      name: "Domain Architecture & Logic",
      score: correctCategories.some((c: string) => c.toLowerCase().includes("async") || c.toLowerCase().includes("flow") || c.toLowerCase().includes("sql") || c.toLowerCase().includes("docker")) ? 80 : 50,
      benchmark: 75,
      status: correctCategories.some((c: string) => c.toLowerCase().includes("async") || c.toLowerCase().includes("flow") || c.toLowerCase().includes("sql") || c.toLowerCase().includes("docker")) ? "Strong" : "Focus Area"
    },
    {
      name: "Algorithmic Problem Solving",
      score: Math.min(95, Math.max(30, Math.round(0.5 * diagnosticAccuracy + 0.5 * dsaScore))),
      benchmark: 70,
      status: dsaScore >= 70 ? "Strong" : dsaScore >= 45 ? "Adequate" : "Focus Area"
    },
    {
      name: "Real-World Best Practices",
      score: correctCount >= 4 ? 82 : 60,
      benchmark: 65,
      status: correctCount >= 4 ? "Strong" : "Adequate"
    }
  ];

  // Default heuristic trade feedback
  let fallbackStrength = correctCategories.length > 0
    ? `Demonstrated competency in ${correctCategories.slice(0, 2).join(" and ")}.`
    : "Demonstrated commitment to undergoing structured placement evaluation.";

  let fallbackGap = incorrectCategories.length > 0
    ? `Needs targeted study in ${incorrectCategories.slice(0, 2).join(" and ")} alongside hands-on DSA problem solving.`
    : (dsaScore < 50 ? "Requires consistent daily DSA practice (aiming for 50+ medium problems) to clear Tier-1 screening." : "Needs continuous project capstone development.");

  let fallbackAdvice = `Focus on the 12-week ${trade || "specialization"} curriculum. Dedicate ${weeklyHours || 15} hours/week to bridge identified gaps before the ${placementTimeline || "upcoming placement cycle"}.`;

  // 2. Call Gemini AI for Deep Personalized Synthesis
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    for (const modelName of ACTIVE_GEMINI_MODELS) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        });

        const prompt = `You are a Senior Placement Director & Career Coach calibrating a higher education student's actual placement readiness report.
CANDIDATE INTAKE PROFILE:
- Degree: ${degree} (${semester})
- CGPA Band: ${cgpaBand}
- Coding Background: ${codingExperience}
- Solved DSA Problems: ${dsaCount}
- Target Specialization: ${trade}
- Target Company Tier: ${targetCompanyTier}
- Placement Timeline: ${placementTimeline}

DIAGNOSTIC TEST RESULTS:
- Total Questions: ${totalQuestions}
- Correct Answers: ${correctCount} / ${totalQuestions} (${diagnosticAccuracy}%)
- Answered Correctly in: ${correctCategories.join(", ") || "None"}
- Missed Questions in: ${incorrectCategories.join(", ") || "None"}

PRE-CALCULATED BENCHMARK SCORES:
- Holistic Readiness Score: ${calculatedReadinessScore} / 100
- Trade Fit Index: ${calculatedTradeFit} / 100

TASK:
Synthesize an accurate, personalized placement diagnosis.
1. "primaryStrength": 1 concise sentence highlighting the specific topics they answered correctly or their academic assets.
2. "criticalGap": 1 concise sentence highlighting the specific technical concepts they missed and their DSA gap for their target company tier.
3. "placementAdvice": 1-2 practical sentences advising what to study over their ${placementTimeline} timeline to crack ${targetCompanyTier}.
4. "calibratedSkills": Array of 5 skill objects tailored to ${trade}, with "name", "score" (0-100 reflecting actual answers), "benchmark" (65-80), and "status" ("Strong" | "Adequate" | "Focus Area").

Return ONLY a valid JSON object matching this schema:
{
  "readinessScore": ${calculatedReadinessScore},
  "tradeFitIndex": ${calculatedTradeFit},
  "primaryStrength": "string",
  "criticalGap": "string",
  "placementAdvice": "string",
  "calibratedSkills": [
    { "name": "string", "score": 85, "benchmark": 75, "status": "Strong" }
  ]
}`;

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 25s")), 25000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const rawText = result.response.text();
        const parsed = safeParseLLMJson<any>(rawText, null);

        if (parsed) {
          return NextResponse.json({
            readinessScore: parsed.readinessScore || calculatedReadinessScore,
            tradeFitIndex: parsed.tradeFitIndex || calculatedTradeFit,
            primaryStrength: parsed.primaryStrength || fallbackStrength,
            criticalGap: parsed.criticalGap || fallbackGap,
            placementAdvice: parsed.placementAdvice || fallbackAdvice,
            calibratedSkills: parsed.calibratedSkills && parsed.calibratedSkills.length === 5 
              ? parsed.calibratedSkills 
              : defaultSkillMatrix,
            diagnosticAccuracy,
            correctCount,
            totalQuestions
          });
        }
      } catch (err: any) {
        console.warn(`Gemini evaluation error on ${modelName}:`, err.message);
      }
    }
  }

  // Fallback response with accurate algorithmic calculation
  return NextResponse.json({
    readinessScore: calculatedReadinessScore,
    tradeFitIndex: calculatedTradeFit,
    primaryStrength: fallbackStrength,
    criticalGap: fallbackGap,
    placementAdvice: fallbackAdvice,
    calibratedSkills: defaultSkillMatrix,
    diagnosticAccuracy,
    correctCount,
    totalQuestions
  });
}
