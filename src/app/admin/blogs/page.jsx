"use client";
import { useState, useEffect } from 'react';
import AddEditBlogModal from '@/components/admin/AddEditBlogModal';
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal';
import EditDeleteButtons from '@/components/admin/EditDeleteButtons';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState(null);

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
    const res = await fetch(`/api/blogs/${postId}`, { method: 'DELETE' });
    if (res.ok) { fetchPosts(); setDeletingPost(null); } 
    else { alert("Failed to delete post."); }
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
                    <EditDeleteButtons onEdit={() => alert("Edit coming soon.")} onDelete={() => setDeletingPost(post)} />
                </div>
                <p className="text-gray-400 mt-4 truncate">{post.content}</p>
            </div>
        )) : (
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center text-gray-400">
                <p>No blog posts have been written yet.</p>
            </div>
        )}
      </div>

      {isModalOpen && <AddEditBlogModal onClose={() => setIsModalOpen(false)} onSave={handleSavePost} />}
      {deletingPost && <DeleteConfirmationModal onConfirm={() => handleDeletePost(deletingPost.id)} onCancel={() => setDeletingPost(null)} />}
    </div>
  );
}