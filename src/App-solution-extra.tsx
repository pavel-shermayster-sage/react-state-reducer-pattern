import "./App.css";
import {
	AccordionContainer,
	AHeaderClosed,
	AccordionProvider,
	AHeaderOpen,
	AccordionBody,
} from "./components/Accordion-compose/solution-extra.tsx";
import {
	useAccordion,
	accordionReducer,
} from "./components/Accordion-compose/useAccordion.tsx";
import type {
	AccordionState,
	AccordionAction,
} from "./components/Accordion-compose/useAccordion.tsx";

const modifiedReducer = (
	state: AccordionState & { agree: boolean; isBlocked: boolean },
	action: AccordionAction | { type: "open_with_agree" } | { type: "agree" },
) => {
	if (action.type === "open_with_agree") {
		return state.agree
			? state
			: {
					...state,
					agree: false,
					isBlocked: true,
					isOpen: true,
				};
	}
	if (action.type === "agree") {
		return {
			...state,
			agree: true,
			isBlocked: false,
		};
	}
	if (state.isBlocked) {
		return state;
	}
	return accordionReducer(state, action);
};

function App() {
	const acc = useAccordion(modifiedReducer as typeof accordionReducer);
	const { state, dispatch } = acc as {
		state: AccordionState & { agree: boolean; isBlocked: boolean };
		dispatch: React.Dispatch<
			AccordionAction | { type: "open_with_agree" } | { type: "agree" }
		>;
	};

	return (
		<>
			<div>
				<button
					type="button"
					onClick={() => {
						dispatch({ type: "open_with_agree" });
					}}
				>
					Open agreement
				</button>
			</div>
			<AccordionProvider {...acc}>
				<AccordionContainer>
					<AHeaderClosed>
						<span className="custom-header">
							Why do frontend devs always eat alone? 🚀 +{" "}
						</span>
					</AHeaderClosed>
					<AHeaderOpen>
						Why do frontend devs always eat alone? 🚀 -{" "}
					</AHeaderOpen>
					<AccordionBody>
						<div className="custom-content">
							They don't know how to join tables!
							<label>
								Agree?
								<input
									checked={state.agree || false}
									type="checkbox"
									onChange={() => {
										dispatch({ type: "agree" });
									}}
								/>
							</label>
						</div>
					</AccordionBody>
				</AccordionContainer>
			</AccordionProvider>
		</>
	);
}

export default App;
