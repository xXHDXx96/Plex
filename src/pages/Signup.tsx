import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, RotateCw } from 'lucide-react';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+88');
  const [phone, setPhone] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [currentCaptcha, setCurrentCaptcha] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Generate random graphic verification code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCurrentCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please Enter Gmail Address');
      return;
    }

    if (!email.toLowerCase().endsWith('@gmail.com') && !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address (e.g. name@gmail.com)');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Please Enter Mobile Phone Number');
      return;
    }

    if (captchaInput.trim().toUpperCase() !== currentCaptcha.toUpperCase()) {
      setErrorMsg('Graphic verification code does not match');
      generateCaptcha();
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please Enter Password');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Please Confirm Your Password (passwords do not match)');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup({
        email,
        phone: `${countryCode}${phone}`,
        password,
        invitationCode,
      });
      setLoading(false);
      showToast('Registration successful! Welcome to PLEX.');
      navigate('/');
    }, 600);
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

        {/* Form Container */}
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
            Create account
          </h3>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md text-left">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-left">
            {/* 1. Gmail field */}
            <div className="border-b border-gray-300 pb-2 flex items-center justify-between">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Please Enter Gmail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                required
              />
            </div>

            {/* 2. Country code + Phone Number */}
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
                name="phone"
                id="phone"
                placeholder="Please Enter Mobile Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                required
              />
            </div>

            {/* 3. Graphic Captcha Verification Code */}
            <div className="border-b border-gray-300 pb-2 flex items-center justify-between gap-2">
              <input
                type="text"
                name="captchaCode"
                id="captchaCode"
                placeholder="Please Enter Graphic Verification Code"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none uppercase bg-transparent"
                required
              />

              {/* Graphic Captcha Canvas container */}
              <div className="flex items-center gap-1">
                <div
                  onClick={generateCaptcha}
                  className="captcha-container cursor-pointer select-none flex-shrink-0"
                  style={{
                    width: '73px',
                    height: '40px',
                    background: '#f0f0f0',
                    border: '1.5px solid #ccc',
                    position: 'relative',
                    fontFamily: "'Courier New', Courier, monospace",
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                  }}
                  title="Click to refresh captcha"
                >
                  <span
                    className="captcha-text"
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                      color: '#222',
                      textTransform: 'uppercase',
                      transform: 'rotate(-5deg)',
                      zIndex: 2,
                    }}
                  >
                    {currentCaptcha}
                  </span>
                  <div
                    className="captcha-line"
                    style={{
                      position: 'absolute',
                      height: '1.5px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      width: '100%',
                      top: '12px',
                      left: 0,
                      transform: 'rotate(15deg)',
                    }}
                  />
                  <div
                    className="captcha-line"
                    style={{
                      position: 'absolute',
                      height: '1.5px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      width: '100%',
                      top: '26px',
                      left: 0,
                      transform: 'rotate(-10deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '50%',
                      width: '3px',
                      height: '3px',
                      top: '8px',
                      left: '12px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '50%',
                      width: '3px',
                      height: '3px',
                      top: '22px',
                      left: '35px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '50%',
                      width: '3px',
                      height: '3px',
                      top: '14px',
                      left: '52px',
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title="Refresh Captcha"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Password */}
            <div className="border-b border-gray-300 pb-2 flex items-center justify-between">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Please Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* 5. Confirm Password */}
            <div className="border-b border-gray-300 pb-2 flex items-center justify-between">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Please Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* 6. Invitation Code */}
            <div className="border-b border-gray-300 pb-2 flex items-center">
              <input
                type="text"
                name="invitationCode"
                id="invitationCode"
                placeholder="Invitation Code (Optional)"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#f5c518] hover:bg-[#e2b616] text-black font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
              >
                {loading ? 'Creating account...' : 'Create your PLEX account'}
              </button>
            </div>
          </form>

          {/* Already have an account? Login */}
          <div className="mt-5 text-left text-xs text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2162a1] hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
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
          <a href="#" className="hover:underline">
            Conditions of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 font-medium">
          <span>PLEX, an Amazon company</span>
        </div>
        <p className="text-[11px] text-gray-400">© 1990-2026 by PLEX.com, Inc.</p>
      </footer>
    </div>
  );
};
