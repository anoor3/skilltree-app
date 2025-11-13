"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SkillLevel, SkillNode } from "@/lib/types";
import { useSkillStore } from "@/store/skill-store";

const LEVEL_ORDER: SkillLevel[] = ["strong", "learning", "planned"];

const levelCardGradients: Record<SkillNode["level"], string> = {
  strong: "from-[#4BFFB3]/90 via-[#52e5ff]/80 to-[#8CF8FF]/75",
  learning: "from-[#5C6CFF]/85 via-[#8E80FF]/85 to-[#C7A5FF]/80",
  planned: "from-[#4C3FFF]/80 via-[#9272FF]/80 to-[#E6C3FF]/75",
};

const levelAccentColors: Record<SkillNode["level"], string> = {
  strong: "#79FFB0",
  learning: "#80A2FF",
  planned: "#E1A8FF",
};

const levelLabels: Record<SkillNode["level"], string> = {
  strong: "Strong",
  learning: "Learning",
  planned: "Planned",
};

interface PositionedSkill extends SkillNode {
  x: number;
  y: number;
  depth: number;
}

interface LayoutResult {
  nodes: PositionedSkill[];
  parents: Record<string, string | null>;
}

const SIBLING_SPACING_UNITS = 1;
const COMPONENT_SPACING_UNITS = 3;
const NODE_SIZE_DEFAULT = 136;
const NODE_SIZE_SELECTED = 148;
const CONNECTOR_SIZE = 28;
const CONNECTOR_RIGHT_OFFSET = 24;
const CONNECTOR_BOTTOM_OFFSET = 12;
const CONNECTOR_RADIUS = CONNECTOR_SIZE / 2;
const CONNECT_TARGET_RADIUS = 72;

function buildLayout(skills: SkillNode[], size: number): LayoutResult {
  if (skills.length === 0) {
    return { nodes: [], parents: {} };
  }

  const skillMap = new Map(skills.map((skill) => [skill.id, skill]));
  const adjacency = new Map<string, Set<string>>();

  skills.forEach((skill) => {
    if (!adjacency.has(skill.id)) adjacency.set(skill.id, new Set());
    skill.connections.forEach((connection) => {
      if (!adjacency.has(connection)) adjacency.set(connection, new Set());
      adjacency.get(skill.id)!.add(connection);
      adjacency.get(connection)!.add(skill.id);
    });
  });

  const visited = new Set<string>();
  const parentMap: Record<string, string | null> = {};
  const childrenMap = new Map<string, string[]>();
  const roots: string[] = [];

  const sortedByPriority = [...skills].sort((a, b) => {
    if (b.progress !== a.progress) return b.progress - a.progress;
    return a.name.localeCompare(b.name);
  });

  const traverse = (rootId: string) => {
    roots.push(rootId);
    visited.add(rootId);
    parentMap[rootId] = null;

    const queue: string[] = [rootId];

    while (queue.length) {
      const current = queue.shift()!;
      const neighbors = Array.from(adjacency.get(current) ?? []).sort((a, b) => {
        const skillA = skillMap.get(a);
        const skillB = skillMap.get(b);
        if (skillA && skillB) {
          return skillA.name.localeCompare(skillB.name);
        }
        return a.localeCompare(b);
      });

      const currentChildren: string[] = [];

      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parentMap[neighbor] = current;
        currentChildren.push(neighbor);
        queue.push(neighbor);
      }

      if (currentChildren.length) {
        childrenMap.set(current, currentChildren);
      }
    }
  };

  for (const skill of sortedByPriority) {
    if (!visited.has(skill.id)) {
      traverse(skill.id);
    }
  }

  for (const skill of skills) {
    if (!visited.has(skill.id)) {
      traverse(skill.id);
    }
  }

  childrenMap.forEach((childIds, parentId) => {
    childIds.sort((a, b) => {
      const skillA = skillMap.get(a);
      const skillB = skillMap.get(b);
      if (skillA && skillB) {
        return skillA.name.localeCompare(skillB.name);
      }
      return a.localeCompare(b);
    });
  });

  const widthMap = new Map<string, number>();

  const measure = (nodeId: string): number => {
    if (widthMap.has(nodeId)) return widthMap.get(nodeId)!;
    const children = childrenMap.get(nodeId) ?? [];
    if (!children.length) {
      widthMap.set(nodeId, 1);
      return 1;
    }

    let total = 0;
    children.forEach((childId, index) => {
      total += measure(childId);
      if (index < children.length - 1) total += SIBLING_SPACING_UNITS;
    });

    const width = Math.max(total, 1);
    widthMap.set(nodeId, width);
    return width;
  };

  const rootWidths = roots.map((rootId) => measure(rootId));
  const totalUnits = rootWidths.reduce(
    (sum, width, index) => sum + width + (index > 0 ? COMPONENT_SPACING_UNITS : 0),
    0,
  );
  const horizontalMargin = size * 0.1;
  const availableWidth = size - horizontalMargin * 2;
  const unitWidth = totalUnits > 0 ? availableWidth / totalUnits : availableWidth;

  const positionUnits = new Map<string, { center: number; depth: number }>();
  let maxDepth = 0;

  const assign = (nodeId: string, leftUnit: number, depth: number) => {
    const widthUnits = widthMap.get(nodeId) ?? 1;
    const centerUnit = leftUnit + widthUnits / 2;
    positionUnits.set(nodeId, { center: centerUnit, depth });
    maxDepth = Math.max(maxDepth, depth);

    const children = childrenMap.get(nodeId) ?? [];
    if (!children.length) return;

    const childrenTotalUnits = children.reduce((sum, childId) => sum + (widthMap.get(childId) ?? 1), 0);
    const totalWithSpacing =
      childrenTotalUnits + Math.max(children.length - 1, 0) * SIBLING_SPACING_UNITS;
    let cursor = centerUnit - totalWithSpacing / 2;

    children.forEach((childId, index) => {
      const childWidth = widthMap.get(childId) ?? 1;
      assign(childId, cursor, depth + 1);
      cursor += childWidth;
      if (index < children.length - 1) {
        cursor += SIBLING_SPACING_UNITS;
      }
    });
  };

  let offsetUnits = 0;
  roots.forEach((rootId, index) => {
    const widthUnits = widthMap.get(rootId) ?? 1;
    assign(rootId, offsetUnits, 0);
    offsetUnits += widthUnits;
    if (index < roots.length - 1) {
      offsetUnits += COMPONENT_SPACING_UNITS;
    }
  });

  const topMargin = size * 0.12;
  const bottomMargin = size * 0.12;
  const verticalGap = maxDepth > 0 ? (size - topMargin - bottomMargin) / maxDepth : 0;

  const nodes: PositionedSkill[] = Array.from(positionUnits.entries()).map(([id, position]) => {
    const skill = skillMap.get(id)!;
    return {
      ...skill,
      x: horizontalMargin + position.center * unitWidth,
      y: topMargin + position.depth * verticalGap,
      depth: position.depth,
    };
  });

  nodes.sort((a, b) => (a.depth === b.depth ? a.x - b.x : a.depth - b.depth));

  return { nodes, parents: parentMap };
}

interface SkillTreeCanvasProps {
  size?: number;
  className?: string;
  skillsOverride?: SkillNode[];
  readonly?: boolean;
}

const createEdgePath = (
  from: { x: number; y: number },
  to: { x: number; y: number },
) => {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
};

export function SkillTreeCanvas({
  size = 640,
  className,
  skillsOverride,
  readonly = false,
}: SkillTreeCanvasProps) {
  const storeSkills = useSkillStore((state) => state.skills);
  const selectedSkillId = useSkillStore((state) => state.selectedSkillId);
  const selectSkill = useSkillStore((state) => state.selectSkill);
  const skillPositions = useSkillStore((state) => state.skillPositions);
  const setSkillPosition = useSkillStore((state) => state.setSkillPosition);
  const connectSkills = useSkillStore((state) => state.connectSkills);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerCleanupRef = useRef<(() => void) | null>(null);
  const pointerRafRef = useRef<number | null>(null);
  const activeTargetRef = useRef<string | null>(null);
  const [pendingConnection, setPendingConnection] = useState<{
    sourceId: string;
    point: { x: number; y: number };
    hoverTargetId: string | null;
  } | null>(null);

  const displaySkills = skillsOverride ?? storeSkills;
  const isReadonly = readonly || Boolean(skillsOverride);

  const { nodes: positionedSkills } = useMemo(
    () => buildLayout(displaySkills, size),
    [displaySkills, size],
  );

  const nodesWithOverrides = useMemo(() => {
    return positionedSkills.map((skill) => {
      const stored = skillPositions[skill.id];
      if (!stored) {
        return skill;
      }
      return {
        ...skill,
        x: stored.x * size,
        y: stored.y * size,
      };
    });
  }, [positionedSkills, skillPositions, size]);

  const nodeLookup = useMemo(
    () => new Map(nodesWithOverrides.map((skill) => [skill.id, skill])),
    [nodesWithOverrides],
  );

  const resolveConnectorPoint = useCallback(
    (node: PositionedSkill) => {
      const nodeSize = node.id === selectedSkillId ? NODE_SIZE_SELECTED : NODE_SIZE_DEFAULT;
      return {
        x: node.x + nodeSize / 2 - CONNECTOR_RIGHT_OFFSET - CONNECTOR_RADIUS,
        y: node.y + nodeSize / 2 + CONNECTOR_BOTTOM_OFFSET,
      };
    },
    [selectedSkillId],
  );

  const edges = useMemo(() => {
    const seen = new Set<string>();

    return nodesWithOverrides.flatMap((skill) =>
      skill.connections
        .map((connectionId) => {
          const target = nodeLookup.get(connectionId);
          if (!target) return null;
          const key = skill.id < target.id ? `${skill.id}-${target.id}` : `${target.id}-${skill.id}`;
          if (seen.has(key)) return null;
          seen.add(key);
          return { source: skill, target };
        })
        .filter(Boolean) as { source: PositionedSkill; target: PositionedSkill }[],
    );
  }, [nodeLookup, nodesWithOverrides]);

  const stopConnection = useCallback(() => {
    if (pointerCleanupRef.current) {
      pointerCleanupRef.current();
      pointerCleanupRef.current = null;
    }
    if (pointerRafRef.current) {
      cancelAnimationFrame(pointerRafRef.current);
      pointerRafRef.current = null;
    }
    activeTargetRef.current = null;
    setPendingConnection(null);
  }, []);

  const startConnection = useCallback(
    (skillId: string, initialClientX: number, initialClientY: number) => {
      if (isReadonly || !containerRef.current) return;

      if (pointerCleanupRef.current) {
        pointerCleanupRef.current();
        pointerCleanupRef.current = null;
      }
      activeTargetRef.current = null;

      const toPoint = (clientX: number, clientY: number) => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
        return {
          x: clamp(clientX - rect.left, 0, rect.width),
          y: clamp(clientY - rect.top, 0, rect.height),
        };
      };

      const sourceNode = nodeLookup.get(skillId);
      const initialPoint = sourceNode ? resolveConnectorPoint(sourceNode) : toPoint(initialClientX, initialClientY);

      setPendingConnection({
        sourceId: skillId,
        point: initialPoint,
        hoverTargetId: null,
      });

      const updatePointer = (event: PointerEvent) => {
        if (!containerRef.current) return;
        const nextPoint = toPoint(event.clientX, event.clientY);
        if (pointerRafRef.current) {
          cancelAnimationFrame(pointerRafRef.current);
          pointerRafRef.current = null;
        }

        pointerRafRef.current = requestAnimationFrame(() => {
          const nearbyTarget = nodesWithOverrides.find((node) => {
            if (node.id === skillId) return false;
            const anchor = resolveConnectorPoint(node);
            const dx = anchor.x - nextPoint.x;
            const dy = anchor.y - nextPoint.y;
            return Math.hypot(dx, dy) <= CONNECT_TARGET_RADIUS;
          });

          const hoveredId = nearbyTarget?.id ?? null;
          const hoveredAnchor = nearbyTarget ? resolveConnectorPoint(nearbyTarget) : null;
          activeTargetRef.current = hoveredId;

          setPendingConnection((prev) => {
            if (!prev || prev.sourceId !== skillId) return prev;
            return {
              sourceId: prev.sourceId,
              point: hoveredAnchor ?? nextPoint,
              hoverTargetId: hoveredId,
            };
          });

          pointerRafRef.current = null;
        });
      };

      const handleMove = (event: PointerEvent) => {
        updatePointer(event);
      };

      const handleUp = (event: PointerEvent) => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        pointerCleanupRef.current = null;
        if (pointerRafRef.current) {
          cancelAnimationFrame(pointerRafRef.current);
          pointerRafRef.current = null;
        }

        const activeTarget = activeTargetRef.current;

        if (activeTarget && activeTarget !== skillId) {
          connectSkills(skillId, activeTarget);
        }

        setPendingConnection(null);
        activeTargetRef.current = null;
      };

      window.addEventListener("pointermove", handleMove, { passive: true });
      window.addEventListener("pointerup", handleUp, { passive: false });

      pointerCleanupRef.current = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        if (pointerRafRef.current) {
          cancelAnimationFrame(pointerRafRef.current);
          pointerRafRef.current = null;
        }
        activeTargetRef.current = null;
      };
    },
    [connectSkills, isReadonly, nodesWithOverrides, resolveConnectorPoint],
  );

  useEffect(() => () => stopConnection(), [stopConnection]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#08031b]/80 shadow-[0_40px_120px_rgba(5,0,30,0.55)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-[-1px] rounded-[42px] bg-gradient-to-br from-white/4 via-transparent to-white/2 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(126,74,255,0.16),transparent_48%),radial-gradient(circle_at_80%_30%,rgba(93,255,255,0.12),transparent_55%)]" />
        <div className="absolute inset-x-10 inset-y-14 rounded-[28px] border border-white/5" />
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#58F4FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A675FF" stopOpacity="0.7" />
          </linearGradient>
          <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map(({ source, target }) => {
          const start = resolveConnectorPoint(source);
          const end = resolveConnectorPoint(target);
          return (
            <motion.path
              key={`${source.id}-${target.id}`}
              d={createEdgePath(start, end)}
              fill="none"
              stroke="url(#edge-gradient)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "url(#edge-glow)" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          );
        })}
        {pendingConnection ? (() => {
          const source = nodeLookup.get(pendingConnection.sourceId);
          if (!source) return null;
          const start = resolveConnectorPoint(source);
          return (
            <path
              d={createEdgePath(start, pendingConnection.point)}
              fill="none"
              stroke="#6ef6ff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 6"
            />
          );
        })() : null}
      </svg>

      {nodesWithOverrides.map((skill) => {
        const isSelected = skill.id === selectedSkillId;
        const nodeSize = isSelected ? NODE_SIZE_SELECTED : NODE_SIZE_DEFAULT;
        const accentColor = levelAccentColors[skill.level];
        const isPendingSource = pendingConnection?.sourceId === skill.id;
        const isPendingTarget = pendingConnection?.hoverTargetId === skill.id && !isPendingSource;

        const handleNodeClick = () => {
          if (pendingConnection) return;
          if (isReadonly) return;
          selectSkill(skill.id);
        };

        const handleConnectorPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
          if (isReadonly) return;
          event.preventDefault();
          event.stopPropagation();
          startConnection(skill.id, event.clientX, event.clientY);
        };

        return (
          <motion.button
            key={skill.id}
            onClick={handleNodeClick}
            data-skill-node={skill.id}
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between overflow-hidden rounded-[32px] border border-white/8 bg-white/3 text-white shadow-[0_25px_80px_rgba(25,0,80,0.45)] backdrop-blur-xl transition-transform",
              isSelected
                ? "scale-[1.04] ring-2 ring-[#73E0FF]/70 ring-offset-4 ring-offset-[#09031a]"
                : "hover:scale-[1.012]",
              isReadonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
              isPendingSource ? "ring-2 ring-skilltree-accent/80" : null,
              isPendingTarget ? "ring-2 ring-[#6EF6FF]/80" : null,
            )}
            style={{ left: skill.x, top: skill.y, width: nodeSize, height: nodeSize }}
            drag={!isReadonly}
            dragMomentum={false}
            dragElastic={0.05}
            dragConstraints={containerRef}
            whileHover={
              isReadonly
                ? undefined
                : {
                    y: -4,
                    boxShadow: "0 32px 120px rgba(44,0,125,0.55)",
                  }
            }
            whileTap={isReadonly ? undefined : { scale: 0.96 }}
            onDragEnd={(_, info) => {
              if (isReadonly || !containerRef.current) return;
              const containerRect = containerRef.current.getBoundingClientRect();
              const centerX = info.point.x - containerRect.left;
              const centerY = info.point.y - containerRect.top;
              const normalizedX = Math.min(Math.max(centerX / containerRect.width, 0), 1);
              const normalizedY = Math.min(Math.max(centerY / containerRect.height, 0), 1);
              setSkillPosition(skill.id, { x: normalizedX, y: normalizedY });
            }}
          >
            <div
              className={cn(
                "absolute inset-0 -z-10 animate-[pulse_8s_ease-in-out_infinite] bg-gradient-to-br",
                levelCardGradients[skill.level],
              )}
            />
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_70%)]" />
            <div className="absolute -inset-0.5 -z-30 rounded-[inherit] border border-white/8" />
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-6 text-center">
              <span className="text-[32px] drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">{skill.emoji}</span>
              <div className="flex flex-col items-center gap-1">
                <span className="text-base font-semibold tracking-wide text-white/95">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-white/70">
                  <span>{levelLabels[skill.level]}</span>
                  <span className="h-1.5 w-14 overflow-hidden rounded-full bg-white/15">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.round(skill.progress * 100)}%`,
                        background: `linear-gradient(90deg, ${accentColor} 0%, rgba(255,255,255,0.85) 100%)`,
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <motion.span
              className="pointer-events-none absolute inset-[-30%] -z-40 rounded-[inherit] border border-white/10"
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            {!isReadonly ? (
              <div
                role="presentation"
                onPointerDown={handleConnectorPointerDown}
                className={cn(
                  "absolute -bottom-3 right-6 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition",
                  isPendingSource ? "ring-2 ring-skilltree-accent/70" : null,
                  isPendingTarget
                    ? "scale-110 border-white/40 bg-white/60 text-skilltree-night"
                    : "hover:bg-white/20"
                )}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
              </div>
            ) : null}
          </motion.button>
        );
      })}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
          animate={{ opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
