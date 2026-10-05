import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'The email or password is incorrect.');
      }
      onLoginSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

        {error && (
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-white shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1.5">
              ADMIN EMAIL
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
            {isSubmitting ? 'SIGNING IN…' : 'SIGN IN'}
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
