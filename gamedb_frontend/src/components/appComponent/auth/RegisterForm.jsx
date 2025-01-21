"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "@/utils/Toastmsg";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const navigate = useRouter();
  const [registerInfo, setRegisterInfo] = React.useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate.push("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form className="p-6 md:p-8" onSubmit={handleRegister}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-balance text-muted-foreground">
                Sign up for your gamedb account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    required
                    onChange={handleChange}
                    value={registerInfo.username}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    value={registerInfo.fullName}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  onChange={handleChange}
                  value={registerInfo.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={registerInfo.password}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </div>
          <ToastContainer />
        </form>
        <div className="relative hidden bg-muted md:block">
          <img
            src="https://images.unsplash.com/photo-1631896928987-fce0d41e9b32?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Register background"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
