import { NextResponse } from "next/server";
import { sendToGia } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const response = await sendToGia(message, history || []);
    return NextResponse.json({ response });
  } catch (err: any) {
    console.error("Error in /api/gia:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
