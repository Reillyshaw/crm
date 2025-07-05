"use client";
import React, { useState } from "react";

const tabs = ["General Data", "Progress Checklist", "Feasibility Studies"];

const mockFeasibility = {
  competitors: [
    { id: 1, name: "Empire Supplies", url: "https://www.empiresuppliesonline.co.uk/" },
    { id: 2, name: "Catering", url: "https://www.ecatering.co.uk/" },
  ],
  status: "Research",
  dueDate: "2025-04-28",
};

export type { };

export default function ProjectDetailsModal({ project, onClose }: { project: any, onClose: () => void }) {
  const [tab, setTab] = useState("General Data");
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black border border-taupe rounded-lg p-8 w-full max-w-2xl relative">
        <button className="absolute top-2 right-2 text-taupe text-2xl" onClick={onClose}>&times;</button>
        <div className="text-taupe text-xl font-bold mb-2">{project.name}</div>
        <div className="flex gap-4 mb-4 border-b border-taupe pb-2">
          {tabs.map(t => (
            <button key={t} className={`px-3 py-1 rounded-t ${tab === t ? "bg-taupe text-black" : "text-taupe"}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="text-white min-h-[120px]">
          {tab === "General Data" && (
            <div>
              <div>Client: <span className="text-taupe">{project.client}</span></div>
              <div>Status: <span className="text-taupe">{project.status}</span></div>
            </div>
          )}
          {tab === "Progress Checklist" && (
            <ul className="space-y-1">
              {project.checklist.map((item: any) => (
                <li key={item.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={item.done} readOnly className="accent-taupe" />
                  <span className={item.done ? "line-through text-taupe" : "text-white"}>{item.label}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "Feasibility Studies" && (
            <div>
              <div className="font-semibold text-taupe mb-2">Competitors:</div>
              <ul className="mb-2">
                {mockFeasibility.competitors.map(c => (
                  <li key={c.id}><a href={c.url} className="text-taupe underline" target="_blank" rel="noopener noreferrer">{c.name}</a></li>
                ))}
              </ul>
              <div>Status: <span className="text-taupe">{mockFeasibility.status}</span></div>
              <div>Due Date: <span className="text-taupe">{mockFeasibility.dueDate}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 