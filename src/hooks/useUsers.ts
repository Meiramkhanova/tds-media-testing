import { useEffect, useState } from "react";
import { getUsers } from "@/api/users";
import type { User } from "@/types/User";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (e) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { users, loading, error, refresh: load };
}
