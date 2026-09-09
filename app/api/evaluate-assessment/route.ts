import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

  // 1. Calculate Algorithmic Baselines (Guarantees mathematical accuracy)
  let dsaScore = 20;
  const dsaStr = String(dsaCount || "").toLowerCase();
  if (dsaStr.includes("75") || dsaStr.includes("150")) dsaScore = 95;
  else if (dsaStr.includes("30") || dsaStr.includes("50")) dsaScore = 65;
  else if (dsaStr.includes("10") || dsaStr.includes("20")) dsaScore = 40;

  let expScore = 25;
  const expStr = String(codingExperience || "").toLowerCase();
  if (expStr.includes("intermediate") || expStr.includes("1-2") || expStr.includes("moderate")) expScore = 70;
  else if (expStr.includes("advanced") || expStr.includes("production") || expStr.includes("3+")) expScore = 95;

  let cgpaScore = 60;
  const cgpaStr = String(cgpaBand || "");
  if (cgpaStr.includes("8.5") || cgpaStr.includes("9") || cgpaStr.includes("High")) cgpaScore = 90;
  else if (cgpaStr.includes("7.5") || cgpaStr.includes("8")) cgpaScore = 75;

  const calculatedReadinessScore = Math.min(
    96,
    Math.max(25, Math.round(0.45 * diagnosticAccuracy + 0.35 * dsaScore + 0.20 * cgpaScore))
  );
  const calculatedTradeFit = Math.min(
    95,
    Math.max(25, Math.round(0.65 * diagnosticAccuracy + 0.35 * expScore))
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
    const candidateModels = ["gemini-3.6-flash"];
    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        });

        const prompt = `You are a Senior Engineering Placement Director calibrating a student's actual placement readiness report.
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
          setTimeout(() => reject(new Error("Timeout after 12s")), 12000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const parsed = JSON.parse(result.response.text());

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
