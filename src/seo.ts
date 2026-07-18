export const SITE_NAME = 'Twitter Bookmarklets';

/** Used when SITE_URL / VITE_SITE_URL are unset. */
export const DEFAULT_SITE_URL = 'https://twitter-bookmarklets.com';

export const DEFAULT_DESCRIPTION =
	'Free Twitter bookmarklets to remove likes, delete tweets, and unfollow accounts. Drag to your bookmarks bar and clean up your account in the browser.';

export type PageSeo = {
	title: string;
	description: string;
	path: string;
};

export const pages: Record<string, PageSeo> = {
	'/': {
		title: SITE_NAME,
		description: DEFAULT_DESCRIPTION,
		path: '/',
	},
	'/privacy': {
		title: `Privacy Policy — ${SITE_NAME}`,
		description:
			'Privacy policy for Twitter Bookmarklets. Learn what this site does and does not collect when you use the bookmarklets.',
		path: '/privacy',
	},
	'/disclaimer': {
		title: `Disclaimer — ${SITE_NAME}`,
		description:
			'Disclaimer for Twitter Bookmarklets. Use at your own risk: no warranty, no liability, and no affiliation with Twitter or X.',
		path: '/disclaimer',
	},
};

export function getPageSeo(pathname: string): PageSeo {
	return pages[pathname] ?? pages['/'];
}

/** Routes included in the generated sitemap. */
export const sitemapRoutes = Object.keys(pages);

export function absoluteUrl(siteUrl: string, path: string): string {
	const base = siteUrl.replace(/\/$/, '');
	if (!base) return path;
	if (path === '/') return `${base}/`;
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
