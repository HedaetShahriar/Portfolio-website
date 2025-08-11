import Image from 'next/image';

const ProjectModal = ({ project, onClose }) => {
    return (
        <div className="modal-backdrop fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="glass-effect rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-white">{project.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-white text-4xl leading-none">&times;</button>
                    </div>
                    <Image src={project.image} alt={project.name} width={600} height={400} className="w-full h-64 object-cover rounded-lg mb-6 shadow-md" />
                    <div className="space-y-6 text-gray-400">
                        <div><h4 className="font-bold text-lg mb-2 text-white">Description</h4><p>{project.description}</p></div>
                        <div><h4 className="font-bold text-lg mb-2 text-white">Technology Stack</h4><p className="font-mono text-cyan-400">{project.techStack}</p></div>
                        <div><h4 className="font-bold text-lg mb-2 text-white">Challenges</h4><p>{project.challenges}</p></div>
                        <div><h4 className="font-bold text-lg mb-2 text-white">Future Improvements</h4><p>{project.improvements}</p></div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">Live Project</a>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300">GitHub Repo</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;