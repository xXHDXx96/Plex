import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';

export const OrderRecord: React.FC = () => {
  const { orderRecords } = useApp();
  const [activeTab, setActiveTab] = useState<'completed' | 'uncompleted'>('completed');

  const filteredOrders = orderRecords.filter((o) => o.status === activeTab);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-[500px] mx-auto bg-gray-50 min-h-[calc(100vh-64px)] pb-20 shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center gap-3">
        <Link to="/task" className="text-gray-600 hover:text-gray-900 transition-colors p-1">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-gray-900">Order Record</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200 sticky top-28 z-10">
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3.5 text-center font-bold text-sm transition-all relative cursor-pointer ${
            activeTab === 'completed'
              ? 'text-primaryButton border-b-2 border-primaryButton'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed ({orderRecords.filter((o) => o.status === 'completed').length})
        </button>
        <button
          onClick={() => setActiveTab('uncompleted')}
          className={`flex-1 py-3.5 text-center font-bold text-sm transition-all relative cursor-pointer ${
            activeTab === 'uncompleted'
              ? 'text-primaryButton border-b-2 border-primaryButton'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Uncompleted ({orderRecords.filter((o) => o.status === 'uncompleted').length})
        </button>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-6">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-sm">No orders found in this status.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-black text-gray-900">
                  Order #{order.orderNumber}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {formatDate(order.createdAt)}
                </span>
              </div>

              <div className="flex gap-3">
                <div className="w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                  <img
                    src={order.poster}
                    alt={order.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {order.productName}
                  </h3>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Order Price:</span>
                      <span className="font-semibold text-gray-900">
                        ৳{order.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commission:</span>
                      <span className="font-bold text-emerald-600">
                        +৳{order.commission.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs border border-slate-100">
                <span className="text-gray-600 font-semibold">Total Settled:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">
                    ৳{order.salePrice.toLocaleString()}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Success
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
