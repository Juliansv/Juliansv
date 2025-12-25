import Link from "next/link";

const Footer = () => {
	return (
		<footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
			<p>
				Coded in{" "}
				<span className="font-bold hover:text-sky-400">
					<Link href="https://code.visualstudio.com/">Visual Studio Code</Link>
				</span>
				. Built with{" "}
				<span className="font-bold hover:text-sky-400">
					<Link href="https://nextjs.org/">Next.js</Link>
				</span>{" "}
				and{" "}
				<span className="font-bold hover:text-sky-400">
					<Link href="https://tailwindcss.com/">Tailwind CSS</Link>
				</span>
				, deployed with{" "}
				<span className="font-bold hover:text-sky-400">
					<Link href="https://vercel.com/">Vercel</Link>
				</span>
				. Font of choice:{" "}
				<span className="font-bold hover:text-sky-400">
					<Link href="https://fonts.google.com/specimen/Montserrat">
						Montserrat
					</Link>
				</span>
				.
			</p>
		</footer>
	);
};

export default Footer;
