"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    useScrollReveal();
    const [contact, setContact] = useState({ email: 'shahriahedaet@gmail.com', phone: '+8801741453691', whatsapp: '+8801741453691' });
    const [socialLinks, setSocialLinks] = useState({ github: 'https://github.com/HedaetShahriar', linkedin: 'https://linkedin.com/in/hedaet-shahriar', twitter: 'https://twitter.com/hedaetshahriar' });
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setContact(data.contact);
                    setSocialLinks(data.socialLinks);
                }
            } catch (error) {
                console.error("Failed to fetch contact info:", error);
            }
        };
        fetchContact();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted! (Frontend demo)");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section id="contact" className="bg-gray-900/50" suppressHydrationWarning={true}>
            <div className="container mx-auto px-6 pt-4 pb-16 md:pt-8 md:pb-24 scroll-reveal">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Get In Touch</h2>
                    <p className="text-lg text-gray-400 mt-4">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-white">Let's Connect</h3>
                        <p className="text-gray-400">
                            I'm always interested in new opportunities, whether it's a challenging project, internship, or collaboration. Feel free to reach out!
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-600/20 p-3 rounded-full"><Mail className="h-6 w-6 text-indigo-400" /></div>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:underline">{contact.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-600/20 p-3 rounded-full"><Phone className="h-6 w-6 text-indigo-400" /></div>
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a href={`tel:${contact.phone}`} className="text-cyan-400 hover:underline">{contact.phone}</a>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="bg-indigo-600/20 p-3 rounded-full"><MapPin className="h-6 w-6 text-indigo-400" /></div>
                                <div>
                                    <p className="font-semibold">Location</p>
                                    <p className="text-gray-400">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold mb-4">Follow Me</p>
                            <div className="flex space-x-4">
                                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition-colors"><Github className="h-6 w-6"/></a>
                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition-colors"><Linkedin className="h-6 w-6"/></a>
                                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition-colors"><Twitter className="h-6 w-6"/></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
