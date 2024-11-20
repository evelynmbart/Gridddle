export interface Grid {
  id: string;
  created_at: string;
  profile_id: string;
  grid: string[][];
  prompt_id: string;
}

export interface Prompt {
  id: string;
  day: string; // ISO date string
  prompt: string;
  colors: string[];
}

export interface Profile {
  id: string;
  username: string;
  avatar_grid: string[][];
}

export interface FeedGrid extends Grid {
  profiles: Profile;
  prompts: Prompt;
}
