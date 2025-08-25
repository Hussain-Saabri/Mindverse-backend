import { connectMongoDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
// POST: Add new blog
export async function POST(request) {
  console.log("POST /api/blog called");

  try {
    const { title, slug, blogcategory, tags, status, description } = await request.json();
    await connectMongoDB();
    const res=await Blog.create({ title, slug, blogcategory, tags, status, description,viewsCount: 0 });
    console.log("Result",res)
    return NextResponse.json({ message: "Blog has been added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding blog", error }, { status: 500 });
  }
}

// GET: Fetch one blog (by id) or all blogs
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectMongoDB();
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    const blogs = await Blog.find().sort({ createdAt: -1 });;
    return NextResponse.json(blogs);
  } catch (error) {
    console.log("consling the error in server",error);
    return NextResponse.json({ message: "Error fetching blogs", error }, { status: 500 });
  }
}

// PUT: Update a blog
export async function PUT(req) {
  console.log("Inside the put function");
    const body = await req.json(); // 
    const { _id, title, slug, blogcategory, tags, status, description, audioLink } = body;
    //connecting to the mongodb
    await connectMongoDB();
    //updating the blog by id 
    await Blog.updateOne({ _id }, {
            title, slug, description, blogcategory, tags, status, audioLink
        });
      return NextResponse.json({ message: "Blog updated successfully" });
  
}

// Delete:Delete an blog
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await connectMongoDB();
    const result = await Blog.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Blog deleted successfully" });
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
