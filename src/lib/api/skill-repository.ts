import type { SkillNode } from "@/lib/types";
import { skillNodes as initialNodes } from "@/lib/mock-data";

export interface SkillRepository {
  loadSkills(): Promise<SkillNode[]>;
  createSkill(skill: SkillNode): Promise<void>;
  updateSkill(skill: SkillNode): Promise<void>;
  deleteSkill(id: string): Promise<void>;
  connectSkills(sourceId: string, targetId: string): Promise<void>;
  disconnectSkills(sourceId: string, targetId: string): Promise<void>;
}

/**
 * Local repository uses browser storage for persistence during MVP.
 * Persists to localStorage under `skilltree.skills`.
 */
export class LocalSkillRepository implements SkillRepository {
  private storageKey = "skilltree.skills";

  async loadSkills(): Promise<SkillNode[]> {
    if (typeof window === "undefined") {
      return initialNodes;
    }
    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) return initialNodes;
    try {
      const parsed = JSON.parse(raw) as SkillNode[];
      return parsed.length ? parsed : initialNodes;
    } catch (error) {
      console.error("Failed to parse skill storage", error);
      return initialNodes;
    }
  }

  async createSkill(skill: SkillNode): Promise<void> {
    const skills = await this.loadSkills();
    this.save([...skills, skill]);
  }

  async updateSkill(skill: SkillNode): Promise<void> {
    const skills = await this.loadSkills();
    this.save(skills.map((item) => (item.id === skill.id ? skill : item)));
  }

  async deleteSkill(id: string): Promise<void> {
    const skills = await this.loadSkills();
    this.save(
      skills
        .filter((skill) => skill.id !== id)
        .map((skill) => ({
          ...skill,
          connections: skill.connections.filter((connection) => connection !== id),
        })),
    );
  }

  async connectSkills(sourceId: string, targetId: string): Promise<void> {
    const skills = await this.loadSkills();
    this.save(
      skills.map((skill) => {
        if (skill.id === sourceId && !skill.connections.includes(targetId)) {
          return { ...skill, connections: [...skill.connections, targetId] };
        }
        if (skill.id === targetId && !skill.connections.includes(sourceId)) {
          return { ...skill, connections: [...skill.connections, sourceId] };
        }
        return skill;
      }),
    );
  }

  async disconnectSkills(sourceId: string, targetId: string): Promise<void> {
    const skills = await this.loadSkills();
    this.save(
      skills.map((skill) => {
        if (skill.id === sourceId) {
          return {
            ...skill,
            connections: skill.connections.filter((connection) => connection !== targetId),
          };
        }
        if (skill.id === targetId) {
          return {
            ...skill,
            connections: skill.connections.filter((connection) => connection !== sourceId),
          };
        }
        return skill;
      }),
    );
  }

  private save(skills: SkillNode[]): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(this.storageKey, JSON.stringify(skills));
  }
}

/**
 * Google Sheets repository scaffolding. Inject your Apps Script endpoint via
 * environment variable `NEXT_PUBLIC_SHEETS_PROXY_URL`. Not implemented yet.
 */
export class SheetsSkillRepository implements SkillRepository {
  constructor(private endpoint = process.env.NEXT_PUBLIC_SHEETS_PROXY_URL) {}

  private ensureEndpoint(): string {
    if (!this.endpoint) {
      throw new Error("Missing NEXT_PUBLIC_SHEETS_PROXY_URL");
    }
    return this.endpoint;
  }

  async loadSkills(): Promise<SkillNode[]> {
    const response = await fetch(`${this.ensureEndpoint()}/skills`);
    if (!response.ok) {
      throw new Error("Failed to load skills from Sheets proxy");
    }
    return (await response.json()) as SkillNode[];
  }

  async createSkill(skill: SkillNode): Promise<void> {
    await fetch(`${this.ensureEndpoint()}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
  }

  async updateSkill(skill: SkillNode): Promise<void> {
    await fetch(`${this.ensureEndpoint()}/skills/${skill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
  }

  async deleteSkill(id: string): Promise<void> {
    await fetch(`${this.ensureEndpoint()}/skills/${id}`, { method: "DELETE" });
  }

  async connectSkills(sourceId: string, targetId: string): Promise<void> {
    await fetch(`${this.ensureEndpoint()}/skills/${sourceId}/connect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
  }

  async disconnectSkills(sourceId: string, targetId: string): Promise<void> {
    await fetch(`${this.ensureEndpoint()}/skills/${sourceId}/disconnect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
  }
}

export function createSkillRepository(): SkillRepository {
  if (process.env.NEXT_PUBLIC_SHEETS_PROXY_URL) {
    return new SheetsSkillRepository();
  }
  return new LocalSkillRepository();
}
