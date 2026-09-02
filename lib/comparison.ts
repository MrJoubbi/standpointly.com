import { cellFor } from "@/lib/scoring";
import type { Cell, TestConfig } from "@/lib/types";

export interface StandpointComparison {
  point1: { x: number; y: number; cell: Cell; label: string };
  point2: { x: number; y: number; cell: Cell; label: string };
  distance: number;
  alignmentScore: number; // 0 to 100%
  xDelta: number;
  yDelta: number;
  verdict: string;
  summary: string;
  xAnalysis: string;
  yAnalysis: string;
}

export function compareStandpoints(
  p1: { x: number; y: number; label?: string },
  p2: { x: number; y: number; label?: string },
  config: TestConfig
): StandpointComparison {
  const cell1 = cellFor(p1.x, p1.y, config);
  const cell2 = cellFor(p2.x, p2.y, config);

  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Maximum possible distance across [-1, 1] x [-1, 1] is sqrt(4 + 4) = 2.8284
  const maxDist = 2.8284;
  const alignmentScore = Math.max(0, Math.min(100, Math.round((1 - dist / maxDist) * 100)));

  let verdict = "Complementary Standpoints";
  let summary = "";

  if (dist < 0.4) {
    verdict = "Harmonious Alignment";
    summary = "You and your counterpart share an exceptionally aligned perspective. Your core assumptions and instinctive reactions closely mirror each other.";
  } else if (dist < 0.85) {
    if (dx < 0.4) {
      verdict = `Shared ${config.axes.x.id.toUpperCase()} Instincts`;
      summary = `You share very similar views along the ${config.axes.x.id} plane, while offering healthy nuance and diverse approaches on the ${config.axes.y.id} plane.`;
    } else if (dy < 0.4) {
      verdict = `Shared ${config.axes.y.id.toUpperCase()} Instincts`;
      summary = `You share a consistent orientation along the ${config.axes.y.id} plane, while bringing distinct, complementary principles to the ${config.axes.x.id} plane.`;
    } else {
      verdict = "Balanced Perspective";
      summary = "You share enough common ground to understand each other intuitively, while maintaining distinct viewpoints that challenge each other productively.";
    }
  } else {
    verdict = "Creative Counterweights";
    summary = "You hold contrasting philosophical standpoints. Where one prioritizes stability or market dynamics, the other acts as a counterbalance, creating rich opportunities for deep dialogue.";
  }

  // Axis specific breakdowns
  const xAnalysis = dx < 0.4
    ? `Strong agreement on the ${config.axes.x.id} axis (difference: ${(dx * 10).toFixed(1)} pts).`
    : `Divergent approaches on the ${config.axes.x.id} axis (difference: ${(dx * 10).toFixed(1)} pts).`;

  const yAnalysis = dy < 0.4
    ? `Strong agreement on the ${config.axes.y.id} axis (difference: ${(dy * 10).toFixed(1)} pts).`
    : `Divergent approaches on the ${config.axes.y.id} axis (difference: ${(dy * 10).toFixed(1)} pts).`;

  return {
    point1: { ...p1, cell: cell1, label: p1.label || "You" },
    point2: { ...p2, cell: cell2, label: p2.label || "Friend" },
    distance: dist,
    alignmentScore,
    xDelta: dx,
    yDelta: dy,
    verdict,
    summary,
    xAnalysis,
    yAnalysis,
  };
}
