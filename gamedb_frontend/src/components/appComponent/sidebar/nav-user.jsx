"use client";
import * as React from "react";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Get the access token from cookies
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});

      const url = "http://localhost:3636/api/auth/logout";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Important for sending cookies
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.accessToken}`, // Send token in header
        },
      });

      if (response.ok) {
        // Clear cookies manually
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        // Clear localStorage
        localStorage.clear();

        // Redirect and refresh
        router.push("/");
        router.refresh();
      } else {
        const data = await response.json();
        console.error("Failed to log out:", data.message);
        // Even if server logout fails, clear cookies and redirect
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        localStorage.clear();
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if there's an error, clear cookies and redirect
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      localStorage.clear();
      router.push("/");
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name || "User"}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name || "User"}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                <Link href="/user/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <Link href="/user/setting">Settings</Link>
              </DropdownMenuItem>
              {/*<DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <button onClick={handleLogout}>Log out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
