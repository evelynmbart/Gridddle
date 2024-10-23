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
        <Main>
          <Logo
            id="logo"
            src="./src/images/waffle02-favcon.png"
            alt="Waffle Logo"
          />
          <Title>
            {LETTERS.map((letter, i) => (
              <Letter key={`${letter.letter}-${i}`} color={letter.color}>
                {letter.letter}
              </Letter>
            ))}
          </Title>
        </Main>

        <Buttons>
          <NavLink>New Canvas</NavLink>
          <NavLink>Archive</NavLink>
          <NavLink>Profile</NavLink>
        </Buttons>
      </Container>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: black;
  margin-top: 5%;
  width: 70vw;
  box-shadow: 10px 10px 20px black;
`;

const Container = styled.div`
  font-family: "Press Start 2p", system-ui;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 2%;
`;

const NavLink = styled.button`
  background-color: white;
  padding: 5px 10px;
  display: flex;
  font-family: "Press Start 2p", system-ui;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;

const Logo = styled.img`
  object-fit: fill;
  height: 60px;
  width: 60px;
  color: white;
  padding: 5px;
`;

const Title = styled.p`
  font-size: 2rem;
  color: white;
`;

const Letter = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

// margin: 15px 2%;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
