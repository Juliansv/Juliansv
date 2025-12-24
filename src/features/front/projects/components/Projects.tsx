import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data";
import { ViewTransitionLink } from "@/components/ViewTransitionLink";

const Projects = async () => {
	const projects = featuredProjects;

	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Projects
				</h2>
			</div>
			<div>
				<ul className="group/list">
					{projects.map((project, index) => (
						<li key={index} className="mb-12">
							<div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
								{/* image */}
								<div
									className="sm:order-1 sm:col-span-2"
									style={{ viewTransitionName: `project-image-${project.slug}` }}
								>
									<Image
										src={project.image}
										alt={`Screenshot of ${project.title} - ${project.description.slice(0, 100)}`}
										width={150}
										height={150}
										className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:translate-y-1"
									/>
								</div>
								<div className="z-10 sm:order-2 sm:col-span-6">
									<h3>
										<ViewTransitionLink
											href={`/project/${project.slug}`}
											className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400  group/link text-base"
										>
											<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
											<span
												className="inline-block"
												style={{ viewTransitionName: `project-title-${project.slug}` }}
											>
												{project.title}
											</span>
										</ViewTransitionLink>
									</h3>
									<p className="mt-2 text-sm leading-normal">
										{project.description}
									</p>
									{project.stack && (
										<ul className="mt-2 flex flex-wrap">
											{project.stack.map(
												(stackName, index) => (
													<li
														key={index}
														className="mr-1.5 mt-2"
													>
														<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
															{stackName}
														</div>
													</li>
												)
											)}
										</ul>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
				<div>
					<Link
						href="/archive"
						className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 group text-base"
					>
						<span>
							<span className="border-b border-transparent pb-px transition group-hover:border-sky-400 motion-reduce:transition-none">
								View Full Project {""}
							</span>
							<span>
								<span className="border-b border-transparent pb-px transition group-hover:border-sky-400 motion-reduce:transition-none">
									Archive
								</span>
								<ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-2 group-focus-visible:-translate-x-2" />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Projects;

export const dynamic = "force-static";

export const revalidate = 3600;
