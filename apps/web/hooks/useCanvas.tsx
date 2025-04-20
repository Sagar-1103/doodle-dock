"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { ModeTypes, PaletteTypes } from "../types";
import { CanvasEngine } from "../lib/canvas-engine";

interface CanvasContextType {
  selectedMode: ModeTypes;
  setSelectedMode: (mode: ModeTypes) => void;
  palette: PaletteTypes;
  setPalette: (pallete: { stroke: string; bg: string | null;radii:number,lineDash:[number,number],fillType:"solid"|"cross"|"hatch"|"grid"|"wave"|"horizontal" }) => void;
  canvasEngine: CanvasEngine | null;
  setCanvasEngine: (c: CanvasEngine) => void;
}

export const CanvasContext = createContext<CanvasContextType>({
  selectedMode: "select",
  setSelectedMode: () => {},
  palette: { stroke: "#05df72", bg: "#ffc9c9",radii:70,lineDash:[0,0],fillType:"wave" },
  setPalette: () => {},
  canvasEngine: null,
  setCanvasEngine: () => {},
});

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMode, setSelectedMode] = useState<ModeTypes>("select");
  const [palette, setPalette] = useState<PaletteTypes>(
    { stroke: "#05df72", bg: "#ffc9c9",radii:70,lineDash:[0,0],fillType:"wave"}
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
