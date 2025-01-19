import "./App.css";

import { Routes, Route } from "react-router";

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Credits from "./components/Credits/Credits";
import NotFound from "./components/NotFound/NotFound";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
