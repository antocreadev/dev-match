"use client";

import Link from "next/link";
import { SoundManager } from "@/components/sound-manager";
import { useEffect } from "react";

export default function Featured() {
  useEffect(() => {
    SoundManager.init();
  }, []);

  // Anthony's profile - hard-coded featured developer
  const anthony = {
    id: "antocreadev",
    name: "Anthony Menghi",
    title: "Full-Stack Developer | Creative Thinker & Entrepreneur",
    age: 22,
    location: "Nice, France",
    nationality: "🇫🇷",
    image: "/anthony.png",
    tagline: "Building innovative solutions with passion and precision",
    bio: "I am a Full-stack developer with a Master's degree in Full Stack Web and Mobile Development. My expertise covers both front-end and back-end development, enabling me to design complete, high-performance applications tailored to current market needs. Passionate, determined, and always eager to learn, I continue to refine my skills in this constantly evolving field to stay at the forefront of web and mobile technologies.",
    
    skills: {
      frontend: ["React", "Next.js", "Solid.js", "Astro", "Tailwind", "Redux Toolkit"],
      backend: ["Node.js", "Python", "PHP", "FastAPI", "Laravel", "gRPC"],
      languages: ["TypeScript", "JavaScript", "Python", "PHP", "HTML5", "CSS3", "SQL", "Bash"],
      tools: ["Git", "Docker", "Figma", "Illustrator", "Photoshop"],
      databases: ["PostgreSQL", "Qdrant (Vector DB)"],
      mobile: ["React Native", "Expo"]
    },
    
    education: {
      degree: "Master 2 in Computer Science",
      field: "Full Stack Web & Mobile Development",
      school: "Università di Corsica",
      period: "2023 - 2025"
    },
    
    achievements: [
      {
        title: "Co-founder of Mindlet 🐙",
        description: "First social network dedicated to collaborative learning"
      },
      {
        title: "DataVi'Z Competition Winner",
        description: "Life Expectancy Data Visualization project"
      },
      {
        title: "GOLIAT Project Developer",
        description: "International-scale geolocation interface for drones"
      }
    ]
  };

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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted transition font-medium text-sm hover:scale-105"
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
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg hover:scale-110 transition"
            >
              👤
            </Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
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
                  {featuredProfile.age} • 📍 {featuredProfile.place_of_birth} {featuredProfile.nationality}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-foreground">🏆 {featuredProfile.biggest_achievement}</p>
                <p className="text-sm text-muted-foreground italic">💡 {featuredProfile.fun_fact}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div className="text-center hover:scale-110 transition">
                  <div className="text-3xl font-bold text-primary">
                    {featuredProfile.rating?.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center hover:scale-110 transition">
                  <div className="text-3xl font-bold text-secondary">
                    {featuredProfile.followers?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
              </div>

              {/* Coding Strengths */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  💪 Coding Strengths
                </h3>
                <div className="flex flex-wrap gap-2">
                  {featuredProfile.coding_strengths.map((strength, i) => (
                    <span
                      key={strength}
                      className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-light hover:bg-primary hover:text-primary-foreground transition"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {strength}
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
