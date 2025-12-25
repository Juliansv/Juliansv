"use client";

const AboutMe = () => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>

			{/* Viewport-Fitted Bento Grid */}
			<div className="grid auto-rows-[minmax(100px,auto)] grid-cols-1 gap-4 md:-mx-6 md:max-h-[calc(100vh-20rem)] md:grid-cols-6 lg:max-h-[calc(100vh-15rem)]">
				{/* Hero Card - Large, spans full width */}
				<div className="min-h-[180px] rounded-lg border-l-2 border-sky-400/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-400/10 md:col-span-6 md:row-span-2 md:p-6">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-400">
						01
					</div>
					<h3 className="mb-2 text-2xl font-bold text-slate-200 md:mb-3 md:text-3xl">
						Web Developer
					</h3>
					<p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
						Building fast, modern websites that help businesses grow and succeed
						online. From concept to launch, I create digital experiences that
						make an impact.
					</p>
				</div>

				{/* WordPress - Medium tall */}
				<div className="min-h-[180px] rounded-lg bg-gradient-to-br from-emerald-500/5 to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-500/10 hover:shadow-lg hover:shadow-emerald-400/10 md:col-span-3 md:row-span-1 md:p-5">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
						02
					</div>
					<h3 className="mb-2 text-xl font-bold text-slate-200 md:text-2xl">
						WordPress
					</h3>
					<p className="text-sm leading-relaxed text-slate-400 md:text-base">
						Easy-to-manage CMS solutions that empower you to control your
						content.
					</p>
				</div>

				{/* Custom Apps - Tall accent */}
				<div className="justify-top flex min-h-[180px] flex-col rounded-lg border border-violet-400/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-400/10 md:col-span-3 md:row-span-2 md:p-5">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-400">
						03
					</div>
					<h3 className="mb-2 text-xl font-bold text-slate-200 md:text-2xl">
						Custom Web Applications
					</h3>
					<p className="text-sm leading-relaxed text-slate-400 md:text-base">
						Tailored solutions built from the ground up to match your exact
						requirements and business needs.
					</p>
				</div>

				{/* Who I Work With - Combined */}
				<div className="min-h-[180px] rounded-lg bg-slate-800/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/50 hover:shadow-lg md:col-span-3 md:row-span-1 md:p-5">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-400">
						04
					</div>
					<h3 className="mb-2 text-xl font-bold text-slate-200 md:text-2xl">
						Who I Work With
					</h3>
					<p className="text-sm text-slate-400 md:text-base">
						Startups · Small Businesses · Creative Professionals
					</p>
				</div>

				{/* Frontend - Accent card */}
				<div className="min-h-[180px] rounded-lg border-b-2 border-sky-400/30 bg-gradient-to-r from-sky-500/10 to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:from-sky-500/15 hover:shadow-lg hover:shadow-sky-400/10 md:col-span-4 md:row-span-1 md:p-5">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-400">
						05
					</div>
					<h3 className="mb-2 text-xl font-bold text-slate-200 md:text-2xl">
						Frontend
					</h3>
					<p className="text-sm text-slate-400 md:text-base">
						React · Next.js · TypeScript · Tailwind CSS
					</p>
				</div>

				{/* Backend & Infrastructure - Combined */}
				<div className="min-h-[180px] rounded-lg border border-slate-700/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg md:col-span-2 md:row-span-1 md:p-5">
					<div className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-400">
						06
					</div>
					<h3 className="mb-2 text-xl font-bold text-slate-200 md:text-2xl">
						Backend
					</h3>
					<p className="text-sm text-slate-400 md:text-base">
						Node.js · PHP · PostgreSQL · REST APIs
					</p>
				</div>
			</div>
		</>
	);
};

export default AboutMe;

export const dynamic = "force-static";
