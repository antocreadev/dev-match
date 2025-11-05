"use client";

import { useState, useEffect } from "react";
import { mockProfiles, type Profile } from "@/lib/mock-data";
import { SwipeCard } from "@/components/swipe-card";
import { SoundManager } from "@/components/sound-manager";
import Link from "next/link";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setProfiles(mockProfiles);
    SoundManager.init();
  }, []);

  const handleSwipeLeft = () => {
    setTimeout(() => {
      if (currentIndex + 1 >= profiles.length) {
        setIsFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 300);
  };

  const handleSwipeRight = () => {
    setTimeout(() => {
      if (currentIndex + 1 >= profiles.length) {
        setIsFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const currentProfile = profiles[currentIndex];

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
      <div className="pt-20 pb-20 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm">
          {isFinished ? (
            <div className="text-center space-y-6 animate-scale-in-gently">
              <div className="text-6xl animate-float-up">🎉</div>
              <h2 className="text-3xl font-bold text-foreground">All Done!</h2>
              <p className="text-muted-foreground font-light">
                You've seen all {profiles.length} developers. Come back tomorrow
                for more matches!
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-lg hover:scale-105 transition active:scale-95"
              >
                Start Over
              </button>
            </div>
          ) : (
            <>
              {/* Cards Stack */}
              <div className="relative h-[600px] mb-8">
                {/* Background Stack Cards */}
                {[2, 1].map((offset) => {
                  const profileIndex = currentIndex + offset;
                  const profile = profiles[profileIndex];
                  if (!profile) return null;

                  return (
                    <div
                      key={offset}
                      className="absolute inset-0 rounded-3xl bg-card border border-border shadow-lg overflow-hidden animate-scale-in-gently"
                      style={{
                        transform: `translateY(${offset * 8}px) scale(${
                          1 - offset * 0.02
                        })`,
                        zIndex: -offset,
                      }}
                    >
                      <img
                        src={profile.image || "/placeholder.svg"}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}

                {/* Current Card */}
                {currentProfile && (
                  <SwipeCard
                    profile={currentProfile}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                  />
                )}
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
                <span className="font-semibold">{currentIndex + 1}</span> of{" "}
                <span className="font-semibold">{profiles.length}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
