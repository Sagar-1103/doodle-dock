"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { ModeTypes, PaletteTypes } from "../types";
import { CanvasEngine } from "../lib/canvas-engine";

interface CanvasContextType {
  selectedMode: ModeTypes;
  setSelectedMode: (mode: ModeTypes) => void;
  palette: PaletteTypes;
  setPalette: (pallete: { stroke: string; bg: string | null;radii:number,lineDash:[number,number] }) => void;
  canvasEngine: CanvasEngine | null;
  setCanvasEngine: (c: CanvasEngine) => void;
}

export const CanvasContext = createContext<CanvasContextType>({
  selectedMode: "select",
  setSelectedMode: () => {},
  palette: { stroke: "#ffffff", bg: null,radii:70,lineDash:[0,0] },
  setPalette: () => {},
  canvasEngine: null,
  setCanvasEngine: () => {},
});

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMode, setSelectedMode] = useState<ModeTypes>("select");
  const [palette, setPalette] = useState<PaletteTypes>(
    { stroke: "#ffffff", bg: null,radii:70,lineDash:[0,0] }
  );
  const [canvasEngine, setCanvasEngine] = useState<CanvasEngine | null>(null);

  return (
    <CanvasContext.Provider
      value={{
        selectedMode,
        setSelectedMode,
        palette,
        setPalette,
        canvasEngine,
        setCanvasEngine,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
