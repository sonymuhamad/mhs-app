"use client";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import io from "socket.io-client";

import { ExtendedMahasiswa,ExtendedNilai } from "@/types/mhs";
import { Pagination } from "@mantine/core";
import usePagination from "@/hooks/usePagination";

type Data = {
  rfid: string;
};
export default function NilaiPage() {
  const [readyToTap, setReadyToTap] = useState(false);
  const [rfid, setRfid] = useState("");
  const [mahasiswa, setMahasiswa] = useState<null | ExtendedMahasiswa>(null);
  const {currentPage,currentPageData,setCurrentPage,totalPages} = usePagination<ExtendedNilai>({data:mahasiswa?.Nilais??[]})
  
  const socket = io(process.env.BASE_SOCKET_URL);
  socket.on("read-rfid", (data) => {
    const rfidData: Data = JSON.parse(data);
    setRfid(rfidData.rfid);
  });

  const handleTap = () => {
    setReadyToTap((prev) => !prev);
  };

  useEffect(() => {
    const fetchMhs = async () => {
      const res = await fetch(`/dashboard/mahasiswa/rfid-api?rfid=${rfid}`);
      const mahasiswa = await res.json();
      setMahasiswa(mahasiswa);
    };

    fetchMhs();
  }, [rfid]);

  return (
    <div className="p-4">
      {rfid === "" && (
        <div className="flex flex-col items-center justify-center h-screen">
          <button
            className={clsx(
              "w-64 h-64 rounded-full hover:text-2xl bg-zinc-500 text-white text-xl font-bold flex items-center justify-center cursor-pointer  border-8 border-zinc-700 p-8",
              readyToTap &&
                "w-64 h-64 rounded-full bg-neutral-300 text-white text-xl font-bold flex items-center justify-center  animate-pulse border-8 border-gray-500 p-8"
            )}
            onClick={handleTap}
          >
            {readyToTap ? "Waiting for RFID" : "Start Tap"}
          </button>
        </div>
      )}

      {rfid !== "" && !mahasiswa && (
        <div>
          <span>Mahasiswa dengan rfid tersebut tidak ditemukan</span>
        </div>
      )}

      {rfid !== "" && mahasiswa && typeof mahasiswa !== "string" && (
        <div className="space-y-4" >
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-32">
              <UserCircleIcon className="w-24 h-24" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{mahasiswa.nama}</h1>
              <p className="text-lg">
                NIM: {mahasiswa.nim} | Kelas: {mahasiswa.kelas}
              </p>
              <p className="text-lg">
                Tahun: {mahasiswa.tahun} | Prodi: {mahasiswa.Prodi.nama_prodi}
              </p>
            </div>
          </div>
          <table className="w-full border-collapse border">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="border p-2">Mata Kuliah</th>
                <th className="border p-2">Kode</th>
                <th className="border p-2">SKS</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Nilai</th>
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
