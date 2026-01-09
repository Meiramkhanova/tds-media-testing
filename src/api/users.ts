import type { User } from "@/types/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  const custom = JSON.parse(localStorage.getItem("custom_users") || "[]");

  const transformed = data.users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    skills: u.skills ?? ["React", "TypeScript"],
    registrationDate: new Date().toISOString().split("T")[0],
  }));

  return [...transformed, ...custom];
}

export async function createUser(user: User) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const created = await res.json();

  const normalized = {
    id: created.id,
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email,
    skills: created.skills ?? [],
    registrationDate: new Date().toISOString().split("T")[0],
  };

  const existing = JSON.parse(localStorage.getItem("custom_users") || "[]");

  localStorage.setItem(
    "custom_users",
    JSON.stringify([...existing, normalized])
  );

  return normalized;
}
