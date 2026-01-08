import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/useUsers";
import Container from "@/shared/ui/Container";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UsersTable } from "./UsersTable";

function UserWrapper() {
  const [search, setSearch] = useState("");
  const { users, loading, error } = useUsers();

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  console.log("users", users);

  return (
    <main>
      <Container>
        <div className="main-content py-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl">Users</CardTitle>
                  <CardDescription>Manage your user database</CardDescription>
                </div>
                <Link to="/users/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Search users by name, email or skills..."
                    className="pl-10"
                  />
                </div>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="text-sm text-muted-foreground">
                      Loading users...
                    </p>
                  </div>
                </div>
              )}
              {error && <div className="text-red-600">{error}</div>}
              {!loading && !error && <UsersTable users={filtered} />}
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default UserWrapper;
