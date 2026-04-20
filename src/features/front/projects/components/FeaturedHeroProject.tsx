import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import type { Project } from "@/data/types";

interface FeaturedHeroProjectProps {
	project: Project;
}

export const FeaturedHeroProject = ({ project }: FeaturedHeroProjectProps) => {
	return (
		<section
			className="group relative mb-12 rounded-lg p-5 ring-1 ring-sky-400/20 transition hover:bg-slate-800/30 md:p-6"
			aria-labelledby={`hero-project-${project.slug}-title`}
		>
			<div className="grid gap-6 sm:grid-cols-5 sm:gap-8">
				<div
					className="sm:col-span-2"
					style={{ viewTransitionName: `project-image-${project.slug}` }}
				>
					<Image
						src={project.image}
						alt={`Screenshot of ${project.title} - ${project.description.slice(0, 100)}`}
						width={400}
						height={250}
						className="w-full rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
					/>
				</div>
				<div className="sm:col-span-3">
					<h3
						id={`hero-project-${project.slug}-title`}
						className="text-xl font-semibold text-slate-200"
						style={{ viewTransitionName: `project-title-${project.slug}` }}
					>
						{project.title}
					</h3>
					<p className="mt-1 text-sm font-medium text-sky-400">
						Sift the roles. Tailor the approach.
					</p>
					<p className="mt-3 text-sm leading-normal text-slate-400">
						{project.description}
					</p>
					{project.stack && (
						<ul className="mt-3 flex flex-wrap">
							{project.stack.map((stackName) => (
								<li key={stackName} className="mr-1.5 mt-2">
									<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
										{stackName}
									</div>
								</li>
							))}
						</ul>
					)}
					<div className="mt-5 flex flex-wrap items-center gap-4">
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit ${project.title} live site (opens in new tab)`}
							className="inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 transition hover:bg-sky-400/20"
						>
							Visit site
							<ArrowUpRight className="h-4 w-4" />
						</a>
						<ViewTransitionLink
							href={`/project/${project.slug}`}
							className="text-sm font-medium text-slate-200 underline decoration-slate-500 underline-offset-4 transition hover:text-sky-400 hover:decoration-sky-400"
						>
							Read more
						</ViewTransitionLink>
					</div>
				</div>
			</div>
		</section>
	);
};
