/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/authContext";
import {
  CalendarDaysIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export type EventType = {
  name: string;
  participents: string[];
  location: string;
  date: any;
  description: string;
  id: string;
};

export default function AuthSectionEvents() {
  const { user }: any = useAuth();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/getAllEvents");
        const data = await res.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(user?.uid);
  }, [user]);

  function getEventDate(timestamp: {
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

  const respondToEvent = async (
    eventId: string,
    userId: string,
    type: "attend" | "decline"
  ) => {
    await fetch("/api/respondToEvent", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, userId, type }),
    });
  };

  const handleAttendClick = (eventId: string, userId: string) => {
    respondToEvent(eventId, userId, "attend");
  };

  const handleNotAttendClick = (eventId: string, userId: string) => {
    respondToEvent(eventId, userId, "decline");
  };

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const res = await fetch("/api/getAllEvents");
  //       const data = await res.json();
  //       setEvents(data.events);
  //     } catch (error) {
  //       console.error("Fehler beim Abrufen der Daten:", error);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, [respondToEvent]);

  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-gray-900">Kommende Events</h3>
      <div className="mx-auto">
        <div className="mx-auto mt-5 grid grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event: EventType) => (
            <div
              className="flex flex-col items-start justify-between bg-white"
              key={event.name}
            >
              <div className="relative w-full">
                <img
                  alt=""
                  src="/Fabian-Desktop.jpg"
                  className="aspect-video w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute top-0 right-0 flex gap-1 text-white items-center text-sm py-2 px-2 bg-blue">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                  {event.participents ? event.participents.length : "0"}
                </div>
              </div>
              <div className="w-full p-4">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={event.date}
                    className="text-blue flex gap-2 items-center"
                  >
                    <CalendarDaysIcon className="w-5 h-5" />
                    {event.date && getEventDate(event.date)}
                  </time>
                  <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {event.location}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <div>
                      <span className="absolute inset-0" />
                      {event.name}
                    </div>
                  </h3>
                </div>
                <div className="mt-2">
                  <p className="text-xs">{event.description}</p>
                </div>
                <div className="grid grid-cols-2 mt-4 text-sm gap-4">
                  <button
                    className={
                      event.participents?.includes(user.uid)
                        ? "flex justify-center items-center gap-2 py-2 bg-gray-50/10 flex-1 group hover:bg-gray cursor-pointer hover:text-white transition-all"
                        : "flex justify-center items-center gap-2 py-2 bg-gray-50 flex-1 group hover:bg-gray cursor-pointer hover:text-white transition-all"
                    }
                    onClick={() => handleAttendClick(event.id, user.uid)}
                    disabled={
                      event.participents?.includes(user.uid) ? true : false
                    }
                  >
                    <HandThumbUpIcon className="w-5 h-5 text-green-700 group-hover:text-white transition-all" />
                    {event.participents?.includes(user.uid)
                      ? "Zugesagt"
                      : "Zusagen"}
                  </button>
                  <button
                    className="flex justify-center items-center gap-2 py-2 bg-gray-50 flex-1 group hover:bg-gray cursor-pointer hover:text-white transition-all"
                    onClick={() => handleNotAttendClick(event.id, user.uid)}
                  >
                    <HandThumbDownIcon className="w-5 h-5 text-red-700 group-hover:text-white transition-all" />
                    Absagen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
