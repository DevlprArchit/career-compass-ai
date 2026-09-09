export interface CourseResource {
  name: string;
  creator: string;
  youtubeUrl: string;
  type: string;
  duration: string;
  syllabus: string[];
}

export interface MilestoneChannel {
  theory: string;       // Core conceptual knowledge
  project: string;      // Hands-on implementation deliverable
  interviewDsa: string; // Interview topics & DSA patterns
}

export interface Milestone {
  id: string;
  roleId: string;
  order: number;
  weeks: string;         // e.g. "Weeks 1–2", "Weeks 3–4", etc.
  phase: string;         // "Phase 1: Foundations", "Phase 2: Applied Architecture", "Phase 3: Production & Prep"
  title: string;
  category: string;
  whyMatters: string;    // Kept for backward compatibility
  conciseSummary: string; // Crisp 1-line summary
  estimatedHours: number;
  skillTags: string[];
  status: 'completed' | 'current' | 'locked';
  channels: MilestoneChannel;
  resource: CourseResource;
}

export interface TargetRole {
  id: string;
  title: string;
  description: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  salaryRange: string;
  primarySkills: string[];
}

export const TARGET_ROLES: TargetRole[] = [
  {
    id: 'ai-ml-engineer',
    title: 'Applied AI / ML Engineer',
    description: 'Designs, trains, fine-tunes, and ships machine learning & deep neural models to production.',
    marketDemand: 'Very High',
    salaryRange: '$135,000 - $195,000',
    primarySkills: ['PyTorch', 'Transformers', 'Backpropagation', 'FastAPI', 'MLOps']
  },
  {
    id: 'fullstack-python',
    title: 'Full-Stack Web Developer (Python + Modern JS)',
    description: 'Bridges modern Next.js/React web frontends with high-performance Python backends, databases, and APIs.',
    marketDemand: 'Very High',
    salaryRange: '$115,000 - $170,000',
    primarySkills: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & Analytics Engineer',
    description: 'Specializes in statistical modeling, exploratory data analysis, predictive ML, and enterprise SQL pipelines.',
    marketDemand: 'High',
    salaryRange: '$120,000 - $175,000',
    primarySkills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Advanced SQL', 'Data Storytelling']
  },
  {
    id: 'backend-cloud',
    title: 'Backend Systems & Cloud Developer',
    description: 'Architects distributed cloud infrastructure, microservices, Linux systems, Docker containers, and CI/CD pipelines.',
    marketDemand: 'Very High',
    salaryRange: '$130,000 - $185,000',
    primarySkills: ['Linux & Bash', 'Docker', 'Kubernetes', 'FastAPI/Go', 'CI/CD & Cloud']
  },
  {
    id: 'fullstack-ai-dev',
    title: 'Full Stack AI Product Engineer',
    description: 'Bridges modern Next.js/React web frontends with high-throughput LLM APIs, WebSockets, and vector stores.',
    marketDemand: 'Very High',
    salaryRange: '$125,000 - $180,000',
    primarySkills: ['Next.js', 'Tailwind', 'Supabase', 'Python FastAPI', 'AI Streaming']
  },
  {
    id: 'genai-agent-dev',
    title: 'Generative AI & LLM Systems Developer',
    description: 'Builds production RAG systems, autonomous multi-agent pipelines, and fine-tunes open-source LLMs.',
    marketDemand: 'Very High',
    salaryRange: '$140,000 - $205,000',
    primarySkills: ['LangChain', 'LlamaIndex', 'Vector Databases', 'LoRA Fine-tuning', 'RAG']
  }
];

export const ROLE_MILESTONES: Record<string, Milestone[]> = {
  // =========================================================================
  // 1. PYTHON & AI / MACHINE LEARNING ENGINEER
  // =========================================================================
  'ai-ml-engineer': [
    {
      id: 'aiml-1',
      roleId: 'ai-ml-engineer',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Vector Calculus & Linear Algebra Foundations',
      category: 'Mathematics',
      whyMatters: 'Essential for understanding loss landscapes, matrix dot products, eigenvalues, and backpropagation gradients.',
      conciseSummary: 'Master vector spaces, matrix multiplication, determinants, and multi-variable gradient vectors in NumPy.',
      estimatedHours: 20,
      skillTags: ['linear-algebra', 'calculus', 'numpy', 'vectorization'],
      status: 'completed',
      channels: {
        theory: 'Linear transformations, dot products, eigenvalues & partial derivatives',
        project: 'Vectorized linear regression engine built from scratch in pure NumPy',
        interviewDsa: 'Two Pointers, Matrix Traversal, Numerical stability questions'
      },
      resource: {
        name: 'Essence of Linear Algebra',
        creator: '3Blue1Brown',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
        type: '16 Video Visual Masterclass',
        duration: '3.5 hours',
        syllabus: [
          'Vectors, linear combinations, and span',
          'Linear transformations and matrix multiplication',
          'Determinants and inverse matrices',
          'Eigenvectors and eigenvalues in high dimensions'
        ]
      }
    },
    {
      id: 'aiml-2',
      roleId: 'ai-ml-engineer',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'Classical Machine Learning & Statistical Modeling',
      category: 'Classical ML',
      whyMatters: 'Tabular data algorithms (XGBoost, Random Forests) solve 70% of real-world business problems.',
      conciseSummary: 'Learn supervised learning algorithms, bias-variance tradeoffs, and cross-validation with Scikit-Learn.',
      estimatedHours: 30,
      skillTags: ['scikit-learn', 'xgboost', 'bias-variance', 'cross-validation'],
      status: 'completed',
      channels: {
        theory: 'Supervised vs unsupervised loss, L1/L2 regularization, ROC-AUC metrics',
        project: 'End-to-end customer churn prediction pipeline with hyperparameter tuning',
        interviewDsa: 'Hash Maps, Binary Search, Overfitting mitigation interview scenarios'
      },
      resource: {
        name: 'Machine Learning Specialization — Supervised ML',
        creator: 'Andrew Ng (DeepLearning.AI)',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI',
        type: 'Foundational University Masterclass',
        duration: '18 hours',
        syllabus: [
          'Linear and Logistic Regression loss formulation',
          'Gradient Descent optimization and learning rates',
          'Decision Trees, Random Forests, and Gradient Boosting',
          'Evaluation metrics: Precision, Recall, F1, and ROC-AUC curves'
        ]
      }
    },
    {
      id: 'aiml-3',
      roleId: 'ai-ml-engineer',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Deep Learning & Neural Networks from Scratch',
      category: 'Deep Learning',
      whyMatters: 'Understanding automatic differentiation and tensors is required to debug complex neural network architectures.',
      conciseSummary: 'Build neural networks from scratch using PyTorch tensors, autograd, and GPU acceleration.',
      estimatedHours: 35,
      skillTags: ['pytorch', 'backprop', 'optimizers', 'tensors'],
      status: 'current',
      channels: {
        theory: 'Computational graphs, reverse-mode autodiff, Adam optimizer internals',
        project: 'Custom multi-layer neural network with PyTorch training loops & TensorBoard',
        interviewDsa: 'Recursion, Tree traversal, Vanishing gradient debugging interview drills'
      },
      resource: {
        name: 'Neural Networks: Zero to Hero',
        creator: 'Andrej Karpathy',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
        type: 'Foundational Code-First Masterclass',
        duration: '12 hours',
        syllabus: [
          'micrograd: Building autograd and backpropagation from scratch',
          'makemore: Bigram models and Multilayer Perceptrons (MLP)',
          'Batch Normalization, Activations (GELU/ReLU), and Diagnostics',
          'Manual backprop calculations through matrix operations'
        ]
      }
    },
    {
      id: 'aiml-4',
      roleId: 'ai-ml-engineer',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Transformers & Modern NLP Architectures',
      category: 'NLP & LLMs',
      whyMatters: 'Attention mechanisms and Transformers power all modern LLMs, multi-modal systems, and modern AI engineering.',
      conciseSummary: 'Implement multi-head self-attention and build a decoder-only GPT architecture from scratch.',
      estimatedHours: 30,
      skillTags: ['transformers', 'attention', 'tokenization', 'llms'],
      status: 'locked',
      channels: {
        theory: 'Scaled dot-product attention, positional encodings, causal self-attention',
        project: 'Decoder-only Transformer trained on custom domain dataset from scratch',
        interviewDsa: 'Sliding Window, Dynamic Programming, Attention complexity calculations'
      },
      resource: {
        name: 'Let\'s build GPT: from scratch, in code, spelled out',
        creator: 'Andrej Karpathy',
        youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        type: 'Deep-Dive Architecture Masterclass',
        duration: '2 hours',
        syllabus: [
          'Self-attention mechanisms: Queries, Keys, and Values',
          'Multi-head attention and causal masking',
          'Residual connections, LayerNorm, and feed-forward blocks',
          'Scaling laws, pre-training, and text generation decoding'
        ]
      }
    },
    {
      id: 'aiml-5',
      roleId: 'ai-ml-engineer',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Generative AI, RAG & Autonomous Agent Systems',
      category: 'Generative AI',
      whyMatters: 'Enterprise companies hire engineers who can connect LLMs with proprietary data and external tool execution.',
      conciseSummary: 'Engineer production Retrieval-Augmented Generation (RAG) pipelines with hybrid search and vector databases.',
      estimatedHours: 30,
      skillTags: ['rag', 'vector-dbs', 'langchain', 'llamaindex'],
      status: 'locked',
      channels: {
        theory: 'Embedding models, cosine vs dot product, chunking strategies, hybrid search',
        project: 'Enterprise document Q&A RAG engine with pgvector, reranking, and source citations',
        interviewDsa: 'Graph search (BFS/DFS), Vector search algorithms (HNSW), RAG system design'
      },
      resource: {
        name: 'LangChain & LlamaIndex for LLM Application Development',
        creator: 'FreeCodeCamp / Harrison Chase',
        youtubeUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
        type: 'Production Framework Masterclass',
        duration: '4 hours',
        syllabus: [
          'Document chunking strategies, embeddings, and vector stores',
          'Retrieval pipelines, rerankers, and contextual compression',
          'ReAct agent architecture, function calling, and tool use',
          'Evaluation metrics: Faithfulness, Answer Relevance, and RAG Triad'
        ]
      }
    },
    {
      id: 'aiml-6',
      roleId: 'ai-ml-engineer',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'Production MLOps, Serving & Quantization',
      category: 'MLOps & Systems',
      whyMatters: 'Models are useless without low-latency serving, quantization, containerization, and automated CI/CD deployment.',
      conciseSummary: 'Package, quantize, and deploy high-throughput model APIs with FastAPI, Docker, and telemetry.',
      estimatedHours: 25,
      skillTags: ['fastapi', 'docker', 'quantization', 'triton', 'monitoring'],
      status: 'locked',
      channels: {
        theory: 'Quantization (INT8/FP16), KV caching, batching, GPU latency bottlenecks',
        project: 'Dockerized FastAPI inference service with streaming responses & rate limiting',
        interviewDsa: 'System Design (AI scale, latency SLAs), Mock technical screen preparation'
      },
      resource: {
        name: 'Deploying Machine Learning Models to Production',
        creator: 'CS329S Stanford / Chip Huyen',
        youtubeUrl: 'https://www.youtube.com/watch?v=06-AZXmwHjo',
        type: 'Industry Systems Masterclass',
        duration: '6 hours',
        syllabus: [
          'High-throughput model serving with FastAPI and vLLM',
          'Model quantization (bitsandbytes, GGUF, AWQ)',
          'Docker containerization and multi-stage production builds',
          'Monitoring data drift, latency percentiles (p99), and logging'
        ]
      }
    }
  ],

  // =========================================================================
  // 2. FULL-STACK WEB DEVELOPER (PYTHON + MODERN JS)
  // =========================================================================
  'fullstack-python': [
    {
      id: 'fsp-1',
      roleId: 'fullstack-python',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Modern Semantic Web & JavaScript (ES6+)',
      category: 'Frontend Foundations',
      whyMatters: 'Strong semantic HTML, CSS Flexbox/Grid, and modern ES6+ JS are mandatory for every modern web engineering role.',
      conciseSummary: 'Master semantic HTML5, CSS Flexbox/Grid, and modern ES6+ asynchronous JavaScript.',
      estimatedHours: 25,
      skillTags: ['javascript', 'es6', 'dom-api', 'html5-css3'],
      status: 'completed',
      channels: {
        theory: 'Event loop, asynchronous promises, closures, prototype chain & DOM tree',
        project: 'Interactive browser productivity app with vanilla ES6 and modular components',
        interviewDsa: 'Arrays, Strings, Two Pointers, JavaScript event loop execution order'
      },
      resource: {
        name: 'JavaScript Programming — Full Course',
        creator: 'freeCodeCamp / Per Borgen',
        youtubeUrl: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
        type: 'Interactive Coding Masterclass',
        duration: '7.5 hours',
        syllabus: [
          'ES6 variables, arrow functions, destructuring, and rest/spread',
          'DOM manipulation, event delegation, and bubbling',
          'Asynchronous JS: Promises, async/await, and Fetch API',
          'Modules, local storage, and client-side error handling'
        ]
      }
    },
    {
      id: 'fsp-2',
      roleId: 'fullstack-python',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'Component Architecture with React & Tailwind CSS',
      category: 'Frontend Engineering',
      whyMatters: 'React is the standard frontend library; modular component state and clean styling are expected in any tech company.',
      conciseSummary: 'Build reactive user interfaces using component architecture, custom hooks, and Tailwind CSS.',
      estimatedHours: 30,
      skillTags: ['react', 'hooks', 'tailwind', 'component-design'],
      status: 'completed',
      channels: {
        theory: 'Virtual DOM, reconciliation, hook rules, render optimization & context',
        project: 'Multi-screen responsive web dashboard with clean Tailwind design system',
        interviewDsa: 'Hash Tables, Sliding Window, React state lifecycle & re-render triggers'
      },
      resource: {
        name: 'React 18 Tutorial and Projects Course',
        creator: 'John Smilga / Coding Addict',
        youtubeUrl: 'https://www.youtube.com/watch?v=2-crBg6wpp0',
        type: 'Hands-on Project Masterclass',
        duration: '10 hours',
        syllabus: [
          'Component lifecycle, JSX syntax, and props propagation',
          'useState, useEffect, useReducer, and custom hooks',
          'Context API and global state management patterns',
          'Form handling, input validation, and Tailwind utility styling'
        ]
      }
    },
    {
      id: 'fsp-3',
      roleId: 'fullstack-python',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Backend REST API Architecture with Python FastAPI',
      category: 'Backend Architecture',
      whyMatters: 'FastAPI provides production-grade async endpoints, automatic Swagger docs, and strict type validation via Pydantic.',
      conciseSummary: 'Design high-performance asynchronous RESTful APIs using Python FastAPI and Pydantic.',
      estimatedHours: 30,
      skillTags: ['fastapi', 'pydantic', 'rest-api', 'asyncio', 'jwt'],
      status: 'current',
      channels: {
        theory: 'HTTP protocols, REST verbs, Pydantic type validation, CORS & JWT security',
        project: 'Production REST API with user registration, JWT auth, and rate-limited endpoints',
        interviewDsa: 'Linked Lists, Stacks & Queues, REST vs GraphQL vs RPC architectural tradeoffs'
      },
      resource: {
        name: 'FastAPI — Full Course for Beginners',
        creator: 'freeCodeCamp / Sanjeev Thiyagarajan',
        youtubeUrl: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
        type: 'Enterprise Backend Masterclass',
        duration: '19 hours',
        syllabus: [
          'Routing, path/query parameters, and request body validation',
          'Pydantic schema definitions and serialization',
          'JWT authentication, password hashing with bcrypt, and OAuth2 scopes',
          'Error handling, middleware, and CORS configuration'
        ]
      }
    },
    {
      id: 'fsp-4',
      roleId: 'fullstack-python',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Relational Database Modeling & PostgreSQL with SQLAlchemy',
      category: 'Databases & Persistence',
      whyMatters: 'Database modeling, transactions, and query optimization are critical to ensure applications scale without bottlenecks.',
      conciseSummary: 'Design relational database schemas, migrations, and ORM integration using PostgreSQL and SQLAlchemy.',
      estimatedHours: 30,
      skillTags: ['postgresql', 'sqlalchemy', 'alembic', 'orm', 'indexes'],
      status: 'locked',
      channels: {
        theory: 'Normalization, foreign keys, ACID guarantees, composite indexes, query plans',
        project: 'Multi-table relational e-commerce schema with Alembic migrations and complex joins',
        interviewDsa: 'Binary Search Trees, SQL joins & aggregations, Indexing performance tradeoffs'
      },
      resource: {
        name: 'PostgreSQL Tutorial for Beginners',
        creator: 'Amigoscode',
        youtubeUrl: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
        type: 'Relational Database Masterclass',
        duration: '4 hours',
        syllabus: [
          'Relational table design, primary keys, and foreign key constraints',
          'Complex SQL joins, group by, aggregations, and subqueries',
          'SQLAlchemy 2.0 ORM patterns and session management',
          'Database migrations with Alembic and indexing strategies'
        ]
      }
    },
    {
      id: 'fsp-5',
      roleId: 'fullstack-python',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Full-Stack Integration, SSR & Next.js App Router',
      category: 'Full-Stack Integration',
      whyMatters: 'Combining modern React Server Components with Python backend services creates industry-standard web applications.',
      conciseSummary: 'Unify frontend and backend systems with Next.js App Router, SSR, and API route handlers.',
      estimatedHours: 30,
      skillTags: ['nextjs', 'ssr', 'app-router', 'fullstack', 'caching'],
      status: 'locked',
      channels: {
        theory: 'Server vs Client components, incremental static regeneration (ISR), streaming',
        project: 'Production full-stack web application with Next.js 15, FastAPI, and PostgreSQL',
        interviewDsa: 'Graphs (BFS/DFS), State caching patterns, Full-stack system design'
      },
      resource: {
        name: 'Next.js 14 Full Course',
        creator: 'freeCodeCamp / Sonny Sangha',
        youtubeUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
        type: 'Production Full-Stack Masterclass',
        duration: '5 hours',
        syllabus: [
          'Next.js App Router architecture and file-based routing',
          'Server Components vs Client Components boundary rules',
          'Data fetching with fetch cache and revalidation',
          'Server actions, optimistic updates, and form submissions'
        ]
      }
    },
    {
      id: 'fsp-6',
      roleId: 'fullstack-python',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'Production Web Deployment, Docker & CI/CD Pipelines',
      category: 'Deployment & DevOps',
      whyMatters: 'Every commercial software developer is expected to containerize their code and configure automated deployment workflows.',
      conciseSummary: 'Package and deploy production web stacks with multi-stage Docker builds and automated CI/CD.',
      estimatedHours: 25,
      skillTags: ['docker', 'github-actions', 'nginx', 'deployment', 'ssl'],
      status: 'locked',
      channels: {
        theory: 'Multi-stage Docker builds, reverse proxies, automated test runners, SSL certificates',
        project: 'Automated GitHub Actions CI/CD pipeline deploying containerized web app to cloud',
        interviewDsa: 'System Design (Web caching, load balancing, rate limiting), Portfolio readiness'
      },
      resource: {
        name: 'Docker & Kubernetes Full Course',
        creator: 'TechWorld with Nana',
        youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        type: 'Practical DevOps Masterclass',
        duration: '4 hours',
        syllabus: [
          'Dockerfile syntax and multi-stage build optimization',
          'Docker Compose orchestration for multi-service applications',
          'Nginx reverse proxy configuration and HTTPS setup',
          'GitHub Actions CI/CD workflow automation and secret management'
        ]
      }
    }
  ],

  // =========================================================================
  // 3. DATA SCIENTIST & ANALYTICS ENGINEER
  // =========================================================================
  'data-scientist': [
    {
      id: 'ds-1',
      roleId: 'data-scientist',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Python for Data Science, NumPy & Wrangling with Pandas',
      category: 'Data Manipulation',
      whyMatters: '80% of data science work involves cleaning messy real-world datasets, handling missing values, and aggregation.',
      conciseSummary: 'Master data cleaning, reshaping, indexing, and aggregation using NumPy and Pandas.',
      estimatedHours: 25,
      skillTags: ['pandas', 'numpy', 'data-cleaning', 'eda'],
      status: 'completed',
      channels: {
        theory: 'Memory layouts, vectorized operations, split-apply-combine paradigm, handling NaNs',
        project: 'Exploratory data analysis suite on 250,000+ real-world retail transactions',
        interviewDsa: 'Hash Maps, String manipulation, Data wrangling interview coding drills'
      },
      resource: {
        name: 'Data Analysis with Python Course',
        creator: 'freeCodeCamp',
        youtubeUrl: 'https://www.youtube.com/watch?v=r-uOLxNrNk8',
        type: 'Hands-on Data Science Masterclass',
        duration: '4.5 hours',
        syllabus: [
          'NumPy arrays, slicing, boolean indexing, and broadcasting',
          'Pandas Series and DataFrames: Filtering, grouping, and aggregations',
          'Handling missing data, duplicate removal, and type conversions',
          'Data visualization with Matplotlib and Seaborn'
        ]
      }
    },
    {
      id: 'ds-2',
      roleId: 'data-scientist',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'Applied Statistics, Probability & Hypothesis Testing',
      category: 'Statistical Foundations',
      whyMatters: 'Statistical rigor prevents false discoveries, informs A/B testing decisions, and validates predictive confidence.',
      conciseSummary: 'Master statistical testing, probability distributions, confidence intervals, and A/B testing design.',
      estimatedHours: 30,
      skillTags: ['statistics', 'hypothesis-testing', 'probability', 'ab-testing'],
      status: 'completed',
      channels: {
        theory: 'Central Limit Theorem, p-values, Type I/II errors, Bayesian vs Frequentist testing',
        project: 'Statistically rigorous A/B test analysis notebook with sample size calculations',
        interviewDsa: 'Probability interview puzzles, Matrix math, Statistical significance questions'
      },
      resource: {
        name: 'Statistics for Data Science Full Course',
        creator: 'Great Learning',
        youtubeUrl: 'https://www.youtube.com/watch?v=Vfo5le26IhY',
        type: 'Comprehensive Math Masterclass',
        duration: '7 hours',
        syllabus: [
          'Descriptive statistics: Mean, median, standard deviation, and variance',
          'Probability distributions: Normal, Binomial, and Poisson',
          'Inferential statistics: Central Limit Theorem and Confidence Intervals',
          'Hypothesis testing: T-tests, ANOVA, Chi-Square, and p-values'
        ]
      }
    },
    {
      id: 'ds-3',
      roleId: 'data-scientist',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Advanced SQL, Window Functions & Data Warehousing',
      category: 'Analytics SQL',
      whyMatters: 'SQL is the universal language of enterprise data; window functions and CTEs are mandatory for high-salary analytics roles.',
      conciseSummary: 'Write high-performance analytics SQL queries using window functions, CTEs, and partitioning.',
      estimatedHours: 30,
      skillTags: ['advanced-sql', 'window-functions', 'cte', 'data-warehousing'],
      status: 'current',
      channels: {
        theory: 'Partitioning, window frames, execution plans, star schemas, dimensional modeling',
        project: 'Analytics warehouse schema with automated daily KPI rollups and cohort analysis',
        interviewDsa: 'Complex SQL queries, Self-joins, Aggregation under high volume'
      },
      resource: {
        name: 'Advanced SQL Tutorial',
        creator: 'Alex The Analyst',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLUaB-1hjhk8H48Pj32z4GZgGWyylqv85f',
        type: 'Practical Analytics Masterclass',
        duration: '3 hours',
        syllabus: [
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, NTILE',
          'Analytical functions: LEAD, LAG, and rolling window aggregations',
          'Common Table Expressions (CTEs) and recursive queries',
          'Query optimization, explain plans, and index usage'
        ]
      }
    },
    {
      id: 'ds-4',
      roleId: 'data-scientist',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Supervised & Unsupervised Machine Learning',
      category: 'Predictive Modeling',
      whyMatters: 'Scikit-Learn algorithms (Random Forests, Gradient Boosting, K-Means) solve the vast majority of tabular predictions.',
      conciseSummary: 'Train, evaluate, and interpret predictive machine learning models for classification and clustering.',
      estimatedHours: 35,
      skillTags: ['scikit-learn', 'random-forests', 'xgboost', 'clustering'],
      status: 'locked',
      channels: {
        theory: 'Classification vs regression loss, feature importance, K-Means, ROC-AUC metrics',
        project: 'Customer segmentation and predictive churn model with SHAP interpretability',
        interviewDsa: 'Binary Search, Tree-based algorithms, Feature engineering interview questions'
      },
      resource: {
        name: 'Machine Learning with Python',
        creator: 'freeCodeCamp',
        youtubeUrl: 'https://www.youtube.com/watch?v=NWONtLTE-62',
        type: 'Algorithms Masterclass',
        duration: '9.5 hours',
        syllabus: [
          'Data preprocessing, feature scaling, and one-hot encoding',
          'Linear Regression, Logistic Regression, and Decision Trees',
          'Ensemble methods: Random Forests and Gradient Boosted Trees (XGBoost)',
          'Clustering with K-Means and Principal Component Analysis (PCA)'
        ]
      }
    },
    {
      id: 'ds-5',
      roleId: 'data-scientist',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Time Series Forecasting & Feature Engineering',
      category: 'Applied Data Science',
      whyMatters: 'Predicting business trends over time (demand, revenue, churn) is one of the highest-value capabilities in industry.',
      conciseSummary: 'Build accurate time series forecasting pipelines with lag features, seasonal decomposition, and Prophet.',
      estimatedHours: 25,
      skillTags: ['time-series', 'forecasting', 'prophet', 'feature-engineering'],
      status: 'locked',
      channels: {
        theory: 'Stationarity, autocorrelation, seasonal decomposition, rolling window features',
        project: 'Production retail demand forecasting model with automated seasonality detection',
        interviewDsa: 'Sliding Window, Dynamic Programming, Time-series metrics (MAPE/RMSE)'
      },
      resource: {
        name: 'Time Series Analysis with Python',
        creator: 'Rob Mulla',
        youtubeUrl: 'https://www.youtube.com/watch?v=vV12dGe_Fho',
        type: 'Specialized Modeling Masterclass',
        duration: '4 hours',
        syllabus: [
          'Stationarity, differencing, and Augmented Dickey-Fuller tests',
          'ARIMA, SARIMA, and seasonal decomposition',
          'Machine learning approaches: XGBoost with lag and date features',
          'Evaluation: RMSE, MAE, and backtesting methodologies'
        ]
      }
    },
    {
      id: 'ds-6',
      roleId: 'data-scientist',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'Business Dashboards & Executive Storytelling',
      category: 'Data Presentation & Storytelling',
      whyMatters: 'Analytics value is realized only when insights are clearly communicated to non-technical business stakeholders.',
      conciseSummary: 'Build interactive executive dashboards and communicate insights with clarity.',
      estimatedHours: 25,
      skillTags: ['streamlit', 'tableau', 'data-storytelling', 'business-metrics'],
      status: 'locked',
      channels: {
        theory: 'Visualization heuristics, color contrast, executive metric hierarchies (CAC, LTV)',
        project: 'Interactive Streamlit cloud dashboard with live filtering and automated reporting',
        interviewDsa: 'Business Case Studies, Metric design scenarios, Portfolio presentation'
      },
      resource: {
        name: 'Streamlit Full Course for Beginners',
        creator: 'Data Professor / Chanin Nantasenamat',
        youtubeUrl: 'https://www.youtube.com/watch?v=ZZ4B0QUHuNc',
        type: 'Interactive App Masterclass',
        duration: '3.5 hours',
        syllabus: [
          'Streamlit layout architecture: Sidebars, columns, and metric cards',
          'Interactive widgets: Sliders, dropdowns, and file uploaders',
          'Plotly integration for interactive charts and tooltips',
          'Deploying apps to Streamlit Community Cloud and Docker'
        ]
      }
    }
  ],

  // =========================================================================
  // 4. BACKEND SYSTEMS & CLOUD DEVELOPER
  // =========================================================================
  'backend-cloud': [
    {
      id: 'bec-1',
      roleId: 'backend-cloud',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Operating Systems, Linux Foundations & Shell Scripting',
      category: 'Systems Foundations',
      whyMatters: 'Linux runs nearly all cloud servers; understanding processes, file permissions, and shell automation is non-negotiable.',
      conciseSummary: 'Master Linux operating system internals, Bash shell automation, and process management.',
      estimatedHours: 25,
      skillTags: ['linux', 'bash', 'posix', 'process-management'],
      status: 'completed',
      channels: {
        theory: 'File descriptors, system calls, virtual memory, signals, permissions & piped I/O',
        project: 'Automated server telemetry script monitoring memory, disk, and zombie processes',
        interviewDsa: 'Bit Manipulation, Hashmaps, OS process vs thread interview drills'
      },
      resource: {
        name: 'Linux for Beginners Full Course',
        creator: 'freeCodeCamp / Imran Teli',
        youtubeUrl: 'https://www.youtube.com/watch?v=sWbGOq-tdaU',
        type: 'Systems Foundations Masterclass',
        duration: '5 hours',
        syllabus: [
          'Linux directory hierarchy, file permissions, and chmod/chown',
          'Process management: ps, top, kill, nice, and systemd services',
          'Bash shell scripting: Variables, loops, exit codes, and pipes',
          'Network inspection with curl, netstat, ss, and iptables'
        ]
      }
    },
    {
      id: 'bec-2',
      roleId: 'backend-cloud',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'Computer Networking, TCP/IP & HTTP Protocol Architecture',
      category: 'Networking & Protocols',
      whyMatters: 'Backend engineers must deeply understand how packets traverse networks, how TLS handshakes work, and how sockets communicate.',
      conciseSummary: 'Understand TCP/IP, DNS resolution, TLS certificates, and asynchronous socket programming.',
      estimatedHours: 25,
      skillTags: ['networking', 'tcp-ip', 'http-protocols', 'tls-ssl'],
      status: 'completed',
      channels: {
        theory: 'TCP 3-way handshake, flow control, DNS lookup chain, TLS 1.3 handshake, WebSockets',
        project: 'High-concurrency TCP socket server with non-blocking event-driven I/O in Python',
        interviewDsa: 'Two Pointers, Stacks, Network latency & handshake interview questions'
      },
      resource: {
        name: 'Computer Networking Full Course',
        creator: 'NetworkChuck',
        youtubeUrl: 'https://www.youtube.com/watch?v=IPvYjXCsTg8',
        type: 'Visual Networking Masterclass',
        duration: '6.5 hours',
        syllabus: [
          'OSI 7-Layer model and TCP/IP protocol suite mapping',
          'IP addressing, subnetting, CIDR notation, and routing tables',
          'TCP vs UDP: Reliability, congestion control, and windowing',
          'HTTP/1.1 vs HTTP/2 vs HTTP/3 and TLS cryptographic handshakes'
        ]
      }
    },
    {
      id: 'bec-3',
      roleId: 'backend-cloud',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Scalable Microservices, Asynchronous I/O & Caching',
      category: 'Backend Systems',
      whyMatters: 'High-traffic backend services rely on asynchronous non-blocking event loops, Redis caching, and task queues to scale.',
      conciseSummary: 'Design asynchronous microservices, Redis caching patterns, and background task queues.',
      estimatedHours: 30,
      skillTags: ['microservices', 'redis', 'caching', 'celery', 'asyncio'],
      status: 'current',
      channels: {
        theory: 'Cache-aside pattern, cache invalidation, Redis data types, pub/sub, worker queues',
        project: 'Distributed background job processing pipeline with Redis, Celery, and FastAPI',
        interviewDsa: 'Queues, Priority Queues / Heaps, Cache eviction (LRU Cache) implementation'
      },
      resource: {
        name: 'Microservices Architecture Full Course',
        creator: 'freeCodeCamp / Hussein Nasser',
        youtubeUrl: 'https://www.youtube.com/watch?v=1xo-0gCVhTU',
        type: 'Advanced Systems Architecture Masterclass',
        duration: '4 hours',
        syllabus: [
          'Monolith vs Microservices tradeoffs and domain-driven boundaries',
          'In-memory caching patterns with Redis (Cache-Aside, Write-Through)',
          'Asynchronous task queues with Celery/RabbitMQ',
          'Database per service pattern, transactions, and event consistency'
        ]
      }
    },
    {
      id: 'bec-4',
      roleId: 'backend-cloud',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Docker Containerization & Multi-Service Packaging',
      category: 'Containerization',
      whyMatters: 'Containers guarantee deterministic execution across dev, staging, and production cloud clusters.',
      conciseSummary: 'Package multi-tier backend services into lightweight, secure Docker containers.',
      estimatedHours: 25,
      skillTags: ['docker', 'containers', 'docker-compose', 'cgroups'],
      status: 'locked',
      channels: {
        theory: 'Namespaces, cgroups, layered union file systems, volume mounts, container security',
        project: 'Multi-container stack (FastAPI, Redis, PostgreSQL, Nginx) orchestrated via Compose',
        interviewDsa: 'Trees, Graph traversal, Container isolation & networking mechanics'
      },
      resource: {
        name: 'Docker Tutorial for Beginners',
        creator: 'TechWorld with Nana',
        youtubeUrl: 'https://www.youtube.com/watch?v=pg19Z8LL06w',
        type: 'Hands-on Container Masterclass',
        duration: '3 hours',
        syllabus: [
          'Docker architecture: Images, containers, daemon, and registries',
          'Writing optimized Dockerfiles with multi-stage layer caching',
          'Container networking, bridge networks, and port bindings',
          'Persistent storage with Docker volumes and bind mounts'
        ]
      }
    },
    {
      id: 'bec-5',
      roleId: 'backend-cloud',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Infrastructure as Code (IaC) with Terraform & Cloud Basics',
      category: 'Cloud Infrastructure',
      whyMatters: 'Manual cloud clicking is obsolete; modern cloud teams define VPCs, subnets, and clusters entirely via Terraform code.',
      conciseSummary: 'Provision reproducible cloud infrastructure using declarative Terraform code.',
      estimatedHours: 30,
      skillTags: ['terraform', 'aws', 'gcp', 'iac', 'vpc'],
      status: 'locked',
      channels: {
        theory: 'Declarative state management, providers, modules, VPC CIDRs, security groups',
        project: 'Modular Terraform repository provisioning VPC, subnets, and container instances',
        interviewDsa: 'System Design (Scalable URL shortener, Rate limiter), Cloud security models'
      },
      resource: {
        name: 'Terraform Course — Automate your Cloud Infrastructure',
        creator: 'freeCodeCamp / Sanjeev Thiyagarajan',
        youtubeUrl: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
        type: 'Cloud Automation Masterclass',
        duration: '4.5 hours',
        syllabus: [
          'Terraform HCL syntax, providers, resources, and outputs',
          'Managing state files, remote backends, and state locks',
          'VPC networking, subnets, internet gateways, and route tables',
          'Modular infrastructure design and environment parameterization'
        ]
      }
    },
    {
      id: 'bec-6',
      roleId: 'backend-cloud',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'Kubernetes Cluster Orchestration, CI/CD & Observability',
      category: 'Cloud Orchestration & SRE',
      whyMatters: 'Production systems require self-healing container orchestration, zero-downtime rolling deploys, and real-time monitoring.',
      conciseSummary: 'Orchestrate resilient container workloads with Kubernetes, Prometheus, and automated CI/CD.',
      estimatedHours: 30,
      skillTags: ['kubernetes', 'k8s', 'helm', 'prometheus', 'ci-cd'],
      status: 'locked',
      channels: {
        theory: 'Pods, Deployments, Services, Ingress controllers, horizontal pod autoscaling (HPA)',
        project: 'Resilient Kubernetes deployment with auto-healing, rolling updates, and Grafana',
        interviewDsa: 'Distributed Systems Design, Failover strategies, Senior backend interview prep'
      },
      resource: {
        name: 'Kubernetes Course for Beginners',
        creator: 'TechWorld with Nana',
        youtubeUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        type: 'Production Orchestration Masterclass',
        duration: '4 hours',
        syllabus: [
          'Kubernetes architecture: Control plane, worker nodes, and kubelet',
          'YAML manifests: Pods, Deployments, Services, and ConfigMaps',
          'Ingress controllers, path-based routing, and TLS termination',
          'Monitoring with Prometheus, Grafana, and log aggregation'
        ]
      }
    }
  ],

  // =========================================================================
  // 5. FULL STACK AI PRODUCT ENGINEER
  // =========================================================================
  'fullstack-ai-dev': [
    {
      id: 'fsai-1',
      roleId: 'fullstack-ai-dev',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Next.js 15 App Router & Modern UI Foundations',
      category: 'AI Frontend',
      whyMatters: 'AI applications require responsive streaming interfaces, optimistic state, and real-time token rendering.',
      conciseSummary: 'Build fast web interfaces with Next.js 15 App Router, Tailwind CSS, and streaming SSR.',
      estimatedHours: 25,
      skillTags: ['nextjs', 'react', 'tailwind', 'streaming-ui'],
      status: 'completed',
      channels: {
        theory: 'Server vs Client components, streaming SSR, Suspense boundaries, edge runtimes',
        project: 'Real-time AI conversational workspace with Markdown rendering and token streaming',
        interviewDsa: 'Arrays, Strings, Two Pointers, Frontend web performance optimization'
      },
      resource: {
        name: 'Next.js 14 & 15 Crash Course',
        creator: 'Traversy Media',
        youtubeUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
        type: 'Modern Frontend Masterclass',
        duration: '4 hours',
        syllabus: [
          'Next.js 15 App Router architecture and layouts',
          'Server Components, Client boundaries, and Suspense',
          'Tailwind CSS styling and responsive layouts',
          'Token streaming with ReadableStream in the browser'
        ]
      }
    },
    {
      id: 'fsai-2',
      roleId: 'fullstack-ai-dev',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'AI SDK, LLM APIs & Structured Tool Calling',
      category: 'AI SDK & Tool Calling',
      whyMatters: 'Product engineers need reliable structured outputs (JSON Schemas) and function calling to execute real app logic.',
      conciseSummary: 'Integrate LLM APIs with Vercel AI SDK, structured JSON outputs, and function calling.',
      estimatedHours: 30,
      skillTags: ['ai-sdk', 'openai-api', 'function-calling', 'zod'],
      status: 'completed',
      channels: {
        theory: 'Tokenomics, temperature, prompt formatting, tool call lifecycle, Zod schema validation',
        project: 'AI automated document analyzer extracting structured tabular data into JSON schemas',
        interviewDsa: 'Hashmaps, Sliding Window, API error handling & exponential backoff'
      },
      resource: {
        name: 'Vercel AI SDK Full Tutorial',
        creator: 'Coding with Antonio',
        youtubeUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
        type: 'AI Integration Masterclass',
        duration: '3.5 hours',
        syllabus: [
          'useChat and useCompletion hooks with token streaming',
          'Function calling and schema enforcement with Zod',
          'Handling rate limits, token counts, and API failures',
          'Multi-turn conversation history management'
        ]
      }
    },
    {
      id: 'fsai-3',
      roleId: 'fullstack-ai-dev',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Vector Embeddings, Semantic Search & pgvector RAG',
      category: 'Vector Databases & RAG',
      whyMatters: 'Connecting LLMs with proprietary databases requires embeddings, similarity search, and hybrid indexing.',
      conciseSummary: 'Build production RAG pipelines using vector embeddings, Supabase pgvector, and hybrid search.',
      estimatedHours: 35,
      skillTags: ['embeddings', 'pgvector', 'supabase', 'rag'],
      status: 'current',
      channels: {
        theory: 'Dense vector embeddings, cosine distance, HNSW indexing, chunking heuristics',
        project: 'Production knowledge base Q&A platform with pgvector, citation badges, and reranking',
        interviewDsa: 'Binary Search Trees, Heaps, Vector search latency & retrieval evaluation'
      },
      resource: {
        name: 'Supabase Vector & AI Full Course',
        creator: 'Supabase Official',
        youtubeUrl: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
        type: 'Vector Architecture Masterclass',
        duration: '3 hours',
        syllabus: [
          'Setting up PostgreSQL with the pgvector extension',
          'Generating embeddings and storing high-dimensional vectors',
          'Similarity search queries with Cosine Distance and Dot Product',
          'Building complete RAG pipelines with source citation verification'
        ]
      }
    },
    {
      id: 'fsai-4',
      roleId: 'fullstack-ai-dev',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Autonomous Multi-Step Agents & Tool Orchestration',
      category: 'AI Agents',
      whyMatters: 'Modern AI products don\'t just answer questions; they plan multi-step tasks, search the web, and execute actions.',
      conciseSummary: 'Implement autonomous multi-step agents that utilize tools, memory, and reflection.',
      estimatedHours: 30,
      skillTags: ['agents', 'tool-calling', 'langchain', 'react-pattern'],
      status: 'locked',
      channels: {
        theory: 'ReAct agent reasoning loops, short-term vs long-term memory, stopping conditions',
        project: 'Autonomous web research agent that gathers citations, synthesizes notes, and saves reports',
        interviewDsa: 'Graphs (BFS/DFS, Topological Sort), Agent loop infinite-loop safeguards'
      },
      resource: {
        name: 'Building AI Agents from Scratch',
        creator: 'James Briggs',
        youtubeUrl: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
        type: 'Autonomous Systems Masterclass',
        duration: '4 hours',
        syllabus: [
          'The ReAct pattern: Thought, Action, Observation loops',
          'Equipping agents with custom web search and Python execution tools',
          'Agent state management and session memory persistence',
          'Guardrails: Preventing hallucination and infinite execution cycles'
        ]
      }
    },
    {
      id: 'fsai-5',
      roleId: 'fullstack-ai-dev',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Backend AI Microservices with Python FastAPI & WebSockets',
      category: 'AI Backend Systems',
      whyMatters: 'Complex AI workflows (multi-agent chains, document parsing) belong in high-performance async Python backends.',
      conciseSummary: 'Architect async Python FastAPI microservices with WebSockets and background task queues.',
      estimatedHours: 30,
      skillTags: ['fastapi', 'websockets', 'celery', 'asyncio'],
      status: 'locked',
      channels: {
        theory: 'WebSockets vs SSE for AI tokens, background job queues, multi-tenant isolation',
        project: 'High-throughput async Python API service orchestrating long-running LLM workflows',
        interviewDsa: 'Queues, Concurrency, Real-time streaming system design questions'
      },
      resource: {
        name: 'FastAPI for Machine Learning & AI',
        creator: 'DataCamp / freeCodeCamp',
        youtubeUrl: 'https://www.youtube.com/watch?v=06-AZXmwHjo',
        type: 'Production AI Backend Masterclass',
        duration: '5 hours',
        syllabus: [
          'Streaming responses with Server-Sent Events (SSE) in FastAPI',
          'WebSocket bidirectional communication for interactive AI agents',
          'Asynchronous task offloading with background workers',
          'Authentication, rate limiting, and API key management'
        ]
      }
    },
    {
      id: 'fsai-6',
      roleId: 'fullstack-ai-dev',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'Production Hardening, Semantic Caching & Cloud Deployment',
      category: 'AI Production & Scale',
      whyMatters: 'Commercial AI applications require token cost optimization, semantic response caching, and Docker cloud deployment.',
      conciseSummary: 'Optimize latency and token costs with semantic caching, rate limiting, and Docker deployment.',
      estimatedHours: 25,
      skillTags: ['semantic-caching', 'docker', 'rate-limiting', 'production-ai'],
      status: 'locked',
      channels: {
        theory: 'Semantic caching with Redis, token bucket rate limits, cost attribution, CI/CD',
        project: 'Complete production AI product deployed to cloud with telemetry, logging, and metrics',
        interviewDsa: 'AI System Design (Low latency, caching, cost minimization), Portfolio review'
      },
      resource: {
        name: 'Deploying Generative AI Applications',
        creator: 'Weights & Biases / Chip Huyen',
        youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        type: 'Commercial AI Production Masterclass',
        duration: '4 hours',
        syllabus: [
          'Semantic caching strategies to reduce LLM API billing by 40%+',
          'Token rate limiting and abuse prevention middleware',
          'Docker containerization and production deployment',
          'Observability: Tracing prompts, latencies, and token costs with LangSmith'
        ]
      }
    }
  ],

  // =========================================================================
  // 6. GENERATIVE AI & LLM SYSTEMS DEVELOPER
  // =========================================================================
  'genai-agent-dev': [
    {
      id: 'genai-1',
      roleId: 'genai-agent-dev',
      order: 1,
      weeks: 'Weeks 1–2',
      phase: 'Phase 1: Foundations',
      title: 'Foundations of Modern LLMs, Tokens & Prompt Systems',
      category: 'LLM Foundations',
      whyMatters: 'Understanding tokenization, attention context windows, and sampling temperatures is the basis of generative AI engineering.',
      conciseSummary: 'Master prompt engineering, tokenization mechanics, and sampling parameters.',
      estimatedHours: 20,
      skillTags: ['prompt-engineering', 'tokenization', 'llm-parameters', 'few-shot'],
      status: 'completed',
      channels: {
        theory: 'Subword tokenization (BPE), temperature, top-p, context window limits, prompt injection',
        project: 'Production prompt testing suite with automated benchmark evaluation',
        interviewDsa: 'String manipulation, Sliding Window, Token budgeting calculations'
      },
      resource: {
        name: 'ChatGPT Prompt Engineering for Developers',
        creator: 'Andrew Ng & Isa Fulford',
        youtubeUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
        type: 'Foundational Masterclass',
        duration: '2.5 hours',
        syllabus: [
          'Principles of effective prompt construction',
          'System vs User vs Assistant message roles',
          'Few-shot prompting and Chain-of-Thought (CoT) reasoning',
          'Structuring outputs into reliable JSON schemas'
        ]
      }
    },
    {
      id: 'genai-2',
      roleId: 'genai-agent-dev',
      order: 2,
      weeks: 'Weeks 3–4',
      phase: 'Phase 1: Foundations',
      title: 'Vector Embeddings, Indexing & Semantic Search',
      category: 'Embeddings & Vectors',
      whyMatters: 'High-accuracy retrieval requires understanding vector embedding models, distance metrics, and vector database indexing.',
      conciseSummary: 'Build semantic search engines using dense vector embeddings and index algorithms.',
      estimatedHours: 25,
      skillTags: ['embeddings', 'vector-dbs', 'pinecone', 'chroma'],
      status: 'completed',
      channels: {
        theory: 'Embedding geometries, cosine similarity, Euclidean distance, HNSW and IVF indexing',
        project: 'Semantic code search engine indexing 10,000+ open-source GitHub functions',
        interviewDsa: 'Binary Search, Heaps, Vector search algorithmic complexity'
      },
      resource: {
        name: 'Vector Databases and Embeddings Deep Dive',
        creator: 'Pinecone / freeCodeCamp',
        youtubeUrl: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
        type: 'Vector Architecture Masterclass',
        duration: '3.5 hours',
        syllabus: [
          'Generating embeddings with open-source and proprietary models',
          'Vector database fundamentals (Chroma, Pinecone, Qdrant)',
          'Approximate Nearest Neighbor (ANN) search algorithms',
          'Metadata filtering and multi-tenant vector namespaces'
        ]
      }
    },
    {
      id: 'genai-3',
      roleId: 'genai-agent-dev',
      order: 3,
      weeks: 'Weeks 5–6',
      phase: 'Phase 2: Applied Architecture',
      title: 'Advanced RAG Architecture & Context Engineering',
      category: 'Advanced RAG',
      whyMatters: 'Basic RAG fails in production; engineers must master parent-document retrieval, reranking, and semantic chunking.',
      conciseSummary: 'Build enterprise RAG pipelines with semantic chunking, cross-encoder reranking, and query rewriting.',
      estimatedHours: 35,
      skillTags: ['advanced-rag', 'reranking', 'query-rewriting', 'hybrid-search'],
      status: 'current',
      channels: {
        theory: 'Chunking tradeoffs, cross-encoder reranking models, hypothetical document embeddings (HyDE)',
        project: 'Production financial report RAG engine with tabular data extraction and reranking',
        interviewDsa: 'Graph Traversal, Dynamic Programming, RAG retrieval failure modes'
      },
      resource: {
        name: 'Advanced RAG: Context-Aware Systems',
        creator: 'LlamaIndex / Jerry Liu',
        youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        type: 'Architecture Masterclass',
        duration: '4 hours',
        syllabus: [
          'Hierarchical and semantic document chunking strategies',
          'Hybrid search: Combining BM25 keyword search with dense vectors',
          'Cross-encoder rerankers (Cohere, BGE-Reranker)',
          'Automated RAG evaluation with RAGAS (Faithfulness, Recall)'
        ]
      }
    },
    {
      id: 'genai-4',
      roleId: 'genai-agent-dev',
      order: 4,
      weeks: 'Weeks 7–8',
      phase: 'Phase 2: Applied Architecture',
      title: 'Autonomous Multi-Agent Frameworks with LangGraph',
      category: 'Agentic Workflows',
      whyMatters: 'Stateful, cyclic multi-agent graphs are replacing rigid linear chains for complex, enterprise reasoning tasks.',
      conciseSummary: 'Design stateful multi-agent systems with LangGraph, human-in-the-loop, and persistence.',
      estimatedHours: 35,
      skillTags: ['langgraph', 'multi-agent', 'human-in-the-loop', 'state-machines'],
      status: 'locked',
      channels: {
        theory: 'State graphs, nodes, conditional edges, human-in-the-loop approvals, checkpointing',
        project: 'Multi-agent software engineering workflow: Architect -> Coder -> Code Reviewer -> Tester',
        interviewDsa: 'Directed Acyclic Graphs (DAG), Topological Sort, Multi-agent coordination'
      },
      resource: {
        name: 'LangGraph Full Tutorial: Stateful Agents',
        creator: 'Harrison Chase / LangChain',
        youtubeUrl: 'https://www.youtube.com/watch?v=aywZrzNaKjs',
        type: 'Cutting-Edge Systems Masterclass',
        duration: '4 hours',
        syllabus: [
          'StateGraph concepts: Shared state schemas, nodes, and edges',
          'Cyclic agent loops and branching condition evaluation',
          'Human-in-the-loop interrupt patterns and state inspection',
          'Production checkpointing with PostgreSQL and SQLite backends'
        ]
      }
    },
    {
      id: 'genai-5',
      roleId: 'genai-agent-dev',
      order: 5,
      weeks: 'Weeks 9–10',
      phase: 'Phase 3: Production & Placement',
      title: 'Open-Source LLM Fine-Tuning with LoRA & Unsloth',
      category: 'Model Fine-Tuning',
      whyMatters: 'Companies fine-tune smaller open-source models (Llama 3, Mistral) to protect privacy and dramatically reduce API costs.',
      conciseSummary: 'Fine-tune open-source models on domain data using parameter-efficient fine-tuning (PEFT/LoRA).',
      estimatedHours: 30,
      skillTags: ['fine-tuning', 'lora', 'qlora', 'unsloth', 'huggingface'],
      status: 'locked',
      channels: {
        theory: 'Low-Rank Adaptation (LoRA), 4-bit quantization (QLoRA), learning rate schedules, loss curves',
        project: 'Domain-specialized instruction model fine-tuned on custom support dataset with Unsloth',
        interviewDsa: 'Matrix rank & decompositions, Backpropagation gradients, Fine-tuning tradeoffs'
      },
      resource: {
        name: 'Fine-Tuning LLMs with LoRA & Hugging Face',
        creator: 'Daniel Bourke / freeCodeCamp',
        youtubeUrl: 'https://www.youtube.com/watch?v=06-AZXmwHjo',
        type: 'Model Training Masterclass',
        duration: '5 hours',
        syllabus: [
          'Preparing and formatting instruction-tuning datasets (JSONL)',
          'Parameter-Efficient Fine-Tuning (PEFT) and LoRA rank selection',
          'Accelerated training with Unsloth and Hugging Face SFTTrainer',
          'Evaluating fine-tuned models vs base models with benchmarks'
        ]
      }
    },
    {
      id: 'genai-6',
      roleId: 'genai-agent-dev',
      order: 6,
      weeks: 'Weeks 11–12',
      phase: 'Phase 3: Production & Placement',
      title: 'LLM Systems Architecture, Guardrails & Evaluation',
      category: 'LLM Systems & SRE',
      whyMatters: 'Enterprise deployments demand strict prompt injection defenses, PII redaction, latency SLAs, and evaluation suites.',
      conciseSummary: 'Deploy resilient LLM systems with NeMo Guardrails, automated evaluation, and semantic caching.',
      estimatedHours: 25,
      skillTags: ['guardrails', 'prompt-security', 'langsmith', 'mlops'],
      status: 'locked',
      channels: {
        theory: 'Prompt injection defense, PII masking, token cost attribution, semantic cache hit rates',
        project: 'Production LLM gateway with automated security guardrails, caching, and LangSmith tracing',
        interviewDsa: 'AI System Design (Scale, cost minimization, security), Senior interview preparation'
      },
      resource: {
        name: 'LLM Application Architecture & Production Evaluation',
        creator: 'Weights & Biases',
        youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        type: 'Production Systems Masterclass',
        duration: '4 hours',
        syllabus: [
          'Security guardrails: Input/output moderation and PII redaction',
          'Semantic caching and request deduplication in Redis',
          'Automated evaluation pipelines with LangSmith and DeepEval',
          'Comprehensive system design: High-throughput LLM gateway architecture'
        ]
      }
    }
  ]
};
