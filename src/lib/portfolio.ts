import { supabase } from "@/integrations/supabase/client";

export interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  category: string;
  subcategory: string | null;
  storage_path: string | null;
  uploaded_at: string;
  displayUrl?: string;
}

const BUCKET = "portfolio";

async function withSignedUrl(row: PortfolioImage): Promise<PortfolioImage> {
  if (row.storage_path) {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(row.storage_path, 60 * 60 * 24 * 7);
    return { ...row, displayUrl: data?.signedUrl ?? row.url };
  }
  return { ...row, displayUrl: row.url };
}

export async function listPortfolio(): Promise<PortfolioImage[]> {
  const { data, error } = await (supabase as any)
    .from("portfolio_images")
    .select("*")
    .order("uploaded_at", { ascending: false });
  if (error) throw error;
  return Promise.all((data as PortfolioImage[]).map(withSignedUrl));
}

export async function uploadPortfolio(file: File, title: string, category: string, subcategory?: string | null): Promise<void> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
  if (upErr) throw upErr;
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const { error } = await (supabase as any).from("portfolio_images").insert({
    url: pub.publicUrl,
    title,
    category,
    subcategory: subcategory || null,
    storage_path: path,
  });
  if (error) throw error;
}

export async function deletePortfolio(item: PortfolioImage): Promise<void> {
  if (item.storage_path) {
    await supabase.storage.from(BUCKET).remove([item.storage_path]);
  }
  const { error } = await (supabase as any).from("portfolio_images").delete().eq("id", item.id);
  if (error) throw error;
}
