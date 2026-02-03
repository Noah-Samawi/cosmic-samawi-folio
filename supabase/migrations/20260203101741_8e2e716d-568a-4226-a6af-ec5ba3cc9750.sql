-- Reset RLS + enable zero-friction public reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Remove existing policies (if any)
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Only approved reviews are visible" ON public.reviews;
DROP POLICY IF EXISTS "Public can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;

-- Temporary auto-approve so new reviews show up immediately
ALTER TABLE public.reviews ALTER COLUMN is_approved SET DEFAULT true;

-- Auto-approve existing rows too
UPDATE public.reviews
SET is_approved = true
WHERE is_approved IS DISTINCT FROM true;

-- Allow anyone (including anon) to submit a review
CREATE POLICY "Public can submit reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (true);

-- Allow anyone to read only approved reviews
CREATE POLICY "Public can read approved reviews"
ON public.reviews
FOR SELECT
TO public
USING (is_approved = true);
