/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Drawer } from './components/Drawer';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CashInModal } from './components/CashInModal';
import { AccountDetailsModal } from './components/AccountDetailsModal';
import { LiveSupportWidget } from './components/LiveSupportWidget';

// Pages
import { MovieHome } from './pages/MovieHome';
import { Home } from './pages/Home';
import { Task } from './pages/Task';
import { Product } from './pages/Product';
import { OrderRecord } from './pages/OrderRecord';
import { BindAccount } from './pages/BindAccount';
import { CashOut } from './pages/CashOut';
import { WithdrawPassword } from './pages/WithdrawPassword';
import { ForgotPassword } from './pages/ForgotPassword';
import { CheckIn } from './pages/CheckIn';
import { Score } from './pages/Score';
import { History } from './pages/History';
import { Services } from './pages/Services';
import { Help } from './pages/Help';
import { About } from './pages/About';
import { Event } from './pages/Event';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Admin } from './pages/Admin';

const MainLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cashInOpen, setCashInOpen] = useState(false);
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-300 selection:text-slate-900">
      <Navbar onOpenDrawer={() => setDrawerOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenCashIn={() => setCashInOpen(true)}
        onOpenAccountDetails={() => setAccountDetailsOpen(true)}
      />

      <CashInModal
        open={cashInOpen}
        onClose={() => setCashInOpen(false)}
      />

      <AccountDetailsModal
        open={accountDetailsOpen}
        onClose={() => setAccountDetailsOpen(false)}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* 24/7 Global Cyber Support Chat Widget */}
        <LiveSupportWidget />

        <Routes>
          {/* 1. Full PLEX Movie Portal as the primary experience */}
          <Route path="/" element={<MovieHome />} />
          <Route path="/movie" element={<MovieHome />} />
          <Route path="/plex" element={<MovieHome />} />

          {/* 2. Standalone Independent Backend Management System */}
          <Route path="/admin" element={<Admin />} />

          {/* 3. Authentic PLEX Registration Page */}
          <Route path="/signup" element={<Signup />} />

          {/* 4. PLEX Sign In Page */}
          <Route path="/show-signin" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* 5. Core Platform Task Grabbing and Financial Workflow Pages */}
          <Route element={<MainLayout />}>
            <Route path="/task" element={<Task />} />
            <Route path="/task-hub" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order-record" element={<OrderRecord />} />
            <Route path="/bind-account" element={<BindAccount />} />
            <Route path="/cash-out" element={<CashOut />} />
            <Route path="/withdraw-password" element={<WithdrawPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/score" element={<Score />} />
            <Route path="/history" element={<History />} />
            <Route path="/services" element={<Services />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/event" element={<Event />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
