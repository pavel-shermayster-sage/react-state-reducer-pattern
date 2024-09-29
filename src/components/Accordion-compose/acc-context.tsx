import { createContext } from "react";
import type { Dispatch } from "react";
import type { AccordionAction, AccordionState } from "./useAccordion";

export const AccordionContext = createContext<{
	state: AccordionState;
	dispatch: Dispatch<AccordionAction>;
}>({
	state: { isOpen: false },
	dispatch: () => {},
});
