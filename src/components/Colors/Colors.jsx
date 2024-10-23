import { useState } from "react";
import "../Tools/Tools.css";
import { PaintBrush, Eraser } from "@phosphor-icons/react";

export function Colors() {
  const [colorIsSelected, setColorIsSelected] = useState(false);
  const [colors, setColors] = useState([]);
  return (
    <>
      <div className="palette">
        {/* {colors.map((color, index) => {
        return (
          <button
            key={index}
            className="color"
            onClick={() => setColorIsSelected(!colorIsSelected)}
            style={{ border: colorIsSelected ? "4px solid black" : "none" }}
          ></button>
        );
      })} */}

        <button className="color1"></button>
        <button className="color2"></button>
        <button className="color3"></button>
        <button className="color4"></button>
        <button className="color5"></button>
        <button className="color6"></button>

        <div className="tool-bar">
          <div className="tool" id="paint">
            <PaintBrush size={100} weight="thin" />
          </div>
          <div className="tool" id="erase">
            <Eraser size={100} weight="thin" />
          </div>
        </div>
      </div>
      <div className="btns">
        <button>Save</button>
        <button>Submit</button>
      </div>
    </>
  );
}
