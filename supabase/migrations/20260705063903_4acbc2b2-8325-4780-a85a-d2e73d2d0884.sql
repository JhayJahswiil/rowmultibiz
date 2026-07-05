-- 1. Roles enum + user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security-definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Users can read their own roles; admins can read all
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Tighten portfolio_images RLS: public reads stay, admin-only writes
DROP POLICY IF EXISTS "Anyone can insert portfolio (admin gated client-side)" ON public.portfolio_images;
DROP POLICY IF EXISTS "Anyone can delete portfolio (admin gated client-side)" ON public.portfolio_images;

CREATE POLICY "Admins insert portfolio" ON public.portfolio_images
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update portfolio" ON public.portfolio_images
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete portfolio" ON public.portfolio_images
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Bookings: keep public INSERT, add admin SELECT/UPDATE/DELETE
CREATE POLICY "Admins read bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete bookings" ON public.bookings
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;

-- 4. Contact submissions: keep public INSERT, add admin SELECT/UPDATE/DELETE
CREATE POLICY "Admins read contacts" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update contacts" ON public.contact_submissions
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete contacts" ON public.contact_submissions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, UPDATE, DELETE ON public.contact_submissions TO authenticated;

-- 5. Storage: portfolio bucket — public read stays, admin-only writes
DROP POLICY IF EXISTS "Public can view portfolio storage" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to portfolio" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete portfolio storage" ON storage.objects;

CREATE POLICY "Public read portfolio storage" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'portfolio');

CREATE POLICY "Admins upload portfolio storage" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update portfolio storage" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete portfolio storage" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
