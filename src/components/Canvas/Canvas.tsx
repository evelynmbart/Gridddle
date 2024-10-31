import { useState } from "react";
import styled from "styled-components";

const GRID_SIZE = 16;

interface Props {
  color: string;
}

export function Canvas({ color }: Props) {
  const [gridColors, setGridColors] = useState<string[]>(
    Array.from({ length: GRID_SIZE * GRID_SIZE }).fill("white") as string[]
  );

  const handleDraw = (index: number) => {
    setGridColors((prev) => {
      const newGrid = [...prev];
      newGrid[index] = color;
      return newGrid;
    });
  };

  return (
    <Grid>
      {gridColors.map((c, index) => (
        <Square
          key={index}
          color={c}
          onMouseOver={(e) => e.buttons === 1 && handleDraw(index)}
          onMouseDown={() => handleDraw(index)}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, 1fr);
  grid-template-rows: repeat(${GRID_SIZE}, 1fr);
  height: 100%;
  aspect-ratio: 1 / 1;
  user-select: none;
`;

const Square = styled.div`
  background-color: ${({ color }) => color};
  border: 2px dashed rgb(0, 0, 0, 0.1);
`;
