"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function NilaiPage() {
  const mahasiswa = {
    nama: "John Doe",
    nim: "123456789",
    kelas: "A1",
    tahun: "2023",
    prodi: "Computer Science",
    pasFotoUrl: "/path/to/pasfoto.jpg", // Replace with the actual URL of the pas foto
    nilai: [
      { nama: "Course A", kode: "A101", sks: 3, semester: "Ganjil", nilai: 85 },
      { nama: "Course B", kode: "B202", sks: 4, semester: "Genap", nilai: 92 },
      // Add more nilai data as needed
    ],
  };

  return (
    <div className="p-4">
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
            Tahun: {mahasiswa.tahun} | Prodi: {mahasiswa.prodi}
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
          {mahasiswa.nilai.map((nilai) => (
            <tr key={nilai.kode}>
              <td className="border p-2">{nilai.nama}</td>
              <td className="border p-2">{nilai.kode}</td>
              <td className="border p-2">{nilai.sks}</td>
              <td className="border p-2">{nilai.semester}</td>
              <td className="border p-2">{nilai.nilai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
