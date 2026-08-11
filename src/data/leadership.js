import { Code2, Megaphone } from "lucide-react";

export const LEADERSHIP = [
  {
    slug: "technology",
    owner: {
      name: "Owner One",
      role: "Co-founder & Technology Lead",
      initials: "O1",
      statement: "Turning ambitious product ideas into dependable digital systems.",
    },
    department: "Product & Engineering",
    summary: "Product thinking, experience design, and engineering working as one delivery unit.",
    icon: Code2,
    tone: "blue",
    members: [
      { name: "Team Member", role: "Product Manager", initials: "PM", bio: "Shapes product direction, priorities, and delivery around real customer and business outcomes." },
      { name: "Team Member", role: "UI/UX Designer", initials: "UX", bio: "Turns complex journeys into thoughtful, accessible, and beautifully coherent experiences." },
      { name: "Team Member", role: "Lead Engineer", initials: "LE", bio: "Guides architecture and engineering quality from the first decision through production." },
      { name: "Team Member", role: "Software Engineer", initials: "SE", bio: "Builds dependable product features with care for performance, clarity, and maintainability." },
    ],
  },
  {
    slug: "business",
    owner: {
      name: "Owner Two",
      role: "Co-founder & Business Lead",
      initials: "O2",
      statement: "Connecting people, opportunities, and operations around meaningful growth.",
    },
    department: "Growth & Operations",
    summary: "Growth, client success, and people operations aligned around lasting partnerships.",
    icon: Megaphone,
    tone: "violet",
    members: [
      { name: "Team Member", role: "Growth Strategist", initials: "GS", bio: "Finds focused opportunities that connect company capability with meaningful market needs." },
      { name: "Team Member", role: "Marketing Specialist", initials: "MS", bio: "Builds clear stories and campaigns that help the right audiences understand our work." },
      { name: "Team Member", role: "People & Culture", initials: "PC", bio: "Creates the environment, systems, and support that help talented people do their best work." },
      { name: "Team Member", role: "Client Success", initials: "CS", bio: "Keeps partnerships connected, transparent, and consistently focused on valuable outcomes." },
    ],
  },
];
