"use client";

const AboutMe = () => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>

			{/* Artistic Bento Grid */}
			<div className="group/list">
				<div className="grid auto-rows-[minmax(120px,auto)] grid-cols-6 gap-3">
					{/* Hero Card - Large, spans full width */}
					<div className="group relative col-span-6 row-span-2 pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full border-l-2 border-sky-400/30 p-6">
							<div className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-400">
								01
							</div>
							<h3 className="mb-3 text-2xl font-bold text-slate-200">
								Web Developer
							</h3>
							<p className="max-w-2xl text-base leading-relaxed text-slate-300">
								Building fast, modern websites that help businesses grow and
								succeed online. From concept to launch, I create digital
								experiences that make an impact.
							</p>
						</div>
					</div>

					{/* WordPress - Medium tall */}
					<div className="group relative col-span-3 row-span-2 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full rounded-lg bg-gradient-to-br from-emerald-500/5 to-transparent p-5">
							<div className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
								02
							</div>
							<h3 className="mb-2 text-lg font-bold text-slate-200">
								WordPress
							</h3>
							<p className="text-sm leading-relaxed text-slate-400">
								Easy-to-manage CMS solutions that empower you to control your
								content.
							</p>
						</div>
					</div>

					{/* Custom Apps - Tall accent */}
					<div className="group relative col-span-3 row-span-3 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 flex h-full flex-col justify-center rounded-lg border border-violet-400/20 p-5">
							<div className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-400">
								03
							</div>
							<h3 className="mb-3 text-xl font-bold text-slate-200">
								Custom Web Applications
							</h3>
							<p className="text-sm leading-relaxed text-slate-400">
								Tailored solutions built from the ground up to match your exact
								requirements and business needs.
							</p>
						</div>
					</div>

					{/* Communication - Wide */}
					<div className="group relative col-span-6 row-span-1 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full rounded-lg bg-slate-800/30 p-5">
							<div className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-400">
								04
							</div>
							<h3 className="text-base font-bold text-slate-200">
								Clear Communication
							</h3>
						</div>
					</div>

					{/* Small Business */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">
								Small Business
							</h3>
							<p className="text-xs text-slate-400">Growth-focused solutions</p>
						</div>
					</div>

					{/* Creatives */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">
								Creative Professionals
							</h3>
							<p className="text-xs text-slate-400">
								Portfolio & showcase sites
							</p>
						</div>
					</div>

					{/* Frontend - Accent card */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-3 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full rounded-lg border-b-2 border-sky-400/30 bg-gradient-to-r from-sky-500/10 to-transparent p-5">
							<h3 className="mb-1 text-base font-bold text-slate-200">
								Frontend
							</h3>
							<p className="text-sm text-slate-400">
								React · Next.js · TypeScript
							</p>
						</div>
					</div>

					{/* Styling */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-1 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">Styling</h3>
							<p className="text-xs text-slate-400">Tailwind · Sass</p>
						</div>
					</div>

					{/* Backend */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-1 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">Backend</h3>
							<p className="text-xs text-slate-400">Node.js · PostgreSQL</p>
						</div>
					</div>

					{/* Responsive */}
					<div className="group relative col-span-3 row-span-1 pb-1 transition-all md:col-span-1 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">
								Responsive
							</h3>
							<p className="text-xs text-slate-400">Mobile-first</p>
						</div>
					</div>

					{/* Planning */}
					<div className="group relative col-span-6 row-span-1 pb-1 transition-all md:col-span-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
						<div className="relative z-10 h-full border-t border-slate-700/50 p-5">
							<h3 className="mb-1 text-sm font-bold text-slate-200">
								Strategic Planning
							</h3>
							<p className="text-xs text-slate-400">
								Thoughtful approach from concept to execution
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutMe;

export const dynamic = "force-static";
