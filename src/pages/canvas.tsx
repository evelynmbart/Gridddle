"use client";

import { Canvas } from "@/components/Canvas";
import { Navbar } from "@/components/NavbarNew";
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

  // Fetch the prompt for the current day
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
      setPrompt(data?.[0] ?? null);
    })();
  }, []);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save your drawing");
      return;
    }
    const data = serializeCanvas(canvasData.dataArray);
    const { error } = await supabase.from("grids").insert({
      email: user.email,
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
      <Navbar />
      {!user && <div>You must sign in to save your drawings:</div>}
      <Container>
        <PromptDisplay>
          Today's prompt: {prompt?.prompt ?? "whatever"}
        </PromptDisplay>
        <Canvas ref={canvasRef} editable={!!user} />
        <Tools onSave={handleSave} onClear={handleClear} />
      </Container>
    </>
  );
}

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const PromptDisplay = styled.h2`
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;
