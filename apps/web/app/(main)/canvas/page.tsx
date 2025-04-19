"use client"

import { useRef } from "react";
import Canvas from "../../../components/Canvas";
import { CanvasProvider } from "../../../hooks/useCanvas";

export default function SoloCanvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    return (
        <CanvasProvider>
            <Canvas canvasRef={canvasRef} />
        </CanvasProvider>
    ) 
}