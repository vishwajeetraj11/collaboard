import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useDraw } from "@/common/hooks/useDraw";
import { socket } from "@/common/lib/socket";
import Canvas from "@/modules/room/components/Canvas";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Canvas />;
}
