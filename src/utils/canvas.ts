import { PixelModifyItem } from "dotting";

export const serializeCanvas = (data: PixelModifyItem[][]): string[][] => {
  return data.map(row => row.map(item => item.color));
};

export const deserializeCanvas = (data: string[][]): PixelModifyItem[][] => {
  return data.map((row, rowIndex) =>
    row.map((color, columnIndex) => ({
      rowIndex,
      columnIndex,
      color
    }))
  );
};
