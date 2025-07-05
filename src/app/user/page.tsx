"use client";
import React, { useState } from "react";

const mockNotifications = [
  { id: 1, text: "Task 'Metadata Batch' assigned to you.", date: "2024-07-05" },
  { id: 2, text: "Project 'H2 Catering Equipment' updated.", date: "2024-07-04" },
];

export default function UserPage() {
  const [user, setUser] = useState({ name: "Reilly Shaw", email: "reilly@example.com" });
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="bg-black border border-taupe rounded-lg p-6">
        <div className="text-taupe text-xl font-bold mb-4">User Profile</div>
        <label className="block mb-2 text-white">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe mb-4"
          value={user.name}
          onChange={e => setUser(u => ({ ...u, name: e.target.value }))}
        />
        <label className="block mb-2 text-white">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe mb-4"
          value={user.email}
          onChange={e => setUser(u => ({ ...u, email: e.target.value }))}
        />
        <button className="bg-taupe text-black px-4 py-2 rounded hover:bg-taupe-dark">Save Profile</button>
      </div>
      <div className="bg-black border border-taupe rounded-lg p-6">
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
    </div>
  );
} 