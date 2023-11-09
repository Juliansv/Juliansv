/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "w7.pngwing.com",
				port: "",
				pathname: "/**",
			}
		],
	},
};

module.exports = nextConfig;
