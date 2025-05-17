/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
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

export type User = {
  firstName: string;
  lastName: string;
  location: string;
  alias: string;
  birthday: any;
  phone: string;
  eMail: string;
};

export default function MemberListView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(users);
  }, [users]);

  function getUserDate(timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }): string {
    const milliseconds =
      timestamp._seconds * 1000 +
      Math.floor(timestamp._nanoseconds / 1_000_000);
    const date = new Date(milliseconds);

    if (isNaN(date.getTime())) {
      return "Ungültiges Datum";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Monat +1 da 0-basiert
    const year = date.getFullYear();

    return `${day}.${month}.${year}`; // z. B. "25.07.1997"
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getAllUsers");
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mt-10"></div>
    );
  if (error) return <p>Leider hat das nicht funktioniert!</p>;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10"
    >
      {users.map((user: User) => (
        <li
          key={user.alias}
          className="col-span-1 divide-y divide-gray-200 bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6">
            <div className="flex flex-col">
              <div className="w-full aspect-video overflow-hidden relative">
                <img
                  alt=""
                  src="/Fabian.jpg"
                  className="w-full h-full object-cover object-top shrink-0 bg-gray-300"
                />
                <div className="absolute top-4 right-4 w-10 h-10 bg-gray flex justify-center items-center">
                  <ChevronDoubleUpIcon className="w-7 h-7 text-accent" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">
                  {user.firstName + " " + user.lastName}
                </h3>
                <h4 className="text-sm text-gray">@{user.alias}</h4>
                <div className="mt-4 flex gap-2 items-center">
                  <MapPinIcon className="w-4 h-4 -ml-0.5 text-blue" />
                  <p className="text-sm">{user.location && user.location}</p>
                </div>
                <div className="mt-2 flex gap-2 items-center">
                  <CalendarDaysIcon className="w-4 h-4 -ml-0.5 text-blue" />
                  <p className="text-sm">
                    {user.birthday && getUserDate(user.birthday)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${user.eMail}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm text-gray-900"
                >
                  <EnvelopeOpenIcon
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                  />
                  E-Mail
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${user.phone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm text-gray-900"
                >
                  <PhoneIcon
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                  />
                  Telefon
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
