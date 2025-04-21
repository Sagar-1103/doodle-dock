"use client";

import { use, useEffect, useRef, useState } from "react";
import Canvas from "../../../../components/Canvas";
import { CanvasProvider } from "../../../../hooks/useCanvas";
// import { getSession } from "next-auth/react";

interface CollaborativeCanvasPropTypes {
  params: Promise<{ roomId: string }>;
}

export default function CollaborativeCanvas({
  params,
}: CollaborativeCanvasPropTypes) {
  const { roomId } = use(params);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [token, setToken] = useState<string | null>(null);

  // const getToken = async () => {
  //   const token = await getSession();
  //   setToken(token?.jwtToken ?? null);
  // };

  useEffect(() => {
    // getToken();
      const ws = new WebSocket(`ws://localhost:3001?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImU1YjkzY2ZjLTQ5ODMtNGM0NC1hZTc2LWNmMzQzODM1NjNhMiIsImlhdCI6MTc0NTI3NjE5OCwianRpIjoiZDZmMWRmYzctMmUxZi00ODUzLTg1YTAtMThmM2E3MmVkMDMwIiwiZXhwIjoxNzc2ODEyMTk4fQ.pAEExlYLRwal9AS29BAGZPaaA9dIA7y1GGT8ZtsGwFo`);
      ws.onopen = () => {
        setSocket(ws);
        ws.send(JSON.stringify({type:"join_room",roomId:Number(roomId)}));
      };

      return () => {
        setSocket(null);
        ws.close();
      };
  }, [roomId]);

  if (!socket) return null;

  return (
    <CanvasProvider>
        <Canvas socket={socket} canvasRef={canvasRef} roomId={roomId} />
    </CanvasProvider>
  ) 
}
