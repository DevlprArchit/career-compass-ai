export interface CourseItem {
  id: string;
  milestoneOrder: number;
  title: string;
  whyMatters: string;
  skillTags: string[];
  duration: string;
  status: 'completed' | 'current' | 'locked';
  creator: string;
  youtubeUrl: string;
}

export const AI_CURRICULUM: CourseItem[] = [
  {
    id: 'm1',
    milestoneOrder: 1,
    title: 'Mathematical Foundations & Vector Calculus',
    whyMatters: 'Essential for loss surfaces, backpropagation calculus, and matrix multiplications.',
    skillTags: ['linear-algebra', 'calculus', 'numpy'],
    duration: '25h',
    status: 'completed',
    creator: '3Blue1Brown',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'
  },
  {
    id: 'm2',
    milestoneOrder: 2,
    title: 'Classical Machine Learning & Statistical Modeling',
    whyMatters: 'Over 70% of industry models utilize gradient-boosted trees and tabular feature engineering.',
    skillTags: ['scikit-learn', 'xgboost', 'bias-variance'],
    duration: '40h',
    status: 'completed',
    creator: 'StatQuest & Andrew Ng',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF'
  },
  {
    id: 'm3',
    milestoneOrder: 3,
    title: 'Deep Learning & Neural Networks from Scratch',
    whyMatters: 'Must be able to derive computational graphs and optimize PyTorch models without black-box abstractions.',
    skillTags: ['pytorch', 'backprop', 'autograd', 'optimizers'],
    duration: '35h',
    status: 'current', // YOU ARE HERE (waypoint gold)
    creator: 'Andrej Karpathy (Zero to Hero)',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'
  },
  {
    id: 'm4',
    milestoneOrder: 4,
    title: 'Transformers & Modern NLP Architectures',
    whyMatters: 'Self-attention, multi-head attention, and causal masking power all modern LLMs.',
    skillTags: ['transformers', 'attention-mechanisms', 'huggingface'],
    duration: '30h',
    status: 'locked',
    creator: 'Andrej Karpathy nanoGPT',
    youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY'
  },
  {
    id: 'm5',
    milestoneOrder: 5,
    title: 'Generative AI, RAG & Autonomous Agent Systems',
    whyMatters: 'Production enterprise demand: semantic chunking, vector embeddings, and LangChain/LlamaIndex agents.',
    skillTags: ['rag', 'vector-databases', 'langchain', 'lora-finetuning'],
    duration: '35h',
    status: 'locked',
    creator: 'Krish Naik',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVNbOXGEBP_Wd-bypY8N_P_1'
  },
  {
    id: 'm6',
    milestoneOrder: 6,
    title: 'Production MLOps, Serving & Quantization',
    whyMatters: 'Deploying models via async FastAPI, Docker containerization, and TensorRT/vLLM batching.',
    skillTags: ['mlops', 'fastapi', 'docker', 'vllm'],
    duration: '30h',
    status: 'locked',
    creator: 'DataTalks.Club MLOps Zoomcamp',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PL3MmuxUbc_hIhxl5Ji8t4v6daBQUptpwP'
  }
];
