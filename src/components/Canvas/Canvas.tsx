import styled from "styled-components";
import { Navbar } from "../Canvas/Navbar";
import { SideBar } from "./Sidebar";

export function Canvas() {
  return (
    <Container>
      <Navbar />
      <SketchBook>
        {/* <SketchArea></SketchArea>
        <SideBar /> */}
      </SketchBook>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SketchBook = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
  background-color: #fffdf8;
  box-shadow: 10px 10px 20px black;
  border-radius: 0 0 10px 10px;
`;

// const SketchArea = styled.div`
//   background-color: white;
//   height: 100%;
//   width: 70%;
//   border-radius: 10px;
// `;
//  display: flex;
// height: 80vh;
// width: 70vw;
// background-color: gray;
// border-radius: 20px;
// padding: 20px;
