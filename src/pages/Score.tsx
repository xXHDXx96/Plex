import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Home as HomeIcon, BookOpen, Bell, User as UserIcon } from 'lucide-react';

export const Score: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const score = user.score || 100;

  // Semicircle Gauge calculations
  // Angle range: -90 degrees (left, 0 points) to +90 degrees (right, 100 points)
  const needleAngle = -90 + (score / 100) * 180;

  return (
    <div className="max-w-[500px] mx-auto bg-white min-h-screen flex flex-col justify-between shadow-md font-sans">
      
      {/* 1. Header (Dark theme to match screenshot) */}
      <div className="bg-[#242424] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer flex items-center"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold tracking-wide uppercase text-center flex-1 pr-6">
          Credit Score
        </h1>
      </div>

      {/* 2. Main Content Body */}
      <div className="flex-1 p-6 space-y-6 flex flex-col items-center">
        
        {/* Semicircle Gauge Chart */}
        <div className="relative w-full max-w-[320px] mx-auto pt-4">
          <svg viewBox="0 0 200 120" className="w-full">
            {/* Red segment (0-19) */}
            <path
              d="M 20 100 A 80 80 0 0 1 35.3 53"
              fill="none"
              stroke="#EA4335"
              strokeWidth="28"
            />
            {/* Orange segment (20-39) */}
            <path
              d="M 35.3 53 A 80 80 0 0 1 75.3 23.9"
              fill="none"
              stroke="#FB8C00"
              strokeWidth="28"
            />
            {/* Yellow segment (40-59) */}
            <path
              d="M 75.3 23.9 A 80 80 0 0 1 124.7 23.9"
              fill="none"
              stroke="#FDD835"
              strokeWidth="28"
            />
            {/* Light Green segment (60-79) */}
            <path
              d="M 124.7 23.9 A 80 80 0 0 1 164.7 53"
              fill="none"
              stroke="#7CB342"
              strokeWidth="28"
            />
            {/* Dark Green segment (80-100) */}
            <path
              d="M 164.7 53 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#43A047"
              strokeWidth="28"
            />

            {/* Segment labels centered along arcs */}
            <text x="35" y="80" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(-68, 35, 80)">0-19</text>
            <text x="61" y="47" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(-36, 61, 47)">20-39</text>
            <text x="100" y="36" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle">40-59</text>
            <text x="139" y="47" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(36, 139, 47)">60-79</text>
            <text x="165" y="80" fill="white" fontSize="6.5" fontWeight="black" textAnchor="middle" transform="rotate(68, 165, 80)">80-100</text>

            {/* Pivot Point */}
            <circle cx="100" cy="100" r="12" fill="#1b2536" />
            <circle cx="100" cy="100" r="6" fill="#f5c518" />

            {/* Gauge Needle pointing to user's score */}
            <g transform={`rotate(${needleAngle}, 100, 100)`}>
              <path
                d="M 97 100 L 100 20 L 103 100 Z"
                fill="#1b2536"
                stroke="#1b2536"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* Current Score Bar (Matches Golden outline container in Screenshot) */}
        <div className="w-full bg-[#fdfaf2] border border-[#f5cc98] rounded-full px-6 py-3 flex items-center justify-between shadow-xs">
          <span className="text-gray-400 font-bold text-sm tracking-wide">
            You currently have...
          </span>
          <span className="text-[#d84e43] font-black text-base tracking-tight font-mono">
            {score} Point
          </span>
        </div>

        {/* Rules & Regulations Section */}
        <div className="w-full text-left space-y-4 px-2">
          <h2 className="text-[#a83232] font-black text-sm tracking-wide uppercase border-b border-gray-100 pb-2">
            Rules and Regulations
          </h2>
          
          <ul className="space-y-4 text-[11px] sm:text-xs text-gray-700 font-semibold leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#a83232] text-sm mt-[-2px]">•</span>
              <span>Each complete 3 around of purchase will get 2 points</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#a83232] text-sm mt-[-2px]">•</span>
              <span>Completing special purchase can get extra commission and points</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#a83232] text-sm mt-[-2px]">•</span>
              <span>If the purchase is not completed for too long, the credit score will decrease</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#a83232] text-sm mt-[-2px]">•</span>
              <span>Membership reach 100 points, Apply Entire Amount withdraw. Credit point down during withdraw process Need to make Credit score insurance</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. High-Fidelity Navigation Footer (Matches Screenshot style) */}
      <div className="bg-[#1c1c1c] text-gray-400 py-2 border-t border-neutral-800">
        <div className="relative max-w-sm mx-auto flex items-center justify-between px-6">
          
          {/* Tab 1: Home */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors"
          >
            <HomeIcon className="w-5 h-5 text-gray-400" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Home</span>
          </button>

          {/* Tab 2: Watchlist */}
          <button
            onClick={() => navigate('/task')}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors pr-8"
          >
            <BookOpen className="w-5 h-5 text-gray-400" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Watchlist</span>
          </button>

          {/* Central Circular Lightning Action Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button
              onClick={() => navigate('/task')}
              className="w-13 h-13 bg-[#f5c518] hover:bg-amber-400 rounded-full flex items-center justify-center border-4 border-[#1c1c1c] shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
              title="Start Reviewing"
            >
              <Zap className="w-6 h-6 text-black fill-current" />
            </button>
          </div>

          {/* Tab 3: Event */}
          <button
            onClick={() => navigate('/event')}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors pl-8"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Event</span>
          </button>

          {/* Tab 4: Profile */}
          <button
            onClick={() => navigate('/bind-account')}
            className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer transition-colors"
          >
            <UserIcon className="w-5 h-5 text-gray-400" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Profile</span>
          </button>

        </div>
      </div>

    </div>
  );
};

// SVG Icon Helper
const Zap: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
