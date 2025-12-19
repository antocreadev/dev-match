"use client";

import { mockProfiles } from "@/lib/mock-data";
import Link from "next/link";
import { ChevronLeft, Flag, ExternalLink, Github, Mail, Linkedin, MapPin, Calendar, Globe, Award, Sparkles, Code2, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

export default function ProfilePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const profile = mockProfiles.find((p) => p.id === id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Dev Not Found</p>
          <Link href="/" className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Chart Data Preparation
  const radarData = profile.coding_strengths.slice(0, 6).map(skill => ({
    subject: skill.split(" ")[0],
    A: Math.floor(Math.random() * 40) + 60,
    fullMark: 100
  }));

  const matchData = [
    { name: 'Match', value: profile.match_score },
    { name: 'Gap', value: 100 - profile.match_score },
  ];
  const COLORS = ['#10b981', '#334155'];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")`
      }}/>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference">
        <Link href="/browse" className="flex items-center gap-2 text-white/80 hover:text-white transition group">
          <div className="p-2 rounded-full border border-white/20 group-hover:border-white transition">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-mono text-sm tracking-wider">BACK TO TALENT</span>
        </Link>
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition active:scale-95">
            Hire Me
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24"
        >
          {/* Main Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-8 flex flex-col justify-end">
             <div className="mb-6 flex items-center gap-3">
               <span className="px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                 {profile.availability}
               </span>
               <span className="text-2xl">{profile.nationality}</span>
             </div>
             
             <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
               {profile.name.split(" ")[0]}
             </h1>
             <h2 className="text-3xl lg:text-5xl font-light text-gray-400 mb-8 max-w-2xl">
               {profile.role}
             </h2>
             
             <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
               {profile.bio}
             </p>
          </motion.div>

          {/* Portrait */}
          <motion.div variants={scaleIn} className="lg:col-span-4 relative group">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay group-hover:bg-transparent transition duration-500 z-10"/>
              <img 
                src={profile.image || "/placeholder.svg"} 
                alt={profile.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-sm font-mono mb-1">
                   <Sparkles className="w-4 h-4 text-yellow-400" />
                   <span>Match Score</span>
                 </div>
                 <div className="text-3xl font-bold">{profile.match_score}%</div>
              </div>
            </div>
          </motion.div>
        </motion.div>


        {/* BENTO GRID STATS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24"
        >
          {/* Stat 1: Github */}
          <motion.div variants={fadeInUp} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition group">
             <div className="flex justify-between items-start mb-4 text-gray-400 group-hover:text-white transition">
               <Github className="w-6 h-6"/>
               <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition"/>
             </div>
             <div className="text-4xl font-bold mb-1">{profile.github_stats.commits}</div>
             <div className="text-sm text-gray-500 font-mono">YEARLY COMMITS</div>
             <div className="flex mt-4 gap-1 h-8 items-end">
               {profile.github_stats.contributions.map((h, i) => (
                 <div key={i} className="flex-1 bg-green-500/20 rounded-sm" style={{height: `${h * 10}%`}}/>
               ))}
             </div>
          </motion.div>

          {/* Stat 2: Skills Radar */}
          <motion.div variants={fadeInUp} className="bg-[#111] p-2 rounded-2xl border border-white/5 lg:col-span-1 relative overflow-hidden">
             <div className="absolute inset-x-0 top-4 text-center text-xs font-mono text-gray-500 z-10">SKILL ANALYSIS</div>
             <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skills" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
             </div>
          </motion.div>

          {/* Stat 3: Experience */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-indigo-900/40 to-[#111] p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between">
             <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400"/>
                  Biggest Achievement
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  &quot;{profile.biggest_achievement}&quot;
                </p>
             </div>
             <div className="mt-6 flex gap-3 flex-wrap">
               {profile.coding_strengths.map(s => (
                 <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                   {s}
                 </span>
               ))}
             </div>
          </motion.div>
        </motion.div>

        {/* PROJECTS SHOWCASE */}
        <section className="mb-32">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-12 flex items-end gap-4"
          >
            Selected Works
            <span className="text-lg font-normal text-gray-500 font-mono mb-1.5">(0{profile.projects.length})</span>
          </motion.h3>

          <div className="space-y-20">
            {profile.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Image Side */}
                <div className={`lg:col-span-7 relative ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500 z-10"/>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition duration-700"/>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-5 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-4 mb-4 text-xs font-mono text-indigo-400">
                    <span>{project.year}</span>
                    <span className="w-12 h-[1px] bg-indigo-500/50"/>
                  </div>
                  <h4 className="text-3xl font-bold mb-4 group-hover:text-indigo-400 transition">{project.title}</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-indigo-400 hover:border-indigo-400 transition">
                    View Project <ExternalLink className="w-4 h-4"/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE & ABOUT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
           {/* Detailed Bio */}
           <div className="lg:col-span-7">
             <h3 className="text-2xl font-bold mb-8">About Me</h3>
             <div className="prose prose-invert prose-lg text-gray-400 leading-loose">
               <p>{profile.detailed_bio || profile.bio}</p>
             </div>
             
             <div className="mt-12">
               <h4 className="font-mono text-sm text-gray-500 mb-6 uppercase tracking-widest">Experience</h4>
               <div className="border-l border-white/10 pl-8 space-y-12">
                 {profile.timeline.map((item, idx) => (
                   <div key={idx} className="relative">
                     <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#0a0a0a] border border-white/30"/>
                     <div className="text-sm font-mono text-indigo-400 mb-1">{item.year}</div>
                     <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                     <p className="text-gray-400">{item.description}</p>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Sidebar Info */}
           <div className="lg:col-span-5 space-y-8">
             {/* Info Card */}
             <div className="bg-[#111] p-8 rounded-2xl border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-300"/>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono uppercase">Location</div>
                    <div className="text-lg">{profile.place_of_birth}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gray-300"/>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono uppercase">Languages</div>
                    <div className="text-lg">
                      {profile.languages.map(l => l.language).join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-gray-300"/>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono uppercase">Stack</div>
                    <div className="text-sm text-gray-300 mt-1">
                      {profile.coding_strengths.slice(0, 4).join(" • ")}
                    </div>
                  </div>
                </div>
             </div>

             {/* Fun Fact Card */}
             <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-white/5">
                <h4 className="font-mono text-xs text-purple-400 mb-4 uppercase">Fun Fact</h4>
                <p className="text-xl italic font-light">
                  &quot;{profile.fun_fact}&quot;
                </p>
             </div>
           </div>
        </section>

      </div>
    </main>
  );
}

