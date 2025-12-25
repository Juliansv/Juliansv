"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, useCallback } from "react";

type LinkProps = ComponentProps<typeof Link>;

interface ViewTransitionLinkProps extends LinkProps {
	children: React.ReactNode;
}

export function ViewTransitionLink({
	children,
	href,
	onClick,
	...props
}: ViewTransitionLinkProps) {
	const router = useRouter();

	const handleClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			// Call the original onClick if provided
			onClick?.(e);

			// Don't handle if default was prevented or if modifier keys are pressed
			if (
				e.defaultPrevented ||
				e.ctrlKey ||
				e.metaKey ||
				e.shiftKey ||
				e.altKey
			) {
				return;
			}

			// Check if View Transitions API is supported
			if (!document.startViewTransition) {
				return; // Let the Link handle navigation normally
			}

			// Prevent default Link behavior
			e.preventDefault();

			// Lock hover state to prevent flash during transition
			const groupElement = e.currentTarget.closest(".group");
			if (groupElement) {
				groupElement.setAttribute("data-transitioning", "true");
			}

			// Get the URL string from href
			const url = typeof href === "string" ? href : href.pathname || "/";

			// Start the view transition
			document
				.startViewTransition(() => {
					router.push(url);
				})
				.finished.catch(() => {
					// Cleanup on error (success cleanup happens via page navigation)
					groupElement?.removeAttribute("data-transitioning");
				});
		},
		[href, onClick, router]
	);

	return (
		<Link href={href} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
