import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  const key = req.headers.get("X-API-Key");
  const okKey = key && key === process.env.GPT_API_KEY;

  // DB ping
  let dbOk = false;
  try {
    const result = await sql`SELECT 1 as test`;
    dbOk = result.rows.length > 0;
  } catch (e) {
    console.error('DB ping error:', e);
  }

  return NextResponse.json({
    ok: okKey && dbOk,
    key: okKey,
    db: dbOk,
    envKeyLoaded: Boolean(process.env.GPT_API_KEY),
  });
}

