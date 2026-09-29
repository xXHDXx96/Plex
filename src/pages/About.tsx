import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Shield, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
        <Link to="/" className="hover:text-gray-900 cursor-pointer">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-gray-900 font-medium">About Us</span>
      </div>

      {/* Hero Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-black tracking-wide">About Us</h1>
          <p className="text-sm text-gray-200 mt-2 max-w-xl mx-auto">
            Empowering global media merchants and reviewers through high-performance order optimization.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Who We Are</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            PLEX Media is an international promotional alliance connecting film studios, streaming services, and digital distributors with global task reviewers. Our automated matching system maximizes engagement while providing verified financial returns to registered partners.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primaryButton text-white flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Global Reach</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Operating across over 45 countries, processing tens of thousands of media review ratings and promotional cycles daily.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primaryButton text-white flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Safe & Compliant</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero-risk capital return protocols ensure complete protection of member funds with encrypted withdrawal pathways.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primaryButton text-white flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">VIP Partnership</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tiered VIP rewards, random mystery multipliers, and escalating commission structures designed for long-term growth.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="w-10 h-10 rounded-lg bg-primaryButton text-white flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Proven Track Record</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Trusted by world-leading entertainment titles, box office champions, and content distributors for accurate audience sentiment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
