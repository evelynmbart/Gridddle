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

      // Calculate row and column from index
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;

      // Fill 3x3 grid around clicked point
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;

          // Check if within grid bounds
          if (
            newRow >= 0 &&
            newRow < GRID_SIZE &&
            newCol >= 0 &&
            newCol < GRID_SIZE
          ) {
            const newIndex = newRow * GRID_SIZE + newCol;
            newGrid[newIndex] = color;
          }
        }
      }

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

  &:hover {
    cursor: crosshair;
  }
`;

const Square = styled.div`
  background-color: ${({ color }) => color};
  border: 2px dashed rgb(0, 0, 0, 0.1);
`;
