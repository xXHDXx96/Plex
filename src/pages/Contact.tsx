import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to client services!', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">PLEX Help Center</h1>
          <p className="text-sm sm:text-base text-gray-200">
            Our customer care experts and senior consultants are ready 24/7 to answer your questions and assist with settlements.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-primaryButton text-white flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Customer Hotline</h3>
            <p className="text-xs text-gray-600">+44 20 7946 0912</p>
            <p className="text-[11px] text-gray-400">Mon - Sun (24 Hours)</p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-primaryButton text-white flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Email Support</h3>
            <p className="text-xs text-gray-600">support@plex-media.com</p>
            <p className="text-[11px] text-gray-400">Response within 15 mins</p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-primaryButton text-white flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Headquarters</h3>
            <p className="text-xs text-gray-600">PLEX House, High Street</p>
            <p className="text-[11px] text-gray-400">London, United Kingdom</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primaryButton" />
            Send Us an Instant Inquiry
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Leave your contact details and a consultant will follow up directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Email / Telegram
                </label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email or Telegram username"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Topic: Recharge, Withdrawal, or VIP Tier"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Message Content
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your request..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primaryButton text-white rounded-lg font-bold hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
