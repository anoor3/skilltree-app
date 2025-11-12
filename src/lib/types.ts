export type SkillLevel = "planned" | "learning" | "strong";

export interface SkillNode {
  id: string;
  name: string;
  emoji: string;
  level: SkillLevel;
  progress: number; // 0-1
  connections: string[];
}

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  skillRefs: string[];
  link: string;
  description: string;
}

export interface AiSuggestion {
  id: string;
  title: string;
  description: string;
  relatedSkills: string[];
  actionLabel: string;
}

export interface UserProfile {
  id: string;
  name: string;
  streak: number;
  avatarUrl: string;
  headline: string;
}
