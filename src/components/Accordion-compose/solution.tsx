import { createContext, useEffect, useReducer } from "react";
import type { Dispatch } from "react";
import type { AccordionState, AccordionAction } from "./useAccordion";
import { useAccordionContext } from "./useAccordion-solution";

const initialState: AccordionState = {
	isOpen: false,
};
function accordionReducer(state: AccordionState, action: AccordionAction) {
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
export const AccordionContext = createContext<{
	isOpen: boolean;
	toggleAccordion: () => void;
	dispatch: Dispatch<AccordionAction>;
}>({
	isOpen: false,
	toggleAccordion: () => {},
	dispatch: () => {},
});

export function AccordionProvider({
	onToggle,
	children,
}: { onToggle?: (cb: () => void) => void; children: React.ReactNode }) {
	const [state, dispatch] = useReducer(accordionReducer, initialState);
	const toggleAccordion = () => {
		dispatch({ type: "toggle_accordion" });
	};
	useEffect(() => {
		onToggle?.(() => dispatch({ type: "toggle_accordion" }));
	}, [onToggle]);
	return (
		<AccordionContext.Provider
			value={{ isOpen: state.isOpen, toggleAccordion, dispatch }}
		>
			{children}
		</AccordionContext.Provider>
	);
}
export function AccordionContainer({
	children,
	className = "",
}: { children: React.ReactNode; className?: string }) {
	return <div className={`accordion ${className}`}>{children}</div>;
}

export function AHeaderClosed({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { toggleAccordion, isOpen } = useAccordionContext();
	return (
		<>
			{isOpen ? null : (
				<button
					type="button"
					className={`accordion-header ${className}`}
					onClick={() => {
						console.log("old state", isOpen);
						toggleAccordion();
					}}
				>
					{children}
				</button>
			)}
		</>
	);
}

export function AHeaderOpen({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { toggleAccordion, isOpen } = useAccordionContext();
	return (
		<>
			{isOpen ? (
				<button
					type="button"
					className={`accordion-header ${className}`}
					onClick={toggleAccordion}
				>
					{children}
				</button>
			) : null}
		</>
	);
}

export function AccordionBody({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { isOpen } = useAccordionContext();
	return isOpen ? (
		<div className={`accordion-body ${className}`}>{children}</div>
	) : null;
}
