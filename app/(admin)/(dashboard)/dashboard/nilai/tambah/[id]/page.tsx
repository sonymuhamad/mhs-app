'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import {useEffect,useState} from "react"
import { MatakuliahType } from "@/models/Model"
import { ExtendedMahasiswa } from "@/types/mhs"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export default function TambahNilai(){
    const params = useParams()
    const router = useRouter()
    const {id} = params as {id:string}
    const [mahasiswa,setMahasiswa] = useState<ExtendedMahasiswa | null|undefined>(undefined)
    const [matkulList,setMatkulList] = useState<MatakuliahType[]>([])
    const [formData, setFormData] = useState({
     matkul_id:"",
     nilai:""
      });

    useEffect(()=>{
        const fetchData = async ()=>{
           const res =  await fetch(`/dashboard/mahasiswa/api?id=${id}`)
           const responseMatkul = await fetch(`/dashboard/matkul/api`)
           const matkulList:MatakuliahType[] = await responseMatkul.json()
           const mahasiswa:ExtendedMahasiswa = await res.json()
           const filteredMatkul = matkulList.filter(({id_matkul})=> !(mahasiswa.Nilais.find(({Matakuliah:{id_matkul:matkulId}})=>matkulId === id_matkul)) )
        
           setMatkulList(filteredMatkul)    
            setMahasiswa(mahasiswa)
        }
        fetchData()
    },[id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e:React.SyntheticEvent) =>{
      e.preventDefault()
      const data = {...formData,mahasiswa_id:id}
    const res = await fetch("/dashboard/nilai/api",{
      method:"POST",
      body:JSON.stringify(data)
    })
    const {ok} = await res.json()
    if(ok){
        router.push("/dashboard/nilai")
    }

    }

    if(!id || !mahasiswa){
        return <div>
            Mahasiswa Not Found
        </div>
    }


    return (
      <div>
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
          Tahun: {mahasiswa.tahun} | Prodi:{" "}
          {mahasiswa.Prodi.nama_prodi}
        </p>
      </div>
    </div>
        <div className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Nilai Form
      </h1>
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="options"
          >
          Pilih Mata Kuliah
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="options"
            required
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                matkul_id:e.target.value
              }));
            }}
            value={formData.matkul_id}
            >
           <option value={undefined}>Pilih Mata Kuliah</option>
            {matkulList.map(({ id_matkul,nama,sks }) => {
              return (
                <option key={id_matkul} value={id_matkul}>
                  {nama} || {sks} {" "} SKS
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="nilai"
            className="block text-sm font-medium text-gray-700"
            >
            Nilai:
          </label>
          <input
            type="text"
            id="nilai"
            name="nilai"
            value={formData.nilai}
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
    </div>
    )
}