const SERVICES = [
	{
		title: "Build",
		description: "Custom websites and web apps from scratch with modern tools",
	},
	{
		title: "Launch",
		description: "End-to-end delivery from planning to deployment",
	},
	{
		title: "Manage",
		description:
			"Easy-to-manage websites and CMS solutions you can control yourself",
	},
] as const;

const TECHNOLOGIES = [
	"React",
	"Next.js",
	"TypeScript",
	"Tailwind CSS",
	"WordPress",
	"Node.js",
	"PostgreSQL",
] as const;

export const AboutMe = (): React.JSX.Element => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>

			<div>
				<p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base">
					I&apos;m a{" "}
					<span className="font-bold text-slate-200">web developer</span>{" "}
					helping businesses build fast, modern, and easy-to-manage websites.
					Whether it&apos;s a full redesign, a new website, or a custom web
					application, I focus on creating clean, responsive experiences that
					drive results.
				</p>

				<div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
					{SERVICES.map((service) => (
						<div
							key={service.title}
							className="rounded-lg border border-slate-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg md:p-5"
						>
							<h3 className="mb-2 text-sm font-semibold text-slate-200 md:text-base">
								{service.title}
							</h3>
							<p className="text-xs leading-relaxed text-slate-400 md:text-sm">
								{service.description}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 pt-4">
					{TECHNOLOGIES.map((tech) => (
						<span key={tech} className="text-xs text-sky-400">
							{tech}
						</span>
					))}
				</div>
			</div>
		</>
	);
};
