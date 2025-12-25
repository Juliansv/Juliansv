import { getProjectBySlug, getAdjacentProjects } from "@/data";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";

interface SingleProjectProps {
	slug: string;
}

const SingleProject = async ({ slug }: SingleProjectProps) => {
	const project = getProjectBySlug(slug);

	if (!project) {
		return (
			<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12">
				<p>Project not found</p>
			</div>
		);
	}

	const { prev, next } = getAdjacentProjects(slug);

	return (
		<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-24">
			{/* Header with back button and visit link */}
			<div className="mb-8 flex items-center justify-between">
				<BackButton />
				<Link
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group inline-flex items-center font-semibold leading-tight text-sky-400 transition-colors hover:text-sky-300"
				>
					Visit Site
					<ExternalLink className="ml-1 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</Link>
			</div>

			{/* Project title and meta */}
			<header className="mb-12 text-center">
				<h1
					className="mb-4 text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl"
					style={{ viewTransitionName: `project-title-${project.slug}` }}
				>
					{project.title}
				</h1>
				<div className="flex items-center justify-center gap-3 text-slate-400">
					<span className="font-medium">{project.year}</span>
					<span className="text-slate-600">·</span>
					<div className="flex flex-wrap justify-center gap-2">
						{project.stack.map((tech, index) => (
							<span key={index} className="text-sm text-sky-400">
								{tech}
								{index < project.stack.length - 1 && (
									<span className="ml-2 text-slate-600">·</span>
								)}
							</span>
						))}
					</div>
				</div>
			</header>

			{/* Hero image */}
			<section className="mb-16">
				<div style={{ viewTransitionName: `project-image-${project.slug}` }}>
					<Zoom>
						<Image
							src={project.image}
							alt={`Screenshot of ${project.title} showing the main interface and features`}
							width={1200}
							height={600}
							className="h-auto w-full rounded-lg border border-slate-200/10"
							priority
							loading="eager"
						/>
					</Zoom>
				</div>
			</section>

			{/* Overview section */}
			<section className="mb-16">
				<h2 className="mb-4 border-b border-slate-300/10 pb-2 text-xl font-semibold uppercase tracking-wide text-sky-400">
					Overview
				</h2>
				<div
					className="prose prose-slate prose-invert max-w-none text-lg leading-relaxed text-slate-300"
					dangerouslySetInnerHTML={{ __html: project.longDescription }}
				/>
			</section>

			{/* Key Features section */}
			{project.features.length > 0 && (
				<section className="mb-16">
					<h2 className="mb-4 border-b border-slate-300/10 pb-2 text-xl font-semibold uppercase tracking-wide text-sky-400">
						Key Features
					</h2>
					<ul className="space-y-3">
						{project.features.map((feature, index) => (
							<li key={index} className="flex items-start text-slate-300">
								<span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
								{feature}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Technologies section */}
			{project.technologies.length > 0 && (
				<section className="mb-16">
					<h2 className="mb-4 border-b border-slate-300/10 pb-2 text-xl font-semibold uppercase tracking-wide text-sky-400">
						Technologies
					</h2>
					<ul className="flex flex-wrap gap-2">
						{project.technologies.map((tech, index) => (
							<li
								key={index}
								className="flex items-center rounded-full bg-sky-400/10 px-4 py-2 text-sm font-medium leading-5 text-sky-400"
							>
								{tech}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Links section */}
			<section className="mb-16 flex flex-wrap gap-4">
				{project.codeRepository && (
					<Link
						href={project.codeRepository}
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-2 rounded-lg border border-slate-300/20 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-sky-400"
					>
						<Github className="size-5" />
						View Code Repository
					</Link>
				)}
				<Link
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group inline-flex items-center gap-2 rounded-lg bg-sky-400/10 px-6 py-3 font-medium text-sky-400 transition-colors hover:bg-sky-400/20"
				>
					<ExternalLink className="size-5" />
					Visit Live Site
				</Link>
			</section>

			{/* Navigation between projects */}
			<nav className="mt-16 border-t border-slate-300/10 pt-8">
				<div className="flex items-center justify-between">
					{prev ? (
						<ViewTransitionLink
							href={`/project/${prev.slug}`}
							className="group flex items-center text-slate-400 transition-colors hover:text-sky-400"
						>
							<ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
							<div className="text-left">
								<p className="text-xs uppercase tracking-wide text-slate-500">
									Previous Project
								</p>
								<p className="font-medium">{prev.title}</p>
							</div>
						</ViewTransitionLink>
					) : (
						<div />
					)}
					{next ? (
						<ViewTransitionLink
							href={`/project/${next.slug}`}
							className="group flex items-center text-slate-400 transition-colors hover:text-sky-400"
						>
							<div className="text-right">
								<p className="text-xs uppercase tracking-wide text-slate-500">
									Next Project
								</p>
								<p className="font-medium">{next.title}</p>
							</div>
							<ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
						</ViewTransitionLink>
					) : (
						<div />
					)}
				</div>
			</nav>
		</div>
	);
};

export default SingleProject;
