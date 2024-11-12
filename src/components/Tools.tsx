import styled from "styled-components";
import { useCanvasStore, Tool } from "../stores/canvas";
import Image from "next/image";

interface Props {
  onSave: () => void;
  onClear: () => void;
}

export function Tools({ onSave, onClear }: Props) {
  const { color, setColor, tool, setTool, prompt } = useCanvasStore();

  const colors = prompt?.colors ?? [
    "hotpink",
    "mediumspringgreen",
    "deepskyblue",
    "gold",
  ];

  return (
    <Container>
      <Palette>
        {colors.map((c) => (
          <Color
            key={c}
            color={c}
            onClick={() => {
              setColor(c);
              setTool(Tool.PEN);
            }}
            selected={color === c && tool === Tool.PEN}
          />
        ))}
        <ToolContainer
          onClick={() => setTool(Tool.ERASER)}
          selected={tool === Tool.ERASER}
        >
          <Image
            src="/images/eraser02.png"
            alt="eraser"
            width={50}
            height={50}
          />
        </ToolContainer>
      </Palette>
      <ButtonContainer>
        <Button onClick={onClear}>Clear</Button>
        <Button onClick={onSave}>Save</Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Palette = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Color = styled.button<{ color: string; selected: boolean }>`
  background-color: ${({ color }) => color};
  border: 2px solid black;
  height: 60px;
  width: 60px;

  &:hover {
    border: 2px solid black;
  }

  ${({ selected }) =>
    selected &&
    `
      border: 4px solid black;
    `}
`;

const ToolContainer = styled.div<{ selected: boolean }>`
  object-fit: contain;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 60px;
  width: 60px;
  box-sizing: border-box;

  ${({ selected }) =>
    selected &&
    `
      border: 4px solid black;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 2px solid black;
  padding: 5px 10px;
  font-family: "Tiny5";
  font-size: 32px;

  &:hover {
    border: 2px solid goldenrod;
  }
`;
