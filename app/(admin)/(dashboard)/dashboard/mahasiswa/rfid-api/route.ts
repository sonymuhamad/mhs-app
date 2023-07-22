import { NextResponse } from "next/server";
import { Mahasiswa } from "@/models/Model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rfid = searchParams.get("rfid");
  if (rfid) {
    const mahasiswa = await Mahasiswa.findOne({
      where: { rfid: rfid },
      include: {
        all: true,
        nested: true,
      },
    });
    return NextResponse.json(mahasiswa);
  }

  return NextResponse.json("mahasiswa not found");
}
