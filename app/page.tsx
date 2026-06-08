import Link from "next/link";
import { calculateConsistency } from "./lib/consistency";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

async function getEntries() {
  const response = await fetch("http://127.0.0.1:8000/entries", {
    cache: "no-store",
  });
  console.log("status:", response.status);
  const text = await response.text();
  console.log("response:", text);
  return JSON.parse(text);
}

async function getGoal() {
  const response = await fetch("http://127.0.0.1:8000/goals/current", {
    cache: "no-store",
  });

  return response.json();
}

async function deleteEntry(id: string) {
  await fetch(`http://127.0.0.1:8000/entries/${id}`, {
    method: "DELETE",
  });

  window.location.reload();
}

export default async function Home() {
  const goal = await getGoal();
  const entries = await getEntries();
  const stats = calculateConsistency(entries);
  return (
    <main style={{ padding: "20px" }}>
      <div className="flex items-center justify-center gap-4">
        <Image src="/logo.png" alt="SeedGrowth Logo" width={60} height={60} />
        <h1 className="text-xl font-bold">SeedGrowth Dashboard</h1>
      </div>
      <br />
      <br />
      <Card className="w-[150px] rounded-3xl shadow-lg p-2">
        <CardHeader>
          <CardTitle>Consistency Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">{stats.consistency}%</p>
          {stats.activeDays} / {stats.totalDays} days
        </CardContent>
      </Card>
      <br />
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/goals">Goal Overview</Link>
        </Button>

        <Button asChild>
          <Link href="/entries/new">Add New Entry</Link>
        </Button>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Goal</CardTitle>
          </CardHeader>

          <CardContent>
            <h3 className="font-bold">{goal.title}</h3>

            <p>{goal.description}</p>

            <p className="mt-2">Target Date: {goal.end_date}</p>

            <Link href="/goals">View Goal Overview</Link>
          </CardContent>
        </Card>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Created</TableHead>
                <TableHead>Entry</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {entries.map((entry: any) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{entry.raw_text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
