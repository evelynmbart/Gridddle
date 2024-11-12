import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function Prompt() {
  const [prompt, setPrompt] = useState<string | null>(null);

  const supabase = useSupabaseClient();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("day", new Date().toLocaleDateString("en-CA"));
      if (error) {
        console.error(error);
        alert("Error fetching prompt");
        return;
      }
      setPrompt(data?.[0]?.prompt ?? "whatever");
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
  font-size: 36px;
`;

const DailyPrompt = styled.h1`
  color: white;
  text-transform: uppercase;
`;
