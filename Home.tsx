import React from 'react';
import { Upload, Download, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 animate-in fade-in zoom-in duration-500">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ShieldCheck className="w-12 h-12 text-brand-600" />
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">SecureShare</h1>
        </div>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Securely share your files with strict password protection. Ephemeral, fast, and simple.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => onNavigate('SHARE')}
          className="group relative flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
        >
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
            <Upload className="w-10 h-10 text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Share Files</h2>
          <p className="text-slate-400 text-center">Upload documents, photos, or videos and create a secure link.</p>
        </button>

        <button
          onClick={() => onNavigate('RECEIVE')}
          className="group relative flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
        >
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
            <Download className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Receive Files</h2>
          <p className="text-slate-400 text-center">Have a code? Enter it here to unlock and download files.</p>
        </button>
      </div>
    </div>
  );
};