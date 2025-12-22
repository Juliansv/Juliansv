import { getExperienceBySlug, getAdjacentExperiences } from "@/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";

interface ExperienceDetailProps {
	slug: string;
}

const ExperienceDetail = async ({ slug }: ExperienceDetailProps) => {
	const experience = getExperienceBySlug(slug);

	if (!experience) {
		return (
			<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12">
				<p>Experience not found</p>
			</div>
		);
	}

	const { prev, next } = getAdjacentExperiences(slug);

	return (
		<div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-24">
			{/* Back navigation */}
			<ViewTransitionLink
				href="/#experience"
				className="group mb-8 inline-flex items-center font-semibold leading-tight text-sky-400"
			>
				<ArrowLeft className="mr-1 size-4 group-hover:-translate-x-2 transition-transform" />
				Back to home
			</ViewTransitionLink>

			{/* Header section */}
			<header className="mb-12">
				{experience.logo && (
					<div className="mb-6">
						<Image
							src={experience.logo}
							alt={`${experience.company} logo`}
							width={80}
							height={80}
							className="rounded-lg"
						/>
					</div>
				)}
				<h1
					className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl mb-2"
					style={{ viewTransitionName: `exp-title-${experience.slug}` }}
				>
					{experience.position} · {experience.company}
				</h1>
				<p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
					{experience.startDate} — {experience.endDate}
				</p>
			</header>

			{/* Description */}
			<section className="mb-12">
				<p className="text-lg leading-relaxed text-slate-300">
					{experience.description}
				</p>
			</section>

			{/* Key Highlights */}
			{experience.highlights.length > 0 && (
				<section className="mb-12">
					<h2 className="text-xl font-semibold text-sky-400 uppercase tracking-wide mb-4">
						Key Highlights
					</h2>
					<ul className="space-y-3">
						{experience.highlights.map((highlight, index) => (
							<li
								key={index}
								className="flex items-start text-slate-300"
							>
								<span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
								{highlight}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Technologies */}
			{experience.technologies.length > 0 && (
				<section className="mb-12">
					<h2 className="text-xl font-semibold text-sky-400 uppercase tracking-wide mb-4">
						Technologies
					</h2>
					<ul className="flex flex-wrap gap-2">
						{experience.technologies.map((tech, index) => (
							<li
								key={index}
								className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-sm font-medium leading-5 text-sky-400"
							>
								{tech}
							</li>
						))}
					</ul>
				</section>
			)}

			{/* Navigation between experiences */}
			<nav className="mt-16 pt-8 border-t border-slate-300/10">
				<div className="flex justify-between items-center">
					{prev ? (
						<ViewTransitionLink
							href={`/experience/${prev.slug}`}
							className="group flex items-center text-slate-400 hover:text-sky-400 transition-colors"
						>
							<ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
							<div className="text-left">
								<p className="text-xs uppercase tracking-wide text-slate-500">
									Previous
								</p>
								<p className="font-medium">{prev.position}</p>
							</div>
						</ViewTransitionLink>
					) : (
						<div />
					)}
					{next ? (
						<ViewTransitionLink
							href={`/experience/${next.slug}`}
							className="group flex items-center text-slate-400 hover:text-sky-400 transition-colors"
						>
							<div className="text-right">
								<p className="text-xs uppercase tracking-wide text-slate-500">
									Next
								</p>
								<p className="font-medium">{next.position}</p>
							</div>
							<ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
						</ViewTransitionLink>
					) : (
						<div />
					)}
				</div>
			</nav>
		</div>
	);
};

export default ExperienceDetail;
