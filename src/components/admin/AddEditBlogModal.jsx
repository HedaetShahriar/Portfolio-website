"use client";
import { useState } from 'react';

const AddEditBlogModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('[https://placehold.co/600x400/111827/f9fafb?text=Blog+Post](https://placehold.co/600x400/111827/f9fafb?text=Blog+Post)');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, content, imageUrl });
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-white">Write New Blog Post</h2>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="w-full p-2 bg-gray-700 rounded-md" required />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your content here..." className="w-full p-2 bg-gray-700 rounded-md" rows="10" required></textarea>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Publish Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditBlogModal;