import { getExperienceInfo } from "@/features/utils/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Job } from "@/types";

const Experience = async () => {
	const supabase = await createClient();

	const experience: Job[] = await getExperienceInfo({ supabase });

	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Experience
				</h2>
			</div>
			<div>
				<ol className="group/list">
					{experience.map((job, index) => (
						<li key={index} className="mb-12">
							<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
								<header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
									{job.startedAt} - {job.finishedAt}
								</header>
								<div className="z-10 sm:col-span-6">
									<h3 className="font-medium leading-snug text-slate-200">
										{job.position + ` · ` + job.company}
									</h3>
									<p className="mt-2 text-sm leading-normal">
										{job.description}
									</p>
									<ul className="mt-2 flex flex-wrap">
										{job.techStack.map((skill, index) => (
											<li
												key={index}
												className="mr-1.5 mt-2"
											>
												<div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
													{skill}
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					))}
				</ol>
				<div className="mt-12">
					<Link
						href="https://drive.google.com/file/d/13smCcgiBdyFLyl84QtOG0EQa4onTMIWr/view?usp=sharing"
						className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
					>
						View Full Resume
					</Link>
				</div>
			</div>
		</>
	);
};

export default Experience;
