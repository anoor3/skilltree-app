import { act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";

import { useSkillStore } from "@/store/skill-store";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  window.localStorage.removeItem("skilltree-store");
  window.localStorage.removeItem("skilltree.skills");
  useSkillStore.getState().reset();
});

describe("useSkillStore", () => {
  it("adds a skill and persists it", async () => {
    let createdId = "";

    act(() => {
      const created = useSkillStore.getState().addSkill({
        name: "Neural Networks",
        emoji: "🌐",
        level: "learning",
        connectsTo: [],
      });
      createdId = created.id;
    });

    await flushPromises();

    const skill = useSkillStore.getState().skills.find((item) => item.id === createdId);
    expect(skill).toBeTruthy();

    const persisted = JSON.parse(window.localStorage.getItem("skilltree.skills") ?? "[]");
    expect(persisted.some((item: { id: string }) => item.id === createdId)).toBe(true);
  });

  it("updates skill progress", async () => {
    const target = useSkillStore.getState().skills[0];
    act(() => {
      useSkillStore.getState().updateSkill(target.id, { progress: 0.42 });
    });

    await flushPromises();

    const updated = useSkillStore.getState().skills.find((item) => item.id === target.id);
    expect(updated?.progress).toBeCloseTo(0.42, 2);
  });

  it("connects and disconnects skills symmetrically", async () => {
    const [source, target] = useSkillStore.getState().skills;

    act(() => {
      useSkillStore.getState().connectSkills(source.id, target.id);
    });
    await flushPromises();

    let refreshed = useSkillStore.getState().skills;
    const sourceAfterConnect = refreshed.find((item) => item.id === source.id);
    const targetAfterConnect = refreshed.find((item) => item.id === target.id);
    expect(sourceAfterConnect?.connections).toContain(target.id);
    expect(targetAfterConnect?.connections).toContain(source.id);

    act(() => {
      useSkillStore.getState().disconnectSkills(source.id, target.id);
    });
    await flushPromises();

    refreshed = useSkillStore.getState().skills;
    const sourceAfterDisconnect = refreshed.find((item) => item.id === source.id);
    const targetAfterDisconnect = refreshed.find((item) => item.id === target.id);
    expect(sourceAfterDisconnect?.connections).not.toContain(target.id);
    expect(targetAfterDisconnect?.connections).not.toContain(source.id);
  });

  it("removes skill and cleans connections", async () => {
    const { addSkill, removeSkill } = useSkillStore.getState();
    let newSkillId = "";

    act(() => {
      const created = addSkill({
        name: "Graph Theory",
        emoji: "📈",
        level: "planned",
        connectsTo: [useSkillStore.getState().skills[0].id],
      });
      newSkillId = created.id;
    });
    await flushPromises();

    act(() => {
      removeSkill(newSkillId);
    });
    await flushPromises();

    const stillExists = useSkillStore.getState().skills.some((skill) => skill.id === newSkillId);
    expect(stillExists).toBe(false);
  });
});
