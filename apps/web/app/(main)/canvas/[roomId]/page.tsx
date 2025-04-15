"use client"

import { use, useEffect, useRef, useState } from "react";
import Canvas from "../../../../components/Canvas";

interface CollaborativeCanvasPropTypes {
    params:Promise<{roomId:string}>
}

export default function CollaborativeCanvas({params}:CollaborativeCanvasPropTypes){
    const {roomId} = use(params);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`ws://localhost:3001`);
        ws.onopen=()=>{
            setSocket(ws);
        }

        return ()=>{
            setSocket(null);
            ws.close();
        }
    },[])

    if(!socket) return null;

    return <Canvas socket={socket} canvasRef={canvasRef} roomId={roomId} />
}