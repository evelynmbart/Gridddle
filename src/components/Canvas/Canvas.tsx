import { useState } from "react";
import styled from "styled-components";
import { Tool, useCanvasStore } from "../../stores/canvas";

const GRID_SIZE = 16;

export function Canvas() {
  const [gridColors, setGridColors] = useState<string[]>(
    Array.from({ length: GRID_SIZE * GRID_SIZE }).fill("white") as string[]
  );

  const { color, tool } = useCanvasStore();

  const handleDraw = (index: number) => {
    setGridColors((prev) => {
      const newGrid = [...prev];

      switch (tool) {
        case Tool.PEN:
          newGrid[index] = color ?? "white";
          break;
        case Tool.BRUSH:
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
                newGrid[newIndex] = color ?? "white";
              }
            }
          }
          break;
        case Tool.ERASER:
          newGrid[index] = "white";
          break;
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
          onTouchStart={(e) => {
            e.preventDefault();
            handleDraw(index);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(
              touch.clientX,
              touch.clientY
            );
            const squareElements = document.querySelectorAll("[data-index]");
            const touchedIndex = Array.from(squareElements).indexOf(
              element as Element
            );
            if (touchedIndex !== -1) {
              handleDraw(touchedIndex);
            }
          }}
          data-index={index}
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
  touch-action: none;

  &:hover {
    cursor: crosshair;
  }
`;

const Square = styled.div`
  background-color: ${({ color }) => color};
  border: 2px dashed rgb(0, 0, 0, 0.1);
  touch-action: none;
`;
