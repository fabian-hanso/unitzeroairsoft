// import { NextResponse } from "next/server";
// import { adminAuth } from "@/lib/firebase-admin";

// export async function POST(req: Request) {
//   const { idToken } = await req.json();
//   const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 Tage

//   try {
//     const sessionCookie = await adminAuth.createSessionCookie(idToken, {
//       expiresIn,
//     });
//     const res = NextResponse.json({ status: "success" });

//     res.cookies.set("session", sessionCookie, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: expiresIn / 1000,
//       path: "/",
//     });

//     return res;
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { status: "error", message: err.message },
//       { status: 401 }
//     );
//   }
// }
