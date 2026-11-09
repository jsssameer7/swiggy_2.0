import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Clock, 
  MapPin, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  ChefHat, 
  PartyPopper,
  AlertCircle,
  Eye,
  EyeOff,
  Percent
} from 'lucide-react';

export default function BirthdayPartyRoom({ 
  group, 
  currentUser, 
  onUpdateCart, 
  onCheckoutSuccess, 
  onAddMoreFood,
  onSwitchUser 
}) {
  const [isLocked, setIsLocked] = useState(group?.status === 'locked');
  const [paymentMode, setPaymentMode] = useState('host_pays'); // 'host_pays' | 'split_itemized'
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [expandedUser, setExpandedUser] = useState(currentUser?.userId);
  const [showAiSubstituteModal, setShowAiSubstituteModal] = useState(false);
  const [substitutionSuccess, setSubstitutionSuccess] = useState(false);

  const isHost = currentUser?.userId === group?.hostUserId;

  // Calculate pricing breakdown
  let subtotal = 0;
  let totalItemsCount = 0;
  const cartsList = Object.values(group?.carts || {});

  cartsList.forEach(cart => {
    cart.items?.forEach(item => {
      subtotal += item.price * (item.quantity || 1);
      totalItemsCount += (item.quantity || 1);
    });
  });

  const discountPct = 15;
  const groupDiscount = Math.round(subtotal * (discountPct / 100));
  const tax = Math.round((subtotal - groupDiscount) * 0.05);
  const deliveryFee = 0; // Free for group orders
  const totalAmount = subtotal - groupDiscount + tax + deliveryFee;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(group.groupCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleToggleLock = () => {
    if (!isHost) return;
    setIsLocked(!isLocked);
  };

  const handleCheckout = () => {
    if (!isHost) {
      alert("Only the Host (" + group.hostName + ") can finalize and place the group order.");
      return;
    }
    if (totalItemsCount === 0) {
      alert("Cart is empty! Add dishes to the group cart first.");
      return;
    }

    setCheckingOut(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setCheckingOut(false);
      onCheckoutSuccess({
        id: `ord_${Date.now()}`,
        groupId: group.id,
        groupName: group.name,
        hostUserId: group.hostUserId,
        hostName: group.hostName,
        restaurantName: group.restaurantName,
        deliveryAddress: group.deliveryAddress,
        subtotal,
        groupDiscount,
        tax,
        deliveryFee,
        totalAmount,
        paymentMode,
        memberSummary: cartsList.map(c => ({
          userId: c.userId,
          userName: c.userName,
          userAvatar: c.userAvatar,
          itemsCount: c.items.reduce((sum, i) => sum + i.quantity, 0),
          individualTotal: c.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          paidStatus: paymentMode === 'host_pays' ? 'Host Paid (Birthday Gift)' : 'Paid via Split-Shield'
        })),
        orderStatus: 'confirmed',
        etaMinutes: 28,
        createdAt: new Date().toISOString()
      });
    }, 1200);
  };

  // AI Substitute Demo (Threat #3 -> Opportunity #3)
  const triggerAiSubstituteDemo = () => {
    setShowAiSubstituteModal(true);
  };

  const applySubstitute = () => {
    setSubstitutionSuccess(true);
    setTimeout(() => {
      setShowAiSubstituteModal(false);
      setSubstitutionSuccess(false);
    }, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner: Group Info & Quick Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5" />
                Live Group Room
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" />
                15% Group Volume Discount Active
              </span>
              {isLocked ? (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Cart Locked by Host
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5">
                  <Unlock className="w-3.5 h-3.5" />
                  Open for Member Edits
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {group?.name || "Rahul's Birthday Celebration"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ChefHat className="w-4 h-4 text-orange-500" />
                <span>{group?.restaurantName || "Meghana Biryani & Royal Kitchen"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Cart Closes in <strong>32 mins</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Users className="w-4 h-4 text-orange-500" />
                <span>{cartsList.length} Connected Friends</span>
              </div>
            </div>

            {/* Zero-Knowledge Ghost Privacy Landmark Display */}
            <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 max-w-xl">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="flex-1 truncate">
                <span className="font-semibold text-slate-700">Delivery Point: </span>
                <span className="text-slate-600">
                  {showFullAddress ? group?.deliveryAddress : group?.landmarkOnly || "Green Glen Terraces, Bellandur (Host Landmark Pin)"}
                </span>
              </div>
              <button 
                onClick={() => setShowFullAddress(!showFullAddress)}
                className="text-orange-600 hover:text-orange-700 font-bold text-[11px] shrink-0 flex items-center gap-1"
                title="Ghost Mode Privacy (Opportunity #5)"
              >
                {showFullAddress ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showFullAddress ? "Mask Address" : "Reveal (Host)"}</span>
              </button>
            </div>
          </div>

          {/* Right Action Widgets: Invite Code + Host Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
            <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">Party Passcode</span>
                <span className="text-xl font-black text-slate-900 tracking-wider">{group?.groupCode || "BDAY26"}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedCode ? "Copied!" : "Share Code"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onAddMoreFood}
                className="px-4 py-2.5 rounded-xl border border-orange-500 text-orange-600 hover:bg-orange-50 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Dishes from Menu</span>
              </button>

              {isHost && (
                <button
                  onClick={handleToggleLock}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition-all ${
                    isLocked 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-slate-800 hover:bg-slate-900 text-white'
                  }`}
                  title="Opportunity #6: Host Gatekeeping"
                >
                  {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <span>{isLocked ? "Unlock Cart" : "Lock for Checkout"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Individual Member Carts | Right = Consolidated Cart & Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Member Carts (Page 5: Rahul, Friend 1, 2, 3, 4) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              Member Carts ({cartsList.length} Participants)
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Viewing as:</span>
              <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                {currentUser?.name}
              </span>
            </div>
          </div>

          {/* Member Cart Cards */}
          <div className="space-y-3.5">
            {cartsList.map(memberCart => {
              const isCurrentUser = memberCart.userId === currentUser?.userId;
              const isMemberExpanded = expandedUser === memberCart.userId;
              const memberTotal = memberCart.items?.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0) || 0;

              return (
                <div 
                  key={memberCart.userId} 
                  className={`bg-white rounded-2xl border transition-all ${
                    isCurrentUser 
                      ? 'border-orange-400 ring-2 ring-orange-400/20 shadow-md' 
                      : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                  }`}
                >
                  {/* Member Card Header */}
                  <div 
                    onClick={() => setExpandedUser(isMemberExpanded ? null : memberCart.userId)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={memberCart.userAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${memberCart.userId}`} 
                        alt={memberCart.userName} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-orange-100 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800 text-sm">
                            {memberCart.userName}
                          </h3>
                          {memberCart.userId === group?.hostUserId && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                              Host 👑
                            </span>
                          )}
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{memberCart.userId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">
                          {memberCart.items?.length || 0} items
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{memberTotal}
                        </span>
                      </div>
                      {isMemberExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Items */}
                  {isMemberExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-2.5">
                      {memberCart.items?.length === 0 ? (
                        <div className="text-center py-4 text-xs text-slate-400">
                          No items added yet. Click "Add Dishes from Menu" to pick food!
                        </div>
                      ) : (
                        memberCart.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${item.veg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                              </span>
                              <div className="truncate">
                                <span className="font-semibold text-slate-800">{item.name}</span>
                                {item.notes && (
                                  <span className="block text-[11px] text-slate-400 italic">"{item.notes}"</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-bold text-slate-700">
                                {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                              </span>
                              {isCurrentUser && !isLocked && (
                                <button
                                  onClick={() => {
                                    const updated = memberCart.items.filter((_, i) => i !== idx);
                                    onUpdateCart(memberCart.userId, updated);
                                  }}
                                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                                  title="Remove dish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}

                      {/* Opportunity #3 AI Substitute Demo Button */}
                      {isCurrentUser && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                          <button
                            onClick={triggerAiSubstituteDemo}
                            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 bg-orange-50 px-2.5 py-1.5 rounded-lg border border-orange-200"
                          >
                            <Sparkles className="w-3 h-3 text-orange-500" />
                            <span>Simulate Out-of-Stock AI Substitution</span>
                          </button>

                          <button
                            onClick={() => onSwitchUser(memberCart.userId === '@rahul_host' ? '@ananya_foodie' : '@rahul_host')}
                            className="text-[11px] font-medium text-slate-500 hover:text-slate-800 underline"
                          >
                            Switch to other friend
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Combined Group Cart & Checkout (Page 4, 5, 6) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Combined Cart</span>
                <h2 className="text-xl font-extrabold text-slate-900">Total Group Bill</h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium">Total Dishes</span>
                <p className="text-base font-extrabold text-slate-800">{totalItemsCount} items</p>
              </div>
            </div>

            {/* Payment Mode Selector: Opportunity #2 (Smart Escrow & Instant Split-Shield) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Select Group Payment Mode (Opportunity #2)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('host_pays')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMode === 'host_pays'
                      ? 'bg-orange-50/80 border-orange-500 ring-2 ring-orange-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <PartyPopper className="w-3.5 h-3.5 text-orange-500" />
                    <span>Host Treats (Full)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Rahul pays complete bill for his birthday bash.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('split_itemized')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMode === 'split_itemized'
                      ? 'bg-orange-50/80 border-orange-500 ring-2 ring-orange-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Split-Shield UPI</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Instant itemized split with Host-Guarantee overdraft.
                  </p>
                </button>
              </div>
            </div>

            {/* Bill Calculation Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-semibold text-slate-800">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Group Volume Savings (15% Off)
                </span>
                <span>-₹{groupDiscount}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Restaurant GST & Service Tax (5%)</span>
                <span>₹{tax}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <span>Single-Point Delivery</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">PROMO</span>
                </span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Final Payable</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
                </div>
                {paymentMode === 'split_itemized' && (
                  <span className="text-xs font-semibold text-slate-500">
                    ~₹{Math.round(totalAmount / (cartsList.length || 1))} / person
                  </span>
                )}
              </div>
            </div>

            {/* Business Rule Warning Note (Page 12) */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Page 10 & 12 Enforced Business Rules:</span>
              </div>
              <p>• Only event host ({group?.hostName}) can trigger checkout.</p>
              <p>• Single common drop location ensures hot, synchronized delivery.</p>
            </div>

            {/* Host Checkout Action */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut || !isHost || totalItemsCount === 0}
              className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
                !isHost 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : checkingOut 
                    ? 'bg-orange-400 text-white cursor-wait'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/30'
              }`}
            >
              {checkingOut ? (
                <span>Securing Payment & Placing Order...</span>
              ) : !isHost ? (
                <span>Waiting for Host ({group?.hostName}) to Checkout</span>
              ) : (
                <>
                  <PartyPopper className="w-4 h-4" />
                  <span>Place Group Order (₹{totalAmount})</span>
                </>
              )}
            </button>

            {!isHost && (
              <p className="text-[11px] text-center text-slate-400">
                You are currently viewing as <span className="font-semibold text-slate-700">{currentUser?.name}</span>. 
                Use the switcher in the header to switch to <span className="text-orange-600 font-bold">Rahul Verma (Host)</span> to submit checkout.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Substitute Modal (Opportunity #3 Live Implementation) */}
      {showAiSubstituteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <div className="p-2.5 rounded-xl bg-orange-100">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Opportunity #3: AI Stock Guard</h3>
                <p className="text-xs text-slate-500">Live Item Substitution Demo</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                "Paneer 65 Crispy Fry" has only 0 portions left at restaurant!
              </p>
              <p>Traditional apps would cancel the whole cart. Swiggy 2.0 AI suggests an instant substitution:</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">AI Recommended Match (98% Similarity)</span>
                  <h4 className="font-bold text-slate-900 text-sm">Paneer Tikka Charcoal Grilled</h4>
                  <p className="text-xs text-slate-500">Vegetarian • High Protein • Same Price (₹250)</p>
                </div>
                <span className="font-extrabold text-sm text-slate-900">₹250</span>
              </div>
            </div>

            {substitutionSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Substitute Approved & Locked in Cart!</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowAiSubstituteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50"
                >
                  Dismiss
                </button>
                <button
                  onClick={applySubstitute}
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow"
                >
                  1-Click Auto Substitute
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
