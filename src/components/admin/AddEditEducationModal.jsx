"use client";
import { useState } from 'react';

const AddEditEducationModal = ({ onClose, onSave }) => {
    const [degree, setDegree] = useState('');
    const [institution, setInstitution] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ degree, institution, year });
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-white">Add Education Entry</h2>
                    <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Degree" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Institution" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year (e.g., 2020 - 2024)" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Save Entry</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditEducationModal;