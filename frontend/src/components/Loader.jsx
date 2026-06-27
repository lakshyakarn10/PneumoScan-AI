import React from 'react';
import { Activity } from 'lucide-react';

export default function Loader({ message = "Analyzing Chest X-ray..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="w-14 h-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
        {/* Inner heartbeat icon */}
        <div className="absolute w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-slate-700 text-sm">{message}</p>
        <p className="text-xs text-slate-400 mt-1 animate-pulse-slow">Running Deep Learning Inference...</p>
      </div>
    </div>
  );
}
