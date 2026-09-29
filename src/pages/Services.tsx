import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Headphones, Bot, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: `Hello ${user.name}! Welcome to PLEX Customer Support. How can our online consultant help you today with your task orders or account?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = 'Thank you for contacting PLEX support. A senior consultant has reviewed your query. All transactions and task settlements are safeguarded in real time.';

      if (currentInput.includes('withdraw') || currentInput.includes('cash out')) {
        reply = 'For withdrawals, ensure your Mobile Banking (bKash/Nagad) or Bank Transfer account is bound in "Bind Account", and you have configured your 6-digit withdrawal PIN.';
      } else if (currentInput.includes('recharge') || currentInput.includes('cash in') || currentInput.includes('deposit')) {
        reply = 'You can deposit funds directly through bKash, Nagad, Rocket, or Bank Wire by clicking "Cash In" on your navigation drawer. Balances reflect immediately upon authorization.';
      } else if (currentInput.includes('order') || currentInput.includes('task') || currentInput.includes('snatch')) {
        reply = 'Each round grants 25 movie promotion tasks. Upon completion of each task, your profit share and capital return are immediately unlocked.';
      } else if (currentInput.includes('score')) {
        reply = `Your current Honor Score is ${user.score}/100, which qualifies you for priority task allocation and zero-delay withdrawal processing.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 800);
  };

  return (
    <div className="max-w-[500px] mx-auto bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col shadow-sm">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Online Customer Service</h1>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Agent Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser ? 'bg-primaryButton text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-primaryButton text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block text-[9px] mt-1 ${
                    isUser ? 'text-gray-300 text-right' : 'text-gray-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 sticky bottom-14 z-20"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message to consultant..."
          className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-primaryButton text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer flex-shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
