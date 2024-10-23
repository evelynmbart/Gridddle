import { Eraser, PaintBrush } from "@phosphor-icons/react";
import styled from "styled-components";

const COLORS = [
  "red",
  "yellow",
  "blue",
  "green",
  "purple",
  "orange",
  "white",
  "black",
  "palevioletred",
];

export function SideBar() {
  return (
    <Container>
      <Content>
        <Palette>
          {COLORS.map((color) => (
            <Color key={color} color={color} />
          ))}
        </Palette>
        <ToolBar>
          <Tool>
            <PaintBrush weight="thin" size={50} />
          </Tool>
          <Tool>
            <Eraser weight="thin" size={50} />
          </Tool>
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
  width: 20%;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 0 0 10px 0;
  min-height: 602px;
  min-width: 115px;
  @media {
    min-height: 702px;
  }
`;

const Palette = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 60px);
  grid-template-rows: repeat(5, 60px);
  justify-content: center;
  gap: 10px;

  @media (max-width: 993px) {
    display: flex;
    flex-direction: column;
  }
`;

const Color = styled.button<{ color: string }>`
  background-color: ${({ color }) => color};
  border: 1px solid black;
  border-radius: 100%;
  height: 60px;
  width: 60px;

  @media (max-width: 993px) {
    height: 40px;
    width: 40px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: center;
  width: 5vw;
  gap: 30px;
  @media (max-width: 993px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const Tool = styled.div`
  height: 60px;
  width: 60px;
  cursor: pointer;

  &:hover {
    color: goldenrod;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  font-family: "Press Start 2P", system-ui;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    border: 2px solid goldenrod;
  }

  @media (max-width: 993px) {
    font-size: 0.75rem;
  }
`;
