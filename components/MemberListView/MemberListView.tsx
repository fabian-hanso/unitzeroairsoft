/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PhoneIcon } from "@heroicons/react/20/solid";
import {
  MapPinIcon,
  ChevronDoubleUpIcon,
  CalendarDaysIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// Typen
type Timestamp = { _seconds: number; _nanoseconds: number };

export type User = {
  firstName: string;
  lastName: string;
  location?: string;
  alias: string;
  birthday?: Timestamp;
  phone?: string;
  eMail?: string;
};

// Hilfsfunktion: Timestamp zu lesbarem Datum
function formatTimestamp(timestamp?: Timestamp): string {
  if (!timestamp) return "-";
  const milliseconds =
    timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1_000_000);
  const date = new Date(milliseconds);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("de-DE");
}

// Reusable ActionButton
const ActionButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => (
  <a
    href={href}
    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm text-gray-900 border border-transparent hover:bg-gray-50 transition-all"
  >
    <Icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
    {label}
  </a>
);

// Hauptkomponente
export default function MemberListView() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  if (error) return <p>Leider hat das nicht funktioniert!</p>;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
      {users.map((user) => (
        <li
          key={user.alias}
          className="col-span-1 divide-y divide-gray-200 bg-white shadow overflow-hidden"
        >
          {/* Bild + Badge */}
          <div className="flex flex-col">
            <div className="w-full aspect-video overflow-hidden relative">
              <img
                alt={`${user.firstName} ${user.lastName}`}
                src="/Fabian.jpg"
                className="w-full h-full object-cover object-top bg-gray-300"
              />
              <div className="absolute top-4 right-4 w-10 h-10 bg-gray flex justify-center items-center rounded-full">
                <ChevronDoubleUpIcon className="w-7 h-7 text-accent" />
              </div>
            </div>

            {/* Benutzerinfo */}
            <div className="p-4">
              <h3 className="font-bold">{`${user.firstName} ${user.lastName}`}</h3>
              <h4 className="text-sm text-gray">@{user.alias}</h4>

              <div className="mt-4 flex gap-2 items-center">
                <MapPinIcon className="w-4 h-4 -ml-0.5 text-blue" />
                <p className="text-sm">{user.location || "-"}</p>
              </div>

              <div className="mt-2 flex gap-2 items-center">
                <CalendarDaysIcon className="w-4 h-4 -ml-0.5 text-blue" />
                <p className="text-sm">{formatTimestamp(user.birthday)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="-mt-px flex divide-x divide-gray-200">
            <ActionButton
              href={`mailto:${user.eMail || ""}`}
              icon={EnvelopeOpenIcon}
              label="E-Mail"
            />
            <ActionButton
              href={`tel:${user.phone || ""}`}
              icon={PhoneIcon}
              label="Telefon"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
