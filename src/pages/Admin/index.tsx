import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  User as UserIcon,
  ArrowDownCircle,
  CreditCard,
  Film,
  Zap,
  CheckCircle,
  XCircle,
  LogOut,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  Settings,
  Layers,
  Sparkles,
  Eye,
  Check,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { Product } from '../../types';
import { AdminAnalyticsDashboard } from '../../components/AdminAnalyticsDashboard';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    products,
    transactions,
    orderRecords,
    adminIsAuthenticated,
    adminLogin,
    adminLogout,
    approveWithdrawal,
    rejectWithdrawal,
    approveRecharge,
    rejectRecharge,
    adjustUserBalance,
    updateUserVIP,
    updateUserScore,
    addMovie,
    updateMovie,
    deleteMovie,
    setMovieMultiplier,
    showToast,
  } = useApp();

  // Login form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Active navigation tab in admin console
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'withdrawals' | 'deposits' | 'users' | 'movies' | 'tasks' | 'settings'
  >('overview');

  // Modals inside Admin Console
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('10000');
  const [balanceAction, setBalanceAction] = useState<'add' | 'deduct'>('add');
  const [balanceNote, setBalanceNote] = useState('Promotional Bonus');

  const [movieModalOpen, setMovieModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Product | null>(null);
  const [movieName, setMovieName] = useState('');
  const [movieYear, setMovieYear] = useState('2025');
  const [movieRating, setMovieRating] = useState('8.5');
  const [movieDirector, setMovieDirector] = useState('Christopher Nolan');
  const [movieStars, setMovieStars] = useState('Lead Actor, Co-Star');
  const [moviePoster, setMoviePoster] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80');
  const [moviePrice, setMoviePrice] = useState('50000');
  const [movieCommission, setMovieCommission] = useState('2200');
  const [movieGenre, setMovieGenre] = useState('Action, Sci-Fi');
  const [movieBoxOffice, setMovieBoxOffice] = useState('$650.0M');
  const [movieIntro, setMovieIntro] = useState('A thrilling cinematic experience engineered for high-engagement media optimization.');

  const [searchQuery, setSearchQuery] = useState('');

  // Handle Admin Sign In
  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(adminUsername, adminPassword);
  };

  // Handle Balance Adjustment
  const handleConfirmBalanceAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(balanceAmount);
    if (!val || val <= 0) return;
    const delta = balanceAction === 'add' ? val : -val;
    adjustUserBalance(delta, balanceNote);
    setBalanceModalOpen(false);
  };

  // Open Movie Editor
  const handleOpenAddMovie = () => {
    setEditingMovie(null);
    setMovieName('');
    setMovieYear('2025');
    setMovieRating('8.6');
    setMovieDirector('Denis Villeneuve');
    setMovieStars('Timothée Chalamet, Zendaya');
    setMoviePoster('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
    setMoviePrice('40000');
    setMovieCommission('1800');
    setMovieGenre('Sci-Fi, Adventure');
    setMovieBoxOffice('$750M');
    setMovieIntro('Captivating visual effects with critical global acclaim.');
    setMovieModalOpen(true);
  };

  const handleOpenEditMovie = (movie: Product) => {
    setEditingMovie(movie);
    setMovieName(movie.name);
    setMovieYear(movie.year.toString());
    setMovieRating(movie.rating.toString());
    setMovieDirector(movie.director);
    setMovieStars(movie.stars);
    setMoviePoster(movie.poster);
    setMoviePrice(movie.price.toString());
    setMovieCommission(movie.commission.toString());
    setMovieGenre(movie.genre.join(', '));
    setMovieBoxOffice(movie.boxOffice || '$500M');
    setMovieIntro(movie.introduction);
    setMovieModalOpen(true);
  };

  const handleSaveMovie = (e: React.FormEvent) => {
    e.preventDefault();
    const movieData: Product = {
      productId: editingMovie ? editingMovie.productId : `plex-mov-${Date.now()}`,
      name: movieName,
      year: parseInt(movieYear, 10) || 2025,
      rating: parseFloat(movieRating) || 8.5,
      director: movieDirector,
      stars: movieStars,
      poster: moviePoster,
      price: parseFloat(moviePrice) || 30000,
      commission: parseFloat(movieCommission) || 1200,
      salePrice: (parseFloat(moviePrice) || 30000) + (parseFloat(movieCommission) || 1200),
      status: 'Active',
      genre: movieGenre.split(',').map((g) => g.trim()),
      boxOffice: movieBoxOffice,
      introduction: movieIntro,
      reviews: '18,500 Reviews',
    };

    if (editingMovie) {
      updateMovie(movieData);
    } else {
      addMovie(movieData);
    }
    setMovieModalOpen(false);
  };

  // Filtered withdrawals & transactions
  const withdrawalList = transactions.filter((t) => t.type === 'withdraw');
  const rechargeList = transactions.filter((t) => t.type === 'recharge');

  // Total metrics calculation
  const totalUserBalance = user.userBalance;
  const pendingWithdrawalSum = withdrawalList
    .filter((w) => w.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // If not logged in as Admin, show Standalone Admin Authentication Portal
  if (!adminIsAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col justify-between p-4 sm:p-6 text-white font-sans">
        {/* Top Minimal Navigation */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="bg-[#f5c518] text-black font-black text-xl px-2.5 py-0.5 rounded-sm tracking-tight shadow-md uppercase">
              PLEX
            </span>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
              Enterprise Admin Portal
            </span>
          </Link>

          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-[#161f30] px-3 py-1.5 rounded-lg border border-gray-700 transition-colors"
          >
            <span>Exit to Movie Portal ›</span>
          </Link>
        </div>

        {/* Center Admin Login Card */}
        <div className="max-w-md w-full mx-auto my-12 bg-[#121826] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-2">
              <ShieldCheck className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin System Sign In</h1>
            <p className="text-xs text-gray-400">
              Sign in to manage withdrawals, deposits, movie catalogues, and task multipliers.
            </p>
          </div>

          <form onSubmit={handleAdminSignIn} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Admin Username / Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-9 pr-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#f5c518] hover:bg-amber-400 text-black font-black text-sm rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Sign In to Admin Console
            </button>
          </form>
        </div>

        {/* Minimal Footer */}
        <div className="text-center text-xs text-gray-600">
          PLEX Master Control Architecture · Enterprise Operations System
        </div>
      </div>
    );
  }

  // Once authenticated: Standalone Complete Admin Management System
  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-200 font-sans flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#111726]/95 backdrop-blur-md border-b border-gray-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="bg-[#f5c518] text-black font-black text-lg px-2 py-0.5 rounded-sm tracking-tight shadow-md uppercase">
              PLEX
            </span>
            <span className="bg-red-600 text-white font-bold text-[10px] uppercase px-1.5 py-0.5 rounded tracking-wider">
              Control Console
            </span>
          </Link>
          <span className="hidden md:inline text-xs text-gray-400 font-medium border-l border-gray-700 pl-3">
            Integrated Movie Operations & Financial Ledger
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-[#1a2338] px-3 py-1.5 rounded-lg border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">Live Server: <b>Online</b></span>
          </div>

          <Link
            to="/"
            className="bg-[#1a2338] hover:bg-[#25324f] text-gray-200 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">View Public Portal</span>
          </Link>

          <button
            onClick={adminLogout}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Dashboard Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#0d1320] border-b md:border-b-0 md:border-r border-gray-800 p-3 sm:p-4 flex flex-row md:flex-col justify-between gap-1 overflow-x-auto no-scrollbar">
          <div className="space-y-1 flex flex-row md:flex-col min-w-max md:min-w-0">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp, badge: null },
              { id: 'analytics', label: 'Data Visualizations', icon: BarChart3, badge: 'Recharts' },
              {
                id: 'withdrawals',
                label: 'Cash-Out / Withdrawals',
                icon: ArrowDownCircle,
                badge: withdrawalList.filter((w) => w.status === 'Pending').length || null,
              },
              { id: 'deposits', label: 'Recharges & Deposits', icon: CreditCard, badge: null },
              { id: 'users', label: 'User Wallets & Accounts', icon: Users, badge: null },
              { id: 'movies', label: 'PLEX Movie Catalog', icon: Film, badge: products.length },
              { id: 'tasks', label: 'Task Multipliers & Rules', icon: Zap, badge: 'Hot' },
              { id: 'settings', label: 'System Configuration', icon: Settings, badge: null },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#f5c518] text-black shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-[#162035]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                        isActive
                          ? 'bg-black text-[#f5c518]'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block pt-4 border-t border-gray-800 text-[11px] text-gray-500 space-y-1">
            <div>PLEX Operations Console</div>
            <div>Version 3.4.0 (Enterprise)</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  System Executive Overview
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Real-time consolidated statistics of user activities, review orders, and liquidity.
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-bold uppercase">Total User Liquidity</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    ৳{totalUserBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Verified Active Funds
                  </div>
                </div>

                <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-bold uppercase">Pending Cash-Outs</span>
                    <ArrowDownCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    ৳{pendingWithdrawalSum.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {withdrawalList.filter((w) => w.status === 'Pending').length} requests awaiting disbursement
                  </div>
                </div>

                <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-bold uppercase">Completed Media Tasks</span>
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {orderRecords.length}
                  </div>
                  <div className="text-[11px] text-blue-400 font-medium">
                    Daily Cap: 25 orders / account
                  </div>
                </div>

                <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-xs font-bold uppercase">PLEX Movies Online</span>
                    <Film className="w-4 h-4 text-[#f5c518]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-[#f5c518] font-medium">
                    Curated Box Office Releases
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-gradient-to-r from-[#141c2c] to-[#121826] border border-gray-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Liquidity Operations</h3>
                  <p className="text-xs text-gray-400">
                    Adjust user balances, verify bank transfers, or inject movie tasks into live rotation.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setBalanceAction('add');
                      setBalanceModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Credit User Balance</span>
                  </button>
                  <button
                    onClick={handleOpenAddMovie}
                    className="bg-[#f5c518] hover:bg-amber-400 text-black font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Movie</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdrawals')}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs px-3 py-2 rounded-xl transition-all border border-gray-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowDownCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Review Pending Withdrawals</span>
                  </button>
                </div>
              </div>

              {/* Data Visualization Dashboard using Recharts */}
              <AdminAnalyticsDashboard
                user={user}
                orderRecords={orderRecords}
                transactions={transactions}
                onApproveWithdrawal={approveWithdrawal}
                onRejectWithdrawal={rejectWithdrawal}
                onNavigateToTab={(tab) => setActiveTab(tab as any)}
              />

              {/* Recent Ledger Logs */}
              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Financial Ledger Records
                  </h3>
                  <button
                    onClick={() => setActiveTab('withdrawals')}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    View All ›
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                     <thead>
                       <tr className="border-b border-gray-800 text-gray-400 uppercase font-bold text-[11px]">
                         <th className="pb-3">Transaction ID</th>
                         <th className="pb-3">Type</th>
                         <th className="pb-3">Gateway</th>
                         <th className="pb-3">Amount (BDT)</th>
                         <th className="pb-3">Date</th>
                         <th className="pb-3">Status</th>
                         <th className="pb-3 text-right">Quick Action</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-800/60 font-mono">
                       {transactions.slice(0, 6).map((tx) => (
                         <tr key={tx.id} className="hover:bg-[#162035]/50 transition-colors">
                           <td className="py-3 text-gray-300 font-bold">{tx.id}</td>
                           <td className="py-3 font-sans">
                             <span
                               className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                 tx.type === 'withdraw'
                                   ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                   : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                               }`}
                             >
                               {tx.type}
                             </span>
                           </td>
                           <td className="py-3 font-sans text-gray-300">{tx.method || 'Transfer'}</td>
                           <td
                             className={`py-3 font-black text-sm ${
                               tx.type === 'withdraw' ? 'text-red-400' : 'text-emerald-400'
                             }`}
                           >
                             {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount.toLocaleString()}
                           </td>
                           <td className="py-3 text-gray-400 text-[11px]">
                             {new Date(tx.createdAt).toLocaleDateString()}
                           </td>
                           <td className="py-3 font-sans">
                             <span
                               className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                 tx.status === 'Success'
                                   ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                   : tx.status === 'Pending'
                                   ? 'bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse'
                                   : 'bg-red-950 text-red-300 border border-red-500/30'
                               }`}
                             >
                               {tx.status}
                             </span>
                           </td>
                           <td className="py-3 text-right font-sans">
                             {tx.status === 'Pending' && tx.type === 'withdraw' ? (
                               <div className="flex items-center justify-end gap-1.5">
                                 <button
                                   onClick={() => approveWithdrawal(tx.id)}
                                   className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2 py-1 rounded cursor-pointer"
                                 >
                                   Approve
                                 </button>
                                 <button
                                   onClick={() => rejectWithdrawal(tx.id, 'Account Details Incomplete')}
                                   className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded cursor-pointer"
                                 >
                                   Reject
                                 </button>
                               </div>
                             ) : (
                               <span className="text-[11px] text-gray-500 font-mono">Settled</span>
                             )}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA VISUALIZATIONS DASHBOARD (RECHARTS) */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <AdminAnalyticsDashboard
                user={user}
                orderRecords={orderRecords}
                transactions={transactions}
                onApproveWithdrawal={approveWithdrawal}
                onRejectWithdrawal={rejectWithdrawal}
                onNavigateToTab={(tab) => setActiveTab(tab as any)}
              />
            </div>
          )}

          {/* TAB 3: WITHDRAWALS MANAGEMENT */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <ArrowDownCircle className="w-6 h-6 text-emerald-400" />
                    <span>Withdrawal & Cash-Out Approvals</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Approve, audit, or refund user withdrawal requests. Funds disburse instantly upon approval.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg font-bold">
                    Pending Queue: {withdrawalList.filter((w) => w.status === 'Pending').length}
                  </span>
                </div>
              </div>

              {/* Withdrawals Table */}
              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 shadow-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 uppercase font-bold text-[11px]">
                      <th className="pb-3">Request ID</th>
                      <th className="pb-3">User & Contact</th>
                      <th className="pb-3">Gateway</th>
                      <th className="pb-3">Receiving Account</th>
                      <th className="pb-3">Amount (BDT)</th>
                      <th className="pb-3">Submission Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {withdrawalList.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500 font-sans">
                          No withdrawal records found.
                        </td>
                      </tr>
                    ) : (
                      withdrawalList.map((tx) => (
                        <tr key={tx.id} className="hover:bg-[#162035]/50 transition-colors">
                          <td className="py-3 font-bold text-gray-300">{tx.id}</td>
                          <td className="py-3 font-sans">
                            <div className="font-bold text-white">{user.name}</div>
                            <div className="text-[11px] text-gray-500 font-mono">{user.phoneNumber}</div>
                          </td>
                          <td className="py-3 font-sans text-gray-300">{tx.method}</td>
                          <td className="py-3 text-emerald-400 font-bold">{tx.accountNumber || user.phoneNumber}</td>
                          <td className="py-3 font-black text-sm text-red-400">
                            -৳{tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3 text-gray-400 text-[11px]">
                            {new Date(tx.createdAt).toLocaleString()}
                          </td>
                          <td className="py-3 font-sans">
                            <span
                              className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                tx.status === 'Success'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                  : tx.status === 'Pending'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse'
                                  : 'bg-red-950 text-red-300 border border-red-500/30'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 text-right font-sans">
                            {tx.status === 'Pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => approveWithdrawal(tx.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-sm flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => rejectWithdrawal(tx.id, 'Account verification required')}
                                  className="bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-bold text-xs px-3 py-1.5 rounded-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-gray-500">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DEPOSITS & RECHARGES */}
          {activeTab === 'deposits' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-blue-400" />
                    <span>Recharges & Deposits Ledger</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    View incoming deposits via bKash, Nagad, USDT TRC20, and Bank Wire.
                  </p>
                </div>
              </div>

              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 shadow-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 uppercase font-bold text-[11px]">
                      <th className="pb-3">Transaction ID</th>
                      <th className="pb-3">User</th>
                      <th className="pb-3">Deposit Method</th>
                      <th className="pb-3">Amount (BDT)</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {rechargeList.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#162035]/50 transition-colors">
                        <td className="py-3 font-bold text-gray-300">{tx.id}</td>
                        <td className="py-3 font-sans text-white font-bold">{user.name}</td>
                        <td className="py-3 font-sans text-gray-300">{tx.method}</td>
                        <td className="py-3 font-black text-sm text-emerald-400">
                          +৳{tx.amount.toLocaleString()}
                        </td>
                        <td className="py-3 text-gray-400 text-[11px]">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 font-sans">
                          {tx.status === 'Pending' ? (
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse">
                                Pending
                              </span>
                              <button
                                onClick={() => approveRecharge(tx.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-2 py-1 rounded transition-transform active:scale-95 cursor-pointer shadow-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectRecharge(tx.id, 'Unconfirmed or invalid transfer transaction ID')}
                                className="bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 font-bold text-[10px] px-2 py-1 rounded transition-transform active:scale-95 cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              tx.status === 'Success'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : 'bg-red-950 text-red-300 border border-red-500/30'
                            }`}>
                              {tx.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right font-sans text-xs font-semibold">
                          {tx.status === 'Success' ? (
                            <span className="text-emerald-400">Verified & Credited</span>
                          ) : tx.status === 'Pending' ? (
                            <span className="text-amber-400">Awaiting Audit</span>
                          ) : (
                            <span className="text-red-400">Rejected & Void</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: USERS & WALLETS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-400" />
                    <span>User Accounts & Liquidity Control</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Direct balance adjustment, VIP status modification, and security controls.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setBalanceAction('add');
                    setBalanceModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adjust Balance (+ / -)</span>
                </button>
              </div>

              {/* Main User Profile Card */}
              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-300 flex items-center justify-center text-black font-black text-2xl shadow-lg">
                      U
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{user.name}</h3>
                        <span className="bg-amber-400 text-black font-bold text-[10px] px-2 py-0.5 rounded">
                          {user.userType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        UID: #{user.userId} · Phone: {user.phoneNumber} · Email: {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400 uppercase font-semibold">Current Balance</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono">
                      ৳{user.userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Account Details & Quick Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800 space-y-1">
                    <span className="text-gray-500 uppercase font-semibold text-[10px]">
                      Honor & Credit Score
                    </span>
                    <div className="text-lg font-bold text-cyan-400 font-mono">{user.score} / 100</div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => updateUserScore(100)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Set 100
                      </button>
                      <button
                        onClick={() => updateUserScore(95)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        Set 95
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800 space-y-1">
                    <span className="text-gray-500 uppercase font-semibold text-[10px]">VIP Tier Level</span>
                    <div className="text-lg font-bold text-amber-400">{user.userType}</div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => updateUserVIP('Normal VIP 1')}
                        className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2 py-1 rounded cursor-pointer"
                      >
                        VIP 1
                      </button>
                      <button
                        onClick={() => updateUserVIP('Super VIP 2')}
                        className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2 py-1 rounded cursor-pointer"
                      >
                        VIP 2
                      </button>
                      <button
                        onClick={() => updateUserVIP('Diamond VIP 3')}
                        className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2 py-1 rounded cursor-pointer"
                      >
                        VIP 3
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800 space-y-1">
                    <span className="text-gray-500 uppercase font-semibold text-[10px]">
                      Bound Withdrawal Account
                    </span>
                    {user.withdrawalAddressAndMethod ? (
                      <div className="text-xs font-bold text-white">
                        {user.withdrawalAddressAndMethod.mobileBankingName} :{' '}
                        <span className="text-emerald-400 font-mono">
                          {user.withdrawalAddressAndMethod.mobileBankingAccountNumber ||
                            user.withdrawalAddressAndMethod.bankAccountNumber}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-amber-400">No account bound yet</div>
                    )}
                    <div className="text-[11px] text-gray-500 pt-1">
                      Daily tasks completed: <b>{user.completedOrdersCount}/25</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PLEX MOVIES CATALOG MANAGEMENT */}
          {activeTab === 'movies' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Film className="w-6 h-6 text-[#f5c518]" />
                    <span>PLEX Movie Catalog Manager ({products.length})</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add new movies, edit box office figures, adjust commission payouts, or delete titles.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddMovie}
                  className="bg-[#f5c518] hover:bg-amber-400 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Movie to PLEX</span>
                </button>
              </div>

              {/* Movies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((movie) => (
                  <div
                    key={movie.productId}
                    className="bg-[#121826] border border-gray-800 rounded-xl overflow-hidden p-3 flex flex-col justify-between space-y-3 group hover:border-[#f5c518]/50 transition-colors shadow-lg"
                  >
                    <div className="flex gap-3">
                      <img
                        src={movie.poster}
                        alt={movie.name}
                        className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white truncate">{movie.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono">({movie.year})</span>
                        </div>
                        <div className="text-[11px] text-amber-400 font-bold mt-0.5">
                          ★ {movie.rating} / 10
                        </div>
                        <div className="text-[11px] text-gray-400 truncate mt-1">
                          Dir: {movie.director}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-mono font-bold mt-1">
                          Commission: +৳{movie.commission.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono text-gray-400">
                        Price: ৳{movie.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditMovie(movie)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-blue-400 rounded cursor-pointer"
                          title="Edit movie"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMovie(movie.productId)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-red-400 rounded cursor-pointer"
                          title="Delete movie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TASK & MULTIPLIERS */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <span>Task Rules & Mystery Box Multipliers</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure continuous multipliers (12x Flipbox, 3x Smart Falcon) and order matching algorithms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Flipbox Multiplier (12x)',
                    desc: 'Grants 12x profit bonus on target completed movie review order.',
                    badge: '12x Bonus',
                    color: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
                    action: () => setMovieMultiplier(products[0]?.productId, '12x'),
                  },
                  {
                    title: 'Smart Falcon Multiplier (3x)',
                    desc: 'Triples commission reward on next continuous order snatching round.',
                    badge: '3x Bonus',
                    color: 'text-blue-400 border-blue-500/40 bg-blue-950/20',
                    action: () => setMovieMultiplier(products[1]?.productId, '3x'),
                  },
                  {
                    title: 'Cash Mystery Voucher',
                    desc: 'Injects instant cash credit voucher into user wallet upon review submission.',
                    badge: 'Cash Voucher',
                    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
                    action: () => setMovieMultiplier(products[2]?.productId, 'cash'),
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border ${item.color} space-y-3 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/50">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        item.action();
                        showToast(`Activated ${item.title} in order pool!`);
                      }}
                      className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl border border-gray-700 cursor-pointer"
                    >
                      Assign Multiplier to Live Pool
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Settings className="w-6 h-6 text-gray-400" />
                  <span>System Configuration & Operational Policies</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Platform parameters, payment gateway API keys, and withdrawal thresholds.
                </p>
              </div>

              <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 space-y-4 max-w-xl shadow-lg text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-semibold">Platform Brand Name</label>
                  <input
                    type="text"
                    defaultValue="PLEX Official Media Portal"
                    disabled
                    className="w-full px-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-lg text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-semibold">Minimum Withdrawal (BDT ৳)</label>
                  <input
                    type="text"
                    defaultValue="1,000"
                    className="w-full px-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-lg text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-semibold">VIP Handling Fee (%)</label>
                  <input
                    type="text"
                    defaultValue="0.00% (Privileged Exemption)"
                    className="w-full px-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-lg text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-semibold">Daily Maximum Orders Cap</label>
                  <input
                    type="text"
                    defaultValue="25 Orders per Account"
                    className="w-full px-3 py-2 bg-[#0b0f19] border border-gray-700 rounded-lg text-white font-mono"
                  />
                </div>

                <button
                  onClick={() => showToast('System parameters saved successfully!', 'success')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: ADJUST BALANCE MODAL */}
      {balanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161f30] border border-gray-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <h3 className="font-bold text-white text-base">Adjust User Balance</h3>
            <form onSubmit={handleConfirmBalanceAdjust} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Action</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBalanceAction('add')}
                    className={`py-1.5 rounded-lg font-bold cursor-pointer ${
                      balanceAction === 'add'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-800 text-gray-400'
                    }`}
                  >
                    Credit (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBalanceAction('deduct')}
                    className={`py-1.5 rounded-lg font-bold cursor-pointer ${
                      balanceAction === 'deduct'
                        ? 'bg-red-600 text-white'
                        : 'bg-neutral-800 text-gray-400'
                    }`}
                  >
                    Debit (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Amount (BDT ৳)</label>
                <input
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-gray-700 rounded-lg text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Operational Reason</label>
                <input
                  type="text"
                  value={balanceNote}
                  onChange={(e) => setBalanceNote(e.target.value)}
                  placeholder="e.g. VIP Promotion Bonus"
                  className="w-full px-3 py-2 bg-neutral-900 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBalanceModalOpen(false)}
                  className="flex-1 py-2 bg-neutral-800 text-gray-300 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#f5c518] hover:bg-amber-400 text-black font-bold rounded-lg cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT MOVIE MODAL */}
      {movieModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161f30] border border-gray-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-left my-auto text-xs">
            <h3 className="font-bold text-white text-base">
              {editingMovie ? `Edit Movie: ${editingMovie.name}` : 'Add New Movie to PLEX'}
            </h3>

            <form onSubmit={handleSaveMovie} className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Movie Title</label>
                  <input
                    type="text"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    placeholder="e.g. Gladiator II"
                    className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Release Year</label>
                  <input
                    type="number"
                    value={movieYear}
                    onChange={(e) => setMovieYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">PLEX Rating (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={movieRating}
                    onChange={(e) => setMovieRating(e.target.value)}
                    placeholder="8.8"
                    className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Box Office Gross</label>
                  <input
                    type="text"
                    value={movieBoxOffice}
                    onChange={(e) => setMovieBoxOffice(e.target.value)}
                    placeholder="e.g. $850.5M"
                    className="w-full px-3 py-2 bg-neutral-955 border border-gray-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Task Order Price (৳)</label>
                  <input
                    type="number"
                    value={moviePrice}
                    onChange={(e) => setMoviePrice(e.target.value)}
                    placeholder="30000"
                    className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Commission Profit (৳)</label>
                  <input
                    type="number"
                    value={movieCommission}
                    onChange={(e) => setMovieCommission(e.target.value)}
                    placeholder="1200"
                    className="w-full px-3 py-2 bg-neutral-955 border border-gray-700 rounded-lg text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Director</label>
                <input
                  type="text"
                  value={movieDirector}
                  onChange={(e) => setMovieDirector(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Cast Stars (comma separated)</label>
                <input
                  type="text"
                  value={movieStars}
                  onChange={(e) => setMovieStars(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Poster Image URL</label>
                <input
                  type="text"
                  value={moviePoster}
                  onChange={(e) => setMoviePoster(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-gray-700 rounded-lg text-white text-[11px] font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Synopsis / Plot</label>
                <textarea
                  value={movieIntro}
                  onChange={(e) => setMovieIntro(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-neutral-950 border border-gray-700 rounded-lg text-white text-xs"
                  required
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setMovieModalOpen(false)}
                  className="flex-1 py-2 bg-neutral-800 text-gray-300 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#f5c518] hover:bg-amber-400 text-black font-bold rounded-lg cursor-pointer"
                >
                  Save Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
