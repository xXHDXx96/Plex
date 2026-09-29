import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ShieldCheck, X } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useApp();

  const [countryCode, setCountryCode] = useState('+88');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Policy Modal
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || !password) {
      setErrorMsg('Please enter both phone and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const fullPhone = `${countryCode}${phone}`;
      const ok = login(fullPhone, password);
      setLoading(false);
      if (ok) {
        showToast('Login successful! Welcome back.');
        navigate('/');
      } else {
        setErrorMsg('Invalid phone or password');
      }
    }, 600);
  };

  const openPolicy = (title: string, content: string) => {
    setModalContent({ title, content });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between py-6 px-4">
      <div className="max-w-[420px] w-full mx-auto">
        {/* Top PLEX Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <div className="inline-block bg-[#f5c518] text-black font-black text-3xl tracking-tighter px-4 py-1.5 rounded-sm shadow-md select-none">
              PLEX
            </div>
            <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-1">
              Official Media Portal
            </div>
          </Link>
        </div>

        {/* Login Box */}
        <div
          className="bg-white"
          style={{
            border: '1px solid #695f5f4a',
            padding: '25px',
            borderRadius: '10px',
          }}
        >
          <h3
            style={{
              marginBottom: '16px',
              fontWeight: 500,
              textAlign: 'left',
              fontSize: '28px',
              fontFamily: 'sans-serif',
              lineHeight: '36px',
              color: '#111827',
            }}
          >
            Sign In
          </h3>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md text-left">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Country code + Mobile number */}
            <div className="border-b border-gray-300 pb-2 flex items-center gap-2">
              <div className="flex items-center text-sm font-semibold text-gray-700 pr-2 border-r border-gray-300 select-none">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-transparent focus:outline-none text-sm font-bold cursor-pointer text-gray-800"
                >
                  <option value="+88">+88 (BD)</option>
                  <option value="+86">+86 (CN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+60">+60 (MY)</option>
                  <option value="+65">+65 (SG)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+966">+966 (SA)</option>
                </select>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Please Enter Mobile Phone Number"
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="border-b border-gray-300 pb-2 flex items-center justify-between">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please Enter Password"
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#f5c518] hover:bg-[#e2b616] text-black font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
              >
                {loading ? 'Signing in...' : 'Sign in to PLEX'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <Link to="/forgot-password" className="text-gray-500 hover:underline">
                Forgot password?
              </Link>
              <Link to="/signup" className="text-[#2162a1] font-semibold hover:underline">
                Create PLEX account
              </Link>
            </div>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-gray-500 max-w-lg mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#2162a1]">
          <Link to="/help" className="hover:underline">
            Help
          </Link>
          <a href="#" className="hover:underline">
            PLEX Pro
          </a>
          <a href="#" className="hover:underline">
            Box Office Mojo
          </a>
          <a href="#" className="hover:underline">
            License PLEX Data
          </a>
          <button
            onClick={() => openPolicy('Conditions of Use', 'By using PLEX, you agree to comply with our platform policies.')}
            className="hover:underline cursor-pointer"
          >
            Conditions of Use
          </button>
          <button
            onClick={() => openPolicy('Privacy Policy', 'We value your privacy and never sell personally identifiable information.')}
            className="hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 font-medium">
          <span>PLEX, an Amazon company</span>
        </div>
        <p className="text-[11px] text-gray-400">© 1990-2026 by PLEX.com, Inc.</p>
      </footer>

      {/* Policy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200 text-left">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{modalContent.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{modalContent.content}</p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
