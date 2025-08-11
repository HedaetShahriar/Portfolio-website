"use client";
import { useState, useEffect } from 'react';
import AddEditSkillModal from '@/components/admin/AddEditSkillModal';

export default function SkillsPage() {
  const [skills, setSkills] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSaveSkill = async (skillData) => {
    const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
    });
    if (res.ok) {
        fetchSkills();
        setIsModalOpen(false);
    } else {
        alert("Failed to save skill.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Skills</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
          Add New Skill
        </button>
      </div>

      <div className="space-y-12">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skillList.map(skill => (
                <div key={skill.id} className="bg-gray-800 p-4 rounded-lg text-center">
                  <img src={skill.badge} alt={skill.name} className="mx-auto"/>
                  {/* Edit/Delete buttons can be added here */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <AddEditSkillModal onClose={() => setIsModalOpen(false)} onSave={handleSaveSkill} />}
    </div>
  );
}