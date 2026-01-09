import { Toaster } from "@/components/ui/sonner";
import Header from "../widgets/Header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
