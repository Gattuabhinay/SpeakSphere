/*
RUN THIS SQL IN SUPABASE SQL EDITOR:

ALTER TABLE register 
  ADD COLUMN IF NOT EXISTS registration_id 
  text UNIQUE,
  ADD COLUMN IF NOT EXISTS status 
  text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS preferred_domain 
  text;

ALTER TABLE register 
  ADD CONSTRAINT IF NOT EXISTS txn_unique 
  UNIQUE (transaction_id);
*/
