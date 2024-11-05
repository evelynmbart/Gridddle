export interface Grid {
  id: string;
  created_at: string;
  email: string;
  grid: string[][];
  prompt_id: string;
}

export interface Prompt {
  id: string;
  day: string; // ISO date string
  prompt: string;
  colors: string[];
}
