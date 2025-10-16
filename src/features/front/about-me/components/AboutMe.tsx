import Link from "next/link";

const AboutMe = async () => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>
			<div>
				<p className="mb-4">
					I started my journey as a developer around 2017, when a
					friend of a friend told me about a bootcamp at a local
					startup called
					<Link
						href="#experience"
						className="font-bold hover:text-teal-300 cursor-pointer"
					>
						{" "}
						Snappler
					</Link>
					. There, I learned the basics of web development and
					realized that this was the path I wanted to continue on.
				</p>
				<p className="mb-4">
					{" "}
					Fast forward to today, I have worked as a{" "}
					<Link
						href="#experience"
						className="font-bold hover:text-teal-300 cursor-pointer"
					>
						{" "}
						front-end developer
					</Link>{" "}
					for three companies and as a{" "}
					<Link
						href="#experience"
						className="font-bold hover:text-teal-300 cursor-pointer"
					>
						{" "}
						QA analyst
					</Link>{" "}
					for another two. I have honed my skills in different tech
					stacks and gained experience working both in the office and
					from home.
				</p>

				<p>
					{" "}
					I’ve truly enjoyed the ride so far. Always learning, diving
					into new tools, and building things that matter. Nowadays I
					also take on{" "}
					<Link
						href="#projects"
						className="font-bold hover:text-teal-300 cursor-pointer"
					>
						freelance projects
					</Link>
					, especially WordPress sites and custom web builds, helping
					clients bring their ideas to life online.
				</p>
			</div>
		</>
	);
};

export default AboutMe;

export const dynamic = "force-static";

export const revalidate = 3600;
