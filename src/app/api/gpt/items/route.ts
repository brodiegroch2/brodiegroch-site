import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
    const since = searchParams.get("since");

    let result;
    
    if (type && since) {
      result = await sql`
        SELECT * FROM items 
        WHERE type = ${type} AND updated_at > ${since}
        ORDER BY updated_at DESC 
        LIMIT ${limit}
      `;
    } else if (type) {
      result = await sql`
        SELECT * FROM items 
        WHERE type = ${type}
        ORDER BY updated_at DESC 
        LIMIT ${limit}
      `;
    } else if (since) {
      result = await sql`
        SELECT * FROM items 
        WHERE updated_at > ${since}
        ORDER BY updated_at DESC 
        LIMIT ${limit}
      `;
    } else {
      result = await sql`
        SELECT * FROM items 
        ORDER BY updated_at DESC 
        LIMIT ${limit}
      `;
    }
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await db.items.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

