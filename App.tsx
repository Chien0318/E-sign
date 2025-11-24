import React from 'react';
import ContractPage from './components/ContractPage';
import { FileSignature } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FileSignature className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              商家電子簽約平台
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            安全 • 快速 • 合規
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6">
        <ContractPage />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Merchant E-Sign Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;