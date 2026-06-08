import { API_BASE_URL } from "./constants";

export async function getEntries() {
  const response = await fetch(`${API_BASE_URL}/entries`, {
    cache: "no-store",
  });
  console.log("status:", response.status);
  const text = await response.text();
  console.log("response:", text);
  return JSON.parse(text);
}

export async function getGoal() {
  const response = await fetch(`${API_BASE_URL}/goals/current`, {
    cache: "no-store",
  });

  return response.json();
}

export async function deleteEntry(id: string) {
  await fetch(`${API_BASE_URL}/entries/${id}`, {
    method: "DELETE",
  });

  window.location.reload();
}
