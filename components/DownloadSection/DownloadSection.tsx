import { DocumentIcon } from "@heroicons/react/24/outline";

export default function DownloadSection() {
  return (
    <div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-gray-100 sm:col-span-2 sm:px-0">
            <dd className="mt-2 text-sm text-gray-900">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    <DocumentIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-blue/70"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        UnitZero-Regelwerk.pdf
                      </span>
                      <span className="shrink-0 text-gray-400">84kb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a
                      href="/UnitZero-Regelwerk.pdf"
                      target="_blank"
                      className="font-medium text-blue hover:text-blue/80"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
