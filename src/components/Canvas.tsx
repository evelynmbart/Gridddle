"use client";

import { forwardRef, MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { Tool, useCanvasStore } from "../stores/canvas";
import {
  BRUSH_PATTERN_ELEMENT,
  BrushTool,
  Dotting,
  DottingRef,
  useBrush
} from "dotting";
import { deserializeCanvas } from "@/utils/canvas";

const GRID_SIZE = 16;

const EMPTY_GRID = Array.from({ length: GRID_SIZE }, (_, i) =>
  Array.from({ length: GRID_SIZE }, (_, j) => ({
    rowIndex: i,
    columnIndex: j,
    color: "white"
  }))
);

const PEN_PATTERN = [[BRUSH_PATTERN_ELEMENT.FILL]];
const BRUSH_PATTERN = [
  [
    BRUSH_PATTERN_ELEMENT.EMPTY,
    BRUSH_PATTERN_ELEMENT.FILL,
    BRUSH_PATTERN_ELEMENT.EMPTY
  ],
  [
    BRUSH_PATTERN_ELEMENT.FILL,
    BRUSH_PATTERN_ELEMENT.FILL,
    BRUSH_PATTERN_ELEMENT.FILL
  ],
  [
    BRUSH_PATTERN_ELEMENT.EMPTY,
    BRUSH_PATTERN_ELEMENT.FILL,
    BRUSH_PATTERN_ELEMENT.EMPTY
  ]
];

interface Props {
  editable: boolean;
  grid?: string[][];
}

export const Canvas = forwardRef<DottingRef, Props>(
  ({ editable, grid }, inputRef) => {
    const localRef = useRef<DottingRef>(null);
    const ref = inputRef ?? localRef;

    const brush = useBrush(ref as MutableRefObject<DottingRef>);

    const { color, tool } = useCanvasStore();

    useEffect(() => {
      brush.changeBrushColor(color ?? "white");
    }, [color, brush]);

    useEffect(() => {
      switch (tool) {
        case Tool.PEN:
          brush.changeBrushPattern(PEN_PATTERN);
          brush.changeBrushTool(BrushTool.DOT);
          break;
        case Tool.ERASER:
          brush.changeBrushPattern(PEN_PATTERN);
          brush.changeBrushTool(BrushTool.ERASER);
          break;
        case Tool.BRUSH:
          brush.changeBrushPattern(BRUSH_PATTERN);
          brush.changeBrushTool(BrushTool.DOT);
          break;
      }
    }, [tool, brush]);

    return (
      <Container editable={editable}>
        <Dotting
          ref={ref}
          height="100%"
          width="100%"
          backgroundColor="transparent"
          isGridVisible={editable}
          isPanZoomable={false}
          isGridFixed={true}
          gridSquareLength={25}
          initAutoScale={true}
          style={{
            border: "none"
          }}
          initLayers={[
            { id: "1", data: grid ? deserializeCanvas(grid) : EMPTY_GRID }
          ]}
          isInteractionApplicable={editable}
          isDrawingEnabled={editable}
        />
      </Container>
    );
  }
);

const Container = styled.div<{ editable: boolean }>`
  width: min(100%, 400px);
  aspect-ratio: 1 / 1;

  ${({ editable }: { editable: boolean }) =>
    editable
      ? `
      &:hover {
        cursor: crosshair !important;
      }
    `
      : `
      pointer-events: none;
    `}
`;
