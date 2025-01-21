"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Logoutbutton({ className }) {
  const router = useRouter();

  const logout = async () => {
    try {
      // Get the access token from cookies
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`;
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
    <>
      <Button
        onClick={logout}
        className={`${className} flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        Logout
      </Button>
    </>
  );
}
