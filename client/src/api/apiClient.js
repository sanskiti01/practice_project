const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error?.message || "Request failed");
  }

  return payload;
}

export const api = {
  async getBugs(difficulty = "") {
    const query = difficulty ? `?difficulty=${encodeURIComponent(difficulty)}` : "";
    return request(`/api/bugs${query}`);
  },

  async getBug(id) {
    return request(`/api/bugs/${id}`);
  },

  async submitAttempt(body) {
    return request("/api/bugs/attempts", {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  async getAiHint(body) {
    return request("/api/bugs/ai/hint", {
      method: "POST",
      body: JSON.stringify(body)
    });
  }
};
