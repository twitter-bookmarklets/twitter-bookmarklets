import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = (process.env.SITE_URL ?? '').replace(/\/$/, '');

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		{
			name: 'html-site-url',
			transformIndexHtml(html) {
				const absolute = siteUrl ? `${siteUrl}/ogp.png` : '/ogp.png';
				const pageUrl = siteUrl || '/';
				return html.replaceAll('%SITE_URL%', pageUrl).replaceAll('%OGP_IMAGE%', absolute);
			},
		},
	],
});
