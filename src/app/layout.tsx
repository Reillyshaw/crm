import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import LogoutButton from './components/LogoutButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM",
  description: "Custom CRM App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black flex min-h-screen font-sans">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-black shadow-lg flex flex-col p-6 z-20">
          <div className="text-3xl font-extrabold mb-10 text-black tracking-wide">CRM</div>
          <nav className="flex-1 flex flex-col gap-2">
            <Link href="/taskboard" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Taskboard</Link>
            <Link href="/clients" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Clients</Link>
            <Link href="/feasibility" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Feasibility</Link>
            <Link href="/tools" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Tools</Link>
            <Link href="/settings" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Settings</Link>
            <Link href="/user" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">User</Link>
            <Link href="/notifications" className="py-3 px-5 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 border border-black transition">Notifications</Link>
          </nav>
          <div className="mt-auto">
            <LogoutButton />
          </div>
        </aside>
        {/* Main Content */}
        <main className="ml-64 flex-1 min-h-screen p-10 bg-white text-black overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
