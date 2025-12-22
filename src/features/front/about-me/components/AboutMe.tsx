import { aboutContent } from "@/data";

const AboutMe = async () => {
	return (
		<>
			<div className="sticky top-0 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					About
				</h2>
			</div>
			<div>
				{aboutContent.paragraphs.map((paragraph, index) => (
					<p
						key={index}
						className={`leading-relaxed ${index < aboutContent.paragraphs.length - 1 ? "mb-4" : ""}`}
						dangerouslySetInnerHTML={{ __html: paragraph }}
					/>
				))}
			</div>
		</>
	);
};

export default AboutMe;

export const dynamic = "force-static";
