
interface PalettePropTypes {
    changePalette:({stroke,bg}:{stroke:string,bg:string|null})=>void;
    palette:{stroke:string,bg:string|null};
}

export default function Palette({changePalette,palette}:PalettePropTypes) {
  return (
    <div className="min-w-52 py-3 px-4 flex flex-col gap-y-4 text-white font-normal text-sm bg-[#202025] backdrop-blur-md shadow-lg border border-[#3f3f44]/70 rounded-md">
      {/* Stroke */}
      <div>
        <p>Stroke</p>
        <div className="flex mt-1 gap-x-1.5">
          <div onClick={()=>changePalette({stroke:"#ffffff",bg:palette.bg||null})} className="w-6 h-6 bg-gray-100 rounded-sm"></div>
          <button onClick={()=>changePalette({stroke:"#ff6467",bg:palette.bg||null})} className="w-6 h-6 bg-red-400 rounded-sm"></button>
          <button onClick={()=>changePalette({stroke:"#05df72",bg:palette.bg||null})} className="w-6 h-6 bg-green-400 rounded-sm"></button>
          <div onClick={()=>changePalette({stroke:"#50a2ff",bg:palette.bg||null})} className="w-6 h-6 bg-blue-400 rounded-sm"></div>
          <div onClick={()=>changePalette({stroke:"#ff8904",bg:palette.bg||null})} className="w-6 h-6 bg-orange-400 rounded-sm"></div>
          <p className="text-gray-300"> | </p>
          <div className={`w-6 h-6 bg-[${palette.stroke}] rounded-sm`} ></div>
        </div>
      </div>

      {/* Background */}
      <div>
        <p>Background</p>
        <div className="flex mt-1 gap-x-1.5">
          <div className="w-6 h-6 bg-[#202025] border rounded-sm"></div>
          <div className="w-6 h-6 bg-[#ffc9c9] rounded-sm"></div>
          <div className="w-6 h-6 bg-[#b2f2bb] rounded-sm"></div>
          <div className="w-6 h-6 bg-[#a5d8ff] rounded-sm"></div>
          <div className="w-6 h-6 bg-[#ffec99] rounded-sm"></div>
          <p className="text-gray-300"> | </p>
          <div className={`w-6 h-6 bg-[${palette.bg}] ${!palette.bg && "border"} rounded-sm`} ></div>
        </div>
      </div>

      {/* Fill */}
      <div>
        <p>Fill</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Stroke width */}
      <div>
        <p>Stroke width</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Stroke style */}
      <div>
        <p>Stroke style</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Slopiness */}
      <div>
        <p>Slopiness</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Edges */}
      <div>
        <p>Edges</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
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
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div>
        <p>Actions</p>
        <div className="flex mt-1 gap-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-[#585862]/50 rounded-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
