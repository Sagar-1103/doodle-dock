"use client";
import { ArrowRight, Pencil } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderPropTypes {
  isAuthenticated:boolean;
}

export default function Header({isAuthenticated}:HeaderPropTypes) {

  const handleLogout = async()=>{
      await fetch("/api/auth/logout");
      signOut({callbackUrl:"/"})
  }

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-black/30 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-3">
          <div className="relative">
            <Pencil className="w-7 h-7 text-orange-500" />
            <div className="absolute -inset-1 rounded-full bg-orange-500/20 blur-sm" />
          </div>
          <span className="text-2xl font-bold tracking-tight">DoodleDock</span>
        </Link>

        {!isAuthenticated && <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="relative font-medium text-gray-300 hover:text-white transition-colors duration-200 py-1">Features</a>
          <a href="#showcase" className="relative font-medium text-gray-300 hover:text-white transition-colors duration-200 py-1">Showcase</a>
        </div>}

          <div>
            <button onClick={()=>{
              isAuthenticated?handleLogout():signIn();
            }} className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2 rounded-full font-medium shadow-lg">
              <span className="relative z-10 flex items-center gap-2">
                <span>{isAuthenticated ? "Logout":"Login"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
      </nav>
    </header>
  );
}
