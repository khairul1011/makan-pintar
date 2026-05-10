import { NextResponse } from "next/server";
import { getAuthUser, unauthorized, serverError } from "@/lib/api-helpers";

// GET /api/profile — Ambil profil user
export async function GET(request) {
  const { user, error, supabase } = await getAuthUser(request);
  if (!user) return unauthorized(error);

  const { data, error: dbError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError) return serverError(dbError.message);

  return NextResponse.json({ profile: data });
}

// PUT /api/profile — Update profil user
export async function PUT(request) {
  const { user, error, supabase } = await getAuthUser(request);
  if (!user) return unauthorized(error);

  const body = await request.json();

  // Field yang boleh diupdate
  const allowedFields = [
    "full_name", "saldo_makan", "hari_ke_kiriman",
    "total_kiriman", "tanggal_kiriman",
    "target_calories", "target_protein", "notifications"
  ];

  const updates = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  updates.updated_at = new Date().toISOString();

  const { data, error: dbError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  if (dbError) return serverError(dbError.message);

  return NextResponse.json({ profile: data });
}
