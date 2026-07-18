import type { ReactNode } from 'react';
import { Footer } from './Footer';

export function SiteShell({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex min-h-svh max-w-xl flex-col px-5 py-12 font-sans text-base leading-relaxed text-muted antialiased">
			{children}
			<Footer />
		</div>
	);
}
