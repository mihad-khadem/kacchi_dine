"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useMemo } from "react"
import { useTheme } from "next-themes"

type Props = {
  text?: string
  scanDuration?: number
  chromaJitter?: number
}

export function HologramText({
  text = "SPECTRUM UI",
  scanDuration = 1800,
  chromaJitter = 0.8
}: Props) {
  const chars = useMemo(() => text.split(""), [text])
  const { theme } = useTheme()

  // Choose base and glow colors depending on mode
  const baseColor = theme === "dark" ? "#eee" : "#111"
  const glowLight = theme === "dark"
    ? "rgba(255,255,255,0.4)"
    : "rgba(0,0,0,0.25)"
  const glowHeavy = theme === "dark"
    ? "rgba(255,255,255,0.2)"
    : "rgba(0,0,0,0.15)"

  return (
    <motion.div
      className="relative"
      aria-label={text}
      role="img"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex select-none items-center justify-center gap-[0.04em] font-bold tracking-tight text-[clamp(32px,6vw,72px)]">
        {chars.map((c, i) => (
          <span key={i} className="relative inline-block">
            <span
              className="layer base"
              style={
                {
                  "--i": i,
                  "--scanMs": `${scanDuration}ms`,
                  "--baseColor": baseColor,
                  "--glowLight": glowLight,
                  "--glowHeavy": glowHeavy
                } as React.CSSProperties
              }
            >
              {c === " " ? "\u00A0" : c}
            </span>

            <span
              className="layer red"
              style={
                {
                  "--i": i,
                  "--jit": chromaJitter,
                  "--scanMs": `${scanDuration}ms`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              {c === " " ? "\u00A0" : c}
            </span>
            <span
              className="layer cyan"
              style={
                {
                  "--i": i,
                  "--jit": chromaJitter,
                  "--scanMs": `${scanDuration}ms`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              {c === " " ? "\u00A0" : c}
            </span>

            <span
              className="layer scanline"
              style={
                {
                  "--i": i,
                  "--scanMs": `${scanDuration}ms`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              {c === " " ? "\u00A0" : c}
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .layer {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform, filter, opacity, clip-path;
        }
        .base {
          position: relative;
          color: var(--baseColor);
          display: inline-block;
          animation: scan var(--scanMs) calc(var(--i) * 45ms) ease-out both,
                     flicker var(--scanMs) calc(var(--i) * 45ms) steps(1) infinite;
          text-shadow: 0 0 8px var(--glowLight), 0 0 16px var(--glowHeavy);
        }

        .red, .cyan {
          display: inline-block;
          color: transparent;
          mix-blend-mode: screen;
          opacity: 0;
          animation:
            chroma var(--scanMs) calc(var(--i) * 45ms) ease-out both,
            jitter calc(var(--scanMs) * 0.8) calc(var(--i) * 45ms) ease-out both;
        }
        .red { text-shadow: 0 0 0 rgba(255, 60, 60, 0.95); }
        .cyan { text-shadow: 0 0 0 rgba(60, 255, 255, 0.95); }

        .scanline {
          display: inline-block;
          color: transparent;
          background: linear-gradient(rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
          background-size: 100% 4px;
          animation: scanline-anim var(--scanMs) calc(var(--i) * 45ms) ease-out both;
          mix-blend-mode: overlay;
          opacity: 0;
        }

        @keyframes scan {
          0% {
            color: transparent;
            -webkit-mask-image: linear-gradient(90deg, transparent 40%, #000 50%, transparent 60%);
            mask-image: linear-gradient(90deg, transparent 40%, #000 50%, transparent 60%);
            -webkit-mask-size: 200% 100%;
            mask-size: 200% 100%;
            -webkit-mask-position: -100% 0;
            mask-position: -100% 0;
            letter-spacing: 0.04em;
            filter: contrast(1) brightness(0.5);
            transform: translateY(-4px);
          }
          60% {
            color: var(--baseColor);
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
            letter-spacing: 0.005em;
            filter: contrast(1.2) brightness(1.1);
            transform: translateY(0);
          }
          100% {
            color: var(--baseColor);
            -webkit-mask-image: none;
            mask-image: none;
            letter-spacing: 0;
            filter: none;
            transform: translateY(0);
          }
        }
        @keyframes chroma {
          0% { opacity: 0; }
          30% { opacity: 0.8; }
          60% { opacity: 0.45; }
          100% { opacity: 0; }
        }
        @keyframes jitter {
          0% {
            transform: translate(
              calc((var(--jit) * 1px) * (cos(var(--i)))),
              calc((var(--jit) * 1px) * (sin(var(--i))))
            );
            filter: blur(0.5px);
          }
          50% {
            transform: translate(
              calc((var(--jit) * 4px) * (cos(var(--i) * 3.1))),
              calc((var(--jit) * 3px) * (sin(var(--i) * 2.6)))
            );
            filter: blur(1.2px);
          }
          100% {
            transform: translate(0,0);
            filter: blur(0);
          }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          2% { opacity: 0.9; }
          4% { opacity: 1; }
          6% { opacity: 0.95; }
          8% { opacity: 1; }
          10% { opacity: 0.9; }
          12% { opacity: 1; }
          14% { opacity: 0.92; }
          16% { opacity: 1; }
          18% { opacity: 0.98; }
          20% { opacity: 1; }
          22% { opacity: 0.9; }
          24% { opacity: 1; }
          26% { opacity: 0.95; }
          28% { opacity: 1; }
          30% { opacity: 0.9; }
          32% { opacity: 1; }
          34% { opacity: 0.92; }
          36% { opacity: 1; }
          38% { opacity: 0.98; }
          40% { opacity: 1; }
          42% { opacity: 0.9; }
          44% { opacity: 1; }
          46% { opacity: 0.95; }
          48% { opacity: 1; }
          50% { opacity: 0.9; }
          52% { opacity: 1; }
          54% { opacity: 0.92; }
          56% { opacity: 1; }
          58% { opacity: 0.98; }
          60% { opacity: 1; }
          62% { opacity: 0.9; }
          64% { opacity: 1; }
          66% { opacity: 0.95; }
          68% { opacity: 1; }
          70% { opacity: 0.9; }
          72% { opacity: 1; }
          74% { opacity: 0.92; }
          76% { opacity: 1; }
          78% { opacity: 0.98; }
          80% { opacity: 1; }
          82% { opacity: 0.9; }
          84% { opacity: 1; }
          86% { opacity: 0.95; }
          88% { opacity: 1; }
          90% { opacity: 0.9; }
          92% { opacity: 1; }
          94% { opacity: 0.92; }
          96% { opacity: 1; }
          98% { opacity: 0.98; }
        }
        @keyframes scanline-anim {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          60% {
            transform: translateY(100%);
            opacity: 0.3;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  )
}
