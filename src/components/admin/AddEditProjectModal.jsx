// A modal that can be used for both adding and editing projects.
"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const AddEditProjectModal = ({ project, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '', techStack: '', description: '', image: 'https://placehold.co/600x400/111827/f9fafb?text=New+Project',
        liveLink: '#', githubLink: '', challenges: '', improvements: '', public: true
    });
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (project) {
            setFormData({ public: true, ...project });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlBlur = () => {
        if (formData.image && !/^https?:\/\//i.test(formData.image) && !formData.image.startsWith('data:image')) {
            setImageError('Provide a valid image URL (http...) or upload a file.');
        } else {
            setImageError('');
        }
    };

    // Cloudinary upload (unsigned)
    const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // unsigned preset
        if (!cloudName || !preset) {
            reject(new Error('Cloudinary env vars missing'));
            return;
        }
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset', preset);
        // OPTIONAL: folder
        form.append('folder', 'portfolio_projects');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
        });
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const res = JSON.parse(xhr.responseText);
                        resolve(res.secure_url);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error('Upload failed'));
                }
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(form);
    });

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setImageError('File must be an image');
            return;
        }
        setImageError('');
        setImageLoading(true);
        setUploadProgress(0);
        try {
            const secureUrl = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, image: secureUrl }));
        } catch (err) {
            setImageError(err.message || 'Upload failed');
        } finally {
            setImageLoading(false);
            setUploadProgress(0);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleTogglePublic = () => {
        setFormData(prev => ({ ...prev, public: !prev.public }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (typeof window === 'undefined') return null;
    return createPortal(
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[1000]">
            <div className="relative bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[1010]" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">{project ? 'Edit Project' : 'Add New Project'}</h2>
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                    </div>

                    {/* Project Name */}
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" className="w-full p-2 bg-gray-700 rounded-md" required />

                    {/* Tech Stack */}
                    <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full p-2 bg-gray-700 rounded-md" required />

                    {/* Image Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Project Image</label>
                        {formData.image ? (
                            <div className="relative group w-full">
                                <img src={formData.image} alt="Project preview" className="w-full h-48 object-cover rounded border border-gray-700" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                                    <label className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-2 rounded cursor-pointer">
                                        Replace
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                    <button type="button" onClick={removeImage} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-2 rounded">Remove</button>
                                </div>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded border-gray-600 hover:border-indigo-500 cursor-pointer text-gray-400 text-sm">
                                <span className="mb-1">Click to upload image</span>
                                <span className="text-xs">PNG, JPG, JPEG</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                        )}
                        {imageLoading && (
                            <div className="flex items-center gap-3 text-xs text-indigo-400">
                                <div className="flex-1 h-1 rounded bg-gray-700 overflow-hidden">
                                    <div className="h-full bg-indigo-500 transition-all" style={{ width: `${uploadProgress}%` }} />
                                </div>
                                <span>{uploadProgress}%</span>
                            </div>
                        )}
                        {imageError && <p className="text-xs text-red-500">{imageError}</p>}
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            onBlur={handleImageUrlBlur}
                            placeholder="Or paste an image URL"
                            className="w-full p-2 bg-gray-700 rounded-md text-sm"
                        />
                        <p className="text-[11px] text-gray-500">Images are uploaded to Cloudinary (unsigned). Configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local.</p>
                    </div>

                    {/* Description */}
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 bg-gray-700 rounded-md" rows="3"></textarea>

                    {/* Challenges */}
                    <textarea name="challenges" value={formData.challenges} onChange={handleChange} placeholder="Challenges" className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>

                    {/* Improvements */}
                    <textarea name="improvements" value={formData.improvements} onChange={handleChange} placeholder="Future Improvements" className="w-full p-2 bg-gray-700 rounded-md" rows="2"></textarea>

                    {/* Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Link" className="w-full p-2 bg-gray-700 rounded-md" />
                        <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" className="w-full p-2 bg-gray-700 rounded-md" />
                    </div>

                    {/* Public/Private Toggle */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300">Visibility:</span>
                        <button
                            type="button"
                            onClick={handleTogglePublic}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${formData.public ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                        >
                            {formData.public ? 'Public' : 'Private'}
                        </button>
                    </div>

                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50" disabled={imageLoading}>Save Project</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddEditProjectModal;