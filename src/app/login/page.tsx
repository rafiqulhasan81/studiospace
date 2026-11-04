
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
 import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  
const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
      return;
    }

    console.log("Login successful:", data);
    toast.success("Login successful! Welcome back.");

    router.push("/");
    router.refresh();

  } catch (error) {
    console.error("Login error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  }
};


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">

        <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">
          Welcome Back!
        </h1>

        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          Sign in to continue your creative journey.
        </p>

        <form onSubmit={handleLogin}>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-200">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 dark:border-gray-700">
              <Mail size={20} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent py-3 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-200">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 dark:border-gray-700">
              <Lock size={20} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent py-3 outline-none dark:text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
<button
  type="submit"
  disabled={isLoading}
  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isLoading ? "Logging in..." : "Login"}
</button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Google Login Button */}
        <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
>
  <span className="font-bold text-lg">G</span>
  Continue with Google
</button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
}
