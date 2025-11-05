"use client";

import { useState, useMemo } from "react";
import { mockProfiles, interests } from "@/lib/mock-data";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Browse() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [sortBy, setSortBy] = useState<"rating" | "followers" | "recent">(
    "rating"
  );

  const filteredProfiles = useMemo(() => {
    const filtered = mockProfiles.filter((profile) => {
      const ageMatch = profile.age >= ageRange[0] && profile.age <= ageRange[1];
      const interestMatch =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) =>
          profile.coding_strengths.some(strength => strength.toLowerCase().includes(interest.toLowerCase()))
        );
      return ageMatch && interestMatch;
    });

    // Sort
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

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <h2 className="text-lg font-bold mb-6">Filters</h2>

              {/* Age Range */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block">
                  Age: {ageRange[0]} - {ageRange[1]}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={ageRange[0]}
                    onChange={(e) =>
                      setAgeRange([
                        Number.parseInt(e.target.value),
                        ageRange[1],
                      ])
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={ageRange[1]}
                    onChange={(e) =>
                      setAgeRange([
                        ageRange[0],
                        Number.parseInt(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block">
                  Sort By
                </label>
                <div className="space-y-2">
                  {(["rating", "followers", "recent"] as const).map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sort"
                          value={option}
                          checked={sortBy === option}
                          onChange={(e) =>
                            setSortBy(e.target.value as typeof sortBy)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm capitalize">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.slice(0, 12).map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={cn(
                        "text-xs px-3 py-1 rounded-full transition",
                        selectedInterests.includes(interest)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      )}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="lg:col-span-3">
            {filteredProfiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/profile/${profile.id}`}
                    className="group"
                  >
                    <div className="relative h-80 rounded-2xl overflow-hidden bg-card border border-border hover:border-primary transition cursor-pointer">
                      <img
                        src={profile.image || "/placeholder.svg"}
                        alt={profile.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                      {/* Info on hover */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition text-white">
                        <h3 className="text-xl font-bold">
                          {profile.name}, {profile.age}
                        </h3>
                        <p className="text-sm text-gray-200">
                          📍 {profile.place_of_birth} {profile.nationality}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex-1 bg-primary text-primary-foreground py-2 rounded-full text-sm font-medium hover:shadow-lg transition flex items-center justify-center gap-2"
                          >
                            <Heart className="w-4 h-4" />
                            Like
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-full text-sm font-medium hover:shadow-lg transition flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Chat
                          </button>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-bold flex items-center gap-1">
                          ⭐ {profile.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">
                    No profiles match your filters
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
