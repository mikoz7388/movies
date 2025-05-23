export default function SearchSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="h-7 w-64 rounded bg-gray-800"></div>
        <div className="flex w-full sm:w-auto">
          <div className="h-10 flex-1 rounded-l-lg bg-gray-800 sm:w-64"></div>
          <div className="h-10 w-24 rounded-r-lg bg-gray-700"></div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-700 pb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-10 w-24 rounded-lg bg-gray-800"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg"
          >
            <div className="relative aspect-[2/3] bg-gray-700">
              <div className="absolute left-2 top-2 h-6 w-16 rounded-lg bg-gray-600"></div>
              <div className="absolute right-2 top-2 h-6 w-12 rounded-lg bg-gray-600"></div>
            </div>
            <div className="flex grow flex-col p-4">
              <div className="mb-2 h-6 w-full rounded bg-gray-700"></div>
              <div className="mb-4 h-4 w-1/2 rounded bg-gray-700"></div>
              <div className="mt-auto space-y-2">
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-2/3 rounded bg-gray-700"></div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="h-10 w-full rounded-lg bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 mt-10 flex items-center justify-center gap-2">
        <div className="h-10 w-28 rounded-lg bg-gray-800"></div>
        <div className="h-10 w-20 rounded-lg bg-gray-800"></div>
        <div className="h-10 w-28 rounded-lg bg-gray-800"></div>
      </div>
    </div>
  );
}
