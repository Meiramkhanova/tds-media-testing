import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/User";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  console.log(users);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">
              <button className="flex items-center gap-1 font-medium hover:text-foreground">
                ID
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>

            <TableHead>
              <button className="flex items-center gap-1 font-medium hover:text-foreground">
                First Name
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>

            <TableHead>
              <button className="flex items-center gap-1 font-medium hover:text-foreground">
                Last Name
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>

            <TableHead>
              <button className="flex items-center gap-1 font-medium hover:text-foreground">
                Email
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>

            <TableHead>Skills</TableHead>

            <TableHead>
              <button className="flex items-center gap-1 font-medium hover:text-foreground">
                Registered
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>

            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-mono text-sm">{user.id}</TableCell>

              <TableCell className="font-medium">{user.firstName}</TableCell>

              <TableCell className="font-medium">{user.lastName}</TableCell>

              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(user.skills) ? (
                    user.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      No skills
                    </span>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {new Date(user.registrationDate).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link to={`/users/${user.id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
