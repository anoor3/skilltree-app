import type { AiSuggestion, Project, SkillNode, UserProfile } from "./types";

export const userProfile: UserProfile = {
  id: "abdullah",
  name: "Abdullah Noor",
  streak: 7,
  avatarUrl: "https://avatars.dicebear.com/api/identicon/abdullah.svg",
  headline: "AI + CS Student @ Ohlone",
};

export const skillNodes: SkillNode[] = [
  {
    id: "python",
    name: "Python",
    emoji: "🐍",
    level: "strong",
    progress: 0.95,
    connections: ["pandas", "ai"],
  },
  {
    id: "pandas",
    name: "Pandas",
    emoji: "🧮",
    level: "learning",
    progress: 0.7,
    connections: ["python", "numpy"],
  },
  {
    id: "numpy",
    name: "NumPy",
    emoji: "🔢",
    level: "planned",
    progress: 0.2,
    connections: ["pandas"],
  },
  {
    id: "ai",
    name: "AI Foundations",
    emoji: "🧠",
    level: "learning",
    progress: 0.6,
    connections: ["python", "ml"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    emoji: "🤖",
    level: "planned",
    progress: 0.35,
    connections: ["ai", "dl"],
  },
  {
    id: "dl",
    name: "Deep Learning",
    emoji: "🌐",
    level: "planned",
    progress: 0.18,
    connections: ["ml"],
  },
  {
    id: "cpp",
    name: "C++",
    emoji: "🛠️",
    level: "strong",
    progress: 0.8,
    connections: ["algorithms"],
  },
  {
    id: "algorithms",
    name: "Algorithms",
    emoji: "🧩",
    level: "learning",
    progress: 0.5,
    connections: ["cpp", "ai"],
  },
  {
    id: "frontend",
    name: "Frontend",
    emoji: "🎨",
    level: "learning",
    progress: 0.65,
    connections: ["react", "three"],
  },
  {
    id: "react",
    name: "React",
    emoji: "⚛️",
    level: "strong",
    progress: 0.9,
    connections: ["frontend", "three"],
  },
  {
    id: "three",
    name: "Three.js",
    emoji: "🪐",
    level: "planned",
    progress: 0.25,
    connections: ["frontend", "react"],
  },
];

export const projects: Project[] = [
  {
    id: "huffman",
    title: "Huffman Coding Lab",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
    skillRefs: ["cpp", "algorithms"],
    link: "https://github.com/abdullah/huffman",
    description: "Data compression visualizer that animates tree building and encoding in real time.",
  },
  {
    id: "ml-notebooks",
    title: "ML Notebook Hub",
    thumbnail: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=600&q=80",
    skillRefs: ["python", "ml", "ai"],
    link: "https://github.com/abdullah/ml-hub",
    description: "Curated notebooks covering supervised learning, feature engineering, and evaluation.",
  },
  {
    id: "skilltree-ui",
    title: "SkillTree UI Kit",
    thumbnail: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80",
    skillRefs: ["frontend", "react", "three"],
    link: "https://github.com/abdullah/skilltree-ui",
    description: "Component system inspired by immersive 3D dashboards with neon highlights and glass cards.",
  },
];

export const aiSuggestions: AiSuggestion[] = [
  {
    id: "numpy",
    title: "Master NumPy",
    description: "Parallelize your data transformations to prep for deep learning workloads.",
    relatedSkills: ["python", "pandas"],
    actionLabel: "Start Sprint",
  },
  {
    id: "neural-networks",
    title: "Take the Neural Leap",
    description: "Translate your ML intuition into multi-layer architectures with PyTorch.",
    relatedSkills: ["ml", "dl"],
    actionLabel: "View Guide",
  },
  {
    id: "data-viz",
    title: "Level Up Storytelling",
    description: "Craft interactive dashboards that explain your AI models with clarity.",
    relatedSkills: ["frontend", "ai"],
    actionLabel: "Open Toolkit",
  },
];
