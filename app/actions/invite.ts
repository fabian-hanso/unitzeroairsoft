"use server";

import { adminAuth } from "@/lib/firebase-admin";

export async function inviteUser(email: string) {
  const user = await adminAuth.createUser({ email });

  // Passwort-Reset-Link generieren
  const link = await adminAuth.generatePasswordResetLink(email);

  // TODO: mit nodemailer / SendGrid an email schicken
  console.log("Invitation link:", link);

  return user;
}
