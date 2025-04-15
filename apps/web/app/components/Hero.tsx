import { ArrowRight, Command, Star, Wand2 } from "lucide-react";
import Link from "next/link";
import Badge from "./ui/badge";

export default function Hero(){
    return (
        <main className="pt-40 pb-32 px-6 lg:px-12 relative z-10">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"/>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"/>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
          <Badge className='bg-orange-500/10 border text-orange-400 py-1.5 text-sm font-medium border-orange-500/20 ' text='Revolutionizing Creative Collaboration' startIconFillColor='orange' startIcon={Star} startIconColor="orange" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
              Sketch. Collaborate.<br />Bring Ideas to Life.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            A seamless platform for creators, teams, and visionaries. Sketch concepts, brainstorm freely, and collaborate in real time with endless possibilities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge text='Realtime Collaboration' startIcon={Wand2} startIconColor="orange" />
            <Badge text='Limitless Creativity' startIcon={Command} startIconColor="pink" />
            <Badge text='Intuitive Design' startIcon={Star} startIconColor="purple" />
          </div>

          <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-colors duration-300 max-w-xl mx-auto shadow-xl relative z-10 overflow-hidden">
            <div className="absolute -inset-1 opacity-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 blur-sm rounded-3xl"></div>
            <div className="absolute -inset-1 opacity-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 blur-sm rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Create. Share. Innovate.</h2>
              <p className="text-gray-400 mb-6">Dive into DoodleDock and transform your ideas into reality with effortless collaboration.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/canvas"} className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 rounded-xl text-lg font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg flex items-center justify-center gap-2 group">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button className="bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl text-lg font-medium border border-white/10 hover:bg-white/10 transition-colors duration-200">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}