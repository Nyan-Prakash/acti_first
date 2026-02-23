import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

// POST /api/folders/[id]/activities — add an activity to a folder
export async function POST(req: Request, { params }: Params) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: folderId } = await params;
  const { activityId } = await req.json();
  if (!activityId) return NextResponse.json({ error: "activityId required" }, { status: 400 });

  // Verify the folder belongs to the user
  const { data: folder } = await supabase
    .from("folders")
    .select("id")
    .eq("id", folderId)
    .eq("user_id", user.id)
    .single();

  if (!folder) return NextResponse.json({ error: "Folder not found" }, { status: 404 });

  const { error } = await supabase
    .from("folder_activities")
    .upsert({ folder_id: folderId, activity_id: activityId, user_id: user.id });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE /api/folders/[id]/activities — remove an activity from a folder
export async function DELETE(req: Request, { params }: Params) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: folderId } = await params;
  const { activityId } = await req.json();
  if (!activityId) return NextResponse.json({ error: "activityId required" }, { status: 400 });

  const { error } = await supabase
    .from("folder_activities")
    .delete()
    .eq("folder_id", folderId)
    .eq("activity_id", activityId)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
