import React, { useState } from 'react';
import { Home } from './components/Home';
import { Share } from './components/Share';
import { Receive } from './components/Receive';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigate={setCurrentView} />;
      case 'SHARE':
        return <Share onBack={() => setCurrentView('HOME')} />;
      case 'RECEIVE':
        return <Receive onBack={() => setCurrentView('HOME')} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div 
          className="font-bold text-xl tracking-tighter text-slate-800 cursor-pointer flex items-center gap-2"
          onClick={() => setCurrentView('HOME')}
        >
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-serif italic">S</div>
          SecureShare
        </div>
        <div className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          v1.0.0
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-8">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SecureShare. Encrypted & Temporary.</p>
      </footer>
    </div>
  );
}

export default App;