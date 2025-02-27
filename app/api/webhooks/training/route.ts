import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Body", body);

  return NextResponse.json({ success: true }, { status: 201 });
}
