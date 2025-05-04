import React from "react";

export default function UnderConstruction() {
  return (
    <div className="w-screen h-dvh overflow-hidden">
      {/* Mobile */}
      <img
        src="/Fabian.jpg"
        className="block lg:hidden object-cover w-full h-full object-top"
      />
      {/* Desktop */}
      <img
        src="/Fabian-Desktop.jpg"
        className="hidden lg:block object-cover w-full h-full object-top"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray opacity-95 flex flex-col justify-center items-center">
        <img
          src="/Logo-White.svg"
          className="w-30 h-30 lg:w-40 lg:h-40 mb-10"
        />
        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col justify-center items-center">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-white sm:text-5xl px-4 text-center">
            Hier arbeiten wir gerade!
          </h2>
          <p className="mt-6 text-lg/8 text-white text-center px-4">
            Schau gerne bei uns auf Instagram oder Discord vorbei, solange wir
            hier noch arbeiten. Wir werden unsere Webseite in Kürze
            veröffentlichen!
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://discord.gg/sKtYqYK6Y8"
            target="_blank"
            className="bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 flex gap-2 items-center"
          >
            <img src="/Discord.svg" className="h-4 w-auto" />
            <p>Discord</p>
          </a>
          <a
            href="https://www.instagram.com/unitzeroairsoft/"
            target="_blank"
            className="text-sm/6 font-semibold text-white"
          >
            Instagram <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
