import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/apiClient.js";

export default function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const result = await api.getBugs(difficulty);
        setBugs(result.data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [difficulty]);

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">PROBLEM SET</p>
          <h2>Debugging challenges</h2>
        </div>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="grid">
        {bugs.map((bug) => (
          <article className="card" key={bug.id}>
            <span className="pill">{bug.difficulty}</span>
            <h3>{bug.title}</h3>
            <p>{bug.description}</p>
            <Link to={`/bugs/${bug.id}`}>Open challenge →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
