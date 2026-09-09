export interface UserProfile {
  id: string;
  name: string;
  email: string;
  degree: string;
  semesterOrStatus: string;
  cgpaBand: string;
  codingExperience: string;
  dsaCount: string;
  specializationTrade: string;
  targetCompanyTier: string;
  placementTimeline: string;
  weeklyHours: number;
  tradeFitIndex?: number;
  readinessScore?: number;
  createdAt: string;
}

export function cleanBadge(text?: string): string {
  if (!text) return "";
  return text.replace(/\s*\([^)]*\)/g, "").trim();
}

export const DEGREE_OPTIONS = [
  "Undergraduate (CS / IT / Engineering)",
  "Recent Graduate (Seeking 1st Tech Role)",
  "Career Switcher / Self-Taught",
  "Junior Software Engineer",
  "Postgraduate (M.Tech / MS / PhD)"
];

export const ACADEMIC_SEMESTER_OPTIONS = [
  "1st / 2nd Year (Foundations)",
  "3rd Year (Internship Prep)",
  "Final Year (Placement Season)",
  "Graduated (Immediate Hiring)",
  "Working Professional (Upskilling)"
];

export const CGPA_BAND_OPTIONS = [
  "8.5+ CGPA (Top Tier)",
  "7.5 – 8.5 CGPA (Placement Ready)",
  "6.5 – 7.5 CGPA (Solid)",
  "Below 6.5 CGPA (Project Focus)"
];

export const CODING_EXPERIENCE_LEVELS = [
  "Beginner (< 6 months, basic syntax)",
  "Intermediate (Built independent projects)",
  "Advanced (Production apps & regular problem solver)"
];

export const DSA_PROBLEM_COUNTS = [
  "0 – 25 Problems (Starting out)",
  "25 – 75 Problems (Core data structures)",
  "75 – 150+ Problems (Interview ready)"
];

export const SPECIALIZATION_TRADES = [
  {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    shortDesc: "PyTorch, Transformers, LLM inference pipelines, and production MLOps.",
    matchReason: "High demand across high-growth startups and tech enterprises."
  },
  {
    id: "fullstack-python",
    title: "Full-Stack Engineer (React + Python)",
    shortDesc: "Next.js frontends, FastAPI backends, relational databases, and REST APIs.",
    matchReason: "Highest volume of engineering opportunities across industry sectors."
  },
  {
    id: "data-scientist",
    title: "Data Scientist & Analytics Engineer",
    shortDesc: "Pandas/NumPy data processing, statistical modeling, and ML analysis.",
    matchReason: "Directly bridges analytics, business intelligence, and predictive modeling."
  },
  {
    id: "backend-cloud",
    title: "Backend & Cloud Systems Engineer",
    shortDesc: "High-throughput APIs, Docker containerization, PostgreSQL, and Linux.",
    matchReason: "Core architecture for scalable web services and cloud infrastructure."
  }
];

export const TARGET_COMPANY_TIERS = [
  "Tier-1 Tech & Product Unicorns",
  "High-Growth Startups",
  "Global Tech Consultancies & MNCs",
  "Remote Global Teams"
];

export const PLACEMENT_TIMELINES = [
  "Next 1 – 3 Months (Immediate)",
  "3 – 6 Months (Upcoming hiring cycle)",
  "6 – 12 Months (Comprehensive prep)"
];

export interface AccessibleQuestion {
  id: string;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TradeSkillMetric {
  name: string;
  score: number; // 0 - 100
  benchmark: number; // typical campus hire benchmark
  status: "Strong" | "Adequate" | "Focus Area";
}

export interface CompanyTierMatch {
  tier: string;
  targetRole: string;
  status: "Eligible Now" | "On Track (Needs 2-4 Wks)" | "Requires Gap Closure";
  readinessReq: number;
  dsaReq: string;
  keySkill: string;
}

export const TRADE_SKILL_MATRICES: Record<string, TradeSkillMetric[]> = {
  "ai-ml-engineer": [
    { name: "Python Core & Syntax", score: 88, benchmark: 75, status: "Strong" },
    { name: "Tensor & Array Math (NumPy)", score: 72, benchmark: 70, status: "Adequate" },
    { name: "ML Workflows & Pipelines", score: 68, benchmark: 75, status: "Focus Area" },
    { name: "Algorithms & Complexity", score: 74, benchmark: 70, status: "Adequate" },
    { name: "LLM & Prompt Integration", score: 82, benchmark: 65, status: "Strong" }
  ],
  "fullstack-python": [
    { name: "HTTP & REST Architecture", score: 84, benchmark: 75, status: "Strong" },
    { name: "Frontend DOM & React", score: 78, benchmark: 75, status: "Adequate" },
    { name: "Database Schema & SQL", score: 70, benchmark: 75, status: "Focus Area" },
    { name: "Python Backend (FastAPI)", score: 82, benchmark: 70, status: "Strong" },
    { name: "Async I/O & Performance", score: 66, benchmark: 70, status: "Focus Area" }
  ],
  "data-scientist": [
    { name: "Data Manipulation (Pandas)", score: 86, benchmark: 80, status: "Strong" },
    { name: "Statistical Inference", score: 75, benchmark: 75, status: "Adequate" },
    { name: "SQL Aggregation & Joins", score: 80, benchmark: 75, status: "Strong" },
    { name: "Data Cleaning & Imputation", score: 72, benchmark: 70, status: "Adequate" },
    { name: "Exploratory Visualizations", score: 78, benchmark: 70, status: "Strong" }
  ],
  "backend-cloud": [
    { name: "Linux System & Shell", score: 80, benchmark: 75, status: "Strong" },
    { name: "Docker Containerization", score: 75, benchmark: 70, status: "Adequate" },
    { name: "CI/CD Deployment Pipelines", score: 65, benchmark: 75, status: "Focus Area" },
    { name: "Networking & DNS Semantics", score: 78, benchmark: 70, status: "Strong" },
    { name: "API Security & Auth", score: 72, benchmark: 75, status: "Focus Area" }
  ]
};

export const COMPANY_TIER_EVALUATIONS: Record<string, CompanyTierMatch[]> = {
  "ai-ml-engineer": [
    { tier: "Tier-1 Product Unicorns", targetRole: "Applied AI Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "75+ Mediums", keySkill: "Deep PyTorch & Vector DBs" },
    { tier: "High-Growth Startups", targetRole: "Junior GenAI Developer", status: "Eligible Now", readinessReq: 70, dsaReq: "25+ LeetCode", keySkill: "FastAPI + LangChain APIs" },
    { tier: "Global MNCs (TCS/Infosys/Accenture)", targetRole: "Associate Software Engineer", status: "Eligible Now", readinessReq: 60, dsaReq: "Foundational DSA", keySkill: "Python OOP & SQL" },
    { tier: "Specialist Boutique AI Labs", targetRole: "Junior ML Scientist", status: "Requires Gap Closure", readinessReq: 88, dsaReq: "100+ LeetCode", keySkill: "Mathematical Optimization" }
  ],
  "fullstack-python": [
    { tier: "Tier-1 Product Unicorns", targetRole: "Full-Stack Software Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "75+ Mediums", keySkill: "System Design & Next.js" },
    { tier: "High-Growth Startups", targetRole: "Full-Stack Web Developer", status: "Eligible Now", readinessReq: 70, dsaReq: "25+ LeetCode", keySkill: "FastAPI + React CRUD" },
    { tier: "Global MNCs (TCS/Infosys/Accenture)", targetRole: "Systems Engineer", status: "Eligible Now", readinessReq: 60, dsaReq: "Foundational DSA", keySkill: "SQL + Web Architecture" },
    { tier: "Remote International Tech", targetRole: "Junior Python Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 80, dsaReq: "50+ LeetCode", keySkill: "REST APIs & Git Workflows" }
  ],
  "data-scientist": [
    { tier: "Tier-1 Product Unicorns", targetRole: "Data Scientist I", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "75+ Mediums", keySkill: "A/B Testing & BigQuery" },
    { tier: "High-Growth Startups", targetRole: "Junior Analytics Engineer", status: "Eligible Now", readinessReq: 70, dsaReq: "25+ LeetCode", keySkill: "Pandas + Dashboarding" },
    { tier: "Global MNCs (TCS/Infosys/Accenture)", targetRole: "Data Analyst Trainee", status: "Eligible Now", readinessReq: 60, dsaReq: "Foundational DSA", keySkill: "Advanced SQL & Excel" },
    { tier: "FinTech & Risk Analytics", targetRole: "Quantitative Analyst", status: "Requires Gap Closure", readinessReq: 88, dsaReq: "100+ LeetCode", keySkill: "Statistical Modeling" }
  ],
  "backend-cloud": [
    { tier: "Tier-1 Product Unicorns", targetRole: "Cloud Platform Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "75+ Mediums", keySkill: "Kubernetes & Go/Python" },
    { tier: "High-Growth Startups", targetRole: "Junior DevOps Engineer", status: "Eligible Now", readinessReq: 70, dsaReq: "25+ LeetCode", keySkill: "Docker + GitHub Actions" },
    { tier: "Global MNCs (TCS/Infosys/Accenture)", targetRole: "Cloud Associate", status: "Eligible Now", readinessReq: 60, dsaReq: "Foundational DSA", keySkill: "Linux & AWS Basics" },
    { tier: "SaaS Infrastructure Firms", targetRole: "Site Reliability Engineer", status: "Requires Gap Closure", readinessReq: 88, dsaReq: "100+ LeetCode", keySkill: "Microservice Observability" }
  ]
};

// Student-friendly, foundational specialization questions tailored per trade
export function getStudentFriendlyQuestions(trade: string): AccessibleQuestion[] {
  const t = String(trade || "").toLowerCase();

  if (t.includes("web") || t.includes("fullstack")) {
    return [
      {
        id: "web-q1",
        category: "HTTP Protocols",
        question: "Which HTTP request method is standard for creating a new database record via a REST API?",
        options: ["GET", "POST", "DELETE", "HEAD"],
        correctIndex: 1,
        explanation: "POST is the standard idempotent/creation HTTP verb used to send payloads for new resource creation."
      },
      {
        id: "web-q2",
        category: "HTTP Status Codes",
        question: "What does an HTTP 200 OK status code indicate?",
        options: [
          "The client is unauthorized",
          "The request succeeded and the server returned the desired payload",
          "The server crashed while executing",
          "The resource was permanently moved"
        ],
        correctIndex: 1,
        explanation: "HTTP 200 OK indicates that the client request has succeeded normally."
      },
      {
        id: "web-q3",
        category: "Data Interchange",
        question: "Which data interchange format is universally utilized to send JSON payloads between React and Python backend APIs?",
        options: ["Binary Assembly", "JSON (JavaScript Object Notation)", "HTML String", "CSV"],
        correctIndex: 1,
        explanation: "JSON is the standard lightweight, human-readable text format for web API communication."
      },
      {
        id: "web-q4",
        category: "Asynchronous Execution",
        question: "In modern JavaScript and Python, what does the `await` keyword do inside an async function?",
        options: [
          "Freezes the computer's CPU entirely",
          "Pauses execution of the async function until the Promise/Coroutine resolves without blocking other tasks",
          "Deletes temporary variables",
          "Creates a new database table"
        ],
        correctIndex: 1,
        explanation: "`await` pauses execution inside the async scope until the asynchronous task completes, without blocking the event loop."
      },
      {
        id: "web-q5",
        category: "Relational Databases",
        question: "In a relational SQL database, what constraint guarantees that every record in a table has a unique identity?",
        options: ["Foreign Key", "Primary Key", "INDEX", "LIMIT"],
        correctIndex: 1,
        explanation: "A Primary Key column uniquely identifies each row and strictly prohibits null or duplicate values."
      },
      {
        id: "web-q6",
        category: "Frontend Rendering",
        question: "Why do modern frontend libraries like React utilize a Virtual DOM?",
        options: [
          "To allow web apps to run without browsers",
          "To batch and minimize expensive recalculation and repaint cycles in the browser DOM",
          "To bypass JavaScript security checks",
          "To prevent users from opening DevTools"
        ],
        correctIndex: 1,
        explanation: "The Virtual DOM computes minimal reconciliation diffs in memory, applying only necessary updates to the actual browser DOM."
      }
    ];
  }

  if (t.includes("data") || t.includes("analytic")) {
    return [
      {
        id: "ds-q1",
        category: "Tabular Libraries",
        question: "Which Python package is standard for cleaning, filtering, and structuring tabular 2D data?",
        options: ["Flask", "Pandas", "Matplotlib", "Requests"],
        correctIndex: 1,
        explanation: "Pandas provides DataFrame data structures optimized for reading, transforming, and analyzing tabular datasets."
      },
      {
        id: "ds-q2",
        category: "Descriptive Statistics",
        question: "When a dataset has heavy skew or extreme outliers, which measure of central tendency is most reliable?",
        options: ["Mean (Average)", "Median (Middle value)", "Variance", "Standard Deviation"],
        correctIndex: 1,
        explanation: "The Median divides ordered data into two halves and is highly resistant to extreme outlier distortion."
      },
      {
        id: "ds-q3",
        category: "SQL Data Querying",
        question: "In SQL, which clause is used to filter aggregated group results produced by GROUP BY?",
        options: ["WHERE", "HAVING", "LIMIT", "ORDER BY"],
        correctIndex: 1,
        explanation: "HAVING filters aggregated summary values, whereas WHERE filters individual records before aggregation."
      },
      {
        id: "ds-q4",
        category: "Missing Values",
        question: "In a Pandas DataFrame, what does `df.isna().sum()` accomplish?",
        options: [
          "Counts the total number of missing (NaN) values in each column",
          "Deletes all empty rows",
          "Replaces null values with zeroes",
          "Calculates column averages"
        ],
        correctIndex: 0,
        explanation: "`df.isna().sum()` tallies the count of missing or NaN entries across each respective DataFrame column."
      },
      {
        id: "ds-q5",
        category: "Statistical Inference",
        question: "Does a high correlation between two metrics (e.g. ice cream sales and sunburn rates) prove that one causes the other?",
        options: [
          "Yes, high correlation mathematically proves direct causation",
          "No, correlation only measures association; confounding factors (like summer heat) often explain the link",
          "Yes, if the correlation coefficient is above 0.8",
          "No, correlation is always an error"
        ],
        correctIndex: 1,
        explanation: "Correlation describes statistical association, but controlled experiments or causal analysis are required to establish causation."
      },
      {
        id: "ds-q6",
        category: "Data Visualization",
        question: "Which visualization type is best suited to display the 5-number summary (minimum, Q1, median, Q3, maximum) of numerical data?",
        options: ["Pie Chart", "Box Plot (Box-and-Whisker)", "Heatmap", "Scatter Plot"],
        correctIndex: 1,
        explanation: "A Box Plot explicitly displays the median, interquartile range (IQR), and outlier boundaries."
      }
    ];
  }

  if (t.includes("cloud") || t.includes("devops") || t.includes("system")) {
    return [
      {
        id: "ops-q1",
        category: "Containerization",
        question: "What is the primary benefit of containerizing software with Docker?",
        options: [
          "It automatically fixes bugs in user code",
          "It packages application code alongside its exact dependencies into an isolated, consistent runtime",
          "It eliminates the need for testing",
          "It gives every user free cloud credits"
        ],
        correctIndex: 1,
        explanation: "Docker containers encapsulate code, libraries, and system dependencies to ensure reproducible execution across any environment."
      },
      {
        id: "ops-q2",
        category: "Linux Fundamentals",
        question: "Which Linux command displays active running processes and CPU/memory utilization in real time?",
        options: ["ls", "top (or htop)", "pwd", "chmod"],
        correctIndex: 1,
        explanation: "`top` and `htop` display active system threads, processor load, and physical memory utilization dynamically."
      },
      {
        id: "ops-q3",
        category: "CI/CD Automation",
        question: "What is the goal of Continuous Integration (CI) in a software team?",
        options: [
          "To automatically build and run automated unit tests whenever code is pushed to a repository",
          "To hire remote developers automatically",
          "To replace Git version control",
          "To delete old branches every hour"
        ],
        correctIndex: 0,
        explanation: "Continuous Integration automates code compilation and test suite validation on every commit to catch bugs early."
      },
      {
        id: "ops-q4",
        category: "Internet Infrastructure",
        question: "What is the primary responsibility of a DNS (Domain Name System) server?",
        options: [
          "Translating human-readable domain names (e.g. google.com) into numerical IP addresses",
          "Storing user passwords in encrypted tables",
          "Hosting video files for streaming",
          "Checking credit cards for fraud"
        ],
        correctIndex: 0,
        explanation: "DNS resolves human-friendly hostname addresses into machine-routable IP addresses."
      },
      {
        id: "ops-q5",
        category: "Cloud Architecture",
        question: "What is the key principle of Infrastructure as Code (IaC)?",
        options: [
          "Configuring cloud servers manually through web consoles",
          "Defining and version-controlling servers, databases, and networks using declarative code files (e.g. Terraform)",
          "Running applications without cloud providers",
          "Printing cloud architecture diagrams on paper"
        ],
        correctIndex: 1,
        explanation: "IaC automates infrastructure provisioning through declarative, version-controlled scripts."
      },
      {
        id: "ops-q6",
        category: "Permissions & Security",
        question: "In Linux, what permissions does `chmod 755 run.sh` provide?",
        options: [
          "Full access for the file owner, and read/execute permissions for group and other users",
          "Locks the file with a password",
          "Restricts all access to superuser only",
          "Deletes the file after 755 seconds"
        ],
        correctIndex: 0,
        explanation: "755 octal grants rwx to owner (7), r-x to group (5), and r-x to others (5)."
      }
    ];
  }

  // Default: AI & ML Engineer
  return [
    {
      id: "diag-q1",
      category: "Python Lexical Grammar & Tokens",
      question: "In Python source code, what constitutes a 'Token'?",
      options: [
        "A session cookie stored in the browser",
        "The smallest individual syntactic element parsed by the interpreter (keywords, identifiers, literals, operators)",
        "A hardware device attached to the CPU",
        "A temporary variable created inside a function"
      ],
      correctIndex: 1,
      explanation: "A token is the smallest syntactic element recognized by Python's tokenizer, such as keywords, identifiers, literals, and operators."
    },
    {
      id: "diag-q2",
      category: "Python Reserved Keywords",
      question: "Which of the following CANNOT be used as an identifier (variable name) because it is a reserved Python Keyword?",
      options: [
        "student_count",
        "total_amount",
        "def",
        "calculate_mean"
      ],
      correctIndex: 2,
      explanation: "'def' is a reserved Python keyword used to define functions and cannot be repurposed as a variable name."
    },
    {
      id: "diag-q3",
      category: "Identifier Naming Rules",
      question: "According to Python naming conventions, which of the following is a valid identifier?",
      options: [
        "2nd_attempt (starts with a digit)",
        "user-email (contains a hyphen)",
        "_cached_result (starts with an underscore)",
        "import (uses a reserved keyword)"
      ],
      correctIndex: 2,
      explanation: "Identifiers can start with a letter (a-z, A-Z) or an underscore (_), but cannot start with a digit or contain punctuation characters like hyphens."
    },
    {
      id: "diag-q4",
      category: "Data Structures & Mutability",
      question: "What is the key functional difference between a Python List and a Python Tuple?",
      options: [
        "Lists can only hold numbers, while tuples can only hold strings",
        "Lists are mutable (can be altered in place), while tuples are immutable (fixed after creation)",
        "Lists require curly braces {}, while tuples use colons :",
        "Tuples execute 100x slower than lists"
      ],
      correctIndex: 1,
      explanation: "Lists `[a, b]` are mutable and can have elements appended or replaced. Tuples `(a, b)` are immutable and cannot be modified once declared."
    },
    {
      id: "diag-q5",
      category: "Algorithmic Control Flow",
      question: "Consider this Python loop snippet: `for i in range(1, 5): pass`. What values does `i` take?",
      options: [
        "1, 2, 3, 4, 5",
        "1, 2, 3, 4",
        "0, 1, 2, 3, 4",
        "1, 5"
      ],
      correctIndex: 1,
      explanation: "Python's `range(start, stop)` is half-open: it includes `start` (1) up to but excluding `stop` (5), producing 1, 2, 3, 4."
    },
    {
      id: "diag-q6",
      category: "Machine Learning Foundations",
      question: "In Machine Learning workflows, why is it standard practice to perform a 'train-test split'?",
      options: [
        "To make the computer run twice as fast",
        "To evaluate whether the model generalizes to new, unseen data rather than merely memorizing training examples",
        "Because Python will crash if all data is stored in one variable",
        "To convert numbers into text format"
      ],
      correctIndex: 1,
      explanation: "Splitting data into training and test sets ensures that we validate whether our model learned genuine predictive patterns or merely overfit (memorized) the training set."
    }
  ];
}
