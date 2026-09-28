import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="shell">
      <header className="nav">
        <div className="brand">Bug<span>Lab</span></div>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/bugs">Bugs</NavLink>
          <NavLink to="/about">Concepts</NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer>BugLab • Debugging is a skill, not just a result.</footer>
    </div>
  );
}
