"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios'; // Import axios
import { Upload, FileText, Github, Linkedin, Twitter, Mail, Phone, MessageSquare, PlusCircle, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '', designation: '', interest: '', bio: '', profileImage: '', cvUrl: '',
        socialLinks: { github: '', linkedin: '', twitter: '' },
        about: { paragraphs: [''] },
        contact: { email: '', phone: '', whatsapp: '' }
    });
    const [previewImage, setPreviewImage] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [cvFileName, setCvFileName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                // Use axios.get to fetch data
                const response = await axios.get('/api/profile');
                const data = response.data;
                setFormData(data);
                setPreviewImage(data.profileImage);
                setCvFileName(data.cvUrl ? data.cvUrl.split('/').pop() : '');
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
                alert("Could not load profile data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }));
    };

    const handleParagraphChange = (index, value) => {
        const newParagraphs = [...formData.about.paragraphs];
        newParagraphs[index] = value;
        setFormData(prev => ({
            ...prev,
            about: { ...prev.about, paragraphs: newParagraphs }
        }));
    };

    const addParagraph = () => {
        setFormData(prev => ({
            ...prev,
            about: { ...prev.about, paragraphs: [...prev.about.paragraphs, ''] }
        }));
    };

    const removeParagraph = (index) => {
        if (formData.about.paragraphs.length <= 1) return;
        const newParagraphs = formData.about.paragraphs.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            about: { ...prev.about, paragraphs: newParagraphs }
        }));
    };

    // Max file size for Cloudinary free plan
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire('Error', 'Profile image too large. Maximum 10MB allowed.', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => setPreviewImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCvChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire('Error', 'CV file too large. Maximum 10MB allowed.', 'error');
                return;
            }

            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedProfileImage = formData.profileImage;
        let updatedCvUrl = formData.cvUrl;

        // Upload image if changed
        if (previewImage && previewImage.startsWith('data:')) {
            try {
                const imgForm = new FormData();
                imgForm.append('file', document.querySelector('#profilePicture').files[0]); // use file object
                imgForm.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

                const res = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL, imgForm);
                updatedProfileImage = res.data.secure_url;
            } catch (err) {
                console.error("Image upload failed:", err);
                Swal.fire('Error', 'Failed to upload profile image.', 'error');
                return;
            }
        }

        // Upload CV if changed
        if (cvFile) {
            try {
                const cvForm = new FormData();
                cvForm.append('file', cvFile);
                cvForm.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

                // Clean original filename
                let originalName = cvFile.name.replace(/\.[^/.]+$/, ""); // remove extension
                originalName = originalName.trim().replace(/\s+/g, "_"); // remove spaces
                originalName = originalName.replace(/[^\w-]/g, ""); // remove special chars

                cvForm.append("public_id", originalName);

                const res = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_CV_URL, cvForm);
                updatedCvUrl = res.data.secure_url;
                setCvFileName(cvFile.name); // show original name in UI
            } catch (err) {
                console.error("CV upload failed:", err);
                Swal.fire('Error', 'Failed to upload CV.', 'error');
                return;
            }
        }

        // Save profile data
        try {
            await axios.post('/api/profile', {
                ...formData,
                profileImage: updatedProfileImage,
                cvUrl: updatedCvUrl,
            });
            Swal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire('Error', 'Failed to update profile.', 'error');
        }
    };


    if (isLoading) {
        return <div className="text-center p-10">Loading profile data...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Profile & Content</h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-8">

                {/* Personal Info Section */}
                <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex flex-col items-center">
                            {previewImage && previewImage.startsWith('data:') ? (
                                <img src={previewImage} alt="Profile Preview" className="rounded-full object-cover w-36 h-36 border-4 border-gray-700" />
                            ) : (
                                <Image src={previewImage || 'https://placehold.co/150x150'} alt="Profile Preview" width={150} height={150} className="rounded-full object-cover w-36 h-36 border-4 border-gray-700" />
                            )}
                            <label htmlFor="profilePicture" className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer text-sm">Change Picture</label>
                            <input type="file" id="profilePicture" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="flex-1 space-y-4">
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-700 text-white rounded-md" />
                            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation / Title" className="w-full p-3 bg-gray-700 text-white rounded-md" />
                            <input type="text" id="interest" name="interest" value={formData.interest} onChange={handleChange} placeholder="Interest (e.g., AI/ML Enthusiast)" className="w-full p-3 bg-gray-700 text-white rounded-md" />
                        </div>
                    </div>
                    <textarea id="bio" name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Introduction / Bio for Hero Section" className="w-full p-3 mt-4 bg-gray-700 text-white rounded-md"></textarea>
                </div>

                {/* About Section */}
                <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">"About Me" Section</h3>
                    <div className="space-y-4">
                        {formData.about.paragraphs.map((paragraph, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <textarea
                                    rows="5"
                                    value={paragraph}
                                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                                    placeholder={`Paragraph ${index + 1}`}
                                    className="w-full p-3 bg-gray-700 text-white rounded-md"
                                />
                                {formData.about.paragraphs.length > 1 && (
                                    <button type="button" onClick={() => removeParagraph(index)} className="text-red-500 hover:text-red-400 p-2">
                                        <XCircle className="h-6 w-6" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addParagraph} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold py-2 px-4 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20">
                            <PlusCircle className="h-5 w-5" />
                            Add Paragraph
                        </button>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3"><Mail className="h-6 w-6 text-gray-400" /><input type="email" name="email" value={formData.contact.email} onChange={(e) => handleNestedChange('contact', e)} placeholder="Email Address" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                        <div className="flex items-center gap-3"><Phone className="h-6 w-6 text-gray-400" /><input type="tel" name="phone" value={formData.contact.phone} onChange={(e) => handleNestedChange('contact', e)} placeholder="Phone Number" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                        <div className="flex items-center gap-3"><MessageSquare className="h-6 w-6 text-gray-400" /><input type="tel" name="whatsapp" value={formData.contact.whatsapp} onChange={(e) => handleNestedChange('contact', e)} placeholder="WhatsApp Number" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                    </div>
                </div>

                {/* Social Links & CV */}
                <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Social & Professional Links</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3"><Github className="h-6 w-6 text-gray-400" /><input type="url" name="github" value={formData.socialLinks.github} onChange={(e) => handleNestedChange('socialLinks', e)} placeholder="GitHub URL" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                        <div className="flex items-center gap-3"><Linkedin className="h-6 w-6 text-gray-400" /><input type="url" name="linkedin" value={formData.socialLinks.linkedin} onChange={(e) => handleNestedChange('socialLinks', e)} placeholder="LinkedIn URL" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                        <div className="flex items-center gap-3"><Twitter className="h-6 w-6 text-gray-400" /><input type="url" name="twitter" value={formData.socialLinks.twitter} onChange={(e) => handleNestedChange('socialLinks', e)} placeholder="Twitter URL" className="w-full p-3 bg-gray-700 text-white rounded-md" /></div>
                    </div>
                    <div className="bg-gray-700/50 mt-6 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4"><FileText className="h-8 w-8 text-cyan-400" /><span className="text-gray-300 truncate">{cvFileName || "No CV uploaded"}</span></div>
                        <label htmlFor="cvUpload" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"><Upload className="h-4 w-4" />Upload New CV</label>
                        <input type="file" id="cvUpload" className="hidden" accept=".pdf" onChange={handleCvChange} />
                    </div>
                </div>

                <div className="text-right pt-4">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Save All Changes</button>
                </div>
            </form>
        </div>
    );
}
