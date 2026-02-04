-- Create RPC function to increment visitor count atomically
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.visitor_stats
  SET visitor_count = visitor_count + 1,
      last_updated = now()
  WHERE id = (SELECT id FROM public.visitor_stats LIMIT 1)
  RETURNING visitor_count INTO new_count;
  
  -- If no row exists, create one
  IF new_count IS NULL THEN
    INSERT INTO public.visitor_stats (visitor_count)
    VALUES (1251)
    RETURNING visitor_count INTO new_count;
  END IF;
  
  RETURN new_count;
END;
$$;