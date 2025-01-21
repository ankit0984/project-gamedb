"use client";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/Games" },
  { name: "stats", href: "/stats" },
  // { name: "Accessories", href: "/accessories" },
  // { name: "Audiophiles", href: "/audiophiles" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Navigation hook
  const [activeItem, setActiveItem] = useState(pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUsername(loggedInUser);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, [pathname]);

  // Update active item when pathname changes
  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href) => {
    setActiveItem(href);
    router.push(href);
  };

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
    <>
      {/* <header
        className={`fixed w-[50%] top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
                ${
                  scrolled
                    ? "bg-white/80 shadow-lg backdrop-blur-xl translate-y-0"
                    : "bg-white/50 backdrop-blur-sm translate-y-2"
                } rounded-2xl border border-white/20`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-6"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 transition-transform hover:scale-105"
            >
              <span className="sr-only">Cophisa</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700
                         hover:bg-white/50 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group px-1 py-2 rounded-xl transition-all duration-200 relative overflow-hidden
                  ${
                    activeItem === item.href
                      ? "bg-indigo-600 text-white shadow-md scale-105"
                      : "text-gray-900 hover:bg-primary hover:scale-105 hover:text-muted"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-2 py-2 rounded-xl bg-indigo-600 text-white transition-all duration-200
                           hover:bg-indigo-700 hover:scale-105 shadow-md gap-2"
                >
                  <User className="h-5 w-5" />
                  {username}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <span className="font-medium">{username}</span>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white transition-all duration-200
                         hover:bg-indigo-700 hover:scale-105 shadow-md"
              >
                Log in{" "}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  &rarr;
                </span>
              </Link>
            )}
          </div>
        </nav> */}

      {/* Mobile Menu */}
      {/* {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 p-1.5 transition-transform hover:scale-105"
              >
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left rounded-xl px-3 py-2 transition-all duration-200
                    ${
                      activeItem === item.href
                        ? "bg-indigo-600 text-white shadow-md translate-x-2"
                        : "bg-white/50 text-gray-900 hover:bg-white/80 hover:translate-x-2"
                    }`}
                >
                  {item.name}
                </button>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left rounded-xl px-3 py-2 bg-indigo-600 text-white 
                         hover:bg-indigo-700 transition-all duration-200 hover:translate-x-2"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </div>
        )} */}
      {/* </header> */}

      <header
        className={`fixed w-[50%] top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-white/80 shadow-lg backdrop-blur-xl translate-y-0"
            : "bg-white/50 backdrop-blur-sm translate-y-0"
        } rounded-2xl border border-gray-200`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-6"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 transition-transform hover:scale-105"
            >
              <span className="sr-only">Cophisa</span>
              <img
                alt="Cophisa"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700
                 hover:bg-gray-200 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group px-3 py-2 rounded-md transition-all duration-200 relative
          ${
            activeItem === item.href
              ? "bg-indigo-600 text-white shadow-md scale-105"
              : "text-gray-900 hover:bg-gray-100 hover:scale-105"
          }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-3 py-2 rounded-md bg-indigo-600 text-white transition-all duration-200
                     hover:bg-indigo-700 hover:scale-105 shadow-md gap-2"
                >
                  <User className="h-5 w-5" />
                  {username}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <span className="font-medium">{username}</span>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white transition-all duration-200
                 hover:bg-indigo-700 hover:scale-105 shadow-md"
              >
                Log in{" "}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  &rarr;
                </span>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
