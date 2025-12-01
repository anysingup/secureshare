import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UploadCloud, X, Check, Eye, EyeOff, Copy, ArrowLeft, File as FileIconGeneric } from 'lucide-react';
import { ViewState } from '../types';
import { StorageService } from '../services/storageService';
import { FileIcon } from './FileIcon';

interface ShareProps {
  onBack: () => void;
}

export const Share: React.FC<ShareProps> = ({ onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Password Validation Rules
  const requirements = useMemo(() => {
    return [
      { id: 'upper', label: 'At least 1 uppercase letter', isValid: /[A-Z]/.test(password) },
      { id: 'lower', label: 'At least 1 lowercase letter', isValid: /[a-z]/.test(password) },
      { id: 'number', label: 'At least 1 number', isValid: /[0-9]/.test(password) },
      { id: 'special', label: 'At least 1 special character (@ ! ৳ & $ # etc.)', isValid: /[@!৳&$#\^%*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
    ];
  }, [password]);

  const isFormValid = useMemo(() => {
    return files.length > 0 && requirements.every(r => r.isValid);
  }, [files, requirements]);

  const handleSubmit = () => {
    if (!isFormValid) return;

    const code = StorageService.generateId();
    StorageService.savePackage({
      id: code,
      files: files,
      password: password,
      createdAt: Date.now()
    });
    setGeneratedCode(code);
  };

  const copyLink = () => {
    if (!generatedCode) return;
    const url = `${window.location.host}/view/${generatedCode}`; // Mock URL
    navigator.clipboard.writeText(`Share Code: ${generatedCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (generatedCode) {
    return (
      <div className="max-w-xl mx-auto w-full animate-in zoom-in duration-300">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-emerald-500 p-8 text-center">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Ready to Share!</h2>
            <p className="text-emerald-100">Your files have been secured.</p>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">Share Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 p-4 rounded-xl text-3xl font-mono text-center tracking-widest text-slate-800 border border-slate-200">
                  {generatedCode}
                </div>
                <button 
                  onClick={copyLink}
                  className="p-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">Share this code with the recipient.</p>
            </div>

            <button 
              onClick={onBack}
              className="w-full py-4 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Share More Files
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack} 
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Upload Files</h2>

        {/* File Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
            <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-brand-500" />
          </div>
          <p className="text-slate-700 font-medium">Click to upload files</p>
          <p className="text-slate-400 text-sm mt-1">Images, Videos, PDFs, Documents</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            multiple 
            className="hidden" 
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Selected Files ({files.length})</p>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-500 flex-shrink-0">
                      <FileIcon mimeType={file.type} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                      <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="my-8 border-slate-100" />

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Secure with Password</h2>
        
        <div className="relative mb-6">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {requirements.map((req) => (
            <div key={req.id} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${req.isValid ? 'bg-emerald-500 text-white' : 'bg-red-100 text-red-500'}`}>
                {req.isValid ? <Check className="w-3 h-3" strokeWidth={3} /> : <X className="w-3 h-3" strokeWidth={3} />}
              </div>
              <span className={`text-sm ${req.isValid ? 'text-slate-700' : 'text-slate-500'}`}>{req.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] 
            ${isFormValid 
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          Create Secure Link
        </button>
      </div>
    </div>
  );
};