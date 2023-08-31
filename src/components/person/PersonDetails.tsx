import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonDetails as TPersonDetails } from "@/types";

export function PersonDetails({
  person: { biography, birthday, place_of_birth, gender },
}: {
  person: TPersonDetails;
}) {
  return (
    <Accordion type="single" collapsible className="grow">
      <AccordionItem value="bio">
        <AccordionTrigger>Biography</AccordionTrigger>
        <AccordionContent>
          {biography.split("\n").map((paragraph, index) => (
            <p key={index} className="mt-4">
              {paragraph}
            </p>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="info">
        <AccordionTrigger>Personal Info</AccordionTrigger>
        <AccordionContent>
          {
            <>
              <p>
                <span className="font-semibold">Birthday:</span>{" "}
                {birthday || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Place of Birth:</span>{" "}
                {place_of_birth || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {gender === 1 ? "Female" : "Male"}
              </p>
            </>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
