export interface CertifiedCourse {
  id: string;
  title: string;
  provider: string;
  certificateType: "Free Verified Certificate" | "Free Digital Badge" | "Free Statement of Accomplishment" | "Free Complete Course Track";
  duration: string;
  durationHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Python Foundations" | "AI & Machine Learning" | "Full-Stack Development" | "Data Science" | "Cloud & DevOps";
  trackId: "ai-ml-engineer" | "fullstack-python" | "data-scientist" | "backend-cloud" | "all";
  description: string;
  whatYouLearn: string[];
  enrollmentUrl: string;
  cost: "100% Free";
  iconType: "code" | "cpu" | "database" | "globe" | "server";
}

export const CERTIFIED_COURSES: CertifiedCourse[] = [
  // =========================================================================
  // 1. FULL-STACK WEB DEVELOPMENT COURSES
  // =========================================================================
  {
    id: "fcc-web",
    title: "Responsive Web Design & Modern Frontend Certification",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Beginner",
    category: "Full-Stack Development",
    trackId: "fullstack-python",
    description: "Comprehensive hands-on curriculum covering modern HTML5, CSS3, Flexbox, CSS Grid, and responsive web principles with 5 verified production portfolio projects.",
    whatYouLearn: [
      "Modern semantic HTML5 and accessible web standards",
      "CSS Flexbox, CSS Grid, and responsive viewport design",
      "Typography, color palettes, and responsive layouts",
      "5 real portfolio capstone web applications"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
    cost: "100% Free",
    iconType: "globe"
  },
  {
    id: "fcc-js",
    title: "JavaScript Algorithms and Data Structures Certification",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "Full-Stack Development",
    trackId: "fullstack-python",
    description: "Master modern ES6+ JavaScript, object-oriented programming, functional programming, and algorithmic problem-solving required for every web engineering screening.",
    whatYouLearn: [
      "ES6 features, arrow functions, promises, and destructuring",
      "Regular expressions, array manipulation, and string methods",
      "Object-oriented and functional programming paradigms",
      "5 required algorithmic certification capstone projects"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
    cost: "100% Free",
    iconType: "code"
  },
  {
    id: "fcc-frontend",
    title: "Front End Development Libraries Certification (React & Redux)",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "Full-Stack Development",
    trackId: "fullstack-python",
    description: "Build interactive SPAs using React, component state, lifecycle hooks, Redux global stores, Bootstrap, and SASS with 5 evaluated frontend applications.",
    whatYouLearn: [
      "React component hierarchy, JSX, props, and state hooks",
      "Managing complex global state with Redux and actions",
      "Responsive styling with SASS and Bootstrap components",
      "Random quote machine, markdown previewer, and pomodoro clock"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
    cost: "100% Free",
    iconType: "globe"
  },
  {
    id: "fcc-backend",
    title: "Back End Development and APIs Certification (Node & Express)",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "Full-Stack Development",
    trackId: "fullstack-python",
    description: "Create scalable backend microservices, REST APIs with Express.js, MongoDB database schemas with Mongoose, and package management with npm.",
    whatYouLearn: [
      "Node.js runtime and asynchronous event handling",
      "Building RESTful API endpoints and middleware with Express",
      "MongoDB database modeling, schema validation, and CRUD operations",
      "URL shortener microservice and exercise tracker capstone"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
    cost: "100% Free",
    iconType: "server"
  },
  {
    id: "cs50w-harvard",
    title: "CS50's Web Programming with Python and JavaScript",
    provider: "Harvard University (edX)",
    certificateType: "Free Verified Certificate",
    duration: "12 Weeks (Self-Paced)",
    durationHours: 90,
    difficulty: "Advanced",
    category: "Full-Stack Development",
    trackId: "fullstack-python",
    description: "Harvard's flagship full-stack web course diving deep into Django, Python backend architecture, PostgreSQL, client-side JavaScript, CI/CD, and scalability.",
    whatYouLearn: [
      "Django architecture, migrations, ORM, and templating",
      "Single-page applications with JavaScript and async Fetch API",
      "SQL database normalization, indexing, and security",
      "CI/CD deployment pipelines, testing, and Git version control"
    ],
    enrollmentUrl: "https://cs50.harvard.edu/web/",
    cost: "100% Free",
    iconType: "globe"
  },

  // =========================================================================
  // 2. PYTHON & AI / MACHINE LEARNING COURSES
  // =========================================================================
  {
    id: "fcc-python",
    title: "Scientific Computing with Python Certification",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Beginner",
    category: "Python Foundations",
    trackId: "ai-ml-engineer",
    description: "Industry-standard curriculum covering Python fundamentals, data structures, algorithms, and 5 required practical capstone projects to earn a shareable, verifiable digital credential.",
    whatYouLearn: [
      "Python syntax, lexical rules, keywords, and identifiers",
      "Object-oriented programming and lambda functions",
      "Arithmetic formatter, time calculator, and budget app projects",
      "Algorithm design and algorithmic thinking"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
    cost: "100% Free",
    iconType: "code"
  },
  {
    id: "fcc-ml",
    title: "Machine Learning with Python Certification",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "AI & Machine Learning",
    trackId: "ai-ml-engineer",
    description: "Covers machine learning principles with TensorFlow, neural networks, natural language processing, and reinforcement learning with 5 verified evaluation projects.",
    whatYouLearn: [
      "Supervised vs Unsupervised learning workflows",
      "Deep neural networks with TensorFlow & Keras",
      "Linear regression, classification, and clustering",
      "Cat & dog image classifier and book recommendation engine"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
    cost: "100% Free",
    iconType: "cpu"
  },
  {
    id: "kaggle-python",
    title: "Python Micro-Course & Certification",
    provider: "Kaggle Learn",
    certificateType: "Free Verified Certificate",
    duration: "5 Hours (Practical Drills)",
    durationHours: 5,
    difficulty: "Beginner",
    category: "Python Foundations",
    trackId: "ai-ml-engineer",
    description: "Hands-on, zero-fluff interactive Python course designed specifically for aspiring data scientists and AI engineers. Includes instant code checking and verified certificate upon completion.",
    whatYouLearn: [
      "Syntax, variables, and arithmetic operations",
      "Functions and getting help from docstrings",
      "Booleans, conditionals, lists, and list comprehensions",
      "Dictionaries, working with external libraries"
    ],
    enrollmentUrl: "https://www.kaggle.com/learn/python",
    cost: "100% Free",
    iconType: "code"
  },
  {
    id: "kaggle-dl",
    title: "Intro to Deep Learning & Computer Vision",
    provider: "Kaggle Learn",
    certificateType: "Free Verified Certificate",
    duration: "4 Hours (Interactive Notebooks)",
    durationHours: 4,
    difficulty: "Intermediate",
    category: "AI & Machine Learning",
    trackId: "ai-ml-engineer",
    description: "Learn to build and train neural networks using Keras and PyTorch. Master stochastic gradient descent, dropout layers, convolutional kernels, and binary classification.",
    whatYouLearn: [
      "A Single Neuron and Deep Neural Networks",
      "Stochastic Gradient Descent (SGD) and Loss Functions",
      "Overfitting and Underfitting with Early Stopping",
      "Dropout and Batch Normalization layers"
    ],
    enrollmentUrl: "https://www.kaggle.com/learn/intro-to-deep-learning",
    cost: "100% Free",
    iconType: "cpu"
  },
  {
    id: "deeplearning-ai-prompt",
    title: "ChatGPT & LLM Prompt Engineering for Developers",
    provider: "DeepLearning.AI",
    certificateType: "Free Complete Course Track",
    duration: "2 Hours",
    durationHours: 2,
    difficulty: "Beginner",
    category: "AI & Machine Learning",
    trackId: "ai-ml-engineer",
    description: "Taught by Isa Fulford (OpenAI) and Andrew Ng (DeepLearning.AI). Teaches developers how to integrate LLMs into software applications using Python API calls.",
    whatYouLearn: [
      "Two key principles for writing effective prompts",
      "Systematic prompt engineering strategies",
      "Iterative prompt development and few-shot prompting",
      "Building custom customer service chatbot with Python"
    ],
    enrollmentUrl: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    cost: "100% Free",
    iconType: "cpu"
  },
  {
    id: "cs50-ai",
    title: "CS50's Introduction to Artificial Intelligence with Python",
    provider: "Harvard University (edX)",
    certificateType: "Free Verified Certificate",
    duration: "7 Weeks (Self-Paced)",
    durationHours: 70,
    difficulty: "Advanced",
    category: "AI & Machine Learning",
    trackId: "ai-ml-engineer",
    description: "Explore the concepts and algorithms at the foundation of modern artificial intelligence: graph search, adversarial search, Bayesian networks, Markov models, and neural networks.",
    whatYouLearn: [
      "Minimax, alpha-beta pruning, and A* search algorithms",
      "Probability, Markov models, and hidden Markov models",
      "Reinforcement learning and Q-learning architectures",
      "Natural language processing and sentiment analysis"
    ],
    enrollmentUrl: "https://cs50.harvard.edu/ai/",
    cost: "100% Free",
    iconType: "cpu"
  },

  // =========================================================================
  // 3. DATA SCIENTIST & ANALYTICS ENGINEER COURSES
  // =========================================================================
  {
    id: "ibm-python-ds",
    title: "Python 101 for Data Science & Analytics",
    provider: "IBM / Cognitive Class",
    certificateType: "Free Digital Badge",
    duration: "8 Hours",
    durationHours: 8,
    difficulty: "Beginner",
    category: "Data Science",
    trackId: "data-scientist",
    description: "Official IBM beginner course teaching Python programming with Jupyter Notebooks, Pandas dataframes, NumPy vectors, and data manipulation. Earns an IBM Credly digital badge.",
    whatYouLearn: [
      "Python basics, data types, expressions, and string operations",
      "Python data structures: Tuples, Lists, Sets, Dictionaries",
      "Conditions, Branching, Loops, and Functions",
      "Working with Pandas and reading real CSV/Excel files"
    ],
    enrollmentUrl: "https://cognitiveclass.ai/courses/python-for-data-science",
    cost: "100% Free",
    iconType: "database"
  },
  {
    id: "fcc-data-analysis",
    title: "Data Analysis with Python Certification",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "Data Science",
    trackId: "data-scientist",
    description: "Master reading data from various sources (CSV, SQL, JSON) and analyzing it with NumPy, Pandas, Matplotlib, and Seaborn with 5 verified real-world capstones.",
    whatYouLearn: [
      "Data wrangling, cleaning, and imputation with Pandas",
      "Multi-dimensional array math and broadcasting with NumPy",
      "Data visualization with Matplotlib and Seaborn charts",
      "Demographic data analyzer and medical data visualizer"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
    cost: "100% Free",
    iconType: "database"
  },
  {
    id: "kaggle-pandas",
    title: "Pandas Data Wrangling & Manipulation Certification",
    provider: "Kaggle Learn",
    certificateType: "Free Verified Certificate",
    duration: "4 Hours (Hands-on Notebooks)",
    durationHours: 4,
    difficulty: "Beginner",
    category: "Data Science",
    trackId: "data-scientist",
    description: "Short, micro-challenge drills designed to transform you into a confident data wrangler. Indexing, selecting, assigning, grouping, sorting, and merging datasets.",
    whatYouLearn: [
      "Creating, reading, and writing DataFrames and Series",
      "Indexing, selecting, and assigning values with loc and iloc",
      "Summary functions, maps, grouping, and multi-indexing",
      "Data types, missing values, and renaming columns"
    ],
    enrollmentUrl: "https://www.kaggle.com/learn/pandas",
    cost: "100% Free",
    iconType: "database"
  },
  {
    id: "kaggle-datavis",
    title: "Data Visualization & Storytelling Certification",
    provider: "Kaggle Learn",
    certificateType: "Free Verified Certificate",
    duration: "4 Hours",
    durationHours: 4,
    difficulty: "Beginner",
    category: "Data Science",
    trackId: "data-scientist",
    description: "Learn to present data insights cleanly to business stakeholders using Seaborn, line charts, bar charts, heatmaps, scatter plots, and distribution plots.",
    whatYouLearn: [
      "Choosing the right chart type for your data narrative",
      "Bar charts and heatmaps for categorical comparisons",
      "Scatter plots and regression lines for relationship detection",
      "Histograms and KDE plots for distribution analysis"
    ],
    enrollmentUrl: "https://www.kaggle.com/learn/data-visualization",
    cost: "100% Free",
    iconType: "database"
  },
  {
    id: "cisco-python-ds",
    title: "Python Essentials & Numerical Foundations",
    provider: "Cisco Networking Academy",
    certificateType: "Free Statement of Accomplishment",
    duration: "30 Hours",
    durationHours: 30,
    difficulty: "Beginner",
    category: "Data Science",
    trackId: "data-scientist",
    description: "Official Cisco OpenEDG Python Institute program aligning with professional entry-level certification. Grants a verifiable digital credential upon passing final lab.",
    whatYouLearn: [
      "Fundamental computer programming concepts and syntax",
      "Python data types, variables, and numerical operations",
      "Data structures: lists, tuples, dictionaries, and slices",
      "File processing and modular function design"
    ],
    enrollmentUrl: "https://www.netacad.com/courses/programming/pcep-programming-essentials-python",
    cost: "100% Free",
    iconType: "code"
  },

  // =========================================================================
  // 4. BACKEND SYSTEMS & CLOUD DEVOPS COURSES
  // =========================================================================
  {
    id: "linux-foundation-devops",
    title: "Introduction to Linux & Cloud Infrastructure",
    provider: "The Linux Foundation",
    certificateType: "Free Complete Course Track",
    duration: "14 Hours",
    durationHours: 14,
    difficulty: "Beginner",
    category: "Cloud & DevOps",
    trackId: "backend-cloud",
    description: "Official Linux Foundation introductory course exploring command line utilities, file system hierarchy, process management, shell scripting, and containerization fundamentals.",
    whatYouLearn: [
      "Linux filesystem architecture and permissions",
      "Process management and system performance monitoring",
      "Shell scripting basics for deployment automation",
      "Cloud container concepts and open source workflows"
    ],
    enrollmentUrl: "https://training.linuxfoundation.org/resources/free-courses/",
    cost: "100% Free",
    iconType: "server"
  },
  {
    id: "aws-cloud-essentials",
    title: "AWS Certified Cloud Practitioner Essentials (CLF-C02)",
    provider: "Amazon Web Services (AWS Skill Builder)",
    certificateType: "Free Digital Badge",
    duration: "6 Hours",
    durationHours: 6,
    difficulty: "Beginner",
    category: "Cloud & DevOps",
    trackId: "all",
    description: "Official foundational AWS cloud computing course developed by AWS engineers. Prepares students for the official CLF-C02 certification with free digital badge accreditation.",
    whatYouLearn: [
      "AWS global cloud infrastructure, regions, and availability zones",
      "Compute & Serverless: EC2, Elastic Beanstalk, and AWS Lambda",
      "Cloud storage, databases, and managed PostgreSQL (S3, DynamoDB, RDS)",
      "AWS Well-Architected Framework, IAM security, and cost billing models"
    ],
    enrollmentUrl: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
    cost: "100% Free",
    iconType: "server"
  },
  {
    id: "aws-cloud-quest",
    title: "AWS Cloud Quest: Cloud Practitioner (Interactive 3D Role-Playing)",
    provider: "AWS Skill Builder & Student Builder Hub",
    certificateType: "Free Digital Badge",
    duration: "12 Hours (Interactive Game)",
    durationHours: 12,
    difficulty: "Beginner",
    category: "Cloud & DevOps",
    trackId: "all",
    description: "Official 3D role-playing learning game from AWS. Solve simulated city business challenges by architecting and configuring real live AWS services directly in the cloud console.",
    whatYouLearn: [
      "Deploying scalable cloud compute instances and auto-scaling groups",
      "Configuring Amazon S3 buckets and static web hosting with CloudFront",
      "Setting up secure virtual private clouds (VPC) with security groups",
      "Earning the official verifiable AWS Cloud Quest digital badge on Credly"
    ],
    enrollmentUrl: "https://aws.amazon.com/training/digital/aws-cloud-quest/",
    cost: "100% Free",
    iconType: "server"
  },
  {
    id: "fcc-relational-db",
    title: "Relational Database & SQL Certification (PostgreSQL & Bash)",
    provider: "freeCodeCamp",
    certificateType: "Free Verified Certificate",
    duration: "300 Hours (Self-Paced)",
    durationHours: 300,
    difficulty: "Intermediate",
    category: "Cloud & DevOps",
    trackId: "backend-cloud",
    description: "Learn Linux terminal commands, Bash scripting, SQL database design, PostgreSQL schemas, and Git version control in interactive browser containers.",
    whatYouLearn: [
      "Bash terminal command line tools and script automation",
      "PostgreSQL relational database schema design and normalization",
      "Advanced SQL queries, JOINs, aggregations, and subqueries",
      "Celestial bodies database, salon appointment scheduler, and periodic table"
    ],
    enrollmentUrl: "https://www.freecodecamp.org/learn/relational-database/",
    cost: "100% Free",
    iconType: "database"
  },
  {
    id: "cncf-kubernetes-intro",
    title: "Introduction to Kubernetes & Container Orchestration",
    provider: "The Linux Foundation & CNCF",
    certificateType: "Free Complete Course Track",
    duration: "10 Hours",
    durationHours: 10,
    difficulty: "Intermediate",
    category: "Cloud & DevOps",
    trackId: "backend-cloud",
    description: "Learn cloud-native container orchestration directly from the creators of Kubernetes and the Cloud Native Computing Foundation (CNCF).",
    whatYouLearn: [
      "Containerization concepts vs virtual machines",
      "Kubernetes cluster architecture (Nodes, Pods, Services)",
      "Deployments, ReplicaSets, and rolling updates",
      "Kubectl CLI management and YAML manifest writing"
    ],
    enrollmentUrl: "https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes",
    cost: "100% Free",
    iconType: "server"
  },
  {
    id: "cs50-sql",
    title: "CS50's Introduction to Databases with SQL",
    provider: "Harvard University (edX)",
    certificateType: "Free Verified Certificate",
    duration: "7 Weeks (Self-Paced)",
    durationHours: 50,
    difficulty: "Intermediate",
    category: "Cloud & DevOps",
    trackId: "backend-cloud",
    description: "Harvard course on scaling relational databases, schema design, ACID transactions, database normalization, and query optimization using SQLite and PostgreSQL.",
    whatYouLearn: [
      "Relational database design and Third Normal Form (3NF)",
      "Complex SQL querying, subqueries, and table joins",
      "Indexes, query plans, and performance optimization",
      "Database security, transactions, and concurrency"
    ],
    enrollmentUrl: "https://cs50.harvard.edu/sql/",
    cost: "100% Free",
    iconType: "database"
  }
];

// Helper to get top recommended courses for a specific candidate trade
export function getRecommendedCoursesForTrade(tradeId: string): CertifiedCourse[] {
  const t = String(tradeId || "").toLowerCase();
  if (t.includes("web") || t.includes("fullstack")) {
    return CERTIFIED_COURSES.filter(c => c.trackId === "fullstack-python");
  }
  if (t.includes("data") || t.includes("analytic")) {
    return CERTIFIED_COURSES.filter(c => c.trackId === "data-scientist");
  }
  if (t.includes("cloud") || t.includes("devops") || t.includes("backend")) {
    return CERTIFIED_COURSES.filter(c => c.trackId === "backend-cloud");
  }
  return CERTIFIED_COURSES.filter(c => c.trackId === "ai-ml-engineer");
}
