import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/apiClient.js";

export default function BugDetail() {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [question, setQuestion] = useState("What should I inspect first?");
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await api.getBug(id);
        setBug(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [id]);

  async function submit() {
    try {
      setError("");
      const response = await api.submitAttempt({
        bugId: Number(id),
        diagnosis
      });
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function askAi() {
    try {
      setError("");
      const response = await api.getAiHint({
        bugId: Number(id),
        question
      });
      setHint(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error && !bug) return <div className="error">{error}</div>;
  if (!bug) return <p>Loading challenge...</p>;

  return (
    <section>
      <Link to="/bugs" className="back">← All bugs</Link>
      <div className="detail-head">
        <div>
          <span className="pill">{bug.difficulty}</span>
          <h2>{bug.title}</h2>
          <p>{bug.description}</p>
        </div>
      </div>

      <div className="two-col">
        <div>
          <h3>Broken code</h3>
          <pre>{bug.brokenCode}</pre>
          <h3>Expected behavior</h3>
          <p className="panel">{bug.expectedBehavior}</p>
        </div>

        <div>
          <h3>Your diagnosis</h3>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Explain what is wrong and why..."
            rows="7"
          />
          <button className="button" onClick={submit}>Submit diagnosis</button>
          {result && (
            <div className={result.correct ? "success" : "panel"}>
              {result.correct ? "✓ Diagnosis looks correct." : "Keep investigating — the diagnosis needs more detail."}
            </div>
          )}

          <h3>AI debugging mentor</h3>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} />
          <button className="button secondary" onClick={askAi}>Get hint</button>
          {hint && (
            <div className="ai-box">
              <strong>Hint</strong>
              <p>{hint.hint}</p>
              <strong>Next step</strong>
              <p>{hint.nextStep}</p>
              <small>Confidence: {Math.round(hint.confidence * 100)}% • Provider: {hint.provider}</small>
            </div>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </section>
  );
}
