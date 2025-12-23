import { aboutContent } from "@/data";

const Approach = async () => {
	return (
		<>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-transparent px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
					How I Work
				</h2>
			</div>
			<div className="max-w-2xl">
				<h3 className="text-2xl font-bold text-slate-200 mb-6">
					My Approach
				</h3>
				<div>
					{aboutContent.approach.map((paragraph, index) => (
						<p
							key={index}
							className={`leading-relaxed ${index < aboutContent.approach.length - 1 ? "mb-4" : ""}`}
							dangerouslySetInnerHTML={{ __html: paragraph }}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Approach;

export const dynamic = "force-static";
