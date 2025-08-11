"use client";
import { useState, useEffect } from 'react';
import AddEditProjectModal from '@/components/admin/AddEditProjectModal';
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal';
import EditDeleteButtons from '@/components/admin/EditDeleteButtons';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (projectData) => {
    const method = projectData.id ? 'PUT' : 'POST';
    const url = projectData.id ? `/api/projects/${projectData.id}` : '/api/projects';
    
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    });

    if (res.ok) {
        fetchProjects();
        setIsModalOpen(false);
        setEditingProject(null);
    } else {
        alert("Failed to save project.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    if (res.ok) {
        fetchProjects();
        setDeletingProject(null);
    } else {
        alert("Failed to delete project.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
          Add New Project
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Project Name</th>
              <th className="p-4 text-left text-sm font-semibold">Tech Stack</th>
              <th className="p-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4">{project.name}</td>
                <td className="p-4 font-mono text-xs text-cyan-400">{project.techStack}</td>
                <td className="p-4">
                  <EditDeleteButtons 
                    onEdit={() => { setEditingProject(project); setIsModalOpen(true); }}
                    onDelete={() => setDeletingProject(project)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddEditProjectModal 
            project={editingProject}
            onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
            onSave={handleSaveProject}
        />
      )}
      {deletingProject && (
        <DeleteConfirmationModal
            onConfirm={() => handleDeleteProject(deletingProject.id)}
            onCancel={() => setDeletingProject(null)}
        />
      )}
    </div>
  );
}