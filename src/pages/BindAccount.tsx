import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Home as HomeIcon, BookOpen, Bell, User as UserIcon, Zap } from 'lucide-react';
import { WithdrawalInfo } from '../types';

export const BindAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateWithdrawalAddress, showToast } = useApp();

  const [saving, setSaving] = useState(false);

  // States matching Image 2 perfectly
  const [name, setName] = useState(user.withdrawalAddressAndMethod?.name || '');
  const [mobileNumber, setMobileNumber] = useState(
    user.withdrawalAddressAndMethod?.mobileBankingAccountNumber || user.phoneNumber.replace('+880', '') || ''
  );
  const [accountNumber, setAccountNumber] = useState(
    user.withdrawalAddressAndMethod?.bankAccountNumber || ''
  );
  const [bankName, setBankName] = useState(user.withdrawalAddressAndMethod?.bankName || '');
  const [routingNumber, setRoutingNumber] = useState(
    (user.withdrawalAddressAndMethod as any)?.routingNumber || ''
  );
  const [branchName, setBranchName] = useState(user.withdrawalAddressAndMethod?.branchName || '');
  const [district, setDistrict] = useState(user.withdrawalAddressAndMethod?.district || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please Enter Your Name', 'error');
      return;
    }
    if (!accountNumber.trim()) {
      showToast('Please Enter An Account Number', 'error');
      return;
    }
    if (!bankName.trim()) {
      showToast('Please Enter A Bank Name', 'error');
      return;
    }

    setSaving(true);
    // Unify all bound address parameters
    const info: WithdrawalInfo & { routingNumber?: string } = {
      withdrawMethod: 'BankTransfer',
      name,
      bankName,
      bankAccountNumber: accountNumber,
      branchName,
      district,
      mobileBankingName: 'bKash',
      mobileBankingAccountNumber: mobileNumber,
    };
    (info as any).routingNumber = routingNumber;

    await updateWithdrawalAddress(info);
    setSaving(false);
    showToast('Withdrawal account bound successfully!', 'success');
    navigate('/cash-out');
  };

  return (
    <div className="max-w-[500px] mx-auto bg-gray-50 min-h-screen flex flex-col justify-between shadow-md font-sans">
      
      {/* 1. Header (Dark theme to match screenshot Image 2) */}
      <div className="bg-[#242424] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-80 transition-opacity p-1 cursor-pointer flex items-center"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#f5c518]" />
        </button>
        <h1 className="text-base font-extrabold tracking-wide text-center flex-1 pr-6 text-white">
          Bank
        </h1>
      </div>

      {/* 2. Main Input Form Section */}
      <div className="flex-1 p-6 space-y-5 bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Capsule 1: Account Holder */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              Account Holder
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please Enter Your Name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
              required
            />
          </div>

          {/* Capsule 2: Mobile Number */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              880
            </span>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Please Enter Your Mobile Number"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
            />
          </div>

          {/* Capsule 3: Account Number */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              Account Number
            </span>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Please Enter An Account Number"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
              required
            />
          </div>

          {/* Capsule 4: Name of Bank */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              Name of Bank
            </span>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Please Enter A Bank Name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
              required
            />
          </div>

          {/* Capsule 5: Routing Number */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              Routing Number
            </span>
            <input
              type="text"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              placeholder="Routing Number"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
            />
          </div>

          {/* Capsule 6: Branch Name */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              Branch Name
            </span>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Please Enter Branch Name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
            />
          </div>

          {/* Capsule 7: District Name */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-2xs">
            <span className="text-gray-700 font-bold text-xs w-[110px] flex-shrink-0 text-left">
              District Name
            </span>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Please Enter District Name"
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-300 py-1"
            />
          </div>

          {/* Bind Address Big Yellow Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-[#f5c518] hover:bg-amber-400 text-black rounded-full font-black text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer uppercase"
            >
              {saving ? 'Binding Address...' : 'Bind Address'}
            </button>
          </div>

        </form>
      </div>

      {/* 3. Dark Bottom Navigation Footer (Identical match to screenshot footer) */}
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
            className="flex flex-col items-center gap-0.5 text-white cursor-pointer transition-colors"
          >
            <UserIcon className="w-5 h-5 text-[#f5c518]" />
            <span className="text-[9px] font-bold tracking-wide uppercase text-[#f5c518]">Profile</span>
          </button>

        </div>
      </div>

    </div>
  );
};
