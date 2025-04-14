/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		viewTransition: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "via.placeholder.com",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "ypilahtpsnpflhlxcmmx.supabase.co",
			},
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
