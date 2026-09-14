export interface TargetCompany {
  id: string;
  name: string;
  tier: "Tier-1 Tech" | "High-Growth Unicorn" | "Product Leader" | "Enterprise Services";
  roleTitle: string;
  ctcRange: string;
  minCgpa: number;
  minDsaProblems: number;
  readinessThreshold: number;
  targetTracks: string[];
  keySkills: string[];
  interviewRounds: string[];
  hiringType: "Campus & Off-Campus" | "National Challenge" | "Direct Careers Portal";
  careersUrl: string;
  logoInitial: string;
  accentColor: string;
  location: string;
}

export const TARGET_COMPANIES: TargetCompany[] = [
  // 1. TIER-1 TECH GIANTS
  {
    id: "google",
    name: "Google",
    tier: "Tier-1 Tech",
    roleTitle: "Software Engineer — University Graduate",
    ctcRange: "₹28 - 45 LPA",
    minCgpa: 7.5,
    minDsaProblems: 100,
    readinessThreshold: 85,
    targetTracks: ["fullstack", "ai-ml", "data", "cloud"],
    keySkills: ["Advanced DSA", "Graph Algorithms", "Dynamic Programming", "C++ / Java / Python", "System Scalability"],
    interviewRounds: [
      "Online Coding Assessment (2 LeetCode Medium/Hard)",
      "Technical Round 1: Algorithms & Data Structures",
      "Technical Round 2: Data Structures & Code Optimization",
      "Technical Round 3: Problem Solving & Edge Cases",
      "Googliness & Leadership Principles"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://careers.google.com/jobs/results/?q=university%20graduate",
    logoInitial: "G",
    accentColor: "#4285F4",
    location: "Bangalore / Hyderabad / Pune"
  },
  {
    id: "amazon",
    name: "Amazon",
    tier: "Tier-1 Tech",
    roleTitle: "Software Development Engineer I (SDE-1)",
    ctcRange: "₹28 - 44 LPA",
    minCgpa: 7.0,
    minDsaProblems: 90,
    readinessThreshold: 80,
    targetTracks: ["fullstack", "ai-ml", "cloud"],
    keySkills: ["Trees & Graphs", "Object-Oriented Design (LLD)", "Java / C++", "AWS Fundamentals", "Leadership Principles"],
    interviewRounds: [
      "Online Assessment (Debugging + 2 Coding Problems + Work Styles)",
      "Technical Round 1: DSA (Arrays, Trees, Heaps)",
      "Technical Round 2: Low-Level Design (OOP & Design Patterns)",
      "Technical Round 3: Problem Solving + Amazon Leadership Principles"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://www.amazon.jobs/en/job_categories/software-development",
    logoInitial: "A",
    accentColor: "#FF9900",
    location: "Bangalore / Hyderabad / Delhi NCR"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    tier: "Tier-1 Tech",
    roleTitle: "Software Engineer — New College Graduate",
    ctcRange: "₹26 - 42 LPA",
    minCgpa: 7.5,
    minDsaProblems: 85,
    readinessThreshold: 80,
    targetTracks: ["fullstack", "cloud", "ai-ml"],
    keySkills: ["Binary Trees", "Dynamic Programming", "C# / C++ / TypeScript", "Azure Cloud Basics", "Operating Systems"],
    interviewRounds: [
      "Online Coding Challenge (Codility / HackerRank)",
      "Technical Round 1: Data Structures & Recursion",
      "Technical Round 2: Algorithm Optimization & System Internals",
      "Technical Round 3: Project Deep Dive & Architecture"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://careers.microsoft.com/v2/global/en/students-graduates.html",
    logoInitial: "M",
    accentColor: "#00A4EF",
    location: "Hyderabad / Bangalore / Noida"
  },
  {
    id: "flipkart",
    name: "Flipkart",
    tier: "Tier-1 Tech",
    roleTitle: "Software Development Engineer I",
    ctcRange: "₹22 - 32 LPA",
    minCgpa: 7.0,
    minDsaProblems: 75,
    readinessThreshold: 78,
    targetTracks: ["fullstack", "data", "cloud"],
    keySkills: ["High-Throughput Backend", "Java / Spring Boot", "MySQL / Redis", "DSA (Hashing, Tries, Queues)", "Concurrency"],
    interviewRounds: [
      "Flipkart GRiD Coding Contest / Online Test",
      "Machine Coding Round (90-min Live Clean LLD Code)",
      "DSA Problem Solving Round",
      "Engineering Culture & Project Review"
    ],
    hiringType: "National Challenge",
    careersUrl: "https://www.flipkartcareers.com/",
    logoInitial: "F",
    accentColor: "#2874F0",
    location: "Bangalore"
  },
  {
    id: "adobe",
    name: "Adobe",
    tier: "Tier-1 Tech",
    roleTitle: "Software Engineer — Product Development",
    ctcRange: "₹24 - 38 LPA",
    minCgpa: 7.5,
    minDsaProblems: 80,
    readinessThreshold: 80,
    targetTracks: ["fullstack", "ai-ml"],
    keySkills: ["C++ / Python", "Data Structures", "Computer Graphics / Modern Web", "REST APIs", "Mathematical Rigor"],
    interviewRounds: [
      "Online Assessment (Cognitive + 2 Coding)",
      "Technical Round 1: Core DSA & Algorithms",
      "Technical Round 2: System Concepts & Object Modeling",
      "Director / HR Discussion"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://adobe.wd5.myworkdayjobs.com/external_experienced",
    logoInitial: "Ad",
    accentColor: "#FF0000",
    location: "Noida / Bangalore"
  },

  // 2. HIGH-GROWTH PRODUCT UNICORNS
  {
    id: "razorpay",
    name: "Razorpay",
    tier: "High-Growth Unicorn",
    roleTitle: "Associate Software Engineer",
    ctcRange: "₹18 - 28 LPA",
    minCgpa: 6.5,
    minDsaProblems: 50,
    readinessThreshold: 74,
    targetTracks: ["fullstack", "cloud", "data"],
    keySkills: ["Go / PHP / Node.js", "PostgreSQL / Redis", "RESTful APIs", "Fintech Payment Gateways", "System Reliability"],
    interviewRounds: [
      "Take-Home Assignment or HackerRank Test",
      "Live Machine Coding / Architecture Round",
      "Data Structures & Concurrency Round",
      "Founders Culture & Team Fit"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://razorpay.com/jobs/",
    logoInitial: "R",
    accentColor: "#0C2340",
    location: "Bangalore"
  },
  {
    id: "swiggy",
    name: "Swiggy",
    tier: "High-Growth Unicorn",
    roleTitle: "Software Development Engineer I",
    ctcRange: "₹18 - 30 LPA",
    minCgpa: 6.5,
    minDsaProblems: 60,
    readinessThreshold: 75,
    targetTracks: ["fullstack", "cloud", "data"],
    keySkills: ["Java / Golang", "Distributed Caching (Redis)", "Kafka Event Streams", "Low-Level Design", "Microservices"],
    interviewRounds: [
      "Online Assessment (2 Coding Problems)",
      "Machine Coding Round (Clean Modular Code)",
      "DSA & System Fundamentals Round",
      "Hiring Manager & Engineering Values"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://careers.swiggy.com/#/",
    logoInitial: "S",
    accentColor: "#FC8019",
    location: "Bangalore"
  },
  {
    id: "zomato",
    name: "Zomato",
    tier: "High-Growth Unicorn",
    roleTitle: "Software Engineer I",
    ctcRange: "₹16 - 26 LPA",
    minCgpa: 6.5,
    minDsaProblems: 45,
    readinessThreshold: 72,
    targetTracks: ["fullstack", "ai-ml"],
    keySkills: ["Node.js / Python", "React / Next.js", "MySQL / DynamoDB", "High Concurrency", "Product Sense"],
    interviewRounds: [
      "Online Test (DSA + Logic)",
      "Live Coding & Debugging Session",
      "System Architecture & API Design",
      "Cultural Alignment Round"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://www.zomato.com/careers",
    logoInitial: "Z",
    accentColor: "#E23744",
    location: "Gurgaon / Remote"
  },
  {
    id: "uber",
    name: "Uber",
    tier: "High-Growth Unicorn",
    roleTitle: "Software Engineer I",
    ctcRange: "₹30 - 46 LPA",
    minCgpa: 7.5,
    minDsaProblems: 100,
    readinessThreshold: 85,
    targetTracks: ["fullstack", "cloud", "data"],
    keySkills: ["Golang / Java", "Microservices Architecture", "Distributed Data", "Advanced Graph Algorithms", "Kafka"],
    interviewRounds: [
      "Codesignal Proctored OA",
      "Technical Round 1: DSA (Graphs, Dynamic Programming)",
      "Technical Round 2: Data Structures & Edge Cases",
      "Technical Round 3: Practical Code Design",
      "Bar Raiser Cultural Fit"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://www.uber.com/us/en/careers/",
    logoInitial: "U",
    accentColor: "#000000",
    location: "Bangalore / Hyderabad"
  },
  {
    id: "atlassian",
    name: "Atlassian",
    tier: "High-Growth Unicorn",
    roleTitle: "Associate Software Engineer",
    ctcRange: "₹24 - 36 LPA",
    minCgpa: 7.0,
    minDsaProblems: 75,
    readinessThreshold: 80,
    targetTracks: ["fullstack", "cloud"],
    keySkills: ["Java / Kotlin / React", "AWS Cloud Infrastructure", "CI/CD Pipelines", "Clean Architecture", "Code Readability"],
    interviewRounds: [
      "Online Coding Challenge (Hackerrank)",
      "Data Structures & Problem Solving",
      "Code Design & Craftsmanship Round",
      "Values Interview (Open company, no BS)"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://www.atlassian.com/company/careers/students",
    logoInitial: "At",
    accentColor: "#0052CC",
    location: "Bangalore / Remote"
  },

  // 3. PRODUCT LEADERS & MID-MARKET
  {
    id: "zoho",
    name: "Zoho Corporation",
    tier: "Product Leader",
    roleTitle: "Software Developer",
    ctcRange: "₹8 - 14 LPA",
    minCgpa: 6.0,
    minDsaProblems: 30,
    readinessThreshold: 62,
    targetTracks: ["fullstack", "cloud", "data"],
    keySkills: ["C / Java", "Core OOP Concepts", "Data Structures from Scratch", "Pointers & Memory", "Web Protocols"],
    interviewRounds: [
      "Level 1: Basic Written Programming & Aptitude",
      "Level 2: Basic Programming (Strings, Arrays, Pointers)",
      "Level 3: Advanced Live Programming (No Libraries / Vanilla Code)",
      "Level 4: Technical & HR Face-to-Face"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://www.zoho.com/careers/",
    logoInitial: "Zh",
    accentColor: "#F34B38",
    location: "Chennai / Tenkasi / Salem"
  },
  {
    id: "freshworks",
    name: "Freshworks",
    tier: "Product Leader",
    roleTitle: "Product Development Engineer",
    ctcRange: "₹12 - 18 LPA",
    minCgpa: 6.5,
    minDsaProblems: 40,
    readinessThreshold: 68,
    targetTracks: ["fullstack", "cloud"],
    keySkills: ["Ruby on Rails / Python / Node.js", "React.js", "PostgreSQL", "REST APIs", "AWS Services"],
    interviewRounds: [
      "Online Coding Challenge",
      "Technical Round 1: DSA & Data Modeling",
      "Technical Round 2: Hands-on Web Application Design",
      "Culture & Collaboration Round"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://www.freshworks.com/company/careers/",
    logoInitial: "Fw",
    accentColor: "#00A88F",
    location: "Chennai / Bangalore"
  },
  {
    id: "postman",
    name: "Postman",
    tier: "Product Leader",
    roleTitle: "Software Engineer I",
    ctcRange: "₹16 - 26 LPA",
    minCgpa: 6.5,
    minDsaProblems: 50,
    readinessThreshold: 72,
    targetTracks: ["fullstack", "cloud"],
    keySkills: ["JavaScript / TypeScript", "Node.js Internals", "HTTP / WebSockets", "API Architecture", "Testing Automation"],
    interviewRounds: [
      "Take-Home API/Feature Task",
      "Code Pairing & Architecture Review",
      "DSA & Systems Discussion",
      "Values & Hiring Manager Round"
    ],
    hiringType: "Direct Careers Portal",
    careersUrl: "https://www.postman.com/careers/",
    logoInitial: "P",
    accentColor: "#FF6C37",
    location: "Bangalore / Remote"
  },

  // 4. ENTERPRISE & MASS HIRING SPECIALIST TRACKS
  {
    id: "tcs-digital",
    name: "TCS Digital",
    tier: "Enterprise Services",
    roleTitle: "Systems Engineer — Digital Cadre",
    ctcRange: "₹7.5 - 9.2 LPA",
    minCgpa: 6.5,
    minDsaProblems: 25,
    readinessThreshold: 58,
    targetTracks: ["fullstack", "ai-ml", "cloud", "data"],
    keySkills: ["Python / Java OOP", "SQL Querying", "Basic Data Structures", "SDLC / Git", "Cloud Concepts"],
    interviewRounds: [
      "TCS NQT Advanced Test (Advanced Coding + Quantitative Aptitude)",
      "Technical Interview (DSA, OOPs, DBMS, Final Year Project)",
      "Managerial & HR Interview"
    ],
    hiringType: "National Challenge",
    careersUrl: "https://www.tcs.com/careers/india",
    logoInitial: "TCS",
    accentColor: "#1B365D",
    location: "Pan-India"
  },
  {
    id: "infosys-pp",
    name: "Infosys Power Programmer",
    tier: "Enterprise Services",
    roleTitle: "Specialist Programmer (Power Programmer)",
    ctcRange: "₹8.0 - 9.5 LPA",
    minCgpa: 6.5,
    minDsaProblems: 35,
    readinessThreshold: 62,
    targetTracks: ["fullstack", "ai-ml", "cloud", "data"],
    keySkills: ["Competitive Programming", "Advanced Graph / DP Algorithms", "Java / Python", "Full-Stack Project Work"],
    interviewRounds: [
      "HackWithInfy Coding Competition (3 Complex Algorithmic Challenges)",
      "Deep Technical DSA & System Discussion",
      "Project & Architecture Assessment"
    ],
    hiringType: "National Challenge",
    careersUrl: "https://www.infosys.com/careers/",
    logoInitial: "Inf",
    accentColor: "#007CC3",
    location: "Bangalore / Pune / Hyderabad"
  },
  {
    id: "accenture-prime",
    name: "Accenture Prime",
    tier: "Enterprise Services",
    roleTitle: "Advanced Associate Software Engineer",
    ctcRange: "₹6.5 - 8.5 LPA",
    minCgpa: 6.5,
    minDsaProblems: 20,
    readinessThreshold: 56,
    targetTracks: ["fullstack", "cloud", "data"],
    keySkills: ["Core Java / Python", "Relational Databases", "Cloud Computing Basics", "Agile Methodologies"],
    interviewRounds: [
      "Cognitive Assessment & Technical MCQ",
      "Hands-on Coding Assessment (2 Problems)",
      "Technical & Competency Interview"
    ],
    hiringType: "Campus & Off-Campus",
    careersUrl: "https://www.accenture.com/in-en/careers",
    logoInitial: "Acc",
    accentColor: "#A100FF",
    location: "Pan-India"
  }
];

export function getCompanyEligibility(
  company: TargetCompany,
  readinessScore: number,
  dsaCount: number,
  cgpa: number
): { status: "Direct Fit" | "Ready in 2-4 Wks" | "Target Reach"; reason: string } {
  const meetsCgpa = cgpa >= company.minCgpa;
  const meetsDsa = dsaCount >= company.minDsaProblems;
  const meetsReadiness = readinessScore >= company.readinessThreshold;

  if (meetsReadiness && meetsDsa && meetsCgpa) {
    return {
      status: "Direct Fit",
      reason: `Your ${readinessScore}% readiness meets the ${company.readinessThreshold}% threshold. Profile is competitive for screening.`
    };
  }

  if (readinessScore >= company.readinessThreshold - 12 && dsaCount >= company.minDsaProblems - 15) {
    return {
      status: "Ready in 2-4 Wks",
      reason: `Within reach. Solve ~${Math.max(0, company.minDsaProblems - dsaCount)} more medium problems to secure shortlisting.`
    };
  }

  return {
    status: "Target Reach",
    reason: `Requires bridging current benchmark gap (${company.readinessThreshold}% benchmark vs your ${readinessScore}%).`
  };
}
