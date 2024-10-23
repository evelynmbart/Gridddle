// import { Eraser, PaintBrush } from "@phosphor-icons/react";
// import styled from "styled-components";

// const COLORS = ["red", "yellow", "blue", "white", "black", "palevioletred"];

// export function SideBar() {
//   return (
//     <Container>
//       <Content>
//         <Palette>
//           {COLORS.map((color) => (
//             <Color key={color} color={color} />
//           ))}
//           <ToolBar>
//             <Tool id="paint">
//               <PaintBrush size={100} weight="thin" />
//             </Tool>
//             <Tool id="erase">
//               <Eraser size={100} weight="thin" />
//             </Tool>
//           </ToolBar>
//         </Palette>
//         <ButtonContainer>
//           <Button>Save</Button>
//           <Button>Submit</Button>
//         </ButtonContainer>
//       </Content>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: end;
//   width: 30%;
// `;

// const Content = styled.div`
//   height: 100%;
//   width: 90%;
//   background-color: rgb(175, 177, 177);
//   border-radius: 10px;
// `;

// const Palette = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 100px);
//   grid-template-rows: repeat(2, 100px);
//   justify-content: center;
//   margin: 50px;
// `;

// const Color = styled.div<{ color: string }>`
//   background-color: ${({ color }) => color};
// `;

// const ToolBar = styled.div`
//   margin-top: 30px;
//   display: flex;
//   width: 14vw;
//   gap: 20px;
// `;

// const Tool = styled.div`
//   border: 1px solid black;
//   height: 100px;
//   width: 100px;
//   cursor: pointer;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 30px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 1rem;
//   font-family: "Press Start 2P", system-ui;
// `;
