"use client";
import React, { useState, useEffect } from "react";
import ProjectDetailsModal from "@/clients/ProjectDetailsModal";

type Project = {
  id: number;
  name: string;
  client: string;
  status: string;
  checklist: { id: number; label: string; done: boolean }[];
};

export default function ClientsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  // Example create, update, delete functions (to be wired to UI later)
  async function createProject(project: Partial<Project>) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const newProject = await res.json();
    setProjects(prev => [...prev, newProject]);
  }

  async function updateProject(id: number, updates: Partial<Project>) {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setProjects(prev => prev.map(p => (p.id === id ? updated : p)));
  }

  async function deleteProject(id: number) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="text-black">Loading...</div>
      ) : (
        projects.map(project => (
          <div key={project.id} className="bg-black border border-white rounded-lg p-6">
            <div className="text-white text-xl font-bold mb-2">{project.name}</div>
            <div className="text-white mb-1">Client: <span className="text-white">{project.client}</span></div>
            <div className="text-white mb-1">Status: <span className="text-white">{project.status}</span></div>
            <div className="mt-4">
              <div className="text-white font-semibold mb-2">Project Progress Checklist:</div>
              <ul className="space-y-1">
                {project.checklist?.map(item => (
                  <li key={item.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={item.done} readOnly className="accent-white" />
                    <span className={item.done ? "line-through text-white" : "text-white"}>{item.label}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200" onClick={() => setSelectedProject(project)}>View Details</button>
            </div>
          </div>
        ))
      )}
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
} 