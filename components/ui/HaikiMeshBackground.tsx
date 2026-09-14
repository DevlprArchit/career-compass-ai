"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface HaikiMeshProps {
  trackId?: string;
  readinessScore?: number | null;
  className?: string;
}

export function HaikiMeshBackground({
  trackId = "fullstack-python",
  readinessScore = null,
  className = "",
}: HaikiMeshProps) {
  // Generate real-time color schemes based on track and student readiness (Lunerise studio lighting)
  const palette = useMemo(() => {
    if (readinessScore !== null && readinessScore >= 80) {
      return {
        orb1: "rgba(16, 185, 129, 0.08)", // Soft Sage
        orb2: "rgba(14, 165, 233, 0.07)", // Soft Sky
        orb3: "rgba(99, 102, 241, 0.06)", // Soft Indigo
        accent: "#10B981",
      };
    }

    switch (trackId) {
      case "ai-ml-engineer":
        return {
          orb1: "rgba(99, 102, 241, 0.08)", // Soft Indigo
          orb2: "rgba(14, 165, 233, 0.07)", // Azure
          orb3: "rgba(168, 85, 247, 0.05)", // Soft Purple
          accent: "#4F46E5",
        };
      case "backend-cloud":
        return {
          orb1: "rgba(245, 158, 11, 0.08)", // Soft AWS Amber
          orb2: "rgba(14, 165, 233, 0.06)", // Sky
          orb3: "rgba(251, 191, 36, 0.05)", // Warm Honey
          accent: "#D97706",
        };
      case "data-scientist":
        return {
          orb1: "rgba(16, 185, 129, 0.08)", // Emerald
          orb2: "rgba(20, 184, 166, 0.06)", // Teal
          orb3: "rgba(59, 130, 246, 0.05)", // Blue
          accent: "#10B981",
        };
      case "fullstack-python":
      default:
        return {
          orb1: "rgba(99, 102, 241, 0.08)", // Indigo
          orb2: "rgba(56, 189, 248, 0.06)", // Sky
          orb3: "rgba(244, 114, 182, 0.05)", // Soft Rose
          accent: "#4F46E5",
        };
    }
  }, [trackId, readinessScore]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Orb 1: Top-Left Floating Aurora */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-3xl opacity-90"
        style={{
          background: `radial-gradient(circle, ${palette.orb1} 0%, transparent 70%)`,
        }}
      />

      {/* Orb 2: Top-Right Gradient Pulse */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full blur-3xl opacity-85"
        style={{
          background: `radial-gradient(circle, ${palette.orb2} 0%, transparent 70%)`,
        }}
      />

      {/* Orb 3: Bottom Center Deep Resonance */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 25, 0],
          scale: [0.95, 1.05, 1, 0.95],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] rounded-full blur-3xl opacity-70"
        style={{
          background: `radial-gradient(circle, ${palette.orb3} 0%, transparent 75%)`,
        }}
      />

      {/* Subtle architectural paper micro-dot grid for tactile depth */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
