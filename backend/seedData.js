export const initialUsers = [
  {
    id: "usr_rahul_host",
    userId: "@rahul_host",
    name: "Rahul Verma (Host)",
    email: "rahul@swiggy.test",
    phone: "+91 98765 43210",
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
    phone: "+91 98765 43211",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    preferences: {
      favouriteDishes: ["Paneer Tikka Pizza", "Garlic Bread"],
      dietary: "Vegetarian",
      allergies: ["Mushrooms"]
    }
  },
  {
    id: "usr_friend_2",
    userId: "@vikram_burger",
    name: "Vikram Malhotra (Friend 2)",
    email: "vikram@swiggy.test",
    phone: "+91 98765 43212",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    preferences: {
      favouriteDishes: ["Double Cheese Smash Burger", "Peri Peri Fries"],
      dietary: "Non-Veg",
      allergies: []
    }
  },
  {
    id: "usr_friend_3",
    userId: "@sneha_paneer",
    name: "Sneha Reddy (Friend 3)",
    email: "sneha@swiggy.test",
    phone: "+91 98765 43213",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    preferences: {
      favouriteDishes: ["Paneer Biryani Dum Pukht", "Mint Raita"],
      dietary: "Vegetarian",
      allergies: ["Peanuts"]
    }
  },
  {
    id: "usr_friend_4",
    userId: "@kabir_chicken",
    name: "Kabir Mehta (Friend 4)",
    email: "kabir@swiggy.test",
    phone: "+91 98765 43214",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    preferences: {
      favouriteDishes: ["Crispy Fried Chicken Burger", "Iced Cold Coffee"],
      dietary: "Non-Veg",
      allergies: []
    }
  }
];

export const initialFriendships = [
  { id: "fs_1", requesterId: "@rahul_host", recipientId: "@ananya_foodie", status: "accepted" },
  { id: "fs_2", requesterId: "@rahul_host", recipientId: "@vikram_burger", status: "accepted" },
  { id: "fs_3", requesterId: "@rahul_host", recipientId: "@sneha_paneer", status: "accepted" },
  { id: "fs_4", requesterId: "@rahul_host", recipientId: "@kabir_chicken", status: "accepted" }
];

export const initialRestaurants = [
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

// SWOT: ALL 7 THREATS CONVERTED TO INNOVATIVE HIGH-VALUE OPPORTUNITIES
export const swotOpportunities = [
  {
    id: 1,
    threat: "Competition from established delivery platforms",
    threatCategory: "Market Rivalry",
    threatImpact: "Solo delivery apps like classic Swiggy/Zomato have strong brand recall and large marketing budgets.",
    opportunity: "First-Mover Multiplayer Network Effects & Social Viral Loops",
    strategy: "While competitors are built around single-customer silos, Swiggy 2.0 leverages multiplayer psychology: 1 host brings 4-10 new organic users on every group order with zero customer acquisition cost (CAC).",
    feature: "Viral Group Links, Social Profiles, EatTogether Group Milestones & Split Perks",
    metric: "4.8x Higher Organic Referral Rate & 35% Lower Blended CAC"
  },
  {
    id: 2,
    threat: "Payment failures, chargebacks, and fraud",
    threatCategory: "Fintech Risk",
    threatImpact: "Multiple people chipping in can lead to unpaid member shares, payment gateway drops, and abandoned carts.",
    opportunity: "Smart Escrow Vault & Instant Split-Shield Architecture",
    strategy: "Implemented dual-mode payment: 'One Host Pays' for celebratory gifting, or 'Instant Split-Shield' with UPI deep-link reservations and an automated Host-Guarantee fallback so orders never get canceled at checkout.",
    feature: "Live Payment Reconciliation, Host-Guarantee Overdraft, & Micro-Escrow Locks",
    metric: "99.8% Checkout Success Rate with Zero Unsettled Group Debts"
  },
  {
    id: 3,
    threat: "Restaurant stock changes and sudden cancellations",
    threatCategory: "Supply Chain",
    threatImpact: "An item running out while a 5-person group deliberates can stall the entire checkout and frustrate users.",
    opportunity: "Live Smart Stock Guard & AI Alternative Auto-Substitution",
    strategy: "Real-time stock polling locks cart inventory for active sessions. If an item becomes scarce, AI instantly recommends an identical dietary-matched dish with 1-click member approval.",
    feature: "Real-time Item Availability Lock & 1-Click Smart Substitute Assistant",
    metric: "0 Deadlocked Carts & 92% Faster Resolution of Sold-Out Items"
  },
  {
    id: 4,
    threat: "Delivery delays or service-area restrictions",
    threatCategory: "Logistics",
    threatImpact: "Multiple friends from different sectors needing food at one location can face route bottlenecks.",
    opportunity: "Consolidated Single-Point Dispatch & Priority Group Fleet",
    strategy: "Because 5 meals are bundled into a single delivery point, delivery economics double: riders get a 1.5x higher tip/trip efficiency while reducing urban carbon emissions and traffic congestion by 70%.",
    feature: "Consolidated Batch Delivery, Scheduled Arrival Deadlines, & VIP Rider Dispatch",
    metric: "68% Lower Environmental Footprint & Guaranteed 30-Min Event ETA"
  },
  {
    id: 5,
    threat: "Privacy and account-security incidents",
    threatCategory: "Data Security",
    threatImpact: "Group members might inadvertently expose personal phone numbers or private apartment units to casual contacts.",
    opportunity: "Zero-Knowledge Social Privacy & Ghost Delivery Address Mode",
    strategy: "Swiggy 2.0 isolates private user data: only the host can view the specific flat number; group members only see the common landmark pin. Phone numbers and payment details remain completely masked.",
    feature: "Masked User Handles, Ghost Landmark Pins, & Role-Based Cart Authorization",
    metric: "100% Zero-Leak Personal Address & Contact Masking Compliance"
  },
  {
    id: 6,
    threat: "Abuse of invitations or unwanted contact",
    threatCategory: "Platform Trust",
    threatImpact: "Spam group invites, random users hijacking public rooms, or unauthorized cart modification.",
    opportunity: "Verified Trusted Circles & Party Code Gatekeeping",
    strategy: "Host-enforced controls: groups require either a verified friend handshake or a rotating 6-digit party passkey. The host has instant kick/lock powers, and members can only edit their own personal cart slot.",
    feature: "Granular Member Isolation, Host Lock Button, & Anti-Spam Handle Registry",
    metric: "Zero Cart Tampering & 100% Host Moderation Control"
  },
  {
    id: 7,
    threat: "Dependency on third-party APIs and excessive platform fees",
    threatCategory: "Ecosystem Costs",
    threatImpact: "High commissions (25-30%) and reliance on opaque third-party aggregators eat away restaurant margins.",
    opportunity: "Direct Restaurant Open-Connect & 15% Group Volume Discount",
    strategy: "Restaurants gladly offer exclusive 15-20% group volume discounts because group orders yield 3x higher Average Order Value (AOV ~₹1,400 vs ₹380 for solo orders), slashing operational overhead per plate.",
    feature: "Direct Merchant Open-Connect Protocol & Automated Group Basket Discounts",
    metric: "3.2x Higher Basket Value & 15% Direct Consumer Group Savings"
  }
];

// Pre-seeded Birthday Party Event matching document Page 5:
export const initialGroupEvent = {
  id: "grp_bday_2026",
  groupCode: "BDAY26",
  name: "Rahul's 25th Birthday Bash! 🎂",
  hostUserId: "@rahul_host",
  hostName: "Rahul Verma",
  restaurantId: "rest_meghana",
  restaurantName: "Meghana Biryani & Royal Kitchen",
  deliveryAddress: "Penthouse 402, Green Glen Terraces, Bellandur, Bengaluru - 560103",
  landmarkOnly: "Green Glen Terraces, Bellandur (Host Landmark Pin)",
  deadline: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
  status: "open", // 'open', 'locked', 'checkout', 'completed'
  paymentMode: "host_pays", // 'host_pays' or 'split_itemized'
  memberIds: ["@rahul_host", "@ananya_foodie", "@vikram_burger", "@sneha_paneer", "@kabir_chicken"],
  carts: {
    "@rahul_host": {
      userId: "@rahul_host",
      userName: "Rahul Verma (Host)",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      isConfirmed: true,
      items: [
        { id: "m1", name: "Special Chicken Biryani", price: 340, quantity: 1, veg: false, notes: "Extra spicy salan please" },
        { id: "m6", name: "Gulab Jamun Warm (2 Pcs)", price: 80, quantity: 2, veg: true, notes: "Serve hot" }
      ]
    },
    "@ananya_foodie": {
      userId: "@ananya_foodie",
      userName: "Ananya Sharma (Friend 1)",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      isConfirmed: true,
      items: [
        { id: "m4", name: "Paneer 65 Crispy Fry", price: 250, quantity: 1, veg: true, notes: "Crispy with lemon wedge" },
        { id: "m5", name: "Butter Naan (2 Pcs)", price: 90, quantity: 1, veg: true, notes: "Warm" }
      ]
    },
    "@vikram_burger": {
      userId: "@vikram_burger",
      userName: "Vikram Malhotra (Friend 2)",
      userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
      isConfirmed: true,
      items: [
        { id: "m3", name: "Andhra Apollo Fish", price: 360, quantity: 1, veg: false, notes: "Extra crispy" }
      ]
    },
    "@sneha_paneer": {
      userId: "@sneha_paneer",
      userName: "Sneha Reddy (Friend 3)",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      isConfirmed: true,
      items: [
        { id: "m2", name: "Paneer Biryani Dum Pukht", price: 290, quantity: 1, veg: true, notes: "Mild spice, peanut free" }
      ]
    },
    "@kabir_chicken": {
      userId: "@kabir_chicken",
      userName: "Kabir Mehta (Friend 4)",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isConfirmed: true,
      items: [
        { id: "m1", name: "Special Chicken Biryani", price: 340, quantity: 1, veg: false, notes: "Regular spice" }
      ]
    }
  }
};
