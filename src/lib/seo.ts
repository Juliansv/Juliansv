const DEFAULT_SITE_URL = "https://www.julisv.com";
const PRODUCTION_HOST = new URL(DEFAULT_SITE_URL).host;

function resolveSiteUrl(): URL {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL;
	if (explicit) return new URL(explicit);

	const vercel = process.env.VERCEL_URL;
	if (vercel) return new URL(`https://${vercel}`);

	return new URL(DEFAULT_SITE_URL);
}

export const siteUrl: URL = resolveSiteUrl();

export const DEFAULT_OG_SIZE = { width: 1200, height: 630 } as const;

export function isProductionHost(url: URL): boolean {
	return url.host === PRODUCTION_HOST;
}

export function absoluteUrl(path: string): string {
	return new URL(path, siteUrl).toString();
}

export function truncate(str: string, max = 160): string {
	if (str.length <= max) return str;
	const sliced = str.slice(0, max - 1);
	const lastSpace = sliced.lastIndexOf(" ");
	const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
	return `${cut.trimEnd()}…`;
}
