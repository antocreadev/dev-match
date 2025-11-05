"use client";

import { mockProfiles } from "@/lib/mock-data";
import Link from "next/link";
import { ChevronLeft, Heart, MessageCircle, Share2, Flag } from "lucide-react";
import { useState } from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = mockProfiles.find((p) => p.id === params.id);
  const [isLiked, setIsLiked] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/browse"
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="font-semibold">Back</span>
          </Link>

          <h1 className="text-xl font-bold">{profile.name}</h1>

          <button className="text-muted-foreground hover:text-foreground transition">
            ⋯
          </button>
        </div>
      </header>

      <div className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Hero Image */}
          <div className="relative h-96 rounded-3xl overflow-hidden mb-8 border border-border shadow-lg">
            <img
              src={profile.image || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Profile name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-4xl font-bold">
                {profile.name}, <span className="text-3xl">{profile.age}</span>
              </h2>
              <p className="text-lg text-gray-200 mt-2">
                📍 {profile.place_of_birth} {profile.nationality}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="text-2xl font-bold text-primary">
                {profile.followers?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="text-2xl font-bold text-accent">
                {profile.rating?.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="text-2xl font-bold text-secondary">
                {profile.verified ? "✓" : "○"}
              </div>
              <div className="text-sm text-muted-foreground">
                {profile.verified ? "Verified" : "Not Verified"}
              </div>
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h3 className="text-lg font-bold mb-3">🏆 Biggest Achievement</h3>
            <p className="text-foreground leading-relaxed">
              {profile.biggest_achievement}
            </p>
          </div>

          {/* Fun Fact */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h3 className="text-lg font-bold mb-3">💡 Fun Fact</h3>
            <p className="text-foreground leading-relaxed italic">
              {profile.fun_fact}
            </p>
          </div>

          {/* Coding Strengths */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h3 className="text-lg font-bold mb-4">💪 Coding Strengths</h3>
            <div className="flex flex-wrap gap-3">
              {profile.coding_strengths.map((strength) => (
                <span
                  key={strength}
                  className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Coding Weaknesses */}
          {profile.coding_weaknesses.length > 0 && (
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <h3 className="text-lg font-bold mb-4">🔧 Areas to Improve</h3>
              <div className="flex flex-wrap gap-3">
                {profile.coding_weaknesses.map((weakness) => (
                  <span
                    key={weakness}
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/20"
                  >
                    {weakness}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 sticky bottom-0 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 rounded-t-2xl border-t border-border">
            <button className="flex-1 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-3 rounded-full hover:shadow-lg transition font-medium">
              <Flag className="w-5 h-5" />
              Report
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full hover:shadow-lg transition font-medium"
            >
              <Heart
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
              />
              {isLiked ? "Liked" : "Like"}
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-full hover:shadow-lg transition font-medium">
              <MessageCircle className="w-5 h-5" />
              Message
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-full hover:shadow-lg transition font-medium">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
