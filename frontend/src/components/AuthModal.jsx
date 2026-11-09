import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  User, 
  PhoneCall, 
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, demoUsers }) {
  const [authMode, setAuthMode] = useState('phone'); // 'phone' | 'email' | 'demo'
  const [phoneStep, setPhoneStep] = useState('input'); // 'input' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [swiggyId, setSwiggyId] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  if (!isOpen) return null;

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Direct Supabase OAuth call or graceful demo sign-in
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      if (error) {
        // Fallback for local demo simulation
        completeMockLogin({
          name: 'Google User',
          email: 'user.google@gmail.com',
          userId: '@google_swiggy',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          provider: 'Google'
        });
      }
    } catch (err) {
      completeMockLogin({
        name: 'Google User',
        email: 'user.google@gmail.com',
        userId: '@google_swiggy',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        provider: 'Google'
      });
    }
  };

  // Handle Facebook Login
  const handleFacebookLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      completeMockLogin({
        name: 'Facebook User',
        email: 'user.fb@facebook.com',
        userId: '@fb_swiggy',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        provider: 'Facebook'
      });
    }, 600);
  };

  // Handle Phone Number Submit
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPhoneStep('otp');
      setResendTimer(30);
    }, 500);
  };

  // Handle OTP Digit Input
  const handleOtpChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      setErrorMsg('Please enter the 4-digit verification code');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const existing = demoUsers?.find(u => u.phone?.includes(cleanPhone));
      if (existing) {
        completeMockLogin(existing);
      } else {
        completeMockLogin({
          id: `usr_${Date.now()}`,
          name: `User ${cleanPhone.slice(-4)}`,
          email: `${cleanPhone}@swiggy2.phone`,
          userId: `@phone_${cleanPhone.slice(-4)}`,
          phone: `+91 ${cleanPhone}`,
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanPhone}`,
          preferences: { favouriteDishes: ["Biryani"], dietary: "Non-Veg", allergies: [] }
        });
      }
    }, 700);
  };

  // Email / Swiggy ID Login or Register
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email or Swiggy ID');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const cleanId = (swiggyId || email.split('@')[0]);
      const user = {
        id: `usr_${Date.now()}`,
        name: name || cleanId.toUpperCase(),
        email: email.includes('@') ? email : `${cleanId}@swiggy2.com`,
        userId: cleanId.startsWith('@') ? cleanId : `@${cleanId}`,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanId}`,
        preferences: { favouriteDishes: ["Paneer Pizza", "Chicken Biryani"], dietary: "Non-Veg", allergies: [] }
      };
      completeMockLogin(user);
    }, 600);
  };

  const completeMockLogin = (user) => {
    setLoading(false);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Background decorative orange glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-orange-500/10 blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-500/30">
            <span className="font-black text-xl tracking-tight">S2</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            Welcome to Swiggy 2.0
          </h2>
          <p className="text-xs text-slate-500">
            Social Food Ordering & Group Delivery Platform
          </p>
        </div>

        {/* Tabs for Login Modes */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 text-xs font-bold text-slate-600">
          <button
            onClick={() => { setAuthMode('phone'); setErrorMsg(''); setPhoneStep('input'); }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'phone' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>
          <button
            onClick={() => { setAuthMode('email'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'email' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email / ID</span>
          </button>
          <button
            onClick={() => { setAuthMode('demo'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'demo' ? 'bg-orange-500 text-white shadow-sm' : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demo Users</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        {/* 1. Phone OTP Mode */}
        {authMode === 'phone' && (
          <div>
            {phoneStep === 'input' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                    Enter Mobile Number
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 bg-white">
                    <span className="bg-slate-50 px-3.5 py-3 text-xs font-bold text-slate-600 border-r border-slate-200 flex items-center gap-1">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={10}
                      className="flex-1 px-3.5 py-3 text-sm font-semibold text-slate-800 focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    We'll send a 4-digit verification code to verify your phone number.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <span>{loading ? "Sending OTP..." : "Get Verification Code"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-xs text-slate-500 block">
                    Enter the 4-digit code sent to <strong className="text-slate-800">+91 {phoneNumber}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhoneStep('input')}
                    className="text-[11px] font-bold text-orange-600 hover:underline"
                  >
                    Change Number
                  </button>
                </div>

                {/* 4 Digit Input Fields */}
                <div className="flex justify-center gap-3 my-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-black rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none bg-slate-50 text-slate-900"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={() => setResendTimer(30)}
                    className="font-bold text-orange-600 disabled:text-slate-400"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. Email / Unique Swiggy ID Mode */}
        {authMode === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {isRegister && (
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-orange-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            {isRegister && (
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Choose Unique Swiggy ID
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-orange-500">@</span>
                  <input
                    type="text"
                    placeholder="my_handle"
                    value={swiggyId.replace('@', '')}
                    onChange={(e) => setSwiggyId(`@${e.target.value.replace('@', '')}`)}
                    className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="swiggy2password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>{loading ? "Signing in..." : isRegister ? "Create Account & Swiggy ID" : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                {isRegister ? "Already have an account? Sign In" : "New to Swiggy 2.0? Create an Account"}
              </button>
            </div>
          </form>
        )}

        {/* 3. Demo Switcher Profiles */}
        {authMode === 'demo' && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
              Select Demo Persona (Page 5 Blueprint)
            </span>
            {demoUsers?.map(user => (
              <button
                key={user.userId}
                type="button"
                onClick={() => completeMockLogin(user)}
                className="w-full p-2.5 rounded-2xl border border-slate-200 hover:border-orange-500 bg-slate-50/50 hover:bg-orange-50/40 transition-all flex items-center gap-3 text-left"
              >
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.userId}`}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-orange-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800 text-xs truncate">{user.name}</span>
                    {user.userId === '@rahul_host' && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        Host
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-orange-600">{user.userId}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Divider & Social Logins: Google & Facebook */}
        <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
          <div className="relative text-center">
            <span className="bg-white px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="py-2.5 px-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Facebook Login Button */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="py-2.5 px-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-slate-400">
            By signing in, you agree to Swiggy 2.0 Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
