"use client";

import { RefObject, useEffect, useRef } from "react";
import { useWindowSize } from "../hooks/Window";
import { CanvasEngine } from "../lib/canvas-engine";
import Dock from "./Dock";
import { useCanvas } from "../hooks/useCanvas";

interface CanvasPropTypes {
    canvasRef:RefObject<HTMLCanvasElement | null>
    roomId?:string;
    socket?:WebSocket;
}

export default function Canvas({canvasRef,roomId,socket}:CanvasPropTypes){
    const windowSize = useWindowSize();
    const {selectedMode,setCanvasEngine} = useCanvas();
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        if(canvasRef.current && containerRef.current){
            const canvas = canvasRef.current;
            const container = containerRef.current;
            const engine = new CanvasEngine(canvas,roomId,socket);
            setCanvasEngine(engine);

            engine.bindEvents();
            if (container) {
                const { width, height } = container.getBoundingClientRect();
                engine.resizeCanvas(width, height);
            }

            if(socket){
                socket.onmessage = (event) => {
                    engine.getSocketMessage(JSON.parse(event.data));
                }
            }

            return () => {
                engine.unbindEvents();
            }
        }
    },[canvasRef,windowSize,socket,roomId])

    return (
        <div ref={containerRef} className={`min-h-screen bg-[#101011] overflow-hidden min-w-screen ${selectedMode==="grab"?"cursor-grabbing":selectedMode!=="select"?"cursor-crosshair":""}`}>
            <canvas ref={canvasRef} width={windowSize.width} height={windowSize.height} ></canvas>
            <Dock/>
        </div>
    );
}