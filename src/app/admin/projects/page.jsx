"use client";
import { useState, useEffect } from 'react';
import AddEditProjectModal from '@/components/admin/AddEditProjectModal';
import EditDeleteButtons from '@/components/admin/EditDeleteButtons';
import ImportProjectsModal from '@/components/admin/ImportProjectsModal';
import Swal from 'sweetalert2';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);

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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. This will permanently delete the project.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    if (res.ok) {
        fetchProjects();
        setDeletingProject(null);
        Swal.fire('Deleted!', 'The project has been deleted.', 'success');
    } else {
        Swal.fire('Error', 'Failed to delete project.', 'error');
    }
  };

  const handleTogglePublic = async (project) => {
    const result = await Swal.fire({
      title: project.public ? 'Make Private?' : 'Make Public?',
      text: project.public ? 'This project will be hidden from your website.' : 'This project will be visible on your website.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: project.public ? '#6b7280' : '#22c55e',
      cancelButtonColor: '#3085d6',
      confirmButtonText: project.public ? 'Make Private' : 'Make Public'
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`/api/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...project, public: !project.public })
    });
    if (res.ok) {
      fetchProjects();
      Swal.fire('Updated!', `Project is now ${project.public ? 'private' : 'public'}.`, 'success');
    } else {
      Swal.fire('Error', 'Failed to update project visibility.', 'error');
    }
  };

  const handleImportProjects = async (projectsArray) => {
    setImporting(true);
    try {
      for (const p of projectsArray) {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p)
        });
      }
      await fetchProjects();
      setIsImportOpen(false);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <div className="flex gap-3">
          <button onClick={() => setIsImportOpen(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg text-sm disabled:opacity-50" disabled={importing}>
            {importing ? 'Importing...' : 'Import from GitHub'}
          </button>
          <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
            Add New Project
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Project Name</th>
              <th className="p-4 text-left text-sm font-semibold">Tech Stack</th>
              <th className="p-4 text-left text-sm font-semibold">Public</th>
              <th className="p-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-4">{project.name}</td>
                <td className="p-4 font-mono text-xs text-cyan-400">{project.techStack}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleTogglePublic(project)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${project.public ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                  >
                    {project.public ? 'Public' : 'Private'}
                  </button>
                </td>
                <td className="p-4">
                  <EditDeleteButtons 
                    onEdit={() => { setEditingProject(project); setIsModalOpen(true); }}
                    onDelete={() => handleDeleteProject(project.id)}
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
      {deletingProject && null}
      {isImportOpen && (
        <ImportProjectsModal
          existingProjects={projects}
          onClose={() => setIsImportOpen(false)}
          onImport={handleImportProjects}
        />
      )}
    </div>
  );
}