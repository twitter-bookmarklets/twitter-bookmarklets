import { useState, type ReactNode } from 'react';
import { Bookmark, ChevronDown, Heart, Info, Monitor, Smartphone, Trash2 } from 'lucide-react';
import { bookmarklets, type Bookmarklet } from '../bookmarklets';
import { Button } from '../components/Button';
import { Warnings } from '../components/Warnings';

type SetupId = 'pc' | 'mobile';

const bookmarkletIcons = {
	'remove-likes': Heart,
	'delete-posts': Trash2,
} as const;

export function Home() {
	const [openSetupId, setOpenSetupId] = useState<SetupId | null>(null);
	const [copiedId, setCopiedId] = useState<string | null>(null);

	async function copyBookmarklet(item: Bookmarklet) {
		await navigator.clipboard.writeText(item.href);
		setCopiedId(item.id);
		window.setTimeout(() => setCopiedId(null), 2000);
	}

	function toggleSetup(id: SetupId) {
		setOpenSetupId((current) => (current === id ? null : id));
	}

	return (
		<>
			<header className="border-b border-line pb-10">
				<p className="mb-3 flex items-center gap-2 text-2xl font-bold tracking-tight text-ink">
					<Bookmark
						className="size-6 text-twitter"
						fill="currentColor"
						strokeWidth={0}
						aria-hidden="true"
					/>
					Twitter Bookmarklets
				</p>
				<h1 className="mb-3 text-xl font-semibold text-ink">Clean up Twitter with one bookmark</h1>
				<p className="max-w-md">
					Bookmarklets for removing likes and deleting tweets. Drag a button onto your bookmarks bar
					to install it.
				</p>
				<div className="mt-6 flex flex-wrap gap-2">
					<Button href="#bookmarklets">Add a bookmarklet</Button>
					<Button href="#setup" variant="secondary">
						Setup guide
					</Button>
				</div>
			</header>

			<div className="flex flex-1 flex-col gap-16 pt-10 pb-10">
				<section id="bookmarklets">
					<div className="flex flex-col gap-4">
						{bookmarklets.map((item) => {
							const Icon = bookmarkletIcons[item.id as keyof typeof bookmarkletIcons] ?? Bookmark;
							const isCopied = copiedId === item.id;

							return (
								<article key={item.id} className="flex flex-col gap-4 rounded-md bg-surface p-5">
									<div>
										<div className="mb-2 flex items-center gap-3">
											<span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-twitter-soft">
												<Icon className="size-5 text-twitter" aria-hidden="true" />
											</span>
											<h3 className="text-base font-bold text-ink">{item.name}</h3>
										</div>
										<p className="text-sm text-ink">{item.description}</p>
										<p className="mt-3 flex items-center gap-2 text-xs text-muted">
											<Info className="size-3.5 shrink-0" aria-hidden="true" />
											<span>{item.usage}</span>
										</p>
									</div>

									<div className="mt-auto flex flex-col gap-2">
										<Button
											variant="secondary"
											onClick={() => void copyBookmarklet(item)}
											className="w-full cursor-pointer"
										>
											{isCopied ? 'Copied' : 'Copy script'}
										</Button>
										<Button
											href={item.href}
											onClick={(event) => event.preventDefault()}
											title="Drag this button to your bookmarks bar"
											className="w-full cursor-grab"
										>
											{item.name}
										</Button>
										<p className="text-center text-xs text-muted">
											Drag this button to your bookmarks bar
										</p>
									</div>
								</article>
							);
						})}
					</div>
				</section>

				<section id="setup">
					<div className="mb-8">
						<h2 className="mb-2 text-lg font-bold text-ink">Setup</h2>
						<p className="text-sm">Choose the steps for your device.</p>
					</div>

					<div className="flex flex-col gap-3">
						<article className="overflow-hidden rounded-md bg-surface">
							<h3>
								<button
									type="button"
									aria-expanded={openSetupId === 'pc'}
									aria-controls="setup-pc-panel"
									id="setup-pc-trigger"
									onClick={() => toggleSetup('pc')}
									className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left"
								>
									<span className="flex size-10 shrink-0 items-center justify-center">
										<Monitor className="size-5 text-twitter" aria-hidden="true" />
									</span>
									<span className="flex-1 text-base font-bold text-ink">Computer</span>
									<ChevronDown
										className={`size-4 shrink-0 text-muted transition-transform duration-300 ease-out ${
											openSetupId === 'pc' ? 'rotate-180' : 'rotate-0'
										}`}
										aria-hidden="true"
									/>
								</button>
							</h3>
							<div
								className={`grid transition-[grid-template-rows] duration-300 ease-out ${
									openSetupId === 'pc' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								}`}
							>
								<div className="overflow-hidden">
									<ol
										id="setup-pc-panel"
										role="region"
										aria-labelledby="setup-pc-trigger"
										className="grid gap-1 px-5 pb-3"
									>
										<Step number={1} title="Show the bookmarks bar">
											Chrome / Edge: <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>B</Kbd> (or{' '}
											<Kbd>Cmd</Kbd>+<Kbd>Shift</Kbd>+<Kbd>B</Kbd> on Mac). Safari: enable Favorites
											Bar from the View menu.
										</Step>
										<Step number={2} title="Drag the button">
											Drop the bookmarklet button onto the bookmarks bar. Clicking it on this page
											will not run the script.
										</Step>
										<Step number={3} title="Run it on Twitter">
											Open your Likes page for Remove Likes, or your Posts / Replies tab for Delete
											Tweets, then click the bookmark.
										</Step>
									</ol>
								</div>
							</div>
						</article>

						<article className="overflow-hidden rounded-md bg-surface">
							<h3>
								<button
									type="button"
									aria-expanded={openSetupId === 'mobile'}
									aria-controls="setup-mobile-panel"
									id="setup-mobile-trigger"
									onClick={() => toggleSetup('mobile')}
									className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left"
								>
									<span className="flex size-10 shrink-0 items-center justify-center">
										<Smartphone className="size-5 text-twitter" aria-hidden="true" />
									</span>
									<span className="flex-1 text-base font-bold text-ink">Phone</span>
									<ChevronDown
										className={`size-4 shrink-0 text-muted transition-transform duration-300 ease-out ${
											openSetupId === 'mobile' ? 'rotate-180' : 'rotate-0'
										}`}
										aria-hidden="true"
									/>
								</button>
							</h3>
							<div
								className={`grid transition-[grid-template-rows] duration-300 ease-out ${
									openSetupId === 'mobile' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								}`}
							>
								<div className="overflow-hidden">
									<ol
										id="setup-mobile-panel"
										role="region"
										aria-labelledby="setup-mobile-trigger"
										className="grid gap-1 px-5 pb-3"
									>
										<Step number={1} title="Copy the script">
											Tap Copy script on the bookmarklet you want.
										</Step>
										<Step number={2} title="Create a bookmark">
											Bookmark any page, then edit it. Or add one from the bookmark manager.
										</Step>
										<Step number={3} title="Replace the URL">
											Paste the copied <Code>javascript:...</Code> string into the bookmark URL
											field and save.
										</Step>
										<Step number={4} title="Run it on Twitter">
											Open the matching page, run the bookmark, and confirm before it starts.
										</Step>
									</ol>
								</div>
							</div>
						</article>
					</div>
				</section>

				<Warnings />
			</div>
		</>
	);
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
	return (
		<li className="flex gap-3 py-3">
			<span className="flex size-10 shrink-0 items-center justify-center">
				<span className="flex size-6 items-center justify-center rounded-md bg-twitter-soft text-xs font-bold text-twitter">
					{number}
				</span>
			</span>
			<div className="min-w-0 pt-0.5">
				<strong className="mb-1 block text-sm font-bold text-ink">{title}</strong>
				<span className="block text-sm text-ink">{children}</span>
			</div>
		</li>
	);
}

function Kbd({ children }: { children: ReactNode }) {
	return (
		<kbd className="inline-block rounded border border-line bg-white px-1.5 py-0.5 font-mono text-xs text-ink">
			{children}
		</kbd>
	);
}

function Code({ children }: { children: ReactNode }) {
	return (
		<code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-ink">{children}</code>
	);
}
