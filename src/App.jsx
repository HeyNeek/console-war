import "./App.css";

import { Routes, Route } from "react-router";

import Home from "./components/Home";
import Game from "./components/Game";
import Credits from "./components/Credits";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
