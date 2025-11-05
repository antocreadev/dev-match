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
      frontend: [
        "React",
        "Next.js",
        "Solid.js",
        "Astro",
        "Tailwind",
        "Redux Toolkit",
      ],
      backend: ["Node.js", "Python", "PHP", "FastAPI", "Laravel", "gRPC"],
      languages: [
        "TypeScript",
        "JavaScript",
        "Python",
        "PHP",
        "HTML5",
        "CSS3",
        "SQL",
        "Bash",
      ],
      tools: ["Git", "Docker", "Figma", "Illustrator", "Photoshop"],
      databases: ["PostgreSQL", "Qdrant (Vector DB)"],
      mobile: ["React Native", "Expo"],
    },

    education: {
      degree: "Master 2 in Computer Science",
      field: "Full Stack Web & Mobile Development",
      school: "Università di Corsica",
      period: "2023 - 2025",
    },

    achievements: [
      {
        title: "Co-founder of Mindlet 🐙",
        description: "First social network dedicated to collaborative learning",
      },
      {
        title: "DataVi'Z Competition Winner",
        description: "Life Expectancy Data Visualization project",
      },
      {
        title: "GOLIAT Project Developer",
        description: "International-scale geolocation interface for drones",
      },
    ],
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
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Column */}
            <div className="flex justify-center items-start">
              <div className="rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up sticky top-24 w-full max-w-md">
                <img
                  src={anthony.image}
                  alt={anthony.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6 animate-fade-in-up">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="text-6xl font-bold text-foreground">
                  {anthony.name}
                </h1>
                <p className="text-2xl text-primary font-semibold">
                  {anthony.title}
                </p>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <span>📍 {anthony.location}</span>
                  <span>•</span>
                  <span>{anthony.nationality}</span>
                  <span>•</span>
                  <span>{anthony.age} years old</span>
                </p>
              </div>

              {/* Tagline */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <p className="text-xl font-medium text-foreground italic">
                  "{anthony.tagline}"
                </p>
              </div>

              {/* Bio */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>👨‍💻</span> About Me
                </h2>
                <p className="text-foreground leading-relaxed">{anthony.bio}</p>
              </div>

              {/* Education */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>🎓</span> Education
                </h2>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {anthony.education.degree}
                  </h3>
                  <p className="text-lg text-foreground">
                    {anthony.education.field}
                  </p>
                  <p className="text-muted-foreground">
                    {anthony.education.school}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {anthony.education.period}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              🏆 Key Achievements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {anthony.achievements.map((achievement, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              💼 Featured Projects
            </h2>

            {/* Mindlet Project */}
            <div className="bg-card rounded-3xl p-8 border border-border mb-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Mindlet - Learning Application 🐙
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    SAS MINDLET • Production • 2025
                  </p>
                </div>
                <span className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-bold border border-green-500/20">
                  LIVE
                </span>
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                First social network dedicated to collaborative learning,
                combining proven pedagogical methods with the power of
                artificial intelligence. The platform enables users to learn,
                share, and memorize effectively while relying on an active
                community.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    🛠️ Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Laravel REST API",
                      "Python ML/NLP",
                      "Next.js",
                      "React Native",
                      "gRPC",
                      "PostgreSQL",
                      "Qdrant",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    🎯 Key Features
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI-powered learning recommendations</li>
                    <li>• Collaborative study sessions</li>
                    <li>• Cross-platform mobile & web</li>
                    <li>• B2B gRPC server integration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Life Expectancy Project */}
            <div className="bg-card rounded-3xl p-8 border border-border mb-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Life Expectancy - Data Visualization
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Academic Project • DataVi'Z Winner • 2024
                  </p>
                </div>
                <span className="px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-bold border border-yellow-500/20">
                  AWARD
                </span>
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                Developed an interactive data visualization website featuring
                charts using World Bank data. The project demonstrates advanced
                data sorting algorithms and structure implementation, won the
                DataVi'Z competition.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "Python",
                  "Data Structures",
                  "D3.js",
                  "Interactive Charts",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium border border-secondary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* GOLIAT Project */}
            <div className="bg-card rounded-3xl p-8 border border-border mb-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Argos - GOLIAT Project
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Enterprise Work • International Scale • 2023
                  </p>
                </div>
                <span className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-bold border border-blue-500/20">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                Designed a complete interface with authentication, data export,
                and visualization for a hotspot geolocation tool using infrared
                images captured by drones. International-scale project requiring
                high performance and precision.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    🛠️ Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["FastAPI", "Python", "Next.js", "Docker", "Bash"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    🎯 Responsibilities
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• REST API authentication</li>
                    <li>• UI/UX design implementation</li>
                    <li>• Geographic data visualization</li>
                    <li>• Containerization & automation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Portable Code Machine */}
            <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-primary mb-1">
                  Portable Code Machine - Compiler
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  Academic Project • 2023
                </p>
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                Created a complete compiler and interpreter for a portable code
                machine, including lexical analysis, syntax parsing, abstract
                syntax tree generation, and interpretation.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "Deno",
                  "Next.js",
                  "Redux Toolkit",
                  "Compiler Design",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              💪 Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span>🎨</span> Frontend Development
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anthony.skills.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span>⚙️</span> Backend Development
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anthony.skills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <span>📝</span> Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anthony.skills.languages.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>🛠️</span> Tools & Others
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...anthony.skills.tools,
                    ...anthony.skills.databases,
                    ...anthony.skills.mobile,
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
