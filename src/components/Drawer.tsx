import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  CreditCard,
  MessageSquare,
  FileText,
  CalendarCheck,
  History,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  X,
  Plus,
  Film,
  Zap,
  ArrowDownCircle,
} from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenCashIn: () => void;
  onOpenAccountDetails: () => void;
}

export const Drawer: React.FC<Props> = ({
  open,
  onClose,
  onOpenCashIn,
  onOpenAccountDetails,
}) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!open) return null;

  const handleSignOut = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const menuItems = [
    { label: 'PLEX Movie Portal', to: '/', icon: Film, badge: 'Hot' },
    { label: 'Snatch Orders & Review', to: '/task', icon: Zap },
    { label: 'Withdrawal / Cash Out', to: '/cash-out', icon: ArrowDownCircle, badge: 'Instant' },
    { label: 'Bind Withdrawal Account', to: '/bind-account', icon: CreditCard },
    { label: 'Daily Check In', to: '/check-in', icon: CalendarCheck },
    { label: 'Transaction History', to: '/history', icon: History },
    { label: 'Security & Password', to: '/forgot-password', icon: Lock },
    { label: 'Help Center & FAQ', to: '/help', icon: HelpCircle },
    { label: 'About PLEX', to: '/about', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-[300px] sm:w-[350px] bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300">
          {/* Header with Close */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
            <span className="font-bold text-xs text-gray-500 uppercase tracking-wider">
              PLEX Navigation Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex flex-col items-center pt-5 pb-5 border-b border-gray-200">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-2 text-slate-600 shadow-inner">
              <UserIcon className="w-8 h-8" />
            </div>
            <div className="text-lg font-bold text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">UID: {user.userId}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-1">
              Available: ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCashIn();
              }}
              className="mt-3 w-[85%] bg-primaryButton text-white py-2 rounded-md font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-md text-sm"
            >
              Recharge Balance
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-gray-200 bg-slate-50/50">
            <Link
              to="/cash-out"
              onClick={onClose}
              className="flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-slate-200">
                <ArrowDownCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-700">Withdraw</span>
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className="flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primaryButton border border-slate-200">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-700">Support</span>
            </Link>

            <button
              onClick={() => {
                onClose();
                onOpenAccountDetails();
              }}
              className="flex flex-col items-center cursor-pointer gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primaryButton border border-slate-200">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-700">Records</span>
            </button>
          </div>

          {/* Navigation Links with + icon */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="text-[10px] font-bold bg-[#f5c518] text-black px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-500 text-red-500 rounded-md font-semibold hover:bg-red-50 transition-colors cursor-pointer text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
