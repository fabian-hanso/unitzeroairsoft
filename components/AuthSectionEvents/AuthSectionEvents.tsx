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
  imageId: string;
};

export default function AuthSectionEvents() {
  const { user }: any = useAuth();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pendingEventUpdates, setPendingEventUpdates] = useState<
    Record<string, boolean>
  >({});

  // Hilfsfunktion: Timestamp in Future/ Vergangenheit prüfen
  function isEventInFuture(event: EventType): boolean {
    if (!event.date?._seconds) return false;
    const eventTime =
      event.date._seconds * 1000 +
      Math.floor(event.date._nanoseconds / 1_000_000);
    return eventTime >= Date.now();
  }

  function isEventPast(event: EventType): boolean {
    if (!event.date?._seconds) return false;
    const eventTime =
      event.date._seconds * 1000 +
      Math.floor(event.date._nanoseconds / 1_000_000);
    return eventTime < Date.now();
  }

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getAllEvents");
      const data = await res.json();
      setEvents(data.events);
    } catch (err) {
      console.error("Fehler beim Abrufen der Daten:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function getEventDate(timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }): string {
    const milliseconds =
      timestamp._seconds * 1000 +
      Math.floor(timestamp._nanoseconds / 1_000_000);
    const date = new Date(milliseconds);
    if (isNaN(date.getTime())) return "Ungültiges Datum";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const respondToEvent = async (
    eventId: string,
    userId: string,
    type: "attend" | "decline"
  ) => {
    if (pendingEventUpdates[eventId]) return;

    setPendingEventUpdates((prev) => ({ ...prev, [eventId]: true }));

    // Optimistisches Update
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        if (type === "attend" && !e.participents.includes(userId)) {
          return { ...e, participents: [...e.participents, userId] };
        }
        if (type === "decline" && e.participents.includes(userId)) {
          return {
            ...e,
            participents: e.participents.filter((id) => id !== userId),
          };
        }
        return e;
      })
    );

    try {
      const res = await fetch("/api/respondToEvent", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userId, type }),
      });
      if (!res.ok) throw new Error("Fehler beim Aktualisieren");
    } catch (err) {
      console.error(err);
      fetchEvents();
    } finally {
      setPendingEventUpdates((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  if (loading)
    return (
      <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mt-10"></div>
    );
  if (error) return <p>Leider hat das nicht funktioniert!</p>;

  const futureEvents = events.filter(isEventInFuture);
  const pastEvents = events.filter(isEventPast);

  // Helper zum Rendern eines Event-Cards
  const renderEventCard = (event: EventType) => {
    const hasResponded = event.participents?.includes(user.uid);
    const isPending = pendingEventUpdates[event.id];

    return (
      <div
        className="flex flex-col items-start justify-between bg-white"
        key={event.id}
      >
        <div className="relative w-full">
          <img
            alt=""
            src={"/EventImages/" + event.imageId}
            className="aspect-video w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute top-0 right-0 flex gap-1 text-white items-center text-sm py-2 px-2 bg-blue">
            <UserGroupIcon className="w-5 h-5 text-white" />
            {event.participents ? event.participents.length : 0}
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
          <h3 className="mt-2 text-lg/6 font-semibold text-gray-900">
            {event.name}
          </h3>
          <p className="mt-2 text-xs">{event.description}</p>
          {isEventInFuture(event) && (
            <div className="grid grid-cols-2 mt-4 text-sm gap-4">
              <button
                className={`group flex justify-center items-center gap-2 py-2 flex-1 rounded transition-all ${
                  hasResponded || isPending
                    ? "bg-gray-50/10 cursor-not-allowed text-gray-400"
                    : "bg-gray-50 hover:bg-gray cursor-pointer text-green-700 hover:text-white"
                }`}
                onClick={() => respondToEvent(event.id, user.uid, "attend")}
                disabled={hasResponded || isPending}
              >
                <HandThumbUpIcon className="w-5 h-5 transition-all" />
                {hasResponded ? "Zugesagt" : "Zusagen"}
              </button>

              <button
                className={`group flex justify-center items-center gap-2 py-2 flex-1 rounded transition-all ${
                  isPending
                    ? "bg-gray-50/10 cursor-not-allowed text-gray-400"
                    : "bg-gray-50 hover:bg-gray cursor-pointer text-red-700 hover:text-white"
                }`}
                onClick={() => respondToEvent(event.id, user.uid, "decline")}
                disabled={isPending}
              >
                <HandThumbDownIcon className="w-5 h-5 transition-all" />
                Absagen
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5">
      {/* Zukünftige Events */}
      <h3 className="text-base font-semibold text-gray-900">Kommende Events</h3>
      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {futureEvents.map(renderEventCard)}
      </div>

      {/* Vergangene Events */}
      {pastEvents.length > 0 && (
        <div className="mt-10">
          <h3 className="text-base font-semibold text-gray-900">
            Vergangene Events
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pastEvents.map(renderEventCard)}
          </div>
        </div>
      )}
    </div>
  );
}
