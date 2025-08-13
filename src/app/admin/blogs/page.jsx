"use client";
import { useState, useEffect } from 'react';
import AddEditBlogModal from '@/components/admin/AddEditBlogModal';
import EditDeleteButtons from '@/components/admin/EditDeleteButtons';
import Swal from 'sweetalert2';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSavePost = async (postData) => {
    const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    if (res.ok) { fetchPosts(); setIsModalOpen(false); } 
    else { alert("Failed to save post."); }
  };

  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. This will permanently delete the blog post.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`/api/blogs/${postId}`, { method: 'DELETE' });
    if (res.ok) {
        fetchPosts();
        setDeletingPost(null);
        Swal.fire('Deleted!', 'The blog post has been deleted.', 'success');
    } else {
        Swal.fire('Error', 'Failed to delete blog post.', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Write New Post</button>
      </div>
      
      <div className="space-y-6">
        {posts.length > 0 ? posts.map(post => (
            <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <EditDeleteButtons 
                      onEdit={() => { setEditingPost(post); setIsModalOpen(true); }}
                      onDelete={() => handleDeletePost(post.id)}
                    />
                </div>
                <p className="text-gray-400 mt-4 truncate">{post.content}</p>
            </div>
        )) : (
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center text-gray-400">
                <p>No blog posts have been written yet.</p>
            </div>
        )}
      </div>

      {isModalOpen && <AddEditBlogModal onClose={() => setIsModalOpen(false)} onSave={handleSavePost} initialData={editingPost} />}
    </div>
  );
}