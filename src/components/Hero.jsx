"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import Image from 'next/image';

const Hero = () => {
    useScrollReveal();
    // Provide a more complete initial state to prevent errors before data loads
    const [profile, setProfile] = useState({
        name: "Md. Hedaet Shahriar Himon",
        designation: "Full Stack Developer",
        bio: "I build scalable, efficient, and beautiful web applications from front to back.",
        socialLinks: {
            github: "https://github.com/HedaetShahriar",
            linkedin: "https://linkedin.com/in/hedaet-shahriar",
            twitter: "https://twitter.com/hedaetshahriar"
        },
        cvUrl: '#',
        profileImage: "https://placehold.co/400x400/030712/f9fafb?text=Himon"
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <section id="home" className="relative overflow-hidden">
            <div className="container relative mx-auto px-6 pb-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                <div className="md:w-3/5 text-center md:text-left">
                    <p className="text-lg text-indigo-400 font-semibold mb-3 scroll-reveal">{profile.designation}</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 scroll-reveal" style={{ transitionDelay: '100ms' }}>{profile.name}</h1>
                    <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto md:mx-0 scroll-reveal" style={{ transitionDelay: '200ms' }}>{profile.bio}</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start scroll-reveal" style={{ transitionDelay: '300ms' }}>
                        <a href={profile.cvUrl} download className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300">Download Resume</a>
                    </div>
                    {/* Social Links */}
                    <div className="mt-12 flex justify-center md:justify-start space-x-6 scroll-reveal" style={{ transitionDelay: '400ms' }}>
                        <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg></a>
                        <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                        <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.215 3.795 4.654-.73.198-1.522.23-2.253.085.623 1.953 2.435 3.377 4.583 3.415-1.616 1.267-3.645 2.022-5.843 2.022-1.025 0-2.03-.06-3.02-.176 2.08 1.34 4.56 2.12 7.24 2.12 8.69 0 13.45-7.21 13.45-13.45 0-.21 0-.41-.01-.61.92-.66 1.72-1.5 2.36-2.45z" /></svg></a>
                    </div>
                </div>
                <div className="md:w-2/5 flex justify-center md:justify-end mt-10 md:mt-0">
                    <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative scroll-reveal" style={{ transitionDelay: '200ms' }}>
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        {/* FIX: Conditional rendering for the image */}
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