"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
	const [numPages, setNumPages] = useState<number>();
	const [isMobile, setIsMobile] = useState<boolean>();

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	// remove the blob
	useEffect(() => {
		const element = document.getElementById("blob");
		if (!element) return;
		element.remove();
	}, []);

	useEffect(() => {
		window.innerWidth > 1500 ? setIsMobile(false) : setIsMobile(true);
	}, []);

	return (
		<div className="">
			<div id="pdf-navbar" className="h-16 w-full">
				<Link
					href={"/"}
					scroll={false}
					id="go-back-button"
					className="bg-dark-purple h-10 w-10 lg:h-20 lg:w-20 fixed top-4 lg:top-32 left-7 lg:left-32 rounded-full lg:border-2 border-solid z-20 flex hover:scale-110 transition-transform"
				>
					<span className="m-auto font-semibold leading-tight">
						<ArrowLeft className="size-6 lg:size-8 text-teal-50" />
					</span>
				</Link>
				<Link
					href={
						"https://drive.google.com/uc?export=download&id=1T6KBAnDuYT9WOldc_S3v4Z3JXDU-Q2wp"
					}
					scroll={false}
					id="download-button"
					className=""
				>
					<span
						id="download-button"
						className="bg-dark-purple h-10 w-10 lg:h-20 lg:w-20 fixed top-4 right-7 lg:top-32 lg:right-32 rounded-full lg:border-2 border-solid z-20 flex hover:scale-110 transition-transform"
					>
						<Download className="m-auto size-6 lg:size-8 text-teal-50" />
					</span>
				</Link>
			</div>
			<Document
				file="./resume.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
				loading={<PDFSkeleton />}
				className={"flex flex-col"}
			>
				{Array.from(new Array(numPages), (el, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						canvasBackground="transparent"
						width={200}
						scale={isMobile ? 2 : 6}
						className={"py-2 mx-auto"}
					/>
				))}
			</Document>
		</div>
	);
};

const PDFSkeleton = () => {
	return (
		<div id="skeleton" className="w-screen flex flex-col">
			<div className="mx-auto">
				<Skeleton className="lg:h-[55rem] lg:w-[50rem] h-[30rem] w-96 mx-4 mb-4" />
				<Skeleton className="lg:h-[55rem] lg:w-[50rem] h-[30rem] w-96 mx-4 mb-4" />
				<Skeleton className="lg:h-[55rem] lg:w-[50rem] h-[30rem] w-96 mx-4 mb-4" />
			</div>
		</div>
	);
};

export default Resume;
