// src/models/Profile.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String },
  interest: { type: String }, // New field added here
  bio: { type: String },
  profileImage: { type: String },
  cvUrl: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
  about: {
    paragraphs: [{ type: String }],
  },
  contact: {
    email: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
  },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);