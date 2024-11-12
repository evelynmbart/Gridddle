"use client";

import { Grid, Prompt } from "@/types/database";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import styled from "styled-components";
import Image from "next/image";

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
        .eq("prompt_id", prompt.id)
        .order("created_at", { ascending: false });
      if (gridsError) {
        console.error(gridsError);
        alert("Error fetching grids");
        return;
      }
      setGrids(grids as Grid[]);
    })();
  }, []);

  return (
    <Catalog>
      {grids.map((g) => {
        return (
          <Post key={g.id}>
            <CanvasContainer>
              <Canvas editable={false} grid={g.grid} />
            </CanvasContainer>
            <PostInfo>
              <Top>
                <h4>{g.email}</h4>
                <Image
                  src="/images/heart.png"
                  width={30}
                  height={30}
                  alt="heart"
                />
              </Top>
              <Bottom>
                <p>9 hours ago</p>
                <p>Likes: 203</p>
              </Bottom>
            </PostInfo>
          </Post>
        );
      })}
    </Catalog>
  );
}

const Catalog = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
  margin: 20px 200px;
`;

const Post = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border: 2px solid black;
  height: 355px;
  background-color: black;
  color: white;
`;

const PostInfo = styled.div`
  width: 94%;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;
