/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET() {
  const INSTAGRAM_USER_ID = "DEINE_IG_USER_ID"; // z.B. 17841400000000000
  const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_USER_ID}?fields=followers_count&access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ followers: data.followers_count });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Follower-Zahl." },
      { status: 500 }
    );
  }
}
