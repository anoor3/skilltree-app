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

export interface ProfileFocusArea {
  title: string;
  description: string;
  emoji: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  bio: string;
  streak: number;
  location: string;
  focusAreas: ProfileFocusArea[];
  links: ProfileLink[];
}
