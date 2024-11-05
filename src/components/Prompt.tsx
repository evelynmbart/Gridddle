import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

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
    <div>
      <h1>Today's prompt: {prompt}</h1>
    </div>
  );
}
