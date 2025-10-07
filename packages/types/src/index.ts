import { type LucideIcon } from "lucide-react";

export interface CustomUser {
  name: string;
  email: string;
  number?: string | null;
  image?: string | null;
  oauth_id: string;
  provider: "Google";
}

export interface CustomSession extends CustomUser {
  id: string;
}

export interface CustomNavigation {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  // items?: {
  //   title: string;
  //   url: string;
  // }[];
}
