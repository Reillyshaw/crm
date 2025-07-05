"use client";
import React from "react";

const mockNotifications = [
  { id: 1, text: "Task 'Metadata Batch' assigned to you.", date: "2024-07-05" },
  { id: 2, text: "Project 'H2 Catering Equipment' updated.", date: "2024-07-04" },
  { id: 3, text: "Keyword Planner API key updated.", date: "2024-07-03" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-xl mx-auto bg-black border border-taupe rounded-lg p-6">
      <div className="text-taupe text-xl font-bold mb-4">Notifications</div>
      <ul className="space-y-2">
        {mockNotifications.map(n => (
          <li key={n.id} className="text-white border-b border-taupe pb-2 flex justify-between items-center">
            <span>{n.text}</span>
            <span className="text-taupe text-xs">{n.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 