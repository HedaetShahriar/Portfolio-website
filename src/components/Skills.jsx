"use client";
import useScrollReveal from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';

const Skills = () => {
    useScrollReveal();
    const [skills, setSkills] = useState(null);

    useEffect(() => {
        const skillsData = {
            "Frontend": [
                { name: 'HTML5', badge: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
                { name: 'CSS3', badge: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' },
                { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
                { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
                { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' }
            ],
            "Backend": [
                { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' },
                { name: 'Express.js', badge: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge' },
                { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
                { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white' },
                { name: 'PHP', badge: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white' }
            ],
            "Tools": [
                { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
                { name: 'VS Code', badge: 'https://img.shields.io/badge/VS%20Code-0078d4?style=for-the-badge&logo=visual-studio-code&logoColor=white' },
                { name: 'Netlify', badge: 'https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white' },
                { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' }
            ]
        };
        setSkills(skillsData);
    }, []);

    return (
        <section id="skills">
            <div className="container mx-auto px-6 py-24 md:py-32 scroll-reveal">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Technical Skills</h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                </div>
                <div className="space-y-12">
                    {skills && Object.entries(skills).map(([category, skillList]) => (
                        <div key={category}>
                            <h3 className="text-2xl font-bold text-center mb-6 text-cyan-400">{category}</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {skillList.map(skill => (
                                    <div key={skill.name} className="skill-card-glossy rounded-lg p-3 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                        <img src={skill.badge} alt={skill.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;