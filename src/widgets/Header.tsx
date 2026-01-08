import Container from "../shared/ui/Container";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

function Header() {
  return (
    <div className="border-b border-border bg-card">
      <Container>
        <div className="header-wrapper py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                User Management
              </h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Header;
