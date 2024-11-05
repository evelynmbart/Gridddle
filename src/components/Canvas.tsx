import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Tool, useCanvasStore } from "../stores/canvas";
import {
  BRUSH_PATTERN_ELEMENT,
  BrushTool,
  Dotting,
  DottingRef,
  useBrush,
  useData,
  useDotting,
  useLayers
} from "dotting";

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

export function Canvas() {
  const ref = useRef<DottingRef>(null);
  const brush = useBrush(ref);
  const data = useData(ref);

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
    <Container>
      <Dotting
        ref={ref}
        width="100%"
        height="100%"
        backgroundColor="transparent"
        isPanZoomable={false}
        isGridFixed={true}
        gridSquareLength={40}
        initAutoScale={true}
        style={{ border: "none" }}
        initLayers={[{ id: "1", data: EMPTY_GRID }]}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;

  &:hover {
    cursor: crosshair !important;
  }
`;
