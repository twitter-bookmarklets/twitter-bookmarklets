import type { ReactNode } from 'react';
const warnings = [
	'Unlikes and deletions cannot be undone. Read the confirm dialog before you start.',
	<>
		To stop a run, reload the page or run{' '}
		<code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
			window.__twitterCleanStop = true
		</code>{' '}
		in the console.
	</>,
	'These tools may stop working if Twitter changes its page structure.',
] as const;
export function Warnings() {
	return (
		<section>
			<div className="mb-8">
				<h2 className="mb-2 text-lg font-bold text-ink">Warnings</h2>
				<p className="text-sm">Please read these before you run a bookmarklet.</p>
			</div>
			<ul className="rounded-md bg-surface px-5 py-3 text-sm text-ink">
				{warnings.map((warning, index) => (
					<WarningItem key={index} divided={index > 0}>
						{warning}
					</WarningItem>
				))}
			</ul>
		</section>
	);
}
function WarningItem({ children, divided = false }: { children: ReactNode; divided?: boolean }) {
	return (
		<li className={divided ? 'flex gap-3 border-t border-line py-4' : 'flex gap-3 py-4'}>
			<span className="flex size-10 shrink-0 items-center justify-center">
				<span className="flex size-6 items-center justify-center rounded-md bg-twitter-soft">
					<span className="size-1.5 rounded-full bg-twitter" aria-hidden="true" />
				</span>
			</span>
			<span className="min-w-0 pt-0.5">{children}</span>
		</li>
	);
}
