"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { TagsInput } from "@/components/ui/extension/tags-input";
import { X } from "lucide-react";
import Image from "next/image";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/features/admin/projects/projects-form/form-schema";
import {
	createNewProject,
	updateProject,
} from "@/features/admin/projects/actions";
import { useRouter } from "next/navigation";
import { useProjectsStore } from "@/store/useProjectsStore";
import { useState } from "react";
import { uploadProjectImage } from "./client-actions";
import Tiptap from "../components/Tiptap";
import { Checkbox } from "@/components/ui/checkbox";

const ProjectForm = ({ id }: { id: string }) => {
	// useProjectsStore is a custom hook that returns the projects array from the store
	const projects = useProjectsStore((state) => state.projects);

	// The find method is used to find the job with the id that matches the id passed as a prop
	const data = projects.find((project) => project.id.toString() === id);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: data?.title || "",
			featured: data?.featured || false,
			description: data?.description || "",
			image: data?.image || "",
			stack: data?.stack || [],
			url: data?.url || "",
			year: data?.year || "",
			long_description: data?.long_description || "",
			features: data?.features || "",
			technologies: data?.technologies || "",
			code_repository: data?.code_repository || "",
		},
	});

	// Variable for managing if the project is being created or updated
	const isNew = !data;

	const { push } = useRouter();

	// Variable to handle the file upload
	const [imageFile, setImageFile] = useState<File>();

	// Variable to show the image
	const [projectImage, setProjectImage] = useState<Boolean>(
		data?.image ? true : false
	);

	// State for handling form state
	const { isDirty, defaultValues, isSubmitting } = useFormState({
		control: form.control,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			//
			let aux = data?.image || "/images/placeholder.png";

			if (imageFile) {
				const imageURL = await uploadProjectImage(imageFile);
				if (imageURL) {
					aux = imageURL;
				}
			}

			values.image = aux;

			isNew
				? await createNewProject(values)
				: await updateProject(values, data.id);
		} catch (error) {
			console.log("Error submitting the form", error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, (errors, values) => {
					console.log("validations errors: ", errors);
				})}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the title here..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the title of the project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="featured"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Featured</FormLabel>
							<FormControl>
								<Checkbox
									id="featured"
									className="h-6 w-6 bg-secondary data-[state=checked]:bg-green-400"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Description" {...field} />
							</FormControl>
							<FormDescription>
								This is the description of the project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{projectImage ? (
					<div className="h-full w-fit relative">
						<X
							className="absolute top-0 right-0 text-black cursor-pointer"
							onClick={() => setProjectImage(false)}
						/>
						<Image
							src={
								data?.image || "/images/via.placeholder.com/150"
							}
							alt="project-image"
							width={100}
							height={100}
						/>
					</div>
				) : (
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										{...field}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => {
											field.onChange(e);
											const file = e.target.files?.[0];
											if (file) {
												setImageFile(file);
											}
										}}
									/>
								</FormControl>
								<FormDescription>
									This is the image uploader.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name="stack"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tech Stack</FormLabel>
							<FormControl>
								<TagsInput
									value={field.value}
									onValueChange={field.onChange}
									placeholder="Enter your tech"
								></TagsInput>
							</FormControl>
							<FormDescription>
								This is the tech stack used in the project
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the url of the project"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the url of the project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the year of creation of the project..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the year of creation of the project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="long_description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Long description</FormLabel>
							<FormControl>
								<Tiptap
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								Long description for project page
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="features"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Features</FormLabel>
							<FormControl>
								<Tiptap
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								Project features for project page
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="technologies"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Technologies</FormLabel>
							<FormControl>
								<Tiptap
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								Technologies of the project for the project page
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code_repository"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code and repository</FormLabel>
							<FormControl>
								<Input
									placeholder="Link to the project repository"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								repository of the project
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center space-x-4">
					<Button
						disabled={!isDirty || isSubmitting}
						variant="outline"
						type="submit"
						className="text-2xl w-36 h-16 bg-green-700 text-white hover:bg-green-800"
					>
						{isNew ? "Create" : "Update"}
					</Button>
					<Button
						disabled={!isDirty || isSubmitting}
						variant="destructive"
						onClick={() => {
							isNew
								? push("/admin/experience")
								: form.reset(defaultValues);
						}}
						type={isNew ? "button" : "reset"}
						className="text-2xl w-36 h-16 bg-red-700 hover:bg-red-800"
					>
						{isNew ? "Cancel" : "Reset"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProjectForm;
