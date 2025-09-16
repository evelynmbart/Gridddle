import Image from "next/image";
import styled from "styled-components";
import { Tool, useCanvasStore } from "../stores/canvas";

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
  gap: 24px;
  background-color: black;
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px;
    gap: 20px;
  }
`;

const Palette = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Color = styled.button<{ color: string; selected: boolean }>`
  background-color: ${({ color }) => color};
  border: 3px solid
    ${({ selected }) => (selected ? "#333" : "rgba(0, 0, 0, 0.2)")};
  height: 50px;
  width: 50px;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 3px solid #333;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `}
`;

const ToolContainer = styled.div<{ selected: boolean }>`
  object-fit: contain;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  box-sizing: border-box;
  border: 3px solid
    ${({ selected }) => (selected ? "#333" : "rgba(0, 0, 0, 0.2)")};
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 3px solid #333;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  min-width: 100px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
