"use client";
import useScrollReveal from '@/hooks/useScrollReveal';

const Education = () => {
    useScrollReveal();
    return (
        <section id="education" className="bg-gray-900/50">
            <div className="container mx-auto px-6 py-16 md:py-24 scroll-reveal">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Education</h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                </div>
                <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg border-l-4 border-indigo-500">
                    <h3 className="text-2xl font-bold text-white">Bachelor of Science in Computer Science & Engineering</h3>
                    <p className="text-lg text-gray-300 mt-2">American International University-Bangladesh (AIUB)</p>
                    <p className="text-md text-gray-500 mt-1">Expected Graduation: 2026</p>
                </div>
            </div>
        </section>
    );
};

export default Education;