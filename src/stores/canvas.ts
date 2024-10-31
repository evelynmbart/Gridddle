import { create } from "zustand";
import { COLORS } from "../constants/colors";

export enum Tool {
  PEN = "pen",
  BRUSH = "brush",
  ERASER = "eraser"
}

interface CanvasStore {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string | null;
  setColor: (color: string) => void;
  gridColors: string[];
  setGridColors: (gridColors: string[]) => void;
}

export const useCanvasStore = create<CanvasStore>(set => ({
  tool: Tool.PEN,
  setTool: tool => set({ tool }),
  color: COLORS[0],
  setColor: color => set({ color }),
  gridColors: [],
  setGridColors: gridColors => set({ gridColors })
}));
