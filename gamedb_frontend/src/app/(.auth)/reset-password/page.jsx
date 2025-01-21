import React from "react";
import ResetEmail from "@/components/appComponent/auth/ResetEmail";

export default function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ResetEmail />
      </div>
    </div>
  );
}
// , bg-gradient-to-br from-gray-950 to-gray-900
