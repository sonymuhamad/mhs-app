"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MahasiswaType } from "@/models/Model";
import { Button } from "@mantine/core";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@mantine/core";

export default function MahasiswaPage() {
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaType[]>([]);
  const [action, setAction] = useState(0);
  const {currentPageData,setCurrentPage,totalPages,currentPage} = usePagination<MahasiswaType>({data:mahasiswaList})

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
    <div className="p-4 space-y-4">
         <div className="flex justify-end">
        <Link
          href="/dashboard/mahasiswa/tambah"
          className={"block py-2 px-4 rounded hover:bg-gray-600"}
        >
          Tambah
        </Link>
      </div>
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
          {currentPageData.map(
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
      <Pagination
        total={totalPages}
        onChange={setCurrentPage}
        value={currentPage}
      />
    </div>
  );
}
