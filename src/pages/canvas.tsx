"use client";

import { Canvas } from "@/components/Canvas";
import { Prompt } from "@/components/Prompt";
import { SignIn } from "@/components/SignIn";
import { Tools } from "@/components/Tools";
import { serializeCanvas } from "@/utils/canvas";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DottingRef, useData, useDotting } from "dotting";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function CanvasPage() {
  const [promptID, setPromptID] = useState<string | null>(null);

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
      setPromptID(data?.[0]?.id ?? null);
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
      prompt_id: promptID
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
    <div>
      <Prompt />
      {user && (
        <div>
          You must sign in to save your drawings:
          <SignIn />
        </div>
      )}
      <SketchBook>
        <SketchArea>
          <Canvas ref={canvasRef} editable={!!user} />
        </SketchArea>
        <Tools onSave={handleSave} onClear={handleClear} />
      </SketchBook>
    </div>
  );
}

const SketchBook = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
  background-color: #fffdf8;
  border-radius: 0 0 5px 5px;
  min-height: 615px;
  border: 4px solid #222831;
  margin-bottom: 2%;
  border-radius: 0 0 10px 10px;
  border: 3px solid black;
`;

const SketchArea = styled.div`
  background: #222831;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
