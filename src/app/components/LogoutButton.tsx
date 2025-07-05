"use client";
import React from "react";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login';
      }}
      className="w-full py-3 px-5 rounded-lg bg-red-600 text-white font-semibold text-lg hover:bg-red-700 border border-red-600 transition"
    >
      Logout
    </button>
  );
} 