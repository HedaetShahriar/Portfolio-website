import { NextResponse } from 'next/server';
import { profileData } from '@/data/profile';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  return NextResponse.json(profileData);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const updatedProfile = await request.json();
  
  // This structure ensures that even if a nested object is not sent,
  // the existing data is preserved.
  const newProfileData = {
    ...profileData,
    ...updatedProfile,
    socialLinks: { ...profileData.socialLinks, ...updatedProfile.socialLinks },
    about: { ...profileData.about, ...updatedProfile.about },
    contact: { ...profileData.contact, ...updatedProfile.contact },
  };
  
  Object.assign(profileData, newProfileData);

  return NextResponse.json(profileData, { status: 200 });
}