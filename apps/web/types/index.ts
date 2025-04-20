export type ModeTypes = "select" | "circle" | "rectangle" | "grab" | "pencil" | "eraser" | "image" | "text" | "line";

export type PaletteTypes = { stroke: string; bg: string | null,radii:number,lineDash:[number,number] };

export interface Rectangle {
  type: ModeTypes;
  startX: number;
  startY: number;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  bg: string | null;
  radii:number;
  lineDash:[number,number];
}

export type CanvasObject = Rectangle;
