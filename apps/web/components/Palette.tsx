import { ArrowDown, ArrowDownToLineIcon, ArrowUp, ArrowUpToLineIcon, Copy, Link, Trash2 } from "lucide-react";
import { useCanvas } from "../hooks/useCanvas";
import { PaletteTypes } from "../types";
import { CrossSvg, FillSvg, GridSvg, HatchSvg, HorizontalSvg, WaveSvg } from "./ui/svgs";
export default function Palette() {

  const {palette,setPalette,canvasEngine} = useCanvas();

  const changePalette = ({stroke,bg,radii,lineDash,fillType}:PaletteTypes)=>{
    setPalette({stroke,bg,radii,lineDash,fillType});
    canvasEngine?.changeSelectedPalette({stroke,bg,radii,lineDash,fillType})
}

  return (
    <div className="min-w-52 py-3 cursor-default px-4 flex flex-col gap-y-4 text-white font-normal text-sm bg-[#202025] backdrop-blur-md shadow-lg border border-[#3f3f44]/70 rounded-md">
      {/* Stroke */}
      <div>
        <p>Stroke</p>
        <div className="flex mt-1 gap-x-2">
          <div onClick={()=>changePalette({stroke:"#ffffff",bg:palette.bg,radii:palette.radii,fillType:palette.fillType,lineDash:palette.lineDash})} className="w-6 h-6 bg-gray-100 rounded-sm hover:cursor-pointer"></div>
          <button onClick={()=>changePalette({stroke:"#ff6467",bg:palette.bg,radii:palette.radii,fillType:palette.fillType,lineDash:palette.lineDash})} className="w-6 h-6 bg-red-400 rounded-sm hover:cursor-pointer"></button>
          <button onClick={()=>changePalette({stroke:"#05df72",bg:palette.bg,radii:palette.radii,fillType:palette.fillType,lineDash:palette.lineDash})} className="w-6 h-6 bg-green-400 rounded-sm hover:cursor-pointer"></button>
          <div onClick={()=>changePalette({stroke:"#50a2ff",bg:palette.bg,radii:palette.radii,fillType:palette.fillType,lineDash:palette.lineDash})} className="w-6 h-6 bg-blue-400 rounded-sm hover:cursor-pointer"></div>
          <div onClick={()=>changePalette({stroke:"#ff8904",bg:palette.bg,radii:palette.radii,fillType:palette.fillType,lineDash:palette.lineDash})} className="w-6 h-6 bg-orange-400 rounded-sm hover:cursor-pointer"></div>
          <p className="text-gray-300"> | </p>
          <div style={{backgroundColor:palette.stroke}} className={`w-6 h-6 rounded-sm hover:cursor-pointer`} ></div>
        </div>
      </div>

      {/* Background */}
      <div>
        <p>Background</p>
        <div className="flex mt-1 gap-x-2">
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:palette.radii,bg:null})} className="w-6 h-6 bg-[#202025] border rounded-sm hover:cursor-pointer"></div>
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:palette.radii,bg:"#ffc9c9"})} className="w-6 h-6 bg-[#ffc9c9] rounded-sm hover:cursor-pointer"></div>
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:palette.radii,bg:"#b2f2bb"})} className="w-6 h-6 bg-[#b2f2bb] rounded-sm hover:cursor-pointer"></div>
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:palette.radii,bg:"#a5d8ff"})} className="w-6 h-6 bg-[#a5d8ff] rounded-sm hover:cursor-pointer"></div>
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:palette.radii,bg:"#ffec99"})} className="w-6 h-6 bg-[#ffec99] rounded-sm hover:cursor-pointer"></div>
          <p className="text-gray-300"> | </p>
          <div style={{backgroundColor:palette.bg||""}} className={`w-6 h-6 ${!palette.bg && "border"} rounded-sm hover:cursor-pointer`} ></div>
        </div>
      </div>

      {/* Fill */}
      <div>
        <p>Fill</p>
        <div className="flex mt-1 gap-x-1.5">
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"solid",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="solid"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <FillSvg/>
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"cross",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="cross"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <CrossSvg/>
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"hatch",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="hatch"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <HatchSvg/>
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"horizontal",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="horizontal"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <HorizontalSvg/>            
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"grid",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="grid"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <GridSvg/>            
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:"wave",radii:palette.radii,bg:palette.bg})} className={`w-7 h-7 ${palette.fillType==="wave"?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
              <WaveSvg/>
            </div>
        </div>
      </div>

      {/* Stroke width */}
      <div>
        <p>Stroke width</p>
        <div className="flex mt-1 gap-x-1.5">
            <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4.167 10h11.666" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10h10" stroke="currentColor" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
        </div>
      </div>

      {/* Stroke style */}
      <div>
        <p>Stroke style</p>
        <div className="flex mt-1 gap-x-1.5">
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:[0,0],radii:palette.radii,fillType:palette.fillType,bg:palette.bg})} className={`w-7 h-7 ${palette.lineDash[0]===0 && palette.lineDash[1]===0 ?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4.167 10h11.666" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:[6,4],radii:palette.radii,fillType:palette.fillType,bg:palette.bg})} className={`w-7 h-7 ${palette.lineDash[0]===6 && palette.lineDash[1]===4 ?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="2"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12h2"></path><path d="M17 12h2"></path><path d="M11 12h2"></path></g></svg>
            </div>
            <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:[2,2],radii:palette.radii,fillType:palette.fillType,bg:palette.bg})} className={`w-7 h-7 ${palette.lineDash[0]===2 && palette.lineDash[1]===2 ?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`} >
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="2"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 12v.01"></path><path d="M8 12v.01"></path><path d="M12 12v.01"></path><path d="M16 12v.01"></path><path d="M20 12v.01"></path></g></svg>
            </div>
        </div>
      </div>

      {/* Slopiness */}
      <div>
        <p>Slopiness</p>
        <div className="flex mt-1 gap-x-1.5">
          <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
          <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814" strokeWidth="1.25"></path></svg>
          </div>
          <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
          <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43" strokeWidth="1.25"></path></svg>
          </div>
          <div className="w-7 h-7 bg-[#585862]/50 rounded-sm hover:cursor-pointer p-1">
          <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42" strokeWidth="1.25"></path></svg>
          </div>
        </div>
      </div>

      {/* Edges */}
      <div>
        <p>Edges</p>
        <div className="flex mt-1 gap-x-1.5">
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:0,bg:palette.bg})} className={`w-7 h-7 ${palette.radii==0?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`}>
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><svg strokeWidth="1.5"><path d="M3.33334 9.99998V6.66665C3.33334 6.04326 3.33403 4.9332 3.33539 3.33646C4.95233 3.33436 6.06276 3.33331 6.66668 3.33331H10"></path><path d="M13.3333 3.33331V3.34331"></path><path d="M16.6667 3.33331V3.34331"></path><path d="M16.6667 6.66669V6.67669"></path><path d="M16.6667 10V10.01"></path><path d="M3.33334 13.3333V13.3433"></path><path d="M16.6667 13.3333V13.3433"></path><path d="M3.33334 16.6667V16.6767"></path><path d="M6.66666 16.6667V16.6767"></path><path d="M10 16.6667V16.6767"></path><path d="M13.3333 16.6667V16.6767"></path><path d="M16.6667 16.6667V16.6767"></path></svg></svg>
          </div>
          <div onClick={()=>changePalette({stroke:palette.stroke,lineDash:palette.lineDash,fillType:palette.fillType,radii:70,bg:palette.bg})} className={`w-7 h-7 ${palette.radii==70?"bg-[#6d6da4]":"bg-[#585862]/50"} rounded-sm hover:cursor-pointer p-1`}>
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 12v-4a4 4 0 0 1 4 -4h4"></path><line x1="16" y1="4" x2="16" y2="4.01"></line><line x1="20" y1="4" x2="20" y2="4.01"></line><line x1="20" y1="8" x2="20" y2="8.01"></line><line x1="20" y1="12" x2="20" y2="12.01"></line><line x1="4" y1="16" x2="4" y2="16.01"></line><line x1="20" y1="16" x2="20" y2="16.01"></line><line x1="4" y1="20" x2="4" y2="20.01"></line><line x1="8" y1="20" x2="8" y2="20.01"></line><line x1="12" y1="20" x2="12" y2="20.01"></line><line x1="16" y1="20" x2="16" y2="20.01"></line><line x1="20" y1="20" x2="20" y2="20.01"></line></g></svg>
          </div>
        </div>
      </div>

      {/* Opacity (with radio buttons) */}
      <div>
        <p>Opacity</p>
        <div className="flex items-center gap-x-2 mt-1">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={100}
            className="w-full accent-blue-500"
          />
          <span className="w-10 text-right text-gray-300 text-xs">100%</span>
        </div>
      </div>

      {/* Layers */}
      <div>
        <p>Layers</p>
        <div className="flex mt-1 gap-x-1.5">
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <ArrowDownToLineIcon className="p-2 m-auto" width={30} height={30} />
          </div>
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <ArrowDown className="p-2 m-auto" width={30} height={30} />
          </div>
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <ArrowUpToLineIcon className="p-2 m-auto" width={30} height={30} />
          </div>
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <ArrowUp className="p-2 m-auto" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div>
        <p>Actions</p>
        <div className="flex mt-1 gap-x-1.5">
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <Copy className="p-2 m-auto" width={30} height={30} />
          </div>
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <Trash2 className="p-2 m-auto" width={30} height={30} />
          </div>
          <div className=" bg-[#585862]/50 rounded-sm hover:cursor-pointer">
            <Link className="p-2 m-auto" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
