/*
  # Fix Chores RLS Policy for Public Access

  1. Changes
    - Create policy allowing public (anon) access to view chores
    - This allows the app to display chores without authentication

  2. Security
    - Only SELECT operations are allowed publicly
    - INSERT, UPDATE, DELETE require authentication (parents/admins)
*/

CREATE POLICY "Public can view chores"
  ON chores
  FOR SELECT
  TO anon, authenticated
  USING (true);
