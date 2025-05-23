import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FilterTabs from "./FilterTabs";
import MediaCard from "./MediaCard";
import Pagination from "./Pagination";
import SearchSkeleton from "./SearchSkeleton";
import { apiClient } from "@/lib/api";
import { Movie, Person, Tv } from "@/types";

type MultiSearchMovie = Movie & { media_type: "movie" };
type MultiSearchPerson = Person & { media_type: "person" };
type MultiSearchTv = Tv & { media_type: "tv" };

export type MultiSearchResult =
  | MultiSearchMovie
  | MultiSearchPerson
  | MultiSearchTv;

type MultiSearchApiResponse = {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
};

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = Number(pageParam);

  const [activeFilter, setActiveFilter] = useState<
    "all" | "movie" | "tv" | "person"
  >("all");

  const { data, isLoading, isError, error } = useQuery<
    MultiSearchApiResponse,
    Error
  >({
    queryKey: ["search", query, currentPage],
    queryFn: async () => {
      const response = await apiClient.get(`/search/multi`, {
        params: { query, page: currentPage },
      });
      return response.data;
    },
    keepPreviousData: true,
    enabled: !!query,
  });

  const handleFilterChange = (filter: "all" | "movie" | "tv" | "person") => {
    setActiveFilter(filter);
  };

  const handleNextPage = () => {
    if (data && currentPage < data.total_pages) {
      setSearchParams({ q: query, page: (currentPage + 1).toString() });
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ q: query, page: (currentPage - 1).toString() });
      window.scrollTo(0, 0);
    }
  };

  if (!query) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <h2 className="text-xl font-semibold">Please enter a search query.</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="py-10 text-center">
          <p className="mb-4 text-xl text-red-500">Error: {error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return <SearchSkeleton />;
  }

  const results = data.results;
  const movieCount = results.filter((r) => r.media_type === "movie").length;
  const tvCount = results.filter((r) => r.media_type === "tv").length;
  const personCount = results.filter((r) => r.media_type === "person").length;

  const filteredResults =
    activeFilter === "all"
      ? results
      : results.filter((r) => r.media_type === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold">
          {results.length > 0
            ? `Found ${results.length} results for "${query}"`
            : "No results found"}
        </h2>
      </div>

      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        counts={{
          all: results.length,
          movie: movieCount,
          tv: tvCount,
          person: personCount,
        }}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredResults.map((result) => (
          <MediaCard
            key={`${result.media_type}-${result.id}`}
            result={result}
          />
        ))}
      </div>

      {data.total_pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.total_pages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      )}
    </div>
  );
}
