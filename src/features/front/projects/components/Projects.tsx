import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { getFeaturedProjects } from "@/features/utils/actions";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Project } from "@/types";

const Projects = async () => {
	const supabase = await createClient();

	const projects: Project[] = await getFeaturedProjects({ supabase });

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
								<Image
									src={project.image}
									alt={project.title}
									width={150}
									height={150}
									className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
								/>
								<div className="z-10 sm:order-2 sm:col-span-6">
									<h3>
										<Link
											href={{
												pathname: `/project/${project.id}`,
												query: { from: "home" },
											}}
											scroll={false}
											className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
										>
											<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
											<ViewTransition
												name={`project-name-transition-${project.id}`}
											>
												<span className="inline-block">
													{project.title}
												</span>
											</ViewTransition>
										</Link>
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
														<div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
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
						className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group text-base"
					>
						<span>
							<span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
								View Full Project {""}
							</span>
							<span>
								<span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
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
