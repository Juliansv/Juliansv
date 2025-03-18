"use client";

import { Job } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of the data.

export const columns: ColumnDef<Job>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "position",
		header: "Position",
	},
	{
		accessorKey: "company",
		header: "Company",
	},
	{
		accessorKey: "startedAt",
		header: "Start date",
	},
	{
		accessorKey: "finishedAt",
		header: "Finish date",
	},
	{
		accessorKey: "description",
		header: "Job description",
	},
	{
		accessorKey: "techStack",
		header: "Tech stack",
	},
];
