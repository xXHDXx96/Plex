import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const { text, type } = toastMessage;

  const bgStyles = {
    success: 'bg-emerald-600 text-white shadow-emerald-900/20',
    error: 'bg-red-600 text-white shadow-red-900/20',
    info: 'bg-slate-800 text-white shadow-slate-900/20',
  }[type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[type];

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-[90%] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${bgStyles}`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1">{text}</span>
      </div>
    </div>
  );
};
