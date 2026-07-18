import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Sitemap from 'vite-plugin-sitemap';
import { DEFAULT_DESCRIPTION, DEFAULT_SITE_URL, SITE_NAME, sitemapRoutes } from './src/seo.ts';

const siteUrl = (process.env.SITE_URL ?? process.env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(
	/\/$/,
	'',
);

function htmlSeoPlugin(): Plugin {
	return {
		name: 'html-seo',
		transformIndexHtml(html) {
			const absoluteImage = `${siteUrl}/ogp.png`;
			const jsonLd = JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'WebSite',
						name: SITE_NAME,
						url: `${siteUrl}/`,
						description: DEFAULT_DESCRIPTION,
						inLanguage: 'en',
					},
					{
						'@type': 'WebApplication',
						name: SITE_NAME,
						url: `${siteUrl}/`,
						applicationCategory: 'BrowserApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						description:
							'Bookmarklets that help you remove likes, delete tweets, and unfollow accounts on Twitter from your browser.',
					},
				],
			});

			return html
				.replaceAll('%SITE_URL%', siteUrl)
				.replaceAll('%OGP_IMAGE%', absoluteImage)
				.replaceAll('%JSON_LD%', jsonLd);
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		htmlSeoPlugin(),
		Sitemap({
			hostname: siteUrl,
			dynamicRoutes: sitemapRoutes.filter((route) => route !== '/'),
			generateRobotsTxt: true,
			changefreq: 'monthly',
			priority: {
				'/': 1,
				'/privacy': 0.6,
				'/disclaimer': 0.6,
			},
		}),
	],
});
