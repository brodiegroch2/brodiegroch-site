import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID = ["task", "note", "event", "metric"];

export async function POST(req: Request) {
  const key = req.headers.get("X-API-Key");
  if (key !== process.env.GPT_API_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const text = await req.text();
  if (text.length > 8000) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!VALID.includes(body.type)) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }

  if (!body.data) {
    return NextResponse.json({ error: "data is required" }, { status: 400 });
  }

  try {
    // Ensure data has an id
    if (!body.data.id) {
      body.data.id = `${body.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Upsert
    await db.items.upsert({
      where: { id: body.data.id },
      create: {
        type: body.type,
        data: body.data,
      },
      update: {
        type: body.type,
        data: body.data,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database operation failed" },
      { status: 500 }
    );
  }
}

