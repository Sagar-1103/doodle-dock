"use client";

import { ChevronRight, ChevronUp, Circle, EllipsisVertical, Eraser, HandIcon, Image, LogOut, LucideIcon, Minus, MousePointer2, Pencil, Square, Type } from "lucide-react";
import { ModeTypes } from "../types";
import { useState } from "react";
import Link from "next/link";


interface DockPropTypes {
    selectedMode:ModeTypes;
    changeMode:(mode:ModeTypes)=>void;
}

export default function Dock({selectedMode,changeMode}:DockPropTypes){
  const [isMenuOpen,setMenuOpen] = useState(false);
    const modes:{title:ModeTypes,icon:LucideIcon}[] = [
        { title:"view",icon:MousePointer2},
        { title:"grab",icon:HandIcon},
        { title:"rectangle",icon:Square},
        { title:"circle",icon:Circle},
        { title:"pencil",icon:Pencil},
        { title:"line",icon:Minus},
        { title:"eraser",icon:Eraser},
        { title:"text",icon:Type},
        { title:"image",icon:Image},
     ]


     const handleLogout = async()=>{
      
     }

     return (
      <>
        {/* Menu Button */}
        <div className="fixed left-2 top-2 flex gap-x-2 text-white">
        <p className="font-bold mt-0.5">Doodle Dock</p>
          <div>
            <button onClick={()=>setMenuOpen(prev=>!prev)} className="my-auto hover:cursor-pointer ">
              <EllipsisVertical className={`hover:bg-[#272729]/50 hover:text-white text-gray-400 p-2 rounded-lg ${isMenuOpen && "text-white bg-[#272729]/50" }`} width={30} height={30} />
            </button>

            {/* Setting Side Bar */}
            <div hidden={!isMenuOpen} className="min-h-96 min-w-48 bg-[#202025] backdrop-blur-md shadow-lg border-[1px] border-[#3f3f44]/70 rounded-md">
              <div className="px-1 py-1 text-[13px] font-semibold text-gray-200 flex flex-col">
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Open</p> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Download</p> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex "> <p className="my-auto">Export</p> <ChevronRight className="p-1 absolute right-1" /> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Find</p> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Live collaboration</p> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Reset</p> </div>
                  <hr className="text-gray-400/20 my-1 " />
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex"> <p className="my-auto">Help</p> <ChevronRight className="p-1 absolute right-1" /> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex"> <p className="my-auto">Preferences</p> <ChevronRight className="p-1 absolute right-1" /> </div>
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 "> <p className="my-auto">Keyboard shortcuts</p> </div>
                <hr className="text-gray-400/20 my-1 " />
                  <button onClick={handleLogout} className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex"> <p className="my-auto">Sign in</p> <LogOut className="p-1 absolute right-1" /> </button>
                <hr className="text-gray-400/20 my-1 " />
                <Link target="_blank" href={"https://github.com/Sagar-1103/doodle-dock"} className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Github</p> </Link>
                <Link target="_blank" href={"https://x.com/_sagar1103_"} className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Twitter</p> </Link>
                <Link target="_blank" href={"https://www.linkedin.com/in/sagar-shirgaonkar-ba0859270/"} className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"> <p className="my-auto">Linkedin</p> </Link>
              </div>
            </div>
          </div>

        </div>

        {/* canvas resizer */}
        <div>

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