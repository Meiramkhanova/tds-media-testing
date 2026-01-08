import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/shared/ui/Container";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function UserWrapper() {
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
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default UserWrapper;
