"use client";
import React, { useState } from "react";

export default function SettingsPage() {
  const [googleApiKey, setGoogleApiKey] = useState("AIza...demo");
  const [user, setUser] = useState({ name: "Reilly Shaw", email: "reilly@example.com" });

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="bg-black border border-taupe rounded-lg p-6">
        <div className="text-taupe text-xl font-bold mb-4">Google Ads API Settings</div>
        <label className="block mb-2 text-white">API Key</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe mb-4"
          value={googleApiKey}
          onChange={e => setGoogleApiKey(e.target.value)}
        />
        <button className="bg-taupe text-black px-4 py-2 rounded hover:bg-taupe-dark">Save API Key</button>
      </div>
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
    </div>
  );
} 