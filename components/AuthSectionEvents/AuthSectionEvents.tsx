import {
  CalendarDaysIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const posts = [
  {
    id: 1,
    title: "Area M - Tactical Village",
    href: "#",
    description:
      "Der nächste Teamspieltag steht bevor. Im Anschluss findet ein entspanntes Grillen in Ruppach-Goldhausen statt! Gehörschutz nicht vergessen.",
    imageUrl: "/Fabian-Desktop.jpg",
    userCount: 4,
    date: "31. Mai 2025",
    datetime: "2020-03-16",
    category: { title: "Koblenz", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Area M - Extreme",
    href: "#",
    description:
      "Der nächste Teamspieltag steht bevor. Im Anschluss findet ein entspanntes Grillen in Ruppach-Goldhausen statt! Gehörschutz nicht vergessen.",
    imageUrl: "/Fabian-Desktop.jpg",
    userCount: 6,
    date: "07. Juni 2025",
    datetime: "2020-03-16",
    category: { title: "Koblenz", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Area M - Spieltag",
    href: "#",
    description:
      "Der nächste Teamspieltag steht bevor. Im Anschluss findet ein entspanntes Grillen in Ruppach-Goldhausen statt! Gehörschutz nicht vergessen.",
    imageUrl: "/Fabian-Desktop.jpg",
    userCount: 5,
    date: "14. Juni 2025",
    datetime: "2020-03-16",
    category: { title: "Koblenz", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Area M - Spieltag",
    href: "#",
    description:
      "Der nächste Teamspieltag steht bevor. Im Anschluss findet ein entspanntes Grillen in Ruppach-Goldhausen statt! Gehörschutz nicht vergessen.",
    imageUrl: "/Fabian-Desktop.jpg",
    userCount: 2,
    date: "22. Juni 2025",
    datetime: "2020-03-16",
    category: { title: "Koblenz", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 5,
    title: "Area M - Spieltag",
    href: "#",
    description:
      "Der nächste Teamspieltag steht bevor. Im Anschluss findet ein entspanntes Grillen in Ruppach-Goldhausen statt! Gehörschutz nicht vergessen.",
    imageUrl: "/Fabian-Desktop.jpg",
    userCount: 2,
    date: "28. Juni 2025",
    datetime: "2020-03-16",
    category: { title: "Koblenz", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

export default function AuthSectionEvents() {
  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-gray-900">Kommende Events</h3>
      <div className="mx-auto">
        <div className="mx-auto mt-5 grid grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {posts.map((post) => (
            <div
              className="flex flex-col items-start justify-between bg-white"
              key={post.id}
            >
              <div className="relative w-full">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="aspect-video w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute top-0 right-0 flex gap-1 text-white items-center text-sm py-2 px-2 bg-blue">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                  {post.userCount}
                </div>
              </div>
              <div className="w-full p-4">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.datetime}
                    className="text-blue flex gap-2 items-center"
                  >
                    <CalendarDaysIcon className="w-5 h-5" />
                    {post.date}
                  </time>
                  <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.category.title}
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </div>
                <div className="mt-2">
                  <p className="text-xs">{post.description}</p>
                </div>
                <div className="grid grid-cols-2 mt-4 text-sm gap-4">
                  <button className="flex justify-center items-center gap-2 py-2 bg-gray-50 flex-1 group hover:bg-gray cursor-pointer hover:text-white transition-all">
                    <HandThumbUpIcon className="w-5 h-5 text-green-700 group-hover:text-white transition-all" />
                    Zusagen
                  </button>
                  <button className="flex justify-center items-center gap-2 py-2 bg-gray-50 flex-1 group hover:bg-gray cursor-pointer hover:text-white transition-all">
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
