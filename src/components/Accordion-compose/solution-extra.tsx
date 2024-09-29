import { useCallback } from "react";
import type { Dispatch } from "react";
import { useAccordion, useAccordionContext } from "./useAccordion";
import type { AccordionState, AccordionAction } from "./useAccordion";
import { AccordionContext } from "./acc-context";

export function AccordionProvider({
	state,
	dispatch,
	// toggleAccordion,
	children,
}: {
	children: React.ReactNode;
	state: AccordionState;
	dispatch: Dispatch<AccordionAction>;
	// toggleAccordion: () => void;
}) {
	console.log("state", state.isOpen);

	return (
		<AccordionContext.Provider value={{ state, dispatch }}>
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
						console.log("clicked");
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
					onClick={() => {
						console.log("clicked");
						toggleAccordion();
					}}
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
