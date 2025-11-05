"use client";

import { useState, useEffect } from "react";
import { mockProfiles, type Profile } from "@/lib/mock-data";
import { SwipeCard } from "@/components/swipe-card";
import { SoundManager } from "@/components/sound-manager";
import Link from "next/link";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setProfiles(mockProfiles);
    SoundManager.init();
  }, []);

  const handleSwipeLeft = () => {
    // Passer à la carte suivante (boucle infinie)
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const handleSwipeRight = () => {
    // Passer à la carte suivante (boucle infinie)
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  if (profiles.length === 0) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md border-b border-border animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-xl">🔥</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DevMatch
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/featured"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted transition font-medium text-sm hover:scale-105"
            >
              <span>⭐</span>
              <span>Featured</span>
            </Link>
            <Link
              href="/browse"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted transition font-medium text-sm hover:scale-105"
            >
              <span>👥</span>
              <span>Browse</span>
            </Link>
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg hover:scale-110 transition">
              👤
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-20 px-4 flex items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full max-w-7xl">
          {/* Cards Carousel - Afficher toutes les cartes horizontalement */}
          <div className="relative h-[600px] mb-8 flex items-center justify-center">
            {/* Générer toutes les positions visibles */}
            {profiles.map((profile, idx) => {
              // Calculer l'offset circulaire correctement
              const totalCards = profiles.length;
              let offset = idx - currentIndex;

              // Normaliser l'offset pour la distance la plus courte
              while (offset > totalCards / 2) offset -= totalCards;
              while (offset < -totalCards / 2) offset += totalCards;

              const maxVisible = 3;
              const absOffset = Math.abs(offset);

              // Ne pas afficher les cartes trop loin
              if (absOffset > maxVisible) return null;

              // Calculer les effets visuels de manière symétrique
              const scale = 1 - absOffset * 0.15;
              const translateX = offset * 350; // Décalage horizontal
              const translateY = absOffset * 40; // Décalage vertical
              const blur = absOffset * 2.5;
              const opacity = 1 - absOffset * 0.3;
              const brightness = 1 - absOffset * 0.2;

              // Carte actuelle
              if (offset === 0) {
                return (
                  <div
                    key={profile.id}
                    className="absolute left-1/2 w-[400px] h-full"
                    style={{
                      transform: "translateX(-50%)",
                      zIndex: 100,
                      transition:
                        "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <SwipeCard
                      profile={profile}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </div>
                );
              }

              // Cartes latérales
              return (
                <div
                  key={profile.id}
                  onClick={() => {
                    // Naviguer vers cette carte
                    setCurrentIndex(idx);
                  }}
                  className="absolute left-1/2 w-[400px] h-full rounded-3xl bg-card border border-border shadow-2xl overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300"
                  style={{
                    transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) scale(${scale})`,
                    zIndex: 50 - absOffset,
                    opacity: opacity,
                    filter: `blur(${blur}px) brightness(${brightness})`,
                    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <img
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 transition-opacity duration-800"
                    style={{
                      opacity: absOffset * 0.3,
                    }}
                  />
                  {/* Indicateur de clic pour les cartes les plus proches */}
                  {absOffset === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-3xl text-white">
                          {offset > 0 ? "→" : "←"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in-up">
            <button
              onClick={handleSwipeLeft}
              className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:shadow-lg hover:scale-110 transition font-bold text-lg active:scale-95"
              title="Pass"
            >
              ✕
            </button>

            <button
              onClick={handleSwipeRight}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg hover:scale-110 transition font-bold text-lg active:scale-95"
              title="Like"
            >
              ♥
            </button>
          </div>

          <div className="text-center mt-8 text-base font-light text-foreground animate-fade-in-up">
            Viewing{" "}
            <span className="font-semibold">
              {profiles[currentIndex % profiles.length]?.name}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
