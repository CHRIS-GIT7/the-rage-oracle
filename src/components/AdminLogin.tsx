import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { Shield, Key, Mail, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState<string>(AGENCY_CONFIG.adminEmail);
  const [password, setPassword] = useState<string>(AGENCY_CONFIG.adminPassword);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === AGENCY_CONFIG.adminEmail && password === AGENCY_CONFIG.adminPassword) {
      onLoginSuccess();
    } else {
      setError('Invalid admin credentials. Please use the pre-configured test user details.');
    }
  };

  const fillDemoCredentials = () => {
    setEmail(AGENCY_CONFIG.adminEmail);
    setPassword(AGENCY_CONFIG.adminPassword);
    setError(null);
  };

  return (
    <div className="min-h-[80vh] bg-[#0A0B0E] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center mx-auto mb-2">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">AGENCY_ADMIN_PORTAL</h2>
          <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">
            INTERNAL EXECUTIVE COMMAND // {AGENCY_CONFIG.name.toUpperCase()}
          </p>
        </div>

        {/* Pre-configured Test User Banner */}
        <div className="bg-[#18181B] p-4 rounded-xl border border-[#27272A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-white uppercase tracking-wider flex items-center gap-1">
              <Key className="w-3 h-3" /> TEST_ADMIN_CREDENTIALS
            </span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[9px] font-extrabold text-black bg-white hover:bg-neutral-200 px-2.5 py-1 rounded-md border border-white uppercase tracking-wider transition-colors"
            >
              AUTO_FILL
            </button>
          </div>
          <div className="text-[11px] space-y-0.5 text-neutral-400">
            <p>USER: <span className="text-white font-bold">{AGENCY_CONFIG.adminEmail}</span></p>
            <p>PASS: <span className="text-white font-bold">{AGENCY_CONFIG.adminPassword}</span></p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-white shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1.5">
              ADMIN_EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white font-sans"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white font-sans"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-extrabold text-xs text-black bg-white hover:bg-neutral-200 transition-all uppercase tracking-wider border border-white"
          >
            ACCESS_DASHBOARD
          </button>
        </form>

        <div className="text-center pt-1 font-sans">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-neutral-400 hover:text-white uppercase font-bold tracking-wider"
          >
            ← BACK_TO_MAIN_APP
          </button>
        </div>
      </div>
    </div>
  );
};
