interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Music Producer",
    company: "Harmony Studios",
    content: "MuvePlayer transformed how I share my music with clients. The platform's professional features and ease of use are unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Independent Artist",
    company: "Sound Collective",
    content: "The streaming quality and analytics tools have helped me grow my audience significantly. Best platform for independent artists!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Music Teacher",
    company: "Melodic Academy",
    content: "Using MuvePlayer for my online music classes has been a game-changer. The interface is intuitive and my students love it!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=face"
  }
];