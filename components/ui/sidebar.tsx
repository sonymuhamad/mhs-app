"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="bg-gray-400 text-white h-screen flex-col w-64 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Section</h1>
      <ul className="space-y-2">
        <li>
          <Link
            href="/dashboard"
            className={clsx(
              "block py-2 px-4 rounded hover:bg-gray-600",
              pathName === "/dashboard" && "underline"
            )}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={clsx(
              "block py-2 px-4 rounded hover:bg-gray-600",
              pathName === "/dashboard/mahasiswa" && "underline"
            )}
            href="/dashboard/mahasiswa"
          >
            Mahasiswa
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/matkul"
            className={clsx(
              "block py-2 px-4 rounded hover:bg-gray-600",
              pathName === "/dashboard/matkul" && "underline"
            )}
          >
            Mata Kuliah
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/nilai"
            className={clsx(
              "block py-2 px-4 rounded hover:bg-gray-600",
              pathName === "/dashboard/nilai" && "underline"
            )}
          >
            Nilai
          </Link>
        </li>
      </ul>

      <div className="flex items-end h-3/4 pb-6">
        <Link
          href="/"
          className={"block py-2 px-4 rounded hover:bg-gray-500 w-64"}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
