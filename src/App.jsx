import "./App.css";
import "./components/Hero/Hero.css";

import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;
