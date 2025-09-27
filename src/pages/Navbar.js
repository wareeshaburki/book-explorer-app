import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar-container">
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
          to="/favorites"
        >
          Favorites
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
