"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

const About = () => {
    useScrollReveal();
    const [about, setAbout] = useState({ paragraphs: ['Loading...'] });

    useEffect(() => {
        const fetchAbout = async () => {
            const res = await fetch('/api/profile');
            const data = await res.json();
            setAbout(data.about);
        };
        fetchAbout();
    }, []);

    return (
        <section id="about" className="bg-gray-900/50">
            <div className="container mx-auto px-6 py-24 md:py-32 scroll-reveal">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">About Me</h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center text-gray-400 space-y-6 text-lg">
                    {about.paragraphs && about.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
