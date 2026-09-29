import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, Smartphone, CheckCircle, AlertCircle, Copy, Info } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CashInModal: React.FC<Props> = ({ open, onClose }) => {
  const { submitDepositRequest, showToast } = useApp();
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank'>('bKash');
  const [amount, setAmount] = useState<string>('10500');
  const [senderNumber, setSenderNumber] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const quickAmounts = [5000, 10500, 30000, 50000, 100000, 200000];

  // Official Deposit Credentials
  const depositAddresses = {
    bKash: {
      type: 'Personal Wallet',
      number: '+8801700112233',
      instructions: 'Please use "Send Money" or "Cash Out" from your bKash App to our wallet number below. Minimum amount is ৳500.',
    },
    Nagad: {
      type: 'Personal Wallet',
      number: '+8801700112244',
      instructions: 'Please use the Nagad App to perform a "Send Money" to our official wallet below. Minimum amount is ৳500.',
    },
    Rocket: {
      type: 'Personal Wallet',
      number: '+8801700112255',
      instructions: 'Please use your Rocket App to transfer funds to our official wallet number below. Minimum amount is ৳500.',
    },
    Bank: {
      type: 'Dhaka Bank PLC Account',
      number: '203-102-9384756',
      instructions: 'Bank: Dhaka Bank PLC, Account Name: PLEX Media Solutions, Branch: Gulshan, Dhaka. Please perform a fast wire transfer.',
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val < 500) {
      showToast('Minimum deposit is ৳500.', 'error');
      return;
    }
    if (!senderNumber.trim()) {
      showToast('Please enter your sender account number.', 'error');
      return;
    }
    if (!transactionId.trim()) {
      showToast('Please enter the Transaction ID (TrxID) for verification.', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1200)); // Simulating API call latency
    
    const result = await submitDepositRequest(
      val,
      method,
      senderNumber,
      transactionId,
      notes || `Deposit via ${method} from account ${senderNumber}`
    );

    setIsLoading(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  const currentAddress = depositAddresses[method];

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-600 animate-bounce" />
          </div>
          <h2 className="text-xl font-black text-gray-900">Recharge Request Submitted</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your deposit request of <span className="font-bold text-emerald-600">৳{parseFloat(amount).toLocaleString()}</span> has been submitted to the platform. 
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-mono border border-slate-100 space-y-2.5">
            <div><span className="text-gray-400 font-sans">Payment Method:</span> <span className="font-bold text-slate-800">{method}</span></div>
            <div><span className="text-gray-400 font-sans">Sender Account:</span> <span className="font-bold text-slate-800">{senderNumber}</span></div>
            <div><span className="text-gray-400 font-sans">Transaction ID:</span> <span className="font-bold text-slate-800 text-teal-600 uppercase">{transactionId}</span></div>
            <div><span className="text-gray-400 font-sans">Verification Status:</span> <span className="text-amber-600 font-sans font-bold">Awaiting Manual Audit</span></div>
          </div>
          <p className="text-xs text-amber-600 font-medium leading-relaxed bg-amber-50 p-3 rounded-lg flex gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>PLEX operators are verifying your real money transfer on bKash/Nagad/Bank networks. It will credit automatically upon success (typically 5 to 15 minutes).</span>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setAmount('10500');
              setSenderNumber('');
              setTransactionId('');
              setNotes('');
              onClose();
            }}
            className="w-full py-3 bg-primaryButton text-white rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            I Understand, Return to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-teal/15">
          <div>
            <h2 className="text-lg font-black text-gray-900">Recharge / Cash In</h2>
            <p className="text-xs text-gray-500 font-medium">Safe manual confirmation & fast audit queue</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleRecharge} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* 1. Gateway */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Payment Gateway
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'bKash', name: 'bKash', desc: 'Instant Wallet', icon: Smartphone },
                { id: 'Nagad', name: 'Nagad', desc: 'Digital Service', icon: Smartphone },
                { id: 'Rocket', name: 'Rocket', desc: 'DBBL Banking', icon: Smartphone },
                { id: 'Bank', name: 'Bank Wire', desc: 'Fast Transfer', icon: CreditCard },
              ].map((m) => {
                const isSelected = method === m.id;
                const Icon = m.icon;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primaryButton bg-primaryButton/5 ring-1 ring-primaryButton'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-primaryButton' : 'text-gray-400'}`} />
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{m.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Official Address Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Official Deposit Account</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold font-mono uppercase">{currentAddress.type}</span>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              {currentAddress.instructions}
            </p>

            <div className="flex items-center justify-between bg-white border border-gray-200 px-3 py-2 rounded-lg">
              <span className="text-sm font-black text-slate-900 select-all font-mono">{currentAddress.number}</span>
              <button
                type="button"
                onClick={() => handleCopy(currentAddress.number)}
                className="text-xs text-primaryButton font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* 3. Quick Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select Quick Amount (BDT ৳)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setAmount(q.toString())}
                  className={`py-2 px-1 text-center rounded-md text-xs font-bold transition-all cursor-pointer ${
                    amount === q.toString()
                      ? 'bg-primaryButton text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ৳{q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Custom Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Custom Deposit Amount (৳)
            </label>
            <input
              type="number"
              min="500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryButton/30"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* 5. Sender Wallet Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Sender Mobile No. / Bank Account No.
            </label>
            <input
              type="text"
              value={senderNumber}
              onChange={(e) => setSenderNumber(e.target.value)}
              placeholder="e.g. 017XXXXXXXX or Account No."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryButton/30"
              required
            />
          </div>

          {/* 6. Transaction ID */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>Transaction ID (TrxID)</span>
              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-semibold font-sans normal-case">Required for Verification</span>
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. BK8910293 or Reference No."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryButton/30 uppercase font-mono tracking-wider"
              required
            />
          </div>

          {/* 7. Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Transaction Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional transfer remarks"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primaryButton/30"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !amount || parseFloat(amount) < 500 || !senderNumber || !transactionId}
              className="w-full py-3.5 bg-primaryButton text-white rounded-lg font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isLoading ? 'Submitting Deposit Request...' : `Submit ৳${Number(amount || 0).toLocaleString()} Deposit`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
