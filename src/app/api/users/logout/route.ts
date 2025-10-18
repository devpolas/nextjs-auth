import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful!", success: true },
      { status: 200 }
    );
    response.cookies.set("loginToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An error occurred!" },
        { status: 500 }
      );
    }
  }
}
