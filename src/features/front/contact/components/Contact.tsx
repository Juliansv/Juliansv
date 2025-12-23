import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const Contact = () => {
	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					Get In Touch
				</h2>
			</div>
			<div className="max-w-2xl">
				<h3 className="text-2xl font-bold text-slate-200 mb-4">
					Let&apos;s Build Something Great Together
				</h3>
				<p className="text-slate-400 mb-6 leading-relaxed">
					Have a project in mind or want to discuss how I can help your
					business? I&apos;m always open to new opportunities and
					interesting collaborations. Whether you need a new website, a
					redesign, or a custom web application, let&apos;s talk about how
					we can work together.
				</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<Link
						href={`mailto:${siteConfig.email}`}
						className="group inline-flex items-center justify-center gap-2 rounded-lg bg-sky-400/10 px-6 py-3 font-medium text-sky-400 hover:bg-sky-400/20 transition-colors"
					>
						<Mail className="size-5" />
						Send me an email
						<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
					</Link>
					<Link
						href={siteConfig.socialLinks.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300/20 px-6 py-3 font-medium text-slate-200 hover:border-sky-400/50 hover:text-sky-400 transition-colors"
					>
						Connect on LinkedIn
						<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>
			</div>
		</>
	);
};

export default Contact;
