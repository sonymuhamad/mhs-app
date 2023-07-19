"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Logo
        </Link>
        <div className="space-x-4">
          <Link
            href="/nilai"
            className={clsx(
              "text-gray-800 hover:text-gray-600 hover:underline font-semibold",
              path === "/nilai" && "underline"
            )}
          >
            Nilai
          </Link>
          <Link
            href="/test"
            className={clsx(
              "text-gray-800 hover:text-gray-600 hover:underline font-semibold",
              path === "/test" && "underline"
            )}
          >
            Tap
          </Link>
          <Link
            target="_blank"
            href="/login"
            className="text-gray-800 hover:text-gray-600 hover:underline font-semibold"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
