import type { User } from "@/types/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  const custom = JSON.parse(localStorage.getItem("custom_users") || "[]");

  return [...data.users, ...custom];
}

export async function createUser(user: User) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const created = await res.json();

  const existing = JSON.parse(localStorage.getItem("custom_users") || "[]");

  localStorage.setItem("custom_users", JSON.stringify([...existing, created]));

  return created;
}
