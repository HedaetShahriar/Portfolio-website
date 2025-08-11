
import { NextResponse } from 'next/server';
import { blogsData } from '@/data/blogs';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  return NextResponse.json(blogsData);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const newPost = await request.json();
  newPost.id = Date.now();
  newPost.date = new Date().toISOString(); // Add a date
  blogsData.unshift(newPost); // Add to the beginning of the array
  return NextResponse.json(newPost, { status: 201 });
}