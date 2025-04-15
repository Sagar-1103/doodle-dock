"use client";

import { Circle, Eraser, HandIcon, Image, LucideIcon, Minus, MousePointer2, Pencil, Square, Type } from "lucide-react";
import { ModeTypes } from "../types";

interface DockPropTypes {
    selectedMode:ModeTypes;
    changeMode:(mode:ModeTypes)=>void;
}

export default function Dock({selectedMode,changeMode}:DockPropTypes){
    const modes:{title:ModeTypes,icon:LucideIcon}[] = [
        { title:"grab",icon:HandIcon},
        { title:"view",icon:MousePointer2},
        { title:"rectangle",icon:Square},
        { title:"circle",icon:Circle},
        { title:"pencil",icon:Pencil},
        { title:"line",icon:Minus},
        { title:"eraser",icon:Eraser},
        { title:"text",icon:Type},
        { title:"image",icon:Image},
     ]

     return (
        <div className="fixed bottom-5 hover:cursor-auto left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 flex gap-x-3 px-5 py-2 rounded-2xl">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
                <button key={index} type="submit" className="hover:cursor-pointer " onClick={()=>changeMode(mode.title)}>
                <p className={`${selectedMode===mode.title?"bg-orange-500 text-amber-50":"hover:bg-gray-300"} p-2 rounded-md`} >
                <Icon />
                </p>
            </button>
            );
          })}
        </div>
      );
      
}