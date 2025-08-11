import { NextResponse } from 'next/server';
import { blogsData } from '@/data/blogs';

// DELETE handler for blogs
export async function DELETE(request, { params }) {
  const { id } = params;
  const index = blogsData.findIndex(post => post.id == id);
  if (index !== -1) {
    blogsData.splice(index, 1);
    return NextResponse.json({ message: "Blog post deleted" }, { status: 200 });
  }
  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}