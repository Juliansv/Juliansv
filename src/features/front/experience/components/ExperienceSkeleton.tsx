import { Skeleton } from "@/components/ui/skeleton";

const ExperienceCardSkeleton = () => {
	return (
		<li className="mb-12">
			<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
				<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
				<header className="z-10 mb-2 mt-1 flex gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
					<Skeleton className="h-3 w-14" /> - <Skeleton className="h-3 w-14" />
				</header>
				<div className="z-10 sm:col-span-6">
					<h3 className="flex gap-2 font-medium leading-snug text-slate-200">
						<Skeleton className="h-4 w-36" />
					</h3>
					<div className="mt-2 flex flex-col gap-2 text-sm leading-normal">
						<Skeleton className="h-3 w-full sm:w-72" />
						<Skeleton className="h-3 w-full sm:w-72" />
						<Skeleton className="h-3 w-full sm:w-72" />
					</div>
					<ul className="mt-2 flex flex-wrap">
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
								<Skeleton className="h-4 w-10" />
							</div>
						</li>
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
								<Skeleton className="h-4 w-10" />
							</div>
						</li>
						<li className="mr-1.5 mt-2">
							<div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400">
								<Skeleton className="h-4 w-10" />
							</div>
						</li>
					</ul>
				</div>
			</div>
		</li>
	);
};

const ExperienceSkeleton = () => {
	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Experience
				</h2>
			</div>
			<div>
				<ol className="group/list">
					<ExperienceCardSkeleton />
					<ExperienceCardSkeleton />
					<ExperienceCardSkeleton />
					<ExperienceCardSkeleton />
				</ol>
				<div className="mt-12">
					<Skeleton className="h-4 w-48" />
				</div>
			</div>
		</>
	);
};

export default ExperienceSkeleton;
