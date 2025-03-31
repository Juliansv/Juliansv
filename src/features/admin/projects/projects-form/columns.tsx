"use client";

import { Project } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of the data.

export const columns: ColumnDef<Project>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "image",
		header: "Image",
	},
	{
		accessorKey: "stack",
		header: "Stack",
	},
	{
		accessorKey: "url",
		header: "URL",
	},
	{
		accessorKey: "year",
		header: "Year",
	},
];
