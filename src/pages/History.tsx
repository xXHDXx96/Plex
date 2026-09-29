import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock } from 'lucide-react';

export const History: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();

  const [mainTab, setMainTab] = useState<'withdraw' | 'other'>('withdraw');
  const [subTab, setSubTab] = useState<'checkIn' | 'recharge'>('checkIn');

  const filteredTx = transactions.filter((tx) => {
    if (mainTab === 'withdraw') {
      return tx.type === 'withdraw';
    }
    return tx.type === subTab;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-[500px] mx-auto bg-gray-50 min-h-[calc(100vh-64px)] pb-24 shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-gray-900">Transaction History</h1>
      </div>

      {/* Main Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => setMainTab('withdraw')}
          className={`flex-1 py-3 text-center text-sm font-bold transition-all cursor-pointer ${
            mainTab === 'withdraw'
              ? 'text-primaryButton border-b-2 border-primaryButton'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Cashout
        </button>
        <button
          onClick={() => setMainTab('other')}
          className={`flex-1 py-3 text-center text-sm font-bold transition-all cursor-pointer ${
            mainTab === 'other'
              ? 'text-primaryButton border-b-2 border-primaryButton'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Check In & Cash In
        </button>
      </div>

      {/* Sub Tabs for other */}
      {mainTab === 'other' && (
        <div className="flex bg-slate-100 border-b border-gray-200 px-4 py-2 gap-2">
          <button
            onClick={() => setSubTab('checkIn')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              subTab === 'checkIn'
                ? 'bg-white text-primaryButton shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Check In
          </button>
          <button
            onClick={() => setSubTab('recharge')}
            className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              subTab === 'recharge'
                ? 'bg-white text-primaryButton shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cash In / Recharge
          </button>
        </div>
      )}

      {/* List */}
      <div className="p-4 space-y-3">
        {filteredTx.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-6">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No transaction records found.</p>
          </div>
        ) : (
          filteredTx.map((tx) => {
            const isWithdraw = tx.type === 'withdraw';
            const isCheckIn = tx.type === 'checkIn';

            return (
              <div
                key={tx.id}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-base ${
                      isWithdraw
                        ? 'bg-red-50 text-red-600'
                        : isCheckIn
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {isWithdraw ? '↓' : isCheckIn ? '✓' : '↑'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {tx.method || (isWithdraw ? 'Cashout Request' : 'Deposit')}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(tx.createdAt)}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-sm font-black ${
                      isWithdraw
                        ? 'text-red-600'
                        : isCheckIn
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {isWithdraw ? '-' : '+'}৳{tx.amount.toLocaleString()}
                  </div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded ${
                      tx.status === 'Success'
                        ? 'bg-emerald-100 text-emerald-800'
                        : tx.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
