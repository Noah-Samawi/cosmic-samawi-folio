-- Create explicit DENY policies for UPDATE and DELETE on contact_messages
CREATE POLICY "No public update access to messages"
ON public.contact_messages
FOR UPDATE
USING (false);

CREATE POLICY "No public delete access to messages"
ON public.contact_messages
FOR DELETE
USING (false);