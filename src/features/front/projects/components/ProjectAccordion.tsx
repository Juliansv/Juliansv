import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface ProjectAccordionProps {
	description: string;
	features: string;
	technologies: string;
	code_repository: string;
}

const ProjectAccordion = ({
	description,
	features,
	technologies,
	code_repository,
}: ProjectAccordionProps) => {
	let repository;
	if (code_repository.startsWith("href=")) {
		repository = (
			<Link
				href={code_repository.slice(5)}
				dangerouslySetInnerHTML={{ __html: "GitHub Repository" }}
				className="font-bold hover:text-teal-500"
			/>
		);
	} else {
		repository = <span className="italic">{code_repository}</span>;
	}

	return (
		<Accordion
			type="single"
			collapsible
			className="w-full lg:w-1/2 group/list"
		>
			<AccordionItem
				value="item-1"
				className="group lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
			>
				<AccordionTrigger className="font-bold">
					Description
				</AccordionTrigger>
				<AccordionContent>
					<span
						dangerouslySetInnerHTML={{ __html: description }}
					></span>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value="item-2"
				className="lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
			>
				<AccordionTrigger className="font-bold">
					Features
				</AccordionTrigger>
				<AccordionContent>
					<span dangerouslySetInnerHTML={{ __html: features }}></span>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value="item-3"
				className="lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
			>
				<AccordionTrigger className="font-bold">
					Technologies
				</AccordionTrigger>
				<AccordionContent>
					<span
						dangerouslySetInnerHTML={{ __html: technologies }}
					></span>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem
				value="item-4"
				className="lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
			>
				<AccordionTrigger className="font-bold">Code</AccordionTrigger>
				<AccordionContent>{repository}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ProjectAccordion;
