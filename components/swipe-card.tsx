"use client";

import { useRef, useEffect, useState } from "react";
import type { Profile } from "@/lib/mock-data";
import Link from "next/link";
import { SoundManager } from "./sound-manager";
import { ParticleSystem } from "./particle-system";

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
  const [yPos, setYPos] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [particleEffect, setParticleEffect] = useState<{
    type: "heart" | "cross";
    x: number;
    y: number;
  } | null>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "translateX(0) translateY(0) rotate(0deg) scale(1)";
      cardRef.current.style.opacity = "1";
      cardRef.current.style.transition =
        "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      setXPos(0);
      setYPos(0);
      setStartX(0);
      setStartY(0);
      setParticleEffect(null);
    }
  }, [profile.id]);

  useEffect(() => {
    SoundManager.init();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let currentX = 0;
    let currentY = 0;
    let currentRotation = 0;
    let lastX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      lastX = e.clientX;
      card.style.cursor = "grabbing";
      card.style.transition = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (startX === 0) return;

      currentX = e.clientX - startX;
      currentY = (e.clientY - startY) * 0.3;
      velocityRef.current = e.clientX - lastX;
      lastX = e.clientX;

      currentRotation = (currentX / window.innerWidth) * 35;
      const scale = 1 - (Math.abs(currentX) / window.innerWidth) * 0.1;

      setXPos(currentX);
      setYPos(currentY);
      card.style.transform = `translateX(${currentX}px) translateY(${currentY}px) rotate(${currentRotation}deg) scale(${scale})`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      card.style.cursor = "grab";
      const threshold = window.innerWidth * 0.25;

      if (
        Math.abs(currentX) > threshold ||
        Math.abs(velocityRef.current) > 10
      ) {
        card.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        if (currentX > 0) {
          const finalX =
            window.innerWidth * 1.2 + Math.abs(velocityRef.current) * 2;
          card.style.transform = `translateX(${finalX}px) translateY(${
            -150 + currentY
          }px) rotate(${45 + velocityRef.current}deg) scale(0.8)`;
          card.style.opacity = "0";

          // Déclencher les particules au centre de l'écran
          const particleX = window.innerWidth / 2;
          const particleY = window.innerHeight / 2;
          console.log("❤️ Particles triggered at:", particleX, particleY);
          setParticleEffect({
            type: "heart",
            x: particleX,
            y: particleY,
          });

          SoundManager.play("swipeRight");
          SoundManager.play("like");
          setTimeout(onSwipeRight, 800); // Attendre que la carte parte et les particules commencent
        } else {
          const finalX =
            -window.innerWidth * 1.2 - Math.abs(velocityRef.current) * 2;
          card.style.transform = `translateX(${finalX}px) translateY(${
            -150 + currentY
          }px) rotate(${-45 - velocityRef.current}deg) scale(0.8)`;
          card.style.opacity = "0";

          // Déclencher les particules au centre de l'écran
          const particleX = window.innerWidth / 2;
          const particleY = window.innerHeight / 2;
          console.log("✖️ Particles triggered at:", particleX, particleY);
          setParticleEffect({
            type: "cross",
            x: particleX,
            y: particleY,
          });

          SoundManager.play("swipeLeft");
          setTimeout(onSwipeLeft, 800); // Attendre que la carte parte et les particules commencent
        }
      } else {
        card.style.transition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
        card.style.transform =
          "translateX(0) translateY(0) rotate(0deg) scale(1)";
        setXPos(0);
        setYPos(0);
      }

      setStartX(0);
      setStartY(0);
    };

    card.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      card.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [startX, startY, onSwipeLeft, onSwipeRight]);

  return (
    <>
      <div
        ref={cardRef}
        className="absolute w-full h-full rounded-3xl overflow-hidden cursor-grab shadow-2xl bg-white"
        style={{
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <div className="relative w-full h-full">
          {/* Background Image */}
          <img
            src={profile.image || "/placeholder.svg"}
            alt={profile.name}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold">
                  {profile.name},{" "}
                  <span className="text-2xl">{profile.age}</span>
                </h2>
                <p className="text-sm text-gray-200 mt-1">
                  📍 {profile.place_of_birth} {profile.nationality}
                </p>
              </div>
              <Link
                href={`/profile/${profile.id}`}
                className="text-yellow-300 hover:text-yellow-200 transition font-semibold"
                onClick={(e) => e.stopPropagation()}
              >
                ⭐ {profile.rating?.toFixed(1)}
              </Link>
            </div>

            <p className="text-sm text-gray-100 mb-3 line-clamp-2">
              🏆 {profile.biggest_achievement}
            </p>

            <p className="text-xs text-gray-200 mb-3 italic">
              💡 {profile.fun_fact}
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.coding_strengths.slice(0, 3).map((strength) => (
                <span
                  key={strength}
                  className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Action Hints */}
          {xPos > 50 && (
            <div className="absolute top-8 right-8 flex items-center gap-2 text-green-400 animate-pulse">
              <span className="text-4xl">♥</span>
              <span className="font-bold text-lg">LIKE</span>
            </div>
          )}

          {xPos < -50 && (
            <div className="absolute top-8 left-8 flex items-center gap-2 text-red-400 animate-pulse">
              <span className="text-4xl">✕</span>
              <span className="font-bold text-lg">PASS</span>
            </div>
          )}
        </div>
      </div>

      {/* Système de particules */}
      {particleEffect && (
        <ParticleSystem
          type={particleEffect.type}
          x={particleEffect.x}
          y={particleEffect.y}
          onComplete={() => setParticleEffect(null)}
        />
      )}
    </>
  );
}
