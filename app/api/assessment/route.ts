import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getStudentFriendlyQuestions } from "@/lib/discovery-engine";
import { safeParseLLMJson, ACTIVE_GEMINI_MODELS } from "@/lib/gemini-safe-json";

// Trade-specific fallback question banks for complete reliability
const TRADE_FALLBACK_BANKS: Record<string, any> = {
  "ai-ml": {
    tradeAnalysis: {
      tradeFitIndex: 86,
      recommendedTrack: "Junior Python & Applied AI Engineer",
      primaryStrength: "Strong grasp of Python syntax, data structures, and machine learning workflow fundamentals.",
      criticalGap: "Applied hands-on practice with PyTorch tensors, feature pipelines, and model evaluation metrics.",
      placementAdvice: "Build 2 end-to-end ML micro-projects and master array/tensor manipulations to target high-growth AI startups."
    },
    questions: [
      {
        id: "q1",
        category: "Python Lexical Grammar & Tokens",
        question: "In Python source code, what constitutes a 'Token'?",
        options: [
          "A session cookie stored in the browser",
          "The smallest individual syntactic element parsed by the interpreter (keywords, identifiers, literals, operators)",
          "A hardware component inside the computer",
          "A temporary cache file on disk"
        ],
        correctIndex: 1,
        explanation: "A token is the smallest individual syntactic element recognized by the Python interpreter during lexical analysis."
      },
      {
        id: "q2",
        category: "Python Reserved Keywords",
        question: "Which of the following CANNOT be used as a variable identifier because it is a reserved Python keyword?",
        options: ["user_score", "total_items", "def", "calculate_tax"],
        correctIndex: 2,
        explanation: "'def' is a reserved Python keyword used to define functions and cannot be repurposed as a variable name."
      },
      {
        id: "q3",
        category: "Identifier Naming Rules",
        question: "According to Python naming rules, which of the following variable names is valid?",
        options: [
          "1st_player (starts with a digit)",
          "user-profile (contains a hyphen)",
          "_cached_result (starts with an underscore)",
          "for (uses a reserved keyword)"
        ],
        correctIndex: 2,
        explanation: "Python identifiers can begin with a letter or underscore (_), but never with a digit or hyphen."
      },
      {
        id: "q4",
        category: "Data Structures & Mutability",
        question: "What is the key difference between a Python List and a Python Tuple?",
        options: [
          "Lists only store numbers; tuples store strings",
          "Lists are mutable (can change in-place); tuples are immutable (fixed once declared)",
          "Lists require parentheses (); tuples use curly braces {}",
          "There is no difference in mutability"
        ],
        correctIndex: 1,
        explanation: "Lists are mutable and can be appended/modified in-place, while tuples are immutable and fixed once declared."
      },
      {
        id: "q5",
        category: "Algorithmic Control Flow",
        question: "What is the output of `list(range(2, 10, 3))` in Python?",
        options: ["[2, 5, 8]", "[2, 5, 8, 10]", "[3, 6, 9]", "[2, 4, 6, 8]"],
        correctIndex: 0,
        explanation: "`range(2, 10, 3)` starts at 2 and steps by 3, generating [2, 5, 8] (stopping before 10)."
      },
      {
        id: "q6",
        category: "Machine Learning Foundations",
        question: "Why do ML practitioners split datasets into Training and Test subsets?",
        options: [
          "To avoid filling up the computer's hard drive",
          "To evaluate model generalization on unseen data and diagnose overfitting",
          "Because Python models can only accept half a dataset at a time",
          "To convert continuous data into categorical strings"
        ],
        correctIndex: 1,
        explanation: "A train-test split ensures we validate how accurately the trained model performs on independent, unseen data."
      }
    ]
  },
  "web-dev": {
    tradeAnalysis: {
      tradeFitIndex: 88,
      recommendedTrack: "Junior Full-Stack Web Developer (Python + React)",
      primaryStrength: "Intuitive grasp of client-server architecture, HTTP semantics, and modern frontend/backend patterns.",
      criticalGap: "Relational database indexing, RESTful status codes, and asynchronous state management.",
      placementAdvice: "Construct an authenticated CRUD application with FastAPI/Django and Next.js to impress hiring managers."
    },
    questions: [
      {
        id: "q1",
        category: "HTTP & Web Protocols",
        question: "Which HTTP method should be used when creating a new resource on a REST API server?",
        options: ["GET", "POST", "DELETE", "HEAD"],
        correctIndex: 1,
        explanation: "POST is the standard idempotent/creation HTTP verb used to submit payloads for resource creation."
      },
      {
        id: "q2",
        category: "HTTP Status Codes",
        question: "What does an HTTP 404 status code indicate to the client?",
        options: [
          "Internal server crash",
          "Requested resource was not found on the server",
          "Unauthorized request needing authentication",
          "Request succeeded with new payload"
        ],
        correctIndex: 1,
        explanation: "HTTP 404 Not Found indicates that the server cannot locate the requested endpoint or resource."
      },
      {
        id: "q3",
        category: "JavaScript & Python Data Types",
        question: "In both Python and JavaScript, which format is the universal standard for exchanging structured web data?",
        options: ["XML only", "JSON (JavaScript Object Notation)", "Binary bytecode", "CSV tables"],
        correctIndex: 1,
        explanation: "JSON is the lightweight, human-readable universal data interchange standard across modern web applications."
      },
      {
        id: "q4",
        category: "Asynchronous Execution",
        question: "In modern JavaScript and Python, what is the purpose of the `async` and `await` keywords?",
        options: [
          "To pause the entire operating system thread",
          "To write non-blocking asynchronous code that reads cleanly like synchronous operations",
          "To encrypt network traffic",
          "To prevent memory leaks in loops"
        ],
        correctIndex: 1,
        explanation: "async/await allows non-blocking asynchronous I/O (like network fetches and database queries) without nested callbacks."
      },
      {
        id: "q5",
        category: "Database Concepts",
        question: "In a relational database (like PostgreSQL), what is a Primary Key?",
        options: [
          "The password used to connect to the database",
          "A unique identifier column that guarantees each row in a table is distinct",
          "The first table created in any schema",
          "An encrypted backup file"
        ],
        correctIndex: 1,
        explanation: "A Primary Key uniquely identifies each record in a relational database table, preventing duplicate entries."
      },
      {
        id: "q6",
        category: "Frontend DOM Architecture",
        question: "Why do modern frontend frameworks like React utilize a 'Virtual DOM'?",
        options: [
          "To run web code without an internet connection",
          "To batch and minimize expensive browser repaint and reflow operations",
          "To eliminate the need for HTML and CSS",
          "To protect the user from malware"
        ],
        correctIndex: 1,
        explanation: "The Virtual DOM computes diffs in memory and updates only the necessary nodes in the real browser DOM for performance."
      }
    ]
  },
  "data-science": {
    tradeAnalysis: {
      tradeFitIndex: 85,
      recommendedTrack: "Data Scientist & Analytics Engineer",
      primaryStrength: "Strong quantitative curiosity with appreciation for tabular data manipulation and descriptive statistics.",
      criticalGap: "Advanced SQL aggregation, group-by pipelines, and exploratory data visualization workflows.",
      placementAdvice: "Analyze 2 real Kaggle public datasets with Pandas and generate interactive visualization reports for your portfolio."
    },
    questions: [
      {
        id: "q1",
        category: "Python Tabular Libraries",
        question: "Which Python library is the industry standard for reading, cleaning, and transforming tabular datasets?",
        options: ["Flask", "Pandas", "PyGame", "Requests"],
        correctIndex: 1,
        explanation: "Pandas provides DataFrame data structures designed specifically for data analysis and manipulation."
      },
      {
        id: "q2",
        category: "Statistics & Central Tendency",
        question: "When a dataset contains extreme outliers (e.g. one billionaire in a salary dataset), which metric is more resilient?",
        options: ["Mean (Average)", "Median (Middle value)", "Range", "Standard Deviation"],
        correctIndex: 1,
        explanation: "The Median represents the 50th percentile and is robust against extreme outlier skew compared to the Mean."
      },
      {
        id: "q3",
        category: "SQL Data Querying",
        question: "Which SQL clause is used to filter aggregated group results (e.g. groups with count > 10)?",
        options: ["WHERE", "HAVING", "LIMIT", "ORDER BY"],
        correctIndex: 1,
        explanation: "The HAVING clause filters groups created by GROUP BY, while WHERE filters individual rows before grouping."
      },
      {
        id: "q4",
        category: "Missing Data Handling",
        question: "In Pandas, what does `df.dropna()` typically do?",
        options: [
          "Drops the entire database",
          "Removes rows or columns containing null (NaN) missing values",
          "Sorts the dataframe alphabetically",
          "Exports data to a CSV file"
        ],
        correctIndex: 1,
        explanation: "`dropna()` removes rows or columns containing missing or NaN values from a DataFrame."
      },
      {
        id: "q5",
        category: "Correlation vs Causation",
        question: "If two variables have a Pearson correlation of +0.92, what does this mathematically prove?",
        options: [
          "Variable A directly causes Variable B to happen",
          "A strong positive linear association exists, but causation cannot be assumed without controlled testing",
          "The data has no errors",
          "92% of the data points are identical"
        ],
        correctIndex: 1,
        explanation: "Correlation quantifies linear association, but does not prove a causal relationship."
      },
      {
        id: "q6",
        category: "Data Visualization",
        question: "Which plot type is best suited to inspect the distribution and spread of numerical data across quartiles?",
        options: ["Pie Chart", "Box Plot (Box-and-Whisker)", "Network Graph", "Radar Map"],
        correctIndex: 1,
        explanation: "A Box Plot displays median, quartiles (IQR), and outliers across numerical distributions."
      }
    ]
  },
  "devops": {
    tradeAnalysis: {
      tradeFitIndex: 83,
      recommendedTrack: "Cloud DevOps & Systems Infrastructure Engineer",
      primaryStrength: "Appreciation for system reliability, containerization paradigms, and automated deployment pipelines.",
      criticalGap: "Linux process management, shell scripting, and Infrastructure-as-Code tooling.",
      placementAdvice: "Dockerize a full application and set up an automated GitHub Actions CI/CD workflow to stand out."
    },
    questions: [
      {
        id: "q1",
        category: "Containerization Fundamentals",
        question: "What is the primary advantage of containerizing an application with Docker?",
        options: [
          "It makes the application run on physical hardware without an OS",
          "It bundles application code and its exact dependencies into an isolated, portable runtime package",
          "It automatically writes the unit tests",
          "It replaces the need for cloud hosting"
        ],
        correctIndex: 1,
        explanation: "Docker containers encapsulate code, libraries, and runtime configurations into portable packages that run consistently anywhere."
      },
      {
        id: "q2",
        category: "Linux Command Line",
        question: "In a Linux/Unix environment, which command displays running processes and system memory usage in real time?",
        options: ["ls", "top (or htop)", "mkdir", "chmod"],
        correctIndex: 1,
        explanation: "`top` (and `htop`) provides a real-time dynamic view of running system processes, CPU, and RAM allocation."
      },
      {
        id: "q3",
        category: "CI/CD Automation",
        question: "What does the 'CI' in CI/CD pipeline stand for?",
        options: ["Cloud Infrastructure", "Continuous Integration", "Central Interface", "Code Inspection"],
        correctIndex: 1,
        explanation: "Continuous Integration (CI) refers to automatically building, testing, and verifying code commits upon push."
      },
      {
        id: "q4",
        category: "Networking & DNS",
        question: "What is the primary role of the Domain Name System (DNS)?",
        options: [
          "Translating human-friendly domain names (e.g., example.com) into numerical IP addresses",
          "Encrypting user passwords on websites",
          "Storing database tables in the cloud",
          "Generating SSL certificates"
        ],
        correctIndex: 0,
        explanation: "DNS acts as the internet's phonebook, mapping domain names into machine-readable IP addresses."
      },
      {
        id: "q5",
        category: "Cloud Computing Basics",
        question: "Which of the following describes Infrastructure as Code (IaC)?",
        options: [
          "Writing documentation in Word files",
          "Managing and provisioning cloud resources using version-controlled configuration files (e.g. Terraform)",
          "Typing shell commands manually in production",
          "Buying physical servers for an office"
        ],
        correctIndex: 1,
        explanation: "IaC manages cloud infrastructure declaratively via machine-readable definition files rather than manual point-and-click."
      },
      {
        id: "q6",
        category: "System Security & Permissions",
        question: "In Linux, what does the command `chmod 755 script.sh` accomplish?",
        options: [
          "Deletes the script after 755 seconds",
          "Grants owner read/write/execute permissions, and group/others read/execute permissions",
          "Renames the script to 755",
          "Transfers the file over SSH"
        ],
        correctIndex: 1,
        explanation: "755 octal represents rwxr-xr-x: full permissions for the owner, and read/execute permissions for group and others."
      }
    ]
  }
};

export async function POST(req: Request) {
  let intake: any = {};
  try {
    intake = await req.json();
  } catch {}

  const { 
    degree, 
    semester, 
    codingExperience, 
    dsaCount, 
    trade, 
    targetCompanyTier, 
    placementTimeline,
    level: explicitLevel
  } = intake;
  const apiKey = process.env.GEMINI_API_KEY;

  // Determine calibrated student level
  const semStr = String(semester || "").toLowerCase();
  const expStr = String(codingExperience || "").toLowerCase();
  let calibratedLevel: "beginner" | "intermediate" | "advanced" = "beginner";

  if (explicitLevel && ["beginner", "intermediate", "advanced"].includes(explicitLevel)) {
    calibratedLevel = explicitLevel;
  } else if (semStr.includes("final") || semStr.includes("graduated") || expStr.includes("advanced")) {
    calibratedLevel = "advanced";
  } else if (semStr.includes("3rd") || expStr.includes("intermediate")) {
    calibratedLevel = "intermediate";
  } else {
    calibratedLevel = "beginner";
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

        const prompt = `You are a supportive, student-friendly University Professor & Career Director preparing a diagnostic evaluation for a college student or higher education learner.
Candidate Intake Profile:
- Degree: ${degree || "Higher Education / Undergraduate"}
- Academic Semester: ${semester || "1st / 2nd Year (Foundations)"}
- Hands-on Coding Experience: ${codingExperience || "Beginner (< 6 months, basic syntax)"}
- DSA Practice: ${dsaCount || "0 – 25 Problems"}
- Specialization Track: ${trade || "Full-Stack Engineer"}
- Target Difficulty Level: ${calibratedLevel.toUpperCase()}

STRICT DIFFICULTY RULES:
${calibratedLevel === "beginner" ? `
- This student is a BEGINNER (1st or 2nd year higher education student).
- Questions MUST test fundamental, accessible concepts: variables, data types, if/else conditions, loops, functions, array/list indexing, and simple foundational concepts for ${trade}.
- NEVER ask advanced production distributed systems, LLM memory architectures, PagedAttention, multi-stage Docker builds, or B-tree disk pages. Keep it accessible and encouraging!
` : calibratedLevel === "intermediate" ? `
- This student is an INTERMEDIATE (3rd year higher education student).
- Questions should test applied fundamentals: OOP concepts, basic data structures (stacks, queues, binary search), basic SQL (SELECT, WHERE, JOIN), RESTful conventions, and clean modular code.
` : `
- This student is an ADVANCED (Final year / graduate placement candidate).
- Questions can test system design basics, caching, asynchronous concurrency, and performance optimization.
`}

TASK:
1. Generate exactly 6 multiple-choice questions calibrated strictly for the ${calibratedLevel.toUpperCase()} level in ${trade}.
2. Provide an honest, encouraging Student Trade Alignment Analysis evaluating their foundations and immediate next steps.

Return ONLY a JSON object strictly matching this schema:
{
  "tradeAnalysis": {
    "tradeFitIndex": 82,
    "recommendedTrack": "string trade title",
    "primaryStrength": "string summarizing student baseline",
    "criticalGap": "string summarizing immediate friendly next step",
    "placementAdvice": "string 1-2 sentence supportive guidance"
  },
  "questions": [
    {
      "id": "q1",
      "category": "string category name",
      "question": "string question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "concise friendly explanation of the correct answer"
    }
  ]
}`;

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout after 12s")), 12000)
        );
        const result = await Promise.race([model.generateContent(prompt), timeoutPromise]) as any;
        const rawText = result.response.text();
        const parsed = safeParseLLMJson<any>(rawText, null);
        if (parsed && Array.isArray(parsed.questions) && parsed.questions.length >= 4) {
          return NextResponse.json(parsed);
        }
      } catch (error: any) {
        console.warn(`Gemini model ${modelName} call failed:`, error.message);
      }
    }
  }

  // Resilient High-Quality Fallback Bank calibrated to student's exact level
  const fallbackQuestions = getStudentFriendlyQuestions(trade || "fullstack", calibratedLevel);
  return NextResponse.json({
    tradeAnalysis: {
      tradeFitIndex: calibratedLevel === "beginner" ? 78 : calibratedLevel === "intermediate" ? 82 : 86,
      recommendedTrack: trade || "Software Engineer",
      primaryStrength: `Good initial curiosity and readiness to master ${trade || "core career"} foundations.`,
      criticalGap: `Daily hands-on practice with syntax fundamentals and simple problem-solving drills.`,
      placementAdvice: `Follow the step-by-step 12-week roadmap to build your confidence and project portfolio.`
    },
    questions: fallbackQuestions
  });
}
