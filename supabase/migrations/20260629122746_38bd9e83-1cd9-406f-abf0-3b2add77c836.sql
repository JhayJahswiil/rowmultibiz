
CREATE TABLE public.portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  storage_path text,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_images TO authenticated;
GRANT ALL ON public.portfolio_images TO service_role;
-- Admin panel is password-gated client-side, so allow public CRUD via anon
GRANT INSERT, DELETE ON public.portfolio_images TO anon;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view portfolio" ON public.portfolio_images FOR SELECT USING (true);
CREATE POLICY "Anyone can insert portfolio (admin gated client-side)" ON public.portfolio_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete portfolio (admin gated client-side)" ON public.portfolio_images FOR DELETE USING (true);

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
