import { useRef } from "react";
import "./App.css";
import {
	AccordionContainer,
	AHeaderClosed,
	AccordionProvider,
	AHeaderOpen,
	AccordionBody,
} from "./components/Accordion-compose/solution.tsx";

function App() {
	const cbRef = useRef<() => void>();
	const toggleOutsideCb = (cb: () => void) => {
		cbRef.current = cb;
	};

	return (
		<>
			<div>
				<button
					type="button"
					onClick={() => {
						cbRef.current?.();
					}}
				>
					open outside
				</button>
			</div>
			<AccordionProvider onToggle={toggleOutsideCb}>
				<AccordionContainer>
					<AHeaderClosed>
						<span className="custom-header">
							Why do programmers prefer to code in dark mode? 🚀 +{" "}
						</span>
					</AHeaderClosed>
					<AHeaderOpen>
						Why do programmers prefer to code in dark mode? 🚀 -{" "}
					</AHeaderOpen>
					<AccordionBody>
						<div className="custom-content">
							Everybody knows that the light attracts bugs
						</div>
					</AccordionBody>
				</AccordionContainer>
			</AccordionProvider>
		</>
	);
}

export default App;
