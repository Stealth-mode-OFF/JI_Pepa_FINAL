export type SocialPlatform = "instagram" | "whatsapp";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  description?: string;
};

const socials: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/jazyk.a.integrace/",
    description: "— Daily micro-lessons",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/420601177208",
    description: "— Instant answers & support",
  },
];

export default socials;
