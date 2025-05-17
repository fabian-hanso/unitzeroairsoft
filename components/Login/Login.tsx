"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [eMail, setEMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, eMail, password);
      router.push("/dashboard");
    } catch (e) {
      alert("Login fehlgeschlagen");
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Logo" src="/Logo.svg" className="mx-auto h-20 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Anmelden
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                E-Mail Adresse
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="beispiel@unit-zero.de"
                  value={eMail}
                  onChange={(e) => setEMail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Passwort
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue hover:text-blue/80"
                  >
                    Passwort vergessen?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={login}
                className="flex w-full cursor-pointer justify-center rounded-md bg-blue px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                Anmelden
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Noch kein Mitglied?{" "}
            <a
              href="mailto:info@unit-zero.de"
              className="font-semibold text-blue hover:text-blue/90"
            >
              Kontaktiere uns.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
