import type { User } from "@/types/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  const custom: User[] = JSON.parse(
    localStorage.getItem("custom_users") || "[]"
  );

  const transformed: User[] = data.users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    skills: u.skills ?? ["React", "TypeScript"],
    registrationDate: new Date().toISOString().split("T")[0],
  }));

  /*
  Если среди custom есть пользователь с тем же id, он заменяет API пользователя на кастомного.
  */
  const replaced = transformed.map((apiUser) => {
    const found = custom.find((cu) => cu.id === apiUser.id);
    return found ? found : apiUser;
  });

  /*
  В newCustom будут содержаться все новые добавленные (кастомные) пользователи, которых нет в API.
   */
  const newCustom = custom.filter(
    (cu) => !transformed.some((apiUser) => apiUser.id === cu.id)
  );

  const deleted = JSON.parse(localStorage.getItem("deleted") || "[]");

  const merged = [...replaced, ...newCustom]
    .filter((u) => !deleted.includes(u.id))
    .sort((a, b) => a.id - b.id);

  return merged;
}

export async function createUser(user: User) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const created = await res.json();

  const normalized = {
    id: Date.now(), // cuz dummy json sends the same id every time
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

export async function updateUser(id: number, user: Partial<User>) {
  const all = await getUsers();
  const target = all.find((u) => u.id === id);
  if (!target) return null;

  const existingCustom = JSON.parse(
    localStorage.getItem("custom_users") || "[]"
  );

  const isCustom = existingCustom.some((u: any) => u.id === id);

  if (isCustom) {
    const updated = existingCustom.map((u: any) =>
      u.id === id ? { ...u, ...user } : u
    );

    localStorage.setItem("custom_users", JSON.stringify(updated));
    return updated.find((u: any) => u.id === id);
  }

  const normalized = {
    ...target,
    ...user,
  };

  const updated = [...existingCustom, normalized];
  localStorage.setItem("custom_users", JSON.stringify(updated));
  return normalized;
}

export async function deleteUser(id: number) {
  const deleted = JSON.parse(localStorage.getItem("deleted") || "[]");

  if (!deleted.includes(id)) {
    localStorage.setItem("deleted", JSON.stringify([...deleted, id]));
  }

  const existingCustom = JSON.parse(
    localStorage.getItem("custom_users") || "[]"
  );

  const filtered = existingCustom.filter((u: any) => u.id !== id);
  localStorage.setItem("custom_users", JSON.stringify(filtered));

  return true;
}
