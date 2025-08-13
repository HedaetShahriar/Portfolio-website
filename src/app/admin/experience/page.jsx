// src/app/admin/experience/page.jsx (Updated)

"use client";
import { useState, useEffect } from 'react';
import AddEditExperienceModal from '@/components/admin/AddEditExperienceModal';
import EditDeleteButtons from '@/components/admin/EditDeleteButtons';
import Swal from 'sweetalert2';

export default function ExperiencePage() {
  const [experience, setExperience] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingExperience, setDeletingExperience] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  const fetchExperience = async () => {
    const res = await fetch('/api/experience');
    const data = await res.json();
    setExperience(data);
  };

  useEffect(() => { fetchExperience(); }, []);

  const handleSaveExperience = async (expData) => {
    const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expData),
    });
    if (res.ok) { fetchExperience(); setIsModalOpen(false); } 
    else { alert("Failed to save experience."); }
  };

  const handleDeleteExperience = async (experienceId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. This will permanently delete the experience.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`/api/experience/${experienceId}`, { method: 'DELETE' });
    if (res.ok) {
        fetchExperience();
        setDeletingExperience(null);
        Swal.fire('Deleted!', 'The experience has been deleted.', 'success');
    } else {
        Swal.fire('Error', 'Failed to delete experience.', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Experience</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Add Experience</button>
      </div>
      
      <div className="space-y-6">
        {experience.length > 0 ? experience.map(exp => (
            <div key={exp.id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <p className="text-gray-400">{exp.company}</p>
                    <p className="text-indigo-400 text-sm">{exp.duration}</p>
                </div>
                <EditDeleteButtons 
                  onEdit={() => { setEditingExperience(exp); setIsModalOpen(true); }}
                  onDelete={() => handleDeleteExperience(exp.id)}
                />
            </div>
        )) : (
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center text-gray-400">
                <p>No professional experience added yet.</p>
            </div>
        )}
      </div>

      {isModalOpen && <AddEditExperienceModal 
        experience={editingExperience} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveExperience} 
      />}
    </div>
  );
}