// This new API route handles updating and deleting a specific project by its ID.
import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projects';

// PUT handler to update a project
export async function PUT(request, { params }) {
  const { id } = params;
  const updatedProject = await request.json();
  const projectIndex = projectsData.findIndex(p => p.id == id);

  if (projectIndex === -1) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  projectsData[projectIndex] = { ...projectsData[projectIndex], ...updatedProject };
  return NextResponse.json(projectsData[projectIndex]);
}

// DELETE handler to remove a project
export async function DELETE(request, { params }) {
  const { id } = params;
  const projectIndex = projectsData.findIndex(p => p.id == id);

  if (projectIndex === -1) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  projectsData.splice(projectIndex, 1);
  return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
}