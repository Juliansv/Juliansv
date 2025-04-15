"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = () => {
	const from = useSearchParams().get("from");
	const router = useRouter();
	return (
		<Link
			href={from === "archive" ? "/archive" : "/"}
			scroll={false}
			className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-50"
		>
			<span>
				<ArrowLeft className="mr-1 size-4 group-hover:-translate-x-2 transition-transform" />
			</span>
			Back to {from === "archive" ? "archive page" : "home page"}
		</Link>
	);
};

export default BackButton;
