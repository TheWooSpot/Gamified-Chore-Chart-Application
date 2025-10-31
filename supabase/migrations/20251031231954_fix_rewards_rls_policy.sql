/*
  # Fix Rewards RLS Policy for Public Access

  1. Changes
    - Drop the existing authenticated-only policy
    - Create new policy allowing public (anon) access to view active rewards
    - This allows the marketplace to display rewards without authentication

  2. Security
    - Only SELECT operations are allowed publicly
    - Only active rewards (is_active = true) are visible
    - INSERT, UPDATE, DELETE still require authentication
*/

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view active rewards" ON rewards;

-- Create new public policy for viewing active rewards
CREATE POLICY "Public can view active rewards"
  ON rewards
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
