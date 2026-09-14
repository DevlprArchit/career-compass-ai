"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export interface RadarMetric {
  label: string;
  value: number; // 0 - 100
  benchmark: number; // 0 - 100
}

interface PredictiveRadarProps {
  metrics: RadarMetric[];
  size?: number;
  className?: string;
  accentColor?: string;
}

export function PredictiveRadar({
  metrics,
  size = 280,
  className = "",
  accentColor = "#00E5FF",
}: PredictiveRadarProps) {
  const center = size / 2;
  const radius = (size - 60) / 2;
  const totalSides = metrics.length;
  const angleStep = (Math.PI * 2) / totalSides;

  // Concentric polygon background levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to get coordinates on the radar grid
  const getCoordinates = (index: number, normalizedValue: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * normalizedValue;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build candidate polygon SVG path
  const candidatePolygonPoints = useMemo(() => {
    return metrics
      .map((m, i) => {
        const { x, y } = getCoordinates(i, Math.max(10, Math.min(100, m.value)) / 100);
        return `${x},${y}`;
      })
      .join(" ");
  }, [metrics, radius, center]);

  // Build target benchmark polygon SVG path
  const benchmarkPolygonPoints = useMemo(() => {
    return metrics
      .map((m, i) => {
        const { x, y } = getCoordinates(i, Math.max(10, Math.min(100, m.benchmark)) / 100);
        return `${x},${y}`;
      })
      .join(" ");
  }, [metrics, radius, center]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Concentric Webs */}
        {levels.map((level, levelIdx) => {
          const points = metrics
            .map((_, i) => {
              const { x, y } = getCoordinates(i, level);
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polygon
              key={levelIdx}
              points={points}
              fill={levelIdx === levels.length - 1 ? "rgba(15, 23, 42, 0.02)" : "none"}
              stroke="rgba(15, 23, 42, 0.10)"
              strokeWidth="1"
              strokeDasharray={levelIdx % 2 === 1 ? "3 3" : undefined}
            />
          );
        })}

        {/* Radial Axis Spokes */}
        {metrics.map((_, i) => {
          const { x, y } = getCoordinates(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(15, 23, 42, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Standard Polygon (Subtle Dotted) */}
        <polygon
          points={benchmarkPolygonPoints}
          fill="rgba(100, 116, 139, 0.04)"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Candidate Interactive Polygon (Clean vibrant stroke with spring) */}
        <motion.polygon
          initial={false}
          animate={{ points: candidatePolygonPoints }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          fill={accentColor}
          fillOpacity="0.18"
          stroke={accentColor}
          strokeWidth="2.5"
          className="filter drop-shadow-[0_2px_8px_rgba(79,70,229,0.2)]"
        />

        {/* Candidate Vertex Nodes */}
        {metrics.map((m, i) => {
          const { x, y } = getCoordinates(i, Math.max(10, Math.min(100, m.value)) / 100);
          return (
            <motion.circle
              key={i}
              initial={false}
              animate={{ cx: x, cy: y }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              r="4"
              fill="#FFFFFF"
              stroke={accentColor}
              strokeWidth="2.5"
              className="cursor-pointer"
            >
              <title>{`${m.label}: ${m.value}% (Target: ${m.benchmark}%)`}</title>
            </motion.circle>
          );
        })}

        {/* Metric Outer Labels */}
        {metrics.map((m, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);

          // Alignment adjustments based on angle position
          const textAnchor =
            Math.abs(Math.cos(angle)) < 0.2 ? "middle" : Math.cos(angle) > 0 ? "start" : "end";

          return (
            <g key={i}>
              <text
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="text-[10px] font-mono font-semibold fill-slate-700"
              >
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ backgroundColor: accentColor }} />
          <span className="text-slate-800 font-semibold">Your Skills</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-b border-dashed border-slate-400 inline-block" />
          <span>Tier-1 Standard</span>
        </span>
      </div>
    </div>
  );
}
