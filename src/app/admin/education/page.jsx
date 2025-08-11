"use client";
import { useState, useEffect } from 'react';
import AddEditEducationModal from '@/components/admin/AddEditEducationModal';

export default function EducationPage() {
  const [education, setEducation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEducation = async () => {
    const res = await fetch('/api/education');
    const data = await res.json();
    setEducation(data);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSaveEducation = async (eduData) => {
    const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eduData),
    });
    if (res.ok) {
        fetchEducation();
        setIsModalOpen(false);
    } else {
        alert("Failed to save education entry.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Education</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
          Add Education
        </button>
      </div>
      
      <div className="space-y-6">
        {education.map(edu => (
            <div key={edu.id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                    <p className="text-indigo-400 text-sm">{edu.year}</p>
                </div>
                {/* Edit/Delete buttons can be added here */}
            </div>
        ))}
      </div>

      {isModalOpen && <AddEditEducationModal onClose={() => setIsModalOpen(false)} onSave={handleSaveEducation} />}
    </div>
  );
}