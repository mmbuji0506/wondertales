import React, { useEffect, useRef, useState } from "react";
import { ChildrenStoryPage } from "../data/childrenStories";
import { playChimeSound, playSparkleSound } from "../services/soundEffects";

interface ColoringStudioModalProps {
  page: ChildrenStoryPage;
  storyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const PALETTE_COLORS = [
  { name: "Sun Yellow", hex: "#FBBF24" },
  { name: "Ruby Red", hex: "#EF4444" },
  { name: "Tangerine", hex: "#F97316" },
  { name: "Forest Jade", hex: "#10B981" },
  { name: "Sky Cyan", hex: "#06B6D4" },
  { name: "Ocean Blue", hex: "#2563EB" },
  { name: "Royal Purple", hex: "#8B5CF6" },
  { name: "Berry Pink", hex: "#EC4899" },
  { name: "Cocoa Brown", hex: "#78350F" },
  { name: "Pure White", hex: "#FFFFFF" },
];

const STICKERS = ["⭐", "🌸", "🦋", "👑", "💖", "🌈", "✨", "🍀"];

export const ColoringStudioModal: React.FC<ColoringStudioModalProps> = ({
  page,
  storyTitle,
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE_COLORS[0].hex);
  const [brushSize, setBrushSize] = useState<number>(6);
  const [toolMode, setToolMode] = useState<"crayon" | "marker" | "sparkles" | "eraser" | "sticker">("crayon");
  const [selectedSticker, setSelectedSticker] = useState<string>("⭐");
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Setup canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset canvas to transparent overlay on top of plate
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [isOpen]);

  if (!isOpen) return null;

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), state]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    playChimeSound(523);
    const prevHistory = [...history];
    const previousState = prevHistory.pop();
    setHistory(prevHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    playChimeSound(440);
    saveHistoryState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Coordinates from Mouse or Touch
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0] || (e as any).changedTouches?.[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const handleStartDraw = (e: React.MouseEvent | React.TouchEvent) => {
    saveHistoryState();
    const { x, y } = getCoordinates(e);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (toolMode === "sticker") {
      playSparkleSound();
      ctx.font = "38px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(selectedSticker, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (toolMode === "sparkles") {
      playSparkleSound();
      drawSparkle(ctx, x, y);
    }
  };

  const handleDrawMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || toolMode === "sticker") return;
    const { x, y } = getCoordinates(e);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (toolMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2.5;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (toolMode === "sparkles") {
      drawSparkle(ctx, x, y);
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = toolMode === "marker" ? brushSize * 2 : brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
  };

  const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = selectedColor;
    const r = Math.random() * 4 + 2;
    ctx.beginPath();
    ctx.arc(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, r, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleDownloadArtwork = () => {
    playSparkleSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `wondertales-color-${storyTitle.toLowerCase().replace(/\s+/g, "-")}-page-${page.pageNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#FFFDF7] rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-[#FBBF24] max-h-[95vh] overflow-y-auto flex flex-col"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎨</span>
            <div>
              <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-[#78350F]">
                Little Artist Studio
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Color, sketch & stamp magical stickers on Plate {page.pageNumber}!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* The Coloring Easel / Stage */}
        <div className="relative w-full rounded-2xl bg-white border-4 border-[#E2C799] shadow-inner overflow-hidden aspect-[4/3] max-h-[460px] flex items-center justify-center">
          {/* Background Story Plate SVG Outline */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none opacity-85 select-none"
            dangerouslySetInnerHTML={{ __html: page.illustrationSvg }}
          />

          {/* Interactive Drawing Canvas Overlay */}
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleStartDraw}
            onMouseMove={handleDrawMove}
            onMouseUp={handleEndDraw}
            onMouseLeave={handleEndDraw}
            onTouchStart={handleStartDraw}
            onTouchMove={handleDrawMove}
            onTouchEnd={handleEndDraw}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          />
        </div>

        {/* Studio Toolbars */}
        <div className="mt-3.5 space-y-3">
          {/* Palette Colors */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {PALETTE_COLORS.map((col) => {
              const isSelected = selectedColor === col.hex && toolMode !== "eraser" && toolMode !== "sticker";
              return (
                <button
                  key={col.hex}
                  onClick={() => {
                    playChimeSound(784);
                    setSelectedColor(col.hex);
                    if (toolMode === "eraser" || toolMode === "sticker") setToolMode("crayon");
                  }}
                  style={{ backgroundColor: col.hex }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-xs border-2 transition-transform cursor-pointer ${
                    isSelected
                      ? "scale-125 border-stone-900 ring-2 ring-amber-400"
                      : "border-white/80 hover:scale-110"
                  }`}
                  title={col.name}
                />
              );
            })}
          </div>

          {/* Tools & Stickers Strip */}
          <div className="flex items-center justify-between gap-2 flex-wrap bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
            {/* Tool Modes */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setToolMode("crayon")}
                className={`px-3 py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  toolMode === "crayon"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white hover:bg-amber-100 text-stone-700"
                }`}
              >
                <span>🖍️</span>
                <span>Crayon</span>
              </button>

              <button
                onClick={() => setToolMode("marker")}
                className={`px-3 py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  toolMode === "marker"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white hover:bg-amber-100 text-stone-700"
                }`}
              >
                <span>🖌️</span>
                <span>Brush</span>
              </button>

              <button
                onClick={() => setToolMode("sparkles")}
                className={`px-3 py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  toolMode === "sparkles"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white hover:bg-amber-100 text-stone-700"
                }`}
              >
                <span>✨</span>
                <span>Sparkles</span>
              </button>

              <button
                onClick={() => setToolMode("eraser")}
                className={`px-3 py-1.5 rounded-xl text-xs font-['Fredoka'] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  toolMode === "eraser"
                    ? "bg-stone-800 text-white shadow-xs"
                    : "bg-white hover:bg-amber-100 text-stone-700"
                }`}
              >
                <span>🧼</span>
                <span>Eraser</span>
              </button>
            </div>

            {/* Sticker Stamps */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-['Fredoka'] font-bold text-amber-900 mr-1 hidden sm:inline">
                Stamps:
              </span>
              {STICKERS.map((stk) => (
                <button
                  key={stk}
                  onClick={() => {
                    playSparkleSound();
                    setSelectedSticker(stk);
                    setToolMode("sticker");
                  }}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-transform cursor-pointer ${
                    toolMode === "sticker" && selectedSticker === stk
                      ? "bg-amber-400 text-white scale-125 shadow-xs"
                      : "bg-white hover:bg-amber-100 text-stone-800"
                  }`}
                  title={`Stamp ${stk}`}
                >
                  {stk}
                </button>
              ))}
            </div>

            {/* Actions: Undo, Clear, Save */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleUndo}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-stone-700 text-xs font-['Fredoka'] font-semibold border border-amber-200 cursor-pointer"
                title="Undo last stroke"
              >
                ↩ Undo
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-red-50 text-red-700 text-xs font-['Fredoka'] font-semibold border border-red-200 cursor-pointer"
                title="Clear all drawings"
              >
                🗑️ Clear
              </button>
              <button
                onClick={handleDownloadArtwork}
                className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-['Fredoka'] font-bold shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>🖼️</span>
                <span>Save Artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
