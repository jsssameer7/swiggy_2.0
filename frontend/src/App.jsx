import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import BirthdayPartyRoom from './components/BirthdayPartyRoom';
import RestaurantCatalog from './components/RestaurantCatalog';
import FriendsNetwork from './components/FriendsNetwork';
import ThreatsToOpportunities from './components/ThreatsToOpportunities';
import OrderTracking from './components/OrderTracking';
import SupabaseModal from './components/SupabaseModal';
import AuthModal from './components/AuthModal';
import { supabase } from './supabaseClient';

const INITIAL_USERS = [
  {
    id: "usr_rahul_host",
    userId: "@rahul_host",
    name: "Rahul Verma (Host)",
    email: "rahul@swiggy.test",
    phone: "9876543210",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    preferences: {
      favouriteDishes: ["Special Chicken Biryani", "Gulab Jamun"],
      dietary: "Non-Veg",
      allergies: []
    }
  },
  {
    id: "usr_friend_1",
    userId: "@ananya_foodie",
    name: "Ananya Sharma (Friend 1)",
    email: "ananya@swiggy.test",
    phone: "9876543211",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    preferences: {
      favouriteDishes: ["Paneer 65 Crispy Fry", "Garlic Bread"],
      dietary: "Vegetarian",
      allergies: ["Mushrooms"]
    }
  },
  {
    id: "usr_friend_2",
    userId: "@vikram_burger",
    name: "Vikram Malhotra (Friend 2)",
    email: "vikram@swiggy.test",
    phone: "9876543212",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    preferences: {
      favouriteDishes: ["Double Cheese Smash Burger", "Apollo Fish"],
      dietary: "Non-Veg",
      allergies: []
    }
  },
  {
    id: "usr_friend_3",
    userId: "@sneha_paneer",
    name: "Sneha Reddy (Friend 3)",
    email: "sneha@swiggy.test",
    phone: "9876543213",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    preferences: {
      favouriteDishes: ["Paneer Biryani Dum Pukht"],
      dietary: "Vegetarian",
      allergies: ["Peanuts"]
    }
  },
  {
    id: "usr_friend_4",
    userId: "@kabir_chicken",
    name: "Kabir Mehta (Friend 4)",
    email: "kabir@swiggy.test",
    phone: "9876543214",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    preferences: {
      favouriteDishes: ["Special Chicken Biryani", "Crispy Burger"],
      dietary: "Non-Veg",
      allergies: []
    }
  }
];

const INITIAL_RESTAURANTS = [
  {
    id: "rest_meghana",
    name: "Meghana Biryani & Royal Kitchen",
    cuisine: ["Andhra", "Biryani", "North Indian"],
    rating: 4.8,
    deliveryTime: "25-35 mins",
    priceRange: "₹₹",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
    address: "Indiranagar 100ft Road, Bengaluru",
    groupDiscountPct: 15,
    menu: [
      { id: "m1", name: "Special Chicken Biryani", price: 340, veg: false, category: "Biryani", description: "Slow-cooked aromatic basmati rice with spicy marinated chicken portions." },
      { id: "m2", name: "Paneer Biryani Dum Pukht", price: 290, veg: true, category: "Biryani", description: "Fragrant saffron rice layered with tender grilled paneer cubes and mild spices." },
      { id: "m3", name: "Andhra Apollo Fish", price: 360, veg: false, category: "Starters", description: "Crispy coated fish tossed with green chillies, curry leaves and yoghurt sauce." },
      { id: "m4", name: "Paneer 65 Crispy Fry", price: 250, veg: true, category: "Starters", description: "South Indian spicy fried paneer cubes with red chilli and curry leaves." },
      { id: "m5", name: "Butter Naan (2 Pcs)", price: 90, veg: true, category: "Breads", description: "Soft tandoor-baked flatbread glazed with melted butter." },
      { id: "m6", name: "Gulab Jamun Warm (2 Pcs)", price: 80, veg: true, category: "Desserts", description: "Golden milk-solid dumplings soaked in rose and cardamom syrup." }
    ]
  },
  {
    id: "rest_toscano",
    name: "Toscano Artisanal Pizza Co.",
    cuisine: ["Italian", "Pizza", "Pastas"],
    rating: 4.7,
    deliveryTime: "30-40 mins",
    priceRange: "₹₹₹",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    address: "Koramangala 4th Block, Bengaluru",
    groupDiscountPct: 12,
    menu: [
      { id: "m7", name: "Classic Margherita Sourdough", price: 380, veg: true, category: "Pizza", description: "San Marzano tomato base, fresh buffalo mozzarella, and basil." },
      { id: "m8", name: "Smoked Chicken & Jalapeño Pizza", price: 460, veg: false, category: "Pizza", description: "Woodfired sourdough loaded with smoked shredded chicken, jalapeños, and cheddar." },
      { id: "m9", name: "Truffle Mushroom Risotto", price: 420, veg: true, category: "Pastas", description: "Creamy Arborio rice with porcini mushrooms and aromatic white truffle oil." },
      { id: "m10", name: "Cheesy Garlic Herb Loaf", price: 180, veg: true, category: "Sides", description: "Crispy baguette infused with roasted garlic butter and stringy mozzarella." }
    ]
  },
  {
    id: "rest_seigneur",
    name: "Burger Seigneur & Craft Shakes",
    cuisine: ["American", "Burgers", "Fast Food"],
    rating: 4.6,
    deliveryTime: "20-30 mins",
    priceRange: "₹₹",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    address: "Church Street, Bengaluru",
    groupDiscountPct: 20,
    menu: [
      { id: "m11", name: "Double Cheese Smash Burger", price: 320, veg: false, category: "Burgers", description: "Two smashed juicy patties with molten American cheddar and secret smash sauce." },
      { id: "m12", name: "Crispy Fried Chicken Burger", price: 290, veg: false, category: "Burgers", description: "Crunchy spiced buttermilk chicken breast topped with creamy coleslaw." },
      { id: "m13", name: "Smoky Paneer Delight Burger", price: 260, veg: true, category: "Burgers", description: "Cottage cheese patty crusted with panko crumbs, chipotle mayo, and pickled onion." },
      { id: "m14", name: "Peri Peri Shake Fries (Tub)", price: 160, veg: true, category: "Sides", description: "Skin-on golden potato fries tossed in zesty African bird's eye chilli seasoning." }
    ]
  }
];

const INITIAL_GROUP_EVENT = {
  id: "grp_bday_2026",
  groupCode: "BDAY26",
  name: "Rahul's 25th Birthday Bash! 🎂",
  hostUserId: "@rahul_host",
  hostName: "Rahul Verma",
  restaurantId: "rest_meghana",
  restaurantName: "Meghana Biryani & Royal Kitchen",
  deliveryAddress: "Penthouse 402, Green Glen Terraces, Bellandur, Bengaluru - 560103",
  landmarkOnly: "Green Glen Terraces, Bellandur (Host Landmark Pin)",
  status: "open",
  paymentMode: "host_pays",
  carts: {
    "@rahul_host": {
      userId: "@rahul_host",
      userName: "Rahul Verma (Host)",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      items: [
        { id: "m1", name: "Special Chicken Biryani", price: 340, quantity: 1, veg: false, notes: "Extra spicy salan please" },
        { id: "m6", name: "Gulab Jamun Warm (2 Pcs)", price: 80, quantity: 2, veg: true, notes: "Serve hot" }
      ]
    },
    "@ananya_foodie": {
      userId: "@ananya_foodie",
      userName: "Ananya Sharma (Friend 1)",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      items: [
        { id: "m4", name: "Paneer 65 Crispy Fry", price: 250, quantity: 1, veg: true, notes: "Crispy with lemon" },
        { id: "m5", name: "Butter Naan (2 Pcs)", price: 90, quantity: 1, veg: true, notes: "Warm" }
      ]
    },
    "@vikram_burger": {
      userId: "@vikram_burger",
      userName: "Vikram Malhotra (Friend 2)",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      items: [
        { id: "m3", name: "Andhra Apollo Fish", price: 360, quantity: 1, veg: false, notes: "Extra crispy" }
      ]
    },
    "@sneha_paneer": {
      userId: "@sneha_paneer",
      userName: "Sneha Reddy (Friend 3)",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      items: [
        { id: "m2", name: "Paneer Biryani Dum Pukht", price: 290, quantity: 1, veg: true, notes: "Mild spice" }
      ]
    },
    "@kabir_chicken": {
      userId: "@kabir_chicken",
      userName: "Kabir Mehta (Friend 4)",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      items: [
        { id: "m1", name: "Special Chicken Biryani", price: 340, quantity: 1, veg: false, notes: "Regular spice" }
      ]
    }
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged out by default -> shows Welcome page!
  const [activeTab, setActiveTab] = useState('welcome'); // 'welcome', 'group', 'restaurants', 'friends', 'swot', 'orders'
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [group, setGroup] = useState(INITIAL_GROUP_EVENT);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loginToast, setLoginToast] = useState('');

  // Sync with backend API if accessible
  useEffect(() => {
    fetch('/api/groups')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setGroup(data[0]);
        }
      })
      .catch(() => {});
  }, []);

  // Handle successful login from AuthModal
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    if (!users.some(u => u.userId === user.userId)) {
      setUsers(prev => [user, ...prev]);
    }
    setLoginToast(`Signed in as ${user.name} (${user.userId})!`);
    setTimeout(() => setLoginToast(''), 3000);

    // If new user joins group automatically
    if (!group.carts[user.userId]) {
      setGroup(prev => ({
        ...prev,
        carts: {
          ...prev.carts,
          [user.userId]: {
            userId: user.userId,
            userName: user.name,
            userAvatar: user.avatarUrl,
            items: []
          }
        }
      }));
    }

    // Directly go to Party Room upon login
    setActiveTab('group');
  };

  // Handle Logout -> directly return to Welcome page
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('welcome');
    setLoginToast('Logged out. Welcome back anytime!');
    setTimeout(() => setLoginToast(''), 3000);
  };

  // Update a specific member's cart
  const handleUpdateCart = (userId, updatedItems) => {
    setGroup(prev => {
      const nextCarts = { ...prev.carts };
      if (!nextCarts[userId]) {
        nextCarts[userId] = {
          userId,
          userName: users.find(u => u.userId === userId)?.name || userId,
          userAvatar: users.find(u => u.userId === userId)?.avatarUrl || '',
          items: []
        };
      }
      nextCarts[userId] = {
        ...nextCarts[userId],
        items: updatedItems
      };
      return {
        ...prev,
        carts: nextCarts
      };
    });

    // Also inform backend
    fetch(`/api/groups/${group.id}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      },
      body: JSON.stringify({ items: updatedItems })
    }).catch(() => {});
  };

  // Add dish to currently logged-in user's cart
  const handleAddToCart = (dish) => {
    const currentItems = group.carts[currentUser.userId]?.items || [];
    const existingIndex = currentItems.findIndex(i => i.id === dish.id);
    let updated;

    if (existingIndex > -1) {
      updated = currentItems.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...currentItems, { ...dish, quantity: 1, notes: '' }];
    }

    handleUpdateCart(currentUser.userId, updated);
  };

  // Add new friend to network
  const handleAddFriend = (targetId) => {
    const cleanId = targetId.startsWith('@') ? targetId : `@${targetId}`;
    const found = users.find(u => u.userId.toLowerCase() === cleanId.toLowerCase());
    if (found) {
      return { success: true, message: `Connected with ${found.name} (${cleanId})!` };
    }
    const newFriend = {
      id: `usr_${Date.now()}`,
      userId: cleanId,
      name: cleanId.replace('@', '').replace('_', ' ').toUpperCase(),
      email: `${cleanId.replace('@', '')}@swiggy.test`,
      phone: "98765" + Math.floor(10000 + Math.random() * 90000),
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanId}`,
      preferences: {
        favouriteDishes: ["Tandoori Paneer", "Biryani"],
        dietary: "Vegetarian",
        allergies: []
      }
    };
    setUsers(prev => [...prev, newFriend]);
    return { success: true, message: `Created new friend profile & connected with ${cleanId}!` };
  };

  // Checkout completed
  const handleCheckoutSuccess = (order) => {
    setActiveOrder(order);
    setActiveTab('orders');
  };

  // Advance order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    if (activeOrder) {
      setActiveOrder(prev => ({
        ...prev,
        orderStatus: newStatus
      }));
    }
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  // Total cart count for current user
  const currentMemberItemsCount = group.carts[currentUser.userId]?.items?.reduce(
    (sum, i) => sum + i.quantity, 0
  ) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        allUsers={users}
        onSwitchUser={(id) => {
          const user = users.find(u => u.userId === id);
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            setActiveTab('group');
          }
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        cartCount={currentMemberItemsCount}
      />

      {/* Success Toast */}
      {loginToast && (
        <div className="fixed top-24 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <span>✓</span>
          <span>{loginToast}</span>
        </div>
      )}

      <main className="flex-1 pb-16">
        {activeTab === 'welcome' && (
          <WelcomePage
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onEnterApp={() => {
              setIsLoggedIn(true);
              setActiveTab('group');
            }}
            onExploreSwot={() => setActiveTab('swot')}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'group' && (
          <BirthdayPartyRoom
            group={group}
            currentUser={currentUser}
            onUpdateCart={handleUpdateCart}
            onCheckoutSuccess={handleCheckoutSuccess}
            onAddMoreFood={() => setActiveTab('restaurants')}
            onSwitchUser={(id) => {
              const user = users.find(u => u.userId === id);
              if (user) setCurrentUser(user);
            }}
          />
        )}

        {activeTab === 'restaurants' && (
          <RestaurantCatalog
            restaurants={restaurants}
            currentUser={currentUser}
            onAddToCart={handleAddToCart}
            activeGroupName={group.name}
          />
        )}

        {activeTab === 'friends' && (
          <FriendsNetwork
            currentUser={currentUser}
            friends={users.filter(u => u.userId !== currentUser.userId)}
            onAddFriend={handleAddFriend}
            onSwitchUser={(id) => {
              const user = users.find(u => u.userId === id);
              if (user) setCurrentUser(user);
            }}
            allUsers={users}
          />
        )}

        {activeTab === 'swot' && (
          <ThreatsToOpportunities
            onNavigateToParty={() => setActiveTab('group')}
          />
        )}

        {activeTab === 'orders' && (
          <OrderTracking
            order={activeOrder}
            onUpdateStatus={handleUpdateOrderStatus}
            onBackToHome={() => setActiveTab('group')}
          />
        )}
      </main>

      {/* Authentication & Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        demoUsers={users}
      />

      {/* Database Modal */}
      <SupabaseModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Swiggy 2.0</span>
            <span>• Social Food Ordering & Group Delivery Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setActiveTab('welcome')} className="hover:text-orange-600 underline">
              Welcome Page
            </button>
            <span>•</span>
            <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-orange-600 underline">
              Login & OTP
            </button>
            <span>•</span>
            <span>Supabase Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
