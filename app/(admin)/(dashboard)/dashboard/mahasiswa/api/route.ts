import { NextResponse } from "next/server";
import { Mahasiswa } from "@/models/Model";
import { Attributes } from "sequelize";

type MahasiswaProps = Attributes<Mahasiswa>;

export async function POST(req: Request) {
  const data: MahasiswaProps = await req.json();
  try {
    await Mahasiswa.create({ ...data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const mahasiswa = await Mahasiswa.findByPk(id);
    return NextResponse.json({ ...mahasiswa });
  }
  const mahasiswaList = await Mahasiswa.findAll({
    include: {
      all: true,
      nested: true,
    },
  });
  return NextResponse.json(mahasiswaList);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data: MahasiswaProps = await req.json();

  try {
    await Mahasiswa.update(
      { ...data },
      { where: { id_mahasiswa: Number(id) } }
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Mahasiswa.destroy({ where: { id_mahasiswa: Number(id) } });
  return NextResponse.json({ ok: true });
}
