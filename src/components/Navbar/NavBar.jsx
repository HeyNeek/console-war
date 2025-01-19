import { NavLink } from "react-router";

import "./Navbar.css";

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/credits">Credits</NavLink>
    </nav>
  );
}

export default NavBar;
