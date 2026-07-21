import { getSupabaseAdmin, jsonError, throwIfSupabaseError } from "@/lib/supabase-admin";

const bucket = "hotel-images";
const maxFileSize = 8 * 1024 * 1024;
const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const roomSlug = String(form.get("roomSlug") || "");
    const kind = String(form.get("kind") || "gallery");
    const files = form.getAll("files").filter((item): item is File => typeof item !== "string" && item.size > 0);

    if (!/^[a-z0-9-]+$/.test(roomSlug)) return Response.json({ error: "Choose a valid room category." }, { status: 400 });
    if (kind !== "featured" && kind !== "gallery") return Response.json({ error: "Choose featured or gallery images." }, { status: 400 });
    if (!files.length) return Response.json({ error: "Choose at least one image." }, { status: 400 });
    if (kind === "featured" && files.length !== 1) return Response.json({ error: "Choose one featured image." }, { status: 400 });
    if (files.length > 8) return Response.json({ error: "Upload up to 8 gallery images at a time." }, { status: 400 });

    for (const file of files) {
      if (!allowedTypes[file.type]) return Response.json({ error: `${file.name} is not a supported image. Use JPG, PNG, WebP or GIF.` }, { status: 415 });
      if (file.size > maxFileSize) return Response.json({ error: `${file.name} is larger than 8 MB.` }, { status: 413 });
    }

    const supabase = getSupabaseAdmin();
    const roomResult = await supabase.from("room_categories").select("slug").eq("slug", roomSlug).maybeSingle();
    throwIfSupabaseError(roomResult.error);
    if (!roomResult.data) return Response.json({ error: "Room category not found." }, { status: 404 });

    const urls: string[] = [];
    for (const file of files) {
      const extension = allowedTypes[file.type];
      const path = `rooms/${roomSlug}/${kind}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const uploadResult = await supabase.storage.from(bucket).upload(path, await file.arrayBuffer(), {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false,
      });
      throwIfSupabaseError(uploadResult.error);
      urls.push(supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl);
    }

    return Response.json({ urls });
  } catch (error) {
    return jsonError(error);
  }
}
