import styled from "styled-components";
import { List } from "@phosphor-icons/react";
import { useState } from "react";

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

// export const randomColor = () => {
//   let letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

export function Navbar() {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  // const handleClick = () => {
  //   if (!openNavigation) return;

  //   setOpenNavigation(false);
  // };

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
          <Hamburger onClick={toggleNavigation}>
            <List size={32} />
          </Hamburger>

          <Dropdown style={{ display: openNavigation ? "flex" : "none" }}>
            <NavLink>New Canvas</NavLink>
            <NavLink>Archive</NavLink>
            <NavLink>Profile</NavLink>
          </Dropdown>
          <NavLink>New Canvas</NavLink>
          <NavLink>Archive</NavLink>
          <NavLink>Profile</NavLink>
        </Buttons>
      </Container>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: #222831;
  border-radius: 10px 10px 0 0;
  margin-top: 2%;
  width: 70vw;
  border: 3px solid black;
  border-bottom: none;
`;

const Container = styled.div`
  font-family: "Press Start 2p", system-ui;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 1.7%;
`;

const Logo = styled.img`
  display: flex;
  object-fit: fill;
  height: 50px;
  width: 50px;
  color: white;
  padding: 5px 0;
  @media (max-width: 1100px) {
    height: 30px;
    width: 30px;
  }
  @media (max-width: 310px) {
    display: none;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  color: white;
  @media (max-width: 1100px) {
    font-size: 1rem;
  }
`;

const Letter = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

const Hamburger = styled.button`
  display: none;
  color: white;
  background-color: transparent;
  border: none;
  @media (max-width: 1100px) {
    display: flex;
  }
`;

const Dropdown = styled.div`
  display: flex;
  height: 200px;
  width: 100px;
  background-color: blue;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 2%;
`;

const NavLink = styled.button`
  background-color: transparent;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  padding: 5px 10px;
  display: flex;
  font-family: "Press Start 2p", system-ui;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;

  &:hover {
    border: 2px solid goldenrod;
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;