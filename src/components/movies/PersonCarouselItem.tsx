import { getIMG } from "@/lib/api";
import { type MovieDetailsWithCredits } from "@/types";
import { Link } from "react-router-dom";

interface PersonCarouselItemProps {
  cast: MovieDetailsWithCredits["credits"]["cast"][0];
}

export function PersonCarouselItem({ cast }: PersonCarouselItemProps) {
  const imageUrl = cast.profile_path
    ? getIMG(cast.profile_path, {
        type: "profile",
        size: "w185",
      })
    : "https://placekitten.com/200/300";

  return (
    <Link to={`/person/${cast.id}`}>
      <div className="w-[185px] overflow-hidden rounded-lg bg-muted-foreground">
        <img
          height={300}
          width={200}
          loading="lazy"
          className="min-w-[185px]"
          src={imageUrl}
          alt={`${cast.name} profile`}
        />

        <div className="flex h-24 flex-col justify-between p-2 text-lg font-semibold text-background">
          <p className="whitespace-pre-wrap">{cast.name}</p>
          <p className="text-sm text-primary-foreground">{cast.character}</p>
        </div>
      </div>
    </Link>
  );
}
