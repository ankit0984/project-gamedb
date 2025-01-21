import React from "react";
import ChangePasswd from "@/components/appComponent/auth/changePassword";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ChangePasswd />
      </div>
    </div>
  );
}
