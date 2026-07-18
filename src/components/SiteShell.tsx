import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

export function SiteShell({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex min-h-svh max-w-xl flex-col px-5 py-12 font-sans text-base leading-relaxed text-muted antialiased">
			{children}
			<footer className="mt-auto flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="flex items-center gap-2 text-sm font-bold text-ink">
					<Bookmark
						className="size-4 text-twitter"
						fill="currentColor"
						strokeWidth={0}
						aria-hidden="true"
					/>
					Twitter Bookmarklets
				</p>
				<nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
					<Link to="/privacy" className="hover:text-twitter hover:underline">
						Privacy
					</Link>
					<span aria-hidden="true">·</span>
					<Link to="/disclaimer" className="hover:text-twitter hover:underline">
						Disclaimer
					</Link>
					<span aria-hidden="true">·</span>
					<span>© {new Date().getFullYear()}</span>
				</nav>
			</footer>
		</div>
	);
}
