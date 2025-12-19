"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockProfiles, type Profile } from "@/lib/mock-data";
import { SquadManager } from "@/lib/storage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import {
  Github,
  MapPin,
  Trophy,
  Code,
  Globe,
  Zap,
  Briefcase,
  Users,
  ChevronLeft,
  Share2,
  Euro,
  FileText,
  TrendingUp,
  Activity
} from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function ProfilePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const profile = mockProfiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        Profile not found
      </div>
    );
  }

  const handleSignPlayer = () => {
    if (SquadManager.isSigned(profile.id)) {
        toast.error("ALREADY SIGNED!", {
            description: `${profile.name} is already in the squad.`,
            style: { background: "#ef4444", color: "white", border: "none" }
        });
        return;
    }
    
    SquadManager.signPlayer(profile);
    toast.success("AGREEMENT REACHED!", {
        description: `Welcome to the team, ${profile.name}!`,
        icon: "⚽",
        style: { background: "#10b981", color: "white", border: "none" }
    });
  };

  // Prepare Data for Charts - Mapped to Dev Metrics
  const radarData = [
    { subject: "ALGO", A: profile.metrics.algo, fullMark: 100 }, 
    { subject: "SYS", A: profile.metrics.system, fullMark: 100 },
    { subject: "TEST", A: profile.metrics.test, fullMark: 100 },
    { subject: "UI", A: profile.metrics.ui, fullMark: 100 },
    { subject: "DEBUG", A: profile.metrics.debug, fullMark: 100 },
    { subject: "LEAD", A: profile.metrics.lead, fullMark: 100 },
  ];

  const formData = profile.github_stats.contributions.map((val, i) => ({
    name: `M${i + 1}`,
    value: val,
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500 selection:text-black pb-20">
      <Toaster position="top-center" />
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link
          href="/browse"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span className="font-mono text-sm uppercase">Scout List</span>
        </Link>
        <Link href="/" className="font-black tracking-tighter text-xl">
          DEV LEAGUE
        </Link>
        <div className="w-10" /> 
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 relative z-10">
        {/* Header / Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: 3D Image & Quick Stats */}
          <div className="lg:col-span-4 space-y-6">
            <TiltCard className="relative aspect-[3/4] rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
              <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                 style={{ backgroundImage: `url(${profile.image})` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 transform translate-z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500 text-black font-bold text-xs rounded-full uppercase tracking-wider mb-3 shadow-lg">
                   {profile.club_status}
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase leading-none mb-2 drop-shadow-lg">
                  {profile.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-300 font-mono text-sm">
                   <MapPin className="w-4 h-4" /> {profile.place_of_birth} {profile.nationality}
                </div>
              </div>
              
              {/* Holographic Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none mix-blend-overlay" />
            </TiltCard>

            {/* Action Buttons */}
            <div className="flex gap-4">
               <button 
                 onClick={handleSignPlayer}
                 className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition flex items-center justify-center gap-2 active:scale-95 duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
               >
                 <Zap className="w-5 h-5"/> Sign Player
               </button>
               <button className="px-6 bg-white/10 rounded-xl hover:bg-white/20 transition">
                  <Share2 className="w-5 h-5"/>
               </button>
            </div>
          </div>

          {/* Right Column: Detailed Stats (Bento Grid) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             
             {/* 1. Scouting Report (Bio) */}
             <div className="md:col-span-2 bg-[#111] rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                   <Trophy className="w-32 h-32 rotate-12" />
                </div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                   <Users className="w-6 h-6 text-yellow-500" /> Scouting Report
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg mb-6 relative z-10">
                   {profile.detailed_bio}
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {profile.coding_strengths.map(s => (
                     <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-wider text-gray-300">
                        {s}
                     </span>
                  ))}
                </div>
             </div>

             {/* 2. Dev Attribute Hexagon (Radar Chart) */}
             <div className="bg-[#111] rounded-3xl p-6 border border-white/5 min-h-[300px] flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="font-bold flex items-center gap-2 text-sm text-gray-400 uppercase tracking-wider">
                      <Activity className="w-4 h-4 text-green-400"/> Technical Specs
                   </h3>
                   <span className="text-2xl font-black text-white">{profile.match_score}</span>
                </div>
                <div className="flex-1 w-full h-full relative z-10">
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                         <PolarGrid stroke="#333" />
                         <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                         <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                         <Radar name="Attributes" dataKey="A" stroke="#fbbf24" strokeWidth={3} fill="#fbbf24" fillOpacity={0.4} />
                      </RadarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* 3. Market Value (Financials) */}
             <div className="bg-[#111] rounded-3xl p-6 border border-white/5 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-green-400 font-mono uppercase text-xs tracking-wider">
                        <Euro className="w-4 h-4" /> Market Value
                    </div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
                        {profile.market_value}
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                        Weekly Wage: <span className="text-white font-bold">{profile.transfer_fee}</span>
                    </div>
                 </div>
             </div>

             {/* 4. Form Guide (Area Chart) */}
             <div className="md:col-span-2 bg-[#111] rounded-3xl p-8 border border-white/5 relative">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400"/> Form Guide (Contributions)
                   </h3>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 10}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* 5. Agent Note */}
             <div className="md:col-span-2 bg-[#111] rounded-3xl p-6 border border-white/5 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
                 <div className="flex items-center gap-3 mb-4 text-yellow-500 font-mono uppercase text-xs tracking-wider">
                    <FileText className="w-4 h-4" /> Agent's Note
                 </div>
                 <p className="text-2xl font-serif italic text-white/90">
                    "{profile.agent_note}"
                 </p>
             </div>
             
             {/* 6. Selected Projects */}
             <div className="md:col-span-2 mt-8">
                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                   <Briefcase className="w-6 h-6 text-purple-400"/> Selected Works
                 </h3>
                 <div className="grid gap-6">
                    {profile.projects?.map((project, i) => (
                      <div key={i} className="group p-6 bg-[#161616] rounded-2xl border border-white/5 hover:border-purple-500/50 transition flex flex-col md:flex-row gap-6">
                         <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden relative">
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                               <h4 className="text-xl font-bold group-hover:text-purple-400 transition">{project.title}</h4>
                               <span className="text-xs font-mono text-gray-500">{project.year}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                            <div className="flex gap-2">
                               {project.tags.map(tag => (
                                  <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-gray-500 border border-white/10">
                                    {tag}
                                  </span>
                               ))}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
             </div>

          </div>
        </div>
      </div>
    </main>
  );
}
