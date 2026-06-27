import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-slate-100 px-6 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PulmoScan AI
            </h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              AI Diagnostic Assistant
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
