
import { connectMongoDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export async function GET(req) {
  console.log("Getting user information");

  await connectMongoDB();

  const allUsers = await User.find();
  console.log('All Users', allUsers);

  return NextResponse.json(
    {
      message: "Blog updated successfully",
      users: allUsers
    },
    { status: 200 }
  );
}
