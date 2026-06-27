import React, { useState } from 'react';
import { Brain, ShieldAlert, Cpu, Database, Server, ChevronRight, AlertCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import PredictionCard from '../components/PredictionCard';
import ProbabilityBar from '../components/ProbabilityBar';
import Loader from '../components/Loader';
import { predictPneumonia } from '../services/api';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelected = (file) => {
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setPredictionResult(null); // Reset prediction when a new image is loaded
    setError(null);
  };

  const handleImageCleared = () => {
    setSelectedFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setPredictionResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const data = await predictPneumonia(selectedFile);
      setPredictionResult(data);
    } catch (err) {
      console.error('Prediction error:', err);
      // Map error types per user specifications
      if (!err.response) {
        // Network offline or CORS/Server down
        setError('Unable to connect to server.');
      } else if (err.response.status === 400) {
        setError('Please upload a valid image.');
      } else {
        setError('Prediction failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center">
      {/* Hero Section */}
      <div className="text-center mb-10 md:mb-12 animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
          AI Pneumonia Detection
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Upload a Chest X-ray image and let the AI model detect whether the patient has pneumonia.
        </p>
      </div>

      {/* Error Alert Display */}
      {error && (
        <div className="mb-6 max-w-xl mx-auto w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-red-800 shadow-sm animate-fade-in-up">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">System Error</h4>
            <p className="text-xs text-red-700/90 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload & Control Panel */}
        <div className={`space-y-6 ${predictionResult || loading ? 'lg:col-span-5' : 'max-w-xl mx-auto w-full lg:col-span-12'}`}>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              X-ray Input Source
            </h3>
            
            <UploadBox
              selectedFile={selectedFile}
              imagePreview={imagePreview}
              onImageSelected={handleImageSelected}
              onImageCleared={handleImageCleared}
              onError={setError}
              disabled={loading}
            />

            {/* Predict Action Button */}
            {!predictionResult && (
              <button
                type="button"
                onClick={handlePredict}
                disabled={!selectedFile || loading}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2 group
                  ${!selectedFile
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    : loading
                      ? 'bg-blue-500 text-white cursor-not-allowed shadow-blue-500/10'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0'
                  }
                `}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Chest X-ray...</span>
                  </>
                ) : (
                  <>
                    <span>Predict</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </>
                )}
              </button>
            )}

            {/* Clear and Upload another when predicted */}
            {predictionResult && (
              <button
                type="button"
                onClick={handleImageCleared}
                className="w-full py-3 px-6 rounded-2xl font-bold text-xs bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200"
              >
                Analyze Another Image
              </button>
            )}
          </div>

          {/* Model Information Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-50">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Model Metadata
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Brain className="w-2.5 h-2.5 text-blue-600" /> Model
                </span>
                <span className="text-xs font-bold text-slate-700 mt-1">ResNet18 Transfer Learning</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Database className="w-2.5 h-2.5 text-blue-600" /> Dataset
                </span>
                <span className="text-xs font-bold text-slate-700 mt-1">Chest X-ray Pneumonia</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-blue-600" /> Framework
                </span>
                <span className="text-xs font-bold text-slate-700 mt-1">PyTorch</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Server className="w-2.5 h-2.5 text-blue-600" /> Backend
                </span>
                <span className="text-xs font-bold text-slate-700 mt-1">FastAPI</span>
              </div>
            </div>
          </div>

          {/* Clinical Disclaimer Warning Card */}
          <div className="bg-amber-50/60 border border-amber-200/50 rounded-3xl p-5 flex gap-3.5 text-amber-800 animate-fade-in-up">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-amber-900 uppercase tracking-wider">
                Clinical Disclaimer
              </h4>
              <p className="text-[11px] text-amber-800/95 leading-relaxed font-medium">
                The predicted results by the model may not be 100% accurate. This model has been trained on the Chest X-Ray Images (Pneumonia) dataset taken from Kaggle and is intended for informational purposes only.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Prediction Output & Analysis */}
        {(predictionResult || loading) && (
          <div className="lg:col-span-7 space-y-6">
            {loading ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm h-full flex items-center justify-center min-h-[400px]">
                <Loader />
              </div>
            ) : (
              predictionResult && (
                <div className="space-y-6 animate-fade-in-up">
                  <PredictionCard
                    prediction={predictionResult.prediction}
                    confidence={predictionResult.confidence}
                  />
                  <ProbabilityBar
                    probabilities={predictionResult.probabilities}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
