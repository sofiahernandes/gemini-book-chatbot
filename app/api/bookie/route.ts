import { NextResponse } from "next/server";
import { sendToBookie } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const response = await sendToBookie(message, history || []);
    return NextResponse.json({ response });
  } catch (err: any) {
    console.error("Error in /api/bookie:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
