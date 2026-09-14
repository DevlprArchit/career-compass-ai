"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// =========================================================================
// 1. OVERWORLD TACTILE ACTION PILL BUTTON
// (16-bit Tactile Button with Pixel Inset Action Disk)
// =========================================================================
interface UiverseShimmerButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "cyan" | "purple" | "gold" | "emerald" | "obsidian" | "white";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function UiverseShimmerButton({
  children,
  onClick,
  className = "",
  variant = "obsidian",
  size = "md",
  icon,
  disabled = false,
  type = "button",
}: UiverseShimmerButtonProps) {
  const sizeClasses = {
    sm: "text-xs pl-3.5 pr-1.5 py-1.5 min-h-[36px]",
    md: "text-xs sm:text-sm pl-4 pr-2 py-2 min-h-[42px]",
    lg: "text-sm sm:text-base pl-5 pr-2.5 py-2.5 min-h-[48px] font-semibold",
  }[size];

  const diskSizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-7 h-7 text-xs",
    lg: "w-8 h-8 text-sm",
  }[size];

  // Overworld Palette Colors
  const themeClasses = {
    obsidian: {
      btn: "bg-[#1E1B18] hover:bg-[#2D2A26] text-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#D9822B] text-[#1E1B18] border-2 border-[#1E1B18]",
    },
    cyan: {
      btn: "bg-[#2A6F97] hover:bg-[#205372] text-white border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#FAF6EE] text-[#2A6F97] border-2 border-[#1E1B18]",
    },
    purple: {
      btn: "bg-[#5E503F] hover:bg-[#493E31] text-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#D9822B] text-[#1E1B18] border-2 border-[#1E1B18]",
    },
    gold: {
      btn: "bg-[#D9822B] hover:bg-[#c47322] text-[#1E1B18] border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#FAF6EE] text-[#1E1B18] border-2 border-[#1E1B18]",
    },
    emerald: {
      btn: "bg-[#2D6A4F] hover:bg-[#255740] text-white border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#FAF6EE] text-[#2D6A4F] border-2 border-[#1E1B18]",
    },
    white: {
      btn: "bg-[#FAF6EE] hover:bg-[#EAE0CA] text-[#1E1B18] border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
      disk: "bg-[#1E1B18] text-[#FAF6EE] border-2 border-[#1E1B18]",
    },
  }[variant] || {
    btn: "bg-[#1E1B18] hover:bg-[#2D2A26] text-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld active:translate-x-[2px] active:translate-y-[2px] active:shadow-xs",
    disk: "bg-[#D9822B] text-[#1E1B18] border-2 border-[#1E1B18]",
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-between rounded-xl font-pixel transition-all duration-150 cursor-pointer select-none ${
        themeClasses.btn
      } ${sizeClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <span className="pr-2 truncate">{children}</span>
      <span
        className={`rounded-lg flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
          themeClasses.disk
        } ${diskSizeClasses}`}
      >
        {icon || <ArrowUpRight className="w-3.5 h-3.5" />}
      </span>
    </motion.button>
  );
}

// Alias for semantic clarity
export const LunerisePillButton = UiverseShimmerButton;

// =========================================================================
// 2. OVERWORLD TACTILE BUTTON
// =========================================================================
interface UiverseGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md";
  disabled?: boolean;
}

export function UiverseGlassButton({
  children,
  onClick,
  className = "",
  icon,
  size = "md",
  disabled = false,
}: UiverseGlassButtonProps) {
  const sizeClasses = size === "sm" ? "text-xs px-4 py-2" : "text-xs sm:text-sm px-5 py-2.5";

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center space-x-2 rounded-xl bg-[#FAF6EE] hover:bg-[#EAE0CA] text-[#1E1B18] border-2 border-[#1E1B18] shadow-overworld font-pixel select-none ${sizeClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </motion.button>
  );
}

// Alias for semantic clarity
export const LuneriseGlassButton = UiverseGlassButton;

// =========================================================================
// 3. OVERWORLD TACTILE CARD
// (Chunky 2px Borders, Warm Parchment Surface, 16-bit Drop Shadow)
// =========================================================================
interface UiverseCyberCardProps {
  children: ReactNode;
  className?: string;
  cornerTicks?: boolean;
  glowColor?: "cyan" | "purple" | "gold" | "emerald";
  onClick?: () => void;
}

export function UiverseCyberCard({
  children,
  className = "",
  cornerTicks = false,
  glowColor = "cyan",
  onClick,
}: UiverseCyberCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld hover:shadow-overworld-lg transition-all duration-150 text-[#1E1B18] ${className}`}
    >
      {children}
    </div>
  );
}

// Alias for semantic clarity
export const LuneriseCard = UiverseCyberCard;

// =========================================================================
// 4. OVERWORLD RETRO STATUS BADGE
// (Chunky 2px Border with Animated Pixel Beacon)
// =========================================================================
interface UiverseGlowBadgeProps {
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  color?: "cyan" | "purple" | "amber" | "emerald";
  pulsing?: boolean;
  className?: string;
}

export function UiverseGlowBadge({
  label,
  sublabel,
  icon,
  color = "cyan",
  pulsing = true,
  className = "",
}: UiverseGlowBadgeProps) {
  const colorMap = {
    cyan: {
      bg: "bg-[#FAF6EE]",
      border: "border-2 border-[#2A6F97]",
      text: "text-[#2A6F97]",
      dot: "bg-[#2A6F97]",
      ping: "bg-[#2A6F97]",
    },
    purple: {
      bg: "bg-[#FAF6EE]",
      border: "border-2 border-[#5E503F]",
      text: "text-[#5E503F]",
      dot: "bg-[#5E503F]",
      ping: "bg-[#5E503F]",
    },
    amber: {
      bg: "bg-[#FAF6EE]",
      border: "border-2 border-[#D9822B]",
      text: "text-[#D9822B]",
      dot: "bg-[#D9822B]",
      ping: "bg-[#D9822B]",
    },
    emerald: {
      bg: "bg-[#FAF6EE]",
      border: "border-2 border-[#2D6A4F]",
      text: "text-[#2D6A4F]",
      dot: "bg-[#2D6A4F]",
      ping: "bg-[#2D6A4F]",
    },
  }[color];

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg ${colorMap.border} ${colorMap.bg} shadow-xs ${className}`}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorMap.ping} opacity-75`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${colorMap.dot}`} />
        </span>
      )}
      {icon && <span className={colorMap.text}>{icon}</span>}
      <span className={`text-xs font-pixel tracking-tight ${colorMap.text}`}>
        {label}
      </span>
      {sublabel && (
        <>
          <span className="text-[#1E1B18]/40 text-[10px]">•</span>
          <span className="font-mono text-[10px] font-bold text-[#1E1B18]/70 uppercase tracking-wider">
            {sublabel}
          </span>
        </>
      )}
    </div>
  );
}

// Alias for semantic clarity
export const LuneriseStatusBadge = UiverseGlowBadge;

// =========================================================================
// 5. OVERWORLD RETRO STAT TILE
// (Warm Parchment Telemetry Display)
// =========================================================================
interface UiverseStatTileProps {
  value: string | number;
  label: string;
  sublabel?: string;
  accentColor?: "cyan" | "purple" | "gold" | "emerald";
}

export function UiverseStatTile({
  value,
  label,
  sublabel,
}: UiverseStatTileProps) {
  return (
    <div
      className="relative p-5 rounded-2xl bg-[#FAF6EE] border-2 border-[#1E1B18] shadow-overworld hover:shadow-overworld-lg transition-all duration-150 group text-left"
    >
      <div className="space-y-1">
        <span className="font-display font-extrabold text-2xl md:text-3xl text-[#1E1B18] block tracking-tight group-hover:text-[#D9822B] transition-colors">
          {value}
        </span>
        <span className="text-xs text-[#1E1B18] font-pixel block">{label}</span>
        {sublabel && <span className="text-[11px] text-[#1E1B18]/60 font-mono block">{sublabel}</span>}
      </div>
    </div>
  );
}

// Alias for semantic clarity
export const LuneriseStatTile = UiverseStatTile;

