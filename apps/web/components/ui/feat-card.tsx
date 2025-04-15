import { ReactElement } from "react"

interface FeatCardPropTypes {
    title:string,
    description:string,
    icon:ReactElement
}

export default function FeatCard(feature:FeatCardPropTypes){
    return (
        <div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors duration-300 group"
        >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
        </div>
    );
}