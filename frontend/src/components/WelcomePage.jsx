import React from 'react';
import { 
  Users, 
  Sparkles, 
  PartyPopper, 
  ShieldCheck, 
  Clock, 
  Percent, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  ChefHat, 
  Smartphone, 
  HeartHandshake,
  TrendingUp,
  Database
} from 'lucide-react';

export default function WelcomePage({ 
  onOpenAuth, 
  onEnterApp, 
  onExploreSwot,
  currentUser 
}) {
  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 py-8 sm:py-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white p-8 sm:p-14 overflow-hidden border border-orange-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Gen Social Food Ordering Concept</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Eat Together. <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Order Together.
              </span> <br />
              Celebrate Together.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Traditional food delivery is built for solitary diners. <strong className="text-white">Swiggy 2.0</strong> is the world's first multiplayer food ordering platform where friends connect via unique IDs, choose individual dishes in a shared group cart, and coordinate seamless delivery to one shared location.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterApp}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Enter Birthday Party Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAuth}
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4 text-orange-400" />
                <span>Sign In / Verify Number</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15% Group Volume Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One Host Pays or Split-Shield</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Supabase Live Cloud DB</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Login Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/40 space-y-5 backdrop-blur-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                    S2
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm text-slate-900">Instant Access Portal</h2>
                    <p className="text-[11px] text-slate-400">Join 500+ active food circles</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  Live Online
                </span>
              </div>

              {/* Social Login Direct Buttons */}
              <div className="space-y-2.5">
                {/* Google Button */}
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-3 text-xs font-bold text-slate-700 shadow-sm transition-all bg-white"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Facebook Button */}
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-3 text-xs font-bold text-slate-700 shadow-sm transition-all bg-white"
                >
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Continue with Facebook</span>
                </button>

                {/* Mobile Number OTP Button */}
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2.5 text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Login with Mobile Number (OTP)</span>
                </button>
              </div>

              {/* Logged in Persona snippet */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={currentUser?.name}
                    className="w-7 h-7 rounded-full object-cover border border-orange-200"
                  />
                  <div className="truncate">
                    <span className="font-bold text-slate-800 block truncate">{currentUser?.name}</span>
                    <span className="font-mono text-[10px] text-orange-600 font-semibold">{currentUser?.userId}</span>
                  </div>
                </div>

                <button
                  onClick={onEnterApp}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800 transition-colors shrink-0"
                >
                  Open App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM VS THE SWIGGY 2.0 SOLUTION */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Why We Re-Engineered Food Delivery
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            The Traditional Nightmare vs Swiggy 2.0
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Organizing food for birthdays, office lunches, or dorm parties has always been painful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Traditional Nightmare */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-800 text-xs">✕</span>
              <span>Traditional Solo Apps (The Nightmare)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>One person collects everyone's orders manually over chaotic WhatsApp messages.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Awkward money coordination, unpaid splits, and chasing friends for UPI refunds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Dietary preferences & allergies (peanut, vegan, jain) get missed or forgotten.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Multiple delivery fees, cold food arriving in separate bags at different hours.</span>
              </li>
            </ul>
          </div>

          {/* The Swiggy 2.0 Experience */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900 text-xs">✓</span>
              <span>Swiggy 2.0 (Multiplayer Synergy)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Party Passcodes:</strong> Host creates room (e.g. `BDAY26`), friends join instantly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Independent Carts:</strong> Each member adds and customizes their own dishes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Instant 15% Group Discount:</strong> High basket volume triggers auto kitchen discounts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Synchronized Single Drop:</strong> 1 validated delivery location ensures hot food.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 4-STEP WORKFLOW (PAGE 6 BLUEPRINT) */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Document Page 6 Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How Group Ordering Works in 4 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
              01
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Create Event Group</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Host picks a restaurant, sets cart countdown deadline, and gets a 6-digit party invite code.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
              02
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Friends Connect & Join</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Friends join via Unique Swiggy IDs (`@user_id`) or shareable link with zero friction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
              03
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Build Individual Carts</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Each member selects food independently. AI Stock Guard prevents out-of-stock stalls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
              04
            </span>
            <h3 className="font-bold text-slate-900 text-sm">One Pay & Group Drop</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Host treats or initiates Split-Shield. Order dispatches together to single drop point!
            </p>
          </div>
        </div>
      </section>

      {/* 4. SWOT THREATS TO OPPORTUNITIES CALLOUT */}
      <section className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-100 px-3 py-1 rounded-full bg-black/10 inline-block">
            Document Page 7 Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            7 Threats Converted into 7 Product Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
            From smart UPI escrow vaults and AI stock auto-substitution to ghost privacy pins, explore our complete transformation matrix.
          </p>
        </div>

        <button
          onClick={onExploreSwot}
          className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white hover:bg-black font-extrabold text-xs shadow-xl transition-all shrink-0 flex items-center gap-2"
        >
          <span>Explore SWOT Transformation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 5. DATABASE ARCHITECTURE CALLOUT */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Connected with Supabase Cloud</h3>
            <p className="text-xs text-slate-500">
              Live PostgreSQL tables for users, groups, group carts, and consolidated orders.
            </p>
          </div>
        </div>

        <button
          onClick={onEnterApp}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow transition-all shrink-0"
        >
          Start Group Order Now
        </button>
      </section>
    </div>
  );
}
