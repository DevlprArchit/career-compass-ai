"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

/**
 * 1. FADE IN & SLIDE PRIMITIVES
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({
  children,
  delay = 0,
  distance = 18,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -distance }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.06,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 2. INTERACTIVE GLOW CARD WITH CURSOR TRACKING
 * Reacts to mouse coordinates with a smooth radial luminous highlight
 */
export function InteractiveGlowCard({
  children,
  className = "",
  glowColor = "rgba(0, 229, 255, 0.15)",
  borderGlowColor = "rgba(0, 229, 255, 0.4)",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderGlowColor?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl transition-shadow ${className}`}
    >
      {/* Background glow orb following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle border highlight following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-300"
          style={{
            borderColor: "transparent",
            maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            borderImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, ${borderGlowColor}, transparent 80%) 1`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * 3. ANIMATED NUMBER COUNTER (Spring physics)
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const spring = useSpring(0, { mass: 0.6, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `${prefix}${Math.round(current)}${suffix}`);
  const [renderedValue, setRenderedValue] = useState(`${prefix}${value}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setRenderedValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return <motion.span className={className}>{renderedValue}</motion.span>;
}

/**
 * 4. MORPHING PILL TABS
 * Sliding indicator pill with Framer Motion layoutId
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function MorphingPillTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: {
  tabs: TabItem[];
  activeTab: T;
  onTabChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/5 backdrop-blur-md border border-white/60 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as T)}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/80"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-blue-100 text-blue-700" : "bg-slate-200/60 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * 5. LIVE PULSE BEACON
 */
export function LivePulseBeacon({
  color = "emerald",
  label,
}: {
  color?: "emerald" | "cyan" | "amber" | "purple";
  label?: string;
}) {
  const colorMap = {
    emerald: {
      ping: "bg-emerald-400",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    cyan: {
      ping: "bg-cyan-400",
      dot: "bg-cyan-500",
      text: "text-cyan-700",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    amber: {
      ping: "bg-amber-400",
      dot: "bg-amber-500",
      text: "text-amber-700",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    purple: {
      ping: "bg-purple-400",
      dot: "bg-purple-500",
      text: "text-purple-700",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  };

  const c = colorMap[color];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.ping}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
      </span>
      {label && <span>{label}</span>}
    </span>
  );
}
