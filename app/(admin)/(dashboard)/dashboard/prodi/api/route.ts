import { NextResponse } from "next/server";
import { Prodi} from "@/models/Model";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {

      const prodi = await Prodi.findByPk(id);
      return NextResponse.json(prodi);
    }
    const prodiList = await Prodi.findAll();
    return NextResponse.json(prodiList);
  }
  