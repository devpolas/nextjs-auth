import User from "@/models/userModal";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnection from "@/dbConfig/dbConfig";

dbConnection();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // user not exits
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 404 }
      );
    }
    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // generate session or token here
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const loginToken = await jwt.sign({ tokenData }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Login successful!",
        success: true,
      },
      { status: 200 }
    );
    response.cookies.set("loginToken", loginToken, {
      httpOnly: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An error occurred!" },
        { status: 500 }
      );
    }
  }
}
