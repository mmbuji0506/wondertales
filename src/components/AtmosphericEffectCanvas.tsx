import React, { useEffect, useRef } from "react";

interface AtmosphericEffectCanvasProps {
  country: string;
  culture: string;
  storyId: string;
  isActive: boolean;
  isBedtimeMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  type: "petal" | "firefly" | "snowflake" | "bubble" | "stardust" | "ember" | "leaf";
  phase: number;
}

export const AtmosphericEffectCanvas: React.FC<AtmosphericEffectCanvasProps> = ({
  country,
  storyId,
  isActive,
  isBedtimeMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Determine particle theme based on story / country
    let particleCount = 28;
    let particleType: Particle["type"] = "stardust";
    let palette = ["#F59E0B", "#FBBF24", "#FDE68A"];

    if (storyId.includes("momotaro") || country === "Japan") {
      particleType = "petal";
      palette = ["#FBCFE8", "#F472B6", "#FDA4AF", "#FFF1F2"];
      particleCount = 34;
    } else if (storyId.includes("lars") || country === "Norway") {
      particleType = isBedtimeMode ? "stardust" : "snowflake";
      palette = ["#93C5FD", "#A7F3D0", "#E0E7FF", "#FFFFFF"];
      particleCount = 32;
    } else if (storyId.includes("curupira") || country === "Brazil") {
      particleType = "firefly";
      palette = ["#A3E635", "#FACC15", "#4ADE80"];
      particleCount = 26;
    } else if (storyId.includes("moana") || country === "Polynesia") {
      particleType = "bubble";
      palette = ["#38BDF8", "#7DD3FC", "#BAE6FD", "#E0F2FE"];
      particleCount = 24;
    } else if (storyId.includes("finbar") || country === "Ireland") {
      particleType = "leaf";
      palette = ["#86EFAC", "#4ADE80", "#22C55E", "#FCD34D"];
      particleCount = 28;
    } else if (storyId.includes("amira") || country === "Egypt") {
      particleType = "stardust";
      palette = ["#FDE047", "#F59E0B", "#FEF08A", "#D97706"];
      particleCount = 30;
    } else if (storyId.includes("anansi") || country === "Ghana") {
      particleType = "ember";
      palette = ["#F59E0B", "#D97706", "#FCD34D", "#FB923C"];
      particleCount = 26;
    } else if (storyId.includes("colibri") || country === "Peru") {
      particleType = "petal";
      palette = ["#FB7185", "#F43F5E", "#FDE047", "#F472B6"];
      particleCount = 30;
    } else if (storyId.includes("panchatantra") || country === "India") {
      particleType = "petal";
      palette = ["#F472B6", "#FB923C", "#FDE047", "#E879F9"];
      particleCount = 28;
    } else if (storyId.includes("jaguar") || country === "Mexico") {
      particleType = "leaf";
      palette = ["#34D399", "#10B981", "#FBBF24", "#F59E0B"];
      particleCount = 26;
    } else if (storyId.includes("tiddalik") || country === "Australia") {
      particleType = "ember";
      palette = ["#FB923C", "#F59E0B", "#FDE68A", "#38BDF8"];
      particleCount = 25;
    } else if (storyId.includes("ma_liang") || country === "China") {
      particleType = "stardust";
      palette = ["#FDE047", "#34D399", "#F87171", "#FBBF24"];
      particleCount = 32;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7 + (particleType === "petal" ? 0.4 : 0),
        vy:
          particleType === "firefly"
            ? (Math.random() - 0.5) * 0.8
            : particleType === "bubble"
            ? -(0.4 + Math.random() * 0.6)
            : 0.3 + Math.random() * 0.6,
        size:
          particleType === "petal"
            ? 7 + Math.random() * 7
            : particleType === "leaf"
            ? 6 + Math.random() * 6
            : particleType === "bubble"
            ? 4 + Math.random() * 6
            : particleType === "firefly"
            ? 3 + Math.random() * 3
            : 2 + Math.random() * 4,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.25 + Math.random() * 0.55,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        type: particleType,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Natural oscillation
        p.phase += 0.02;
        p.rotation += p.vRot;

        // Gentle breeze motion
        let windX = Math.sin(p.phase) * 0.5;
        let windY = Math.cos(p.phase * 0.8) * 0.2;

        // Mouse gentle push repulsion
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90 && dist > 0) {
            const force = (90 - dist) / 90;
            windX += (dx / dist) * force * 2.5;
            windY += (dy / dist) * force * 2.5;
          }
        }

        p.x += p.vx + windX;
        p.y += p.vy + windY;

        // Wrap around bounds
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
        if (p.y < -30) p.y = height + 20;
        if (p.y > height + 30) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Alpha pulsing for fireflies / stardust
        let drawAlpha = p.alpha;
        if (p.type === "firefly" || p.type === "stardust") {
          drawAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase * 2));
        }

        ctx.globalAlpha = drawAlpha;

        if (p.type === "petal") {
          // Delicate sakura / flower petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();

          // Petal notch
          ctx.beginPath();
          ctx.moveTo(p.size, 0);
          ctx.lineTo(p.size * 0.7, -p.size * 0.2);
          ctx.lineTo(p.size * 0.7, p.size * 0.2);
          ctx.closePath();
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = drawAlpha * 0.4;
          ctx.fill();
        } else if (p.type === "firefly") {
          // Bioluminescent pulsing glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.8);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "leaf") {
          // Clover or eucalyptus leaf
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.quadraticCurveTo(0, -p.size * 0.7, p.size, 0);
          ctx.quadraticCurveTo(0, p.size * 0.7, -p.size, 0);
          ctx.fill();
        } else if (p.type === "bubble") {
          // Translucent ocean bubble with reflection highlight
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.beginPath();
          ctx.arc(-p.size * 0.35, -p.size * 0.35, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "snowflake") {
          // Soft crystalline star
          ctx.fillStyle = p.color;
          for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-p.size, -1, p.size * 2, 2);
          }
        } else {
          // Stardust / Golden Embers
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();

          // 4-point sparkle cross
          ctx.fillRect(-p.size * 1.5, -0.6, p.size * 3, 1.2);
          ctx.fillRect(-0.6, -p.size * 1.5, 1.2, p.size * 3);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, storyId, country, isBedtimeMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full pointer-events-auto z-20 transition-opacity duration-700"
      style={{ opacity: isBedtimeMode ? 0.75 : 0.88 }}
    />
  );
};
