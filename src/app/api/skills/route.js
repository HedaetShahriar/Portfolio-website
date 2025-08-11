import { NextResponse } from 'next/server';
import { skillsData } from '@/data/skills';

export async function GET() {
  return NextResponse.json(skillsData);
}

export async function POST(request) {
  const { name, category, badge } = await request.json();
  const newSkill = { id: Date.now(), name, badge };

  if (!skillsData[category]) {
    skillsData[category] = [];
  }
  skillsData[category].push(newSkill);
  
  return NextResponse.json(newSkill, { status: 201 });
}