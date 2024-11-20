"use client";

import { Grid, FeedGrid, Prompt } from "@/types/database";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import styled from "styled-components";
import Image from "next/image";
import { X } from "@phosphor-icons/react";

export function Feed() {
  const [grids, setGrids] = useState<FeedGrid[]>([]);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    (async () => {
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
      if (gridsError) {
        console.error(gridsError);
        alert("Error fetching grids");
        return;
      }
      setGrids(grids as FeedGrid[]);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this drawing?")) return;
    const { error } = await supabase.from("grids").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("Error deleting drawing");
      return;
    }
    setGrids(grids.filter((g) => g.id !== id));
  };

  return (
    <Catalog>
      {grids.map((g) => {
        return (
          <Post key={g.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <p>Responding to: {g.prompts.prompt}</p>
              {g.profile_id === user?.id ? (
                <X size={24} color={"red"} onClick={() => handleDelete(g.id)} />
              ) : (
                <div />
              )}
            </div>
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
