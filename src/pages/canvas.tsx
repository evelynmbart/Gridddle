"use client";

import { Canvas } from "@/components/Canvas";
import { Tools } from "@/components/Tools";
import styled from "styled-components";

export default function CanvasPage() {
  return (
    <SketchBook>
      <SketchArea>
        <Canvas />
      </SketchArea>
      <Tools />
    </SketchBook>
  );
}

const SketchBook = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
  background-color: #fffdf8;
  border-radius: 0 0 5px 5px;
  min-height: 615px;
  border: 4px solid #222831;
  margin-bottom: 2%;
  border-radius: 0 0 10px 10px;
  border: 3px solid black;
`;

const SketchArea = styled.div`
  background: #222831;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
