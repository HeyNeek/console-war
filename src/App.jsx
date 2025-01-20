import "./App.css";

import { Routes, Route } from "react-router";
import { useUIStateStore } from "./stores/useUIStateStore";

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Credits from "./components/Credits/Credits";
import Results from "./components/Results/Results";
import NotFound from "./components/NotFound/NotFound";
import NavBar from "./components/Navbar/NavBar";

function App() {
  const { disableNavBar } = useUIStateStore();
  return (
    <>
      {disableNavBar ? null : <NavBar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
