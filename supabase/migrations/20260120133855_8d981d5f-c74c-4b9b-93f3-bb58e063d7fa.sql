-- Drop the overly permissive INSERT policy and create a restrictive one
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;

-- Create a proper INSERT policy without overly permissive WITH CHECK
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (
  -- Ensure required fields are not empty
  name IS NOT NULL AND name <> '' AND
  email IS NOT NULL AND email <> '' AND
  message IS NOT NULL AND message <> ''
);