"use client";

import { use, useEffect, useRef, useState } from "react";
import Canvas from "../../../../components/Canvas";
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
      const ws = new WebSocket(`ws://localhost:3001?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEwOTc3MTY1NTk2NzEyMDE4MDQiLCJuYW1lIjoic2FnYXJfMTEuIiwiZW1haWwiOiJwa2V0Y2h1bTQzMUBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F2YXRhcnMvMTA5NzcxNjU1OTY3MTIwMTgwNC8xMDAzMWFjZWRjZTMyNmFiYTdjZDI4MGYwMDU1YzE2My5wbmciLCJpYXQiOjE3NDQ4OTc0MzcsImp0aSI6IjA0MjhiY2M3LTZiNmQtNGE5MC1iYjI0LTdkNzMwOTUzMDk0MSIsImV4cCI6MTc3NjQzMzQzN30.smA8ko3dNcOesG-1tM9V1IY1AzHEg0ompcyydDaRn38`);
      ws.onopen = () => {
        setSocket(ws);
        ws.send(JSON.stringify({type:"join_room",roomId:roomId}));
      };

      return () => {
        setSocket(null);
        ws.close();
      };
  }, [roomId]);

  if (!socket) return null;

  return <Canvas socket={socket} canvasRef={canvasRef} roomId={roomId} />;
}
