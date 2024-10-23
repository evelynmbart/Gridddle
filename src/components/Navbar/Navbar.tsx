import styled from "styled-components";

const LETTERS = [
  { letter: "G", color: "lightseagreen" },
  { letter: "r", color: "rgb(214, 158, 56)" },
  { letter: "i", color: "palevioletred" },
  { letter: "d", color: "rgb(208, 208, 110)" },
  { letter: "d", color: "rgb(64, 141, 208)" },
  { letter: "d", color: "rgb(156, 31, 156)" },
  { letter: "l", color: "rgb(241, 86, 86)" },
  { letter: "e", color: "rgb(63, 174, 63)" },
];

export function Navbar() {
  return (
    <Nav>
      <Container>
        <Logo id="logo" src="./public/waffle02-favcon copy.png" />
        <Title>
          {LETTERS.map((letter, i) => (
            <Letter key={`${letter.letter}-${i}`} color={letter.color}>
              {letter.letter}
            </Letter>
          ))}
        </Title>
      </Container>
    </Nav>
  );
}

const Nav = styled.nav`
  margin: 15px 2%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Container = styled.div`
  font-family: "Press Start 2p", system-ui;
  display: flex;
  gap: 30px;
`;

const Logo = styled.img`
  object-fit: fill;
  height: 80px;
  width: 80px;
`;

const Title = styled.p`
  font-size: 2.5rem;
  margin-top: 20px;
  color: white;
`;

const Letter = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;
