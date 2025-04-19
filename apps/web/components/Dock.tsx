"use client";
import { ChevronUp, Circle, EllipsisVertical, Eraser, HandIcon, Image, LucideIcon, Minus, MousePointer2, Pencil, Plus, Share2, Square, Type } from "lucide-react";
import { ModeTypes } from "../types";
import { useState } from "react";
import Settingbar from "./Settingbar";
import Palette from "./Palette";
import { useCanvas } from "../hooks/useCanvas";

export default function Dock(){
  const {selectedMode,setSelectedMode,canvasEngine} = useCanvas();
  const [isMenuOpen,setMenuOpen] = useState(false);
    const modes:{title:ModeTypes,icon:LucideIcon}[] = [
        { title:"select",icon:MousePointer2},
        { title:"grab",icon:HandIcon},
        { title:"rectangle",icon:Square},
        { title:"circle",icon:Circle},
        { title:"pencil",icon:Pencil},
        { title:"line",icon:Minus},
        { title:"eraser",icon:Eraser},
        { title:"text",icon:Type},
        { title:"image",icon:Image},
     ]
     
    const changeMode = (m:ModeTypes)=>{
      setSelectedMode(m);
      canvasEngine?.changeSelectedMode(m);
  }

     return (
      <>
        {/* Menu Button */}
        <div className="fixed left-2 top-2 flex gap-x-2 text-white">
        <p className="font-bold mt-0.5">Doodle Dock</p>
          <div className="flex flex-col">
            <button onClick={()=>setMenuOpen(prev=>!prev)} className="my-auto hover:cursor-pointer ">
              <EllipsisVertical className={`hover:bg-[#272729]/50 hover:text-white text-gray-400 p-2 rounded-lg ${isMenuOpen && "text-white bg-[#272729]/50" }`} width={30} height={30} />
            </button>
            {/* Setting Side Bar */}
            <Settingbar isMenuOpen={isMenuOpen} />
          </div>
        </div>
        <div>
        </div>

        {/* Palette */}
        <div className="fixed top-2 right-2 flex flex-col mt-1 gap-y-2" >
          <div className="flex justify-end gap-x-3">
          <button className="hover:cursor-pointer ">
              <Share2 className={`hover:bg-[#272729]/50 hover:text-white text-gray-300 p-2 rounded-lg`} width={30} height={30} />
            </button>
        <button className="bg-blue-500 px-2 py-1 rounded-md text-white font-medium text-sm">Sign in</button>
          </div>
        {selectedMode!=="grab" && selectedMode!=="select" && <Palette/>}
        </div>

        {/* Canvas Resizer  */}
        <div className="fixed justify-center rounded-lg items-center bottom-2 left-2 flex text-white bg-[#202025] backdrop-blur-md shadow-lg border-[1px] border-[#3f3f44]">
          <button className="px-2 mx-1"><Minus width={15} height={15} /></button>
          <button className="px-1.5 py-2 text-sm">100%</button>
          <button className="px-2 mx-1"><Plus width={15} height={15} /></button>
        </div>

        {/* Mode Selector */}
        <div className="fixed bottom-2 hover:cursor-auto left-1/2 transform -translate-x-1/2 z-50 bg-[#202025] backdrop-blur-md shadow-lg border-[1px] border-[#3f3f44] flex gap-x-1.5 px-1 py-1 rounded-lg">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
                <button key={index} type="submit" className="hover:cursor-pointer" onClick={()=>changeMode(mode.title)}>
                  <p className={`${selectedMode===mode.title?"bg-[#4387f4]":"hover:bg-gray-400/15"} p-2 rounded-md text-amber-50`} >
                    <Icon width={20} height={20} />
                  </p>
                </button>
            );
          })}
            <button type="submit" className="hover:cursor-pointer" >
              <p className={`hover:bg-gray-400/15 p-2 rounded-md text-amber-50`} >
                <ChevronUp />
              </p>
            </button>
        </div>
        </>
      );
}