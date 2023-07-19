import { ReactNode } from "react";
import Navbar from "@/components/ui/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <section>{children}</section>
    </div>
  );
}
