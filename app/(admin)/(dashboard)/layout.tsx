import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";

export default function DashboardAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 p-4">{children}</section>
    </div>
  );
}
