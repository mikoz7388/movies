import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonDetails as TPersonDetails } from "@/types";
import { PersonInfo } from "./PersonInfo";

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
          <PersonInfo
            birthday={birthday}
            gender={gender}
            place_of_birth={place_of_birth}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
