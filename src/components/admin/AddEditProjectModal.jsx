// A modal that can be used for both adding and editing projects.
"use client";
import { useState, useEffect } from 'react';

const AddEditProjectModal = ({ project, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '', techStack: '', description: '', image: 'https://placehold.co/600x400/111827/f9fafb?text=New+Project',
        liveLink: '#', githubLink: '', challenges: '', improvements: ''
    });

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">{project ? 'Edit Project' : 'Add New Project'}</h2>
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-3xl">&times;</button>
                    </div>

                    {/* Form fields */}
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 bg-gray-700 rounded-md" rows="3"></textarea>
                    <textarea name="challenges" value={formData.challenges} onChange={handleChange} placeholder="Challenges" className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>
                    <textarea name="improvements" value={formData.improvements} onChange={handleChange} placeholder="Future Improvements" className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>
                    <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Link" className="w-full p-2 bg-gray-700 rounded-md" />
                    <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" className="w-full p-2 bg-gray-700 rounded-md" />

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditProjectModal;