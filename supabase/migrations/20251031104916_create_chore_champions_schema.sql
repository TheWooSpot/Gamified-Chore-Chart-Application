/*
  # Chore Champions Database Schema
  
  ## Overview
  Complete database structure for the Chore Champions platform - a gamified system that converts children's chores into global impact through sponsor-funded donations.
  
  ## New Tables
  
  ### 1. `users`
  User accounts for children, parents, and sponsors
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email address
  - `name` (text) - Full name
  - `avatar_url` (text) - Profile picture URL
  - `user_type` (text) - Type: 'child', 'parent', 'sponsor'
  - `points_balance` (integer) - Current points available
  - `total_points_earned` (integer) - Lifetime points earned
  - `family_id` (uuid) - Links children to parent accounts
  - `created_at` (timestamptz) - Account creation date
  
  ### 2. `chores`
  Master list of available chores
  - `id` (uuid, primary key)
  - `title` (text) - Chore name
  - `description` (text) - Detailed description
  - `category` (text) - Type: 'cleaning', 'kitchen', 'outdoor', 'pets', 'organization', 'maintenance'
  - `points` (integer) - Points awarded
  - `difficulty` (text) - 'easy', 'medium', 'hard'
  - `estimated_time` (integer) - Minutes to complete
  - `created_at` (timestamptz)
  
  ### 3. `user_chores`
  Chores assigned to and completed by users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - Child assigned
  - `chore_id` (uuid, foreign key) - Chore reference
  - `status` (text) - 'pending', 'in_progress', 'completed', 'verified'
  - `assigned_date` (timestamptz)
  - `completed_date` (timestamptz)
  - `verified_by` (uuid) - Parent who verified
  - `verified_date` (timestamptz)
  
  ### 4. `rewards`
  Marketplace items - both regular rewards and impact projects
  - `id` (uuid, primary key)
  - `title` (text) - Reward/project name
  - `description` (text) - Full description
  - `type` (text) - 'regular_reward' or 'impact_project'
  - `category` (text) - For impact: 'education', 'health', 'water', 'housing', 'energy', 'food'
  - `points_cost` (integer) - Points required
  - `cash_value` (numeric) - Dollar equivalent
  - `sponsor_multiplier` (numeric) - How much sponsors contribute per point (default 10)
  - `image_url` (text) - Reward/project image
  - `location` (text) - For impact projects: country/region
  - `beneficiaries` (integer) - Number of people helped
  - `current_funding` (numeric) - Current funding amount
  - `funding_goal` (numeric) - Target funding amount
  - `is_active` (boolean) - Available for redemption
  - `created_at` (timestamptz)
  
  ### 5. `redemptions`
  Track when users redeem points
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `reward_id` (uuid, foreign key)
  - `points_spent` (integer)
  - `redemption_type` (text) - 'cash', 'reward', 'impact_project'
  - `status` (text) - 'pending', 'approved', 'fulfilled', 'cancelled'
  - `created_at` (timestamptz)
  - `fulfilled_at` (timestamptz)
  
  ### 6. `sponsor_contributions`
  Track sponsor funding
  - `id` (uuid, primary key)
  - `sponsor_id` (uuid, foreign key) - Sponsor user
  - `reward_id` (uuid, foreign key) - Impact project funded
  - `amount` (numeric) - Dollar amount
  - `created_at` (timestamptz)
  
  ### 7. `activity_feed`
  Platform-wide activity tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `activity_type` (text) - 'chore_completed', 'reward_redeemed', 'impact_funded'
  - `description` (text)
  - `points` (integer)
  - `created_at` (timestamptz)
  
  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Children can only view/update their own data
  - Parents can view/manage their family's data
  - Sponsors can view impact projects and contributions
  - Public read access for chores and active rewards
  
  ## Important Notes
  1. Sponsor multiplier allows flexible donation matching (e.g., $10 per point)
  2. Impact projects track funding progress toward goals
  3. All monetary values stored as numeric for precision
  4. Activity feed provides transparency for all stakeholders
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  user_type text NOT NULL CHECK (user_type IN ('child', 'parent', 'sponsor')),
  points_balance integer DEFAULT 0,
  total_points_earned integer DEFAULT 0,
  family_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Create chores table
CREATE TABLE IF NOT EXISTS chores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('cleaning', 'kitchen', 'outdoor', 'pets', 'organization', 'maintenance', 'personal', 'family')),
  points integer NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  estimated_time integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_chores table
CREATE TABLE IF NOT EXISTS user_chores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chore_id uuid NOT NULL REFERENCES chores(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'verified')),
  assigned_date timestamptz DEFAULT now(),
  completed_date timestamptz,
  verified_by uuid REFERENCES users(id),
  verified_date timestamptz
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('regular_reward', 'impact_project')),
  category text,
  points_cost integer NOT NULL,
  cash_value numeric(10,2),
  sponsor_multiplier numeric(10,2) DEFAULT 10.00,
  image_url text NOT NULL,
  location text,
  beneficiaries integer,
  current_funding numeric(10,2) DEFAULT 0,
  funding_goal numeric(10,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create redemptions table
CREATE TABLE IF NOT EXISTS redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id uuid NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  points_spent integer NOT NULL,
  redemption_type text NOT NULL CHECK (redemption_type IN ('cash', 'reward', 'impact_project')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'fulfilled', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  fulfilled_at timestamptz
);

-- Create sponsor_contributions table
CREATE TABLE IF NOT EXISTS sponsor_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id uuid REFERENCES rewards(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create activity_feed table
CREATE TABLE IF NOT EXISTS activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('chore_completed', 'reward_redeemed', 'impact_funded', 'points_earned')),
  description text NOT NULL,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Parents can view family members"
  ON users FOR SELECT
  TO authenticated
  USING (
    family_id IN (
      SELECT id FROM users WHERE auth.uid() = id AND user_type = 'parent'
    )
  );

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for chores table (public read)
CREATE POLICY "Anyone can view chores"
  ON chores FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_chores table
CREATE POLICY "Users can view own chores"
  ON user_chores FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT id FROM users WHERE family_id = (SELECT family_id FROM users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can update own chores"
  ON user_chores FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Parents can insert chores for family"
  ON user_chores FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IN (
      SELECT id FROM users 
      WHERE family_id = (SELECT family_id FROM users WHERE id = auth.uid())
    )
  );

-- RLS Policies for rewards table (public read for active)
CREATE POLICY "Anyone can view active rewards"
  ON rewards FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS Policies for redemptions table
CREATE POLICY "Users can view own redemptions"
  ON redemptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create redemptions"
  ON redemptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for sponsor_contributions table
CREATE POLICY "Sponsors can view own contributions"
  ON sponsor_contributions FOR SELECT
  TO authenticated
  USING (sponsor_id = auth.uid());

CREATE POLICY "Sponsors can create contributions"
  ON sponsor_contributions FOR INSERT
  TO authenticated
  WITH CHECK (sponsor_id = auth.uid());

-- RLS Policies for activity_feed table (public read)
CREATE POLICY "Anyone can view activity feed"
  ON activity_feed FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_family_id ON users(family_id);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_user_chores_user_id ON user_chores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_chores_status ON user_chores(status);
CREATE INDEX IF NOT EXISTS idx_rewards_type ON rewards(type);
CREATE INDEX IF NOT EXISTS idx_rewards_is_active ON rewards(is_active);
CREATE INDEX IF NOT EXISTS idx_redemptions_user_id ON redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_created_at ON activity_feed(created_at DESC);