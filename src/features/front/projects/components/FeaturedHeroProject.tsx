import { ProjectImage } from "@/components/ProjectImage";
import { ArrowUpRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";
import type { Project } from "@/data/types";

interface FeaturedHeroProjectProps {
	project: Project;
}

export const FeaturedHeroProject = ({ project }: FeaturedHeroProjectProps) => {
	return (
		<section
			className="group relative mb-12 rounded-lg p-5 ring-1 ring-sky-400/20 transition md:p-6"
			aria-labelledby={`hero-project-${project.slug}-title`}
		>
			<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

			<div className="relative z-10">
				<div className="grid gap-6 sm:grid-cols-5 sm:gap-8">
					<div
						className="sm:col-span-2"
						style={{ viewTransitionName: `project-image-${project.slug}` }}
					>
						<ProjectImage
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
						>
							<ViewTransitionLink
								href={`/project/${project.slug}`}
								className="inline-flex items-baseline text-slate-200 transition hover:text-sky-400 focus-visible:text-sky-400"
							>
								<span className="absolute -inset-x-4 -inset-y-4 hidden rounded-md lg:-inset-x-6 lg:block" />
								<span
									className="inline-block"
									style={{
										viewTransitionName: `project-title-${project.slug}`,
									}}
								>
									{project.title}
								</span>
							</ViewTransitionLink>
						</h3>
						<p className="mt-1 text-sm font-medium text-sky-400">
							Sift the roles. Tailor the approach.
						</p>
						<p className="mt-3 text-sm leading-normal text-slate-400">
							{project.description}
						</p>
					</div>
				</div>

				<div className="mt-5 flex flex-wrap items-center justify-between gap-4">
					{project.stack && (
						<ul className="flex flex-wrap gap-2">
							{project.stack.map((stackName) => (
								<li key={stackName}>
									<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
										{stackName}
									</div>
								</li>
							))}
						</ul>
					)}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Visit ${project.title} live site (opens in new tab)`}
						className="relative z-20 inline-flex items-center gap-1 rounded-md bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 transition hover:bg-sky-400/20"
					>
						Visit site
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
			</div>
		</section>
	);
};
