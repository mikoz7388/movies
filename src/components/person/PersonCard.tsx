import { getIMG } from "@/lib/api";
import { PersonDetails as TPersonDetails } from "@/types";
import { PersonDetails } from "./PersonDetails";

interface PersonCardProps {
  person: TPersonDetails;
}

export function PersonCard({ person }: PersonCardProps) {
  const imageUrl = person.profile_path
    ? getIMG(person.profile_path, {
        type: "profile",
        size: "w185",
      })
    : "https://placehold.co/185x185";

  return (
    <div className="mx-auto max-w-6xl gap-8 rounded-lg bg-primary-foreground p-8 text-base shadow-lg md:flex md:justify-between">
      <div className="flex shrink-0 flex-col items-center sm:flex-row">
        {person.profile_path && (
          <img
            src={imageUrl}
            alt={`${person.name}'s profile`}
            className="mr-4 size-32 rounded-full object-cover object-center"
          />
        )}
        <div className="mt-4">
          <h1 className="text-2xl font-semibold ">{person.name}</h1>
          <p className="text-gray-600">{person.known_for_department}</p>
        </div>
      </div>
      <PersonDetails person={person} />
    </div>
  );
}
