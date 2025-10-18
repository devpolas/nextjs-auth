import dbConnection from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    // if user exits
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // return response
    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
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
