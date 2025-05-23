import { Film, Grid, Tv, User } from "lucide-react";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: "all" | "movie" | "tv" | "person") => void;
  counts: {
    all: number;
    movie: number;
    tv: number;
    person: number;
  };
}

export default function FilterTabs({
  activeFilter,
  onFilterChange,
  counts,
}: FilterTabsProps) {
  const tabs = [
    { id: "all", label: "All", icon: Grid, count: counts.all },
    { id: "movie", label: "Movies", icon: Film, count: counts.movie },
    { id: "tv", label: "TV Shows", icon: Tv, count: counts.tv },
    { id: "person", label: "People", icon: User, count: counts.person },
  ] as const;

  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-700 pb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeFilter === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`flex items-center rounded-lg px-4 py-2 font-medium transition-colors ${
              isActive
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Icon className="mr-2 size-4" />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`ml-2 rounded-full px-2 py-1 text-xs ${
                  isActive
                    ? "bg-black text-yellow-500"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
