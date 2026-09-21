import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">DEBUGGING PRACTICE</p>
        <h1>Find the bug.<br />Understand the system.</h1>
        <p className="lead">
          Practice realistic debugging problems and learn to trace failures
          from the browser to the API, service layer and database.
        </p>
        <Link className="button" to="/bugs">Explore bugs →</Link>
      </div>
      <div className="hero-card">
        <div className="code-line">await api.getBugs()</div>
        <div className="code-line muted">→ REST endpoint</div>
        <div className="code-line muted">→ Express middleware</div>
        <div className="code-line muted">→ service</div>
        <div className="code-line muted">→ database</div>
      </div>
    </section>
  );
}
