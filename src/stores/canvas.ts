import { create } from "zustand";
import { Prompt } from "@/types/database";

export enum Tool {
  PEN = "pen",
  BRUSH = "brush",
  ERASER = "eraser"
}

interface CanvasStore {
  prompt: Prompt | null;
  setPrompt: (prompt: Prompt | null) => void;
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string | null;
  setColor: (color: string) => void;
  gridColors: string[];
  setGridColors: (gridColors: string[]) => void;
}

export const useCanvasStore = create<CanvasStore>(set => ({
  prompt: null,
  setPrompt: prompt => set({ prompt }),
  tool: Tool.PEN,
  setTool: tool => set({ tool }),
  color: "white",
  setColor: color => set({ color }),
  gridColors: [],
  setGridColors: gridColors => set({ gridColors })
}));
