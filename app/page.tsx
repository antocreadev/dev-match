"use client";

import { useState, useEffect } from "react";
import { mockProfiles, type Profile } from "@/lib/mock-data";
import { SwipeCard } from "@/components/swipe-card";
import { SoundManager } from "@/components/sound-manager";
import { SquadManager } from "@/lib/storage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Wind, Zap, Activity, Shirt, Users, Search } from "lucide-react";
import { Toaster, toast } from "sonner";

// Kinetic Text Component
const Marquee = ({ text, direction = 1, speed = 15 }: { text: string; direction?: number; speed?: number }) => (
  <div className="flex whitespace-nowrap overflow-hidden absolute inset-0 items-center justify-center opacity-5 pointer-events-none select-none">
    <motion.div
      className="flex gap-8 text-[20vw] font-black uppercase tracking-tighter text-white leading-none"
      animate={{ x: direction > 0 ? [-1000, 0] : [0, -1000] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
    >
      {[...Array(4)].map((_, i) => (
         <span key={i}>{text} ●&nbsp;</span>
      ))}
    </motion.div>
  </div>
);

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setProfiles(mockProfiles);
    SoundManager.init();
  }, []);

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const handleSwipeRight = () => {
    const profile = profiles[currentIndex];
    
    // Check if already signed
    if (SquadManager.isSigned(profile.id)) {
       toast.error("ALREADY SIGNED!", {
         description: `${profile.name} is already in your squad.`,
         icon: "🚫",
         style: { background: "#ef4444", color: "white", border: "none" }
       });
    } else {
       SquadManager.signPlayer(profile);
       // Football Manager style toast
       toast.success("AGREEMENT REACHED!", {
         description: `You have successfully signed ${profile.name} to your squad.`,
         icon: "✍️",
         style: {
           background: "#10b981",
           color: "white",
           border: "none",
           fontFamily: "monospace"
         }
       });
    }

    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  if (profiles.length === 0) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-yellow-500 selection:text-black">
      <Toaster position="top-center" />
      
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1e1b4b_0%,_#000000_60%)]" />
        {/* Grain Noise */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
        
        {/* Kinetic Typography Layer */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden">
           <div className="relative h-[20vw]">
             <Marquee text="DEV LEAGUE 25" direction={1} speed={30}/>
           </div>
           <div className="relative h-[20vw]">
             <Marquee text="TRANSFER MARKET" direction={-1} speed={25}/>
           </div>
        </div>
      </div>

      {/* HUD Elements */}
      <div className="fixed inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between">
         {/* Top HUD */}
         <div className="flex justify-between items-start">
            <Link href="/" className="pointer-events-auto group">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 border border-white/20 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition duration-300">
                    <Trophy className="w-5 h-5"/>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-bold font-mono tracking-widest">DEV LEAGUE</span>
                   <span className="text-[10px] text-gray-500 font-mono">SEASON 2025</span>
                 </div>
               </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 pointer-events-auto bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10">
               <Link href="/browse" className="px-6 py-2 rounded-full hover:bg-white hover:text-black transition duration-300 text-sm font-bold font-mono uppercase flex items-center gap-2">
                 <Search className="w-4 h-4" /> Scouting
               </Link>
               <Link href="/squad" className="px-6 py-2 rounded-full hover:bg-white hover:text-black transition duration-300 text-sm font-bold font-mono uppercase flex items-center gap-2">
                 <Shirt className="w-4 h-4" /> Locker Room
               </Link>
            </nav>

            <div className="flex flex-col items-end font-mono text-xs text-gray-500">
               <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                  MARKET OPEN
               </div>
               <span>Deadline: 23:59 PM</span>
            </div>
         </div>

         {/* Bottom HUD */}
         <div className="flex justify-between items-end">
            <div className="hidden md:block">
               <div className="font-mono text-xs text-gray-500 mb-1">CURRENT TARGET</div>
               <div className="text-lg font-bold font-mono text-yellow-500">{profiles[currentIndex]?.name}</div>
            </div>
            
            {/* Animated Scroll Hint */}
            <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2">
               <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"/>
               <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500">SCOUT PLAYER</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/browse" className="pointer-events-auto group relative overflow-hidden rounded-full p-[1px]">
                 <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#500724_50%,#E2E8F0_100%)]" />
                 <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl px-8 py-3 text-xs font-bold font-mono uppercase tracking-widest transition-colors hover:bg-slate-950/50">
                   FULL TRANSFER LIST
                 </span>
              </Link>
            </div>
         </div>
      </div>

      {/* Main Card Stack */}
      <div className="relative pt-20 pb-20 px-4 flex items-center justify-center min-h-screen z-20">
        <div className="w-full max-w-7xl perspective-1000">
          <div className="relative h-[600px] flex items-center justify-center transform-style-3d">
            {profiles.map((profile, idx) => {
              const totalCards = profiles.length;
              let offset = idx - currentIndex;

              while (offset > totalCards / 2) offset -= totalCards;
              while (offset < -totalCards / 2) offset += totalCards;

              const maxVisible = 3;
              const absOffset = Math.abs(offset);

              if (absOffset > maxVisible) return null;

              const scale = 1 - absOffset * 0.1;
              const translateX = offset * 50; 
              const translateZ = -absOffset * 100;
              const rotateY = offset * -5;
              const blur = absOffset * 4;
              const opacity = 1 - absOffset * 0.3;

              if (offset === 0) {
                return (
                  <motion.div
                    layoutId={`card-${profile.id}`}
                    key={profile.id}
                    className="absolute w-full md:w-[450px] h-[650px]"
                    style={{ zIndex: 100 }}
                  >
                    <SwipeCard
                      profile={profile}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={profile.id}
                  onClick={() => setCurrentIndex(idx)}
                  className="absolute w-full md:w-[450px] h-[650px] rounded-[32px] bg-[#1a1a1a] border border-white/5 overflow-hidden cursor-pointer"
                  animate={{
                    x: offset * 320, // Spread nicely
                    y: absOffset * 20, // Slight curve down
                    z: -absOffset * 100,
                    scale: scale,
                    rotate: offset * 4,
                    opacity: opacity,
                    filter: `blur(${blur}px) brightness(${1 - absOffset * 0.3})`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{ zIndex: 50 - absOffset }}
                >
                  <img
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover grayscale opacity-50"
                  />
                  <div className="absolute inset-0 bg-black/60"/>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-12 relative z-30">
            <button
              onClick={handleSwipeLeft}
              className="group w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
            >
              <Wind className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors"/>
            </button>

            <div className="px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md font-mono text-xs tracking-widest text-gray-400">
               {currentIndex + 1} / {profiles.length} (TARGET)
            </div>

            <button
              onClick={handleSwipeRight}
              className="group w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
            >
              <Zap className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors"/>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
