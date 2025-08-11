import { NextResponse } from 'next/server';
import { educationData } from '@/data/education';

export async function GET() {
  return NextResponse.json(educationData);
}

export async function POST(request) {
  const newEducation = await request.json();
  newEducation.id = Date.now();
  educationData.push(newEducation);
  return NextResponse.json(newEducation, { status: 201 });
}