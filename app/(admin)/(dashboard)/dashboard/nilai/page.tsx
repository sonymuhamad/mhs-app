"use client";
import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@mantine/core";

import usePagination from "@/hooks/usePagination";
import { Pagination } from "@mantine/core";

import { ExtendedMahasiswa,ExtendedNilai } from "@/types/mhs";

export default function NilaiPage() {
  const [mahasiswaList, setMahasiswaList] = useState<ExtendedMahasiswa[]>([]);
  const [selectedMahasiswa, setSelectedMahasiswa] =
    useState<ExtendedMahasiswa | null>(null);
  const [selectedId, setSelectedId] = useState<undefined | number>(undefined);
  const [action, setAction] = useState(0);
  const {setCurrentPage,currentPage,currentPageData,totalPages} = usePagination<ExtendedNilai>({data:selectedMahasiswa?.Nilais ?? []})
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/dashboard/mahasiswa/api");
      const mhsList: ExtendedMahasiswa[] = await res.json();
      setMahasiswaList(mhsList);
      if (selectedId) {
        const selectedMhs = mhsList.find(
          ({ id_mahasiswa }) => id_mahasiswa === selectedId
        ) as ExtendedMahasiswa;
        setSelectedMahasiswa(selectedMhs);
      }
    };
    fetchData();
  }, [action, selectedId]);

  const handleSelectMahasiswa = async (id: number) => {
    setSelectedId(Number(id));
    const selectedMhs = mahasiswaList.find(
      ({ id_mahasiswa }) => id_mahasiswa === id
    ) as ExtendedMahasiswa;
    setSelectedMahasiswa(selectedMhs);
  };

  const handleDelete = async (id:number) =>{
    await fetch(`/dashboard/nilai/api?id=${id}`,{
      method:"DELETE"
    })
    setAction(prev=>prev+1)
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="options"
        >
          Select Mahasiswa:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          id="options"
          required
          onChange={(e) => {
            handleSelectMahasiswa(Number(e.target.value));
          }}
          value={selectedId}
        >
          <option value={undefined}>Select Mahasiswa</option>
          {mahasiswaList.map(({ id_mahasiswa, nama }) => {
            return (
              <option key={id_mahasiswa} value={id_mahasiswa}>
                {nama}
              </option>
            );
          })}
        </select>
      </div>

      {selectedMahasiswa && (
        <div className="space-y-4" >
          <div className="flex justify-between items-end">
            <div className="flex">
            <div className="flex-shrink-0 w-32">
              <UserCircleIcon className="w-24 h-24" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{selectedMahasiswa.nama}</h1>
              <p className="text-lg">
                NIM: {selectedMahasiswa.nim} | Kelas: {selectedMahasiswa.kelas}
              </p>
              <p className="text-lg">
                Tahun: {selectedMahasiswa.tahun} | Prodi:{" "}
                {selectedMahasiswa.Prodi.nama_prodi}
              </p>
            </div>
            </div>
            <div>

            <Link
          href={`/dashboard/nilai/tambah/${selectedMahasiswa.id_mahasiswa}`}
          className={ "block py-2 px-4 rounded hover:bg-gray-600"}
          >
          Tambah Nilai
        </Link>

          </div>
          </div >

          <table className="w-full border-collapse border">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border p-2">Mata Kuliah</th>
                <th className="border p-2">Kode</th>
                <th className="border p-2">SKS</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Nilai</th>
                <th className="border p-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((nilai) => (
                <tr key={nilai.Matakuliah.kode}>
                  <td className="border p-2">{nilai.Matakuliah.nama}</td>
                  <td className="border p-2">{nilai.Matakuliah.kode}</td>
                  <td className="border p-2">{nilai.Matakuliah.sks}</td>
                  <td className="border p-2">{nilai.Matakuliah.semester}</td>
                  <td className="border p-2">{nilai.nilai}</td>
                  <td className="border p-2">
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => handleDelete(nilai.id_nilai)}
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
      )}
    </div>
  );
}
