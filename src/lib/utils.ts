import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function removeMouseTrailer() {
	if (typeof document !== "undefined") {
		document.body.classList.remove("blob");
	}
}
