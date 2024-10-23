import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Sidebar } from "@phosphor-icons/react";

export function Canvas() {
  return (
    <Container>
      <Navbar />
      <SketchArea></SketchArea>
      <Sidebar />
    </Container>
  );
}

// import { SideBar } from "./Sidebar";

// export function Canvas() {
//   return (
//     <Container>
//       <Columns>
//         <SketchArea></SketchArea>
//         <SideBar />
//       </Columns>
//     </Container>
//   );
// }

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Columns = styled.div`
//   display: flex;
//   height: 80vh;
//   width: 70vw;
//   background-color: gray;
//   border-radius: 20px;
//   padding: 20px;
// `;

const SketchArea = styled.div`
  background-color: white;
  height: 100%;
  width: 70%;
  border-radius: 10px;
`;
