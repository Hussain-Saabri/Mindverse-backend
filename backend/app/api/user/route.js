import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("POST /api/user called");
  const { name, email,image } = await request.json();
  await connectMongoDB();
  //**********************if user already present then give access but do not add into the database***************************
  await User.findOne({ email });
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already registered, please sign in." },
      { status: 200 }
    );
  }
  await User.create({ name, email,image });
  return NextResponse.json({ message: "user regd" }, { status: 201 });
}


