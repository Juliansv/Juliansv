/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

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
		],
		dangerouslyAllowSVG: true,
	},
};

const BundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default BundleAnalyzer(nextConfig);
