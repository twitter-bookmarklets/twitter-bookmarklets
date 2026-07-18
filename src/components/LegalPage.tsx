import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

export function LegalPage({
	title,
	description,
	updated,
	children,
}: {
	title: string;
	description: string;
	updated: string;
	children: ReactNode;
}) {
	return (
		<>
			<header className="border-b border-line pb-10">
				<h1 className="mb-3 flex flex-wrap items-center gap-2 text-2xl font-bold tracking-tight text-ink">
					<Bookmark
						className="size-6 text-twitter"
						fill="currentColor"
						strokeWidth={0}
						aria-hidden="true"
					/>
					<Link to="/" className="transition-all hover:text-twitter">
						Twitter Bookmarklets
					</Link>
					<span aria-hidden="true">·</span>
					<span>{title}</span>
				</h1>
				<p className="max-w-md">{description}</p>
				<p className="mt-4 text-xs text-muted">Last updated: {updated}</p>
			</header>

			<article className="flex flex-1 flex-col gap-8 pt-10 pb-10 text-sm text-ink">
				{children}
			</article>
		</>
	);
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section>
			<h2 className="mb-3 text-base font-bold text-ink">{title}</h2>
			<div className="flex flex-col gap-3 leading-relaxed text-ink">{children}</div>
		</section>
	);
}
