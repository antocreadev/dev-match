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
  match_score: number; // Computed "match" score
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

const funCompanyNames = ["TechNova", "StellarLogic", "QuantumSoft", "BlueWave Digital", "FutureDynamics", "PixelCrafters"];
const universities = ["University of Technology", "Institute of Advanced Code", "Global Dev Academy", "Polytechnic of Innovation"];

function getRandomSubset(arr: any[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateProjects(role: string): Project[] {
  let pool = projectTemplates.frontend;
  if (role.toLowerCase().includes("back")) pool = [...pool, ...projectTemplates.backend];
  if (role.toLowerCase().includes("data")) pool = projectTemplates.data;
  if (role.toLowerCase().includes("mobile")) pool = projectTemplates.mobile;
  
  // Mix in some randoms if pool is small
  if (pool.length < 3) pool = [...pool, ...projectTemplates.frontend];

  const selected = getRandomSubset(pool, 3);
  return selected.map(p => ({
    ...p,
    link: "#",
    image: `https://picsum.photos/seed/${p.title.replace(" ", "")}/800/600`,
    year: (2023 + Math.floor(Math.random() * 2)).toString()
  }));
}

function generateTimeline() {
  const startYear = 2020 + Math.floor(Math.random() * 2);
  return [
    { year: `${startYear + 3} - Present`, title: "Senior Developer", description: `Leading key projects at ${funCompanyNames[Math.floor(Math.random() * funCompanyNames.length)]}.`, type: "work" },
    { year: `${startYear + 1} - ${startYear + 3}`, title: "Full Stack Developer", description: "Developed scalable web applications and mentored juniors.", type: "work" },
    { year: `${startYear} - ${startYear + 1}`, title: "Master's Degree", description: `Graduated with honors from ${universities[Math.floor(Math.random() * universities.length)]}.`, type: "education" },
    { year: `${startYear - 1}`, title: "Internship", description: "First professional experience in a fast-paced startup environment.", type: "work" },
  ] as TimelineItem[];
}

// Transform JSON data with computed fields
export const mockProfiles: Profile[] = (profilesData as any[]).map((profile) => {
  const isData = profile.role.toLowerCase().includes("data");
  const isBack = profile.role.toLowerCase().includes("back");
  
  return {
    ...profile,
    role: profile.role || "Developer",
    bio: profile.bio || "Passionate developer crafting digital experiences.",
    nationality_text: profile.nationality_text || "Unknown",
    
    // Rich Generated Data
    projects: generateProjects(profile.role),
    timeline: generateTimeline(),
    testimonials: [
      { name: "Sarah Connor", role: "Product Manager", quote: "One of the most talented developers I've worked with. Delivered the project ahead of schedule.", avatar: "" },
      { name: "John Wick", role: "Tech Lead", quote: "Exceptional problem-solving skills and code quality.", avatar: "" },
    ],
    github_stats: {
      commits: Math.floor(Math.random() * 2000) + 500,
      prs: Math.floor(Math.random() * 100) + 20,
      stars: Math.floor(Math.random() * 500) + 50,
      contributions: Array.from({length: 7}, () => Math.floor(Math.random() * 15))
    },
    availability: Math.random() > 0.3 ? "Open for work" : "Busy",
    soft_skills: getRandomSubset(["Leadership", "Communication", "Mentoring", "Agile", "Public Speaking", "Design Thinking"], 4),
    languages: [
      { language: "French", level: "Native" },
      { language: "English", level: "C1 Advanced" },
      ...(Math.random() > 0.7 ? [{ language: "Spanish", level: "B2 Intermediate" }] : [])
    ],
    match_score: Math.floor(Math.random() * 15) + 85, // High scores for everyone!
    verified: true,
    followers: Math.floor(1000 + Math.random() * 4000),
    rating: 4.5 + Math.random() * 0.5,
  };
});

export const interests = [
  "Web Dev", "Backend", "Frontend", "Full-Stack", "Mobile Dev", 
  "Data Science", "AI/ML", "DevOps", "Cloud", "Security",
  "Gaming", "Design", "Entrepreneurship"
];
