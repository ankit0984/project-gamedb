"use client";
import React from "react";
import { useState } from "react";
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
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  KeyRound,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "@/utils/Toastmsg";

const ChangePasswordScreen = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    match: false,
  });

  const validatePassword = (password) => {
    setValidations({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === formData.confirmPassword,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPassword") {
      validatePassword(value);
    } else if (name === "confirmPassword") {
      setValidations((prev) => ({
        ...prev,
        match: value === formData.newPassword,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all validations pass
    if (!Object.values(validations).every(Boolean)) return;

    setIsLoading(true);
    setStatus(null);

    try {
      // Replace with your actual token retrieval logic
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        setStatus("error");
        throw new Error("Reset token is missing");
      }

      // API call to reset the password
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: formData.newPassword }),
      });

      const result = await response.json();
      const { message } = result;
      if (response.ok) {
        setStatus("success");
        handleSuccess(message);
        // Remove the token from the URL
        const urlWithoutToken = window.location.href.split("?")[0];
        window.history.replaceState({}, document.title, urlWithoutToken);

        // Refresh the page after removing the token
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Optional delay to show a success message
      } else {
        setStatus("error");
        handleError(message);
      }
    } catch (error) {
      handleError(message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center  p-4">
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
              <Shield className="w-10 h-10 text-cyan-400 animate-levitate" />
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-slate-800/50 bg-slate-900/50 backdrop-blur-xl shadow-2xl animate-slideUp">
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl animate-borderGlow" />

          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text animate-gradient">
              Change Password
            </CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              Create a strong password for your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <KeyRound className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                      }
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <Input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500
                        focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300
                        hover:border-cyan-500/50 hover:bg-slate-800/70"
                  />
                </div>

                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-2 px-2">
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      validations.length ? "text-teal-400" : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        validations.length ? "opacity-100" : "opacity-50"
                      }`}
                    />
                    <span>8+ characters</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      validations.number ? "text-teal-400" : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        validations.number ? "opacity-100" : "opacity-50"
                      }`}
                    />
                    <span>One number</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      validations.special ? "text-teal-400" : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        validations.special ? "opacity-100" : "opacity-50"
                      }`}
                    />
                    <span>Special char</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      validations.match ? "text-teal-400" : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        validations.match ? "opacity-100" : "opacity-50"
                      }`}
                    />
                    <span>Passwords match</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <Input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500
                      focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300
                      hover:border-cyan-500/50 hover:bg-slate-800/70"
                />
              </div>

              {status === "success" && (
                <Alert className="bg-teal-900/30 border-teal-700/50 animate-slideIn">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <AlertDescription className="text-teal-400">
                    Password successfully changed!
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full group relative overflow-hidden rounded-lg transition-all duration-300
                  bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500"
              onClick={handleSubmit}
              disabled={!Object.values(validations).every(Boolean) || isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500" />
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="animate-pulse">Updating...</span>
                </div>
              ) : (
                <span>Update Password</span>
              )}
            </Button>

            <Button
              variant="ghost"
              className="text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300"
              onClick={() => {
                setFormData({ newPassword: "", confirmPassword: "" });
                setStatus(null);
                setValidations({
                  length: false,
                  number: false,
                  special: false,
                  match: false,
                });
              }}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ChangePasswordScreen;
