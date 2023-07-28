
import {
    MahasiswaType,
    NilaiType,
    ProdiType,
    MatakuliahType,
  } from "@/models/Model";

export type ExtendedNilai = NilaiType & {
    Matakuliah: MatakuliahType;
  };
  
  export type ExtendedMahasiswa = MahasiswaType & {
    Nilais: ExtendedNilai[];
    Prodi: ProdiType;
  };