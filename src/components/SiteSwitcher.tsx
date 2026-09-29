import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Film, Zap, UserPlus, LogIn, ArrowDownCircle, ChevronDown, ChevronUp, Grid } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SiteSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const currentPath = location.pathname;

  const [menuExpanded, setMenuExpanded] = useState(true);

  const isMovieSite = currentPath === '/' || currentPath === '/movie' || currentPath === '/plex';
  const isSignup = currentPath === '/signup';
  const isLogin = currentPath === '/login' || currentPath === '/show-signin';
  const isTask = currentPath === '/task';
  const isWithdraw = currentPath === '/cash-out';

  const getButtonClass = (isActive: boolean) => {
    return `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-extrabold text-xs cursor-pointer whitespace-nowrap transition-all border h-8 ${
      isActive
        ? 'bg-[#f5c518] text-black border-[#f5c518] shadow-md shadow-amber-500/10'
        : 'bg-[#161b22] text-gray-300 border-[#30363d] hover:text-white hover:bg-[#21262d] hover:border-gray-500'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c1017] text-white border-b border-[#21262d] shadow-md w-full max-w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        
        {/* Left: Brand Logo & Interactive Sci-Fi Toggle Handle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 cursor-pointer group text-left"
            aria-label="PLEX Home"
          >
            <span className="bg-[#f5c518] text-black font-black text-xs sm:text-sm px-2.5 py-0.5 rounded tracking-tight shadow-xs group-hover:bg-amber-400 transition-colors uppercase">
              PLEX
            </span>
            <span className="hidden sm:inline text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Media
            </span>
          </button>

          {/* Collapsible Controller Trigger (With neon-glow micro animation) */}
          <button
            onClick={() => setMenuExpanded(!menuExpanded)}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-300 border cursor-pointer select-none ${
              menuExpanded
                ? 'bg-amber-400/10 text-[#f5c518] border-amber-500/30'
                : 'bg-neutral-800 text-gray-400 border-neutral-700 hover:border-amber-400 hover:text-white animate-pulse'
            }`}
          >
            <Grid className="w-3 h-3 text-[#f5c518]" />
            <span>{menuExpanded ? 'Menu [▲]' : 'Menu [▼]'}</span>
          </button>

          {/* User balance indicator (Hidden on small mobile to save viewport space) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] px-2.5 py-0.5 rounded-lg text-xs font-semibold">
            <span className="text-gray-400">Balance:</span>
            <span className="text-emerald-400 font-bold font-mono">
              ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Action Switchers with smooth touch-scroll, fully collapsible */}
        <nav
          className={`flex-1 flex items-center justify-end gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 touch-pan-x transition-all duration-300 origin-right ${
            menuExpanded
              ? 'opacity-100 scale-100 translate-x-0 w-auto'
              : 'opacity-0 scale-90 translate-x-12 pointer-events-none w-0 overflow-hidden'
          }`}
          aria-label="Quick Navigation"
        >
          {/* 1. Full Movie Portal */}
          <button
            onClick={() => navigate('/')}
            className={getButtonClass(isMovieSite)}
          >
            <Film className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Movies</span>
          </button>

          {/* 2. Tasks & Operations */}
          <button
            onClick={() => navigate('/task')}
            className={getButtonClass(isTask)}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>Task Center</span>
          </button>

          {/* 3. Direct Withdrawal */}
          <button
            onClick={() => navigate('/cash-out')}
            className={getButtonClass(isWithdraw)}
          >
            <ArrowDownCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Withdraw</span>
          </button>

          {/* 4. Registration Page */}
          <button
            onClick={() => navigate('/signup')}
            className={getButtonClass(isSignup)}
          >
            <UserPlus className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>Register</span>
          </button>

          {/* 5. Sign In */}
          <button
            onClick={() => navigate('/login')}
            className={getButtonClass(isLogin)}
          >
            <LogIn className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span>Sign In</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
