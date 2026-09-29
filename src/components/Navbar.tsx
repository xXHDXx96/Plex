import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Calendar, Gauge, X, Film, UserPlus, Zap, ArrowDownCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  onOpenDrawer: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenDrawer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();

  return (
    <nav className="bg-golden shadow-md w-full sticky top-0 z-40 border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Drawer Trigger + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDrawer}
              className="text-slate-900 cursor-pointer p-1.5 rounded-lg hover:bg-slate-300/60 transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#f5c518] text-black font-black text-sm px-2.5 py-1 rounded tracking-tight shadow-sm uppercase">
                PLEX
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-amber-800 transition-colors">
                MEDIA
              </span>
            </Link>
          </div>

          {/* User balance and status summary */}
          <div className="hidden lg:flex items-center gap-3 bg-white/80 border border-slate-300 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="text-slate-500">Available:</span>
            <span className="text-emerald-700 font-bold font-mono">
              ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-700">{user.userType}</span>
          </div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-2">
            {/* Direct Link to Movie Portal */}
            <Link
              to="/"
              className="flex items-center gap-1.5 bg-[#f5c518] hover:bg-amber-400 text-black px-3 py-1.5 rounded-md text-sm font-bold shadow-xs transition-transform active:scale-95"
              title="PLEX Movie Portal"
            >
              <Film className="w-4 h-4" />
              <span>Movie Portal</span>
            </Link>

            {/* Direct Task Link */}
            <Link
              to="/task"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                location.pathname === '/task'
                  ? 'bg-primaryButton text-white'
                  : 'text-slate-800 hover:bg-slate-300/60'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Snatch Orders</span>
            </Link>

            {/* Direct Withdrawal Link */}
            <Link
              to="/cash-out"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-xs transition-colors"
              title="Withdraw Funds"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Withdraw</span>
            </Link>

            {/* Events & Score */}
            <Link
              to="/event"
              className="flex items-center gap-1.5 text-slate-900 hover:bg-slate-300/60 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
              title="Event Gallery"
            >
              <Calendar className="w-4 h-4 text-slate-800" />
              <span>Events</span>
            </Link>

            <Link
              to="/score"
              className="flex items-center gap-1.5 text-slate-900 hover:bg-slate-300/60 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
              title="Honor Score"
            >
              <Gauge className="w-4 h-4 text-slate-800" />
              <span>Score</span>
            </Link>
          </div>

          {/* Mobile Right Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/"
              className="text-xs bg-[#f5c518] text-black px-2.5 py-1 rounded font-black flex items-center gap-1"
            >
              <Film className="w-3 h-3" />
              Movies
            </Link>
            <Link
              to="/cash-out"
              className="text-xs bg-emerald-600 text-white px-2 py-1 rounded font-bold"
            >
              Withdraw
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="text-slate-900 hover:text-slate-700 p-1.5 rounded-md focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <div className="space-y-1">
                  <div className="w-5 h-0.5 bg-slate-900"></div>
                  <div className="w-5 h-0.5 bg-slate-900"></div>
                  <div className="w-5 h-0.5 bg-slate-900"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-golden border-t border-slate-300/60 px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-black bg-[#f5c518] font-bold px-3 py-2 rounded-md"
          >
            <Film className="w-4 h-4" />
            PLEX Movie Portal
          </Link>
          <Link
            to="/task"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-900 font-semibold px-3 py-2 rounded-md hover:bg-slate-300/50"
          >
            <Zap className="w-4 h-4 text-amber-600" />
            Snatch Orders & Review
          </Link>
          <Link
            to="/cash-out"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-white bg-emerald-600 font-bold px-3 py-2 rounded-md"
          >
            <ArrowDownCircle className="w-4 h-4" />
            Withdraw Cash
          </Link>
          <Link
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-900 bg-white font-bold px-3 py-2 rounded-md border border-slate-300"
          >
            <UserPlus className="w-4 h-4 text-amber-500" />
            Register Account
          </Link>
          <Link
            to="/event"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-900 font-semibold px-3 py-2 rounded-md hover:bg-slate-300/50"
          >
            <Calendar className="w-4 h-4 text-slate-800" />
            Events
          </Link>
          <Link
            to="/score"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-slate-900 font-semibold px-3 py-2 rounded-md hover:bg-slate-300/50"
          >
            <Gauge className="w-4 h-4 text-slate-800" />
            Honor Score
          </Link>
        </div>
      )}
    </nav>
  );
};
