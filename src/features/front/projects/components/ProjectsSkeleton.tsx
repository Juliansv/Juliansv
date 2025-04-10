import { Skeleton } from "@/components/ui/skeleton";

const ProjectsCardSkeleton = () => {
	return (
		<li className="mb-12">
			<div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
				<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
				<Skeleton className="w-32 h-32 col-span-2" />
				<div className="z-10 sm:order-2 sm:col-span-6">
					<h3>
						<div className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base">
							<span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
							<span>
								<Skeleton className="w-20 h-4" />
							</span>
						</div>
					</h3>
					<p className="mt-2 text-sm leading-normal flex flex-col gap-2">
						<Skeleton className="w-full h-3 sm:w-72" />
						<Skeleton className="w-full h-3 sm:w-72" />
						<Skeleton className="w-full h-3 sm:w-72" />
					</p>
					<ul className="mt-2 flex flex-wrap">
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
								<Skeleton className="w-10 h-4" />
							</div>
						</li>
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
								<Skeleton className="w-10 h-4" />
							</div>
						</li>
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
								<Skeleton className="w-10 h-4" />
							</div>
						</li>
					</ul>
				</div>
			</div>
		</li>
	);
};
const ProjectsSkeleton = () => {
	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Projects
				</h2>
			</div>
			<div>
				<ul className="group/list">
					<ProjectsCardSkeleton />
					<ProjectsCardSkeleton />
					<ProjectsCardSkeleton />
					<ProjectsCardSkeleton />
				</ul>
				<div>
					<div className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group text-base">
						<Skeleton className="w-40 h-3" />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectsSkeleton;
