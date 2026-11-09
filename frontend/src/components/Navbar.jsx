import React from 'react';
import { 
  Users, 
  UtensilsCrossed, 
  PartyPopper, 
  Sparkles, 
  Package, 
  ChevronDown,
  LogIn,
  LogOut,
  Home
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  isLoggedIn,
  currentUser, 
  allUsers, 
  onSwitchUser, 
  onOpenAuth,
  onLogout,
  cartCount 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => setActiveTab(isLoggedIn ? 'group' : 'welcome')}
            className="flex items-center gap-3 cursor-pointer select-none"
            title={isLoggedIn ? "Go to Party Room" : "Go to Welcome Page"}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <span className="font-black text-xl tracking-tighter">S2</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">SWIGGY</span>
                <span className="text-xs font-black px-1.5 py-0.5 rounded-md bg-orange-500 text-white tracking-widest uppercase">
                  2.0
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 block tracking-tight -mt-0.5">
                Eat Together • Order Together • Celebrate
              </span>
            </div>
          </div>

          {/* Navigation Links - REMOVE WELCOME WHEN LOGGED IN */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {!isLoggedIn && (
              <button
                onClick={() => setActiveTab('welcome')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'welcome' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Welcome</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('group')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'group' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5 text-orange-500" />
              <span>Party Room</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'restaurants' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Menus</span>
            </button>

            <button
              onClick={() => setActiveTab('swot')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'swot' 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
                  : 'text-orange-600 hover:text-orange-700 bg-orange-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Opportunities</span>
            </button>

            <button
              onClick={() => setActiveTab('friends')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'friends' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Friends</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'orders' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2.5">
            {!isLoggedIn ? (
              /* When Logged Out: Show Sign In Button */
              <button
                onClick={onOpenAuth}
                className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Logins</span>
              </button>
            ) : (
              /* When Logged In: Show User Profile + Log Out button (Supabase DB removed) */
              <div className="flex items-center gap-2">
                {/* User Profile Badge & Switcher */}
                <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                  <img 
                    src={currentUser?.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.userId}`} 
                    alt={currentUser?.name} 
                    className="w-8 h-8 rounded-full object-cover border border-orange-200"
                  />
                  <div className="hidden sm:block ml-2 mr-1 text-left">
                    <span className="text-[11px] font-bold text-slate-800 block truncate max-w-[110px]">
                      {currentUser?.name}
                    </span>
                    <span className="text-[10px] text-orange-600 font-mono font-semibold block">
                      {currentUser?.userId}
                    </span>
                  </div>
                  
                  <select
                    value={currentUser?.userId}
                    onChange={(e) => onSwitchUser(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    title="Switch user persona"
                  >
                    {allUsers.map(user => (
                      <option key={user.userId} value={user.userId}>
                        {user.name} ({user.userId})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                </div>

                {/* Log Out Button */}
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-2xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Log Out (Returns to Welcome Page)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden items-center justify-around py-2.5 border-t border-slate-100 text-xs font-bold overflow-x-auto gap-2">
          {!isLoggedIn && (
            <button 
              onClick={() => setActiveTab('welcome')} 
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'welcome' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
            >
              Welcome
            </button>
          )}
          <button 
            onClick={() => setActiveTab('group')} 
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'group' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
          >
            Party Room
          </button>
          <button 
            onClick={() => setActiveTab('restaurants')} 
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'restaurants' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
          >
            Menus
          </button>
          <button 
            onClick={() => setActiveTab('swot')} 
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'swot' ? 'bg-orange-500 text-white' : 'text-orange-600'}`}
          >
            Opportunities
          </button>
          <button 
            onClick={() => setActiveTab('friends')} 
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'friends' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
          >
            Friends
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
          >
            Track
          </button>
        </div>
      </div>
    </header>
  );
}
