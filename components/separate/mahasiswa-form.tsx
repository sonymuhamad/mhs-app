"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProdiType } from "@/models/Model";

const MahasiswaForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    kelas: "",
    tahun: 0,
    rfid: "",
    prodi_id: "",
  });
  const [prodiList, setProdiList] = useState<ProdiType[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch("/dashboard/prodi/api")
      .then((res) => res.json())
      .then((data) => {
        setProdiList(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can do something with the form data here, like sending it to a server.
    const res = await fetch("/dashboard/mahasiswa/api", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const body = await res.json();
    console.log(body);
    if (body.ok) {
      router.push("/dashboard/mahasiswa");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Mahasiswa Form
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700"
          >
            Nama:
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nim"
            className="block text-sm font-medium text-gray-700"
          >
            NIM:
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={formData.nim}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="options"
          >
            Select Prodi:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="options"
            required
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                prodi_id: e.target.value,
              }));
            }}
            value={formData.prodi_id}
          >
            {prodiList.map(({ id_prodi, nama_prodi }) => {
              return (
                <option key={id_prodi} value={id_prodi}>
                  {nama_prodi}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="kelas"
            className="block text-sm font-medium text-gray-700"
          >
            Kelas:
          </label>
          <input
            type="text"
            id="kelas"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tahun"
            className="block text-sm font-medium text-gray-700"
          >
            Tahun:
          </label>
          <input
            type="number"
            id="tahun"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rfid"
            className="block text-sm font-medium text-gray-700"
          >
            RFID:
          </label>
          <input
            type="text"
            id="rfid"
            name="rfid"
            value={formData.rfid}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MahasiswaForm;
