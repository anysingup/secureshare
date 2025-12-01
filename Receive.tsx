import React, { useState } from 'react';
import { Download, ArrowLeft, Lock, Unlock, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { SharedPackage } from '../types';
import { FileIcon } from './FileIcon';

interface ReceiveProps {
  onBack: () => void;
}

export const Receive: React.FC<ReceiveProps> = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [unlockedPackage, setUnlockedPackage] = useState<SharedPackage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay for UX
    setTimeout(() => {
      const pkg = StorageService.getPackage(code.toUpperCase());
      
      if (!pkg) {
        setError('Invalid Code. Please check and try again.');
        setIsLoading(false);
        return;
      }

      if (pkg.password !== password) {
        setError('Incorrect Password. Access denied.');
        setIsLoading(false);
        return;
      }

      setUnlockedPackage(pkg);
      setIsLoading(false);
    }, 800);
  };

  const handleDownload = (file: File) => {
    // Create a temporary URL for the file
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (unlockedPackage) {
    return (
      <div className="max-w-3xl mx-auto w-full animate-in slide-in-from-bottom-8 duration-500">
        <button 
          onClick={() => { setUnlockedPackage(null); setCode(''); setPassword(''); }} 
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Unlock Another
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Files Unlocked</h2>
              <p className="text-indigo-200 text-sm mt-1">ID: {unlockedPackage.id}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <Unlock className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unlockedPackage.files.map((file, idx) => (
                <div key={idx} className="group p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-32">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-500">
                      <FileIcon mimeType={file.type} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 truncate mb-1" title={file.name}>{file.name}</h3>
                    <button 
                      onClick={() => handleDownload(file)}
                      className="text-xs font-bold text-indigo-600 flex items-center hover:underline mt-1"
                    >
                      Download <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack} 
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Unlock Files</h2>
        <p className="text-slate-400 text-center mb-8">Enter the secure code and password to access shared files.</p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Share Code</label>
            <input 
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. X7K9P2"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 uppercase tracking-widest font-mono text-center text-lg"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!code || !password || isLoading}
            className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-purple-500/30"
          >
            {isLoading ? 'Verifying...' : 'Unlock Files'}
          </button>
        </form>
      </div>
    </div>
  );
};