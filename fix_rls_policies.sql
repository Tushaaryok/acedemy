-- RLS Policies for Enquiries Table
-- To be executed in Supabase SQL Editor

-- 1. Allow Public (Anon) to insert enquiries from the landing page
CREATE POLICY "Enable public access to insert enquiries"
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. Allow Admins to see all enquiries
CREATE POLICY "Enable admin selection for enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 3. Allow Admins to update enquiry status
CREATE POLICY "Enable admin updates for enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Allow Admins to delete entries if needed
CREATE POLICY "Enable admin deletion for enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);
