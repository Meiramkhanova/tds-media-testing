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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersTable } from "../widgets/home/UsersTable";
import { deleteUser } from "@/api/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function HomePage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const { users, loading, error, refresh } = useUsers();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(debounced.toLowerCase())
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const handleDelete = async () => {
    if (!deleteUserId) return;

    try {
      await deleteUser(deleteUserId);

      await refresh();

      setDeleteUserId(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debounced]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-background">
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
                  <Link to="/new-user">
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search users by name or email..."
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
                {!loading && !error && (
                  <UsersTable
                    users={paginated}
                    onDelete={(id) => setDeleteUserId(id)}
                  />
                )}

                {total > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}>
                      Prev
                    </Button>

                    <span>
                      Page {page} of {totalPages}
                    </span>

                    <Button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}>
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>

      <AlertDialog
        open={deleteUserId !== null}
        onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default HomePage;
