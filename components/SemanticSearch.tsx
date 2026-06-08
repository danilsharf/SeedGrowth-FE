"use client";

import { useState } from "react";

export default function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    const response = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await response.json();
    setResults(data);
  }

  return (
    <div className="mb-8">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your journal..."
          className="border rounded px-3 py-2 w-96"
        />

        <button onClick={handleSearch} className="border rounded px-4 py-2">
          Search
        </button>
      </div>

      <div className="mt-4">
        {results.map((entry) => (
          <div key={entry.id} className="border rounded p-3 mb-2">
            <div className="text-sm text-gray-500">
              {new Date(entry.created_at).toLocaleDateString()}
            </div>

            <div>{entry.raw_text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
