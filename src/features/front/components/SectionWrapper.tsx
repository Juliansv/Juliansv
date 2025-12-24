"use client";
import { forwardRef } from "react";

interface SectionWrapperProps {
	children: React.ReactNode;
	id: string;
	styles: string;
	ariaLabel: string;
}

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
	({ children, id, styles, ariaLabel }, ref) => {
		return (
			<section id={id} ref={ref} className={styles} aria-label={ariaLabel}>
				{children}
			</section>
		);
	}
);

SectionWrapper.displayName = "SectionWrapper";
