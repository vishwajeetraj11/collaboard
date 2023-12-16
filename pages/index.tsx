import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useDraw } from "@/common/hooks/useDraw";
import { socket } from "@/common/lib/socket";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [options, setOptions] = useState<CtxOptions>({
    lineColor: "#000",
    lineWidth: 5,
  });

  const { drawing, handleDraw, handleEndDrawing, handleStartDrawing } = useDraw(
    options,
    ctxRef.current
  );

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctxRef.current = ctx;
    }
  }, [options.lineColor, options.lineWidth]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        onClick={() =>
          setOptions({
            lineColor: "blue",
            lineWidth: 5,
          })
        }
        className="absolute bg-black"
      >
        Blue
      </button>
      <canvas
        onMouseDown={(e) => {
          handleStartDrawing(e.clientX, e.clientY);
        }}
        onMouseUp={handleEndDrawing}
        onMouseMove={(e) => {
          handleDraw(e.clientX, e.clientY);
        }}
        onTouchStart={(e) =>
          handleStartDrawing(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          )
        }
        ref={canvasRef}
        className="h-full w-full"
        onTouchEnd={handleEndDrawing}
        onTouchMove={(e) =>
          handleDraw(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
        }
        height={size.height}
        width={size.width}
      />
    </div>
  );
}
