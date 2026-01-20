-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.contact_messages;

-- Create a restrictive SELECT policy (no one can read messages via public API)
CREATE POLICY "No public read access to messages"
ON public.contact_messages
FOR SELECT
USING (false);