"use client";
import React, { useState } from "react";

const tabs = ["Activity", "Subtasks", "Comments", "Attachments", "Time Management"];

const mockActivity = [
  { id: 1, user: "Ema", date: "2024-12-30", text: "Batches 38 and 39 - completed." },
  { id: 2, user: "Ema", date: "2024-12-27", text: "Batches 36 and 37 - completed." },
];
const mockSubtasks = [
  { id: 1, label: "Write metadata", done: true },
  { id: 2, label: "Review keywords", done: false },
];
const mockComments = [
  { id: 1, user: "Reilly", text: "Please check the latest batch." },
];
const mockAttachments = [
  { id: 1, name: "specs.pdf" },
];
const mockTime = { estimated: "2h", spent: "1.5h" };

export type { };

export default function TaskDetailsModal({ task, onClose }: { task: any, onClose: () => void }) {
  const [tab, setTab] = useState("Activity");
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border border-taupe rounded-2xl p-10 w-full max-w-2xl shadow-2xl relative flex flex-col gap-6">
        <button className="absolute top-4 right-4 bg-taupe text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow hover:bg-taupe-dark transition" onClick={onClose}>&times;</button>
        <div className="text-taupe text-2xl font-extrabold mb-2 tracking-wide">{task.title}</div>
        <div className="flex gap-4 mb-4 border-b border-taupe pb-2">
          {tabs.map(t => (
            <button key={t} className={`px-4 py-2 rounded-t-lg font-semibold text-lg transition ${tab === t ? "bg-taupe text-black shadow" : "text-taupe hover:bg-taupe/20"}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="text-white min-h-[120px] text-lg">
          {tab === "Activity" && (
            <ul className="space-y-4">
              {mockActivity.map(a => (
                <li key={a.id} className="border-b border-taupe pb-2">
                  <span className="text-taupe font-semibold">{a.user}</span> <span className="text-xs text-taupe">{a.date}</span>
                  <div>{a.text}</div>
                </li>
              ))}
            </ul>
          )}
          {tab === "Subtasks" && (
            <ul className="space-y-2">
              {mockSubtasks.map(s => (
                <li key={s.id} className="flex items-center gap-3">
                  <input type="checkbox" checked={s.done} readOnly className="accent-taupe w-5 h-5" />
                  <span className={s.done ? "line-through text-taupe" : "text-white"}>{s.label}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "Comments" && (
            <ul className="space-y-2">
              {mockComments.map(c => (
                <li key={c.id} className="border-b border-taupe pb-2">
                  <span className="text-taupe font-semibold">{c.user}</span>: {c.text}
                </li>
              ))}
            </ul>
          )}
          {tab === "Attachments" && (
            <ul className="space-y-2">
              {mockAttachments.map(att => (
                <li key={att.id} className="text-taupe">📎 {att.name}</li>
              ))}
            </ul>
          )}
          {tab === "Time Management" && (
            <div className="space-y-2">
              <div>Estimated: <span className="text-taupe">{mockTime.estimated}</span></div>
              <div>Spent: <span className="text-taupe">{mockTime.spent}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 