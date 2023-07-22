import { Matakuliah, MatakuliahType } from "@/models/Model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const matkulList = await Matakuliah.findAll();
  return NextResponse.json(matkulList);
}

export async function POST(req: Request) {
  const data: MatakuliahType = await req.json();
  try {
    await Matakuliah.create({ ...data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Matakuliah.destroy({ where: { id_matkul: Number(id) } });
  return NextResponse.json({ ok: true });
}
