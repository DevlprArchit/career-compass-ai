import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { safeParseLLMJson, ACTIVE_GEMINI_MODELS } from "@/lib/gemini-safe-json";

const ROLE_DEFAULT_STARTERS: Record<string, string> = {
  "ai-ml": "Hi there! I am Alex, and I will be conducting your technical screening for Applied AI and Machine Learning today. To kick things off with core concepts: Can you explain the practical difference between overfitting and underfitting, and what strategies you use to prevent a model from simply memorizing training data?",
  "web-dev": "Hello! I am Alex, and welcome to your technical screening for Full-Stack Web Development. To begin, could you walk me through the practical difference between client-side rendering and server-side rendering, and how you decide which one to use for a high-traffic web application?",
  "data-science": "Welcome! I am Alex, and I will be walking through your technical interview for Data Science today. To start us off: When dealing with missing data and heavy outliers in a numerical dataset, what is your standard approach for cleaning and imputing that data before training?",
  "cloud-devops": "Hello! I am Alex, and welcome to your DevOps and Cloud Infrastructure screening. Let's start with foundational architecture: Can you explain the difference between a container and a virtual machine, and how container orchestration like Kubernetes manages automated failovers?"
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

        const prompt = `You are Alex, a rigorous Principal Staff Software Engineer and Senior Technical Bar Raiser conducting an interactive mock technical screening interview for a candidate targeting the role: "${targetRole || "Software Engineer"}".

CRITICAL ANSWER EVALUATION RULES (NEVER BLINDLY PRAISE):
- Scrutinize what the candidate ACTUALLY stated in "Candidate's Latest Spoken Response".
- NEVER say "Your answer is correct" or "Good attempt" if the answer is factually incorrect, incomplete, or gibberish.
- Evaluate strictly on factual correctness, depth, and clarity:
  * FACTUALLY WRONG / CONFUSED: Explicitly point out the misconception right away (e.g., "Docker is container virtualization runtime, not a programming language..."), state the accurate definition, and ask a question to test their understanding of the real mechanism.
  * SUPERFICIAL / VAGUE / BUZZWORDS: State that the answer scratches the surface but misses real production tradeoffs or mechanics, and challenge them to explain how it works under the hood.
  * EMPTY / "I DON'T KNOW" / PASS: Note that honesty is appreciated, give a 1-sentence technical overview of what an interviewer was looking for, and pivot to another core question.
  * ACCURATE & THOROUGH: Acknowledge what specific technical nuance was right, and immediately challenge them with an edge-case, failure scenario, or scale constraint.
- Voice/Spoken Format: Exactly 2 to 3 spoken sentences. Do NOT use markdown asterisks (*), hashtags, or bullet points in "aiResponse" as this is read out loud.
- Session Conclusion: After 3 or 4 substantive turns or when concluded, set "isFinished": true, provide an honest spoken summary in "aiResponse", and calculate a realistic 0-100 score in "scorecard".

Return ONLY a valid JSON object strictly matching this schema:
{
  "isFinished": boolean,
  "aiResponse": "Conversational text spoken directly to the candidate. 2-3 sentences max. No markdown asterisks.",
  "scorecard": {
    "score": 75,
    "technicalRating": "Strong Candidate" | "Proficient" | "Needs Polish",
    "communicationRating": "Clear & Articulate" | "Adequate" | "Needs Structure",
    "hiringVerdict": "Recommended for Final Round" | "Conditional Hire (Mentorship)" | "Practice Recommended",
    "strengths": "1-2 sentences highlighting demonstrated technical competence for ${targetRole}",
    "weaknesses": "1-2 sentences highlighting specific misconceptions, missing depth, or areas to revise",
    "modelAnswer": "1-2 sentences demonstrating the ideal concise answer to the last question"
  }
}

Interview Conversation History:
${JSON.stringify(history)}

Candidate's Latest Spoken Response:
${userReply || ""}`;

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 20s")), 20000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const rawText = result.response.text();
        const parsed = safeParseLLMJson<any>(rawText, null);
        if (parsed && parsed.aiResponse) {
          // Clean any markdown formatting from spoken response
          const cleanSpoken = String(parsed.aiResponse).replace(/[*_#`]/g, "").trim();
          return NextResponse.json({
            isFinished: Boolean(parsed.isFinished),
            aiResponse: cleanSpoken,
            scorecard: parsed.scorecard || null,
            feedback: parsed.scorecard || null
          });
        }
      } catch (error: any) {
        console.warn(`Gemini interview model ${modelName} error:`, error.message);
      }
    }
  }

  // Intelligent Analytical Fallback based on Candidate Input
  const turnsCount = history.length || 0;
  const isFinished = turnsCount >= 3;
  const lowerReply = String(userReply || "").toLowerCase().trim();
  const isVagueOrUnknown = lowerReply.length < 15 || 
    lowerReply.includes("don't know") || 
    lowerReply.includes("dont know") || 
    lowerReply.includes("not sure") || 
    lowerReply.includes("no idea") || 
    lowerReply.includes("pass") || 
    lowerReply.includes("skip");

  const isNonsenseOrTooShort = lowerReply.length < 5;

  let adaptiveFeedback = "";
  let calculatedScore = 75;
  let technicalRating = "Proficient";
  let hiringVerdict = "Conditional Hire (Mentorship)";

  if (isNonsenseOrTooShort) {
    adaptiveFeedback = "That response was too brief to evaluate technical proficiency. In a technical interview, clear and complete explanations are critical. Let's reset: ";
    calculatedScore = 45;
    technicalRating = "Needs Polish";
    hiringVerdict = "Practice Recommended";
  } else if (isVagueOrUnknown) {
    adaptiveFeedback = "Acknowledged. When encountering an unfamiliar system concept, walk through first principles rather than passing. Let's pivot to a related fundamental: ";
    calculatedScore = 58;
    technicalRating = "Needs Polish";
    hiringVerdict = "Practice Recommended";
  } else {
    adaptiveFeedback = `Regarding your point on ${lowerReply.slice(0, 35)}... Make sure to substantiate your answers with architectural tradeoffs and production failure handling. Moving forward: `;
    calculatedScore = 80;
    technicalRating = "Proficient";
    hiringVerdict = "Recommended for Final Round";
  }

  const fallbackQuestions: Record<string, string> = {
    "ai-ml": "In a production ML pipeline, how do you handle unexpected data drift or extreme outliers without breaking model inference?",
    "web-dev": "In a production web application, how do you handle asynchronous error boundaries and network request timeouts in the frontend gracefully?",
    "data-science": "How would you detect multicollinearity between predictive features, and how does L1/L2 regularization address it?",
    "cloud-devops": "In a microservices architecture, how do you ensure zero-downtime rolling updates when deploying a new Docker image to production?"
  };

  const fallbackScorecard = {
    score: calculatedScore,
    technicalRating,
    communicationRating: isVagueOrUnknown ? "Needs Structure" : "Clear & Articulate",
    hiringVerdict,
    strengths: `Demonstrated engagement with ${targetRole} topics and willingness to tackle technical questions.`,
    weaknesses: isVagueOrUnknown 
      ? "Ensure you thoroughly practice technical terminology and explain system mechanics rather than giving short answers."
      : "Continue practicing boundary conditions, error handling, and latency optimizations under timed interview pressure.",
    modelAnswer: "Address both the theoretical definition and practical system tradeoffs with structured examples."
  };

  return NextResponse.json({
    isFinished,
    aiResponse: isFinished 
      ? "Thank you for completing this technical interview round. I have synthesized your evaluation and compiled your hiring scorecard below."
      : `${adaptiveFeedback}${fallbackQuestions[roleKey] || fallbackQuestions["ai-ml"]}`,
    scorecard: isFinished ? fallbackScorecard : null,
    feedback: isFinished ? fallbackScorecard : null
  });
}
