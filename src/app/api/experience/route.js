import { NextResponse } from 'next/server';
import { experienceData } from '@/data/experience';

export async function GET() {
  return NextResponse.json(experienceData);
}

export async function POST(request) {
  const newExperience = await request.json();
  newExperience.id = Date.now();
  experienceData.push(newExperience);
  return NextResponse.json(newExperience, { status: 201 });
}