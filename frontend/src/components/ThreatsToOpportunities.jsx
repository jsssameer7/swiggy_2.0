import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Truck, 
  Lock, 
  UserCheck, 
  TrendingUp,
  Percent,
  Eye,
  Bot
} from 'lucide-react';

export const THREAT_TRANSFORMATIONS = [
  {
    id: 1,
    threatTitle: "1. Competition from Established Food Delivery Giants",
    threatCategory: "Market Rivalry",
    threatIcon: Users,
    threatColor: "text-rose-600 bg-rose-50 border-rose-200",
    threatDescription: "Legacy platforms (Zomato, classic Swiggy) have huge marketing budgets and dominant market share with single-user accounts.",
    opportunityTitle: "Organic Multiplayer Viral Loops & Zero-CAC Network Effects",
    opportunityStrategy: "Transform food ordering from solitary to inherently social. Every group order requires 1 host to invite 4–8 friends, creating an exponential organic referral flywheel without ad spend.",
    features: [
      "Viral 6-digit Party Codes & instant share links",
      "EatTogether group loyalty points & milestone unlocks",
      "Social profile showcase with shared food badges"
    ],
    metricImpact: "4.8x Higher Organic Virality • 35% Lower Blended CAC"
  },
  {
    id: 2,
    threatTitle: "2. Payment Failures, Chargebacks & Unpaid Member Debts",
    threatCategory: "Fintech Risk",
    threatIcon: CreditCard,
    threatColor: "text-amber-600 bg-amber-50 border-amber-200",
    threatDescription: "Coordinating money from 5+ people before ordering causes cart abandonment, payment drops, or host awkwardness asking for cash.",
    opportunityTitle: "Smart Escrow Vault & Instant Split-Shield Architecture",
    opportunityStrategy: "Built-in dual payment modes: 'One Host Pays' for celebratory gifting (e.g. Rahul's Birthday), or 'Split-Shield' with UPI micro-escrow holds and Host-Guarantee overdraft protection.",
    features: [
      "Dual mode: One Host Pays vs Itemized Split-Shield",
      "Real-time payment reconciliation status per member",
      "Host Overdraft Guarantee so kitchens never delay orders"
    ],
    metricImpact: "99.8% Order Settlement • 0 Awkward WhatsApp Money Reminders"
  },
  {
    id: 3,
    threatTitle: "3. Restaurant Stock Outages & Sudden Dish Cancellations",
    threatCategory: "Supply Chain",
    threatIcon: AlertTriangle,
    threatColor: "text-orange-600 bg-orange-50 border-orange-200",
    threatDescription: "If 1 item in a 6-person order is sold out, the whole order risks cancellation or angry re-coordination among participants.",
    opportunityTitle: "Live Smart Stock Guard & AI Alternative Auto-Substitution",
    opportunityStrategy: "Real-time stock inventory reservation locks items when added. If a dish becomes scarce, an AI Assistant suggests a 1-click dietary-matched substitute (e.g. Paneer Tikka for sold-out Paneer 65).",
    features: [
      "Pre-checkout stock locking per group cart slot",
      "AI Alternative Suggestion Engine matching calories/diet",
      "1-Click member approval without restarting the party room"
    ],
    metricImpact: "0 Deadlocked Carts • 92% Faster Out-of-Stock Resolution"
  },
  {
    id: 4,
    threatTitle: "4. Delivery Bottlenecks & Service-Area Fragmentations",
    threatCategory: "Logistics",
    threatIcon: Truck,
    threatColor: "text-blue-600 bg-blue-50 border-blue-200",
    threatDescription: "Delivering multiple items to groups can face rider delays, cold food, or routing chaos during peak party hours.",
    opportunityTitle: "Consolidated Single-Point Dispatch & VIP Priority Riders",
    opportunityStrategy: "All group items are consolidated at one validated drop location, doubling delivery density. Riders earn 1.5x higher tip/efficiency while slashing carbon emissions by 68%.",
    features: [
      "Single common validated delivery point for the entire group",
      "Scheduled arrival countdown deadline for peak events",
      "Temperature-insulated multi-bag courier dispatch"
    ],
    metricImpact: "68% Lower Urban Carbon Emissions • Guaranteed 30-Min Event ETA"
  },
  {
    id: 5,
    threatTitle: "5. Privacy & User Account Security Incidents",
    threatCategory: "Data Security",
    threatIcon: Lock,
    threatColor: "text-purple-600 bg-purple-50 border-purple-200",
    threatDescription: "Exposing private home addresses or phone numbers to large group chats or acquaintances invites privacy risks.",
    opportunityTitle: "Zero-Knowledge Social Privacy & Ghost Delivery Address Mode",
    opportunityStrategy: "Only the verified host can view exact flat numbers. Group members and casual friends only see the agreed landmark pin ('Bellandur Tech Campus'). Contact details are fully tokenized.",
    features: [
      "Ghost Delivery Pin: Landmark only for casual participants",
      "Tokenized phone numbers and anonymous avatar handles",
      "Strict role-based cart permissions (only host can place order)"
    ],
    metricImpact: "100% Zero-Leak Personal Address & Contact Masking Compliance"
  },
  {
    id: 6,
    threatTitle: "6. Abuse of Invitations & Unwanted Group Spam",
    threatCategory: "Platform Trust",
    threatIcon: UserCheck,
    threatColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    threatDescription: "Spammers spamming group invites or random users jumping into rooms and altering cart totals maliciously.",
    opportunityTitle: "Verified Trusted Circles & Party Code Gatekeeping",
    opportunityStrategy: "Multi-layered security: 6-digit rotating party codes, host-only admission queue, instant member kick power, and isolated member cart boundaries where members can only edit their own items.",
    features: [
      "Self-contained member cart slots (no editing other's food)",
      "Host 1-click Cart Lock button before checkout",
      "Spam-shielded Swiggy IDs with friend request approvals"
    ],
    metricImpact: "Zero Cart Tampering • 100% Host Moderation Control"
  },
  {
    id: 7,
    threatTitle: "7. High Platform Commissions & Reliance on Third Parties",
    threatCategory: "Ecosystem Economics",
    threatIcon: Percent,
    threatColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    threatDescription: "Hefty 25-30% marketplace commissions squeeze restaurant margins and hike prices for consumers.",
    opportunityTitle: "Direct Restaurant Open-Connect & 15% Group Volume Discount",
    opportunityStrategy: "Group orders generate 3.2x higher Average Order Value (AOV ~₹1,450 vs ₹380 for individual orders). Restaurants reward this volume by giving 15% direct group discounts.",
    features: [
      "Automatic 15% volume discount applied on group orders",
      "Direct restaurant kitchen display system (KDS) integration",
      "Transparent fee breakdown with zero hidden charges"
    ],
    metricImpact: "3.2x Higher Basket Value • 15% Direct Group Savings for Users"
  }
];

export default function ThreatsToOpportunities({ onNavigateToParty }) {
  const [activeCard, setActiveCard] = useState(1);
  const selected = THREAT_TRANSFORMATIONS.find(t => t.id === activeCard);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-orange-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            Document Page 7 Transformation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Threats <span className="text-orange-400">→</span> Opportunities Engine
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            The proposal identified 7 critical vulnerabilities in traditional group food ordering. 
            In <span className="text-white font-semibold">Swiggy 2.0</span>, we systematically inverted every single threat into an unfair competitive advantage.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <button
              onClick={onNavigateToParty}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 text-sm"
            >
              <span>Test Live in Birthday Party Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              All 7 Opportunities active in this full-stack prototype
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 7 Transformations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Proposal Threats (Select to Inspect Opportunity)
          </h2>
          {THREAT_TRANSFORMATIONS.map(item => {
            const Icon = item.threatIcon;
            const isSelected = activeCard === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCard(item.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start gap-4 ${
                  isSelected 
                    ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/20' 
                    : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${item.threatColor} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {item.threatCategory}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        Active View
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-bold truncate mt-0.5 ${isSelected ? 'text-orange-600' : 'text-slate-800'}`}>
                    {item.threatTitle}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold truncate">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.opportunityTitle}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Transformation Card */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {/* Header comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Original Document Threat
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{selected.threatTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selected.threatDescription}</p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Turned into Opportunity
                </div>
                <h4 className="font-bold text-emerald-950 text-sm mb-2">{selected.opportunityTitle}</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">{selected.opportunityStrategy}</p>
              </div>
            </div>

            {/* Implemented Features in Prototype */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                How Swiggy 2.0 Implements This In Code & UI:
              </h3>
              <div className="space-y-2.5">
                {selected.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Business Metric Impact */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-100">
                  Business & UX Impact
                </span>
                <p className="text-sm font-extrabold mt-0.5">{selected.metricImpact}</p>
              </div>
              <button
                onClick={onNavigateToParty}
                className="px-4 py-2 rounded-xl bg-white text-orange-600 font-bold text-xs shadow hover:bg-orange-50 transition-all shrink-0"
              >
                Experience Live
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
