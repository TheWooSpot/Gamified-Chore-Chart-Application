/*
  # Fix Database Security and Performance Issues

  1. Add Missing Indexes on Foreign Keys
    - Add index on activity_feed.user_id
    - Add index on redemptions.reward_id
    - Add index on sponsor_contributions.reward_id
    - Add index on sponsor_contributions.sponsor_id
    - Add index on user_chores.chore_id
    - Add index on user_chores.verified_by

  2. Optimize RLS Policies with SELECT Subqueries
    - Update all policies using auth.uid() to use (select auth.uid())
    - This prevents re-evaluation of auth functions for each row
    - Significantly improves query performance at scale

  3. Fix Function Search Path
    - Set search path for update_user_preferences_updated_at function

  4. Remove Duplicate/Unused RLS Policies
    - Drop duplicate "Public can view chores" policy
    - Keep only necessary policies for each table

  5. Notes
    - Indexes on foreign keys improve JOIN and WHERE clause performance
    - RLS optimization prevents function re-evaluation per row
    - Setting search_path prevents security vulnerabilities
*/

-- Add indexes on foreign keys for better query performance
CREATE INDEX IF NOT EXISTS idx_activity_feed_user_id ON activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_reward_id ON redemptions(reward_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_contributions_reward_id ON sponsor_contributions(reward_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_contributions_sponsor_id ON sponsor_contributions(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_user_chores_chore_id ON user_chores(chore_id);
CREATE INDEX IF NOT EXISTS idx_user_chores_verified_by ON user_chores(verified_by);

-- Drop duplicate/conflicting policies
DROP POLICY IF EXISTS "Public can view chores" ON chores;

-- Recreate optimized RLS policies for users table
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Parents can view family members" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Parents can view family members"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users parent
      WHERE parent.id = (select auth.uid())
      AND parent.family_id = users.family_id
      AND parent.user_type = 'parent'
    )
  );

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Recreate optimized RLS policies for user_chores table
DROP POLICY IF EXISTS "Users can view own chores" ON user_chores;
DROP POLICY IF EXISTS "Users can update own chores" ON user_chores;
DROP POLICY IF EXISTS "Parents can insert chores for family" ON user_chores;

CREATE POLICY "Users can view own chores"
  ON user_chores FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own chores"
  ON user_chores FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Parents can insert chores for family"
  ON user_chores FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users parent
      WHERE parent.id = (select auth.uid())
      AND parent.user_type = 'parent'
      AND parent.family_id IN (
        SELECT family_id FROM users WHERE id = user_chores.user_id
      )
    )
  );

-- Recreate optimized RLS policies for redemptions table
DROP POLICY IF EXISTS "Users can view own redemptions" ON redemptions;
DROP POLICY IF EXISTS "Users can create redemptions" ON redemptions;

CREATE POLICY "Users can view own redemptions"
  ON redemptions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create redemptions"
  ON redemptions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- Recreate optimized RLS policies for sponsor_contributions table
DROP POLICY IF EXISTS "Sponsors can view own contributions" ON sponsor_contributions;
DROP POLICY IF EXISTS "Sponsors can create contributions" ON sponsor_contributions;

CREATE POLICY "Sponsors can view own contributions"
  ON sponsor_contributions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = sponsor_id);

CREATE POLICY "Sponsors can create contributions"
  ON sponsor_contributions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = sponsor_id);

-- Recreate optimized RLS policies for user_preferences table
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Fix function search path for security
DROP TRIGGER IF EXISTS user_preferences_updated_at ON user_preferences;
DROP FUNCTION IF EXISTS update_user_preferences_updated_at();

CREATE OR REPLACE FUNCTION update_user_preferences_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_user_preferences_updated_at();
