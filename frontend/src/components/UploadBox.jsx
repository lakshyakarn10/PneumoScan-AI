import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw } from 'lucide-react';

export default function UploadBox({
  selectedFile,
  imagePreview,
  onImageSelected,
  onImageCleared,
  onError,
  disabled
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      onError('Please upload a valid image.');
      return;
    }
    onImageSelected(file);
  };

  const onButtonClick = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg"
        onChange={handleChange}
        disabled={disabled}
      />

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[240px] group
            ${isDragActive 
              ? 'border-blue-600 bg-blue-50/50 scale-[0.99] shadow-inner' 
              : 'border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50/50 shadow-sm'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base mb-1">
            Drag and Drop Chest X-ray
          </h3>
          <p className="text-xs text-slate-400 mb-4 max-w-[240px]">
            Supports PNG, JPG, JPEG
          </p>
          <button
            type="button"
            disabled={disabled}
            className={`px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200 ${disabled ? 'pointer-events-none' : ''}`}
          >
            Choose Image
          </button>
        </div>
      ) : (
        <div className="relative bg-white border border-slate-100 rounded-2xl p-4 shadow-sm overflow-hidden animate-fade-in-up">
          <div className="relative aspect-square w-full max-h-[300px] overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Chest X-ray Preview"
              className="w-full h-full object-cover"
            />
            {disabled && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                {/* AI Scan Line overlay when predicting */}
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 animate-scan"></div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col min-w-0 pr-4">
              <span className="text-xs font-semibold text-slate-700 truncate max-w-[180px]">
                {selectedFile.name}
              </span>
              <span className="text-[10px] text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onButtonClick}
                disabled={disabled}
                className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Replace Image"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onImageCleared}
                disabled={disabled}
                className="p-2 text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
