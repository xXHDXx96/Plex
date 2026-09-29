import React from 'react';
import { useApp } from '../context/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountDetailsModal: React.FC<Props> = ({ open, onClose }) => {
  const { user } = useApp();

  if (!open) return null;

  const formatCurrency = (val: number) =>
    Number(val || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 bg-teal/20 border-b border-teal/10">
          <h2 className="text-lg font-semibold text-center w-full text-slate-800">Account Details</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Available Balance</p>
              <p className="font-bold text-slate-800 text-lg">৳{formatCurrency(user.userBalance)}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Daily Profit</p>
              <p className="font-bold text-emerald-600 text-lg">৳{formatCurrency(user.dailyProfit)}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Insufficient Balance</p>
              <p
                className={`font-bold text-lg ${
                  user.outOfBalance !== 0 ? 'text-red-500' : 'text-slate-800'
                }`}
              >
                ৳{formatCurrency(user.outOfBalance)}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Current Snatching Order</p>
              <p className="text-slate-800 font-bold text-lg">
                {user.completedOrdersCount} / {user.quantityOfOrders}
              </p>
            </div>

            <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Trial Amount</p>
              <p className="font-bold text-slate-800 text-lg">৳{formatCurrency(user.trialRoundBalance)}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-primaryButton text-white rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
