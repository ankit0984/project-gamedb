import RegisterForm from "@/components/appComponent/auth/RegisterForm";
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
