import ProjectAccordion from "@/features/front/projects/components/ProjectAccordion";
import { getProjectById } from "@/features/utils/actions";
import { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Suspense, unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";
import { Skeleton } from "@/components/ui/skeleton";

interface SingleProjectProps {
	id: string;
}

const SingleProject = async ({ id }: SingleProjectProps) => {
	const supabase = await createClient();

	const data = await getProjectById({ supabase }, Number(id));

	if (data?.length === 0) {
		return <div>ERROR NOT FOUND</div>;
	}

	const project: Project = data?.[0];
	return (
		<article className="mx-auto max-w-screen-xl min-h-[750px] items-center px-6 py-12 flex flex-col gap-4 md:px-12 md:py-20 lg:p-24 lg:flex-row lg:justify-center">
			<div className="flex flex-col gap-4 lg:w-1/2">
				<BackButton />
				<Suspense fallback={<Skeleton className="w-[100%] h-60" />}>
					<Image
						src={project.image}
						alt={project.title}
						width={500}
						height={500}
						className="h-auto w-auto"
						priority
					/>
				</Suspense>
				<div className="lg:order-1">
					<h1 className="text-4xl font-bold pb-2 text-teal-50">
						<ViewTransition
							name={`project-name-transition-${project.id}`}
						>
							<span className="inline-block">
								{project.title}
							</span>
						</ViewTransition>
					</h1>
					<Link
						href={project.url}
						className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300"
					>
						Go to site
						<span>
							<ArrowRight className="ml-1 size-4 group-hover:translate-x-2 transition-transform" />
						</span>
					</Link>
				</div>
			</div>
			<ProjectAccordion
				description={project.long_description}
				features={project.features}
				technologies={project.technologies}
				code_repository={project.code_repository}
			/>
		</article>
	);
};

export default SingleProject;

export const dynamic = "force-static";

export const revalidate = 3600;
