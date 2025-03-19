"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { TagsInput } from "@/components/ui/extension/tags-input";

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
import { formSchema } from "@/features/admin/experience/experience-form/form-schema";
import { createNewJob, updateJob } from "../actions";
import { useRouter } from "next/navigation";

interface JobFormProps {
	data?: JobInfoProps;
}

interface JobInfoProps {
	id: string;
	position: string;
	company: string;
	startedAt: string;
	finishedAt: string;
	description: string;
	techStack: string[];
}

const JobForm = ({ data }: JobFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			position: data?.position || "",
			company: data?.company || "",
			startedAt: data?.startedAt || "",
			finishedAt: data?.finishedAt || "",
			description: data?.description || "",
			techStack: data?.techStack || [],
		},
	});

	const isNew = !data;

	const { push } = useRouter();

	const { isDirty, dirtyFields, defaultValues, isSubmitting, isValid } =
		useFormState({
			control: form.control,
		});

	function onSubmit(values: z.infer<typeof formSchema>) {
		isNew ? createNewJob(values) : updateJob(values, data.id);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Position</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the position here..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the role of the job.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the company name here..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the company name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startedAt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Started at</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the start date of the job"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the start date of the job.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="finishedAt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Finished at</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the finish date of the job"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the finish date of the job.
							</FormDescription>
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
								This is the description of the job.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="techStack"
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
								This is the tech stack used in the job
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center space-x-4">
					<Button
						disabled={!isDirty}
						variant="outline"
						type="submit"
						className="text-2xl w-36 h-16 bg-green-700 text-white hover:bg-green-800"
					>
						{isNew ? "Create" : "Update"}
					</Button>
					<Button
						disabled={!isDirty}
						variant="destructive"
						onClick={() => {
							isNew
								? push("/admin/experience")
								: form.reset(defaultValues);
						}}
						type={isNew ? "button" : "reset"}
						className="text-2xl w-36 h-16"
					>
						{isNew ? "Cancel" : "Reset"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default JobForm;
