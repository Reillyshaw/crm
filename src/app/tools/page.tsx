"use client";
import React, { useState } from "react";

const mockResults = [
  { keyword: "commercial oven", volume: 1600 },
  { keyword: "professional oven", volume: 320 },
  { keyword: "catering oven", volume: 110 },
];

export default function ToolsPage() {
  const [seed, setSeed] = useState("");
  const [location, setLocation] = useState("United Kingdom");
  const [language, setLanguage] = useState("English");
  const [results, setResults] = useState<typeof mockResults>([]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setResults(mockResults);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <form onSubmit={handleSearch} className="bg-black border border-taupe rounded-lg p-6 space-y-4">
        <div className="text-taupe text-xl font-bold mb-2">Google Ads Keyword Planner</div>
        <label className="block text-white mb-1">Seed Keywords</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe"
          value={seed}
          onChange={e => setSeed(e.target.value)}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-white mb-1">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">Language</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-taupe rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-taupe"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="bg-taupe text-black px-4 py-2 rounded hover:bg-taupe-dark mt-4">Fetch Keywords</button>
      </form>
      {results.length > 0 && (
        <div className="bg-black border border-taupe rounded-lg p-6">
          <div className="text-taupe text-lg font-bold mb-4">Keyword Ideas</div>
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-taupe">
                <th className="text-left py-2">Keyword</th>
                <th className="text-left py-2">Volume</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.keyword} className="border-b border-taupe">
                  <td className="py-2">{r.keyword}</td>
                  <td className="py-2">{r.volume}</td>
                  <td className="py-2"><button className="bg-taupe text-black px-3 py-1 rounded hover:bg-taupe-dark">Add</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 