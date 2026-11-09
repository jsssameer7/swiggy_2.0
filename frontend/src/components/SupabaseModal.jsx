import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Check, 
  Copy, 
  ExternalLink, 
  Server, 
  CheckCircle2, 
  RefreshCw,
  X,
  Code,
  Layers
} from 'lucide-react';
import { SUPABASE_CONFIG } from '../supabaseClient';

const SQL_SCHEMA_SNIPPET = `-- SWIGGY 2.0: POSTGRESQL TABLES FOR SUPABASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  preferences JSONB DEFAULT '{"favourite_dishes": [], "dietary": "Non-Veg", "allergies": []}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  host_user_id VARCHAR(50) NOT NULL,
  host_name VARCHAR(100) NOT NULL,
  restaurant_name VARCHAR(120),
  delivery_address TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'open',
  payment_mode VARCHAR(30) DEFAULT 'host_pays',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.group_carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id VARCHAR(50) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  items JSONB DEFAULT '[]',
  is_confirmed BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_name VARCHAR(120),
  host_user_id VARCHAR(50) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'paid',
  order_status VARCHAR(30) DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

export default function SupabaseModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = () => {
    setLoading(true);
    fetch('/api/db/status')
      .then(res => res.json())
      .then(data => {
        setDbStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard?.writeText(SQL_SCHEMA_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">Supabase Connected</h2>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-400">Live PostgreSQL Database Connected & Synchronized</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>PostgreSQL Connection Active</span>
            </span>
            <button 
              onClick={fetchStatus} 
              disabled={loading}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Ping Now</span>
            </button>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-slate-700">
            <div>
              <span className="text-slate-400">Project URL: </span>
              <span className="font-bold select-all">{SUPABASE_CONFIG.url}</span>
            </div>
            <div>
              <span className="text-slate-400">Publishable Key: </span>
              <span className="font-bold truncate block select-all">{SUPABASE_CONFIG.key}</span>
            </div>
          </div>

          {/* Live Table Records Stats */}
          {dbStatus?.supabaseCounts && (
            <div className="pt-3 border-t border-emerald-200/80 grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold block">USERS</span>
                <span className="text-base font-extrabold text-slate-800">{dbStatus.supabaseCounts.users}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold block">GROUPS</span>
                <span className="text-base font-extrabold text-slate-800">{dbStatus.supabaseCounts.groups}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold block">CARTS</span>
                <span className="text-base font-extrabold text-slate-800">{dbStatus.supabaseCounts.carts}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold block">ORDERS</span>
                <span className="text-base font-extrabold text-slate-800">{dbStatus.supabaseCounts.orders}</span>
              </div>
            </div>
          )}
        </div>

        {/* SQL Runner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-orange-500" />
              <span>Supabase Schema Reference</span>
            </span>
            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied SQL!" : "Copy SQL Script"}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-40 border border-slate-800">
            {SQL_SCHEMA_SNIPPET}
          </pre>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
        >
          Close & Back to App
        </button>
      </div>
    </div>
  );
}
