export interface Profile {
  id: string
  name: string
  age: number
  image: string
  bio: string
  location: string
  interests: string[]
  rating: number
  followers: number
  verified: boolean
}

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Alex Chen",
    age: 28,
    image: "/male-developer-coding-workspace.jpg",
    bio: "Full-stack developer & open-source enthusiast. Building cool stuff with React & Node.js 🚀",
    location: "San Francisco, CA",
    interests: ["Web Dev", "Open Source", "AI/ML", "Coffee"],
    rating: 4.9,
    followers: 3200,
    verified: true,
  },
  {
    id: "2",
    name: "Sarah Kim",
    age: 26,
    image: "/female-developer-coding.jpg",
    bio: "Frontend specialist & design system enthusiast. Obsessed with UX & animations ✨",
    location: "New York, NY",
    interests: ["Frontend", "Design", "TypeScript", "Figma"],
    rating: 4.8,
    followers: 2800,
    verified: true,
  },
  {
    id: "3",
    name: "Marcus Dev",
    age: 30,
    image: "/male-developer-laptop.jpg",
    bio: "Backend engineer & DevOps enthusiast. Kubernetes & microservices expert 🐳",
    location: "Austin, TX",
    interests: ["Backend", "DevOps", "Cloud", "Gaming"],
    rating: 4.7,
    followers: 1900,
    verified: false,
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    age: 25,
    image: "/female-developer-programming.jpg",
    bio: "Data scientist & ML engineer. Passionate about AI ethics & sustainable tech 🌱",
    location: "Seattle, WA",
    interests: ["Data Science", "AI/ML", "Python", "Tech Ethics"],
    rating: 4.9,
    followers: 4100,
    verified: true,
  },
  {
    id: "5",
    name: "James Park",
    age: 29,
    image: "/male-developer-hacker.jpg",
    bio: "Security researcher & cybersecurity expert. CTF enthusiast & bug bounty hunter 🔐",
    location: "Boston, MA",
    interests: ["Security", "CTF", "Pentesting", "Gaming"],
    rating: 4.6,
    followers: 2200,
    verified: true,
  },
  {
    id: "6",
    name: "Lisa Zhang",
    age: 27,
    image: "/female-developer-workspace.jpg",
    bio: "Product engineer & startup founder. Let's build the next big thing together 💡",
    location: "Mountain View, CA",
    interests: ["Product", "Startups", "Web3", "Entrepreneurship"],
    rating: 4.8,
    followers: 3500,
    verified: true,
  },
]

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
]
