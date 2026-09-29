import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Check, Gift } from 'lucide-react';
import { CHECK_IN_REWARDS } from '../data/mockProducts';

export const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { user, claimDailyCheckIn } = useApp();
  const [claiming, setClaiming] = useState(false);

  const currentCheckInDay = user.checkInDays; // e.g. 4 completed, day 5 is next

  const handleClaim = async (day: number, amount: number) => {
    if (claiming) return;
    setClaiming(true);
    await claimDailyCheckIn(day, amount);
    setClaiming(false);
  };

  return (
    <div className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] pb-24 shadow-sm">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-gray-900">Daily Check-In</h1>
      </div>

      {/* Banner */}
      <div
        className="relative h-[220px] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-black mb-2">Daily Check-In Rewards</h2>
          <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
            Consecutive Days: {user.checkInDays} / 7
          </p>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 text-sm">7-Day Attendance Plan</h3>
          <span className="text-xs text-gray-500 font-medium">Claim every 24 hours</span>
        </div>

        <div className="space-y-2.5">
          {CHECK_IN_REWARDS.map((r) => {
            const isCompleted = r.day <= user.checkInDays;
            const isToday = r.day === user.checkInDays + 1;

            return (
              <div
                key={r.day}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : isToday
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/40 shadow-sm'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isToday
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : `D${r.day}`}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Day {r.day} Check-In</h4>
                    <p className="text-xs text-emerald-700 font-semibold">+৳{r.amount} Cash Bonus</p>
                  </div>
                </div>

                <div>
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      Claimed
                    </span>
                  ) : isToday ? (
                    <button
                      onClick={() => handleClaim(r.day, r.amount)}
                      disabled={claiming}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-sm cursor-pointer transition-colors"
                    >
                      {claiming ? 'Claiming...' : 'Claim'}
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-gray-600 space-y-2">
          <p className="font-bold text-gray-800 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-primaryButton" />
            Check-In Guidelines
          </p>
          <p>
            1. Users who complete daily check-ins receive cash bonuses deposited straight into their active trading balance.
          </p>
          <p>
            2. Continuous 7-day attendance unlocks priority task allotment and higher mystery box multiplier odds!
          </p>
        </div>
      </div>
    </div>
  );
};
