import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Headphones, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveSupportWidget: React.FC = () => {
  const { user, showToast, supportMessages, sendSupportMessage, supportFaqs } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [supportMessages, isTyping]);

  // Reactive automated customer support bot with keyword triggers
  useEffect(() => {
    if (supportMessages.length === 0) return;
    const lastMsg = supportMessages[supportMessages.length - 1];
    if (lastMsg.sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        const text = lastMsg.text.toLowerCase();
        let replyText = "Thank you for contacting PLEX Media Support. A live financial agent has been notified and will verify your request shortly. Please feel free to select one of the common topics above for instant help.";
        
        // Scan custom automated Q&A rules configured by admin
        for (const faq of supportFaqs) {
          if (faq.keywords.some((keyword) => text.includes(keyword))) {
            replyText = faq.a;
            break;
          }
        }

        sendSupportMessage(replyText, 'agent');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [supportMessages.length]); // listen strictly to message appends

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendSupportMessage(text, 'user');
    setInputText('');
  };

  const handleFaqClick = (faq: { q: string; a: string }) => {
    sendSupportMessage(faq.q, 'user');
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 select-none">
      
      {/* 1. Floating Support Trigger Circle (With active notification ping) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-[#f5c518] to-amber-500 hover:from-amber-400 hover:to-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/20 border-4 border-white cursor-pointer transition-all transform hover:scale-105 active:scale-95 animate-bounce"
          title="Open Live Chat Support"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white text-[8px] font-black text-white items-center justify-center">1</span>
          </span>
          <Headphones className="w-6 h-6 text-black" />
        </button>
      )}

      {/* 2. Chat Box Window Dialog */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] bg-slate-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          
          {/* Header section (Cyberpunk Live Agent Header) */}
          <div className="bg-[#1a2338] px-4 py-3 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 bg-[#f5c518] rounded-full flex items-center justify-center border border-amber-400">
                  <Headphones className="w-5 h-5 text-black" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">PLEX LIVE HELP</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>Support Officer Active</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ / Topics Section */}
          <div className="bg-[#121824] px-3.5 py-2.5 border-b border-neutral-800 text-left">
            <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-[#f5c518]" />
              <span>Click for Instant Assistance:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto no-scrollbar">
              {supportFaqs.map((faq, idx) => (
                <button
                  key={faq.id || idx}
                  onClick={() => handleFaqClick(faq)}
                  className="bg-[#161c24] hover:bg-[#1f2635] text-[10px] text-gray-300 px-2 py-1 rounded-md border border-neutral-800 transition-colors text-left cursor-pointer truncate max-w-[170px]"
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto p-4 space-y-3 bg-[#0c1017] scrollbar-thin text-left">
            {supportMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 mb-0.5 text-[9px] text-gray-500 font-bold uppercase font-mono">
                  <span>{m.sender === 'user' ? user.name : 'Platform Agent'}</span>
                  <span>·</span>
                  <span>{m.time}</span>
                </div>
                
                <div
                  className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed max-w-[85%] font-medium ${
                    m.sender === 'user'
                      ? 'bg-amber-400 text-black rounded-tr-none font-bold'
                      : 'bg-neutral-800 text-gray-100 rounded-tl-none border border-neutral-700/50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-gray-500 font-bold uppercase font-mono mb-0.5">Agent is writing...</span>
                <div className="bg-neutral-800 border border-neutral-700/50 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form message input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-3 bg-[#111622] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask support officer..."
              className="flex-1 bg-[#0c1017] border border-neutral-800 rounded-full px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 placeholder-gray-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
