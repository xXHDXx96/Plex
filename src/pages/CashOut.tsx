import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Wallet, AlertCircle, Lock, X } from 'lucide-react';

export const CashOut: React.FC = () => {
  const navigate = useNavigate();
  const { user, submitWithdrawal, showToast } = useApp();

  const [amount, setAmount] = useState<string>('');
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const boundAccount = user.withdrawalAddressAndMethod;

  const handleOpenPin = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    if (val > user.userBalance) {
      showToast('Withdrawal amount exceeds available balance', 'error');
      return;
    }
    if (!boundAccount) {
      showToast('Please bind your withdrawal account first', 'error');
      navigate('/bind-account');
      return;
    }
    setPinModalOpen(true);
  };

  const handleConfirmWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      showToast('Please enter your withdrawal password', 'error');
      return;
    }

    setLoading(true);
    const res = await submitWithdrawal(parseFloat(amount), pin);
    setLoading(false);

    if (res.success) {
      setPinModalOpen(false);
      navigate('/history');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] pb-24 shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-gray-900">Cash Out / Withdrawal</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primaryButton to-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-gray-300 font-semibold tracking-wider uppercase mb-1">
              Available Balance
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white mb-3">
              ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <span>Daily Profit Settled: +৳{user.dailyProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bound Account Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Receiving Account
            </span>
            <Link
              to="/bind-account"
              className="text-xs font-bold text-primaryButton hover:underline"
            >
              {boundAccount ? 'Change' : 'Bind Account'}
            </Link>
          </div>

          {boundAccount ? (
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-900">
                {boundAccount.withdrawMethod === 'BankTransfer'
                  ? `${boundAccount.bankName} Wire`
                  : `${boundAccount.mobileBankingName} E-Wallet`}
              </div>
              <div className="text-xs text-gray-600">
                Account:{' '}
                {boundAccount.withdrawMethod === 'BankTransfer'
                  ? boundAccount.bankAccountNumber
                  : boundAccount.mobileBankingAccountNumber}
              </div>
              <div className="text-xs text-gray-500">Name: {boundAccount.name}</div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-600 text-xs py-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>No withdrawal account linked yet. Click above to bind.</span>
            </div>
          )}
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleOpenPin} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700 uppercase">
                Withdrawal Amount (BDT ৳)
              </label>
              <button
                type="button"
                onClick={() => setAmount(user.userBalance.toString())}
                className="text-xs font-bold text-primaryButton hover:underline cursor-pointer"
              >
                All Balance
              </button>
            </div>
            <input
              type="number"
              min="100"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!boundAccount || !amount || parseFloat(amount) <= 0}
              className="w-full py-3.5 bg-primaryButton text-white rounded-xl font-bold hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
            >
              Continue to Cash Out
            </button>
          </div>
        </form>

        {/* Set withdraw password link */}
        <div className="text-center pt-2">
          <Link
            to="/withdraw-password"
            className="text-xs text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 font-medium"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Manage E-Wallet Withdrawal PIN</span>
          </Link>
        </div>
      </div>

      {/* Security PIN Modal */}
      {pinModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Security Verification</h3>
              <button
                onClick={() => setPinModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Please enter your 6-digit withdrawal security password to authorize ৳
              {parseFloat(amount).toLocaleString()}.
            </p>

            <form onSubmit={handleConfirmWithdrawal} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="******"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest font-black focus:outline-none focus:ring-2 focus:ring-primaryButton/30"
                  autoFocus
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-bold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !pin}
                  className="flex-1 py-2.5 bg-primaryButton text-white rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Submitting...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
