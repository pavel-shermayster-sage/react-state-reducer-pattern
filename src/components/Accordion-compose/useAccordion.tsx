import { useCallback, useContext, useReducer } from "react";
import { AccordionContext } from "./acc-context";
export type AccordionState = {
	isOpen: boolean;
};
export type AccordionAction = {
	type: "toggle_accordion";
};
const initialState: AccordionState = {
	isOpen: false,
};
export function accordionReducer(
	state: AccordionState,
	action: AccordionAction,
) {
	switch (action.type) {
		case "toggle_accordion":
			return {
				...state,
				isOpen: !state.isOpen,
			};
		default:
			return state;
	}
}
export function useAccordion(
	reducer?: (state: AccordionState, action: AccordionAction) => AccordionState,
) {
	const [state, dispatch] = useReducer(
		reducer || accordionReducer,
		initialState,
	);

	return {
		state,
		dispatch,
	};
}

export function useAccordionContext() {
	const { state, dispatch } = useContext(AccordionContext);
	const toggleAccordion = useCallback(() => {
		dispatch({ type: "toggle_accordion" });
	}, [dispatch]);
	return {
		isOpen: state.isOpen,
		toggleAccordion,
	};
}
