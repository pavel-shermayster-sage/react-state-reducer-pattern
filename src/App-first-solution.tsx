import "./App.css";

import { Accordion } from "./components/Accordion/solution.tsx";
import { useRef } from "react";

function App() {
	const cbRef = useRef<() => void>();
	const toggleOutsideCb = (cb: () => void) => {
		cbRef.current = cb;
	};

	return (
		<>
			<button type="button" onClick={() => cbRef.current?.()}>
				open outside
			</button>
			<Accordion
				toggleOutside={toggleOutsideCb}
				contentPosition={"top"}
				title="React"
				headerIcon={"🚀"}
				headerStyles={"custom-header"}
				contentStyles={"custom-content"}
				content="A JavaScript library for building user interfaces."
			/>
		</>
	);
}

export default App;
