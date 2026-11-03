
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";
// import { useState, useEffect } from "react";


// export default function Navbar() {
//   const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//     setMounted(true);
//     }, []);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   return (
//     <nav className="w-full border-b border-gray-200 bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

//         {/* Logo */}
//         <div>
//             <div className="flex items-center gap-2">
//   <Image
//     src="/studioSpace logo.png"
//     alt="StudioSpace Logo"
//     width={180}
//     height={50}
//     priority
//   />
// </div>
//           <h1 className="text-2xl font-bold text-blue-600">
//             StudioSpace
//           </h1>
//         </div>

        
// {/* Navigation Links */}
// <div className="hidden items-center gap-8 md:flex">

//   <Link
//     href="/"
//     className={
//       pathname === "/"
//         ? "font-semibold text-blue-600"
//         : "text-gray-700 hover:text-blue-600"
//     }
//   >
//     Home
//   </Link>

//   <Link
//     href="/studios"
//     className={
//       pathname === "/studios"
//         ? "font-semibold text-blue-600"
//         : "text-gray-700 hover:text-blue-600"
//     }
//   >
//     Explore Studios
//   </Link>

//   <Link
//     href="#how-it-works"
//     className="text-gray-700 hover:text-blue-600"
//   >
//     How It Works
//   </Link>

//   <Link
//     href="#about"
//     className="text-gray-700 hover:text-blue-600"
//   >
//     About Us
//   </Link>

// </div>


//         {/* Theme and Auth Buttons */}
//         <div className="flex items-center gap-3">
//           <button
//   onClick={() =>
//     setTheme(theme === "light" ? "dark" : "light")
//   }
//   aria-label="Toggle theme"
//   className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
// >
//   {!mounted ? (
//     <Sun size={20} />
//   ) : theme === "light" ? (
//     <Moon size={20} />
//   ) : (
//     <Sun size={20} />
//   )}
// </button>

//           <a href="/login">
//             Login
//           </a>

//           <a
//             href="/register"
//             className="rounded-lg bg-blue-600 px-4 py-2 text-white"
//           >
//             Register
//           </a>
//         </div>

//       </div>
//     </nav>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { UserRound } from "lucide-react";
import {
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Logout Function
  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div>
            <Image
              src="/image/studiospacelogo1.png"
              alt="StudioSpace Logo"
              width={100}
              height={30}
              priority
              className="h-auto w-[180px] object-contain"
            />
            {/* <h1 className="text-xl font-bold text-blue-600">
              StudioSpace
            </h1> */}
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-semibold text-blue-600"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300"
            }
          >
            Home
          </Link>

          <Link
            href="/studios"
            className={
              pathname === "/studios"
                ? "font-semibold text-blue-600"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300"
            }
          >
            Explore Studios
          </Link>

          <Link
            href="/#how-it-works"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
          >
            How It Works
          </Link>

          <Link
            href="/#about"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
          >
            About Us
          </Link>

        </div>

        {/* Theme and Authentication */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            aria-label="Toggle theme"
            className="rounded-lg p-2 text-gray-800 transition hover:bg-gray-100 dark:text-yellow-400 dark:hover:bg-gray-800"
          >
            {!mounted ? (
              <Sun size={20} />
            ) : theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>

          {/* Authentication */}
          {isPending ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : session?.user ? (

            // Logged-in User
            <>
            
            
{/* Logged-in User */}
<div className="relative">

  {/* Profile Button */}
  <button
    onClick={() => setIsProfileOpen(!isProfileOpen)}
    className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
  >
   <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-600">
  {session.user.image ? (
    <Image
      src={session.user.image}
      alt="User Profile"
      width={36}
      height={36}
      unoptimized
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <UserRound size={22} />
  )}
</div>

    <span className="hidden font-medium text-gray-700 sm:block dark:text-white">
      {session.user.name}
    </span>

    <ChevronDown
      size={18}
      className={`transition-transform ${
        isProfileOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Dropdown Menu */}
  {isProfileOpen && (
    <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">

      {/* User Information */}
      <div className="border-b border-gray-200 px-3 py-3 dark:border-gray-700">
        <p className="font-semibold text-gray-800 dark:text-white">
          {session.user.name}
        </p>

        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {session.user.email}
        </p>
      </div>

      {/* Dashboard */}
      <Link
        href="/dashboard"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      {/* Add Studio */}
      <Link
        href="/add-studio"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <PlusCircle size={18} />
        Add New Studio
      </Link>

      {/* My Listings */}
      <Link
        href="/my-listings"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Building2 size={18} />
        My Studio Listings
      </Link>

      {/* My Bookings */}
      <Link
        href="/my-bookings"
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <CalendarCheck size={18} />
        My Bookings
      </Link>

      {/* Logout */}
      <div className="mt-2 border-t border-gray-200 pt-2 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  )}

</div>

</>

          ) : (

            // Guest User
            <div className="flex items-center gap-3">

              <Link
                href="/login"
                className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Register
              </Link>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

