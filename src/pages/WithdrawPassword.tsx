import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export const WithdrawPassword: React.FC = () => {
  const navigate = useNavigate();
  const { setWithdrawPassword, showToast } = useApp();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      showToast('Please fill in both fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setSaving(true);
    await setWithdrawPassword(password);
    setSaving(false);
    navigate('/cash-out');
  };

  return (
    <div className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] pb-24 shadow-sm">
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-gray-900">Set E-Wallet Password</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              New Withdrawal Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter at least 6 digits"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Confirm Withdrawal Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 bg-primaryButton text-white rounded-lg font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-md"
            >
              {saving ? 'Saving...' : 'Set Cash Out Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
