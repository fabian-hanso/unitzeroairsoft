/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  BanknotesIcon,
  HandThumbUpIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Mitglieder",
    stat: "10",
    icon: UsersIcon,
    change: "4",
    changeType: "increase",
    href: "/dashboard/team",
  },
  {
    id: 2,
    name: "Teamkasse",
    stat: "20,00€",
    icon: BanknotesIcon,
    change: "20,00€",
    changeType: "increase",
    href: "/dashboard/teamkasse",
  },
  {
    id: 3,
    name: "Instagram Follower",
    stat: "171",
    icon: HandThumbUpIcon,
    change: "171",
    changeType: "increase",
    href: "https://www.instagram.com/unitzeroairsoft",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AuthSectionStats() {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-gray-900">
        Aktuelle Zahlen im Überblick
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue p-3">
                <item.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 self-center text-green-500"
                  />
                ) : (
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 self-center text-red-500"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href={item.href}
                    className="font-medium text-blue hover:text-blue/70"
                  >
                    Mehr anzeigen
                    <span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
