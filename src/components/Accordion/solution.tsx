import { useEffect, useState } from "react";
import "./style.css";

interface AccordionProps {
	title: string;
	headerStyles?: string;
	contentStyles?: string;
	headerIcon?: string;
	contentPosition?: "top" | "bottom";
	content: string;
	toggleOutside?: (cb: () => void) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
	title,
	content,
	headerStyles,
	contentStyles,
	headerIcon,
	contentPosition = "bottom",
	toggleOutside,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};
	useEffect(() => {
		if (toggleOutside) {
			toggleOutside(() => setIsOpen(!isOpen));
		}
	}, [isOpen, toggleOutside]);

	return (
		<div className={`accordion ${contentPosition}`}>
			<div
				className={`accordion-header ${headerStyles || ""}`}
				onClick={toggleAccordion}
			>
				<h2>
					{title} {headerIcon}
				</h2>
				<span>{isOpen ? "-" : "+"}</span>
			</div>
			{isOpen && (
				<div className={`accordion-content ${contentStyles || ""}`}>
					{content}
				</div>
			)}
		</div>
	);
};
