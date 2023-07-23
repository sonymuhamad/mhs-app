import { NextResponse } from "next/server";
import { Mahasiswa } from "@/models/Model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idrfid = searchParams.get("rfid");
  if (idrfid) {
    const mahasiswa = await Mahasiswa.findOne({
      where: { rfid: idrfid },
      include: {
        all: true,
        nested: true,
      },
    });
    if (mahasiswa) {
      return NextResponse.json(mahasiswa);
    } else {
      return NextResponse.json("mahasiswa not found");
    }
  }
  return NextResponse.json("mahasiswa not found");
}
