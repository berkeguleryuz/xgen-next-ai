"use client";

import * as React from "react";
import {
  Bot,
  BotMessageSquare,
  BrainCircuit,
  ChevronsUpDown,
  CreditCard,
  ImageIcon,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generate Image",
    url: "/generate-image",
    icon: Bot,
  },
  {
    title: "Generate Post",
    url: "/generate-post",
    icon: BotMessageSquare,
  },
  {
    title: "Train Model",
    url: "/train-model",
    icon: BrainCircuit,
  },
  {
    title: "My Generations",
    url: "/my-generations",
    icon: ImageIcon,
  },
  {
    title: "Subscriptions",
    url: "/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="-z-1">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-lime-500 data-[state=open]:text-white">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Image src="/logow.png" alt="xGen" width={100} height={100} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">xGen</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
