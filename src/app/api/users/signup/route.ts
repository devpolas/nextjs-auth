import { mongoConnection } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

mongoConnection();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { username, email, password } = reqBody;

  console.log(reqBody);

  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
