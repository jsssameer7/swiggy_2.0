import { supabase } from './supabase.js';
import { initialUsers, initialGroupEvent } from './seedData.js';

export async function syncAllWithSupabase() {
  console.log('🔄 Syncing full Swiggy 2.0 dataset to Supabase...');

  // 1. Sync Users
  for (const user of initialUsers) {
    try {
      await supabase.from('users').upsert({
        user_id: user.userId,
        name: user.name,
        email: user.email,
        preferences: user.preferences
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('User sync warning for', user.userId, e.message);
    }
  }

  // 2. Sync Group Event
  let groupId = null;
  try {
    const { data: grpData } = await supabase.from('groups').upsert({
      group_code: initialGroupEvent.groupCode,
      name: initialGroupEvent.name,
      host_user_id: initialGroupEvent.hostUserId,
      host_name: initialGroupEvent.hostName,
      restaurant_name: initialGroupEvent.restaurantName,
      delivery_address: initialGroupEvent.deliveryAddress,
      status: initialGroupEvent.status,
      payment_mode: initialGroupEvent.paymentMode
    }, { onConflict: 'group_code' }).select();

    if (grpData && grpData[0]) {
      groupId = grpData[0].id;
    }
  } catch (e) {
    console.warn('Group sync warning:', e.message);
  }

  // 3. Sync Group Carts
  if (groupId) {
    for (const [userId, cart] of Object.entries(initialGroupEvent.carts)) {
      try {
        await supabase.from('group_carts').upsert({
          group_id: groupId,
          user_id: cart.userId,
          user_name: cart.userName,
          items: cart.items,
          is_confirmed: cart.isConfirmed
        });
      } catch (e) {
        console.warn('Cart sync warning for', userId, e.message);
      }
    }
  }

  console.log('✅ Supabase database synchronized successfully with live data!');
}

syncAllWithSupabase();
