"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/authContext"; // Dein Auth Context

// Typen definieren
type AdminUser = {
  firstName: string;
  lastName: string;
  eMail?: string;
  superAdmin?: boolean;
};

// Hauptkomponente
export default function AdminTeamView() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeUser, setActiveUser] = useState<AdminUser | null>(null);

  // Fetch Users
  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getAllUsers", {
          signal: controller.signal,
        });
        const data = await res.json();
        setUsers(data.users);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, []);

  if (loading)
    return (
      <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mt-10"></div>
    );
  if (error) return <p>Fehler beim Laden der Nutzer!</p>;
  if (!user) return <p>Bitte einloggen, um Nutzer zu verwalten.</p>;

  // Funktion zum Löschen eines Nutzers
  const deleteUser = async (userToDelete: AdminUser) => {
    if (!userToDelete.eMail) return;

    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ eMail: userToDelete.eMail }),
      });

      if (!res.ok) throw new Error("Fehler beim Löschen");

      // Nutzer aus dem State entfernen
      setUsers((prev) => prev.filter((u) => u.eMail !== userToDelete.eMail));
      setActiveUser(null);
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen des Nutzers.");
    }
  };

  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Eine Übersicht aller Nutzer inklusive Name, E-Mail und Rolle.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Name
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                E-Mail
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th className="py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.eMail || u.lastName}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {u.firstName} {u.lastName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {u.eMail || "Nicht hinterlegt"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {u.superAdmin ? "Admin" : "Member"}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => setActiveUser(u)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                    <span className="sr-only">
                      , {u.firstName} {u.lastName}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={!!activeUser}
        onClose={() => setActiveUser(null)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <CheckIcon className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle
              as="h3"
              className="mt-4 text-lg font-semibold text-gray-900 text-center"
            >
              Nutzer entfernen
            </DialogTitle>
            <div className="mt-2 text-sm text-gray-500 text-center">
              Bist du sicher, dass du{" "}
              <span className="font-semibold">
                {activeUser?.firstName} {activeUser?.lastName}
              </span>{" "}
              aus der Datenbank löschen möchtest? Dieser Vorgang kann nicht
              rückgängig gemacht werden.
            </div>
            <div className="mt-5 sm:flex sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveUser(null)}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => activeUser && deleteUser(activeUser)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto"
              >
                Nutzer löschen
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
