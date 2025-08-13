import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Profile from '@/models/Profile';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  await dbConnect();
  try {
    // There should only ever be one profile document.
    let profile = await Profile.findOne({});

    // If no profile exists in the database, create one using the default data.
    if (!profile) {
      profile = await Profile.create({
        name: "Md. Hedaet Shahriar Himon",
        designation: "MERN Stack Developer",
        interest: "AI/ML Enthusiast & Robotics",
        bio: "I build scalable, efficient, and beautiful web applications from front to back.",
        profileImage: "/profile.jpg",
        socialLinks: {
          github: "https://github.com/HedaetShahriar",
          linkedin: "https://linkedin.com/in/hedaet-shahriar",
          twitter: "https://twitter.com/hedaetshahriar"
        },
        cvUrl: "/Hedaet-Shahriar-Resume.pdf",
        about: {
          // Now an array to hold multiple paragraphs
          paragraphs: [
            "My programming journey began with a curiosity for how things work, which quickly evolved into a passion for building dynamic and engaging web experiences. I enjoy the entire process of development, from conceptualizing a user-friendly interface to engineering a robust back-end.",
            "Outside of coding, I'm an avid follower of cricket and enjoy exploring new places, which helps me stay creative and balanced."
          ]
        },
        contact: {
          email: "shahriahedaet@gmail.com",
          phone: "+880 1741453691",
          whatsapp: "+880 1741453691"
        }
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error); // Log the full error on the server
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}

// POST handler to update the profile document in MongoDB
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const updatedProfileData = await request.json();

    // Find the single profile document and update it.
    // The 'upsert: true' option will create the document if it doesn't exist.
    const profile = await Profile.findOneAndUpdate({}, updatedProfileData, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error); // Log the full error on the server
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}