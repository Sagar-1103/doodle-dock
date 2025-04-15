import { ChevronRight, Eye } from "lucide-react";
import Badge from "./ui/badge";
import ShowcaseCard from "./ui/showcase-card";

export default function Showcase() {
  return (
    <section id="showcase" className="py-24 px-6 lg:px-12 relative">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
                <Badge className='bg-purple-500/10 border text-purple-400 py-1.5 text-sm font-medium border-purple-500/20' text='DoodleDock Showcase' startIcon={Eye} startIconColor="purple" />
            </div>
          <h2 className="text-4xl font-bold mb-6">
            Explore DoodleDock in Action
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how DoodleDock empowers creators with intuitive tools, real-time
            collaboration, and limitless possibilities. Watch our platform demos
            to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ShowcaseCard key={index} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors px-6 py-3 rounded-full font-medium">
            View Full Gallery <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
