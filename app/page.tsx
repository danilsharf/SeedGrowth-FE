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
import { getEntries, getGoal } from "@/app/lib/api";
import SemanticSearch from "@/components/SemanticSearch";

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
          <Link href="/entries/new">Add New Entry</Link>
        </Button>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <SemanticSearch />
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
