// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/deleteUser/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { adminAuth, firestore } from "@/lib/firebase-admin";

// export async function DELETE(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { eMail } = body;

//     if (!eMail) {
//       return NextResponse.json(
//         { message: "eMail is required" },
//         { status: 400 }
//       );
//     }

//     // ID Token aus Header prüfen
//     const authHeader = req.headers.get("Authorization");
//     if (!authHeader?.startsWith("Bearer ")) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const idToken = authHeader.split("Bearer ")[1];
//     const decodedToken = await adminAuth.verifyIdToken(idToken);

//     // Nur Admins dürfen löschen
//     if (!decodedToken.admin) {
//       return NextResponse.json(
//         { message: "Forbidden: Admins only" },
//         { status: 403 }
//       );
//     }

//     // Nutzer abrufen und löschen
//     const userRecord = await adminAuth.getUserByEmail(eMail);
//     await adminAuth.deleteUser(userRecord.uid);

//     // Firestore-Daten löschen
//     await firestore.collection("users").doc(userRecord.uid).delete();

//     return NextResponse.json(
//       { message: "User deleted successfully" },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("Delete User Error:", err);
//     return NextResponse.json(
//       { message: err.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
