import { NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: "unitzeroairsoft",
      clientEmail:
        "firebase-adminsdk-fbsvc@unitzeroairsoft.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDvoi6gFEVWth/L\nNV+dg9GlJi+Cmx6cB0b1LFeuyL2cS+qwzK9sI8HBzESUQX6xsGivQoi3LiHmwPMR\nCdtg8eD9Q9Q/M/CdTc+K7H+sEEPS9d+vm+mjaWfzvLt7aNME+/r7l307m9THsc2p\nTyxxD/y/HZ6o6q2EaJ3QDE/bq+H8KjANJFijE8nRdK0ST4vi3sUYdDP8QPNj0Q5l\nPNyD+PPG6llSPDPSSrokgrI5ayg1dDkkP7Vii75wvQtJOGlFLJUlCRLY+seoAyOZ\nPkLwg0QQm2JgU1SphXSeBCWPuf/BItGG/Z2U75/XCmF7m6a7Igz5+GDXOW9bJxdI\nmqssQ22TAgMBAAECggEAFQkeoKzG3XLFXbhEuXYN3Dp65zMov7ef0fvfgpdalbLQ\nWk7Ng2esJZAB4SXSslRzDBeCGtpw3WnIrJE58cup3XGr2xR7JcPj2SUjm/4dhhJR\nXYAJRXAGUQ4bQx0TkRdxk85bjvUB+7mu/RLXKuGlZT17ZQaczsfEOrQp+nWfM9xw\nuSYG/avx0vdfEN51OQJRH39eH/VzIcgqufS5oJ8v38bwcI+5vFxlS9SJ6DVE1Gjn\nVnagFMDMvoz+/7/8Ubj3bKFAEvf0HJquTuqdKBqCCiO/seocfjjwBtCYmM8a4iNe\n3PD0rDKyW1+C0ofbNiGMTI28E0raZ/Wg83rIBrycAQKBgQD421mOcVg0L+sUWZOM\nUXDnGXAG2+FijvL7P6fMptSkePRUxp31CCmqa4F7KSp56SYdHtRpzJjxrYm15i/H\n6oFSMbYayGTt2PgQUNIIZnixKFrEIUSXch64jhVHPqqQHE37+MbEcGGVP7nCG/TY\n2ap+0BP7eHF/q0yDnYYGDFrOAQKBgQD2gw67nLXHEqTfa0icDHGN/v6WFX1297JP\nZHBHvREQeWZd667f3tCq98ysjQTIvpbUzqShLx4eiQIMmTvM7mQw24gobMj53gxq\nB0fH99WGdpzTkg5SDJMWrBheAmZxxNvozzwSXG2186e98Th1mKI11F1QofoZeriV\nfOcwg/UjkwKBgQDBTcmb/ukv6ITnUsls9poHuVeuzD+fykBt771NF84XUCkibQGn\no0aSLV3vqENpXTSQ7DC9WgL3wAA3fm1hEgSQLzMwTLcxlhbivZTYl5hqrFkM/naE\nWU4Jt7xJkiD1PjdJYa4sSstSHqURZZvkkfeA9+p9rMolDI+rsMG5kwE6AQKBgQDV\nVhSQ/w097H+tLv6WthosBiszngOHytOQ695T52b2N+oEjCw6aG10GKIUDrK+PFry\nbqeBKvLJAE86sf5T21fwBH1wZr0DqUxbElPn1i7/gHU2kGc+UM2WyHcKHM+l0/Vx\nJK/bQAxedDCOLE1tUBvJtDDR0GxOUqueC4tUrE6hawKBgQDthdYVzJ1G9rEZcb/N\nj/Er+TAH8ldrjQSCpbqqh1ew+vgm3jCdty3f9DSTOUiGbxPfdlPAihEKMVPiF7m8\n0/w05qtWgbN14CPhdu5heLq9tkdpbQNBr/DuRh8RMyTC58ruQcTsR1S9ytZCjwm/\n7/NA5G4S8FJS0plgEHMJrzn9Yg==\n-----END PRIVATE KEY-----\n",
    }),
  });
}

const db = getFirestore();

export async function GET() {
  try {
    const snapshot = await db.collection("userInformation").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzer:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
