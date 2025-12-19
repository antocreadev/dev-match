"use client";

import { Profile } from "./mock-data";

const STORAGE_KEY = "dev_league_squad";

export interface SquadMember extends Profile {
  signedAt: number;
}

export const SquadManager = {
  // Get all signed players
  getSquad: (): SquadMember[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Sign a player (Add to squad)
  signPlayer: (profile: Profile) => {
    if (typeof window === "undefined") return;
    const squad = SquadManager.getSquad();
    
    // checks if already signed
    if (squad.some((p) => p.id === profile.id)) return;

    const newSigning: SquadMember = { ...profile, signedAt: Date.now() };
    const newSquad = [newSigning, ...squad];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSquad));
    
    // Dispatch event for UI updates
    window.dispatchEvent(new Event("squad-update"));
  },

  // Release a player (Remove from squad)
  releasePlayer: (id: string) => {
    if (typeof window === "undefined") return;
    const squad = SquadManager.getSquad();
    const newSquad = squad.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSquad));
    
    window.dispatchEvent(new Event("squad-update"));
  },

  // Check if signed
  isSigned: (id: string): boolean => {
    if (typeof window === "undefined") return false;
    const squad = SquadManager.getSquad();
    return squad.some((p) => p.id === id);
  }
};
