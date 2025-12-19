"use client";

import { useEffect, useState } from "react";
import { SquadManager, SquadMember } from "@/lib/storage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Euro, Trash2, Phone, ArrowLeft, Shirt } from "lucide-react";

export default function SquadPage() {
  const [squad, setSquad] = useState<SquadMember[]>([]);

  useEffect(() => {
    // Initial load
    setSquad(SquadManager.getSquad());

    // Listen for updates
    const handleUpdate = () => setSquad(SquadManager.getSquad());
    window.addEventListener("squad-update", handleUpdate);
    return () => window.removeEventListener("squad-update", handleUpdate);
  }, []);

  const totalValue = squad.reduce((acc, p) => {
    const valueString = p.market_value || "0";
    const val = Number.parseInt(valueString.replace(/[^0-9]/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500 selection:text-black pb-20">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            <span className="font-mono text-sm uppercase tracking-widest">Back to Pitch</span>
          </Link>
          <div className="flex flex-col items-end">
             <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Team Value</span>
             <div className="flex items-center gap-1 text-yellow-400 font-black text-xl">
               <Euro className="w-5 h-5" />
               <span>{totalValue}M</span>
             </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        {/* Title Section */}
        <div className="mb-12 text-center">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-4"
            >
               <Shirt className="w-4 h-4 text-yellow-500" />
               <span className="text-xs font-mono uppercase tracking-[0.2em] text-yellow-500">The Locker Room</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Dream Team</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Manage your signed developers. Call their agents, review contracts, or release them back to the free agency market.
            </p>
        </div>

        {squad.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
             <div className="text-6xl mb-6 opacity-20">⚽</div>
             <h3 className="text-2xl font-bold mb-2">Empty Squad</h3>
             <p className="text-gray-500 mb-8">You haven't signed any players yet.</p>
             <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition">
               Go to Scouting
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
            {squad.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-colors"
              >
                 {/* Card Header (Jersey Style) */}
                 <div className="h-24 bg-gradient-to-br from-gray-900 to-black relative p-6 flex justify-between items-start">
                     <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,#fbbf24_0%,transparent_50%)]" />
                     <div className="relative z-10 font-mono text-4xl font-black text-white/10 group-hover:text-yellow-500/20 transition-colors">
                        {player.jersey_number}
                     </div>
                     <div className="relative z-10 px-2 py-1 bg-yellow-500 text-black text-[10px] font-bold uppercase rounded">
                        {player.club_status}
                     </div>
                 </div>

                 {/* Player Info */}
                 <div className="px-6 pb-6 -mt-8 relative z-20">
                    <div className="flex items-end gap-4 mb-4">
                       <img 
                          src={player.image} 
                          alt={player.name}
                          className="w-20 h-20 rounded-2xl object-cover border-4 border-[#111]"
                       />
                       <div className="mb-2">
                          <h3 className="text-xl font-bold leading-none">{player.name}</h3>
                          <p className="text-xs text-gray-500 font-mono mt-1">{player.role}</p>
                       </div>
                    </div>

                    <div className="space-y-3 mb-6">
                       <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-500">Market Value</span>
                          <span className="font-mono font-bold text-white">{player.market_value}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                          <span className="text-gray-500">Weekly Wage</span>
                          <span className="font-mono font-bold text-white">{player.transfer_fee}</span>
                       </div>
                       <div className="bg-white/5 p-3 rounded-lg">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Agent Report</p>
                          <p className="text-xs text-gray-300 italic">"{player.agent_note}"</p>
                       </div>
                    </div>

                    <div className="flex gap-2">
                       <button 
                         onClick={() => SquadManager.releasePlayer(player.id)}
                         className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2 text-xs font-bold uppercase"
                       >
                          <Trash2 className="w-4 h-4"/> Release
                       </button>
                       <button className="flex-1 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition flex items-center justify-center gap-2 text-xs font-bold uppercase">
                          <Phone className="w-4 h-4"/> Call Agent
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
