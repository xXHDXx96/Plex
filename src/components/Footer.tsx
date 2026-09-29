import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-golden sticky bottom-0 z-30 text-slate-800 py-3.5 px-4 w-full border-t border-slate-300 shadow-md">
      <div className="max-w-[500px] mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="bg-[#f5c518] text-black font-black text-[10px] px-1.5 py-0.5 rounded uppercase">
            PLEX
          </div>
          <span className="text-sm font-black text-slate-900 tracking-tight uppercase group-hover:text-amber-800 transition-colors">PLEX Media</span>
        </Link>
        <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
          © {new Date().getFullYear()} PLEX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
