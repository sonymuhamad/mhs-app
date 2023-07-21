import React from 'react';
import Link from "next/link";


export default function MyTable() {
  // Sample data, replace with your own data
  const data = [
    { mataKuliah: "Course A", kode: "A101", sks: 3, semester: "Ganjil", nilai: 85 },
    { mataKuliah: "Course B", kode: "B202", sks: 4, semester: "Genap", nilai: 92 },
    // Add more data as needed
  ];

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Mata Kuliah</th>
          <th>Kode</th>
          <th>SKS</th>
          <th>Semester</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.mataKuliah}</td>
            <td>{row.kode}</td>
            <td>{row.sks}</td>
            <td>{row.semester}</td>
            <td>{row.nilai}</td>
          </tr>
        ))}
      </tbody>
    </table><div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link
          href="/dashboard/mahasiswa/tambah"
        >
          Tambah
        </Link>

        </div>
        </div>)}

        