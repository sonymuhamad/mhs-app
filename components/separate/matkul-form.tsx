"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Semester } from "@/types/nilai.d";

const MatkulForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
    sks: 0,
    semester: Semester.GANJIL,
  });

  const router = useRouter();
  const semesterList = useMemo(() => {
    return [
      {
        label: "Ganjil",
        value: Semester.GANJIL,
      },
      {
        label: "Genap",
        value: Semester.GENAP,
      },
    ];
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can do something with the form data here, like sending it to a server.
    const res = await fetch("/dashboard/matkul/api", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const body = await res.json();
    console.log(body);
    if (body.ok) {
      router.push("/dashboard/matkul");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Mata Kuliah Form
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
            htmlFor="kode"
            className="block text-sm font-medium text-gray-700"
          >
            Kode:
          </label>
          <input
            type="text"
            id="kode"
            name="kode"
            value={formData.kode}
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
            Semester:
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="options"
            required
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                semester: e.target.value as Semester,
              }));
            }}
            value={formData.semester}
          >
            {semesterList.map(({ value, label }) => {
              return (
                <option key={label} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sks"
            className="block text-sm font-medium text-gray-700"
          >
            SKS:
          </label>
          <input
            type="number"
            id="sks"
            name="sks"
            value={formData.sks}
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

export default MatkulForm;
