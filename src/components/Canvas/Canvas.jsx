import { SideBar } from "../Sidebar/Sidebar";
import "../Sidebar/Sidebar.css";

export function Canvas() {
  return (
    <div className="canvas">
      <div className="sketch-area"></div>
      <SideBar />
    </div>
  );
}
