import { mongoConnection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

mongoConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
  } catch (error: {} | any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
