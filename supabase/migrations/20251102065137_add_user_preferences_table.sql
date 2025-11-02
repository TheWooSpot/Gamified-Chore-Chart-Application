/*
  # Add user preferences table

  1. New Tables
    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users table)
      - `theme_preference` (text, either 'dark' or 'light', default 'dark')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `user_preferences` table
    - Add policy for authenticated users to read their own preferences
    - Add policy for authenticated users to insert their own preferences
    - Add policy for authenticated users to update their own preferences

  3. Notes
    - User preferences are stored to provide cross-device theme synchronization
    - For non-authenticated users, theme preference is stored in localStorage only
    - The theme_preference column defaults to 'dark' to match the application default
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  theme_preference text DEFAULT 'dark' CHECK (theme_preference IN ('dark', 'light')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_user_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_user_preferences_updated_at();
