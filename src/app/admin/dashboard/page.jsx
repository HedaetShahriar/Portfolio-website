"use client";
import { useSession } from 'next-auth/react';
import { FileText, Sparkles, GraduationCap, PlusCircle, Edit } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import QuickLink from '@/components/admin/QuickLink';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projectCount, setProjectCount] = useState(0);

  // In a real app, you'd fetch all these counts from your API/database.
  useEffect(() => {
    const fetchProjectCount = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjectCount(data.length);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };
    fetchProjectCount();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name || 'Admin'}!</h1>
      <p className="text-gray-400 mb-8">Here's a summary of your portfolio content.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Projects" value={projectCount} icon={FileText} />
        <StatCard title="Total Skills" value="14" icon={Sparkles} /> 
        <StatCard title="Education Entries" value="1" icon={GraduationCap} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <QuickLink href="/admin/projects" icon={PlusCircle}>Add New Project</QuickLink>
            <QuickLink href="/admin/skills" icon={PlusCircle}>Add New Skill</QuickLink>
            <QuickLink href="/admin/profile" icon={Edit}>Edit Profile</QuickLink>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4 text-gray-400">
            <p>No recent activity to display.</p>
            {/* In a real application, this would be a list of recent changes */}
            {/* Example: <p>You added a new project: "Super Cool App".</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}