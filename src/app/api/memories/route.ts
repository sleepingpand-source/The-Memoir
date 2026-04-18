import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const db = await getDb();
    const memories = await db.all('SELECT * FROM memories ORDER BY id ASC');
    return NextResponse.json({ memories });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const file = formData.get("file") as File;

    if (!title || !description || !date || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.\-]/g, '_');

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    const imageUrl = `/uploads/${filename}`;

    const db = await getDb();
    const result = await db.run(
      'INSERT INTO memories (title, description, date, imageUrl) VALUES (?, ?, ?, ?)',
      [title, description, date, imageUrl]
    );

    return NextResponse.json({ id: result.lastID, title, description, date, imageUrl, message: "Memory created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create memory" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, date } = body;

    if (!id || !title || !description || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();
    await db.run(
      'UPDATE memories SET title = ?, description = ?, date = ? WHERE id = ?',
      [title, description, date, id]
    );

    return NextResponse.json({ message: "Memory updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update memory" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const db = await getDb();

    // Get the record first to delete the file
    const memory = await db.get('SELECT * FROM memories WHERE id = ?', [id]);
    if (memory && memory.imageUrl) {
      const filePath = path.join(process.cwd(), 'public', memory.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await db.run('DELETE FROM memories WHERE id = ?', [id]);
    return NextResponse.json({ message: "Memory deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete memory" }, { status: 500 });
  }
}
