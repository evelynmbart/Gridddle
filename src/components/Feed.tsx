"use client";

import { Grid, Prompt } from "@/types/database";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createRef, useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { DottingRef } from "dotting";
import styled from "styled-components";

export function Feed() {
  const [grids, setGrids] = useState<Grid[]>([]);
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
      const prompt: Prompt | undefined = data?.[0];
      if (!prompt) return;
      const { data: grids, error: gridsError } = await supabase
        .from("grids")
        .select("*")
        .eq("prompt_id", prompt.id);
      if (gridsError) {
        console.error(gridsError);
        alert("Error fetching grids");
        return;
      }
      setGrids(grids as Grid[]);
    })();
  }, []);

  return (
    <div>
      {grids.map((g) => {
        return (
          <div key={g.id}>
            <h3>{g.email}</h3>
            <CanvasContainer>
              <Canvas editable={false} grid={g.grid} />
            </CanvasContainer>
          </div>
        );
      })}
    </div>
  );
}

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;
