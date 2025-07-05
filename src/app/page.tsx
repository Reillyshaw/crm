import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black gap-8">
      <div className="text-black text-4xl font-bold mb-4">CRM Dashboard</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <a href="/taskboard" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Taskboard</a>
        <a href="/clients" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Clients</a>
        <a href="/feasibility" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Feasibility Study</a>
        <a href="/tools" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Tools</a>
        <a href="/settings" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Settings</a>
        <a href="/user" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">User Profile</a>
        <a href="/notifications" className="bg-black text-white border border-black rounded-lg p-6 text-center hover:bg-gray-900 transition text-xl font-semibold shadow">Notifications</a>
      </div>
    </div>
  );
}
