"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";
import { MantineProvider } from "@mantine/core";

export default function DashboardAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="flex">
        <Sidebar />
        <section className="flex-1 p-4">{children}</section>
      </div>
    </MantineProvider>
  );
}
