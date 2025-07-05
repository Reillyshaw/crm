"use client";
import React, { useState } from "react";

// Mock data for the tree
const mockTree = [
  {
    id: 1,
    name: "Cooking Equipment",
    children: [
      {
        id: 2,
        name: "Ovens",
        children: [
          { id: 3, name: "Combi Ovens", children: [] },
          { id: 4, name: "Pizza Ovens", children: [] },
        ],
      },
      { id: 5, name: "Fryers", children: [] },
    ],
  },
  {
    id: 6,
    name: "Refrigeration Equipment",
    children: [],
  },
];

const mockNodeDetails: Record<string, any> = {
  1: { pageName: "Cooking Equipment", h1: "Commercial Cooking Equipment", url: "/cooking-equipment", mappedUrl: "/cooking-equipment", keywords: ["cooking equipment", "commercial kitchen"], tags: ["shopify:Cooking"] },
  2: { pageName: "Ovens", h1: "Commercial Ovens", url: "/cooking-equipment/ovens", mappedUrl: "/cooking-equipment/ovens", keywords: ["commercial oven", "oven for sale"], tags: ["shopify:Ovens"] },
  3: { pageName: "Combi Ovens", h1: "Combi Ovens", url: "/cooking-equipment/ovens/combi", mappedUrl: "/cooking-equipment/ovens/combi", keywords: ["combi oven"], tags: ["shopify:Combi"] },
  4: { pageName: "Pizza Ovens", h1: "Pizza Ovens", url: "/cooking-equipment/ovens/pizza", mappedUrl: "/cooking-equipment/ovens/pizza", keywords: ["pizza oven"], tags: ["shopify:Pizza"] },
  5: { pageName: "Fryers", h1: "Fryers", url: "/cooking-equipment/fryers", mappedUrl: "/cooking-equipment/fryers", keywords: ["fryer"], tags: ["shopify:Fryers"] },
  6: { pageName: "Refrigeration Equipment", h1: "Refrigeration Equipment", url: "/refrigeration-equipment", mappedUrl: "/refrigeration-equipment", keywords: ["refrigeration"], tags: ["shopify:Refrigeration"] },
};

const mockSummary = {
  competitors: [
    { id: 1, name: "Empire Supplies", url: "https://www.empiresuppliesonline.co.uk/" },
    { id: 2, name: "Catering", url: "https://www.ecatering.co.uk/" },
  ],
  progress: "Completed",
  categories: 6,
  keywords: 8,
  tags: 6,
};

function TreeNode({ node, selectedId, onSelect }: any) {
  const [open, setOpen] = useState(true);
  return (
    <div className="ml-4">
      <div className={`flex items-center gap-2 cursor-pointer ${selectedId === node.id ? "text-taupe font-bold" : "text-white"}`} onClick={() => onSelect(node.id)}>
        {node.children.length > 0 && (
          <button className="text-taupe" onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>{open ? "▼" : "▶"}</button>
        )}
        {node.name}
      </div>
      {open && node.children.length > 0 && (
        <div className="ml-4 border-l border-taupe pl-2">
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FeasibilityPage() {
  const [selectedId, setSelectedId] = useState(1);
  const details = mockNodeDetails[String(selectedId)];
  return (
    <div className="flex flex-col gap-8">
      {/* Summary Panel */}
      <div className="bg-black border border-taupe rounded-lg p-4 flex gap-8 items-center">
        <div>
          <div className="text-taupe font-bold">Competitors:</div>
          <ul>
            {mockSummary.competitors.map(c => (
              <li key={c.id}><a href={c.url} className="text-taupe underline" target="_blank" rel="noopener noreferrer">{c.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="text-white">Progress: <span className="text-taupe">{mockSummary.progress}</span></div>
        <div className="text-white">Categories: <span className="text-taupe">{mockSummary.categories}</span></div>
        <div className="text-white">Keywords: <span className="text-taupe">{mockSummary.keywords}</span></div>
        <div className="text-white">Tags: <span className="text-taupe">{mockSummary.tags}</span></div>
      </div>
      <div className="flex gap-8">
        {/* Tree Panel */}
        <div className="w-1/3 bg-black border border-taupe rounded-lg p-4 min-h-[60vh]">
          <div className="text-taupe font-bold mb-2">Category Hierarchy</div>
          {mockTree.map(node => (
            <TreeNode key={node.id} node={node} selectedId={selectedId} onSelect={setSelectedId} />
          ))}
        </div>
        {/* Details Panel */}
        <div className="flex-1 bg-black border border-taupe rounded-lg p-4">
          <div className="text-taupe font-bold mb-2">Node Details</div>
          <div className="mb-2">Page Name: <span className="text-taupe">{details.pageName}</span></div>
          <div className="mb-2">H1: <span className="text-taupe">{details.h1}</span></div>
          <div className="mb-2">URL: <span className="text-taupe">{details.url}</span></div>
          <div className="mb-2">Mapped URL: <span className="text-taupe">{details.mappedUrl}</span></div>
          <div className="mb-2">Keywords: {details.keywords.map((k: string) => <span key={k} className="bg-taupe text-black px-2 py-0.5 rounded mx-1">{k}</span>)}</div>
          <div className="mb-2">Tags: {details.tags.map((t: string) => <span key={t} className="bg-taupe text-black px-2 py-0.5 rounded mx-1">{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
} 