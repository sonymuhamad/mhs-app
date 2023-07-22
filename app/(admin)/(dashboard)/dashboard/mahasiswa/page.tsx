"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MahasiswaType } from "@/models/Model";
import { usePathname } from "next/navigation";
import { Button } from "@mantine/core";

export default function MahasiswaPage() {
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaType[]>([]);
  const [action, setAction] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/dashboard/mahasiswa/api");
      const mhsList = await res.json();
      setMahasiswaList(mhsList);
    };
    fetchData();
  }, [action]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/dashboard/mahasiswa/api?id=${id}`, {
        method: "DELETE",
      });
      setAction((prev) => prev + 1);
    } catch (error) {}
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIM</th>
            <th className="border p-2">Kelas</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">RFID</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map(
            ({ id_mahasiswa, nama, nim, kelas, tahun, rfid }) => (
              <tr key={id_mahasiswa}>
                <td className="border p-2">{nama}</td>
                <td className="border p-2">{nim}</td>
                <td className="border p-2">{kelas}</td>
                <td className="border p-2">{tahun}</td>
                <td className="border p-2">{rfid}</td>
                <td className="border p-2">
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => handleDelete(id_mahasiswa)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link
          href="/dashboard/mahasiswa/tambah"
          className={clsx(
            "block py-2 px-4 rounded hover:bg-gray-600",
            pathName === "/dashboard" && "underline"
          )}
        >
          Tambah
        </Link>
      </div>
    </div>
  );
}
