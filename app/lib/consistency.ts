export function calculateConsistency(entries: any[]) {
  const days = new Set(
    entries.map((entry) =>
      new Date(entry.created_at)
        .toISOString()
        .split("T")[0]
    )
  );

  const totalDays = 30;

  const consistency =
    Math.round(
      (days.size / totalDays) * 100
    );

  return {
    activeDays: days.size,
    totalDays,
    consistency,
  };
}