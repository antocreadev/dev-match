"use client";

import { useRef, useEffect, useState } from "react";
import type { Profile } from "@/lib/mock-data";
import Link from "next/link";
import { SoundManager } from "./sound-manager";
import { motion, AnimatePresence } from "framer-motion";

interface SwipeCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({
  profile,
  onSwipeLeft,
  onSwipeRight,
}: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [xPos, setXPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef(0);

  // Constants
  const ROTATION_FACTOR = 0.05;
  const THRESHOLD = 200;

  useEffect(() => {
    // Reset state when profile changes
    if (cardRef.current) {
       cardRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
       cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
    }
    setXPos(0);
  }, [profile.id]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX = e.clientX;
      startY = e.clientY;
      card.style.cursor = "grabbing";
      card.style.transition = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!startX) return;
      currentX = e.clientX - startX;
      currentY = (e.clientY - startY) * 0.2; // Dampen Y axis
      velocityRef.current = e.movementX;

      setXPos(currentX); // Update React state for overlays
      
      const rotate = currentX * ROTATION_FACTOR;
      card.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      card.style.cursor = "grab";
      startX = 0;

      if (Math.abs(currentX) > THRESHOLD) {
        // SWIPE TRIGGERED
        const direction = currentX > 0 ? 1 : -1;
        const endX = window.innerWidth * direction * 1.5;
        
        card.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        card.style.transform = `translate3d(${endX}px, ${currentY + 100}px, 0) rotate(${direction * 45}deg)`;
        
        // Trigger Callback
        if (direction === 1) {
             SoundManager.play("like");
             setTimeout(onSwipeRight, 400); 
        } else {
             SoundManager.play("swipeLeft");
             setTimeout(onSwipeLeft, 400);
        }

      } else {
        // RESET
        card.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
        card.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
        setXPos(0);
      }
    };

    card.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      card.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onSwipeLeft, onSwipeRight]);


  // Derived animations values
  const likeOpacity = Math.min(Math.max(xPos / 100, 0), 1);
  const nopeOpacity = Math.min(Math.max(-xPos / 100, 0), 1);
  const likeScale = 0.5 + likeOpacity * 0.5;
  const nopeScale = 0.5 + nopeOpacity * 0.5;

  return (
    <>
      <div
        ref={cardRef}
        className="absolute inset-0 rounded-[32px] overflow-hidden cursor-grab shadow-2xl bg-black border border-white/10"
        style={{ userSelect: "none", touchAction: "none" }}
      >
          {/* Main Image */}
          <div className="relative w-full h-full">
            <img
              src={profile.image || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

            {/* Profile Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white select-none pointer-events-none">
               <div className="mb-2 flex items-center gap-3">
                 <h2 className="text-5xl font-black tracking-tighter uppercase">{profile.name}</h2>
                 <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-mono">
                    {profile.age} Y/O
                 </div>
               </div>

               <p className="text-xl font-light text-gray-300 mb-6">{profile.role}</p>

               <div className="flex flex-wrap gap-2 mb-6">
                 {profile.coding_strengths.slice(0, 3).map(skill => (
                    <span key={skill} className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 text-xs font-mono uppercase tracking-wider text-gray-300">
                      {skill}
                    </span>
                 ))}
               </div>
            </div>

            {/* LIKE OVERLAY (Green) */}
            <div 
               className="absolute top-12 left-12 border-[8px] border-[#4fd1c5] rounded-xl px-4 py-2 transform -rotate-12 opacity-0"
               style={{ opacity: likeOpacity, transform: `scale(${likeScale}) rotate(-12deg)` }}
            >
               <span className="text-6xl font-black text-[#4fd1c5] tracking-widest uppercase drop-shadow-[0_0_15px_rgba(79,209,197,0.8)]">
                  MATCH
               </span>
            </div>
            
             {/* NOPE OVERLAY (Red) */}
            <div 
               className="absolute top-12 right-12 border-[8px] border-[#ff4757] rounded-xl px-4 py-2 transform rotate-12 opacity-0"
               style={{ opacity: nopeOpacity, transform: `scale(${nopeScale}) rotate(12deg)` }}
            >
               <span className="text-6xl font-black text-[#ff4757] tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,71,87,0.8)]">
                  PASS
               </span>
            </div>
            
            {/* Flash Effect on trigger */}
            <div 
               className={`absolute inset-0 bg-[#4fd1c5]/20 mix-blend-overlay pointer-events-none transition-opacity duration-300 ${xPos > 200 ? 'opacity-100' : 'opacity-0'}`}
            />
             <div 
               className={`absolute inset-0 bg-[#ff4757]/20 mix-blend-overlay pointer-events-none transition-opacity duration-300 ${xPos < -200 ? 'opacity-100' : 'opacity-0'}`}
            />

          </div>
      </div>
    </>
  );
}
