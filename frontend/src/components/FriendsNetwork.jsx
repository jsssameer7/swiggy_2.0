import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function FriendsNetwork({ 
  currentUser, 
  friends, 
  onAddFriend, 
  onSwitchUser, 
  allUsers 
}) {
  const [newFriendId, setNewFriendId] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!newFriendId.trim()) return;

    const res = onAddFriend(newFriendId.trim());
    if (res.success) {
      setSuccessMsg(res.message);
      setErrorMsg('');
      setNewFriendId('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setErrorMsg(res.message);
      setSuccessMsg('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-2">
            <Users className="w-3.5 h-3.5" />
            Social Graph & Unique Swiggy IDs
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Friends Circle & Food Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Connect using shareable Unique IDs (e.g. <span className="font-mono text-orange-600 font-semibold">@rahul_host</span>). 
            Saved food preferences allow hosts to order everyone's favorites without asking repeatedly!
          </p>
        </div>

        {/* Current User ID Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Your Unique Swiggy ID
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base font-black text-orange-600 font-mono">
              {currentUser?.userId}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Active
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">{currentUser?.name}</span>
        </div>
      </div>

      {/* Add Friend Form */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-200">
        <form onSubmit={handleSendRequest} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <UserPlus className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter unique ID (e.g. @priya_foodie or @kabir_chicken)"
              value={newFriendId}
              onChange={(e) => setNewFriendId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-orange-200 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Connect Friend</span>
          </button>
        </form>

        {successMsg && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-100/70 p-2.5 rounded-xl border border-rose-300">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Connected Friends Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Connected Friends in Trusted Circle ({friends.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map(friend => (
            <div 
              key={friend.userId}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={friend.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${friend.userId}`}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{friend.name}</h3>
                  <span className="text-xs font-mono text-orange-600 block">{friend.userId}</span>
                  <span className="text-[11px] text-slate-400">{friend.phone || "+91 98765 00000"}</span>
                </div>
              </div>

              {/* Saved Food Preferences (Page 4 & 10) */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    Dietary Profile
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    friend.preferences?.dietary === 'Vegetarian' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {friend.preferences?.dietary || "Non-Veg"}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block">Favorite Dishes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {friend.preferences?.favouriteDishes?.map((dish, i) => (
                      <span key={i} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700">
                        {dish}
                      </span>
                    )) || <span className="text-slate-400">None saved</span>}
                  </div>
                </div>

                {friend.preferences?.allergies?.length > 0 && (
                  <div className="pt-1 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-rose-600">
                      Allergies: {friend.preferences.allergies.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onSwitchUser(friend.userId)}
                className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-300 font-bold text-xs transition-colors"
              >
                Switch View to {friend.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
