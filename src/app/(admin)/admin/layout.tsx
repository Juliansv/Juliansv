import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/app-sidebar";

export const metadata: Metadata = {
	title: "Portfolio Admin",
	description: "Admin dashboard for portfolio website",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="bg-dark-purple leading-relaxed selection:bg-teal-300 antialiased text-slate-400 selection:text-teal-900">
			<SidebarProvider defaultOpen={true}>
				<AppSidebar />
				<div className="min-h-svh grow" id="section-container">
					{children}
				</div>
			</SidebarProvider>
		</main>
	);
}
