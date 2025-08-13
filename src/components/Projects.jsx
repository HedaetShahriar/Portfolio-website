"use client";
import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { projectsData } from '@/data/projects'; // Import data
import { Eye, ExternalLink } from 'lucide-react'; // Import icons

// Dynamically import the modal to reduce initial page load size
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
                    <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {projectsData.map(project => (
                            <div key={project.id} className="bg-gray-900 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group border border-transparent hover:border-indigo-500 flex flex-col">
                                <div className="overflow-hidden">
                                    <Image src={project.image} alt={project.name} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.split(', ').map(tech => (
                                            <span key={tech} className="bg-gray-800 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Button Group */}
                                    <div className="mt-auto flex gap-3 justify-between">
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gray-800 text-gray-300 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300 text-sm w-full">
                                            <ExternalLink className="h-4 w-4 mr-2"/> Live
                                        </a>
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center w-full justify-center bg-gray-800 text-gray-300 font-semibold py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 text-sm">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg> Code
                                        </a>
                                        <button onClick={() => setSelectedProject(project)} className="flex items-center w-full justify-center bg-gray-800 text-cyan-400 font-semibold py-2 px-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition duration-300 text-sm">
                                            <Eye className="h-4 w-4 mr-2"/> Details
                                        </button>
                                    </div>
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
