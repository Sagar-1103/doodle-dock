import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useCanvas } from "../hooks/useCanvas";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

interface SettingbarPropTypes {
  isMenuOpen: boolean;
}

export default function Settingbar({ isMenuOpen }: SettingbarPropTypes) {
  const {canvasEngine} = useCanvas();
  const {data} = useSession();

  const downloadCanvas = useCallback((type: "png" | "jpeg" | "svg", fileName = "canvas-image")=>{
    canvasEngine?.downloadCanvas(type,fileName);
  },[canvasEngine])
  
const settings = [
  // { name: "Open", onClick: () => {}, submenu: null },
  // { name: "Download", onClick: () => {}, submenu: null },
  {
    name: "Export",
    onClick: null,
    submenu: [
      { name: "JPEG", onClick: () => {downloadCanvas("jpeg")} },
      { name: "PNG", onClick: () => {downloadCanvas("png")} },
      { name: "SVG", onClick: () => {downloadCanvas("svg")} },
    ],
  },
  // { name: "Find", onClick: () => {}, submenu: null },
  // { name: "Live collaboration", onClick: () => {}, submenu: null },
  { name: "Reset", onClick: () => {canvasEngine?.clearCanvas()}, submenu: null },
  { separator: true },
  // {
  //   name: "Help",
  //   onClick: null,
  //   submenu: [
  //     { name: "Give us feedback", onClick: () => {} },
  //     { separator: true },
  //     { name: "About", onClick: () => {} },
  //   ],
  // },
  // {
  //   name: "Preferences",
  //   onClick: () => {},
  //   submenu: [
  //     { name: "Show grid", onClick: () => {} },
  //     { name: "Focus mode", onClick: () => {} },
  //     { name: "Debub mode", onClick: () => {} },
  //     { separator: true },
  //     { name: "Theme", onClick: () => {} },
  //   ],
  // },
  // { name: "Keyboard shortcuts", onClick: () => {}, submenu: null },
  // { separator: true }, 
  {
    name: data?.jwtToken? "Sign out":"Sign in",
    onClick: () => {},
    icon: <LogOut className="p-1 absolute right-1" />,
  },
  { separator: true },
  {
    name: "Github",
    href: "https://github.com/Sagar-1103/doodle-dock"
  },
  {
    name: "Twitter",
    href: "https://x.com/_sagar1103_",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/sagar-shirgaonkar-ba0859270/",
  },
];

  return (
    <div
      hidden={!isMenuOpen}
      className="min-w-48 mt-1 cursor-default bg-[#202025] backdrop-blur-md shadow-lg border border-[#3f3f44]/70 rounded-md"
    >
      <div className="px-1 py-1 text-[13px] font-semibold text-gray-200 flex flex-col">
        {settings.map((item, index) => {
          if ("separator" in item && item.separator) {
            return <hr key={index} className="text-gray-400/20 my-1" />;
          }

          if ("href" in item) {
            return (
              <Link
                key={index}
                target="_blank"
                href={item.href ?? ""}
                className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"
              >
                <p className="my-auto">{item.name}</p>
              </Link>
            );
          }

          // Submenu item
          if (Array.isArray(item.submenu)) {
            if ("separator" in item && item.separator) {
              return <hr key={index} className="text-gray-400/20 my-1" />;
            }

            return (
              <div key={index} className="relative group">
                <div className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex items-center">
                  <p className="my-auto">{item.name}</p>
                  <ChevronRight className="p-1 ml-auto" />
                </div>
                <div className="absolute left-full top-0 w-36 bg-[#202025] backdrop-blur-md shadow-lg border border-[#3f3f44]/70 rounded-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-150 z-50">
                  <div className="px-1 py-1 text-[13px] font-semibold text-gray-200 flex flex-col">
                    {item.submenu.map((sub, i) => {
                      if ("separator" in sub && sub.separator) {
                        return <hr key={i} className="text-gray-400/20 my-1" />;
                      }

                      return (
                        <div
                          key={i}
                          onClick={sub.onClick}
                          className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5"
                        >
                          <p className="my-auto">{sub.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          // Normal item
          return (
            <div
              key={index}
              onClick={item.onClick?item.onClick:()=>{}}
              className="hover:bg-gray-400/15 hover:cursor-pointer px-2 rounded-md py-1.5 flex items-center relative"
            >
              <p className="my-auto">{item.name}</p>
              {item.icon && item.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}
