import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

type Data = {
  rfid: string;
};

export async function POST(req: NextRequest) {
  const data: Data = await req.json();
  socket.emit("rfid-tap", JSON.stringify(data));

  return NextResponse.json({ ok: true });
}
