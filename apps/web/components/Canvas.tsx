"use client";

import { RefObject, useEffect, useRef, useState } from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [palette,setPalette] = useState<{stroke:string,bg:string|null}>({stroke:"#ffffff",bg:"#00000"});
    
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

    const changeMode = (m:ModeTypes)=>{
        setSelectedMode(m);
        canvasEngine?.changeSelectedMode(m);
    }

    const changePalette = ({stroke,bg}:{stroke:string,bg:string|null})=>{
        setPalette({stroke,bg});
        canvasEngine?.changeSelectedPalette({stroke,bg})
    }

    return (
        <div ref={containerRef} className={`min-h-screen bg-[#101011] overflow-hidden min-w-screen ${selectedMode==="grab"?"cursor-grabbing":selectedMode!=="view"?"cursor-crosshair":""}`}>
            <canvas ref={canvasRef} width={windowSize.width} height={windowSize.height} ></canvas>
            <Dock canvasEngine={canvasEngine} palette={palette} changePalette={changePalette} selectedMode={selectedMode} changeMode={changeMode} />
        </div>
    );
}