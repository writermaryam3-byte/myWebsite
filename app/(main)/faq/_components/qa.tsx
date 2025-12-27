import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@/lib/generated/prisma/client";



const Qa = ({qaObj}: {qaObj: Faq}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value={`item-${qaObj.id}`}>
        <AccordionTrigger>{qaObj.question}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            {qaObj.answer}
          </p>
 
        </AccordionContent>
      </AccordionItem>
     
    </Accordion>
  );
};

export default Qa;
