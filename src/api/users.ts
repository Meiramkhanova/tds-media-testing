import type { User } from "@/types/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  return data.users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    skills: u.skills ?? ["React", "TypeScript"],
    registrationDate: new Date().toISOString().split("T")[0],
  }));
}
