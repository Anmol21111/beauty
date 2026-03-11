
import React, { useState } from 'react';
import { getBeautyConsultation } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [concerns, setConcerns] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleConsult = async () => {
    if (!concerns) return;
    setLoading(true);
    const data = await getBeautyConsultation(concerns);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-brand-pink rounded-2xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-serif text-gray-900">AI Beauty Consultant</h1>
              <p className="text-gray-500">Professional analysis powered by Gemini 3</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tell us about your skin or hair concerns</label>
              <textarea 
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                placeholder="Example: My skin is very dry lately and I'm getting dark circles. Also, my hair ends feel brittle..."
                className="w-full p-4 border-2 border-pink-100 rounded-xl focus:border-brand-pink focus:ring-0 outline-none h-32 transition"
              />
            </div>
            
            <button 
              onClick={handleConsult}
              disabled={loading || !concerns}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center space-x-2 ${
                loading ? 'bg-gray-400' : 'bg-brand-pink hover:bg-brand-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing Your Beauty Needs...</span>
                </>
              ) : (
                <span>Generate Personal Plan</span>
              )}
            </button>
          </div>

          {result && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-pink-50 rounded-2xl border-l-4 border-brand-pink">
                <h3 className="text-lg font-bold text-brand-pink mb-2 uppercase tracking-wide">Analysis</h3>
                <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-brand-100 pb-2">Home Routine</h3>
                  <ul className="space-y-3">
                    {result.routine?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start space-x-3 text-gray-700">
                        <span className="text-brand-pink mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-brand-100 pb-2">Recommended Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedServices?.map((item: string, i: number) => (
                      <span key={i} className="bg-white px-4 py-2 rounded-lg border border-pink-100 text-sm font-medium text-gray-700 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
