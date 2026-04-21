import type { MetadataRoute } from "next";
import { siteUrl, isProductionHost, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	if (isProductionHost(siteUrl)) {
		return {
			rules: [{ userAgent: "*", allow: "/" }],
			sitemap: absoluteUrl("/sitemap.xml"),
			host: siteUrl.host,
		};
	}
	return {
		rules: [{ userAgent: "*", disallow: "/" }],
	};
}
