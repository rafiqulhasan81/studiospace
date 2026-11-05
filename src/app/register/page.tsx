
"use client";
import { authClient } from "@/lib/auth-client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, Image } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  

const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Password validation
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain at least one uppercase letter.");
    return;
  }

  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain at least one lowercase letter.");
    return;
  }

  try {
    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    console.log("Registration successful:", data);

// Existing session থাকলে Sign Out
await authClient.signOut();

toast.success("Account created successfully! Please login.");

// Clear form
setName("");
setEmail("");
setPhotoURL("");
setPassword("");

// Go to Login page
router.replace("/login");
  
} catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">

        <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">
          Create Your Account
        </h1>

        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          Join StudioSpace and discover creative spaces.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-200">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 dark:border-gray-700">
              <User size={20} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent py-3 outline-none dark:text-white"
              />
            </div>
          </div>

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

          {/* Photo URL Field */}
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-gray-200">
              Profile Photo URL
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 dark:border-gray-700">
              <Image size={20} className="text-gray-400" />

              <input
                type="url"
                placeholder="Enter your photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                maxLength={72}
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

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Register Button */}
          <button
  type="submit"
  disabled={isLoading}
  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isLoading ? "Creating Account..." : "Create Account"}
</button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Google Register Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
        >
          <span className="text-lg font-bold">G</span>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}
