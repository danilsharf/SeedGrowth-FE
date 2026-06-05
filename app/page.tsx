import Link from "next/link";

<Link href="/entries/new">
  Add New Entry
</Link>

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

const cellStyle = {
  border: "1px solid #444",
  padding: "12px",
  textAlign: "left" as const,
};

export default async function Home() {
  const entries = await getEntries();

return (
  <main style={{ padding: "20px" }}>
    <h1>SeedGrowth Dashboard</h1>
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
          <th style={cellStyle}>Created</th>
          <th style={cellStyle}>Entry</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((entry: any) => (
          <tr key={entry.id}>
            <td style={cellStyle}>
              {new Date(entry.created_at).toLocaleDateString()}
            </td>

            <td style={cellStyle}>
              {entry.raw_text}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);
}