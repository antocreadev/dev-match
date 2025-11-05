import profilesData from "./profiles.json";

export interface Profile {
  id: string;
  name: string;
  age: number;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  image: string | null;
  coding_strengths: string[];
  coding_weaknesses: string[];
  biggest_achievement: string;
  fun_fact: string;
  // Computed properties for display
  rating?: number;
  followers?: number;
  verified?: boolean;
}

// Transform JSON data with computed fields
export const mockProfiles: Profile[] = profilesData.map((profile) => ({
  ...profile,
  rating: 4.5 + Math.random() * 0.5,
  followers: Math.floor(1000 + Math.random() * 4000),
  verified: true,
}));

export const interests = [
  "Web Dev",
  "Backend",
  "Frontend",
  "Full-Stack",
  "Mobile Dev",
  "Data Science",
  "AI/ML",
  "DevOps",
  "Cloud",
  "Security",
  "Open Source",
  "Gaming",
  "Design",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Entrepreneurship",
];
