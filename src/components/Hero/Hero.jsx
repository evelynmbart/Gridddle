import { Canvas } from "../Canvas/Canvas";
import "../Canvas/Canvas.css";

export function Hero() {
  return (
    <div className="canvas-container">
      <div className="canvas-content">
        <Canvas />
      </div>
    </div>
  );
}
