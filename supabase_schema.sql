-- ==========================================================
-- SWIGGY 2.0: SOCIAL FOOD ORDERING & GROUP DELIVERY PLATFORM
-- Supabase PostgreSQL Schema Definition
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(50) UNIQUE NOT NULL,      -- Shareable ID like @rahul_foodie
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT,
    phone VARCHAR(20),
    avatar_url TEXT,
    preferences JSONB DEFAULT '{"favourite_dishes": [], "dietary": "Non-Veg", "allergies": []}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active'
);

-- 3. FRIENDSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id VARCHAR(50) NOT NULL,
    recipient_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',     -- 'pending', 'accepted', 'rejected'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESTAURANTS & MENUS TABLE
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    cuisine TEXT[] DEFAULT ARRAY['North Indian', 'Biryani'],
    rating NUMERIC(2, 1) DEFAULT 4.5,
    delivery_time VARCHAR(30) DEFAULT '25-35 mins',
    price_range VARCHAR(10) DEFAULT '₹₹',
    image_url TEXT,
    address TEXT,
    is_open BOOLEAN DEFAULT true,
    group_discount_pct INTEGER DEFAULT 15,
    menu JSONB NOT NULL DEFAULT '[]'
);

-- 5. GROUPS (PARTY / EVENT ROOMS)
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_code VARCHAR(20) UNIQUE NOT NULL,   -- e.g. BDAY2026, SWIGGY44
    name VARCHAR(120) NOT NULL,
    host_user_id VARCHAR(50) NOT NULL,
    host_name VARCHAR(100) NOT NULL,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
    restaurant_name VARCHAR(120),
    delivery_address TEXT NOT NULL,
    deadline TIMESTAMPTZ,
    status VARCHAR(30) DEFAULT 'open',        -- 'open', 'locked', 'checkout', 'completed', 'cancelled'
    payment_mode VARCHAR(30) DEFAULT 'host_pays', -- 'host_pays', 'split_equal', 'split_itemized'
    member_ids JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GROUP CARTS (MEMBER-SPECIFIC CARTS IN A SHARED GROUP)
CREATE TABLE IF NOT EXISTS public.group_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_avatar TEXT,
    items JSONB DEFAULT '[]',
    is_confirmed BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_group_user UNIQUE (group_id, user_id)
);

-- 7. ORDERS TABLE (IMMUTABLE POST-CHECKOUT CONSOLIDATED ORDER)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID,
    group_name VARCHAR(120),
    host_user_id VARCHAR(50) NOT NULL,
    host_name VARCHAR(100) NOT NULL,
    restaurant_name VARCHAR(120),
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    member_summary JSONB NOT NULL DEFAULT '[]',
    subtotal NUMERIC(10, 2) NOT NULL,
    tax NUMERIC(10, 2) NOT NULL,
    delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
    group_discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_mode VARCHAR(30) DEFAULT 'host_pays',
    payment_status VARCHAR(30) DEFAULT 'paid',
    order_status VARCHAR(30) DEFAULT 'confirmed', -- 'confirmed', 'preparing', 'out_for_delivery', 'delivered'
    eta_minutes INTEGER DEFAULT 35,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SWOT: THREATS CONVERTED TO OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.swot_opportunities (
    id SERIAL PRIMARY KEY,
    threat_title VARCHAR(150) NOT NULL,
    threat_description TEXT NOT NULL,
    opportunity_title VARCHAR(150) NOT NULL,
    opportunity_strategy TEXT NOT NULL,
    implemented_feature VARCHAR(150) NOT NULL,
    status VARCHAR(50) DEFAULT 'Live in Swiggy 2.0'
);

-- Row Level Security (RLS) - Enable permissive public access for prototype testing
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swot_opportunities ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  CREATE POLICY "Public Read Access" ON public.users FOR SELECT USING (true);
  CREATE POLICY "Public Insert Access" ON public.users FOR INSERT WITH CHECK (true);
  CREATE POLICY "Public Update Access" ON public.users FOR UPDATE USING (true);

  CREATE POLICY "Public Read Friends" ON public.friendships FOR ALL USING (true);
  CREATE POLICY "Public Read Restaurants" ON public.restaurants FOR ALL USING (true);
  CREATE POLICY "Public Read Groups" ON public.groups FOR ALL USING (true);
  CREATE POLICY "Public Read GroupCarts" ON public.group_carts FOR ALL USING (true);
  CREATE POLICY "Public Read Orders" ON public.orders FOR ALL USING (true);
  CREATE POLICY "Public Read SWOT" ON public.swot_opportunities FOR ALL USING (true);
EXCEPTION WHEN OTHERS THEN 
  NULL;
END $$;
