import { getIMG } from "@/lib/api";
import { type MovieDetailsWithCredits } from "@/types";

interface PersonCarouselItemProps {
  cast: MovieDetailsWithCredits["credits"]["cast"][0];
}

export function PersonCarouselItem({ cast }: PersonCarouselItemProps) {
  return (
    <div>
      {cast.profile_path ? (
        <img
          height={278}
          width={185}
          loading="lazy"
          className="min-w-[185px]"
          src={getIMG(cast.profile_path, {
            type: "profile",
            size: "w185",
          })}
          alt={`${cast.name} profile`}
        />
      ) : (
        <img
          height={278}
          width={185}
          className="min-h-[278px] min-w-[185px]"
          src="https://placekitten.com/185/278"
          alt={`${cast.name} profile`}
        />
      )}
      <p>{cast.name}</p>
    </div>
  );
}
