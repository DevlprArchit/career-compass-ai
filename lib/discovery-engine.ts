export interface UserProfile {
  id: string;
  name: string;
  email: string;
  degree: string;
  semesterOrStatus?: string;
  semester?: string;
  cgpaBand: string;
  codingExperience: string;
  dsaCount?: string;
  dsaProblemCount?: string;
  specializationTrade: string;
  targetCompanyTier: string;
  placementTimeline: string;
  weeklyHours?: number;
  tradeFitIndex?: number;
  readinessScore?: number;
  createdAt?: string;
  targetRole?: string;
  status?: string;
  // Social & Commercial Profile Fields
  username?: string;
  bio?: string;
  avatarUrl?: string;
  coverColor?: string;
  college?: string;
  graduationYear?: string;
  location?: string;
  targetCtc?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
  portfolioUrl?: string;
  skillsList?: string[];
  testsCompleted?: number;
  interviewsCompleted?: number;
}

export function cleanBadge(text?: string): string {
  if (!text) return "";
  return text.replace(/\s*\([^)]*\)/g, "").trim();
}

export const DEGREE_OPTIONS = [
  "Undergraduate / Bachelor's (B.Tech, B.E., BCA, B.Sc, B.Com, BBA, B.A.)",
  "Postgraduate / Master's (M.Tech, MCA, M.Sc, MBA, M.Com, M.A., MS)",
  "Recent Graduate / Degree Holder (All Disciplines)",
  "Diploma / Polytechnic / Vocational Degree (Higher Studies)",
  "Career Switcher / Self-Taught Post-Secondary Learner",
  "Working Professional / Upskilling Learner"
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
    shortDesc: "PyTorch, Transformers, LLM prompt workflows, and AI product development.",
    matchReason: "High demand across startups, tech enterprises, and forward-looking industries."
  },
  {
    id: "fullstack-python",
    title: "Full-Stack Engineer (React + Python)",
    shortDesc: "Modern web frontends, backend APIs, relational databases, and interactive apps.",
    matchReason: "Versatile, accessible pathway for all builders to create digital products."
  },
  {
    id: "data-scientist",
    title: "Data Scientist & Analytics Engineer",
    shortDesc: "Data manipulation, business analytics, statistical modeling, and insights reporting.",
    matchReason: "Ideal bridge for analytical, commerce, math, business, and science backgrounds."
  },
  {
    id: "backend-cloud",
    title: "Backend & Cloud Systems Engineer",
    shortDesc: "APIs, cloud architecture, Docker containers, database management, and Linux systems.",
    matchReason: "High-value infrastructure backbone powering internet applications."
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
    { tier: "Tier-1 Tech (Google / Microsoft / Amazon)", targetRole: "Applied ML Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "80+ LeetCode", keySkill: "PyTorch & Transformers (₹28-45 LPA)" },
    { tier: "High-Growth Unicorns (Uber / Zomato / Zepto)", targetRole: "Machine Learning Engineer", status: "Eligible Now", readinessReq: 74, dsaReq: "50+ LeetCode", keySkill: "FastAPI + Model Deployment (₹18-30 LPA)" },
    { tier: "Product Leaders (Freshworks / Postman)", targetRole: "Software Engineer — AI Systems", status: "Eligible Now", readinessReq: 68, dsaReq: "40+ LeetCode", keySkill: "Python OOP & API Integration (₹12-18 LPA)" },
    { tier: "Enterprise Services (TCS Digital / Infosys PP)", targetRole: "Systems Specialist", status: "Eligible Now", readinessReq: 58, dsaReq: "25+ LeetCode", keySkill: "Core Python & SQL (₹7.5-9.5 LPA)" }
  ],
  "fullstack-python": [
    { tier: "Tier-1 Tech (Amazon / Flipkart / Microsoft)", targetRole: "SDE-1 (Full Stack)", status: "On Track (Needs 2-4 Wks)", readinessReq: 82, dsaReq: "75+ Mediums", keySkill: "Next.js & Distributed Systems (₹22-38 LPA)" },
    { tier: "High-Growth Unicorns (Razorpay / Swiggy / CRED)", targetRole: "Software Development Engineer", status: "Eligible Now", readinessReq: 74, dsaReq: "50+ LeetCode", keySkill: "TypeScript + PostgreSQL (₹18-28 LPA)" },
    { tier: "Product Leaders (Zoho / Postman / BrowserStack)", targetRole: "Software Engineer", status: "Eligible Now", readinessReq: 65, dsaReq: "35+ LeetCode", keySkill: "React + REST APIs (₹10-18 LPA)" },
    { tier: "Enterprise Services (TCS Digital / Accenture Prime)", targetRole: "Associate Software Engineer", status: "Eligible Now", readinessReq: 58, dsaReq: "20+ LeetCode", keySkill: "Java/Python & Web Basics (₹6.5-9 LPA)" }
  ],
  "data-scientist": [
    { tier: "Tier-1 Tech (Google / Amazon / Flipkart)", targetRole: "Data Scientist I", status: "On Track (Needs 2-4 Wks)", readinessReq: 84, dsaReq: "70+ Mediums", keySkill: "A/B Testing & BigQuery (₹24-40 LPA)" },
    { tier: "High-Growth Unicorns (Swiggy / Zomato / Zepto)", targetRole: "Analytics Engineer", status: "Eligible Now", readinessReq: 72, dsaReq: "45+ LeetCode", keySkill: "Pandas + Statistical Modeling (₹16-26 LPA)" },
    { tier: "Product Leaders (Freshworks / BrowserStack)", targetRole: "Product Analyst", status: "Eligible Now", readinessReq: 66, dsaReq: "30+ LeetCode", keySkill: "Advanced SQL & Dashboards (₹10-16 LPA)" },
    { tier: "Enterprise Services (TCS Digital / Infosys)", targetRole: "Data Systems Trainee", status: "Eligible Now", readinessReq: 58, dsaReq: "20+ LeetCode", keySkill: "SQL Querying & Python (₹7-9 LPA)" }
  ],
  "backend-cloud": [
    { tier: "Tier-1 Tech (Amazon / Google Cloud / Microsoft)", targetRole: "Cloud Platform Engineer", status: "On Track (Needs 2-4 Wks)", readinessReq: 85, dsaReq: "80+ Mediums", keySkill: "Kubernetes & Go/Python (₹26-44 LPA)" },
    { tier: "High-Growth Unicorns (Razorpay / Atlassian / Uber)", targetRole: "DevOps & Infrastructure Engineer", status: "Eligible Now", readinessReq: 75, dsaReq: "50+ LeetCode", keySkill: "Docker + Terraform + CI/CD (₹18-35 LPA)" },
    { tier: "Product Leaders (Postman / Freshworks)", targetRole: "Site Reliability Engineer", status: "Eligible Now", readinessReq: 68, dsaReq: "35+ LeetCode", keySkill: "Linux Internals & AWS (₹12-20 LPA)" },
    { tier: "Enterprise Services (TCS Digital / Accenture)", targetRole: "Cloud Infrastructure Associate", status: "Eligible Now", readinessReq: 58, dsaReq: "20+ LeetCode", keySkill: "Linux & Cloud Basics (₹7-9.5 LPA)" }
  ]
};

// Authentic, student-calibrated diagnostic specialization questions tailored per trade and experience level
export function getStudentFriendlyQuestions(
  trade: string, 
  level: "beginner" | "intermediate" | "advanced" = "beginner"
): AccessibleQuestion[] {
  const t = String(trade || "").toLowerCase();

  // =========================================================================
  // 1. FULL-STACK / WEB DEVELOPMENT
  // =========================================================================
  if (t.includes("web") || t.includes("fullstack")) {
    if (level === "beginner") {
      return [
        {
          id: "web-beg-q1",
          category: "HTML & DOM Foundations",
          question: "In HTML, what is the primary visual difference between a block element (like <div>) and an inline element (like <span>)?",
          options: [
            "Block elements start on a new line and take up the full available width; inline elements stay on the same line and only take up as much width as their content",
            "Inline elements can only display images; block elements can only display text",
            "Block elements cannot be styled with CSS stylesheets",
            "There is no difference in layout or rendering behavior"
          ],
          correctIndex: 0,
          explanation: "Block elements (<div>, <p>, <h1>) occupy the full width of their parent container and cause a line break. Inline elements (<span>, <a>, <strong>) flow horizontally alongside adjacent text."
        },
        {
          id: "web-beg-q2",
          category: "CSS Box Model",
          question: "In the CSS Box Model, what is the space directly between an element's inner content and its outer border called?",
          options: [
            "Margin",
            "Padding",
            "Outline",
            "Border-radius"
          ],
          correctIndex: 1,
          explanation: "Padding is the interior breathing room between an element's content and its border. Margin is the outer spacing separating the element from neighboring elements."
        },
        {
          id: "web-beg-q3",
          category: "JavaScript Basics",
          question: "In modern JavaScript, what is the key difference between declaring a variable with `const` versus `let`?",
          options: [
            "A variable declared with `const` cannot be reassigned to a new value, while a `let` variable can be reassigned",
            "`let` can only hold numbers, while `const` can only hold text strings",
            "`const` deletes memory from the browser automatically",
            "`let` cannot be used inside functions or conditional blocks"
          ],
          correctIndex: 0,
          explanation: "`const` creates a read-only variable reference that cannot be reassigned with the assignment operator (=), whereas `let` allows reassigning new values over time."
        },
        {
          id: "web-beg-q4",
          category: "Arrays & Iteration",
          question: "If you have the JavaScript array `const scores = [85, 92, 78]`, which expression accesses the very first item (85)?",
          options: [
            "scores[1]",
            "scores[0]",
            "scores.first()",
            "scores[-1]"
          ],
          correctIndex: 1,
          explanation: "JavaScript arrays are zero-indexed, meaning the first item is stored at index 0 (`scores[0]`), the second at index 1, and so forth."
        },
        {
          id: "web-beg-q5",
          category: "Web & Network Basics",
          question: "When you type a URL into a web browser to load and view a webpage, which standard HTTP request method is sent to the server?",
          options: [
            "POST",
            "GET",
            "DELETE",
            "PATCH"
          ],
          correctIndex: 1,
          explanation: "The HTTP GET method is used to retrieve data or HTML documents from a server without modifying any server-side database records."
        },
        {
          id: "web-beg-q6",
          category: "Programming Functions",
          question: "In JavaScript, what is the output of calling `calculateTotal(5, 3)` given the function below?\nfunction calculateTotal(a, b) {\n  return a + b * 2;\n}",
          options: [
            "16 (because (5 + 3) * 2 = 16)",
            "11 (because multiplication 3 * 2 = 6 happens before addition 5 + 6 = 11)",
            "10",
            "Error: cannot pass two arguments"
          ],
          correctIndex: 1,
          explanation: "Following mathematical order of operations (operator precedence), multiplication (`3 * 2 = 6`) takes precedence over addition (`5 + 6 = 11`)."
        }
      ];
    } else if (level === "intermediate") {
      return [
        {
          id: "web-int-q1",
          category: "React Architecture",
          question: "Why should you avoid using array indices as the `key` prop when rendering dynamic lists in React?",
          options: [
            "React throws a compile-time syntax error if an index is passed as a key",
            "Array indices take up significantly more memory in the Virtual DOM tree",
            "Reordering, adding, or deleting items causes component state to attach to the wrong DOM nodes, causing subtle UI rendering bugs",
            "Keys must strictly be cryptographically secure UUID v4 strings"
          ],
          correctIndex: 2,
          explanation: "When list items are reordered or filtered, index keys fail to uniquely identify item identity across renders, causing React to reuse stale DOM nodes and preserve incorrect internal component state."
        },
        {
          id: "web-int-q2",
          category: "HTTP & REST Standards",
          question: "Which of the following HTTP methods is defined as IDEMPOTENT by RFC specifications?",
          options: [
            "POST (submitting a new payment order)",
            "CONNECT (establishing a tunnel to the server)",
            "PATCH (incrementing an internal counter)",
            "PUT (replacing the target resource entirely with the request payload)"
          ],
          correctIndex: 3,
          explanation: "Idempotent operations produce the identical server state regardless of whether they are executed once or multiple times. PUT and DELETE are idempotent; POST produces new side effects on repeated requests."
        },
        {
          id: "web-int-q3",
          category: "Database Performance",
          question: "What is the primary performance consequence of creating a B-Tree index on a frequently filtered column in PostgreSQL or MySQL?",
          options: [
            "It accelerates write (INSERT/UPDATE) speeds by eliminating locking",
            "It reduces query lookup time from O(N) full table scans to O(log N) tree traversals, at the cost of slightly slower write operations",
            "It compresses the underlying database table storage size by 50%",
            "It eliminates the need for foreign key constraints across joined tables"
          ],
          correctIndex: 1,
          explanation: "B-Tree indexes speed up SELECT lookups from linear O(N) scans to logarithmic O(log N) traversals, but require extra disk space and add write overhead because the index tree must be updated on every INSERT/UPDATE/DELETE."
        },
        {
          id: "web-int-q4",
          category: "Asynchronous JavaScript",
          question: "What happens if an asynchronous function throws an unhandled error inside a `try...catch` block that lacks an `await` before a returned Promise?",
          options: [
            "The error is caught cleanly by the local catch block",
            "The Promise escapes the local try...catch and triggers an unhandled rejection, because the function returns before the Promise resolves",
            "The browser crashes immediately",
            "The error is automatically retried 3 times"
          ],
          correctIndex: 1,
          explanation: "Without `await`, a function returning a Promise exits immediately. If that Promise later rejects, the local try...catch has already finished executing, causing the error to bubble up as an unhandled Promise rejection."
        },
        {
          id: "web-int-q5",
          category: "State Management",
          question: "In React, when is using external state management (like Zustand) advantageous over deeply nested React Context?",
          options: [
            "Context cannot store JavaScript arrays or objects",
            "External stores provide granular selector subscriptions, avoiding unnecessary re-renders across components when unrelated state slices update",
            "Zustand allows running frontend components without a web browser",
            "Context API is deprecated in React 18 and 19"
          ],
          correctIndex: 1,
          explanation: "When Context value updates, every consumer component re-renders. Selector-based stores like Zustand only trigger re-renders for components whose specific selected state slice actually changed."
        },
        {
          id: "web-int-q6",
          category: "Web Security",
          question: "What type of web vulnerability is mitigated by setting the `HttpOnly` cookie flag on authentication session cookies?",
          options: [
            "SQL Injection (SQLi)",
            "Cross-Site Scripting (XSS) token theft, by preventing client-side JavaScript from reading `document.cookie`",
            "Denial of Service (DoS)",
            "DNS Spoofing"
          ],
          correctIndex: 1,
          explanation: "The `HttpOnly` flag instructs the browser that the cookie should never be accessible via client-side JavaScript (`document.cookie`), neutralizing session hijacking via XSS."
        }
      ];
    } else {
      // Advanced
      return [
        {
          id: "web-adv-q1",
          category: "JavaScript Concurrency",
          question: "In the JavaScript Event Loop, in what sequence are tasks executed when both a Promise.resolve().then() microtask and a setTimeout(..., 0) macrotask are pending?",
          options: [
            "All pending microtasks (Promise callbacks) execute before the next macrotask (setTimeout)",
            "The setTimeout callback executes first because timers have top OS priority",
            "They execute in non-deterministic order depending on CPU load",
            "Macrotasks and microtasks are alternated one-by-one by the V8 garbage collector"
          ],
          correctIndex: 0,
          explanation: "The JavaScript event loop prioritizes the microtask queue; all queued microtasks (Promises, queueMicrotask) run to completion before processing the next macrotask (setTimeout)."
        },
        {
          id: "web-adv-q2",
          category: "Web Security & Networking",
          question: "Under what condition will a modern browser send an automated CORS Preflight (HTTP OPTIONS) request prior to dispatching an API call?",
          options: [
            "Whenever the API endpoint returns an HTTP 500 error code",
            "When the request is cross-origin and uses custom headers (e.g., 'Authorization') or methods other than GET, POST, or HEAD",
            "Only when the user opens Developer Tools in Google Chrome",
            "Whenever a request payload is larger than 1 megabyte"
          ],
          correctIndex: 1,
          explanation: "CORS enforces preflight OPTIONS requests whenever a cross-origin request specifies non-simple headers (like Authorization) or non-simple methods to verify server authorization before sending the actual payload."
        },
        {
          id: "web-adv-q3",
          category: "Rendering Architecture",
          question: "In Next.js React Server Components (RSC), what is sent from the server to the client browser during a page transition?",
          options: [
            "Raw uncompiled TypeScript code",
            "A serialized JSON-like Virtual DOM stream (RSC payload) with references to client component chunks, without shipping server component JavaScript to the client",
            "A complete screenshot image of the rendered page",
            "A SQL database backup file"
          ],
          correctIndex: 1,
          explanation: "Server Components render on the server into a compact RSC stream representing the UI tree. Client bundles remain lean because server component code dependencies never get downloaded to client devices."
        },
        {
          id: "web-adv-q4",
          category: "Database Isolation",
          question: "In relational databases, which transaction isolation level completely prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?",
          options: [
            "Read Uncommitted",
            "Read Committed",
            "Repeatable Read",
            "Serializable"
          ],
          correctIndex: 3,
          explanation: "Serializable is the highest isolation level. It emulates serial transaction execution, completely eliminating dirty reads, non-repeatable reads, and phantom reads."
        },
        {
          id: "web-adv-q5",
          category: "Caching & Invalidation",
          question: "What does the HTTP header `Cache-Control: s-maxage=3600, stale-while-revalidate=60` instruct shared CDN caches to do?",
          options: [
            "Delete the asset after 60 seconds and reject all traffic",
            "Cache the response for 3600 seconds on shared CDNs, and serve stale cached content for up to 60 seconds while asynchronously fetching fresh content in the background",
            "Force the browser to redownload the asset on every keystroke",
            "Encrypt the asset with 60-bit SSL keys"
          ],
          correctIndex: 1,
          explanation: "This pattern provides near-instant response times by serving stale content from edge nodes while asynchronously fetching new data from origin servers."
        },
        {
          id: "web-adv-q6",
          category: "System Scalability",
          question: "When scaling a WebSocket-based chat service across multiple server instances behind a load balancer, what mechanism enables broadcasting messages between users connected to different instances?",
          options: [
            "Using client-side localStorage polling",
            "A distributed Pub/Sub message broker (such as Redis Pub/Sub or Apache Kafka) that relays broadcast events across all server nodes",
            "Restarting the load balancer on each sent message",
            "Sticking all users onto a single thread"
          ],
          correctIndex: 1,
          explanation: "A distributed Pub/Sub layer allows any WebSocket instance to publish a message that all other listening instances receive and forward to their respective locally connected client sockets."
        }
      ];
    }
  }

  // =========================================================================
  // 2. AI & MACHINE LEARNING
  // =========================================================================
  if (t.includes("ai") || t.includes("ml") || t.includes("machine")) {
    if (level === "beginner") {
      return [
        {
          id: "ai-beg-q1",
          category: "Python Basics",
          question: "In Python, which built-in function returns the total number of items stored in a list or characters in a string?",
          options: [
            "count()",
            "len()",
            "size()",
            "total()"
          ],
          correctIndex: 1,
          explanation: "The `len()` function returns the length (number of elements) of any sequence or collection in Python."
        },
        {
          id: "ai-beg-q2",
          category: "Python Data Structures",
          question: "Which of the following Python declarations creates a Dictionary storing key-value pairs?",
          options: [
            "items = [\"name\", \"Priya\", \"score\", 90]",
            "student = {\"name\": \"Priya\", \"score\": 90}",
            "records = (\"Priya\", 90)",
            "values = {\"Priya\", 90}"
          ],
          correctIndex: 1,
          explanation: "Dictionaries in Python use curly braces with colons separating keys and values: `{\"name\": \"Priya\", \"score\": 90}`."
        },
        {
          id: "ai-beg-q3",
          category: "Control Flow & Loops",
          question: "What will the following Python loop output?\nfor x in range(3):\n    print(x)",
          options: [
            "0, 1, 2 (each on a new line)",
            "1, 2, 3 (each on a new line)",
            "3, 3, 3",
            "0, 1, 2, 3"
          ],
          correctIndex: 0,
          explanation: "`range(3)` produces numbers starting from 0 up to, but not including, 3 (i.e. 0, 1, 2)."
        },
        {
          id: "ai-beg-q4",
          category: "Functions in Python",
          question: "Which keyword is used in Python to define a custom function?",
          options: [
            "func",
            "function",
            "def",
            "define"
          ],
          correctIndex: 2,
          explanation: "Python uses the `def` keyword (short for 'define') to declare functions, followed by the function name and parameters: `def my_function():`."
        },
        {
          id: "ai-beg-q5",
          category: "Machine Learning Concept",
          question: "Why do machine learning practitioners split a dataset into separate Training and Testing sets?",
          options: [
            "Because computers cannot store more than 1,000 rows in memory",
            "To evaluate how well the trained model predicts on fresh, unseen data and make sure it has not simply memorized training examples",
            "To convert all numbers into strings automatically",
            "To automatically remove all null values"
          ],
          correctIndex: 1,
          explanation: "Evaluating on an independent test set measures real-world generalization and diagnoses whether the model has overfitted to the training data."
        },
        {
          id: "ai-beg-q6",
          category: "Data Libraries",
          question: "Which popular Python library is primarily used for loading, filtering, and manipulating structured tabular data (rows and columns)?",
          options: [
            "Pandas",
            "Pygame",
            "Turtle",
            "Flask"
          ],
          correctIndex: 0,
          explanation: "Pandas provides the DataFrame data structure, which is the industry standard for analyzing and cleaning tabular datasets in Python."
        }
      ];
    } else if (level === "intermediate") {
      return [
        {
          id: "ai-int-q1",
          category: "Model Generalization",
          question: "When a machine learning model achieves 99% accuracy on training data but drops to 61% on test data, what issue has occurred?",
          options: [
            "Underfitting: the model is too simple to capture patterns",
            "Overfitting: the model has memorized training noise rather than generalizable relationships",
            "Data leakage from the test set",
            "The learning rate was too low"
          ],
          correctIndex: 1,
          explanation: "A large discrepancy between high training performance and low test performance is the hallmark of overfitting."
        },
        {
          id: "ai-int-q2",
          category: "Evaluation Metrics",
          question: "For a medical diagnosis model where detecting a rare disease (1 in 1000 patients) is critical, which metric best evaluates catching as many actual disease cases as possible?",
          options: [
            "Recall (Sensitivity)",
            "Raw Classification Accuracy",
            "R-squared",
            "Mean Absolute Error"
          ],
          correctIndex: 0,
          explanation: "Recall measures True Positives / (True Positives + False Negatives). High recall minimizes missed cases (False Negatives), which is vital in medical diagnostics."
        },
        {
          id: "ai-int-q3",
          category: "Feature Scaling",
          question: "Why is feature scaling (like StandardScaler or MinMaxScaler) recommended before training distance-based algorithms like KNN or K-Means?",
          options: [
            "It turns negative numbers into positive numbers",
            "It prevents features with large numeric scales (e.g. Salary in thousands) from dominating features with small scales (e.g. Age in tens) in distance calculations",
            "It eliminates the need for test datasets",
            "It removes all categorical variables"
          ],
          correctIndex: 1,
          explanation: "Euclidean distance is sensitive to magnitude. Features with much larger numeric scales would disproportionately dictate cluster assignments without proper scaling."
        },
        {
          id: "ai-int-q4",
          category: "Neural Network Foundations",
          question: "In artificial neural networks, what is the primary purpose of Non-Linear Activation Functions (like ReLU or Sigmoid)?",
          options: [
            "To reset weights to zero after every forward pass",
            "To enable the network to learn non-linear decision boundaries and complex patterns beyond simple linear combinations",
            "To speed up hard drive reading speeds",
            "To calculate the total number of layers"
          ],
          correctIndex: 1,
          explanation: "Without non-linear activations, stacking multiple neural layers mathematically collapses into a single linear regression, preventing the network from learning complex non-linear patterns."
        },
        {
          id: "ai-int-q5",
          category: "Supervised vs Unsupervised",
          question: "Which of the following problems is an example of Unsupervised Learning?",
          options: [
            "Predicting house prices from square footage and bedrooms",
            "Classifying emails as Spam or Not Spam using labelled emails",
            "Clustering customer purchase histories into distinct buyer personas without pre-existing category labels",
            "Recognizing handwritten digits using MNIST labelled images"
          ],
          correctIndex: 2,
          explanation: "Unsupervised learning discovers intrinsic groupings and patterns in data without relying on predefined ground-truth labels."
        },
        {
          id: "ai-int-q6",
          category: "Optimization",
          question: "In Gradient Descent optimization, what is the role of the Learning Rate hyperparameter?",
          options: [
            "It specifies how many hidden layers the network contains",
            "It controls the step size taken along the gradient direction to update model weights in each iteration",
            "It sets the maximum duration the GPU can run",
            "It automatically chooses between CPU and GPU hardware"
          ],
          correctIndex: 1,
          explanation: "The learning rate scales the magnitude of weight adjustments. Too large a step can cause divergence; too small can make training converge painfully slowly."
        }
      ];
    } else {
      // Advanced
      return [
        {
          id: "ai-adv-q1",
          category: "Deep Learning Foundations",
          question: "During backpropagation in PyTorch or TensorFlow, what mathematical mechanism enables computing gradients of the loss with respect to early layer weights?",
          options: [
            "The Gauss-Markov Theorem of linear unbiased estimators",
            "The Multivariable Chain Rule, multiplying Jacobians of partial derivatives backwards from the loss function",
            "Monte Carlo random sampling across layer activations",
            "The Central Limit Theorem of normal distributions"
          ],
          correctIndex: 1,
          explanation: "Autograd engines apply the multivariable chain rule recursively backward through the directed acyclic computational graph (DAG) to calculate parameter gradients from output loss down to input weights."
        },
        {
          id: "ai-adv-q2",
          category: "Transformer Architecture",
          question: "In standard Multi-Head Scaled Dot-Product Attention, what is the computational and memory complexity with respect to the input sequence length N?",
          options: [
            "Linear complexity O(N)",
            "Logarithmic complexity O(log N)",
            "Constant complexity O(1)",
            "Quadratic complexity O(N^2), because every token computes attention weights against every other token in the sequence"
          ],
          correctIndex: 3,
          explanation: "Full self-attention computes an N x N attention matrix (Q * K^T), resulting in O(N^2) time and memory complexity with respect to sequence length."
        },
        {
          id: "ai-adv-q3",
          category: "Model Regularization",
          question: "Which regularization technique randomly deactivates a fraction of neurons during each forward pass of neural network training?",
          options: [
            "Dropout, which prevents co-adaptation of feature detectors and forces the network to learn robust redundant representations",
            "Weight Decay (L2 penalty), which drives weights toward infinity",
            "Gradient Clipping, which forces activations to strictly positive values",
            "Batch Normalization, which prunes unused synapses permanently"
          ],
          correctIndex: 0,
          explanation: "Dropout sets randomly selected activations to 0 with probability p during training, preventing neurons from relying on specific co-adaptations."
        },
        {
          id: "ai-adv-q4",
          category: "Vector Search & Embeddings",
          question: "Why is Cosine Similarity commonly preferred over Euclidean (L2) Distance when comparing high-dimensional text embeddings in vector databases?",
          options: [
            "Cosine similarity can only be computed on binary numbers",
            "Euclidean distance cannot be calculated in spaces with more than 3 dimensions",
            "Cosine similarity measures the directional angular alignment between two vectors, rendering it invariant to document length and token frequency magnitude",
            "Vector databases cannot store floating-point numbers"
          ],
          correctIndex: 2,
          explanation: "Cosine similarity calculates the cosine of the angle between two embedding vectors, evaluating semantic orientation rather than Euclidean magnitude."
        },
        {
          id: "ai-adv-q5",
          category: "Optimization Dynamics",
          question: "What is the primary motivation for utilizing a Learning Rate Warmup schedule during the initial epochs of training large deep models?",
          options: [
            "To allow the GPU fans to reach operating temperature",
            "To prevent large, erratic gradient updates from destabilizing randomly initialized weights before parameter statistics stabilize",
            "To intentionally slow down training to save cloud billing credits",
            "To convert 32-bit floating point model weights into 8-bit quantized integers"
          ],
          correctIndex: 1,
          explanation: "Gradually ramping up the learning rate from near-zero prevents catastrophic updates that can push weights into unrecoverable sub-optimal regions."
        },
        {
          id: "ai-adv-q6",
          category: "Loss Functions",
          question: "For a multi-class image classification model with mutually exclusive classes, which loss function is mathematically standard when paired with a Softmax output layer?",
          options: [
            "Categorical Cross-Entropy Loss, which penalizes the negative logarithm of the predicted probability assigned to the ground-truth class",
            "Mean Squared Error (MSE), which treats class indices as continuous numerical coordinates",
            "Binary Hinge Loss used strictly in Support Vector Machines",
            "Cosine Embedding Loss for unsupervised autoencoders"
          ],
          correctIndex: 0,
          explanation: "Categorical Cross-Entropy measures the divergence between the true one-hot distribution and the predicted Softmax probability distribution."
        }
      ];
    }
  }

  // =========================================================================
  // 3. DATA SCIENCE & ANALYTICS
  // =========================================================================
  if (t.includes("data") || t.includes("analytic")) {
    if (level === "beginner") {
      return [
        {
          id: "ds-beg-q1",
          category: "SQL Basics",
          question: "Which basic SQL query retrieves all columns for students who scored higher than 80 from a table named `students`?",
          options: [
            "GET ALL FROM students IF marks > 80;",
            "SELECT * FROM students WHERE marks > 80;",
            "EXTRACT * IN students HAVING marks > 80;",
            "FIND students WHERE marks > 80;"
          ],
          correctIndex: 1,
          explanation: "`SELECT * FROM table_name WHERE condition;` is the standard SQL syntax for querying all columns matching a filter criteria."
        },
        {
          id: "ds-beg-q2",
          category: "Descriptive Statistics",
          question: "Given the exam scores: [10, 20, 20, 30, 1000], which summary metric is resistant to being distorted by the extreme outlier (1000)?",
          options: [
            "Mean (Average)",
            "Median (Middle value)",
            "Range (Max - Min)",
            "Standard Deviation"
          ],
          correctIndex: 1,
          explanation: "The median (20) represents the 50th percentile and is robust against extreme outliers, unlike the mean which would be heavily inflated."
        },
        {
          id: "ds-beg-q3",
          category: "Tabular Concepts",
          question: "In a standard data table or spreadsheet, what do rows and columns represent?",
          options: [
            "Rows are individual observations/records; columns are attributes/features describing each record",
            "Columns are individual observations; rows are attributes",
            "Rows and columns are completely interchangeable with no difference",
            "Rows only contain numbers; columns only contain text"
          ],
          correctIndex: 0,
          explanation: "Each row corresponds to an individual entity or event (e.g. a customer), and each column represents a specific attribute (e.g. name, age, city)."
        },
        {
          id: "ds-beg-q4",
          category: "File Formats",
          question: "What does the commonly used data file extension `.csv` stand for?",
          options: [
            "Compiled Software Vector",
            "Comma-Separated Values",
            "Central Statistical Volume",
            "Compressed Storage Variable"
          ],
          correctIndex: 1,
          explanation: "CSV stands for Comma-Separated Values, a lightweight plain-text format for exchanging tabular data."
        },
        {
          id: "ds-beg-q5",
          category: "Data Cleaning",
          question: "What is the primary objective of the Data Cleaning stage in a data science project?",
          options: [
            "To make all numbers strictly integers",
            "To identify and handle missing values, remove duplicates, and fix formatting errors before analysis",
            "To compress the dataset into a zip archive",
            "To translate data into different spoken languages"
          ],
          correctIndex: 1,
          explanation: "Data cleaning ensures data consistency, removes invalid anomalies, and imputes or drops missing values so downstream models do not train on corrupt inputs."
        },
        {
          id: "ds-beg-q6",
          category: "Data Visualization",
          question: "Which chart type is best suited for visualizing how a company's revenue changes continuously over 12 months?",
          options: [
            "Pie Chart",
            "Line Chart",
            "Scatter Plot with no lines",
            "Treemap"
          ],
          correctIndex: 1,
          explanation: "Line charts clearly depict continuous trends and temporal fluctuations over ordered time intervals."
        }
      ];
    } else {
      // Intermediate / Advanced
      return [
        {
          id: "ds-q1",
          category: "Feature Engineering",
          question: "In a multiple linear regression model, what is the standard consequence of severe Multicollinearity among predictor variables?",
          options: [
            "The model's training score drops immediately to zero",
            "Coefficient estimates become unstable with inflated standard errors, making it difficult to assess individual feature significance",
            "The dependent variable automatically converts to categorical format",
            "It violates the assumption that residuals are normally distributed"
          ],
          correctIndex: 1,
          explanation: "High correlation between independent features causes multicollinearity, inflating the variance of coefficient estimates (high Variance Inflation Factor) and making regression coefficients erratic and sensitive to small model changes."
        },
        {
          id: "ds-q2",
          category: "Machine Learning Regularization",
          question: "What is the key mathematical difference in parameter shrinkage between L1 Regularization (Lasso) and L2 Regularization (Ridge)?",
          options: [
            "L1 adds the sum of absolute weight values and drives non-essential coefficients strictly to zero (feature selection), while L2 adds squared weights and shrinks coefficients asymptotically toward zero",
            "L1 only works on decision trees, while L2 is reserved exclusively for neural networks",
            "L2 can only be applied to binary classification problems",
            "L1 doubles the number of trainable weights to prevent underfitting"
          ],
          correctIndex: 0,
          explanation: "L1 penalty (lambda * |w|) produces sparse solutions by forcing coefficients of uninformative features to exactly 0, performing intrinsic feature selection. L2 penalty (lambda * w^2) penalizes large weights smoothly without driving them to absolute zero."
        },
        {
          id: "ds-q3",
          category: "SQL Analytics",
          question: "In SQL analytical window functions, how does `DENSE_RANK()` behave compared to `RANK()` when identical values (ties) occur?",
          options: [
            "DENSE_RANK() deletes duplicate rows from the output dataset",
            "RANK() assigns consecutive integer ranks, while DENSE_RANK() skips numbers after ties",
            "DENSE_RANK() assigns the same rank to ties and assigns the immediate next consecutive integer to the following row without gaps",
            "DENSE_RANK() sorts data in reverse alphabetical order"
          ],
          correctIndex: 2,
          explanation: "For tied values (e.g. two items tied for rank 2), RANK() assigns (2, 2, 4) with a gap, while DENSE_RANK() assigns (2, 2, 3) without skipping any ranking values."
        },
        {
          id: "ds-q4",
          category: "Statistical Inference",
          question: "When running an A/B test on a SaaS product, what does a p-value of 0.03 indicate when tested against a significance threshold alpha of 0.05?",
          options: [
            "There is a 97% probability that the new feature is defective",
            "The test was statistically underpowered due to low sample size",
            "The user retention metric improved by exactly 3 percent",
            "Assuming the null hypothesis of no effect is true, there is only a 3% probability of observing an outcome this extreme, justifying rejection of the null hypothesis"
          ],
          correctIndex: 3,
          explanation: "A p-value measures the probability of obtaining test results at least as extreme as the observed data under the assumption that the null hypothesis is true. Because p < 0.05, we reject the null hypothesis at the 5% significance level."
        },
        {
          id: "ds-q5",
          category: "Data Cleansing",
          question: "When dealing with continuous sensor measurements that exhibit heavy skew and extreme outliers, which imputation strategy is statistically most robust?",
          options: [
            "Replacing all null records with the arithmetic Mean of the column",
            "Imputing with the Median or using iterative K-Nearest Neighbors (KNN) based on correlated feature vectors",
            "Dropping every row containing even one missing reading",
            "Assigning a static zero (0) to every empty field"
          ],
          correctIndex: 1,
          explanation: "The arithmetic mean is highly distorted by extreme values and skew. Median imputation preserves the 50th percentile without outlier distortion, while KNN imputation predicts missing entries based on multi-dimensional feature similarity."
        },
        {
          id: "ds-q6",
          category: "Model Evaluation",
          question: "For a fraud detection classifier where only 0.1% of transactions are fraudulent, which evaluation metric is most informative regarding true model efficacy?",
          options: [
            "Precision-Recall Area Under Curve (PR-AUC) and F1-Score focusing on the positive (fraud) class",
            "Overall Raw Classification Accuracy across the entire dataset",
            "R-Squared (Coefficient of Determination)",
            "Mean Absolute Percentage Error (MAPE)"
          ],
          correctIndex: 0,
          explanation: "In highly imbalanced datasets, a naive model predicting 'No Fraud' for 100% of cases achieves 99.9% accuracy while catching zero fraud. PR-AUC and F1-Score specifically measure the trade-off between False Positives (Precision) and False Negatives (Recall)."
        }
      ];
    }
  }

  // =========================================================================
  // 4. BACKEND, DEVOPS & CLOUD
  // =========================================================================
  if (level === "beginner") {
    return [
      {
        id: "ops-beg-q1",
        category: "Terminal & Shell Basics",
        question: "In a Linux or macOS terminal, which command is used to list all files and folders in the current directory?",
        options: [
          "showfiles",
          "ls",
          "open",
          "listall"
        ],
        correctIndex: 1,
        explanation: "`ls` (short for list) lists the files and directories inside the current active working directory."
      },
      {
        id: "ops-beg-q2",
        category: "Networking Basics",
        question: "What is an IP address in computer networks?",
        options: [
          "A password used to log into Wi-Fi",
          "A unique numerical address identifying a device communicating over a network",
          "The brand name of your computer router",
          "A type of web browser"
        ],
        correctIndex: 1,
        explanation: "An Internet Protocol (IP) address is a unique identifier assigned to every device connected to a computer network that uses the IP protocol for communication."
      },
      {
        id: "ops-beg-q3",
        category: "Git Version Control",
        question: "In Git, what does running `git commit -m \"Add user login\"` accomplish?",
        options: [
          "It uploads the code directly to Google Cloud",
          "It saves a permanent snapshot of staged changes into the local repository history with a descriptive message",
          "It deletes the code from your computer",
          "It creates a new GitHub account"
        ],
        correctIndex: 1,
        explanation: "A git commit records a snapshot of your staged files in the local Git repository history, creating a historical checkpoint."
      },
      {
        id: "ops-beg-q4",
        category: "Cloud Computing Basics",
        question: "What is the primary benefit of Cloud Computing (like AWS, Google Cloud, or Azure) over buying physical servers?",
        options: [
          "Cloud computing requires no internet connection",
          "You can provision compute, storage, and databases on-demand and only pay for what you use, without maintaining physical server hardware",
          "Cloud servers never experience any network latency",
          "Cloud computing eliminates the need for software programming"
        ],
        correctIndex: 1,
        explanation: "Cloud computing provides elastic, on-demand infrastructure over the internet with pay-as-you-go pricing, eliminating upfront capital costs for hardware."
      },
      {
        id: "ops-beg-q5",
        category: "Application Configuration",
        question: "Why should sensitive credentials (like database passwords and API keys) be stored in Environment Variables instead of hardcoded into source code files?",
        options: [
          "Because environment variables make code compile 10x faster",
          "To prevent leaking private secrets into public version control repositories (like GitHub) and allow different configurations per environment",
          "Because Python cannot read strings from code files",
          "Environment variables are required by HTML standards"
        ],
        correctIndex: 1,
        explanation: "Environment variables keep sensitive secrets separate from code repositories, preventing accidental leaks and enabling seamless environment switching (development, staging, production)."
      },
      {
        id: "ops-beg-q6",
        category: "Client vs Server",
        question: "What is the fundamental difference between the Frontend and the Backend in web systems?",
        options: [
          "Frontend is the client interface users see and interact with in the browser; Backend is the server-side logic, APIs, and databases",
          "Frontend only works on phones; Backend only works on laptops",
          "Backend is written only in HTML; Frontend is written only in SQL",
          "There is no distinction in modern software"
        ],
        correctIndex: 0,
        explanation: "The Frontend (client side) handles the presentation and user interaction, while the Backend (server side) manages business logic, data persistence, and security."
      }
    ];
  } else {
    // Intermediate / Advanced DevOps
    return [
      {
        id: "ops-q1",
        category: "Containerization",
        question: "In a production Dockerfile, why are multi-stage builds (`FROM ... AS builder` followed by `FROM ... AS runner`) considered an industry best practice?",
        options: [
          "They compile Docker images directly into bare-metal kernel drivers",
          "They separate heavy build toolchains (compilers, SDKs, devDependencies) from the final runtime image, drastically reducing image size and attack surface",
          "They bypass the need for Docker daemon licensing",
          "They automatically deploy containers across multiple cloud regions"
        ],
        correctIndex: 1,
        explanation: "Multi-stage builds allow developers to install compilers and build dependencies in an intermediate container, then copy only the compiled binary and production artifacts into a minimal base image, reducing image sizes drastically."
      },
      {
        id: "ops-q2",
        category: "Kubernetes Orchestration",
        question: "In Kubernetes, what is the architectural relationship between a Pod, a Deployment, and a Service?",
        options: [
          "A Pod controls multiple Deployments, and a Service replaces Docker containers entirely",
          "Deployments, Pods, and Services are identical objects with different naming conventions",
          "A Deployment manages declarative rolling updates and replica counts of Pods, while a Service provides a stable internal IP/DNS and load balances traffic to those Pods",
          "Pods are physical server hardware, while Deployments are cloud VPC networks"
        ],
        correctIndex: 2,
        explanation: "Pods are ephemeral execution units. A Kubernetes Deployment declares the desired state and orchestrates rolling updates. A Service provides a stable network endpoint with DNS abstraction, routing client traffic to active healthy Pods."
      },
      {
        id: "ops-q3",
        category: "Scaling & Resiliency",
        question: "What is the primary role of the Kubernetes Horizontal Pod Autoscaler (HPA)?",
        options: [
          "Dynamically adjusting the number of Pod replicas based on observed CPU utilization, memory thresholds, or custom application metrics",
          "Increasing the physical RAM of worker nodes without restarting hardware",
          "Automatically purchasing discounted reserved cloud instances on AWS/GCP",
          "Restarting crashed containers in an infinite loop"
        ],
        correctIndex: 0,
        explanation: "The Kubernetes HPA queries the Metrics Server periodically and scales the replica count of a Deployment up or down automatically to maintain target resource utilization under fluctuating traffic."
      },
      {
        id: "ops-q4",
        category: "Continuous Deployment",
        question: "How does a Canary Deployment strategy mitigate risk during software releases compared to an all-at-once rollout?",
        options: [
          "It runs the build exclusively inside offline staging environments without ever touching production",
          "It converts all backend microservices into serverless Lambda functions",
          "It creates duplicate user accounts for manual QA testing",
          "It routes a small fraction of real production traffic (e.g., 5-10%) to the new version to monitor telemetry and error rates before full release"
        ],
        correctIndex: 3,
        explanation: "Canary deployments expose new versions to a tiny subset of real production traffic while monitoring metrics. If an anomaly occurs, the deployment rolls back with minimal blast radius to users."
      },
      {
        id: "ops-q5",
        category: "Infrastructure as Code",
        question: "In Terraform, what is the purpose of the `terraform.tfstate` state file?",
        options: [
          "It stores all user passwords in plain text for debugging",
          "It records the mapping between declarative code definitions and actual provisioned cloud resources, enabling Terraform to calculate diffs during `plan` and `apply`",
          "It compiles HCL code directly into Python scripts",
          "It acts as a temporary cache that is automatically discarded after each command"
        ],
        correctIndex: 1,
        explanation: "Terraform uses the state file to track real-world infrastructure metadata and resource IDs, allowing it to determine what resources need to be created, updated, or destroyed when infrastructure code changes."
      },
      {
        id: "ops-q6",
        category: "Network Engineering",
        question: "What is the key technical difference between a Layer 4 (Transport) and Layer 7 (Application) Load Balancer?",
        options: [
          "Layer 4 load balancers cannot handle encrypted HTTPS traffic",
          "Layer 4 load balancers only work with IPv6 connections",
          "Layer 4 routes packets based on TCP/UDP IP and port headers without inspecting payload content; Layer 7 inspects HTTP headers, cookies, and URL paths to make intelligent routing decisions",
          "Layer 7 load balancers run 10x faster than Layer 4 hardware switches"
        ],
        correctIndex: 2,
        explanation: "Layer 4 operates at the transport layer (TCP/UDP), routing packets purely on network sockets. Layer 7 terminates the HTTP/HTTPS session, inspecting request headers, paths, and cookies for advanced content-based routing."
      }
    ];
  }
}
