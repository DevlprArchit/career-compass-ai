"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Zap, 
  Sliders, 
  ChevronRight,
  ShieldCheck,
  BrainCircuit,
  Award
} from "lucide-react";
import { PredictiveRadar, RadarMetric } from "./PredictiveRadar";
import { AnimatedCounter, LivePulseBeacon } from "../motion/MotionPrimitives";
import { 
  UiverseGlassButton, 
  UiverseShimmerButton, 
  UiverseGlowBadge 
} from "../ui/UiverseElements";

interface AdaptiveAIGuiderProps {
  readinessScore: number | null;
  selectedTrackTitle: string;
  selectedTrackId: string;
  onNavigateToQuiz?: () => void;
  onNavigateToInterview?: () => void;
  onNavigateToCoding?: () => void;
  className?: string;
}

export function AdaptiveAIGuider({
  readinessScore,
  selectedTrackTitle,
  selectedTrackId,
  onNavigateToQuiz,
  onNavigateToInterview,
  onNavigateToCoding,
  className = "",
}: AdaptiveAIGuiderProps) {
  // Simulated What-If boost offsets
  const [dsaBoost, setDsaBoost] = useState(0);
  const [designBoost, setDesignBoost] = useState(0);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Effective score factoring in candidate diagnostic or default baseline + simulated boost
  const baseScore = readinessScore !== null ? readinessScore : 45;
  const simulatedScore = Math.min(100, Math.round(baseScore + dsaBoost * 0.5 + designBoost * 0.5));

  // Dynamic Offer Probabilities (OPI) calculated in real time
  const offerProbabilities = useMemo(() => {
    const s = simulatedScore;
    return {
      tier1: Math.min(96, Math.max(12, Math.round(s * 0.95 - 8))),
      unicorns: Math.min(98, Math.max(25, Math.round(s * 1.05))),
      startups: Math.min(99, Math.max(40, Math.round(s * 1.1 + 10))),
    };
  }, [simulatedScore]);

  // Projected CTC band
  const projectedCtc = useMemo(() => {
    if (simulatedScore >= 82) return { band: "₹24 - 45 LPA", tier: "Tier-1 / Global Unicorn" };
    if (simulatedScore >= 65) return { band: "₹14 - 24 LPA", tier: "High Growth Product" };
    return { band: "₹7 - 12 LPA", tier: "Fast-Track Tech Associate" };
  }, [simulatedScore]);

  // Dynamic 6-axis Radar metrics
  const radarMetrics: RadarMetric[] = useMemo(() => {
    const s = simulatedScore;
    return [
      { label: "DSA & Logic", value: Math.min(100, Math.round(s * 0.92 + dsaBoost)), benchmark: 85 },
      { label: "System Design", value: Math.min(100, Math.round(s * 0.85 + designBoost)), benchmark: 75 },
      { label: "Core CS (OS/DB)", value: Math.min(100, Math.round(s * 0.88)), benchmark: 80 },
      { label: "Cloud & AWS", value: Math.min(100, Math.round(s * 0.78)), benchmark: 70 },
      { label: "Problem Solving", value: Math.min(100, Math.round(s * 0.94)), benchmark: 88 },
      { label: "Tech Comm", value: Math.min(100, Math.round(s * 0.82)), benchmark: 78 },
    ];
  }, [simulatedScore, dsaBoost, designBoost]);

  // Identify lowest pillar for Next Best Action
  const weakestPillar = useMemo(() => {
    const sorted = [...radarMetrics].sort((a, b) => (a.value - a.benchmark) - (b.value - b.benchmark));
    return sorted[0];
  }, [radarMetrics]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 border-[#1E1B18] bg-[#FAF6EE] p-6 sm:p-8 shadow-overworld text-[#1E1B18] ${className}`}>
      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#1E1B18]/20 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <LivePulseBeacon color={simulatedScore >= 75 ? "emerald" : "cyan"} label="Adaptive AI Guider Active" />
            <UiverseGlowBadge label={selectedTrackTitle} color="cyan" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1E1B18] tracking-tight flex items-center gap-2">
            <span>Predictive Placement Trajectory & Skill Radar</span>
          </h2>
          <p className="text-xs text-[#1E1B18]/70 max-w-xl leading-relaxed">
            Continuously learns from your quiz telemetry, voice mock evaluations, and coding benchmarks to forecast hiring offer probabilities across 50+ tech firms.
          </p>
        </div>

        {/* What-If Simulator Toggle with Overworld Button */}
        <UiverseGlassButton
          onClick={() => setIsSimulatorOpen(!isSimulatorOpen)}
          icon={<Sliders className="w-3.5 h-3.5 text-[#2A6F97]" />}
          className="shrink-0"
        >
          {isSimulatorOpen ? "Close What-If Simulator" : "Simulate Score Growth"}
        </UiverseGlassButton>
      </div>

      {/* Interactive What-If Simulator Drawer */}
      <AnimatePresence>
        {isSimulatorOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b-2 border-[#1E1B18]/20 py-4"
          >
            <div className="bg-[#F2EAD6] rounded-xl p-4.5 border-2 border-[#1E1B18] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-pixel font-bold text-[#1E1B18] uppercase flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>Interactive What-If Growth Simulator</span>
                </span>
                <span className="text-xs font-pixel text-[#2A6F97]">
                  Preview your trajectory before completing milestones
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#1E1B18]/70 font-pixel text-[11px]">DSA & Algorithms Boost:</span>
                    <span className="font-bold text-[#2A6F97]">+{dsaBoost}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={dsaBoost}
                    onChange={(e) => setDsaBoost(parseInt(e.target.value, 10))}
                    className="w-full accent-[#2A6F97] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#1E1B18]/70 font-pixel text-[11px]">System Design Boost:</span>
                    <span className="font-bold text-[#D9822B]">+{designBoost}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={designBoost}
                    onChange={(e) => setDesignBoost(parseInt(e.target.value, 10))}
                    className="w-full accent-[#D9822B] cursor-pointer"
                  />
                </div>
              </div>

              {(dsaBoost > 0 || designBoost > 0) && (
                <div className="flex items-center justify-between pt-2 text-xs font-mono text-[#1E1B18]/70 border-t-2 border-[#1E1B18]/20">
                  <span>
                    Simulated Score: <strong className="text-[#1E1B18] font-bold">{simulatedScore}%</strong> (Base: {baseScore}%)
                  </span>
                  <button
                    onClick={() => { setDsaBoost(0); setDesignBoost(0); }}
                    className="text-xs text-[#2A6F97] font-pixel hover:underline"
                  >
                    Reset Simulation
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid: Radar on Left, OPI & Trajectory on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: 6-Axis Visual Radar */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4.5 rounded-2xl bg-[#F2EAD6] border-2 border-[#1E1B18] shadow-xs">
          <span className="text-[11px] font-pixel uppercase font-bold text-[#1E1B18]/70 mb-2">
            6-Axis Competency Mapping
          </span>
          <PredictiveRadar metrics={radarMetrics} size={270} accentColor="#2D6A4F" />
          <div className="w-full text-center mt-3 pt-3 border-t-2 border-[#1E1B18]/20">
            <span className="text-xs text-[#1E1B18]/70">
              {readinessScore !== null ? "Calibrated against active campus benchmark standards." : "Take 5-min diagnostic to unlock precision calibration."}
            </span>
          </div>
        </div>

        {/* Right Column: Offer Probability Index & Dynamic CTC Forecast */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Offer Probability Index (OPI) Bars */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-pixel font-bold text-[#1E1B18] uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#2A6F97]" />
                <span>Offer Probability Index (OPI)</span>
              </span>
              <span className="text-xs font-pixel text-[#2D6A4F] font-bold">
                Projected Band: {projectedCtc.band}
              </span>
            </div>

            {/* Probability Bar 1: Tier-1 FAANG / Product Giants */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#1E1B18]/80 font-medium">Tier-1 Giants (Google, Amazon, Microsoft)</span>
                <span className="font-mono font-bold text-[#1E1B18]">
                  <AnimatedCounter value={offerProbabilities.tier1} suffix="%" />
                </span>
              </div>
              <div className="w-full bg-[#EAE0CA] h-3 rounded-md overflow-hidden border-2 border-[#1E1B18]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${offerProbabilities.tier1}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#2A6F97]"
                />
              </div>
            </div>

            {/* Probability Bar 2: Unicorns & Scaleups */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#1E1B18]/80 font-medium">Product Unicorns (Swiggy, Razorpay, Postman)</span>
                <span className="font-mono font-bold text-[#1E1B18]">
                  <AnimatedCounter value={offerProbabilities.unicorns} suffix="%" />
                </span>
              </div>
              <div className="w-full bg-[#EAE0CA] h-3 rounded-md overflow-hidden border-2 border-[#1E1B18]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${offerProbabilities.unicorns}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#D9822B]"
                />
              </div>
            </div>

            {/* Probability Bar 3: Fast-Track Startups */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#1E1B18]/80 font-medium">High-Growth Startups (Series A-C)</span>
                <span className="font-mono font-bold text-[#1E1B18]">
                  <AnimatedCounter value={offerProbabilities.startups} suffix="%" />
                </span>
              </div>
              <div className="w-full bg-[#EAE0CA] h-3 rounded-md overflow-hidden border-2 border-[#1E1B18]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${offerProbabilities.startups}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#2D6A4F]"
                />
              </div>
            </div>
          </div>

          {/* Adaptive Next Best Action Recommendation Chip */}
          <div className="p-4 rounded-xl bg-[#F2EAD6] border-2 border-[#1E1B18] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-pixel font-bold text-[#2A6F97] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2A6F97]" />
                <span>AI GUIDER RECOMMENDED ACTION</span>
              </span>
              <span className="text-[11px] font-pixel text-[#1E1B18] bg-[#FAF6EE] px-2.5 py-0.5 rounded-lg border-2 border-[#1E1B18] shadow-xs">
                Weakest: {weakestPillar.label}
              </span>
            </div>
            <p className="text-xs text-[#1E1B18]/80 leading-relaxed">
              Closing your gap in <strong className="text-[#1E1B18]">{weakestPillar.label}</strong> from {weakestPillar.value}% to {weakestPillar.benchmark}% is predicted to raise your Tier-1 offer likelihood by <strong className="text-[#2D6A4F] font-bold font-mono">+8.4%</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <UiverseShimmerButton
                size="sm"
                variant="obsidian"
                onClick={onNavigateToQuiz}
                icon={<ArrowRight className="w-3 h-3" />}
              >
                Diagnostic Check
              </UiverseShimmerButton>
              <UiverseGlassButton
                size="sm"
                onClick={onNavigateToInterview}
              >
                Voice Drill
              </UiverseGlassButton>
              {onNavigateToCoding && (
                <UiverseGlassButton
                  size="sm"
                  onClick={onNavigateToCoding}
                >
                  Solve Drill Challenge
                </UiverseGlassButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
