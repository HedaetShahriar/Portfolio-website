// src/components/admin/AddProjectModal.jsx
// NEW FILE: A modal component with a form for adding new projects.

"use client";
import { useState } from 'react';

const AddProjectModal = ({ onClose, onAddProject }) => {
    const [name, setName] = useState('');
    const [techStack, setTechStack] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('https://placehold.co/600x400/111827/f9fafb?text=New+Project');
    const [liveLink, setLiveLink] = useState('#');
    const [githubLink, setGithubLink] = useState('');
    const [challenges, setChallenges] = useState('');
    const [improvements, setImprovements] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = { name, techStack, description, image, liveLink, githubLink, challenges, improvements };
        onAddProject(newProject);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Add New Project</h2>
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-3xl">&times;</button>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2">Project Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Tech Stack (comma-separated)</label>
                        <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" rows="3"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Challenges</label>
                        <textarea value={challenges} onChange={(e) => setChallenges(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Future Improvements</label>
                        <textarea value={improvements} onChange={(e) => setImprovements(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">GitHub Link</label>
                        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md" />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Add Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
