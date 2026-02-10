import { supabaseBrowser } from "@/lib/supabaseBrowser"

export function getPublicImage(path?: string | null) {
  if (!path) return "/images/chevroletcar.jpg"

  // already full URL
  if (path.startsWith("http")) return path

  const { data } = supabaseBrowser
    .storage
    .from("images")
    .getPublicUrl(path)

  return data.publicUrl || "/images/chevroletcar.jpg"
}
