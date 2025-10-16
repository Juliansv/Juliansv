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
				<p className="mb-4 leading-relaxed">
					I&apos;m a{" "}
					<span className="font-bold hover:text-teal-300 cursor-pointer">
						web developer
					</span>{" "}
					helping businesses build fast, modern, and easy-to-manage
					websites. Whether it&apos;s a WordPress website, a full
					redesign, or a custom web application, I focus on creating
					clean, responsive, and user-friendly experiences that drive
					results.
				</p>
				<p className="mb-4 leading-relaxed">
					{" "}
					I work with startups, small businesses, and creative
					freelancers who need a reliable developer to bring their
					ideas to life. From{" "}
					<span className="font-bold hover:text-teal-300 cursor-pointer">
						planning and design
					</span>{" "}
					to{" "}
					<span className="font-bold hover:text-teal-300 cursor-pointer">
						{" "}
						development and launch
					</span>
					, I handle every step with attention to detail and clear
					communication.
				</p>
				<p className="leading-relaxed">
					{" "}
					My goal is simple: to{" "}
					<span className="font-bold hover:text-teal-300 cursor-pointer">
						help you get a website
					</span>{" "}
					that looks great, works flawlessly, and supports your
					business goals without the stress of dealing with technical
					details.
				</p>
			</div>
		</>
	);
};

export default AboutMe;

export const dynamic = "force-static";

export const revalidate = 3600;
