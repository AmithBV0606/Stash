export interface GoogleUser {
  id?: string | null;
  name: string;
  email: string;
  image?: string | null;
  token?: string | null;
}

export interface CustomUser {
  name: string;
  email: string;
  number?: string | null;
  image?: string | null;
  oauth_id: string;
  provider: "Google";
}
