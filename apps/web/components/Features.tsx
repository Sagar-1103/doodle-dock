import { Wand2 } from "lucide-react";
import FeatCard from "./ui/feat-card";
import Badge from "./ui/badge";
import { features } from "../data/features";

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 lg:px-12 relative">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
                <Badge className='bg-orange-500/10 border text-orange-400 py-1.5 text-sm font-medium border-orange-500/20 ' text='Powerful Features' startIcon={Wand2} startIconColor="orange" />
            </div>
          <h2 className="text-4xl font-bold mb-6">
            Unlock Your Creative Potential
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            DoodleDock empowers creators with intuitive tools and cutting-edge technology for effortless sketching and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
