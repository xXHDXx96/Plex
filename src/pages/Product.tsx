import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Star, Film, Award } from 'lucide-react';

export const Product: React.FC = () => {
  const navigate = useNavigate();
  const { currentProduct, user, submitCurrentOrder, showToast } = useApp();
  const [submitting, setSubmitting] = useState(false);

  if (!currentProduct) {
    return (
      <div className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-500 mb-4 font-medium">No product order found.</p>
        <button
          onClick={() => navigate('/task')}
          className="px-6 py-2.5 bg-primaryButton text-white rounded-lg font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const orderNum = user.completedOrdersCount + 1;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await submitCurrentOrder();
      if (res.success) {
        setTimeout(() => {
          navigate('/task');
        }, 600);
      } else {
        showToast(res.message, 'error');
      }
    } catch {
      showToast('Order processing failed. Please retry.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getOrderBadge = () => {
    if (currentProduct.mysteryboxMethod === '12x') return '(Smart Felcon Order)';
    if (currentProduct.mysteryboxMethod === '3x') return '(Supreme Order)';
    return '(Snatching Order)';
  };

  return (
    <div className="max-w-[500px] mx-auto bg-white min-h-[calc(100vh-64px)] pb-36 shadow-sm">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/task')}
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer p-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900">Product Details</h1>
        </div>
        <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-black rounded-md">
          Order #{orderNum}
        </div>
      </div>

      {/* Movie Poster visual */}
      <div className="w-full h-[320px] bg-neutral-900 overflow-hidden relative flex items-center justify-center">
        <img
          src={currentProduct.poster}
          alt={currentProduct.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentProduct.genre.join(', ')}</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-500/90 text-black font-black px-2.5 py-1 rounded-md">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{currentProduct.rating} PLEX</span>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="text-xl font-black text-gray-900">
              {currentProduct.name} ({currentProduct.year}){' '}
              <span className="text-sm font-medium text-amber-600">{getOrderBadge()}</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded bg-emerald-100 text-emerald-800">
              {currentProduct.status}
            </span>
            {currentProduct.mysteryboxMethod && (
              <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded bg-red-100 text-red-600">
                {currentProduct.mysteryboxMethod === '12x' ? 'Flipbox Multiplier' : 'Smart Falcon'}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Matrix */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Product Price:</span>
            <span className="text-base font-bold text-gray-900">
              ৳{currentProduct.price.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Commission:</span>
            <span className="text-base font-bold text-emerald-600">
              +৳{currentProduct.commission.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
            <span className="text-xs text-gray-700 font-bold uppercase">Total Sale Return:</span>
            <span className="text-2xl font-black text-gray-900">
              ৳{(currentProduct.price + currentProduct.commission).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Description / PLEX Plot & Credits */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primaryButton" />
            Media Synopsis & Verification
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed bg-white border border-gray-100 p-3 rounded-lg">
            {currentProduct.introduction}
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 pt-1">
            <div>
              <span className="font-bold text-gray-700">Director:</span> {currentProduct.director}
            </div>
            <div>
              <span className="font-bold text-gray-700">Box Office:</span> {currentProduct.boxOffice || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 p-3 max-w-[500px] mx-auto z-30 shadow-lg">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`py-3.5 px-4 rounded-lg font-bold text-sm text-center transition-all cursor-pointer ${
              submitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-primaryButton text-white hover:opacity-95 shadow-md active:scale-95'
            }`}
          >
            {submitting ? 'Confirming...' : 'Submit Order'}
          </button>

          <div className="py-2 px-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-medium text-emerald-700">
              Profit Multiplier
            </span>
            <span className="text-base font-black leading-tight text-emerald-900">
              {currentProduct.mysteryboxMethod ? `${currentProduct.mysteryboxMethod} Boost` : '1.5x Base'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
