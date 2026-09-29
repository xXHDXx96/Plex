import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronRight, Star, Search, X } from 'lucide-react';
import { AccountDetailsModal } from '../components/AccountDetailsModal';
import { PackageModal } from '../components/PackageModal';
import { SnatchingModal } from '../components/SnatchingModal';
import { MysteryBoxModal } from '../components/MysteryBoxModal';

export const Task: React.FC = () => {
  const {
    user,
    products,
    selectPackage,
    snatchNextProduct,
    activeMysteryBox,
    clearMysteryBox,
    triggerMysteryBox,
    showToast,
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'collection' | 'description'>('collection');
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [snatchingOpen, setSnatchingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pull to refresh states
  const [pullStartY, setPullStartY] = useState<number | null>(null);
  const [pullOffset, setPullOffset] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPullStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (pullStartY === null || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - pullStartY;
    if (diffY > 0) {
      const newOffset = Math.min(diffY * 0.45, 90);
      setPullOffset(newOffset);
    }
  };

  const handleTouchEnd = async () => {
    if (pullStartY === null || isRefreshing) return;
    setPullStartY(null);
    if (pullOffset >= 50) {
      setIsRefreshing(true);
      setPullOffset(50);
      // Simulate real-time server pull data refresh
      await new Promise((r) => setTimeout(r, 1200));
      setIsRefreshing(false);
      setPullOffset(0);
      showToast('Successfully refreshed available product tasks!', 'success');
    } else {
      setPullOffset(0);
    }
  };

  const filteredProducts = products.filter((product) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    return (
      product.name.toLowerCase().includes(term) ||
      product.productId.toLowerCase().includes(term)
    );
  });

  const handleStartSnatch = async () => {
    if (user.completedOrdersCount >= user.quantityOfOrders) {
      showToast(
        'Your daily task quota (25/25) has been reached. Please contact customer support for next round.',
        'info'
      );
      return;
    }

    if (!user.userSelectedPackage || user.userSelectedPackage === 0) {
      setPackageModalOpen(true);
      return;
    }

    // Check if mystery box trigger (e.g. order 13 or 18)
    if (user.completedOrdersCount === 12 && !activeMysteryBox) {
      triggerMysteryBox('12x', '12x');
      return;
    }

    // Start snatching animation
    await snatchNextProduct();
    setSnatchingOpen(true);
  };

  const handlePackageSelect = async (amount: number) => {
    await selectPackage(amount);
    setPackageModalOpen(false);
    await snatchNextProduct();
    setSnatchingOpen(true);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] pb-48 shadow-sm relative"
    >
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" />
          <span className="text-gray-900 font-medium">Go Shopping</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">PLEX Order</h1>
            <button
              onClick={async () => {
                setIsRefreshing(true);
                setPullOffset(50);
                await new Promise((r) => setTimeout(r, 1200));
                setIsRefreshing(false);
                setPullOffset(0);
                showToast('Successfully refreshed available product tasks!', 'success');
              }}
              className={`p-1.5 text-gray-400 hover:text-gray-800 transition-all cursor-pointer rounded-lg hover:bg-slate-100 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`}
              title="Refresh task list"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 11H18.21" />
              </svg>
            </button>
          </div>
          <div className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold border border-slate-200">
            Package: ৳{user.userSelectedPackage.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('collection')}
          className={`text-center py-3 font-bold text-sm transition-all cursor-pointer relative ${
            activeTab === 'collection'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Ng.Collection
        </button>
        <button
          onClick={() => setActiveTab('description')}
          className={`text-center py-3 font-bold text-sm transition-all cursor-pointer relative ${
            activeTab === 'description'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Description
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'collection' ? (
        <div className="flex flex-col">
          {/* Pull to Refresh Indicator Header */}
          <div
            style={{ height: `${pullOffset}px`, opacity: pullOffset > 0 ? 1 : 0 }}
            className="overflow-hidden transition-all duration-150 flex items-center justify-center bg-slate-50 border-b border-gray-100 text-xs text-slate-500 font-bold gap-2 select-none"
          >
            <div className={`w-4 h-4 rounded-full border-2 border-slate-300 border-t-teal-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>
              {isRefreshing
                ? 'Refreshing PLEX tasks...'
                : pullOffset >= 50
                ? 'Release to refresh'
                : 'Pull down to refresh'}
            </span>
          </div>
          {/* Search Input Section */}
          <div className="px-4 py-3 bg-slate-50 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by name or ID (e.g. plex-mov)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 px-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs sm:text-sm font-medium">
                No matching product tasks found.
              </div>
            ) : (
              filteredProducts.map((product, idx) => (
                <div
                  key={product.productId}
                  onClick={handleStartSnatch}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors text-left"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="text-base font-extrabold text-gray-400 w-5 text-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="w-14 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden border border-gray-200">
                      <img
                        src={product.poster}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
                        {product.name} ({product.year})
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="ml-0.5 font-bold text-gray-800">{product.rating}</span>
                        </div>
                        <span>·</span>
                        <span className="font-mono text-[10px] text-gray-400">{product.productId}</span>
                      </div>

                      {/* Completion Progress Bar */}
                      <div className="mt-2.5 space-y-1 max-w-[240px]">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className={
                            idx < user.completedOrdersCount
                              ? 'text-emerald-600'
                              : idx === user.completedOrdersCount
                              ? 'text-blue-600 animate-pulse'
                              : 'text-gray-400'
                          }>
                            {idx < user.completedOrdersCount
                              ? 'Task Completed'
                              : idx === user.completedOrdersCount
                              ? 'Active Task (In Progress)'
                              : 'Pending Allocation'}
                          </span>
                          <span className="font-mono text-gray-500">
                            {idx < user.completedOrdersCount
                              ? '100%'
                              : idx === user.completedOrdersCount
                              ? '45%'
                              : '0%'}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden border border-gray-200/60">
                          <div
                            style={{
                              width: idx < user.completedOrdersCount
                                ? '100%'
                                : idx === user.completedOrdersCount
                                ? '45%'
                                : '0%'
                            }}
                            className={`h-full transition-all duration-500 rounded-full ${
                              idx < user.completedOrdersCount
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                : idx === user.completedOrdersCount
                                ? 'bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse'
                                : 'bg-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 text-sm text-gray-700 space-y-4 leading-relaxed bg-slate-50/50">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2">Order Allocation Rules</h4>
            <p className="text-xs text-gray-600 leading-normal">
              1. The cloud matching system pairs your registered package with entertainment and media promotions from international content producers.
            </p>
            <p className="text-xs text-gray-600 mt-2 leading-normal">
              2. Each user receives 25 daily snatching opportunities per round. Complete all tasks to claim maximum compound returns.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2">Mystery Rewards & Multipliers</h4>
            <p className="text-xs text-gray-600 leading-normal">
              Users randomly unlock Smart Falcon or 12x Flipbox orders during their snatching session. Complete the assignment to unlock heightened profit shares!
            </p>
          </div>
        </div>
      )}

      {/* Bottom Fixed Action Panel */}
      <div className="fixed bottom-14 left-0 right-0 max-w-[500px] mx-auto bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-30">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={() => setAccountDetailsOpen(true)}
            className="py-3 px-2 cursor-pointer rounded-lg text-white bg-teal hover:opacity-90 font-bold text-xs sm:text-sm text-center transition-colors shadow-sm"
          >
            Account Details
          </button>
          <Link
            to="/order-record"
            className="py-3 px-2 cursor-pointer rounded-lg text-white bg-teal hover:opacity-90 font-bold text-xs sm:text-sm text-center transition-colors shadow-sm"
          >
            Order Record
          </Link>
        </div>

        <button
          onClick={handleStartSnatch}
          className="w-full py-3.5 text-white cursor-pointer bg-primaryButton rounded-lg hover:opacity-95 font-black text-base transition-transform active:scale-[0.99] shadow-md flex items-center justify-center gap-2"
        >
          <span>Start Snatching</span>
          <span className="text-amber-300 font-bold">
            [{user.completedOrdersCount} / {user.quantityOfOrders}]
          </span>
        </button>
      </div>

      {/* Modals */}
      <AccountDetailsModal
        open={accountDetailsOpen}
        onClose={() => setAccountDetailsOpen(false)}
      />

      <PackageModal
        open={packageModalOpen}
        onClose={() => setPackageModalOpen(false)}
        currentPackage={user.userSelectedPackage}
        onSelectPackage={handlePackageSelect}
      />

      <SnatchingModal
        open={snatchingOpen}
        onFinished={() => setSnatchingOpen(false)}
      />

      {activeMysteryBox && (
        <MysteryBoxModal
          open={!!activeMysteryBox}
          onClose={() => {
            clearMysteryBox();
            navigate('/product');
          }}
          mysteryBoxData={activeMysteryBox}
        />
      )}
    </div>
  );
};
