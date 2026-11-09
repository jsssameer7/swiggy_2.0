import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  Sparkles, 
  Filter,
  Percent,
  ChefHat
} from 'lucide-react';

export default function RestaurantCatalog({ 
  restaurants, 
  currentUser, 
  onAddToCart, 
  activeGroupName 
}) {
  const [selectedRestId, setSelectedRestId] = useState(restaurants[0]?.id || 'rest_meghana');
  const [dietaryFilter, setDietaryFilter] = useState('ALL'); // 'ALL' | 'VEG' | 'NON_VEG'
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const activeRestaurant = restaurants.find(r => r.id === selectedRestId) || restaurants[0];

  const filteredMenu = activeRestaurant?.menu?.filter(item => {
    if (dietaryFilter === 'VEG' && !item.veg) return false;
    if (dietaryFilter === 'NON_VEG' && item.veg) return false;
    if (searchQuery.trim() && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }) || [];

  const handleAddItem = (dish) => {
    onAddToCart(dish);
    setAddedItemNotice(dish.name);
    setTimeout(() => setAddedItemNotice(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Search & Restaurant Selection Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Partner Kitchens & Group Menus
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select dishes to add to your personal cart slot in <span className="font-bold text-orange-600">{activeGroupName || "Rahul's Birthday Bash"}</span>.
            </p>
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => setDietaryFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dietaryFilter === 'ALL' ? 'bg-orange-500 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('VEG')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'VEG' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Pure Veg
            </button>
            <button
              onClick={() => setDietaryFilter('NON_VEG')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'NON_VEG' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Non-Veg
            </button>
          </div>
        </div>

        {/* Restaurant selector cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restaurants.map(rest => {
            const isSelected = rest.id === selectedRestId;
            return (
              <div
                key={rest.id}
                onClick={() => setSelectedRestId(rest.id)}
                className={`cursor-pointer rounded-3xl overflow-hidden border transition-all ${
                  isSelected 
                    ? 'border-orange-500 ring-4 ring-orange-500/20 shadow-lg bg-white' 
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="h-36 relative overflow-hidden">
                  <img 
                    src={rest.image} 
                    alt={rest.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/90 px-2 py-0.5 rounded-md">
                      {rest.groupDiscountPct}% Group Deal
                    </span>
                    <h3 className="font-extrabold text-base truncate mt-1 text-white">{rest.name}</h3>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-slate-700 font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{rest.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rest.deliveryTime}</span>
                  </div>
                  <span className="font-semibold text-slate-700">{rest.priceRange}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu Header with Search */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              <span>{activeRestaurant?.name} Menu</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{activeRestaurant?.address}</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Added Item Toast Notification */}
        {addedItemNotice && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Added "{addedItemNotice}" to {currentUser?.name}'s cart slot!</span>
            </div>
            <span className="text-[11px] font-normal text-emerald-600">Updated in Group Room</span>
          </div>
        )}

        {/* Menu Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map(dish => (
            <div 
              key={dish.id}
              className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${dish.veg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dish.veg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {dish.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{dish.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
                <div className="pt-1">
                  <span className="text-sm font-extrabold text-slate-900">₹{dish.price}</span>
                </div>
              </div>

              <button
                onClick={() => handleAddItem(dish)}
                className="shrink-0 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
