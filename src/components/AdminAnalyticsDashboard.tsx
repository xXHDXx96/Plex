import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowDownCircle,
  Clock,
  CreditCard,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Check,
  X,
  Zap,
} from 'lucide-react';
import { User, OrderRecordItem, TransactionItem } from '../types';

interface AdminAnalyticsDashboardProps {
  user: User;
  orderRecords: OrderRecordItem[];
  transactions: TransactionItem[];
  onApproveWithdrawal?: (txId: string) => void;
  onRejectWithdrawal?: (txId: string, reason?: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = ({
  user,
  orderRecords,
  transactions,
  onApproveWithdrawal,
  onRejectWithdrawal,
  onNavigateToTab,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('7d');
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'registrations' | 'tasks' | 'withdrawals'>('all');

  const daysCount = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;

  // Filter withdrawals
  const withdrawals = useMemo(() => {
    return transactions.filter((t) => t.type === 'withdraw');
  }, [transactions]);

  const activePendingWithdrawals = useMemo(() => {
    return withdrawals.filter((w) => w.status === 'Pending');
  }, [withdrawals]);

  const totalPendingAmount = useMemo(() => {
    return activePendingWithdrawals.reduce((sum, item) => sum + item.amount, 0);
  }, [activePendingWithdrawals]);

  // Generate historical data blended with live user actions
  const chartData = useMemo(() => {
    const list = [];
    const now = new Date();

    // Baseline historical registration numbers depending on days
    const baseDailyRegs = [18, 24, 32, 29, 45, 52, 68, 60, 72, 85, 91, 104, 118, 135];
    const baseDailyTasks = [140, 185, 230, 210, 310, 380, 420, 395, 460, 510, 580, 640, 720, 810];
    const baseCommissions = [11200, 14800, 18400, 16800, 24800, 30400, 33600, 31600, 36800, 40800, 46400, 51200, 57600, 64800];
    const baseWithdrawPending = [4, 6, 8, 5, 9, 12, 14, 11, 15, 18, 16, 21, 24, 28];

    let cumulativeRegs = 1420;

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDateStr = d.toISOString().split('T')[0];

      // Calculate matches from live order records and transactions
      const liveOrdersOnDay = orderRecords.filter((ord) => {
        const ordDate = new Date(ord.createdAt).toISOString().split('T')[0];
        return ordDate === fullDateStr;
      }).length;

      const liveWithdrawPendingOnDay = withdrawals.filter((w) => {
        const wDate = new Date(w.createdAt).toISOString().split('T')[0];
        return wDate === fullDateStr && w.status === 'Pending';
      }).length;

      const liveWithdrawCompletedOnDay = withdrawals.filter((w) => {
        const wDate = new Date(w.createdAt).toISOString().split('T')[0];
        return wDate === fullDateStr && w.status === 'Success';
      }).length;

      const seedIdx = (daysCount - 1 - i) % baseDailyRegs.length;
      const dailyRegs = baseDailyRegs[seedIdx] + (i === 0 ? 1 : 0);
      cumulativeRegs += dailyRegs;

      const dailyCompletedTasks = baseDailyTasks[seedIdx] + (i === 0 ? orderRecords.length : liveOrdersOnDay);
      const commissionTotal = baseCommissions[seedIdx] + (i === 0 ? Math.round(orderRecords.reduce((acc, o) => acc + o.commission, 0)) : 0);

      // Active / Pending withdrawal requests on this day
      const pendingRequests = i === 0 ? activePendingWithdrawals.length : (baseWithdrawPending[seedIdx] % 5) + liveWithdrawPendingOnDay;
      const approvedRequests = Math.round(pendingRequests * 2.8) + liveWithdrawCompletedOnDay;
      const rejectedRequests = Math.max(0, Math.round(pendingRequests * 0.35));

      const pendingVolumeAmount = pendingRequests * 6500 + (i === 0 ? totalPendingAmount : 0);

      list.push({
        date: dateStr,
        fullDate: fullDateStr,
        newRegistrations: dailyRegs,
        cumulativeUsers: cumulativeRegs,
        taskCompletions: dailyCompletedTasks,
        commissionPaid: commissionTotal,
        activeWithdrawals: pendingRequests,
        pendingAmount: pendingVolumeAmount,
        approvedWithdrawals: approvedRequests,
        rejectedWithdrawals: rejectedRequests,
      });
    }

    return list;
  }, [daysCount, orderRecords, withdrawals, activePendingWithdrawals, totalPendingAmount]);

  // Gateway distribution for active/total withdrawals
  const gatewayData = useMemo(() => {
    let bkashCount = 0;
    let nagadCount = 0;
    let usdtCount = 0;
    let bankCount = 0;

    withdrawals.forEach((w) => {
      const m = (w.method || '').toLowerCase();
      if (m.includes('bkash')) bkashCount++;
      else if (m.includes('nagad')) nagadCount++;
      else if (m.includes('usdt') || m.includes('crypto')) usdtCount++;
      else bankCount++;
    });

    // Provide default fallback volume if initial list is small
    const totalCount = bkashCount + nagadCount + usdtCount + bankCount;
    if (totalCount < 6) {
      bkashCount += 14;
      nagadCount += 9;
      usdtCount += 6;
      bankCount += 3;
    }

    return [
      { name: 'bKash Mobile', value: bkashCount, color: '#e2136e', share: '45%' },
      { name: 'Nagad Wallet', value: nagadCount, color: '#f7931e', share: '28%' },
      { name: 'USDT (TRC20)', value: usdtCount, color: '#26a17b', share: '18%' },
      { name: 'Bank Card / EFT', value: bankCount, color: '#3b82f6', share: '9%' },
    ];
  }, [withdrawals]);

  // Aggregate Metrics
  const totalRegistrationsPeriod = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.newRegistrations, 0);
  }, [chartData]);

  const totalTasksPeriod = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.taskCompletions, 0);
  }, [chartData]);

  const totalCommissionPeriod = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.commissionPaid, 0);
  }, [chartData]);

  // Custom tooltips for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a] border border-gray-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md min-w-[180px]">
          <div className="font-bold text-gray-200 border-b border-gray-800 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-amber-400 font-mono">PLEX Analytics</span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-gray-400">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}
                />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold font-mono text-white">
                {entry.name.includes('Amount') || entry.name.includes('Commission')
                  ? `৳${Number(entry.value).toLocaleString()}`
                  : Number(entry.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Title and Global Time Filters */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162035] to-[#111827] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#f5c518] text-black font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider">
              Visual Intelligence
            </span>
            <span className="text-gray-400 text-xs font-mono">
              Live Real-Time Telemetry
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#f5c518]" />
            <span>Operational Data Visualization Dashboard</span>
          </h2>
          <p className="text-xs text-gray-400 max-w-2xl">
            Live analytics monitoring daily registration momentum, media task completion volumes, and active liquidity withdrawal requests across the platform.
          </p>
        </div>

        {/* Timeframe Pill Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#0a0f1d] p-1.5 rounded-xl border border-gray-800">
          <Calendar className="w-4 h-4 text-gray-400 ml-2 hidden sm:inline" />
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeRange === '7d'
                ? 'bg-[#f5c518] text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('14d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeRange === '14d'
                ? 'bg-[#f5c518] text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            Last 14 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeRange === '30d'
                ? 'bg-[#f5c518] text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Primary KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Registrations */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Registrations ({timeRange.toUpperCase()})</span>
            </span>
            <span className="text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              +28.4%
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              {totalRegistrationsPeriod.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
              <span>Avg Daily: {Math.round(totalRegistrationsPeriod / daysCount)} users</span>
              <span className="text-emerald-400 font-semibold">Active: {user.name}</span>
            </div>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[78%] rounded-full" />
          </div>
        </div>

        {/* KPI 2: Task Completion Volume */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f5c518] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed Tasks</span>
            </span>
            <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <Zap className="w-3 h-3" />
              Peak High
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              {totalTasksPeriod.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
              <span>Order Fulfillments</span>
              <span className="text-amber-400 font-semibold">100% Verified</span>
            </div>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full w-[85%] rounded-full" />
          </div>
        </div>

        {/* KPI 3: Commission Paid Out */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Commission Payout</span>
            </span>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
              Automated
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
              ৳{totalCommissionPeriod.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
              <span>Gross Rewards Disbursed</span>
              <span className="text-gray-300 font-mono">12x/3x Boosts</span>
            </div>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full w-[92%] rounded-full" />
          </div>
        </div>

        {/* KPI 4: Active Withdrawal Requests */}
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden group hover:border-red-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ArrowDownCircle className="w-4 h-4" />
              <span>Active Withdrawal Queue</span>
            </span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-black border ${
                activePendingWithdrawals.length > 0
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {activePendingWithdrawals.length} Active
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              ৳{totalPendingAmount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
              <span>Awaiting Admin Action</span>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab('withdrawals')}
                  className="text-amber-400 hover:underline cursor-pointer font-bold"
                >
                  Manage Queue ›
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full w-[60%] rounded-full" />
          </div>
        </div>
      </div>

      {/* Metric Focus Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setActiveMetricTab('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeMetricTab === 'all'
              ? 'bg-[#1e293b] text-white border border-gray-600'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#f5c518]" />
          <span>All Charts Consolidated</span>
        </button>
        <button
          onClick={() => setActiveMetricTab('registrations')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeMetricTab === 'registrations'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-blue-300" />
          <span>Daily Registration Trends</span>
        </button>
        <button
          onClick={() => setActiveMetricTab('tasks')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeMetricTab === 'tasks'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Task Completion Volume</span>
        </button>
        <button
          onClick={() => setActiveMetricTab('withdrawals')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeMetricTab === 'withdrawals'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
          }`}
        >
          <ArrowDownCircle className="w-3.5 h-3.5" />
          <span>Active Withdrawal Requests</span>
        </button>
      </div>

      {/* ================= CHART 1: DAILY REGISTRATION TRENDS ================= */}
      {(activeMetricTab === 'all' || activeMetricTab === 'registrations') && (
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Daily Registration Trends</span>
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                New user accounts onboarded daily versus cumulative registered subscriber growth over the selected timeframe.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
                <span>New Signups</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-3 rounded-sm bg-cyan-300 inline-block" />
                <span>Cumulative Users</span>
              </div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#06b6d4"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="newRegistrations"
                  name="Daily New Users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRegs)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativeUsers"
                  name="Cumulative Users"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorCum)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-gray-800">
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Top Acquisition Day</span>
              <span className="text-white font-bold font-mono">Friday (+135 Users)</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Organic Conversion</span>
              <span className="text-emerald-400 font-bold font-mono">68.4% Completion</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Referral Invitation Rate</span>
              <span className="text-amber-400 font-bold font-mono">42.1% with Code</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Active User Retention</span>
              <span className="text-blue-400 font-bold font-mono">89.2% 7-Day Active</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHART 2: TOTAL VOLUME OF TASK COMPLETIONS ================= */}
      {(activeMetricTab === 'all' || activeMetricTab === 'tasks') && (
        <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#f5c518]" />
                  <span>Total Volume of Task Completions</span>
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Daily volume of movie review tasks completed by members paired with total commission distributed.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-3 rounded-sm bg-[#f5c518] inline-block" />
                <span>Completed Tasks</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
                <span>Commission (BDT)</span>
              </div>
            </div>
          </div>

          {/* Bar & Line Composed Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5c518" stopOpacity={1} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(val) => `৳${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="left"
                  dataKey="taskCompletions"
                  name="Tasks Completed"
                  fill="url(#barGold)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="commissionPaid"
                  name="Commission Paid"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4, strokeWidth: 1, stroke: '#ffffff' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-gray-800">
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Daily Account Limit</span>
              <span className="text-white font-bold font-mono">25 Orders / Member</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Avg. Commission / Task</span>
              <span className="text-emerald-400 font-bold font-mono">৳82.40</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Mystery Box Trigger Rate</span>
              <span className="text-amber-400 font-bold font-mono">14.6% (12x/3x)</span>
            </div>
            <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-gray-800/80">
              <span className="text-gray-500 text-[11px] block">Task Grabbing Success Rate</span>
              <span className="text-blue-400 font-bold font-mono">99.8% Instant Lock</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHART 3: ACTIVE WITHDRAWAL REQUESTS ================= */}
      {(activeMetricTab === 'all' || activeMetricTab === 'withdrawals') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Withdrawal Trend & Queue Volume */}
          <div className="lg:col-span-2 bg-[#121826] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <ArrowDownCircle className="w-5 h-5 text-rose-400" />
                    <span>Active Withdrawal Requests & Settlement</span>
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Live tracking of active pending withdrawal submissions versus approved and processed disbursements.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block" />
                  <span>Pending Queue</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
                  <span>Approved</span>
                </span>
              </div>
            </div>

            {/* Bar Chart showing Pending vs Approved */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="activeWithdrawals"
                    name="Pending Requests"
                    fill="#f43f5e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="approvedWithdrawals"
                    name="Approved Disbursed"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Action Queue for Immediate Review */}
            <div className="border-t border-gray-800 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Active Pending Queue Live Feed</span>
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {activePendingWithdrawals.length} Actionable Request(s)
                </span>
              </div>

              {activePendingWithdrawals.length === 0 ? (
                <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800/80 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>All withdrawal requests are currently cleared and settled!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {activePendingWithdrawals.slice(0, 3).map((w) => (
                    <div
                      key={w.id}
                      className="bg-[#0b0f19] border border-gray-800/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold font-mono">
                          ৳
                        </div>
                        <div>
                          <div className="font-bold text-white font-mono flex items-center gap-2">
                            <span>{w.id}</span>
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded font-sans">
                              {w.method || 'Transfer'}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Requested: {new Date(w.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-black text-rose-400 font-mono text-sm">
                            ৳{w.amount.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-gray-500">Net Disbursement</div>
                        </div>

                        {onApproveWithdrawal && (
                          <button
                            onClick={() => onApproveWithdrawal(w.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {onRejectWithdrawal && (
                          <button
                            onClick={() => onRejectWithdrawal(w.id, 'Insufficient Verification')}
                            className="bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/40 text-xs px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Gateway Breakdown & Risk Assessment */}
          <div className="bg-[#121826] border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>Withdrawal Gateway Share</span>
              </h3>
              <p className="text-xs text-gray-400">
                Distribution across Bangladeshi mobile banking and crypto liquidity rails.
              </p>
            </div>

            {/* Donut Chart */}
            <div className="h-52 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={gatewayData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {gatewayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400 font-bold uppercase">Volume</span>
                <span className="text-lg font-black text-white font-mono">100%</span>
              </div>
            </div>

            {/* Gateway Legend with Metrics */}
            <div className="space-y-2 text-xs">
              {gatewayData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0f19] p-2 rounded-xl border border-gray-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono font-bold">{item.value} reqs</span>
                    <span className="text-gray-500 font-mono text-[11px]">({item.share})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Indicator */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Withdrawal Audit Protocol</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Requests above ৳25,000 trigger automated KYC hash match and double PIN verification prior to disbursement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
