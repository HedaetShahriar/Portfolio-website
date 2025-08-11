"use client";
import { useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

const Contact = () => {
    useScrollReveal();
    const [contact, setContact] = useState({ email: '', phone: '', whatsapp: '' });

    useEffect(() => {
        const fetchContact = async () => {
            const res = await fetch('/api/profile'); // Fetch from the main profile endpoint
            const data = await res.json();
            setContact(data.contact); // Access the nested 'contact' object
        };
        fetchContact();
    }, []);

    return (
        <section id="contact" className="bg-gray-900/50">
            <div className="container mx-auto px-6 py-24 md:py-32 text-center scroll-reveal">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Get In Touch</h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                </div>
                <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">I'm currently open to new opportunities. My inbox is always open, so feel free to reach out!</p>
                <div className="space-y-6 text-lg">
                    <p><strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:underline">{contact.email}</a></p>
                    <p><strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-cyan-400 hover:underline">{contact.phone}</a></p>
                    <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${contact.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{contact.whatsapp}</a></p>
                </div>
            </div>
        </section>
    );
};

export default Contact;