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
            <img src="./src/images/paintbrush.png" />
          </Tool>
          <Tool>
            <img src="./src/images/eraser01.png" />
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
  margin: 0;
  background-color: lightgrey;
  border-radius: 0 0 5px 5px;
  max-height: 1000px;
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
  border-radius: 0 0 0 0 5px;
  padding: 0 10px;
  min-width: 75px;
`;

const Palette = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 60px);
  grid-template-rows: repeat(5, 60px);
  justify-content: center;
  gap: 10px;

  @media (max-width: 1440px) {
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

  &:hover {
    border: 4px solid goldenrod;
  }

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

const Tool = styled.div`
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
