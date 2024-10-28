import styled from "styled-components";
import { Navbar } from "../Canvas/Navbar";
import { SideBar } from "./Sidebar";

export function Canvas() {
  return (
    <Container>
      <Navbar />
      <SketchBook>
        <SketchArea />
        <SideBar />
      </SketchBook>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 1000px;
`;

const SketchBook = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
  background-color: #fffdf8;
  box-shadow: 10px 10px 20px black;
  border-radius: 0 0 5px 5px;
  min-height: 615px;
`;

const SketchArea = styled.div`
  background-color: #fffdf8;
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;
//  display: flex;
// height: 80vh;
// width: 70vw;
// background-color: gray;
// border-radius: 20px;
// padding: 20px;
