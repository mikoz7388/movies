import { getIMG } from "@/lib/api";
import { type MovieDetailsWithCredits } from "@/types";

interface PersonCarouselItemProps {
  cast: MovieDetailsWithCredits["credits"]["cast"][0];
}

export function PersonCarouselItem({ cast }: PersonCarouselItemProps) {
  return (
    <div className="w-[185px] overflow-hidden rounded-lg bg-muted-foreground">
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
      <div className="flex h-24 flex-col justify-between px-2 py-2 text-lg font-semibold text-background">
        <p className="whitespace-pre-wrap">{cast.name}</p>
        <p className="text-sm text-primary-foreground">{cast.character}</p>
      </div>
    </div>
  );
}
