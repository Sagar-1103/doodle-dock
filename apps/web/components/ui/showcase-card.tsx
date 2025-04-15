import { Pencil } from "lucide-react";

export default function ShowcaseCard({index}:{index:number}){
    return (
        <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold mb-1">
                Screenshot {index + 1}
            </h3>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
            <div className="w-full h-full opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]">
                <div className="w-full h-full flex items-center justify-center">
                <Pencil className="w-12 h-12 text-gray-600" />
                </div>
            </div>
            </div>
        </div>
    );
}