"use client";

import { Canvas } from "@/components/Canvas";
import { Prompt } from "@/components/Prompt";
import { Tools } from "@/components/Tools";
import { useCanvasStore } from "@/stores/canvas";
import { serializeCanvas } from "@/utils/canvas";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DottingRef, useData, useDotting } from "dotting";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";

export default function CanvasPage() {
  const { prompt, setPrompt } = useCanvasStore();

  const canvasRef = useRef<DottingRef>(null);
  const canvasData = useData(canvasRef as MutableRefObject<DottingRef>);
  const canvasControls = useDotting(canvasRef as MutableRefObject<DottingRef>);

  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  // Fetch the daily prompt
  useEffect(() => {
    (async () => {
      const today = new Date().toLocaleDateString("en-CA");
      console.log("Canvas: Fetching daily prompt for date:", today);

      const { data, error } = await supabase.from("prompts").select("*");

      console.log("Canvas: Query result:", { data, error });

      if (error) {
        console.error("Canvas: Supabase error:", error);
        alert("Error fetching prompt");
        return;
      }

      console.log("Canvas: Found prompts:", data);

      if (data && data.length > 0) {
        // Use the date as a seed for consistent daily selection
        const dateSeed = new Date(today).getTime();
        const randomIndex = Math.floor(dateSeed % data.length);
        setPrompt(data[randomIndex]);
      } else {
        setPrompt(null);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save your drawing");
      return;
    }
    const data = serializeCanvas(canvasData.dataArray);
    const { error } = await supabase.from("grids").insert({
      profile_id: user.id,
      grid: data,
      prompt_id: prompt?.id,
    });
    if (error) {
      console.error(error);
      alert("Error saving your drawing");
      return;
    }
    router.push("/");
  };

  const handleClear = () => {
    canvasControls.clear();
  };

  return (
    <>
      {!user && <div>You must sign in to save your drawings:</div>}
      <Prompt />
      <Container>
        <Canvas ref={canvasRef} editable={!!user} />
        <Tools onSave={handleSave} onClear={handleClear} />
      </Container>
    </>
  );
}

// const Page = styled.div`
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  gap: 24px;
  max-width: 1200px;
  width: 100%;
`;
