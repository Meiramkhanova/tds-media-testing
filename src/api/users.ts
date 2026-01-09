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

  console.log("created", created);

  const normalized = {
    id: crypto.randomUUID(), // cuz dummy json sends the same id every time
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email,
    skills: user.skills ?? [],
    registrationDate: new Date().toISOString().split("T")[0],
  };

  const existing = JSON.parse(localStorage.getItem("custom_users") || "[]");

  localStorage.setItem(
    "custom_users",
    JSON.stringify([...existing, normalized])
  );

  return normalized;
}
