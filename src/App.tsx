import styled from "styled-components";
import { Navbar } from "./components/Navbar";
import { Tools } from "./components/Tools";
import { useState } from "react";
import { Canvas } from "./components/Canvas/Canvas";
import { COLORS } from "./constants/colors";

function App() {
  const [color, setColor] = useState(COLORS[0]);
  return (
    <Box>
      <Content>
        <Navbar />
        <SketchBook>
          <SketchArea>
            <Canvas color={color} />
          </SketchArea>
          <Tools color={color} setColor={setColor} />
        </SketchBook>
      </Content>
    </Box>
  );
}

export default App;

const Box = styled.div`
  background-color:#222831,
  padding: 30px,
  display: flex,
  justify-content: center,
  align-items: center,
  margin: 2% 12% 0 12%,
  margin-top: 2%,
  border-radius: 10px,
  `;

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
  background: #222831;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
