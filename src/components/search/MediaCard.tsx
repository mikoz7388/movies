import { Calendar, Film, Star, Tv, User } from "lucide-react";
import { Link } from "react-router-dom";
import { MultiSearchResult } from "./SearchResults";

interface MediaCardProps {
  result: MultiSearchResult;
}

export default function MediaCard({ result }: MediaCardProps) {
  const getImageUrl = () => {
    if (result.media_type === "person") {
      return result.profile_path
        ? `https://image.tmdb.org/t/p/w185${result.profile_path}`
        : "https://www.n21.my/wp-content/uploads/2019/08/placeholder-500x750-200x300.png";
    } else {
      return result.poster_path
        ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
        : "https://www.n21.my/wp-content/uploads/2019/08/placeholder-500x750-200x300.png";
    }
  };

  const getTitle = () => {
    switch (result.media_type) {
      case "movie":
        return result.title;
      case "tv":
        return result.name;
      case "person":
        return result.name;
      default:
        return "Unknown";
    }
  };

  const getSubtitle = () => {
    switch (result.media_type) {
      case "movie":
        return result.release_date
          ? new Date(result.release_date).getFullYear()
          : "N/A";
      case "tv":
        return result.first_air_date
          ? new Date(result.first_air_date).getFullYear()
          : "N/A";
      case "person":
        return result.known_for_department;
      default:
        return "";
    }
  };

  const getRating = () => {
    if (result.media_type === "person") return null;
    return result.vote_average ? result.vote_average.toFixed(1) : "N/A";
  };

  const getOverview = () => {
    if (result.media_type === "person") {
      return `Known for ${result.known_for_department}. Popular ${
        result.job || "personality"
      } in the entertainment industry.`;
    }
    return result.overview;
  };

  const getMediaTypeIcon = () => {
    switch (result.media_type) {
      case "movie":
        return <Film className="size-4" />;
      case "tv":
        return <Tv className="size-4" />;
      case "person":
        return <User className="size-4" />;
      default:
        return null;
    }
  };

  const getMediaTypeColor = () => {
    switch (result.media_type) {
      case "movie":
        return "bg-blue-600";
      case "tv":
        return "bg-green-600";
      case "person":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getDetailsLink = () => {
    switch (result.media_type) {
      case "movie":
        return `/movies/${result.id}`;
      case "tv":
        return `/movies/${result.id}`;
      case "person":
        return `/person/${result.id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl() || "/placeholder.svg"}
          alt={getTitle()}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://www.n21.my/wp-content/uploads/2019/08/placeholder-500x750-200x300.png";
          }}
        />

        <div
          className={`absolute left-2 top-2 ${getMediaTypeColor()} flex items-center rounded-lg px-2 py-1`}
        >
          {getMediaTypeIcon()}
          <span className="ml-1 text-xs font-bold capitalize text-white">
            {result.media_type}
          </span>
        </div>

        {getRating() && (
          <div className="absolute right-2 top-2 flex items-center rounded-lg bg-black/75 px-2 py-1">
            <Star className="mr-1 size-4 fill-current text-yellow-500" />
            <span className="text-sm font-bold text-white">{getRating()}</span>
          </div>
        )}
      </div>

      <div className="flex grow flex-col p-4">
        <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-yellow-500">
          {getTitle()}
        </h3>

        <div className="mb-2 flex items-center text-sm text-gray-400">
          {result.media_type !== "person" && (
            <Calendar className="mr-1 size-4" />
          )}
          <span>{getSubtitle()}</span>
        </div>

        <p className="mt-auto line-clamp-3 text-sm leading-relaxed text-gray-300">
          {getOverview()}
        </p>
      </div>

      <div className="px-4 pb-4">
        <Link
          to={getDetailsLink()}
          className="block w-full rounded-lg bg-gray-700 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-gray-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
