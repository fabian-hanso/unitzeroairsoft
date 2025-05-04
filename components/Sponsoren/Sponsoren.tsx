export default function Sponsoren() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Wir werden von folgenden Sponsoren unterstützt:
        </h2>
        <div className="mx-auto mt-10 max-w-lg items-center sm:max-w-xl lg:mx-0 lg:max-w-none flex flex-row justify-between">
          <div className="flex items-center gap-4 w-full group justify-center">
            <img
              alt="Begadi"
              src="/Begadi.webp"
              width={48}
              height={48}
              className="col-span-2 h-12 w-auto grayscale group-hover:grayscale-0"
            />
            <p className="text-stone-900">Begadi</p>
          </div>

          <div className="flex items-center gap-4 w-full group justify-center">
            <img
              alt="Revice Media"
              src="/Revice.svg"
              width={48}
              height={48}
              className="col-span-2 h-8 w-auto grayscale group-hover:grayscale-0"
            />
          </div>

          <div className="flex items-center gap-4 w-full group justify-center">
            <img
              alt="Revice Media"
              src="/Airsoft2go.png"
              width={48}
              height={48}
              className="col-span-2 h-12 w-auto grayscale group-hover:grayscale-0"
            />
          </div>

          <div className="flex items-center gap-4 w-full group justify-center">
            <img
              alt="Revice Media"
              src="/badagency-shop-logo-main.png"
              width={48}
              height={48}
              className="col-span-2 h-12 w-auto grayscale group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
