import Section from "./Section/Section";

const faqs = [
  {
    question: "Wie kann ich Mitglied bei euch werden?",
    answer:
      "Melde dich gerne direkt via Discord oder per Instagram bei uns. Wir geben jedem Interessenten die Möglichkeit, sich über einige Spieltage hinweg zu beweisen.",
  },
  {
    question: "Wie viele Mitglieder habt ihr aktuell?",
    answer:
      "Derzeit zählen wir 15 aktive Mitglieder, wachsen jedoch bei fast jedem Spieltag weiter.",
  },
  {
    question: "Was hat es mit der Unit Zero Elite auf sich?",
    answer:
      "Die Unit Zero Elite ist ein von uns gegründeter Trupp, welcher sich gerade im Aufbau befindet. Dieser Trupp wird durch einen Truppführer und seinen Stellvertreter geleitet. Gemeinsam werden Taktiken trainiert, Funksprüche optimiert und es wird rein Objektbezogen gespielt. Kein wildes Geballer & keine unklaren Spielverläufe.",
  },
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Derzeit zählen wir 15 aktive Mitglieder, wachsen jedoch bei fast jedem Spieltag weiter.",
  },
  {
    question: "Dies ist ein einfaver Platzhalter?",
    answer:
      "Derzeit zählen wir 15 aktive Mitglieder, wachsen jedoch bei fast jedem Spieltag weiter.",
  },
  {
    question: "Und noch ein weiterer Platzhalter?",
    answer:
      "Derzeit zählen wir 15 aktive Mitglieder, wachsen jedoch bei fast jedem Spieltag weiter.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Häufig gestellte Fragen
        </h2>
        <dl className="mt-16 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <Section faq={faq} key={faq.question} />
          ))}
        </dl>
      </div>
    </div>
  );
}
