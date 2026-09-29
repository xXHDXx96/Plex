import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Star, Film, UserPlus, Zap, ArrowDownCircle, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useApp();

  const handleSnatchOrder = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/task');
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[480px] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex flex-col justify-center items-center gap-4 bg-black/75 p-6 sm:p-8 rounded-2xl max-w-xl border border-white/10 backdrop-blur-xs">
          <div className="inline-flex items-center gap-2 bg-[#f5c518] text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            <span>PLEX Media Operations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl text-white font-extrabold tracking-tight">
            Cinematic Power by <span className="text-[#f5c518] uppercase font-black">PLEX</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            Browse and review global box-office releases with instant profit commissions, continuous multipliers, and real-time wallet withdrawals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleSnatchOrder}
              className="bg-primaryButton text-white font-bold rounded-lg px-7 py-3 text-sm sm:text-base hover:opacity-90 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Snatch Orders</span>
            </button>
            <Link
              to="/movie"
              className="bg-[#f5c518] hover:bg-amber-400 text-black font-bold rounded-lg px-6 py-3 text-sm sm:text-base transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <Film className="w-4 h-4" />
              <span>Enter Movie Portal</span>
            </Link>
            <Link
              to="/cash-out"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg px-5 py-3 text-sm sm:text-base transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Withdraw (৳{user.userBalance.toLocaleString()})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose PLEX Bar */}
      <div className="bg-black py-4 text-center">
        <h2 className="text-white font-black text-xl sm:text-2xl tracking-wide uppercase">
          Why Choose PLEX?
        </h2>
      </div>

      {/* Feature Section 1 */}
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Crafted for Film Enthusiasts & Digital Earners
          </h2>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
            Each curated media item in PLEX is an authentic celebration of cinematic storytelling. Engage in authorized box office review tasks and withdraw your earnings directly to your verified payment account.
          </p>
        </div>
      </div>

      {/* Feature Section 2: 5-Star Customer Review Banner */}
      <div
        className="relative h-[480px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 bg-slate-900/85 border border-slate-700 mx-6 px-6 py-8 max-w-xl rounded-2xl shadow-2xl text-center backdrop-blur-sm">
          <div className="flex justify-center gap-1.5 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-white/95 text-base sm:text-lg font-serif italic mb-4 leading-relaxed">
            "PLEX media database seamlessly bridges movie exploration with instantaneous task rewards. Rapid withdrawals through mobile banking and authentic film reviews make this the leading platform."
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Participant Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};
