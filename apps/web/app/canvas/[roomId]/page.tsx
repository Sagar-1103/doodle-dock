"use client"

import { use } from "react";

interface CollaborativeCanvasPropTypes {
    params:Promise<{roomId:string}>
}

export default function CollaborativeCanvas({params}:CollaborativeCanvasPropTypes){
    const {roomId} = use(params);
    return (
        <div className="text-white">
            <h1>
                Collaborative Canvas
            </h1>
            <h2>
                Room ID : {roomId}
            </h2>
        </div>
    );
}