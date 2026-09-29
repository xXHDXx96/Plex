import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, OrderRecordItem, TransactionItem, WithdrawalInfo, MysteryBoxData } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

interface AppContextType {
  user: User;
  isLoggedIn: boolean;
  login: (phone: string, pass: string) => boolean;
  signup: (data: { email: string; phone: string; password: string; invitationCode?: string }) => void;
  logout: () => void;
  products: Product[];
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;
  orderRecords: OrderRecordItem[];
  transactions: TransactionItem[];
  selectPackage: (amount: number) => Promise<boolean>;
  snatchNextProduct: () => Promise<Product>;
  submitCurrentOrder: () => Promise<{ success: boolean; message: string }>;
  claimDailyCheckIn: (day: number, amount: number) => Promise<boolean>;
  submitWithdrawal: (amount: number, withdrawPassword: string) => Promise<{ success: boolean; message: string }>;
  rechargeBalance: (amount: number, method: string) => Promise<boolean>;
  submitDepositRequest: (
    amount: number,
    method: string,
    senderNumber: string,
    transactionId: string,
    notes?: string
  ) => Promise<{ success: boolean; message: string }>;
  updateWithdrawalAddress: (info: WithdrawalInfo) => Promise<boolean>;
  setWithdrawPassword: (password: string) => Promise<boolean>;
  changeLoginPassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  triggerMysteryBox: (method: '12x' | '3x' | 'cash', amount: string) => void;
  activeMysteryBox: MysteryBoxData | null;
  clearMysteryBox: () => void;
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;

  // Standalone Admin Management Actions
  adminIsAuthenticated: boolean;
  adminLogin: (username: string, pass: string) => boolean;
  adminLogout: () => void;
  approveWithdrawal: (txId: string) => void;
  rejectWithdrawal: (txId: string, reason?: string) => void;
  approveRecharge: (txId: string) => void;
  rejectRecharge: (txId: string, reason?: string) => void;
  adjustUserBalance: (delta: number, note: string) => void;
  updateUserVIP: (tier: string) => void;
  updateUserScore: (score: number) => void;
  addMovie: (movie: Product) => void;
  updateMovie: (movie: Product) => void;
  deleteMovie: (productId: string) => void;
  setMovieMultiplier: (productId: string, multiplier?: '12x' | '3x' | 'cash') => void;

  // Live Customer Support Panel Management
  supportMessages: Array<{ sender: 'user' | 'agent'; text: string; time: string }>;
  sendSupportMessage: (text: string, sender?: 'user' | 'agent') => void;
  clearSupportMessages: () => void;
  supportFaqs: Array<{ id: string; q: string; a: string; keywords: string[] }>;
  addSupportFaq: (q: string, a: string, keywords: string) => void;
  deleteSupportFaq: (id: string) => void;
}

const DEFAULT_USER: User = {
  userId: 7872843,
  name: 'User_7872843',
  email: 'investor787@gmail.com',
  phoneNumber: '+8801712345678',
  userBalance: 38500.0,
  dailyProfit: 1420.0,
  outOfBalance: 0.0,
  completedOrdersCount: 12,
  quantityOfOrders: 25,
  memberTotalRecharge: 50000.0,
  userType: 'Normal VIP 1',
  trialRoundBalance: 0.0,
  userSelectedPackage: 30000,
  score: 96,
  checkInDays: 4,
  orderCountForCheckIn: 12,
  withdrawalAddressAndMethod: {
    withdrawMethod: 'MobileBanking',
    name: 'User_7872843',
    mobileBankingName: 'bKash',
    mobileBankingAccountNumber: '01712345678',
    mobileUserDistrict: 'Dhaka',
  },
  hasWithdrawPassword: true,
  withdrawPassword: '123456',
  loginPassword: 'password123',
};

const INITIAL_ORDERS: OrderRecordItem[] = [
  {
    id: 'ord-101',
    orderNumber: 12,
    productId: 'plex-mov-001',
    productName: 'Oppenheimer (2023)',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    price: 30000,
    commission: 1200,
    salePrice: 31200,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    multiplier: '12x',
  },
  {
    id: 'ord-102',
    orderNumber: 11,
    productId: 'plex-mov-003',
    productName: 'Interstellar (2014)',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    price: 10500,
    commission: 420,
    salePrice: 10920,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'ord-103',
    orderNumber: 10,
    productId: 'plex-mov-002',
    productName: 'Dune: Part Two (2024)',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    price: 50000,
    commission: 2250,
    salePrice: 52250,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    multiplier: '3x',
  },
];

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-201',
    type: 'checkIn',
    amount: 200,
    status: 'Success',
    method: 'Daily Check-in Day 4',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'tx-202',
    type: 'recharge',
    amount: 50000,
    status: 'Success',
    method: 'bKash Deposit',
    accountNumber: '01712345678',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'tx-203',
    type: 'withdraw',
    amount: 15000,
    status: 'Success',
    method: 'bKash Transfer',
    accountNumber: '01712345678',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('plex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('plex_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [currentProduct, setCurrentProduct] = useState<Product | null>(() => INITIAL_PRODUCTS[0]);

  const [orderRecords, setOrderRecords] = useState<OrderRecordItem[]>(() => {
    const saved = localStorage.getItem('plex_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
    const saved = localStorage.getItem('plex_tx');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [activeMysteryBox, setActiveMysteryBox] = useState<MysteryBoxData | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Live Customer Support Panel States & Persistence
  const [supportMessages, setSupportMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>(() => {
    const saved = localStorage.getItem('plex_support_msgs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        sender: 'agent',
        text: `Hello! Welcome to PLEX 24/7 VIP Customer Support. How can we assist you with your deposit, withdrawal, or media tasks today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [supportFaqs, setSupportFaqs] = useState<Array<{ id: string; q: string; a: string; keywords: string[] }>>(() => {
    const saved = localStorage.getItem('plex_support_faqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      { id: 'faq-1', q: "How to complete Deposit?", a: "To deposit real money, click 'DEPOSIT' on the home dashboard, choose your gateway (bKash/Nagad/Rocket/Bank), perform the transfer, and submit your Transaction ID (TrxID). Our financial audit team will credit your wallet within 5-15 mins.", keywords: ['deposit', 'recharge', 'money', 'cash in', '充值'] },
      { id: 'faq-2', q: "Why is my Withdrawal pending?", a: "Withdrawal requests are processed in under 2 hours. Our auditing team manually verifies the security pin and banking logs. If there are any delays, please ensure your account credentials are bound correctly.", keywords: ['withdraw', 'cash out', 'payout', '提现'] },
      { id: 'faq-3', q: "How to increase daily commission?", a: "You can upgrade your VIP tier by funding your account package. Higher VIP tiers unlock larger review commissions (up to 0.5% - 2.5% per snatched movie review) and additional daily review quotas.", keywords: ['commission', 'rate', 'vip', '佣金', '级别'] },
      { id: 'faq-4', q: "How to recover Honor Score?", a: "If your honor score falls, complete daily check-ins and fulfill all pending review order submissions. Once you maintain a healthy account for 3 consecutive days, your score restores automatically.", keywords: ['honor', 'score', 'credit', '信用分'] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('plex_support_msgs', JSON.stringify(supportMessages));
  }, [supportMessages]);

  useEffect(() => {
    localStorage.setItem('plex_support_faqs', JSON.stringify(supportFaqs));
  }, [supportFaqs]);

  const sendSupportMessage = (text: string, sender: 'user' | 'agent' = 'user') => {
    const newMsg = {
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSupportMessages((prev) => [...prev, newMsg]);
  };

  const clearSupportMessages = () => {
    setSupportMessages([
      {
        sender: 'agent',
        text: `Support session cleared. Hello! Welcome to PLEX 24/7 VIP Customer Support. How can we assist you with your deposit, withdrawal, or media tasks today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const addSupportFaq = (q: string, a: string, keywordsStr: string) => {
    const keywords = keywordsStr.split(',').map((k) => k.trim().toLowerCase()).filter(Boolean);
    const newFaq = {
      id: `faq-${Date.now()}`,
      q,
      a,
      keywords,
    };
    setSupportFaqs((prev) => [...prev, newFaq]);
    showToast('Successfully added new auto Q&A rule!', 'success');
  };

  const deleteSupportFaq = (id: string) => {
    setSupportFaqs((prev) => prev.filter((faq) => faq.id !== id));
    showToast('Auto Q&A rule deleted.', 'info');
  };

  // Standalone Admin State
  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('plex_admin_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('plex_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('plex_orders', JSON.stringify(orderRecords));
  }, [orderRecords]);

  useEffect(() => {
    localStorage.setItem('plex_tx', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('plex_products', JSON.stringify(products));
  }, [products]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const login = (phone: string, pass: string): boolean => {
    if (pass === 'password123' || pass.length >= 6) {
      setIsLoggedIn(true);
      setUser((prev) => ({
        ...prev,
        phoneNumber: phone,
      }));
      showToast('Logged in successfully', 'success');
      return true;
    }
    showToast('Invalid credentials', 'error');
    return false;
  };

  const signup = (data: { email: string; phone: string; password: string; invitationCode?: string }) => {
    const newUid = Math.floor(1000000 + Math.random() * 9000000);
    const newUser: User = {
      ...DEFAULT_USER,
      userId: newUid,
      name: `User_${newUid}`,
      email: data.email,
      phoneNumber: data.phone,
      loginPassword: data.password,
      userBalance: 5000.0,
      dailyProfit: 0.0,
      completedOrdersCount: 0,
      withdrawalAddressAndMethod: null,
      hasWithdrawPassword: false,
      withdrawPassword: '',
    };
    setUser(newUser);
    setIsLoggedIn(true);
    showToast('Account created successfully! Welcome to PLEX.', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Signed out of PLEX', 'info');
  };

  const selectPackage = async (amount: number): Promise<boolean> => {
    setUser((prev) => ({
      ...prev,
      userSelectedPackage: amount,
    }));
    showToast(`Package ৳${amount.toLocaleString()} activated!`, 'success');
    return true;
  };

  const snatchNextProduct = async (): Promise<Product> => {
    const pool = products.filter((p) => p.price <= (user.userSelectedPackage || 30000));
    const selected = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : products[0];

    if (Math.random() > 0.65) {
      const methods: ('12x' | '3x' | 'cash')[] = ['12x', '3x', 'cash'];
      const chosenMethod = methods[Math.floor(Math.random() * methods.length)];
      selected.mysteryboxMethod = chosenMethod;
      selected.isAdminAssigned = true;
    }

    setCurrentProduct(selected);
    return selected;
  };

  const submitCurrentOrder = async (): Promise<{ success: boolean; message: string }> => {
    if (!currentProduct) {
      return { success: false, message: 'No active order found.' };
    }

    if (user.completedOrdersCount >= user.quantityOfOrders) {
      return { success: false, message: 'You have reached maximum daily orders (25/25).' };
    }

    const nextOrderNum = user.completedOrdersCount + 1;
    const earnedCommission = currentProduct.commission;

    const newRecord: OrderRecordItem = {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNum,
      productId: currentProduct.productId,
      productName: `${currentProduct.name} (${currentProduct.year})`,
      poster: currentProduct.poster,
      price: currentProduct.price,
      commission: earnedCommission,
      salePrice: currentProduct.price + earnedCommission,
      status: 'completed',
      createdAt: new Date().toISOString(),
      multiplier: currentProduct.mysteryboxMethod,
    };

    setOrderRecords((prev) => [newRecord, ...prev]);

    setUser((prev) => ({
      ...prev,
      completedOrdersCount: nextOrderNum,
      dailyProfit: Number((prev.dailyProfit + earnedCommission).toFixed(2)),
      userBalance: Number((prev.userBalance + earnedCommission).toFixed(2)),
      orderCountForCheckIn: prev.orderCountForCheckIn + 1,
    }));

    showToast(`Order #${nextOrderNum} confirmed! Profit +৳${earnedCommission.toLocaleString()} added.`, 'success');
    return { success: true, message: 'Order confirmed successfully' };
  };

  const claimDailyCheckIn = async (day: number, amount: number): Promise<boolean> => {
    setUser((prev) => ({
      ...prev,
      checkInDays: Math.min(7, prev.checkInDays + 1),
      userBalance: Number((prev.userBalance + amount).toFixed(2)),
      lastCheckInDate: new Date().toISOString(),
    }));

    setTransactions((prev) => [
      {
        id: `tx-checkin-${Date.now()}`,
        type: 'checkIn',
        amount,
        status: 'Success',
        method: `Daily Check-In Day ${day}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    showToast(`Claimed Day ${day} reward: +৳${amount.toLocaleString()}!`, 'success');
    return true;
  };

  const submitWithdrawal = async (amount: number, withdrawPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!user.withdrawalAddressAndMethod) {
      return { success: false, message: 'Please bind your withdrawal account first.' };
    }
    if (amount <= 0 || isNaN(amount)) {
      return { success: false, message: 'Please enter a valid amount.' };
    }
    if (amount > user.userBalance) {
      return { success: false, message: 'Insufficient balance for this withdrawal.' };
    }
    if (user.hasWithdrawPassword && user.withdrawPassword && user.withdrawPassword !== withdrawPassword) {
      return { success: false, message: 'Incorrect withdrawal password.' };
    }

    setUser((prev) => ({
      ...prev,
      userBalance: Number((prev.userBalance - amount).toFixed(2)),
    }));

    const newTx: TransactionItem = {
      id: `tx-w-${Date.now()}`,
      type: 'withdraw',
      amount,
      status: 'Pending',
      method: user.withdrawalAddressAndMethod?.withdrawMethod === 'BankTransfer' ? 'Bank Transfer' : `${user.withdrawalAddressAndMethod?.mobileBankingName} Transfer`,
      accountNumber: user.withdrawalAddressAndMethod?.bankAccountNumber || user.withdrawalAddressAndMethod?.mobileBankingAccountNumber,
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    showToast(`Withdrawal request for ৳${amount.toLocaleString()} submitted successfully!`, 'success');
    return { success: true, message: 'Withdrawal request created successfully' };
  };

  const submitDepositRequest = async (
    amount: number,
    method: string,
    senderNumber: string,
    transactionId: string,
    notes?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!amount || isNaN(amount) || amount < 500) {
      const msg = 'Minimum deposit amount is ৳500.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    if (amount > 1000000) {
      const msg = 'Deposit amount exceeds single-transaction limit (৳1,000,000).';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    const trimmedSender = (senderNumber || '').trim();
    if (!trimmedSender || trimmedSender.length < 5) {
      const msg = 'Please enter a valid sender account number or wallet address.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    const trimmedTrx = (transactionId || '').trim().toUpperCase();
    if (!trimmedTrx || trimmedTrx.length < 8) {
      const msg = 'Transaction ID (TrxID) must be at least 8 alphanumeric characters.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    if (!/^[A-Z0-9_-]{8,64}$/.test(trimmedTrx)) {
      const msg = 'Invalid Transaction ID format. It cannot contain spaces or special symbols.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    // Check for duplicate TrxID
    const duplicate = transactions.some(
      (t) => t.transactionId && t.transactionId.toUpperCase() === trimmedTrx
    );
    if (duplicate) {
      const msg = 'This Transaction ID (TrxID) has already been submitted and cannot be reused.';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    const newTx: TransactionItem = {
      id: `tx-dep-${Date.now()}`,
      type: 'recharge',
      amount,
      status: 'Pending',
      method: `${method} Deposit`,
      accountNumber: trimmedSender,
      senderNumber: trimmedSender,
      transactionId: trimmedTrx,
      notes: notes || 'Pending payment verification',
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Payment submitted with TrxID: ${trimmedTrx}. Verification in progress!`, 'success');
    return { success: true, message: 'Deposit request submitted successfully' };
  };

  const rechargeBalance = async (amount: number, method: string): Promise<boolean> => {
    setUser((prev) => ({
      ...prev,
      userBalance: Number((prev.userBalance + amount).toFixed(2)),
      memberTotalRecharge: Number((prev.memberTotalRecharge + amount).toFixed(2)),
    }));

    setTransactions((prev) => [
      {
        id: `tx-r-${Date.now()}`,
        type: 'recharge',
        amount,
        status: 'Success',
        method: `${method} Deposit`,
        accountNumber: user.phoneNumber,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    showToast(`Recharge of ৳${amount.toLocaleString()} processed!`, 'success');
    return true;
  };

  const updateWithdrawalAddress = async (info: WithdrawalInfo): Promise<boolean> => {
    setUser((prev) => ({
      ...prev,
      withdrawalAddressAndMethod: info,
    }));
    showToast('Withdrawal account details saved successfully!', 'success');
    return true;
  };

  const setWithdrawPassword = async (password: string): Promise<boolean> => {
    setUser((prev) => ({
      ...prev,
      hasWithdrawPassword: true,
      withdrawPassword: password,
    }));
    showToast('Withdrawal PIN set successfully!', 'success');
    return true;
  };

  const changeLoginPassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (user.loginPassword && user.loginPassword !== oldPass) {
      showToast('Incorrect current password.', 'error');
      return { success: false, message: 'Incorrect current password' };
    }
    setUser((prev) => ({
      ...prev,
      loginPassword: newPass,
    }));
    showToast('Password changed successfully!', 'success');
    return { success: true, message: 'Password changed successfully' };
  };

  const triggerMysteryBox = (method: '12x' | '3x' | 'cash', amount: string) => {
    setActiveMysteryBox({
      method,
      amount,
      productId: currentProduct?.productId || 'plex-mov-001',
    });
  };

  const clearMysteryBox = () => {
    setActiveMysteryBox(null);
  };

  // --- STANDALONE ADMIN MANAGEMENT METHODS ---
  const adminLogin = (username: string, pass: string): boolean => {
    if ((username === 'admin' || username === 'admin@plex.com') && (pass === 'admin888' || pass === 'plex2026')) {
      setAdminIsAuthenticated(true);
      localStorage.setItem('plex_admin_auth', 'true');
      showToast('Admin authenticated successfully. Welcome to PLEX Management Console.', 'success');
      return true;
    }
    showToast('Invalid admin credentials. Use admin / admin888', 'error');
    return false;
  };

  const adminLogout = () => {
    setAdminIsAuthenticated(false);
    localStorage.removeItem('plex_admin_auth');
    showToast('Admin logged out successfully', 'info');
  };

  const approveWithdrawal = (txId: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === txId ? { ...tx, status: 'Success' } : tx))
    );
    showToast(`Withdrawal ${txId} approved! Funds disbursed.`, 'success');
  };

  const rejectWithdrawal = (txId: string, reason?: string) => {
    const tx = transactions.find((t) => t.id === txId);
    if (tx && tx.status === 'Pending') {
      // Refund balance
      setUser((prev) => ({
        ...prev,
        userBalance: Number((prev.userBalance + tx.amount).toFixed(2)),
      }));
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'Rejected' } : t))
    );
    showToast(`Withdrawal ${txId} rejected. ${reason ? `Reason: ${reason}. ` : ''}Balance refunded.`, 'info');
  };

  const approveRecharge = (txId: string) => {
    let rechargeAmount = 0;
    setTransactions((prev) => {
      const target = prev.find((t) => t.id === txId);
      if (target && target.status === 'Pending') {
        rechargeAmount = target.amount;
      }
      return prev.map((tx) => (tx.id === txId ? { ...tx, status: 'Success' } : tx));
    });

    if (rechargeAmount > 0) {
      setUser((prev) => ({
        ...prev,
        userBalance: Number((prev.userBalance + rechargeAmount).toFixed(2)),
        memberTotalRecharge: Number((prev.memberTotalRecharge + rechargeAmount).toFixed(2)),
      }));
    }
    showToast(`Deposit ${txId} confirmed and approved.`, 'success');
  };

  const rejectRecharge = (txId: string, reason?: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'Rejected' } : t))
    );
    showToast(`Deposit ${txId} rejected. ${reason ? `Reason: ${reason}` : ''}`, 'info');
  };

  const adjustUserBalance = (delta: number, note: string) => {
    setUser((prev) => ({
      ...prev,
      userBalance: Math.max(0, Number((prev.userBalance + delta).toFixed(2))),
    }));
    setTransactions((prev) => [
      {
        id: `tx-adj-${Date.now()}`,
        type: delta >= 0 ? 'recharge' : 'withdraw',
        amount: Math.abs(delta),
        status: 'Success',
        method: `Admin Adjustment: ${note}`,
        accountNumber: user.phoneNumber,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    showToast(`Adjusted user balance by ৳${delta >= 0 ? '+' : ''}${delta.toLocaleString()}.`, 'success');
  };

  const updateUserVIP = (tier: string) => {
    setUser((prev) => ({ ...prev, userType: tier }));
    showToast(`Updated user tier to ${tier}.`, 'success');
  };

  const updateUserScore = (score: number) => {
    setUser((prev) => ({ ...prev, score }));
    showToast(`Updated user honor score to ${score}/100.`, 'success');
  };

  const addMovie = (movie: Product) => {
    setProducts((prev) => [movie, ...prev]);
    showToast(`Added movie "${movie.name}" to PLEX catalogue.`, 'success');
  };

  const updateMovie = (movie: Product) => {
    setProducts((prev) => prev.map((p) => (p.productId === movie.productId ? movie : p)));
    showToast(`Updated movie "${movie.name}".`, 'success');
  };

  const deleteMovie = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
    showToast('Movie deleted from catalogue.', 'info');
  };

  const setMovieMultiplier = (productId: string, multiplier?: '12x' | '3x' | 'cash') => {
    setProducts((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, mysteryboxMethod: multiplier } : p))
    );
    showToast(`Updated multiplier for movie ${productId} to ${multiplier || 'None'}.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        products,
        currentProduct,
        setCurrentProduct,
        orderRecords,
        transactions,
        selectPackage,
        snatchNextProduct,
        submitCurrentOrder,
        claimDailyCheckIn,
        submitWithdrawal,
        submitDepositRequest,
        rechargeBalance,
        updateWithdrawalAddress,
        setWithdrawPassword,
        changeLoginPassword,
        triggerMysteryBox,
        activeMysteryBox,
        clearMysteryBox,
        toastMessage,
        showToast,

        // Standalone Admin Management Methods
        adminIsAuthenticated,
        adminLogin,
        adminLogout,
        approveWithdrawal,
        rejectWithdrawal,
        approveRecharge,
        rejectRecharge,
        adjustUserBalance,
        updateUserVIP,
        updateUserScore,
        addMovie,
        updateMovie,
        deleteMovie,
        setMovieMultiplier,

        // Customer Support management
        supportMessages,
        sendSupportMessage,
        clearSupportMessages,
        supportFaqs,
        addSupportFaq,
        deleteSupportFaq,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
