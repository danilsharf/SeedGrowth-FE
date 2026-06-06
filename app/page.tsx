import Link from "next/link";
import { calculateConsistency } from "./lib/consistency";

<Link href="/entries/new">
  Add New Entry
</Link>

const headerStyle = {
  border: "1px solid #444",
  padding: "12px",
  textAlign: "left" as const,
};

const dataStyle = {
  border: "1px solid #444",
  padding: "12px",
  textAlign: "left" as const,
  fontSize: "13px",
};

async function getEntries() {
  const response = await fetch(
    "http://127.0.0.1:8000/entries",
    {
      cache: "no-store",
    }
  );
  console.log("status:", response.status);
  const text = await response.text();
  console.log("response:", text);
  return JSON.parse(text);
}

async function deleteEntry(id: string) {
  await fetch(
    `http://127.0.0.1:8000/entries/${id}`,
    {
      method: "DELETE",
    }
  );

  window.location.reload();
}

export default async function Home() {
  const entries = await getEntries();
  const stats =
  calculateConsistency(entries);
return (
  <main style={{ padding: "20px" }}>
    <h1 className="text-x font-bold">SeedGrowth Dashboard</h1>
     <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
          }}
      >
      <h2>Consistency Score</h2>

      <p>
        {stats.activeDays} / {stats.totalDays}
        days
      </p>

      <h1>
        {stats.consistency}%
      </h1>
    </div>
    <Link href="/entries/new">
      Add New Entry
    </Link>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={headerStyle}>Created</th>
          <th style={headerStyle}>Entry</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((entry: any) => (
          <tr key={entry.id}>
            <td style={dataStyle}>
              {new Date(entry.created_at).toLocaleDateString()}
            </td>

            <td style={dataStyle}>
              {entry.raw_text}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);
}