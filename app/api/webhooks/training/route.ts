import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Webhook is working", req);
  try {
    const body = await req.json();
    console.log("Body", body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Webhook (training) error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
