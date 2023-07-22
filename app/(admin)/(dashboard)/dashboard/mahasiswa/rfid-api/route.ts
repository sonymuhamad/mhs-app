import { NextResponse } from "next/server";
import { Mahasiswa } from "@/models/Model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idrfid = searchParams.get("rfid");
  if (idrfid) {
    const mahasiswaList = await Mahasiswa.findAll({
      include: {
        all: true,
        nested: true,
      },
    });
    const mahasiswa = mahasiswaList.find(({ rfid }) => rfid === idrfid);
    if (mahasiswa) {
      const mhs = JSON.parse(mahasiswa.toJSON() as unknown as string);
      console.log(mhs);
      return NextResponse.json(mhs);
    } else {
      return NextResponse.json("mahasiswa not found");
    }
  }
  return NextResponse.json("mahasiswa not found");
}
