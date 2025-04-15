import { ArrowUp } from "lucide-react";
import { links } from "../data/links";

export default function Footer() {
  return (
    <footer className="w-full bg-black/50 backdrop-blur-md pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg"></div>
              <div className="absolute -inset-1 rounded-lg bg-orange-500/20 blur-sm"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              DoodleDock
            </span>
          </div>
          <a
            href="#"
            className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </a>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>
              Developed by{" "}
              <span className="text-white font-medium">Sagar Shirgaonkar</span>
            </p>
            <p>© DoodleDock.</p>
          </div>

          <div className="flex items-center gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br from-orange-500 to-pink-500 transition-colors duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
