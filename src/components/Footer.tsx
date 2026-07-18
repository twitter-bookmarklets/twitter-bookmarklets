import { Link } from 'react-router-dom';
import { Bookmark, Globe } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa6';
import { Button } from './Button';

const socialLinks = [
	{
		href: 'https://minagishl.com',
		label: 'Website',
		icon: Globe,
	},
	{
		href: 'https://github.com/minagishl',
		label: 'GitHub',
		icon: FaGithub,
	},
	{
		href: 'https://twitter.com/minagishl',
		label: 'Twitter',
		icon: FaTwitter,
	},
] as const;

export function Footer() {
	return (
		<footer className="mt-auto flex flex-col gap-6 border-t border-line pt-10">
			<div className="flex flex-wrap gap-2">
				{socialLinks.map(({ href, label, icon: Icon }) => (
					<Button
						key={href}
						href={href}
						variant="muted"
						icon
						target="_blank"
						rel="noreferrer"
						aria-label={label}
						className="cursor-pointer"
					>
						<Icon className="size-5" aria-hidden="true" />
					</Button>
				))}
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
			</div>
		</footer>
	);
}
