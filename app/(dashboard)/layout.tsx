import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative overflow-hidden">
        <div className="absolute top-0 z-[-2] opacity-10 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_70%_60%_at_50%_-50%,rgba(64,203,90,0.8),rgba(255,255,255,0))]" />
        <SidebarTrigger className="p-4 z-10 text-white " />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 text-white">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
