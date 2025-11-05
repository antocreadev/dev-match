"use client";

import Link from "next/link";
import { mockProfiles } from "@/lib/mock-data";
import { SoundManager } from "@/components/sound-manager";
import { useEffect } from "react";

export default function Featured() {
  const featuredProfile = mockProfiles[0];

  useEffect(() => {
    SoundManager.init();
  }, []);

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

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Badge */}
          <div className="flex justify-center mb-8 animate-float-up">
            <div className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-primary-foreground font-semibold">
              ⭐ Developer of the Year
            </div>
          </div>

          {/* Main Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
              <img
                src={featuredProfile.image || "/placeholder.svg"}
                alt={featuredProfile.name}
                className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Info */}
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-2">
                  {featuredProfile.name}
                  {featuredProfile.verified && <span className="ml-2">✓</span>}
                </h1>
                <p className="text-xl text-muted-foreground font-light">
                  {featuredProfile.age} • {featuredProfile.location}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-lg text-foreground">{featuredProfile.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div className="text-center hover:scale-110 transition">
                  <div className="text-3xl font-bold text-primary">
                    {featuredProfile.rating}
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center hover:scale-110 transition">
                  <div className="text-3xl font-bold text-secondary">
                    {featuredProfile.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  Interests & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {featuredProfile.interests.map((interest, i) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-light hover:bg-primary hover:text-primary-foreground transition"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => SoundManager.play("like")}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-lg hover:scale-105 transition active:scale-95"
                >
                  ♥ Like Profile
                </button>
                <button
                  onClick={() => SoundManager.play("click")}
                  className="flex-1 px-6 py-3 border border-border text-foreground rounded-full font-medium hover:bg-muted transition hover:scale-105 active:scale-95"
                >
                  💬 Message
                </button>
              </div>
            </div>
          </div>

          {/* Why Featured */}
          <div className="bg-muted/50 rounded-2xl p-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why Featured?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🚀",
                  title: "Top Contributor",
                  desc: "Leading open-source projects with 10K+ stars on GitHub",
                },
                {
                  icon: "🏆",
                  title: "Award Winner",
                  desc: "Recognized for innovation and excellence in tech",
                },
                {
                  icon: "🌟",
                  title: "Community Leader",
                  desc: "Mentors 50+ junior developers and speaks at conferences",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="space-y-2 hover:scale-105 transition cursor-pointer"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
