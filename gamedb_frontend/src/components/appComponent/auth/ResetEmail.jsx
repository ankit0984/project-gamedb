"use client";
import * as React from "react";
// import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lock,
  Timer,
  Sparkles,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "@/utils/Toastmsg";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [resendTimer, setResendTimer] = React.useState(0);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      setIsEmailValid(validateEmail(newEmail));
    } else {
      setIsEmailValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    // ${NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password
    setIsLoading(true);
    setStatus(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`;
      const response = await fetch(url, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      const { message } = result;
      if (response.ok) {
        handleSuccess(message);
        setStatus("success");
        setResendTimer(60); // Reset the timer
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
    <div className="flex items-center justify-center  p-4">
      <div className="relative w-full max-w-md animate-fadeIn">
        {/* Animated background elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-300" />
        </div>

        <div className="text-center mb-8 relative">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 bg-slate-900/90 rounded-full flex items-center justify-center border border-slate-700 backdrop-blur-xl">
              <Lock className="w-10 h-10 text-cyan-400 animate-levitate" />
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-slate-800/50 bg-slate-900/50 backdrop-blur-xl shadow-2xl animate-slideUp">
          {/* Animated border gradient */}
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl animate-borderGlow" />

          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text animate-gradient">
              Reset Password
            </CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              No worries! Enter your email below to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 
                    focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300
                    hover:border-cyan-500/50 hover:bg-slate-800/70
                    ${
                      !isEmailValid
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                    ${status === "success" ? "border-teal-500" : ""}`}
                  disabled={isLoading || status === "success"}
                />
              </div>

              {!isEmailValid && (
                <Alert className="bg-red-900/30 border-red-700/50 animate-shake">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    Please enter a valid email address.
                  </AlertDescription>
                </Alert>
              )}

              {status === "success" && (
                <Alert className="bg-teal-900/30 border-teal-700/50 animate-slideIn">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <AlertDescription className="text-teal-400">
                    Check your inbox! We've sent you instructions.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              className={`w-full group relative overflow-hidden rounded-lg transition-all duration-300
                ${
                  status === "success"
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500"
                }`}
              onClick={handleSubmit}
              disabled={
                !email || isLoading || (status === "success" && resendTimer > 0)
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500" />
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="animate-pulse">Sending...</span>
                </div>
              ) : status === "success" ? (
                <div className="flex items-center space-x-2">
                  {resendTimer > 0 ? (
                    <>
                      <Timer className="w-4 h-4 animate-pulse" />
                      <span>Resend in {resendTimer}s</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Resend Email</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Reset Password</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </div>
              )}
            </Button>

            <Button
              variant="ghost"
              className="text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300"
              onClick={() => {
                setEmail("");
                setStatus(null);
                setIsEmailValid(true);
                setResendTimer(0);
              }}
            >
              Back to login
            </Button>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
