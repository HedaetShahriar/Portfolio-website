"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import axios from 'axios';

const Hero = () => {
    useScrollReveal();
    const [profile, setProfile] = useState({
        name: "Md. Hedaet Shahriar Himon",
        designation: "MERN Stack Developer",
        interest: "AI/ML Enthusiast & Robotics",
        bio: "I build scalable, efficient, and beautiful web applications from front to back.",
        socialLinks: {
            github: "https://github.com/HedaetShahriar",
            linkedin: "https://linkedin.com/in/hedaet-shahriar",
            twitter: "https://twitter.com/hedaetshahriar"
        },
        cvUrl: '/Hedaet-Shahriar-Resume.pdf',
        profileImage: "/profile.jpg"
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile');
                if (res.status === 200) {
                    setProfile(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);
    const downloadFile = async (url, filename) => {
        const res = await fetch(url);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename; // your desired file name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
    };


    return (
        <section id="home" className="relative overflow-hidden">
            <div className="container relative mx-auto px-6 pb-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                <div className="md:w-3/5 text-center md:text-left">
                    <p className="text-lg text-indigo-400 font-semibold scroll-reveal">{profile.designation}</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white scroll-reveal">{profile.name}</h1>
                    <p className='mb-5 font-semibold scroll-reveal text-gray-400'>{profile.interest}</p>
                    <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto md:mx-0 scroll-reveal" style={{ transitionDelay: '200ms' }}>{profile.bio}</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start scroll-reveal" style={{ transitionDelay: '300ms' }}>
                        <button
                            onClick={() => downloadFile(profile.cvUrl, "Md. Hedaet Shahriar Himon CV.pdf")}
                            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700"
                        >
                            Download Resume
                        </button>
                    </div>
                    {/* Social Links with Lucide Icons */}
                    <div className="mt-12 flex justify-center md:justify-start space-x-6 scroll-reveal">
                        <a
                            href={profile.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="GitHub"
                        >
                            <Github size={32} strokeWidth={2.2} className="transition-colors duration-200" />
                        </a>
                        <a
                            href={profile.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={32} strokeWidth={2.2} className="transition-colors duration-200" />
                        </a>
                        <a
                            href={profile.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition"
                            aria-label="Twitter"
                        >
                            <Twitter size={32} strokeWidth={2.2} className="transition-colors duration-200" />
                        </a>
                    </div>
                </div>
                <div className="md:w-2/5 flex justify-center md:justify-end mt-10 md:mt-0">
                    <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative scroll-reveal" style={{ transitionDelay: '200ms' }}>
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        {profile.profileImage && profile.profileImage.startsWith('data:') ? (
                            <img src={profile.profileImage} alt="Md. Hedaet Shahriar Himon" className="relative w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl" />
                        ) : (
                            <Image src={profile.profileImage} alt="Md. Hedaet Shahriar Himon" width={400} height={400} className="relative w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;