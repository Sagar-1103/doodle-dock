export type ModeTypes = "select" | "circle" | "rectangle" | "grab" | "pencil" | "eraser" | "image" | "text" | "line";

export type PaletteTypes = { stroke: string; bg: string | null };

interface Stylable {
  stroke: string;
  strokeWidth: number;
  bg: string | null;
}

export interface Rectangle extends Stylable {
  type: ModeTypes;
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export type CanvasObject = Rectangle;
