"use client";

import { motion } from "framer-motion";

export type SkillNodeState = "mastered" | "in-progress" | "locked" | "start" | "boss";

export type SkillTreeNode = {
  id: string;
  label: string;
  level?: string; // "I" | "II" ... | "★"
  state: SkillNodeState;
  x: number; // 0-640 viewBox coords
  y: number; // 0-250 viewBox coords
  hint?: string; // ej "en curso ›"
};

export type SkillTreeEdge = {
  from: string;
  to: string;
  /** "solid" entre dominados, "active" hacia el nodo en progreso, "locked" hacia bloqueados */
  kind: "solid" | "active" | "locked";
};

type SkillTreeProps = {
  nodes: SkillTreeNode[];
  edges: SkillTreeEdge[];
  onNodeClick?: (id: string) => void;
};

const COLORS = {
  mastered: "hsl(142 69% 58%)",
  "in-progress": "hsl(258 90% 66%)",
  start: "hsl(142 69% 58%)",
  boss: "hsl(38 92% 50%)",
  locked: "hsl(222 9% 41%)",
} as const;

function edgeStroke(kind: SkillTreeEdge["kind"]) {
  if (kind === "solid") return { stroke: "hsl(142 69% 58%)", opacity: 0.5, dash: "" };
  if (kind === "active") return { stroke: "hsl(258 90% 66%)", opacity: 0.5, dash: "4 3" };
  return { stroke: "hsl(222 15% 20%)", opacity: 1, dash: "3 3" };
}

export function SkillTree({ nodes, edges, onNodeClick }: SkillTreeProps) {
  const byId = (id: string) => nodes.find((n) => n.id === id);
  const handleNodeKeyDown = (event: React.KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onNodeClick?.(id);
  };

  return (
    <svg
      viewBox="0 0 640 250"
      className="block h-[250px] w-full"
      role="img"
      aria-label="Mapa de habilidades"
    >
      <defs>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {edges.map((e, i) => {
        const a = byId(e.from);
        const b = byId(e.to);
        if (!a || !b) return null;
        const s = edgeStroke(e.kind);
        return (
          <line
            key={`${e.from}-${e.to}-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={s.stroke}
            strokeWidth={1.5}
            strokeOpacity={s.opacity}
            strokeDasharray={s.dash}
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n) => {
        const color = COLORS[n.state];
        const isBoss = n.state === "boss";
        const isLocked = n.state === "locked";
        const isActive = n.state === "in-progress";
        const r = n.state === "start" ? 13 : isActive ? 10 : 9;

        if (isBoss) {
          return (
            <g
              key={n.id}
              className="cursor-pointer"
              onClick={() => onNodeClick?.(n.id)}
              onKeyDown={(event) => handleNodeKeyDown(event, n.id)}
              tabIndex={0}
            >
              <rect
                x={n.x - 25}
                y={n.y - 14}
                width={50}
                height={28}
                rx={6}
                fill="none"
                stroke={color}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fill={color}
                fontSize={9}
                fontWeight={700}
              >
                JEFE
              </text>
              <text x={n.x} y={n.y + 30} textAnchor="middle" fill={color} fontSize={10}>
                {n.label}
              </text>
            </g>
          );
        }

        return (
          <g
            key={n.id}
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => onNodeClick?.(n.id)}
            onKeyDown={(event) => handleNodeKeyDown(event, n.id)}
            tabIndex={0}
          >
            {/* halo */}
            {!isLocked && <circle cx={n.x} cy={n.y} r={r + 6} fill={color} fillOpacity={0.15} />}

            {/* pulse ring solo para el nodo activo */}
            {isActive && (
              <circle
                cx={n.x}
                cy={n.y}
                r={r + 4}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeOpacity={0.5}
              >
                <animate
                  attributeName="r"
                  values={`${r + 4};${r + 14};${r + 4}`}
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;0;0.5"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* core */}
            {isLocked ? (
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth={1.2}
                strokeDasharray="2 2"
              />
            ) : (
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill={color}
                filter={isActive ? "url(#node-glow)" : undefined}
              />
            )}

            {/* level label inside */}
            {n.level && !isLocked && (
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize={n.state === "start" ? 11 : 9}
                fontWeight={700}
                fill={isActive ? "white" : "hsl(222 24% 4%)"}
              >
                {n.level}
              </text>
            )}
            {isLocked && (
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={9} fill={color}>
                ?
              </text>
            )}

            {/* label below */}
            <text
              x={n.x}
              y={n.y + r + 17}
              textAnchor="middle"
              fontSize={10}
              fontWeight={isActive ? 500 : 400}
              fill={
                isActive ? "hsl(258 90% 80%)" : isLocked ? "hsl(222 9% 41%)" : "hsl(220 16% 96%)"
              }
            >
              {n.label}
            </text>

            {/* hint (ej: "en curso ›") */}
            {n.hint && (
              <text
                x={n.x}
                y={n.y + r + 29}
                textAnchor="middle"
                fontSize={8}
                fill="hsl(258 70% 72%)"
              >
                {n.hint}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function SkillTreeLegend() {
  const items = [
    { color: "hsl(142 69% 58%)", label: "Dominado", dashed: false, box: false },
    { color: "hsl(258 90% 66%)", label: "En progreso", dashed: false, box: false },
    { color: "hsl(222 9% 41%)", label: "Bloqueado", dashed: true, box: false },
    { color: "hsl(38 92% 50%)", label: "Caso final", dashed: true, box: true },
  ];
  return (
    <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          {it.box ? (
            <span
              className="inline-block h-2.5 w-3.5 rounded-sm border border-dashed"
              style={{ borderColor: it.color }}
            />
          ) : (
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={it.dashed ? { border: `1px dashed ${it.color}` } : { background: it.color }}
            />
          )}
          {it.label}
        </span>
      ))}
    </div>
  );
}
