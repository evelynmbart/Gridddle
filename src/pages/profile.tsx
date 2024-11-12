import styled from "styled-components";
import { Navbar } from "@/components/NavbarNew";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useData } from "dotting";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "Evelyn",
    bio: "hello",
  });

  return (
    <>
      <Navbar />
      <Container>
        <Top>
          <Avatar>
            <Image
              src="/images/eraser.png"
              width={200}
              height={200}
              alt="profile image"
            />
            <UserInfo>
              <h1>
                {userData.username}
                {isEditing && (
                  <input
                    type="text"
                    required
                    value={userData.username}
                    style={{ height: "30px", backgroundColor: "gainsboro" }}
                  />
                )}
              </h1>
              <p>
                Bio: {userData.bio}
                {isEditing && (
                  <textarea
                    value={userData.bio}
                    style={{
                      backgroundColor: "gainsboro",
                      height: "50px",
                      maxWidth: "300px",
                      maxHeight: "100px",
                    }}
                  />
                )}
              </p>
            </UserInfo>
          </Avatar>

          <Edit onClick={() => setIsEditing(!isEditing)}>Edit profile</Edit>
        </Top>
        <Bottom>
          <Tab></Tab>
          <Previous></Previous>
          <Friends></Friends>
        </Bottom>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const Top = styled.div`
  height: 300px;
  display: flex;
  border-bottom: 2px solid black;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  align-items: center;
  object-contain: contain;
  margin-left: 5%;
  gap: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

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
    max-width: 500px;
    max-height: 100px;
  }

  p {
    font-size: 1.7rem;
    display: flex;
    align-items: center;
  }
`;

const Edit = styled.button`
  background-color: black;
  color: white;
  border: 2px solid black;
  padding: 5px 10px;
  font-family: "Tiny5";
  font-size: 20px;
  height: 15%;
  margin-right: 5%;

  &:hover {
    border: 2px solid goldenrod;
  }
`;

const Bottom = styled.div``;

const Tab = styled.div``;

const Previous = styled.div``;

const Friends = styled.div``;
