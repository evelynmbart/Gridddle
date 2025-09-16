"use client";

import { FeedGrid } from "@/types/database";
import { X } from "@phosphor-icons/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Canvas } from "./Canvas";

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
                width: "100%",
                marginBottom: "12px",
              }}
            >
              {g.prompts !== null ? (
                <PromptBadge>
                  <span style={{ fontSize: "1.5rem", opacity: 0.7 }}>
                    Responding to:
                  </span>
                  <span style={{ fontWeight: "600" }}>{g.prompts.prompt}</span>
                </PromptBadge>
              ) : (
                <PromptBadge>
                  <span style={{ fontSize: "1.5rem", opacity: 0.7 }}>
                    Responding to:
                  </span>
                  <span style={{ fontWeight: "600" }}>Whatever</span>
                </PromptBadge>
              )}
              {g.profile_id === user?.id && (
                <DeleteButton onClick={() => handleDelete(g.id)}>
                  <X size={30} color={"#dc3545"} />
                </DeleteButton>
              )}
            </div>
            <CanvasContainer>
              <Canvas editable={false} grid={g.grid} />
            </CanvasContainer>
            <PostInfo>
              <Bottom>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AvatarContainer>
                    <Canvas
                      editable={false}
                      grid={g.profiles.avatar_grid}
                      size={40}
                    />
                  </AvatarContainer>
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "1.5rem",
                        fontWeight: "600",
                      }}
                    >
                      {g.profiles.username ?? "Anonymous"}
                    </h4>
                  </div>
                </div>
                <TimeStamp>
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
                </TimeStamp>
              </Bottom>
            </PostInfo>
          </Post>
        );
      })}
    </Catalog>
  );
}

const Catalog = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  gap: 24px;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 200px);
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 400px);
    padding: 16px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 12px;
    gap: 12px;
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  aspect-ratio: 1;
  width: 400px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 16px;
  }
`;

const PostInfo = styled.div`
  width: 100%;
  margin-top: 16px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: white;
`;

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const PromptBadge = styled.div`
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 1.55rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 400px;
`;

const DeleteButton = styled.button`
  background-color: black;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 0.2);
    transform: scale(1.05);
  }
`;

const TimeStamp = styled.div`
  font-size: 1.5rem;
  color: #6c757d;
  font-weight: 500;
`;
