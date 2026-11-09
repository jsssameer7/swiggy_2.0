import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { supabase, checkSupabaseConnection } from './supabase.js';
import { initialUsers, initialFriendships, initialRestaurants, swotOpportunities, initialGroupEvent } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory resilient state initialized from seed data
let users = [...initialUsers];
let friendships = [...initialFriendships];
let restaurants = [...initialRestaurants];
let groups = [initialGroupEvent];
let orders = [];

// ==========================================
// 1. SUPABASE STATUS & DATABASE ENDPOINTS
// ==========================================
app.get('/api/db/status', async (req, res) => {
  try {
    const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: groupsCount } = await supabase.from('groups').select('*', { count: 'exact', head: true });
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: cartsCount } = await supabase.from('group_carts').select('*', { count: 'exact', head: true });

    res.json({
      connected: true,
      tablesCreated: true,
      url: process.env.SUPABASE_URL,
      message: "Connected to live Supabase PostgreSQL database!",
      supabaseCounts: {
        users: usersCount ?? users.length,
        groups: groupsCount ?? groups.length,
        carts: cartsCount ?? Object.keys(groups[0]?.carts || {}).length,
        orders: ordersCount ?? orders.length
      }
    });
  } catch (err) {
    const status = await checkSupabaseConnection();
    res.json(status);
  }
});

// ==========================================
// 2. AUTHENTICATION & USERS
// ==========================================
app.post('/api/auth/register', (req, res) => {
  const { name, email, userId, dietary } = req.body;
  if (!name || !email || !userId) {
    return res.status(400).json({ error: 'Name, email, and Unique User ID are required' });
  }

  const cleanUserId = userId.startsWith('@') ? userId : `@${userId}`;
  const existing = users.find(u => u.email === email || u.userId.toLowerCase() === cleanUserId.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'User with this email or Swiggy ID already exists' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    userId: cleanUserId,
    name,
    email,
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUserId}`,
    preferences: {
      favouriteDishes: [],
      dietary: dietary || 'Non-Veg',
      allergies: []
    }
  };

  users.push(newUser);
  res.status(201).json({ user: newUser, token: `mock_jwt_${newUser.id}` });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier } = req.body; // Can be email or userId
  const user = users.find(u => 
    u.email.toLowerCase() === identifier?.toLowerCase() || 
    u.userId.toLowerCase() === identifier?.toLowerCase()
  );

  if (!user) {
    return res.status(404).json({ error: 'User not found. Try one of the demo users or register.' });
  }

  res.json({ user, token: `mock_jwt_${user.id}` });
});

app.get('/api/users/all', (req, res) => {
  res.json(users);
});

app.get('/api/users/me', (req, res) => {
  const userId = req.headers['x-user-id'] || '@rahul_host';
  const user = users.find(u => u.userId === userId) || users[0];
  res.json(user);
});

// ==========================================
// 3. FRIENDS NETWORK (PAGE 4)
// ==========================================
app.get('/api/friends', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const userFriendships = friendships.filter(
    f => (f.requesterId === currentUserId || f.recipientId === currentUserId) && f.status === 'accepted'
  );

  const friendIds = userFriendships.map(f => f.requesterId === currentUserId ? f.recipientId : f.requesterId);
  const friendProfiles = users.filter(u => friendIds.includes(u.userId));

  const pendingRequests = friendships
    .filter(f => f.recipientId === currentUserId && f.status === 'pending')
    .map(f => ({
      ...f,
      requester: users.find(u => u.userId === f.requesterId)
    }));

  res.json({
    friends: friendProfiles,
    pendingRequests
  });
});

app.post('/api/friends/requests', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const { targetUserId } = req.body;

  const cleanTarget = targetUserId?.startsWith('@') ? targetUserId : `@${targetUserId}`;
  const targetUser = users.find(u => u.userId.toLowerCase() === cleanTarget.toLowerCase());

  if (!targetUser) {
    return res.status(404).json({ error: 'No user found with this Swiggy ID' });
  }

  if (targetUser.userId === currentUserId) {
    return res.status(400).json({ error: 'You cannot add yourself as a friend' });
  }

  const existing = friendships.find(f => 
    (f.requesterId === currentUserId && f.recipientId === cleanTarget) ||
    (f.requesterId === cleanTarget && f.recipientId === currentUserId)
  );

  if (existing) {
    return res.status(400).json({ error: `Connection already exists with status: ${existing.status}` });
  }

  const newFriendship = {
    id: `fs_${Date.now()}`,
    requesterId: currentUserId,
    recipientId: cleanTarget,
    status: 'accepted' // Instant accept for smooth interactive demo
  };

  friendships.push(newFriendship);
  res.status(201).json({ message: `Connected with ${cleanTarget}!`, friendship: newFriendship });
});

// ==========================================
// 4. RESTAURANTS & MENUS
// ==========================================
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(restaurant);
});

// ==========================================
// 5. PARTY / EVENT GROUPS (PAGES 4, 5, 6)
// ==========================================
app.get('/api/groups', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  // Return groups where user is host or member
  const userGroups = groups.filter(g => g.hostUserId === currentUserId || g.memberIds.includes(currentUserId));
  res.json(userGroups);
});

app.post('/api/groups', (req, res) => {
  const hostUserId = req.headers['x-user-id'] || '@rahul_host';
  const hostUser = users.find(u => u.userId === hostUserId) || users[0];
  const { name, restaurantId, deliveryAddress, deadlineMinutes } = req.body;

  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
  const randomCode = 'SW' + Math.floor(1000 + Math.random() * 9000);
  const deadline = new Date(Date.now() + (deadlineMinutes || 45) * 60000).toISOString();

  const newGroup = {
    id: `grp_${Date.now()}`,
    groupCode: randomCode,
    name: name || `${hostUser.name}'s Food Party 🍕`,
    hostUserId: hostUser.userId,
    hostName: hostUser.name,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    deliveryAddress: deliveryAddress || '102 Embassy Tech Village, Outer Ring Rd, Bengaluru',
    landmarkOnly: 'Embassy Tech Village, Outer Ring Rd (Common Landmark Pin)',
    deadline,
    status: 'open',
    paymentMode: 'host_pays',
    memberIds: [hostUser.userId],
    carts: {
      [hostUser.userId]: {
        userId: hostUser.userId,
        userName: hostUser.name,
        userAvatar: hostUser.avatarUrl,
        isConfirmed: false,
        items: []
      }
    }
  };

  groups.unshift(newGroup);
  res.status(201).json(newGroup);
});

app.get('/api/groups/:id', (req, res) => {
  const group = groups.find(g => g.id === req.params.id || g.groupCode === req.params.id.toUpperCase());
  if (!group) return res.status(404).json({ error: 'Group room not found' });

  // Calculate combined totals
  let subtotal = 0;
  let totalItemsCount = 0;
  const memberCarts = Object.values(group.carts || {});

  memberCarts.forEach(cart => {
    cart.items.forEach(item => {
      subtotal += item.price * item.quantity;
      totalItemsCount += item.quantity;
    });
  });

  const restaurant = restaurants.find(r => r.id === group.restaurantId) || restaurants[0];
  const discountPct = restaurant.groupDiscountPct || 15;
  const groupDiscount = Math.round(subtotal * (discountPct / 100));
  const tax = Math.round((subtotal - groupDiscount) * 0.05); // 5% GST
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const totalAmount = subtotal - groupDiscount + tax + deliveryFee;

  res.json({
    ...group,
    pricing: {
      subtotal,
      groupDiscount,
      discountPct,
      tax,
      deliveryFee,
      totalAmount,
      totalItemsCount
    }
  });
});

app.post('/api/groups/:id/join', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const currentUser = users.find(u => u.userId === currentUserId) || users[0];
  const group = groups.find(g => g.id === req.params.id || g.groupCode === req.params.id.toUpperCase());

  if (!group) return res.status(404).json({ error: 'Group room not found' });

  if (group.status !== 'open') {
    return res.status(400).json({ error: `Group is currently ${group.status}. No new members can join.` });
  }

  if (!group.memberIds.includes(currentUser.userId)) {
    group.memberIds.push(currentUser.userId);
  }

  if (!group.carts[currentUser.userId]) {
    group.carts[currentUser.userId] = {
      userId: currentUser.userId,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      isConfirmed: false,
      items: []
    };
  }

  res.json({ message: 'Successfully joined group!', group });
});

// Update an individual member's cart inside the group
app.put('/api/groups/:id/cart', async (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const { items, isConfirmed } = req.body;
  const group = groups.find(g => g.id === req.params.id);

  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status === 'locked' || group.status === 'checkout') {
    return res.status(400).json({ error: 'Cart is locked by the host for checkout. No modifications allowed.' });
  }

  const currentUser = users.find(u => u.userId === currentUserId) || users[0];

  group.carts[currentUserId] = {
    userId: currentUserId,
    userName: currentUser.name,
    userAvatar: currentUser.avatarUrl,
    isConfirmed: isConfirmed !== undefined ? isConfirmed : (group.carts[currentUserId]?.isConfirmed || false),
    items: items || []
  };

  // Asynchronously persist cart update to Supabase
  try {
    const { data: grp } = await supabase.from('groups').select('id').eq('group_code', group.groupCode).single();
    if (grp) {
      await supabase.from('group_carts').upsert({
        group_id: grp.id,
        user_id: currentUserId,
        user_name: currentUser.name,
        items: items || [],
        is_confirmed: isConfirmed || false
      });
    }
  } catch (err) {
    console.warn('Supabase cart async sync note:', err.message);
  }

  res.json({ message: 'Personal cart updated', cart: group.carts[currentUserId] });
});

// Host locks cart or unlocks
app.patch('/api/groups/:id/lock', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  if (group.hostUserId !== currentUserId) {
    return res.status(403).json({ error: 'Only the event host can lock/unlock the group cart' });
  }

  const { locked } = req.body;
  group.status = locked ? 'locked' : 'open';
  res.json({ message: `Group cart is now ${group.status}`, status: group.status });
});

// Host checkout - consolidated order creation
app.post('/api/groups/:id/checkout', async (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const group = groups.find(g => g.id === req.params.id);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  if (group.hostUserId !== currentUserId) {
    return res.status(403).json({ error: 'Only the host has permissions to checkout and place the order' });
  }

  const { paymentMode } = req.body; // 'host_pays' or 'split_itemized'
  group.paymentMode = paymentMode || 'host_pays';

  // Consolidate member items
  const memberSummary = [];
  const allItems = [];
  let subtotal = 0;

  Object.values(group.carts).forEach(memberCart => {
    let memberTotal = 0;
    memberCart.items.forEach(item => {
      const lineTotal = item.price * item.quantity;
      memberTotal += lineTotal;
      subtotal += lineTotal;
      allItems.push({
        ...item,
        orderedBy: memberCart.userName,
        orderedById: memberCart.userId
      });
    });

    memberSummary.push({
      userId: memberCart.userId,
      userName: memberCart.userName,
      userAvatar: memberCart.userAvatar,
      itemsCount: memberCart.items.reduce((acc, i) => acc + i.quantity, 0),
      individualTotal: memberTotal,
      paidStatus: paymentMode === 'host_pays' ? 'Host Paid (Gifting)' : 'Paid via UPI Split-Shield'
    });
  });

  if (allItems.length === 0) {
    return res.status(400).json({ error: 'Group cart is empty. Add food items before checkout.' });
  }

  const restaurant = restaurants.find(r => r.id === group.restaurantId) || restaurants[0];
  const discountPct = restaurant.groupDiscountPct || 15;
  const groupDiscount = Math.round(subtotal * (discountPct / 100));
  const tax = Math.round((subtotal - groupDiscount) * 0.05);
  const deliveryFee = 0; // Group promo: Free delivery for groups!
  const totalAmount = subtotal - groupDiscount + tax + deliveryFee;

  const newOrder = {
    id: `ord_${Date.now()}`,
    groupId: group.id,
    groupName: group.name,
    hostUserId: group.hostUserId,
    hostName: group.hostName,
    restaurantName: group.restaurantName,
    deliveryAddress: group.deliveryAddress,
    items: allItems,
    memberSummary,
    subtotal,
    groupDiscount,
    tax,
    deliveryFee,
    totalAmount,
    paymentMode: group.paymentMode,
    paymentStatus: 'paid_verified',
    orderStatus: 'confirmed', // 'confirmed' -> 'preparing' -> 'out_for_delivery' -> 'delivered'
    etaMinutes: 28,
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  group.status = 'completed';

  // Persist order to Supabase orders table
  try {
    supabase.from('orders').insert({
      group_name: newOrder.groupName,
      host_user_id: newOrder.hostUserId,
      total_amount: newOrder.totalAmount,
      payment_status: newOrder.paymentStatus,
      order_status: newOrder.orderStatus
    }).then(({ data, error }) => {
      if (error) console.warn('Supabase order insert note:', error.message);
      else console.log('✅ Order persisted to Supabase PostgreSQL orders table!');
    });
  } catch (err) {
    console.warn('Supabase order error:', err.message);
  }

  res.status(201).json({
    message: 'Order placed successfully! Delivery coordinated to shared address.',
    order: newOrder
  });
});

// ==========================================
// 6. ORDERS & REAL-TIME TRACKING (PAGE 6, 11)
// ==========================================
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/orders', (req, res) => {
  const currentUserId = req.headers['x-user-id'] || '@rahul_host';
  const userOrders = orders.filter(o => 
    o.hostUserId === currentUserId || 
    o.memberSummary?.some(m => m.userId === currentUserId)
  );
  res.json(userOrders.length ? userOrders : orders);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const { status } = req.body;
  const validStatuses = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Choose from: ${validStatuses.join(', ')}` });
  }

  order.orderStatus = status;
  if (status === 'out_for_delivery') order.etaMinutes = 12;
  if (status === 'delivered') order.etaMinutes = 0;

  res.json({ message: `Order status updated to ${status}`, order });
});

// ==========================================
// 7. SWOT: THREATS TO OPPORTUNITIES ENGINE
// ==========================================
app.get('/api/swot-opportunities', (req, res) => {
  res.json({
    title: "SWOT Transformation: From Vulnerability to Competitive Advantage",
    subtitle: "How Swiggy 2.0 systematically conquered every threat outlined in the proposal document into an industry-first feature.",
    data: swotOpportunities
  });
});

// Serve frontend dist for complete unified full-stack hosting
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Swiggy 2.0 Backend & Unified Website running on port ${PORT}`);
  console.log(`📡 Supabase configured for URL: ${process.env.SUPABASE_URL}`);
});
