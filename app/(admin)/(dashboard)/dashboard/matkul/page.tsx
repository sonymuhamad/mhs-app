"use client";

import { useState, useEffect } from "react";
import { MatakuliahType } from "@/models/Model";
import { Button, Pagination } from "@mantine/core";
import Link from "next/link";
import usePagination from "@/hooks/usePagination";

export default function MatkulPage() {
  const [matkulList, setMatkulList] = useState<MatakuliahType[]>([]);
  const [action, setAction] = useState(0);
  const {currentPage,currentPageData,setCurrentPage,totalPages} = usePagination<MatakuliahType>({data:matkulList})
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/dashboard/matkul/api");
      const mhsList = await res.json();
      setMatkulList(mhsList);
    };
    fetchData();
  }, [action]);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/dashboard/matkul/api?id=${id}`, {
        method: "DELETE",
      });
      setAction((prev) => prev + 1);
    } catch (error) {}
  };

  return (
    <div className="p-4 space-y-4">
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <Link
          href="/dashboard/matkul/tambah"
          className={"block py-2 px-4 rounded hover:bg-gray-600"}
        >
          Tambah
        </Link>
      </div>
      <table className="w-full border-collapse border">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kode</th>
            <th className="border p-2">SKS</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(({ id_matkul, nama, kode, sks, semester }) => (
            <tr key={id_matkul}>
              <td className="border p-2">{nama}</td>
              <td className="border p-2">{kode}</td>
              <td className="border p-2">{sks}</td>
              <td className="border p-2">{semester}</td>
              <td className="border p-2">
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => handleDelete(id_matkul)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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
