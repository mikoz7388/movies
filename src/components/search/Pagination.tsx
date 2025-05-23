import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  return (
    <div className="mb-6 mt-10 flex items-center justify-center gap-2">
      <button
        onClick={onPrevPage}
        disabled={currentPage <= 1}
        className="flex items-center rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="mr-1 size-5 " />
        Previous
      </button>

      <div className="flex items-center rounded-lg bg-gray-800 px-4 py-2 text-white">
        <span className="font-medium">{currentPage}</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-300">{totalPages}</span>
      </div>

      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className="flex items-center rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight className="ml-1 size-5 " />
      </button>
    </div>
  );
}
