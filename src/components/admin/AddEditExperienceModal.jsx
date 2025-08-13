"use client";
import { useState } from 'react';
import { createPortal } from 'react-dom';

const AddEditExperienceModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, company, duration, description });
    };

    if (typeof window === 'undefined') return null;
    return createPortal(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[1000]">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg z-[1010]">
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-white">Add Experience</h2>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title (e.g., Frontend Developer)" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g., Jan 2023 - Present)" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Key responsibilities and achievements..." className="w-full p-2 bg-gray-700 rounded-md" rows="4"></textarea>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Save Experience</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddEditExperienceModal;
