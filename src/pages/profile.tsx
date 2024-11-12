import styled from "styled-components";
import { Navbar } from "@/components/NavbarNew";
import Image from "next/image";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  console.log(isEditing);
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
              style={{
                border: "2px solid black",
                backgroundColor: "gainsboro",
              }}
            />
            <UserInfo>
              <h1>
                Username:
                {/* <input type="text" required style={{ height: "30px" }} /> */}
              </h1>
              <p>Bio:</p>
            </UserInfo>
          </Avatar>

          <Edit onClick={() => setIsEditing(!isEditing)}>Edit profile</Edit>
        </Top>
        <Bottom></Bottom>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 300px;
  display: flex;
  border-bottom: 2px solid black;
  justify-content: space-between;
  align-items: center;
`;

const Bottom = styled.div``;

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
    font-size: 20px;
    display: flex;
    align-items: center;
  }
`;

const Edit = styled.button`
  background-color: gainsboro;
  color: black;
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
