"use client";

import * as React from "react";
import {
  Command,
  DatabaseZap,
  Gamepad2,
  LayoutDashboardIcon,
  PlusCircleIcon,
} from "lucide-react";

import { NavMain } from "@/components/appComponent/sidebar/nav-main";
// import { NavProjects } from "@/components/appComponent/sidebar/nav-projects";
// import { NavSecondary } from "@/components/appComponent/sidebar/nav-secondary";
import { NavUser } from "@/components/appComponent/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Games",
      url: "/games",
      icon: Gamepad2,
    },
    {
      title: "Add Games",
      url: "/add-games",
      icon: PlusCircleIcon,
    },
    {
      title: "Game-Db",
      url: "/db-game",
      icon: DatabaseZap,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const pathname = usePathname();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const userData = {
    ...data.user,
    ...data.email,
    name: username || data.user.name,
    email: email || data.user.name,
  };

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    const Email = localStorage.getItem("email");
    if ((loggedInUser, Email)) {
      setIsLoggedIn(true);
      setUsername(loggedInUser);
      setEmail(Email);
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setEmail("");
    }
  }, [pathname]);
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Game Db</span>
                  <span className="truncate text-xs">Database app</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isLoggedIn ? <NavUser user={userData} className="text-white" /> : ""}
      </SidebarFooter>
    </Sidebar>
  );
}
