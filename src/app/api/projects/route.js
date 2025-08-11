import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projects';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(projectsData);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const newProject = await request.json();
  newProject.id = Date.now();
  projectsData.push(newProject);
  return NextResponse.json(newProject, { status: 201 });
}