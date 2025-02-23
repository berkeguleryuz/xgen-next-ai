import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

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
import { createClient } from "@/utils/supabase/server";
import { NavUser } from "./nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data);

  const user = {
    name: data?.user?.user_metadata?.full_name,
    email: data?.user?.email || "",
    // avatar: data?.user?.user_metadata?.avatar_url,
  };

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
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
