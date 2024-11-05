import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { useCanvasStore, Tool } from "../stores/canvas";
import Image from "next/image";

export function Tools() {
  const { color, setColor, tool, setTool } = useCanvasStore();

  return (
    <Container>
      <Content>
        <Palette>
          {COLORS.map((c) => (
            <Color
              key={c}
              color={c}
              onClick={() => setColor(c)}
              selected={color === c}
            />
          ))}
        </Palette>
        <ToolBar>
          <ToolContainer
            onClick={() => setTool(Tool.PEN)}
            selected={tool === Tool.PEN}
          >
            <Image
              src="/images/paintbrush.png"
              alt="paintbrush"
              width={60}
              height={60}
            />
          </ToolContainer>
          <ToolContainer
            onClick={() => setTool(Tool.BRUSH)}
            selected={tool === Tool.BRUSH}
          >
            <Image
              src="/images/paintbrush.png"
              alt="paintbrush"
              width={60}
              height={60}
            />
          </ToolContainer>
          <ToolContainer
            onClick={() => setTool(Tool.ERASER)}
            selected={tool === Tool.ERASER}
          >
            <Image
              src="/images/eraser01.png"
              alt="eraser"
              width={60}
              height={60}
            />
          </ToolContainer>
        </ToolBar>
        <ButtonContainer>
          <Button>Save</Button>
          <Button>Submit</Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: end;
  margin: 0;
  background-color: #222831;
  max-height: 1000px;
  border-left: 4px solid black;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 0 0 0 10px 10px;
  padding: 0 10px;
  min-width: 75px;
`;

const Palette = styled.div`
  display: flex;
  flex-direction: column;
`;

const Color = styled.button<{ color: string; selected: boolean }>`
  background-color: ${({ color }) => color};
  border: 1px solid black;
  border-radius: 100%;
  height: 60px;
  width: 60px;

  &:hover {
    border: 4px solid goldenrod;
  }

  ${({ selected }) =>
    selected &&
    `
      border: 4px solid goldenrod;
    `}

  @media (max-width: 1440px) {
    height: 30px;
    width: 30px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const ToolContainer = styled.div<{ selected: boolean }>`
  object-fit: contain;
  cursor: pointer;

  img {
    height: 60px;
    width: 60px;
  }

  @media (max-width: 1440px) {
    img {
      height: 50px;
      width: 50px;
    }
  }

  ${({ selected }) =>
    selected &&
    `
      border: 4px solid goldenrod;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 0.75rem;
  font-family: "Press Start 2P", system-ui;
  background-color: black;
  color: white;
  border: 2px solid lightgrey;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    border: 2px solid goldenrod;
  }

  @media (max-width: 1440px) {
    font-size: 0.5rem;
  }
`;
