import { Canvas } from "@/components/Canvas";
import { useCanvasStore } from "@/stores/canvas";
import { Profile } from "@/types/database";
import { serializeCanvas } from "@/utils/canvas";
import { Check, Pencil } from "@phosphor-icons/react";
import { PaintBrush } from "@phosphor-icons/react/dist/ssr";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DottingRef, useData } from "dotting";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function ProfilePage() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const { setColor } = useCanvasStore();

  const canvasRef = useRef<DottingRef>(null);
  const canvasData = useData(canvasRef as MutableRefObject<DottingRef>);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingUsername, setEditingUsername] = useState<string>("");
  const [isEditing, setIsEditing] = useState<"name" | "photo" | null>(null);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .then(({ data }) => {
        setProfile(data?.[0]);
      });
  }, [user]);

  const updateUsername = async (username: string) => {
    if (!user) return;
    try {
      await supabase.from("profiles").update({ username }).eq("id", user.id);
      setProfile({ ...profile, username } as Profile);
      setIsEditing(null);
    } catch (error) {
      alert(error);
    }
  };

  const updateAvatarGrid = async () => {
    if (!user) return;
    const dataArray = canvasRef.current?.getLayersAsArray()?.[0]?.data;
    if (!dataArray) return;
    const data = serializeCanvas(dataArray);
    try {
      await supabase
        .from("profiles")
        .update({ avatar_grid: data })
        .eq("id", user.id);
      setProfile({ ...profile, avatar_grid: data } as Profile);
      setIsEditing(null);
    } catch (error) {
      alert(error);
    }
  };

  if (!user) return null;

  return (
    <>
      <Container>
        <UserInfo>
          <h1>
            {isEditing !== "name" && (
              <>
                {profile?.username || `Unnamed User`}
                <EditButton
                  onClick={() => {
                    setIsEditing("name");
                    setEditingUsername(profile?.username ?? "");
                  }}
                >
                  <Pencil size={32} />
                </EditButton>
              </>
            )}
            {isEditing === "name" && (
              <>
                <Input
                  type="text"
                  required
                  value={editingUsername ?? ""}
                  onChange={(e) => setEditingUsername(e.currentTarget.value)}
                  style={{ height: "30px", backgroundColor: "gainsboro" }}
                />
                <EditButton onClick={() => updateUsername(editingUsername)}>
                  <Check size={32} />
                </EditButton>
              </>
            )}
          </h1>
          {profile && (
            <AvatarEditor>
              {isEditing !== "photo" && (
                <>
                  <AvatarContainer>
                    <Canvas editable={false} grid={profile?.avatar_grid} />
                  </AvatarContainer>
                  <EditButton onClick={() => setIsEditing("photo")}>
                    <Pencil size={32} />
                  </EditButton>
                </>
              )}
              {isEditing === "photo" && (
                <AvatarContainer>
                  <Canvas
                    editable
                    ref={canvasRef}
                    grid={profile?.avatar_grid}
                  />
                  <Controls>
                    {["red", "blue", "yellow", "white"].map((color) => (
                      <button
                        onClick={() => setColor(color)}
                        style={{
                          border: `3px solid ${color}`,
                          borderRadius: 5,
                        }}
                      >
                        <PaintBrush size={32} color={color} />
                      </button>
                    ))}
                    <button
                      style={{ border: "black", borderRadius: 5 }}
                      onClick={updateAvatarGrid}
                    >
                      <Check size={32} />
                    </button>
                  </Controls>
                </AvatarContainer>
              )}
            </AvatarEditor>
          )}
        </UserInfo>
      </Container>
    </>
  );
}

const EditButton = styled.button`
  background-color: transparent;
  border: 3px solid white;
  border-radius: 10px;
  color: white;
  margin-left: 10px;
`;

const Container = styled.div`
  display: flex;
  border-radius: 12px;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  padding: 60px;
  border-radius: 12px;

  gap: 10px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;

    input {
      font-family: "Tiny5";
      font-size: 36px;
      width: 300px;
    }
  }
  textarea {
    width: 300px;
    height: 50px;
  }

  p {
    font-size: 1.7rem;
    display: flex;
    align-items: center;
  }
`;

const Input = styled.input`
  font-family: "Tiny5";
  font-size: 36px;
  background-color: white !important;
  width: 300px;
  padding: 10px;
`;

const Controls = styled.div`
  position: absolute;
  top: 20px;
  right: -40px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    background-color: transparent;
  }
`;

const AvatarEditor = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  position: relative;

  ${EditButton} {
    position: absolute;
    top: 40%;
    right: -40px;
  }
`;

const AvatarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: black;
`;
