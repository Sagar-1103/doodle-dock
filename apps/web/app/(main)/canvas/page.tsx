"use client"

import { useRef } from "react";
import Canvas from "../../../components/Canvas";

export default function SoloCanvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    return <Canvas canvasRef={canvasRef} /> 
}