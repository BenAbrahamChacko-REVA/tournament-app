import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Tournament Manager</h2>
      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/fixtures">Fixtures</NavLink>
        <NavLink to="/scores">Scores</NavLink>
        <NavLink to="/rankings">Rankings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;