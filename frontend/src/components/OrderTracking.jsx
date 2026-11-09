import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  PackageCheck, 
  ChefHat, 
  Bike, 
  Home, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

const ORDER_STEPS = [
  { key: 'confirmed', label: 'Order Confirmed', sub: 'Kitchen received group tickets', icon: PackageCheck },
  { key: 'preparing', label: 'Food in Kitchen', sub: 'Chefs preparing customized dishes', icon: ChefHat },
  { key: 'out_for_delivery', label: 'Out for Group Delivery', sub: 'VIP Courier on the way', icon: Bike },
  { key: 'delivered', label: 'Delivered Together!', sub: 'Enjoy your celebration meal', icon: Home }
];

export default function OrderTracking({ order, onUpdateStatus, onBackToHome }) {
  const [currentStatus, setCurrentStatus] = useState(order?.orderStatus || 'confirmed');

  useEffect(() => {
    if (order?.orderStatus) {
      setCurrentStatus(order.orderStatus);
    }
  }, [order?.orderStatus]);

  const currentStepIndex = ORDER_STEPS.findIndex(s => s.key === currentStatus);

  const advanceStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < ORDER_STEPS.length) {
      const nextStatus = ORDER_STEPS[nextIndex].key;
      setCurrentStatus(nextStatus);
      onUpdateStatus(order.id, nextStatus);

      if (nextStatus === 'delivered') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No Active Group Order</h2>
        <p className="text-sm text-slate-500">
          Go to the Birthday Party Room and complete host checkout to view live tracking here!
        </p>
        <button
          onClick={onBackToHome}
          className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
        >
          Go to Party Room
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-slate-900 to-orange-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-orange-500/20">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/40 inline-flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Group Order Successfully Coordinated
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Live Shared Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Order <span className="font-mono text-orange-400 font-bold">{order.id}</span> • {order.groupName}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center md:text-right shrink-0">
          <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block">
            Estimated Delivery Time
          </span>
          <div className="text-3xl font-black text-white mt-0.5">
            {currentStatus === 'delivered' ? '0 min (Arrived)' : '24-28 mins'}
          </div>
          <span className="text-xs text-slate-300">Single Coordinated Drop</span>
        </div>
      </div>

      {/* Real-time Step Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Delivery Lifecycle (Page 6 & 11)
          </h2>
          {currentStepIndex < ORDER_STEPS.length - 1 && (
            <button
              onClick={advanceStep}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Simulate Next Stage ({ORDER_STEPS[currentStepIndex + 1]?.label})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ORDER_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={step.key}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent 
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-sm' 
                    : isCompleted 
                      ? 'border-emerald-200 bg-emerald-50/40' 
                      : 'border-slate-100 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${
                    isCurrent 
                      ? 'bg-orange-500 text-white' 
                      : isCompleted 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">0{idx + 1}</span>
                </div>
                <h3 className={`text-xs font-bold ${isCurrent ? 'text-orange-600' : 'text-slate-800'}`}>
                  {step.label}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{step.sub}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated GPS & Courier Dispatch Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Delivery Details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Validated Group Drop Location</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-800">
              {order.deliveryAddress || "Penthouse 402, Green Glen Terraces, Bellandur, Bengaluru"}
            </span>
            <p className="text-xs text-slate-500">
              Coordinated by Host: <strong className="text-slate-700">{order.hostName}</strong>
            </p>
          </div>

          {/* Courier Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                MK
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Manoj Kumar (VIP Rider)</h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vaccinated & Temperature Controlled</span>
                </div>
              </div>
            </div>
            <button className="p-2.5 rounded-xl bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 shadow-sm">
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Member Items Breakdown (Who gets what in the package) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-orange-500" />
              Package Contents by Friend
            </span>
            <span className="text-xs font-extrabold text-slate-800">
              Total ₹{order.totalAmount}
            </span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {order.memberSummary?.map((member, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={member.userAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${member.userId}`} 
                    alt={member.userName} 
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block">{member.userName}</span>
                    <span className="text-[11px] text-slate-400">{member.itemsCount} dishes</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 block">₹{member.individualTotal}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{member.paidStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
