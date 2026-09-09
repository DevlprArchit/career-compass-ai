export interface DiagnosticQuestion {
  id: string;
  roleId: string;
  category: string;
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skillGainedOnPass: string;
  gapOnFail: string;
}

export const ROLE_ASSESSMENT_QUESTIONS: Record<string, DiagnosticQuestion[]> = {
  'ai-ml-engineer': [
    {
      id: 'aiml-q1',
      roleId: 'ai-ml-engineer',
      category: 'Deep Learning',
      difficulty: 'foundational',
      question: 'During backpropagation in a multi-layer perceptron, which mathematical formulation enables computing the gradient of the loss with respect to early layer weights?',
      options: [
        'The Gauss-Markov Theorem',
        'The Multivariable Chain Rule',
        'Bayes Theorem of Conditional Probability',
        'The Central Limit Theorem'
      ],
      correctIndex: 1,
      explanation: 'The multivariable chain rule allows multiplying Jacobian matrices of partial derivatives sequentially from output back to input.',
      skillGainedOnPass: 'Understanding of computational graphs and gradient propagation',
      gapOnFail: 'Foundational backpropagation and autograd chain rule mechanics'
    },
    {
      id: 'aiml-q2',
      roleId: 'ai-ml-engineer',
      category: 'Transformers & Attention',
      difficulty: 'intermediate',
      question: 'In standard scaled dot-product attention, why is the dot product of Queries and Keys divided by the square root of the head dimension sqrt(d_k)?',
      options: [
        'To reduce computational complexity from O(N^2) to linear O(N)',
        'To prevent large magnitude dot products from pushing softmax into vanishing gradient saturation',
        'To enforce causal masking across future sequence tokens',
        'To normalize the output embedding to zero mean and unit variance'
      ],
      correctIndex: 1,
      explanation: 'For large d_k, the dot products grow large in magnitude, pulling softmax into regions with extremely small gradients. Dividing by sqrt(d_k) stabilizes training.',
      skillGainedOnPass: 'Scaled dot-product attention mechanics and softmax gradient stabilization',
      gapOnFail: 'Self-attention mathematical scaling and vanishing gradient dynamics'
    },
    {
      id: 'aiml-q3',
      roleId: 'ai-ml-engineer',
      category: 'Classical Machine Learning',
      difficulty: 'foundational',
      question: 'When training a Random Forest regressor on tabular data, which parameter set directly controls model variance and prevents overfitting?',
      options: [
        'Setting max_depth=None and max_features=1.0',
        'Constraining max_depth, increasing min_samples_split, and subsetting max_features',
        'Reducing the number of trees (n_estimators) to 1',
        'Removing cross-validation fold splits'
      ],
      correctIndex: 1,
      explanation: 'Limiting tree depth and increasing minimum samples required to split decreases variance and prevents trees from memorizing training noise.',
      skillGainedOnPass: 'Ensemble tuning, bias-variance tradeoff, and tree regularization',
      gapOnFail: 'Overfitting prevention in decision tree ensembles'
    },
    {
      id: 'aiml-q4',
      roleId: 'ai-ml-engineer',
      category: 'MLOps & Systems',
      difficulty: 'advanced',
      question: 'When serving open-weight LLMs (e.g. LLaMA 3) under high concurrent request volume, what is the primary benefit of PagedAttention (vLLM) over standard Hugging Face generation?',
      options: [
        'It eliminates the need for GPU VRAM by storing weights in CPU swap',
        'It manages Key-Value (KV) cache in non-contiguous virtual memory blocks, eliminating memory fragmentation and enabling near-zero wasted VRAM',
        'It replaces matrix multiplications with bitwise XOR operations',
        'It reduces token generation from autoregressive to single-pass non-autoregressive'
      ],
      correctIndex: 1,
      explanation: 'PagedAttention borrows operating system virtual memory paging concepts to store dynamic KV caches in fragmented blocks, increasing throughput by 2-4x.',
      skillGainedOnPass: 'High-throughput LLM serving, KV cache management, and memory optimization',
      gapOnFail: 'KV cache memory dynamics and high-throughput inference serving'
    },
    {
      id: 'aiml-q5',
      roleId: 'ai-ml-engineer',
      category: 'Mathematics',
      difficulty: 'intermediate',
      question: 'What is the geometric interpretation of computing the eigenvectors and eigenvalues of a data covariance matrix in Principal Component Analysis (PCA)?',
      options: [
        'Finding the directions of maximum variance (eigenvectors) and the magnitude of variance along those directions (eigenvalues)',
        'Calculating the nearest Euclidean distance between arbitrary cluster centroids',
        'Inverting a singular non-square matrix',
        'Projecting high-dimensional data onto a non-linear Riemannian manifold'
      ],
      correctIndex: 0,
      explanation: 'The eigenvectors of the covariance matrix point along the axes of maximum variance, while the eigenvalues indicate the variance magnitude along each principal axis.',
      skillGainedOnPass: 'Dimensionality reduction geometry and covariance matrix decomposition',
      gapOnFail: 'Linear algebra foundations for PCA and feature projection'
    }
  ],
  'genai-agent-dev': [
    {
      id: 'genai-q1',
      roleId: 'genai-agent-dev',
      category: 'RAG Systems',
      difficulty: 'intermediate',
      question: 'What is the primary architectural limitation of relying solely on Dense Vector Cosine Similarity retrieval without a secondary Re-Ranker in RAG?',
      options: [
        'Cosine similarity cannot be computed on vectors with more than 10 dimensions',
        'Dense embeddings struggle with exact keyword/code/identifier matches and lack cross-attention between the query and candidate chunk',
        'Vector databases take hours to index a single document',
        'Cosine distance always returns hallucinated text'
      ],
      correctIndex: 1,
      explanation: 'Dense Bi-encoders embed query and document independently. A Cross-Encoder re-ranker performs full cross-attention between query and chunk, drastically improving top-1 accuracy.',
      skillGainedOnPass: 'Dense retrieval limitations, hybrid search (BM25 + Dense), and Cross-Encoder re-ranking',
      gapOnFail: 'Re-ranking architectures and hybrid search strategies in RAG'
    },
    {
      id: 'genai-q2',
      roleId: 'genai-agent-dev',
      category: 'Agentic Workflows',
      difficulty: 'advanced',
      question: 'In the ReAct (Reason + Act) prompting framework for autonomous agents, what is the purpose of interleaving thought, action, and observation cycles?',
      options: [
        'To bypass API rate limiting through scheduled sleep periods',
        'To allow the model to track task progress, self-correct errors based on tool outputs, and dynamically plan next steps',
        'To translate Python code directly to assembly language',
        'To fine-tune model weights in real time during the request'
      ],
      correctIndex: 1,
      explanation: 'ReAct interleaves reasoning traces (Thought) and task-specific actions (Act/Tool Call) with feedback from the environment (Observation) to dynamically correct execution paths.',
      skillGainedOnPass: 'ReAct loops, agent state planning, and tool evaluation',
      gapOnFail: 'Autonomous agent loops and error-recovery patterns'
    },
    {
      id: 'genai-q3',
      roleId: 'genai-agent-dev',
      category: 'Fine-Tuning',
      difficulty: 'advanced',
      question: 'How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning of 70B+ parameter models on single consumer GPUs?',
      options: [
        'By pruning 90% of model neurons before training',
        'By freezing base model weights and injecting trainable rank-decomposition matrices (A and B) into transformer attention layers',
        'By converting floating-point numbers into 1-bit integers without gradient calculation',
        'By training only the tokenizer vocabulary embeddings'
      ],
      correctIndex: 1,
      explanation: 'LoRA decomposes weight updates into Delta_W = B * A with low rank r << d, reducing trainable parameters and optimizer memory by over 95%.',
      skillGainedOnPass: 'PEFT, LoRA mechanics, and GPU VRAM optimization for fine-tuning',
      gapOnFail: 'Parameter-efficient fine-tuning and weight decomposition'
    }
  ]
};

export interface AssessmentResult {
  overallScore: number;
  totalQuestions: number;
  correctCount: number;
  categoryScores: Record<string, { total: number; correct: number; percentage: number }>;
  demonstratedStrengths: string[];
  isolatedGaps: string[];
  narrativeText: string;
}

export function evaluateAssessment(
  roleId: string,
  answers: Record<string, number>
): AssessmentResult {
  const questions = ROLE_ASSESSMENT_QUESTIONS[roleId] || ROLE_ASSESSMENT_QUESTIONS['ai-ml-engineer'];
  let correctCount = 0;
  const categoryScores: Record<string, { total: number; correct: number; percentage: number }> = {};
  const demonstratedStrengths: string[] = [];
  const isolatedGaps: string[] = [];

  questions.forEach((q) => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { total: 0, correct: 0, percentage: 0 };
    }
    categoryScores[q.category].total++;

    const userAnswer = answers[q.id];
    if (userAnswer === q.correctIndex) {
      correctCount++;
      categoryScores[q.category].correct++;
      demonstratedStrengths.push(q.skillGainedOnPass);
    } else {
      isolatedGaps.push(q.gapOnFail);
    }
  });

  Object.keys(categoryScores).forEach((cat) => {
    const item = categoryScores[cat];
    item.percentage = Math.round((item.correct / item.total) * 100);
  });

  const overallScore = Math.round((correctCount / questions.length) * 100);

  let narrativeText = '';
  if (overallScore >= 80) {
    narrativeText = `Strong performance. You demonstrate firm conceptual grounding in core modeling and mathematical derivations. Focus your preparation on high-concurrency production deployments and low-level optimization.`;
  } else if (overallScore >= 50) {
    narrativeText = `Solid foundational baseline, but your answers reveal specific gaps in low-level mechanics (${isolatedGaps.slice(0, 2).join(' and ')}). Your roadmap has been re-sequenced to bridge these specific gaps before you attempt full system mock interviews.`;
  } else {
    narrativeText = `Diagnostic completed. Several core prerequisite concepts (${isolatedGaps.slice(0, 2).join(', ')}) require dedicated study. Follow the step-by-step milestone path starting with foundational video masterclasses.`;
  }

  return {
    overallScore,
    totalQuestions: questions.length,
    correctCount,
    categoryScores,
    demonstratedStrengths,
    isolatedGaps,
    narrativeText
  };
}
