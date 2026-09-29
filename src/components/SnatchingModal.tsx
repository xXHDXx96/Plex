import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onFinished: () => void;
}

export const SnatchingModal: React.FC<Props> = ({ open, onFinished }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onFinished();
      navigate('/product');
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, navigate, onFinished]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-teal to-primaryButton rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <svg className="w-16 h-16" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="16" fill="url(#glow)" className="animate-pulse" />
                <circle
                  cx="60"
                  cy="60"
                  r="36"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="3"
                  strokeDasharray="6 10"
                  className="animate-spin origin-center"
                  style={{ animationDuration: '3s' }}
                />
                <path
                  d="M60 24 A36 36 0 0 1 96 60"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-spin origin-center"
                  style={{ animationDuration: '1s' }}
                />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Snatching Order...</h2>
        <p className="text-sm text-gray-500 mb-4">Matching high-rating media tasks for your package</p>

        <div className="flex justify-center gap-1.5 mt-4">
          <div
            className="w-2.5 h-2.5 bg-primaryButton rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2.5 h-2.5 bg-primaryButton rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2.5 h-2.5 bg-primaryButton rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};
