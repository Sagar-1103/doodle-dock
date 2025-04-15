import { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

interface BadgePropTypes {
    className?:string;
    text:string;
    startIcon?:LucideIcon;
    endIcon?:LucideIcon;
    startIconColor?:keyof typeof IconClasses
    endIconColor?:keyof typeof IconClasses
    startIconFillColor?:keyof typeof IconFillClasses
    endIconFillColor?:keyof typeof IconFillClasses
    textStyles?:string
}

const IconClasses = {
    orange:"text-orange-400",
    pink:"text-pink-400",
    purple:"text-purple-400",
}
const IconFillClasses = {
    orange:"fill-orange-400",
    pink:"fill-pink-400",
    purple:"fill-purple-400",
    dark:"fill-gray-500"
}

export default function Badge({className,text,startIcon:StartIcon,endIcon:EndIcon,startIconColor,endIconColor,startIconFillColor,endIconFillColor,textStyles}:BadgePropTypes){
    return (
        <div className={cn("px-4 py-2 bg-white/5 backdrop-blur-md rounded-full flex items-center gap-2 border border-white/10",className)}>
            {StartIcon && <StartIcon className={cn("w-4 h-4 ",startIconColor && IconClasses[startIconColor],startIconFillColor && IconFillClasses[startIconFillColor])} />}
        <span className={cn("text-sm",textStyles)}>{text}</span>
            {EndIcon && <EndIcon className={cn("w-4 h-4",endIconColor && IconClasses[endIconColor],endIconFillColor && IconFillClasses[endIconFillColor])} />}
        </div>
    );
}