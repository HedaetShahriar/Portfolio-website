"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

const About = () => {
    useScrollReveal();
    const [about, setAbout] = useState({ paragraphs: ['Loading...'] });
    const [education, setEducation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile data for the "About Me" paragraphs
                const profileRes = await fetch('/api/profile');
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setAbout(profileData.about);
                }

                // Fetch education data
                const educationRes = await fetch('/api/education');
                if (educationRes.ok) {
                    const educationData = await educationRes.json();
                    setEducation(educationData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section id="about" className="bg-gray-900/50">
            <div className="container mx-auto px-6 py-24 md:py-32 scroll-reveal">
                <div className="grid md:grid-cols-5 gap-12 items-start">
                    {/* Left Column: About Me */}
                    <div className="md:col-span-3">
                        <div className="text-left mb-8">
                            <h2 className="text-4xl font-bold">About Me</h2>
                            <div className="w-24 h-1 bg-indigo-500 mt-4"></div>
                        </div>
                        <div className="text-gray-400 space-y-6 text-lg">
                            {about.paragraphs && about.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Education */}
                    <div className="md:col-span-2">
                        <div className="text-left mb-8">
                            <h2 className="text-4xl font-bold">Education</h2>
                            <div className="w-24 h-1 bg-indigo-500 mt-4"></div>
                        </div>
                        <div className="space-y-6">
                            {education.map(edu => (
                                <div key={edu.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
                                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                    <p className="text-gray-300 mt-1">{edu.institution}</p>
                                    <p className="text-indigo-400 text-sm mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
