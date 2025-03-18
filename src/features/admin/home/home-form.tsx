"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/features/admin/home/form-schema";

interface HomeFormProps {
	data: HomeInfoProps;
}

interface HomeInfoProps {
	title: string;
	subtitle: string;
	description: string;
	github_link: string;
	linkedin_link: string;
	about_me: string;
}

const HomeForm = ({
	data: {
		title,
		subtitle,
		description,
		github_link,
		linkedin_link,
		about_me,
	},
}: HomeFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: title || "",
			subtitle: subtitle || "",
			description: description || "",
			github_link: github_link || "",
			linkedin_link: linkedin_link || "",
			about_me: about_me || "",
		},
	});

	const { isDirty, dirtyFields, defaultValues, isSubmitting, isValid } =
		useFormState({
			control: form.control,
		});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
								This is the title of the home page.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subtitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subtitle</FormLabel>
							<FormControl>
								<Input
									placeholder="Write the subtitle here..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the subtitle of the home page.
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
								<Textarea
									placeholder="Write the description here..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the description of the home page.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="github_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Github</FormLabel>
							<FormControl>
								<Input placeholder="Github link" {...field} />
							</FormControl>
							<FormDescription>
								This is the link to personal github repository.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="linkedin_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Linkedin</FormLabel>
							<FormControl>
								<Input placeholder="Linkedin link" {...field} />
							</FormControl>
							<FormDescription>
								This is the link to personal linkedin profile.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="about_me"
					render={({ field }) => (
						<FormItem>
							<FormLabel>About Me</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Write something.."
									className="h-60"
									{...field}
								/>
							</FormControl>
							<FormDescription>About me section.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center space-x-4">
					<Button
						disabled={!isDirty || !isValid}
						variant="outline"
						type="submit"
						className="text-2xl w-36 h-16"
					>
						Save
					</Button>
					<Button
						disabled={!isDirty || !isValid}
						variant="destructive"
						onClick={() => form.reset(defaultValues)}
						type="reset"
						className="text-2xl w-36 h-16"
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default HomeForm;
