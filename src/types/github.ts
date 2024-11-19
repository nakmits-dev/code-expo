export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  error?: string;
}