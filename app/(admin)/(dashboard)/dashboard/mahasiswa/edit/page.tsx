"use client";

import React, { useState } from 'react';
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


export default function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState({
    nama: "John Doe",
    nim: "123456789",
    kelas: "A1",
    tahun: "2023",
    prodi: "Computer Science",
    nilai: [
      { nama: "Course A", kode: "A101", sks: 3, semester: "Ganjil", nilai: 85, edit: "edit" },
      { nama: "Course B", kode: "B202", sks: 4, semester: "Genap", nilai: 92, edit: "edit" },
      // Add more nilai data as needed
    ],
  });

  const pathName = usePathname();


  const [isEditing, setIsEditing] = useState(false);

  // Fungsi untuk mengaktifkan mode edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Fungsi untuk menyimpan perubahan setelah edit
  const handleSave = () => {
    setIsEditing(false);
  };

  // Fungsi untuk menambahkan data nilai baru
  const handleTambahNilai = () => {
    // Lakukan proses penambahan data nilai baru
    // Contoh:
    const newNilai = { nama: "Course C", kode: "C303", sks: 2, semester: "Ganjil", nilai: 78, edit: "edit" };
    setMahasiswa((prevMahasiswa) => ({
      ...prevMahasiswa,
      nilai: [...prevMahasiswa.nilai, newNilai],
    }));
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-32">
          {/* Tambahkan tampilan foto mahasiswa di sini */}
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
            <th className="border p-2">edit</th>
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
              <td className="border p-2">
              <Link
          href="/dashboard/mahasiswa/edit"
          className={clsx(
            "block py-2 px-4 rounded hover:bg-gray-600",
            pathName === "/dashboard" && "underline"
          )}
        >
          Edit
        </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link
          href="/dashboard/mahasiswa/tambah"
          className={clsx(
            "block py-2 px-4 rounded hover:bg-gray-600",
            pathName === "/dashboard" && "underline"
          )}
        >
          Tambah
        </Link>

        <Link
          href="/dashboard/mahasiswa/edit"
          className={clsx(
            "block py-2 px-4 rounded hover:bg-gray-600",
            pathName === "/dashboard" && "underline"
          )}
        >
          Edit
        </Link>
      </div>
    </div>
  );
          }
