import { Nilai,NilaiType} from "@/models/Model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const data: NilaiType = await req.json();
    try {
      await Nilai.create({ ...data });
      return NextResponse.json({ ok: true });
    } catch (error) {
      return NextResponse.json({ ok: false });
    }
  }
  
  export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Nilai.destroy({ where: { id_nilai: Number(id) } });
    return NextResponse.json({ ok: true });
  }
  