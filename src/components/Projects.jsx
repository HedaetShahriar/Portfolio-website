"use client";
import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { projectsData } from '@/data/projects'; // Import data

// Dynamically import the modal to reduce initial bundle size
const ProjectModal = dynamic(() => import('./ProjectModal'));

const Projects = () => {
    useScrollReveal();
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <section id="projects" className="bg-gray-900/50">
                <div className="container mx-auto px-6 pt-4 pb-16 md:pt-8 md:pb-24 scroll-reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold">My Projects</h2>
                        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                    </div>
                    <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {projectsData.map(project => (
                            <div key={project.id} className="bg-gray-900 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group border border-transparent hover:border-indigo-500">
                                <div className="overflow-hidden">
                                    <Image src={project.image} alt={project.name} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                                    <p className="text-cyan-400 mb-4 text-sm font-mono">{project.techStack}</p>
                                    <button onClick={() => setSelectedProject(project)} className="w-full bg-gray-800 text-cyan-400 font-semibold py-2 px-4 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition duration-300">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Render the modal only when a project is selected */}
            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </>
    );
};

export default Projects;