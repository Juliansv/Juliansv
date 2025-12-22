"use client";

import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";

const BackButton = () => {
	const from = useSearchParams().get("from");
	return (
		<ViewTransitionLink
			href={from === "archive" ? "/archive" : "/#projects"}
			scroll={false}
			className="group mb-2 inline-flex items-center font-semibold leading-tight text-sky-400"
		>
			<span>
				<ArrowLeft className="mr-1 size-4 group-hover:-translate-x-2 transition-transform" />
			</span>
			Back to {from === "archive" ? "archive page" : "home page"}
		</ViewTransitionLink>
	);
};

export default BackButton;
