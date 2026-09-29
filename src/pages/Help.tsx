import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export const Help: React.FC = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>('platform');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const faqs = [
    {
      id: 'platform',
      title: '1. Platform Overview & Mechanism',
      content: [
        '1. PLEX Media facilitates global cross-border promotional tasks, providing a high-speed system mechanism for audience reach and verified ratings.',
        '2. The platform provides customized review and promotional display options, allowing content creators and film distributors to showcase authentic feedback.',
        '3. By incentivizing real reviewer interactions, PLEX helps entertainment studios enhance engagement metrics and audience discovery.',
        '4. All operations are backed by automated cloud matching algorithms ensuring transparent commissions for registered members.',
      ],
    },
    {
      id: 'orders',
      title: '2. Task Snatching & Commission Rules',
      content: [
        '1. Each registered member receives up to 25 daily task snatching slots per trading round.',
        '2. When an order is grabbed, review the media credentials and click "Submit Order" to lock in the commission.',
        '3. Random high-priority tasks (e.g. Smart Falcon, Flipbox 12x, Supreme Order) yield elevated profit multiples.',
        '4. All earned commissions are credited directly to your available balance upon order completion.',
      ],
    },
    {
      id: 'withdrawals',
      title: '3. Cash Out & Withdrawal Guidelines',
      content: [
        '1. Withdrawals are processed 7 days a week directly to your bound Mobile Banking (bKash/Nagad/Rocket) or Bank Transfer account.',
        '2. Members must set an E-Wallet withdrawal password before initiating their first cash out request.',
        '3. Standard withdrawal settlement occurs within 15–45 minutes following security verification.',
        '4. Always double-check your linked account details to prevent payment delays.',
      ],
    },
    {
      id: 'score',
      title: '4. Honor Score System',
      content: [
        '1. Every new account starts with standard credit points. Prompt task completions keep your score at optimal 100/100.',
        '2. Maintaining a score above 80 points guarantees highest VIP commission rates and expedited cashout processing.',
        '3. Incomplete orders or delayed sessions may temporarily deduct credit points.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
        <Link to="/" className="hover:text-gray-900 cursor-pointer">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Help</span>
      </div>

      {/* Hero Banner */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide">
            Help & Support
          </h1>
          <p className="text-sm text-gray-200 mt-2">Comprehensive Platform Guidelines & FAQ</p>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((f) => {
            const isOpen = openSection === f.id;
            return (
              <div key={f.id} className="py-2">
                <button
                  onClick={() => toggleSection(f.id)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-gray-900 hover:text-primaryButton transition-colors cursor-pointer text-base sm:text-lg"
                >
                  <span>{f.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-primaryButton' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-5 pt-1 text-sm text-gray-600 leading-relaxed space-y-2.5 animate-in fade-in duration-150">
                    {f.content.map((c, i) => (
                      <p key={i}>{c}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-gray-900 mb-1">Need Additional Assistance?</h3>
          <p className="text-xs text-gray-600 mb-4">
            Our 24/7 client relations department is available to guide you through any step.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-2.5 bg-primaryButton text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
};
