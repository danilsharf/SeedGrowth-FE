"use client";

import { useState } from "react";

export default function NewEntryPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/entries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw_text: text,
        }),
      }
    );

    if (response.ok) {
      setMessage("Entry saved!");
      setText("");
    } else {
      setMessage("Failed to save entry");
    }
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>New Entry</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          rows={8}
          cols={60}
          placeholder="Write your entry..."
        />

        <br />
        <br />

        <button type="submit">
          Save Entry
        </button>
      </form>

      <p>{message}</p>
    </main>
  );
}