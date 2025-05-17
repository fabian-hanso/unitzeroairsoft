/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  // ergänze hier alle Felder, die dein User haben soll
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Team", href: "/dashboard/team", icon: UsersIcon },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: CalendarIcon,
  },
  {
    name: "Mitglieder",
    href: "/dashboard/mitglieder",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Teamkasse",
    href: "/dashboard/teamkasse",
    icon: BanknotesIcon,
  },
];
const teams = [
  {
    id: 1,
    name: "Elite",
    href: "/dashboard/team/elite",
    initial: "E",
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const handleLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    window.location.href = "/login"; // Weiterleitung nach dem Logout
  } catch (error) {
    console.error("Logout fehlgeschlagen:", error);
  }
};

export default function SidebarLayout({ userData, children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserData>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  console.log(pathname);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/getActiveUser?userId=${userData.uid}`);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userData]);

  useEffect(() => {
    console.log("Data", user);
  }, [user]);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Unit Zero Airsoft"
                    src="/Logo.svg"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.href === pathname
                                  ? "bg-gray-50 text-blue"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.href === pathname
                                    ? "text-blue"
                                    : "text-gray-400 group-hover:text-blue",
                                  "size-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Deine Teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-gray-50 text-blue"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? "border-blue text-blue"
                                    : "border-gray-200 text-gray-400 group-hover:border-blue group-hover:text-blue",
                                  "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-blue"
                        />
                        Einstellungen
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Unit Zero Airsoft"
                src="/Logo.svg"
                className="h-10 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? "bg-gray-50 text-blue"
                              : "text-gray-700 hover:bg-gray-50 hover:text-blue",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.href === pathname
                                ? "text-blue"
                                : "text-gray-400 group-hover:text-blue",
                              "size-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">
                    Deine Trupps
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-blue"
                              : "text-gray-700 hover:bg-gray-50 hover:text-blue",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "border-blue text-blue"
                                : "border-gray-200 text-gray-400 group-hover:border-blue group-hover:text-blue",
                              "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-blue"
                    />
                    Einstellungen
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 ">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
              {/* <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
              </form> */}

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="/Fabian.jpg"
                      className="size-8 rounded-full bg-gray-50"
                    />
                    {user && (
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          aria-hidden="true"
                          className="ml-4 text-sm/6 font-semibold text-gray-900"
                        >
                          {user.firstName + " " + user.lastName}
                        </span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="ml-2 size-5 text-gray-400"
                        />
                      </span>
                    )}
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none w-full"
                      >
                        Abmelden
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10 bg-gray-50 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* <Breadcrumbs />
              <MemberListView /> */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
