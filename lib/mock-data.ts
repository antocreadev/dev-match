import profilesData from "./profiles.json";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  year: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "achievement";
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface GithubStats {
  commits: number;
  prs: number;
  stars: number;
  contributions: number[]; // Array of last 7 days for mini graph
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  age: number;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string; // Flag
  nationality_text: string;
  image: string | null;
  bio: string;
  coding_strengths: string[];
  coding_weaknesses: string[];
  biggest_achievement: string;
  fun_fact: string;
  // Rich data
  detailed_bio?: string;
  future_plans?: string;
  // Generated Content
  projects: Project[];
  timeline: TimelineItem[];
  testimonials: Testimonial[];
  github_stats: GithubStats;
  availability: "Open for work" | "Busy" | "Freelancing";
  soft_skills: string[];
  languages: { language: string; level: string }[];
  match_score: number;
  // Football Theme Fields
  transfer_fee: string; // e.g. "$120k / yr"
  market_value: string; // e.g. "€35M"
  agent_note: string; // Funny note
  club_status: "Free Agent" | "On Loan" | "Contract Expiring";
  jersey_number: number;
  // Dev Attributes (0-100)
  metrics: {
      algo: number;   // PACE -> Algorithms
      system: number; // SHO -> System Design
      test: number;   // PAS -> Testing
      ui: number;     // DRI -> UI/UX
      debug: number;  // DEF -> Debugging
      lead: number;   // PHY -> Leadership
  };
  // Computed "match" score
  verified: boolean;
  followers: number;
  rating: number;
}

// Procedural Generation Helpers
const projectTemplates = {
  frontend: [
    { title: "Neon Dashboard", tags: ["Next.js", "Tailwind", "Framer Motion"], desc: "A high-performance analytics dashboard with neon aesthetics and real-time data visualization." },
    { title: "E-Commerce Luxury", tags: ["Shopify", "React", "GSAP"], desc: "Award-winning e-commerce frontend for a luxury fashion brand featuring smooth scroll animations." },
    { title: "Social Graph UI", tags: ["D3.js", "Vue", "WebGL"], desc: "Interactive visualization of social connections using WebGL for rendering thousands of nodes." },
    { title: "AI Image Gener", tags: ["React", "OpenAI API", "Canvas"], desc: "Frontend wrapper for Stable Diffusion with a custom masking editor built in canvas." },
  ],
  backend: [
    { title: "Cloud Scale API", tags: ["Go", "gRPC", "Kubernetes"], desc: "Microservices architecture handling 10k requests/second for a fintech startup." },
    { title: "Auth Secure System", tags: ["Rust", "OAuth2", "Redis"], desc: "High-security authentication server with custom rate limiting and anomaly detection." },
    { title: "Data Pipeline V2", tags: ["Python", "Apache Airflow", "AWS"], desc: "Automated ETL pipeline processing terabytes of log data daily for business intelligence." },
    { title: "Realtime Chat Core", tags: ["Elixir", "Phoenix", "WebSockets"], desc: "The backend core for a messaging app supporting millions of concurrent connections." },
  ],
  data: [
    { title: "Predictive Market", tags: ["Python", "TensorFlow", "Pandas"], desc: "Machine learning model predicting trends with 87% accuracy based on historical data." },
    { title: "Visuaytics Engine", tags: ["R", "Shiny", "PostgreSQL"], desc: "Interactive data exploration tool allowing non-technical users to query complex datasets." },
    { title: "Fraud Detection AI", tags: ["Scikit-learn", "Kafka", "Spark"], desc: "Real-time fraud detection system analyzing transaction patterns in milliseconds." },
  ],
  mobile: [
    { title: "Fitness Tracker Pro", tags: ["React Native", "HealthKit"], desc: "Cross-platform fitness app integrating with wearable devices and providing AI coaching." },
    { title: "AR City Guide", tags: ["Swift", "ARKit", "CoreLocation"], desc: "Augmented reality navigation app for tourists highlighting historical landmarks." },
  ]
};

// Simple seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Returns number between 0 and 1
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Returns integer between min and max (inclusive)
  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  
  // Pick random item from array
  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  // Pick random subset from array
  sample<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - this.next());
    return shuffled.slice(0, count);
  }
}

const funCompanyNames = ["TechNova", "StellarLogic", "QuantumSoft", "BlueWave Digital", "FutureDynamics", "PixelCrafters"];
const universities = ["University of Technology", "Institute of Advanced Code", "Global Dev Academy", "Polytechnic of Innovation"];

function generateProjects(role: string, rng: SeededRandom): Project[] {
  let pool = projectTemplates.frontend;
  if (role.toLowerCase().includes("back")) pool = [...pool, ...projectTemplates.backend];
  if (role.toLowerCase().includes("data")) pool = projectTemplates.data;
  if (role.toLowerCase().includes("mobile")) pool = projectTemplates.mobile;
  
  // Mix in some randoms if pool is small
  if (pool.length < 3) pool = [...pool, ...projectTemplates.frontend];

  const selected = rng.sample(pool, 3);
  return selected.map(p => ({
    title: p.title,
    description: p.desc,
    tags: p.tags,
    link: "#",
    image: `https://picsum.photos/seed/${p.title.replace(" ", "")}/800/600`, // Better seed
    year: (2023 + rng.range(0, 1)).toString()
  }));
}

function generateTimeline(role: string, rng: SeededRandom) {
  const startYear = 2020 + rng.range(0, 2);
  return [
    { year: `${startYear + 3} - Present`, title: "Senior Developer", description: `Leading key projects at ${rng.pick(funCompanyNames)}.`, type: "work" },
    { year: `${startYear + 1} - ${startYear + 3}`, title: "Full Stack Developer", description: "Developed scalable web applications and mentored juniors.", type: "work" },
    { year: `${startYear} - ${startYear + 1}`, title: "Master's Degree", description: `Graduated with honors from ${rng.pick(universities)}.`, type: "education" },
    { year: `${startYear - 1}`, title: "Internship", description: "First professional experience in a fast-paced startup environment.", type: "work" },
  ] as TimelineItem[];
}

function generateTestimonials(rng: SeededRandom): Testimonial[] {
  const testimonials = [
    { name: "Sarah Connor", role: "Product Manager", quote: "One of the most talented developers I've worked with. Delivered the project ahead of schedule.", avatar: "" },
    { name: "John Wick", role: "Tech Lead", quote: "Exceptional problem-solving skills and code quality.", avatar: "" },
    { name: "Ellen Ripley", role: "CTO", quote: "A true asset to any team, consistently exceeding expectations.", avatar: "" },
  ];
  return rng.sample(testimonials, rng.range(1, 2));
}

// Transform JSON data with computed fields
export const mockProfiles: Profile[] = (profilesData as any[]).map((profile) => {
    const seededRandom = new SeededRandom(profile.id);
    
    const randomItem = <T>(arr: T[]): T => arr[Math.floor(seededRandom.next() * arr.length)];
    const randomInt = (min: number, max: number) => Math.floor(seededRandom.next() * (max - min + 1)) + min;

    // Generate Football x Tech Data
    const fees = ["$90k", "$120k", "$150k", "$180k", "$200k+", "Equity Only"];
    const values = ["€5M", "€12M", "€35M", "€80M", "€150M", "Priceless"];
    const availabilityStatus: Profile["availability"][] = ["Open for work", "Busy", "Freelancing"];
    const statuses: Profile["club_status"][] = ["Free Agent", "On Loan", "Contract Expiring"];
    const notes = [
      "Demands a standing desk in the contract.",
      "Will only play if coffee is 100% Arabica.",
      "Refuses to document legacy code.",
      "Weak foot: CSS.",
      "Can deploy to production on Fridays.",
      "Scores 100% on Lighthouse audits.",
      "Legendary git commit messages.",
      "Needs a signing bonus of 1 brand new MacBook Pro.",
      "Plays best in Dark Mode.",
      "Rejects any PR under 1000 lines (power move).",
      "Yellow carded once for breaking the build.",
    ];

    // Generate Metrics
    const metrics = {
        algo: randomInt(60, 95),
        system: randomInt(60, 95),
        test: randomInt(50, 95),
        ui: randomInt(60, 95),
        debug: randomInt(70, 99),
        lead: randomInt(50, 95),
    };

    return {
      ...profile,
      rating: 4.0 + seededRandom.next(), // 4.0 - 5.0
      followers: Math.floor(seededRandom.next() * 10000),
      verified: seededRandom.next() > 0.5,
      role: profile.role || "Software Engineer", // Fallback
      bio: profile.bio || profile.detailed_bio?.slice(0, 100) + "..." || "No bio available.",
      detailed_bio: profile.detailed_bio || "A passionate developer ready to change the world with code. Dedicated to fast, accessible, and beautiful web experiences.",
      nationality: profile.nationality,
      nationality_text: profile.nationality_text || "Unknown",
      future_plans: profile.future_plans || "To build the next big thing.",
      projects: generateProjects(profile.role || "Developer", seededRandom),
      timeline: generateTimeline(profile.role || "Developer", seededRandom),
      testimonials: generateTestimonials(seededRandom),
      github_stats: {
        commits: randomInt(100, 5000),
        prs: randomInt(10, 500),
        stars: randomInt(50, 2000),
        contributions: Array.from({ length: 12 }, () => randomInt(10, 100))
      },
      availability: randomItem(availabilityStatus),
      soft_skills: ["Leadership", "Communication", "Teamwork", "Problem Solving"].sort(() => seededRandom.next() - 0.5).slice(0, 3),
      languages: ["English", "French", "Spanish", "German"].sort(() => seededRandom.next() - 0.5).slice(0, randomInt(1, 3)).map(l => ({ language: l, level: "Fluent" })),
      match_score: randomInt(65, 99),
      // Theme Fields
      transfer_fee: randomItem(fees) + " / yr",
      market_value: randomItem(values),
      agent_note: randomItem(notes),
      club_status: randomItem(statuses),
      jersey_number: randomInt(1, 99),
      metrics, // Added Metrics
    };
});

export const interests = [
  "Web Dev", "Backend", "Frontend", "Full-Stack", "Mobile Dev", 
  "Data Science", "AI/ML", "DevOps", "Cloud", "Security",
  "Gaming", "Design", "Entrepreneurship"
];
