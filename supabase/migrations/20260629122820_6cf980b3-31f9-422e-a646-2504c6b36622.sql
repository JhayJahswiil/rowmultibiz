
CREATE POLICY "Public read portfolio bucket" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Public upload portfolio bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Public delete portfolio bucket" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');
