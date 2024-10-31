import styled from "styled-components";
import { Navbar } from "../Canvas/Navbar";
import { SideBar } from "./Sidebar";

export function Canvas() {
  return (
    <div
      style={{
        backgroundColor: "#222831",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "12%",
        marginLeft: "12%",
        marginTop: "2%",
        borderRadius: "10px",
      }}
    >
      <Content>
        <Navbar />
        <SketchBook>
          <SketchArea />
          <SideBar />
        </SketchBook>
      </Content>
    </div>
  );
}

// const Box = styled.div`
//   background-color:#222831,
//   padding: 30px,
//   display: flex,
//   justify-content: center,
//   align-items: center,
//   margin: 0 12%,
//   margin-top: 2%,
//   border-radius: 10px,
//   `;

const Content = styled.div`
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
  border-radius: 0 0 5px 5px;
  min-height: 615px;
  border: 4px solid #222831;
  margin-bottom: 2%;
  border-radius: 0 0 10px 10px;
  border: 3px solid black;
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
