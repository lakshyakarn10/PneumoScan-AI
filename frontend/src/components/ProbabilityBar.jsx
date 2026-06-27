import React, { useEffect, useState } from 'react';

export default function ProbabilityBar({ probabilities }) {
  const normalProb = probabilities?.NORMAL ?? 0;
  const pneumoniaProb = probabilities?.PNEUMONIA ?? 0;
  
  const [widths, setWidths] = useState({ normal: 0, pneumonia: 0 });

  useEffect(() => {
    // Reset widths first to allow animation on update
    setWidths({ normal: 0, pneumonia: 0 });
    const timer = setTimeout(() => {
      setWidths({ normal: normalProb, pneumonia: pneumoniaProb });
    }, 150);
    return () => clearTimeout(timer);
  }, [normalProb, pneumoniaProb]);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
        Probability Distribution
      </h3>
      <div className="space-y-5">
        {/* NORMAL Probability Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-600 tracking-wider">NORMAL</span>
            <span className="text-emerald-600 font-extrabold">{normalProb.toFixed(2)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
            <div
              style={{ width: `${widths.normal}%` }}
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-sm shadow-emerald-500/10"
            ></div>
          </div>
        </div>

        {/* PNEUMONIA Probability Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-600 tracking-wider">PNEUMONIA</span>
            <span className="text-red-600 font-extrabold">{pneumoniaProb.toFixed(2)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
            <div
              style={{ width: `${widths.pneumonia}%` }}
              className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out shadow-sm shadow-red-500/10"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
