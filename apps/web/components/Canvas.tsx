"use client";

import { RefObject, useEffect, useState } from "react";
import { useWindowSize } from "../hooks/Window";
import { CanvasEngine } from "../lib/canvas-engine";
import Dock from "./Dock";
import { ModeTypes } from "../types";

interface CanvasPropTypes {
    canvasRef:RefObject<HTMLCanvasElement | null>
    roomId?:string;
    socket?:WebSocket;
}

export default function Canvas({canvasRef,roomId,socket}:CanvasPropTypes){
    const windowSize = useWindowSize();
    const [canvasEngine,setCanvasEngine] = useState<CanvasEngine | null>(null);
    const [selectedMode,setSelectedMode] = useState<ModeTypes>("view");
    
    useEffect(()=>{
        if(canvasRef.current){
            
            const engine = new CanvasEngine(canvasRef.current,roomId,socket);
            setCanvasEngine(engine);

            engine.bindEvents();

            return () => {
                engine.unbindEvents();
            }
        }
    },[canvasRef,windowSize,socket,roomId])

    const changeMode = (m:ModeTypes)=>{
        setSelectedMode(m);
        canvasEngine?.changeSelectedMode(m);
    }

    return (
        <div className={`min-h-screen overflow-hidden min-w-screen ${selectedMode==="grab"?"cursor-grabbing":selectedMode!=="view"?"cursor-crosshair":""}`}>
            <canvas ref={canvasRef} width={windowSize.width} height={windowSize.height} ></canvas>
            <Dock selectedMode={selectedMode} changeMode={changeMode} />
        </div>
    );
}