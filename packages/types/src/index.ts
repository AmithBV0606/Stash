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
