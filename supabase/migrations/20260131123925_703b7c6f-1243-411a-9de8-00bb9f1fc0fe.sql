-- Create reviews table for visitor testimonials
CREATE TABLE public.reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (
    name IS NOT NULL AND 
    name <> '' AND 
    message IS NOT NULL AND 
    message <> '' AND
    rating >= 1 AND 
    rating <= 5
);

-- Only approved reviews are publicly visible
CREATE POLICY "Only approved reviews are visible"
ON public.reviews
FOR SELECT
USING (is_approved = true);

-- Create visitor_stats table for visitor counter
CREATE TABLE public.visitor_stats (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_count INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can read visitor count
CREATE POLICY "Anyone can read visitor stats"
ON public.visitor_stats
FOR SELECT
USING (true);

-- Insert initial visitor count row
INSERT INTO public.visitor_stats (visitor_count) VALUES (1250);