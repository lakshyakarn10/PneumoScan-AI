import React from 'react';

export default function PredictionCard({ prediction, confidence }) {
  const isPneumonia = prediction === 'PNEUMONIA';
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
        Prediction Result
      </h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Circular Progress Bar */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg className="w-24 h-24 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-slate-100 fill-transparent"
              strokeWidth="7"
            />
            {/* Foreground circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`fill-transparent transition-all duration-1000 ease-out ${
                isPneumonia ? 'stroke-red-500' : 'stroke-emerald-500'
              }`}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-base font-extrabold text-slate-800">
              {confidence.toFixed(2)}%
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Confidence
            </span>
          </div>
        </div>

        {/* Prediction Status Badge */}
        <div className="text-center sm:text-left flex-1 space-y-2.5">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Diagnosis
            </span>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-extrabold border ${
              isPneumonia 
                ? 'bg-red-50 border-red-100 text-red-700' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-700'
            }`}>
              <span className={`inline-flex rounded-full h-2 w-2 ${
                isPneumonia ? 'bg-red-500' : 'bg-emerald-500'
              }`}></span>
              <span className="tracking-wide">{prediction}</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 leading-relaxed">
            {isPneumonia 
              ? "The AI model detected features indicative of Pneumonial consolidation. Prompt professional review is suggested."
              : "No visible signs of consolidation or diagnostic abnormalities. The lungs appear clear."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
