import { useContext } from "react";
import { AccordionContext } from "./solution";

export function useAccordionContext() {
	const { isOpen, toggleAccordion } = useContext(AccordionContext);

	return {
		isOpen: isOpen,
		toggleAccordion,
	};
}
