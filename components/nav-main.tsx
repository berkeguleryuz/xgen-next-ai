"use client";

import {
  Bot,
  BotMessageSquare,
  BrainCircuit,
  Dna,
  ImageIcon,
  LayoutDashboard,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
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
    title: "My Models",
    url: "/my-models",
    icon: Dna,
  },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className={cn(
              pathname === item.url && "bg-sidebar-accent text-white",
            )}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
