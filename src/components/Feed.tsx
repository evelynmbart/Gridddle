"use client";

import { Grid, FeedGrid, Prompt } from "@/types/database";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import styled from "styled-components";
import Image from "next/image";

export function Feed() {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [grids, setGrids] = useState<FeedGrid[]>([]);
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
      setPrompt(prompt ?? null);
      const { data: grids, error: gridsError } = await supabase
        .from("grids")
        .select(
          `
          *,
          profiles:profile_id (
            *
          ),
          prompts:prompt_id (
            *
          )
        `
        )
        .order("created_at", { ascending: false });
      console.log(grids);
      if (gridsError) {
        console.error(gridsError);
        alert("Error fetching grids");
        return;
      }
      setGrids(grids as FeedGrid[]);
    })();
  }, []);

  return (
    <Catalog>
      {grids.map((g) => {
        return (
          <Post key={g.id}>
            <p>Responding to: {g.prompts.prompt}</p>
            <CanvasContainer>
              <Canvas editable={false} grid={g.grid} />
            </CanvasContainer>
            <PostInfo>
              <Top>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AvatarContainer>
                    <Canvas editable={false} grid={g.profiles.avatar_grid} />
                  </AvatarContainer>
                  <h4>{g.profiles.username ?? "Anonymous"}</h4>
                </div>
                <div>
                  {new Date(g.created_at).getTime() > Date.now() - 1000 * 60
                    ? "just now"
                    : new Date(g.created_at).getTime() >
                      Date.now() - 1000 * 60 * 60
                    ? `${Math.floor(
                        (Date.now() - new Date(g.created_at).getTime()) /
                          (1000 * 60)
                      )}m ago`
                    : new Date(g.created_at).getTime() >
                      Date.now() - 1000 * 60 * 60 * 24
                    ? `${Math.floor(
                        (Date.now() - new Date(g.created_at).getTime()) /
                          (1000 * 60 * 60)
                      )}h ago`
                    : `${Math.floor(
                        (Date.now() - new Date(g.created_at).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}d ago`}
                </div>
              </Top>
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
  background-color: black;
  padding: 10px;
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

const AvatarContainer = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;
