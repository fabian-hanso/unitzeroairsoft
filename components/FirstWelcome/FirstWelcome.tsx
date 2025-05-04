import {
  CalendarDaysIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Gemeinsame Spieltage",
    description:
      "Wir treffen uns regelmäßig zu gemeinsamen Spieltagen, um als Gemeinschaft zu wachsen und taktische Ansätze zu entwickeln.",
    href: "#",
    icon: CalendarDaysIcon,
  },
  {
    name: "Gegenseitiger Tech-Support",
    description:
      "Wie bereits erwähnt, steht die Gemeinschaft im Mittelpunkt. Wir unterstützen uns bei Technik- & Gearfragen und darüber hinaus.",
    href: "#",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Extreme Rabatte",
    description:
      "Dank unserer Sponsoren haben unsere aktiven Mitglieder Zugriff auf tolle Rabatte auf fast alle Artikel im jeweiligen Sortiment.",
    href: "#",
    icon: CreditCardIcon,
  },
];

export default function FirstWelcome() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Wir sind <span className="font-semibold text-blue">Unit Zero</span>
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Gemeinsam erreicht man mehr. Dies war der Leitspruch zur Gründung
            der <span className="font-bold text-stone-900">Unit Zero</span>.
            Inzwischen zählen wir 15 aktive Mitglieder und wachsen stetig!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-16 lg:mt-16 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="font-semibold text-blue flex gap-2">
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-blue"
                  />
                  <p>{feature.name}</p>
                </dt>
                <dd className="mt-1 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
