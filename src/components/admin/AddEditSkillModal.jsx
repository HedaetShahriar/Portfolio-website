"use client";
import { useState } from 'react';
import { skillSuggestions } from '@/data/skill-suggestions';
import { createPortal } from 'react-dom';

const AddEditSkillModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Frontend');
    const [badge, setBadge] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value) {
            const filtered = skillSuggestions.filter(skill => 
                skill.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setName(suggestion.name);
        setBadge(suggestion.badge);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, category, badge });
    };

    if (typeof window === 'undefined') return null;
    return createPortal(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[1000]">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg z-[1010]">
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Add New Skill</h2>
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-3xl">&times;</button>
                    </div>

                    <div className="relative">
                        <label className="block text-gray-400 mb-2">Skill Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={handleNameChange} 
                            placeholder="e.g., TypeScript" 
                            className="w-full p-2 bg-gray-700 rounded-md" 
                            required 
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute w-full bg-gray-700 border border-gray-600 rounded-md mt-1 max-h-40 overflow-y-auto z-[1020]">
                                {suggestions.map(suggestion => (
                                    <li 
                                        key={suggestion.name} 
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="p-2 hover:bg-indigo-600 cursor-pointer"
                                    >
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-gray-400 mb-2">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md">
                            <option>Frontend</option>
                            <option>Backend</option>
                            <option>Database</option>
                            <option>Tools</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2">Badge URL</label>
                        <input 
                            type="text" 
                            value={badge} 
                            onChange={(e) => setBadge(e.target.value)} 
                            placeholder="Auto-filled or enter manually" 
                            className="w-full p-2 bg-gray-700 rounded-md" 
                            required 
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Save Skill</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddEditSkillModal;
