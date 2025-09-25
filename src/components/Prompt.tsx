import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function Prompt() {
  const [prompt, setPrompt] = useState<string | null>(null);

  const supabase = useSupabaseClient();

  useEffect(() => {
    (async () => {
      const today = new Date().toLocaleDateString("en-CA");
      console.log("Fetching daily prompt for date:", today);

      const { data, error } = await supabase.from("prompts").select("*");

      console.log("Query result:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        alert("Error fetching prompt");
        return;
      }

      console.log("Found prompts:", data);

      if (data && data.length > 0) {
        // Use the date as a seed for consistent daily selection
        const dateSeed = new Date(today).getTime();
        const randomIndex = Math.floor(dateSeed % data.length);
        setPrompt(data[randomIndex].prompt);
      } else {
        setPrompt("Whatever");
      }
    })();
  }, []);

  if (!prompt) return null;

  return (
    <Container>
      Today's prompt:
      <DailyPrompt>{prompt}</DailyPrompt>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 24px;
  margin: 20px auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  text-align: center;
`;

const DailyPrompt = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: 4rem;
  font-weight: 700;
  margin: 12px 0 0 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
