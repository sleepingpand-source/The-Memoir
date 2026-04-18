import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

const PROFILE_FILE = path.join(process.cwd(), "public", "uploads", "profile-pic.jpg");
const PROFILE_URL = "/uploads/profile-pic.jpg";

export async function GET() {
  if (fs.existsSync(PROFILE_FILE)) {
    return NextResponse.json({ url: PROFILE_URL + "?t=" + fs.statSync(PROFILE_FILE).mtimeMs });
  }
  // Return default if no custom pic uploaded
  return NextResponse.json({ url: null });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    await writeFile(PROFILE_FILE, buffer);
    return NextResponse.json({ url: PROFILE_URL + "?t=" + Date.now() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
