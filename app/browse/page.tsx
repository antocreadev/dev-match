"use client";

import { useState, useMemo } from "react";
import { mockProfiles, interests } from "@/lib/mock-data";
import Link from "next/link";
import { Heart, MessageCircle, Trophy, Medal, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export default function Browse() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [sortBy, setSortBy] = useState<"rating" | "followers" | "recent">("rating");

  const filteredProfiles = useMemo(() => {
    const filtered = mockProfiles.filter((profile) => {
      const ageMatch = profile.age >= ageRange[0] && profile.age <= ageRange[1];
      const interestMatch =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) =>
          profile.coding_strengths.some((strength) =>
            strength.toLowerCase().includes(interest.toLowerCase())
          )
        );
      return ageMatch && interestMatch;
    });

    if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "followers") {
      filtered.sort((a, b) => (b.followers || 0) - (a.followers || 0));
    }
    
    return filtered;
  }, [selectedInterests, ageRange, sortBy]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent"/>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"/>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50 group-hover:opacity-100 transition duration-500"/>
              <Trophy className="w-8 h-8 text-indigo-400 relative z-10" />
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter">DEV LEAGUE</span>
          </Link>
          <div className="flex gap-4">
             <button className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition text-sm font-mono">
               Log In
             </button>
             <button className="px-4 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition">
               Join Draft
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
              SCOUT TALENT
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Find the top-rated developers for your next championship project. Filter by stats, skills, and potential.
            </p>
          </div>
          <div className="hidden lg:block text-right">
             <div className="text-4xl font-mono font-bold text-indigo-500">{filteredProfiles.length}</div>
             <div className="text-sm text-gray-500 tracking-widest uppercase">Prospects Found</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="sticky top-32 space-y-8">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6 text-indigo-400">
                  <Filter className="w-4 h-4"/>
                  <span className="text-sm font-mono uppercase tracking-widest">Filters</span>
                </div>

                {/* Age Slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                     <label className="text-sm font-bold">Age Range</label>
                     <span className="text-xs font-mono text-gray-400">{ageRange[0]} - {ageRange[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[18, 35]}
                    value={ageRange}
                    min={18}
                    max={50}
                    step={1}
                    onValueChange={setAgeRange}
                    className="py-4"
                  />
                </div>

                {/* Sort By */}
                <div className="mb-8">
                  <label className="text-sm font-bold mb-4 block">Sort By</label>
                  <RadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as any)} className="gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="r1" className="border-white/20 text-indigo-500"/>
                      <Label htmlFor="r1" className="cursor-pointer">Rating Score</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="followers" id="r2" className="border-white/20 text-indigo-500"/>
                      <Label htmlFor="r2" className="cursor-pointer">Followers Count</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                       <RadioGroupItem value="recent" id="r3" className="border-white/20 text-indigo-500"/>
                       <Label htmlFor="r3" className="cursor-pointer">Newest Rookies</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Interests */}
                <div>
                  <label className="text-sm font-bold mb-4 block">Specialization</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.slice(0, 15).map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "text-xs px-3 py-1.5 rounded-full transition border border-transparent font-medium",
                          selectedInterests.includes(interest)
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="lg:col-span-9">
             <AnimatePresence>
               <motion.div 
                 layout
                 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
               >
                 {filteredProfiles.map((profile) => (
                   <motion.div
                     key={profile.id}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.3 }}
                   >
                     <Link href={`/profile/${profile.id}`} className="group block h-full">
                       <div className="relative h-full bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-2">
                         {/* Image Container */}
                         <div className="relative h-64 overflow-hidden">
                           <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition"/>
                           <img 
                             src={profile.image || "/placeholder.svg"} 
                             alt={profile.name}
                             className="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                           />
                           
                           {/* Float Stats */}
                           <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                             <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                               <span className="text-yellow-400">★</span>
                               <span className="font-bold">{profile.rating?.toFixed(1) || "N/A"}</span>
                             </div>
                           </div>

                             {/* Match Score Badge (3D effect) */}
                             <div className="absolute bottom-4 left-4 z-20">
                                <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-[-2deg] group-hover:rotate-0 transition">
                                  {profile.match_score}% MATCH
                                </div>
                             </div>
                         </div>

                         {/* Content */}
                         <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="text-xl font-bold truncate pr-4">{profile.name}</h3>
                               <span className="text-sm text-gray-500 font-mono whitespace-nowrap">{profile.age} Y/O</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-1">{profile.role}</p>
                            
                            {/* Skills Mini-Graph (Visual only for now) */}
                            <div className="flex gap-1 h-1.5 mb-6">
                               {profile.coding_strengths.slice(0,4).map((_, i) => (
                                 <div key={i} className={`flex-1 rounded-full ${i===0 ? 'bg-indigo-500' : 'bg-white/10'}`}/>
                               ))}
                            </div>

                            <div className="flex gap-2">
                               {profile.coding_strengths.slice(0, 2).map(skill => (
                                 <span key={skill} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400">
                                   {skill}
                                 </span>
                               ))}
                               {profile.coding_strengths.length > 2 && (
                                 <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-500">
                                   +{profile.coding_strengths.length - 2}
                                 </span>
                               )}
                            </div>
                         </div>
                       </div>
                     </Link>
                   </motion.div>
                 ))}
               </motion.div>
             </AnimatePresence>
             
             {filteredProfiles.length === 0 && (
               <div className="py-20 text-center">
                 <div className="text-6xl mb-4">🌪️</div>
                 <h3 className="text-2xl font-bold text-gray-300">No Players Found</h3>
                 <p className="text-gray-500">Adjust your scouting filters and try again.</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </main>
  );
}
