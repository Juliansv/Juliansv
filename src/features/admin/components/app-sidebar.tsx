"use client";

import {
	Calendar,
	ChevronUp,
	Home,
	Search,
	Settings,
	User2,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/admin/home",
		icon: Home,
	},
	{
		title: "Experience",
		url: "/admin/experience",
		icon: Calendar,
	},
	{
		title: "Projects",
		url: "/admin/projects",
		icon: Search,
	},
	{
		title: "Blog",
		url: "/admin/blog",
		icon: Settings,
	},
];

export function AppSidebar() {
	const router = useRouter();

	async function handleSignOut() {
		try {
			const response = await fetch("/auth/signout", {
				method: "POST",
			});
			router.push(response.url);
		} catch (error) {
			console.log("error while signing out: ", error);
		}
	}

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Link href="/admin">ADMIN DASHBOARD</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url} className="h-full">
											<item.icon />
											<span className="text-2xl">
												{item.title}
											</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu className="p-0">
					<SidebarMenuItem className="content-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Juliansv22@gmail.com
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<button onClick={handleSignOut}>
								<DropdownMenuContent
									side="top"
									className="w-[--radix-popper-anchor-width]"
								>
									<DropdownMenuItem className="cursor-pointer">
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</button>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
