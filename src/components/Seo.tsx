import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, DEFAULT_SITE_URL, getPageSeo, SITE_NAME } from '../seo';

function upsertMeta(selector: string, attributes: Record<string, string>) {
	let element = document.head.querySelector(selector) as HTMLMetaElement | null;
	if (!element) {
		element = document.createElement('meta');
		document.head.appendChild(element);
	}
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}
}

function upsertLink(rel: string, href: string) {
	let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
	if (!element) {
		element = document.createElement('link');
		element.rel = rel;
		document.head.appendChild(element);
	}
	element.href = href;
}

function siteOrigin(): string {
	return (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function Seo() {
	const { pathname } = useLocation();

	useEffect(() => {
		const page = getPageSeo(pathname);
		const origin = siteOrigin();
		const canonical = absoluteUrl(origin, page.path);
		const image = `${origin}/ogp.png`;

		document.title = page.title;

		upsertMeta('meta[name="description"]', {
			name: 'description',
			content: page.description,
		});
		upsertMeta('meta[property="og:title"]', {
			property: 'og:title',
			content: page.title,
		});
		upsertMeta('meta[property="og:description"]', {
			property: 'og:description',
			content: page.description,
		});
		upsertMeta('meta[property="og:url"]', {
			property: 'og:url',
			content: canonical,
		});
		upsertMeta('meta[property="og:image"]', {
			property: 'og:image',
			content: image,
		});
		upsertMeta('meta[property="og:site_name"]', {
			property: 'og:site_name',
			content: SITE_NAME,
		});
		upsertMeta('meta[name="twitter:title"]', {
			name: 'twitter:title',
			content: page.title,
		});
		upsertMeta('meta[name="twitter:description"]', {
			name: 'twitter:description',
			content: page.description,
		});
		upsertMeta('meta[name="twitter:image"]', {
			name: 'twitter:image',
			content: image,
		});

		upsertLink('canonical', canonical);
	}, [pathname]);

	return null;
}
