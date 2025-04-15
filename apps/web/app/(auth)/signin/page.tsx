"use client";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaDiscord, FaSignInAlt } from "react-icons/fa";
import Logo from "../../../public/doodle-dock-frame.png"
import { BuiltInProviderType } from "next-auth/providers/index";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case "github":
        return <FaGithub size={20} />;
      case "google":
        return <FaGoogle size={20} />;
      case "discord":
        return <FaDiscord size={20} />;
      default:
        return <FaSignInAlt size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative z-10 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-colors duration-300 max-w-md w-full text-center shadow-xl relative z-10">
        <Image src={Logo} width={100} height={100} className="mx-auto rounded-lg my-3" alt="Doodle-Dock" />
        <h1 className="text-4xl font-extrabold mb-4 text-white">Sign in</h1>
        <p className="text-gray-300 mb-8 text-base">
          Choose a provider to continue
        </p>

        {providers ? (
          <div className="flex flex-col gap-4">
            {Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90 transition"
              >
                {getIcon(provider.id)}
                {provider.name}
              </button>
            ))}
          </div>
        ) : (
          <p>Loading providers...</p>
        )}
      </div>
    </div>
  );
}
