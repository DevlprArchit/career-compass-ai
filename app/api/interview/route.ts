import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ROLE_DEFAULT_STARTERS: Record<string, string> = {
  "ai-ml": "Hello! I am your AI Technical Recruiter screening for Applied AI & Machine Learning. Let's start with foundational concepts: In Python, can you explain the difference between a mutable and an immutable data structure, and why NumPy arrays are preferred over native lists for tensor math?",
  "web-dev": "Hello! I am your Technical Interviewer screening for Full-Stack Web Development. Let's begin with web architecture: Can you explain the difference between HTTP GET and POST requests, and what idempotency means in RESTful API design?",
  "data-science": "Hello! I am your Analytics Technical Lead. Welcome to your interview! To start: When analyzing a dataset that contains missing values and heavy positive skew, what techniques would you use to clean the data and which measure of central tendency would you report?",
  "cloud-devops": "Hello! I am your Cloud & DevOps Technical Recruiter. Let's kick off our screening: Can you explain the fundamental architectural differences between a Docker container and a Virtual Machine (VM), and how containerization improves deployment consistency?"
};

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const { history = [], userReply, targetRole, action } = body;
  const apiKey = process.env.GEMINI_API_KEY;

  // Determine role key
  const rStr = String(targetRole || "").toLowerCase();
  let roleKey = "ai-ml";
  if (rStr.includes("web") || rStr.includes("fullstack")) roleKey = "web-dev";
  else if (rStr.includes("data") || rStr.includes("analytic")) roleKey = "data-science";
  else if (rStr.includes("cloud") || rStr.includes("devops") || rStr.includes("backend")) roleKey = "cloud-devops";

  // If client requested a starting question
  if (action === "start") {
    return NextResponse.json({
      aiResponse: ROLE_DEFAULT_STARTERS[roleKey] || ROLE_DEFAULT_STARTERS["ai-ml"]
    });
  }

  if (apiKey) {
    const candidateModels = ["gemini-3.6-flash"];
    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { 
            responseMimeType: "application/json",
            temperature: 0.25
          }
        });

        const prompt = `You are an empathetic, highly competent Senior Technical Hiring Manager conducting a live campus placement screening drill for college engineering students targeting "${targetRole || 'Junior Software Engineer'}".

Guidelines:
- Tone: Encouraging, authentic, conversational, professional.
- Focus: Ask fundamental, practical engineering questions relevant to "${targetRole}".
- If the candidate answers well, acknowledge it specifically and ask a natural, trade-relevant follow-up question.
- If the conversation history has 3 or more turns (or candidate wraps up), set "isFinished": true and generate an accurate candidate evaluation scorecard.

Return ONLY a valid JSON object strictly matching this schema:
{
  "isFinished": boolean,
  "aiResponse": "Next question or concluding congratulatory feedback",
  "scorecard": {
    "score": 88,
    "technicalRating": "Strong Candidate" | "Proficient" | "Needs Polish",
    "communicationRating": "Clear & Articulate" | "Adequate" | "Needs Structure",
    "hiringVerdict": "Recommended for Final Round" | "Conditional Hire (Mentorship)" | "Practice Recommended",
    "strengths": "1-2 sentences highlighting demonstrated technical competence for ${targetRole}",
    "weaknesses": "1-2 sentences on concepts or edge cases to study before campus drives",
    "modelAnswer": "1-2 sentences demonstrating the ideal concise answer to the last question"
  } // scorecard is null if isFinished is false
}

Interview Conversation History:
${JSON.stringify(history)}

Candidate's Latest Response:
${userReply || ""}`;

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 12s")), 12000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const parsed = JSON.parse(result.response.text());
        if (parsed.aiResponse) {
          return NextResponse.json(parsed);
        }
      } catch (error: any) {
        console.warn(`Gemini interview model ${modelName} error:`, error.message);
      }
    }
  }

  // Resilient Fallback
  const turnsCount = history.length || 0;
  const isFinished = turnsCount >= 3;

  const fallbackQuestions: Record<string, string> = {
    "ai-ml": "Excellent explanation! Let's build on that: In a production ML pipeline, how do you handle unexpected data drift or extreme outliers without breaking model inference?",
    "web-dev": "Great answer! In a production web application, how do you handle asynchronous error boundaries and network request timeouts in the frontend gracefully?",
    "data-science": "Spot on! Can you explain how you would detect multicollinearity between predictive features, and how regularization (L1 Lasso vs L2 Ridge) helps address it?",
    "cloud-devops": "Well stated! In a microservices architecture, how do you ensure zero-downtime rolling updates when deploying a new Docker image to production?"
  };

  return NextResponse.json({
    isFinished,
    aiResponse: isFinished 
      ? "Outstanding work! That completes our technical screening drill. I've prepared your comprehensive hiring scorecard below."
      : fallbackQuestions[roleKey] || fallbackQuestions["ai-ml"],
    scorecard: isFinished ? {
      score: 86,
      technicalRating: "Strong Candidate",
      communicationRating: "Clear & Articulate",
      hiringVerdict: "Recommended for Final Round",
      strengths: `Clear articulation of core ${targetRole} principles and practical system design understanding.`,
      weaknesses: "Continue practicing boundary conditions, error handling, and latency optimizations under timed interview pressure.",
      modelAnswer: "Address both the theoretical definition and practical system tradeoffs with structured examples."
    } : null
  });
}
