// import admin from "firebase-admin";
// import { readFileSync } from "fs";

// if (!admin.apps.length) {
//   const serviceAccount = JSON.parse(
//     readFileSync("./serviceAccount.json", "utf-8")
//   );

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// async function setFirstAdmin(email) {
//   try {
//     const user = await admin.auth().getUserByEmail(email);
//     await admin.auth().setCustomUserClaims(user.uid, { admin: true });
//     console.log(`${email} wurde erfolgreich zum Admin befördert.`);
//   } catch (err) {
//     console.error("Fehler:", err);
//   }
// }

// setFirstAdmin("f.hanso@revice-media.com");
