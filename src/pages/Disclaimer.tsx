import { Link } from 'react-router-dom';
import { LegalPage, LegalSection } from '../components/LegalPage';

export function Disclaimer() {
	return (
		<LegalPage
			title="Disclaimer"
			description="Important limits on warranty, liability, and responsibility."
			updated="July 19, 2026"
		>
			<div className="rounded-md bg-surface px-5 py-4 text-sm text-ink">
				<p className="font-semibold text-ink">Use at your own risk.</p>
				<p className="mt-2">
					These bookmarklets are provided free of charge, as-is, with no guarantees. We are not
					responsible for any loss, damage, account action, or other outcome that results from using
					them.
				</p>
			</div>

			<LegalSection title="No affiliation">
				<p>
					Twitter Bookmarklets is an independent project. It is not affiliated with, endorsed by, or
					sponsored by Twitter, X Corp., or any related company. “Twitter” is used here as a common
					name for the service; all trademarks belong to their owners.
				</p>
			</LegalSection>

			<LegalSection title="No warranty">
				<p>
					The site and bookmarklets are provided “as is” and “as available,” without warranties of
					any kind, whether express or implied. That includes, without limitation, warranties of
					merchantability, fitness for a particular purpose, non-infringement, accuracy, or that the
					tools will keep working when Twitter changes its interface.
				</p>
			</LegalSection>

			<LegalSection title="Irreversible actions">
				<p>
					Bookmarklets may unlike posts, delete tweets, undo retweets, unfollow accounts, or take
					other destructive actions on your account. Those actions often cannot be undone. You alone
					decide to run a bookmarklet and to confirm any dialog it shows. Review what you are about
					to do before you continue.
				</p>
			</LegalSection>

			<LegalSection title="Account and service risks">
				<p>Using automation-like tools on Twitter may lead to outcomes such as:</p>
				<ul className="list-disc space-y-2 pl-5">
					<li>Incomplete runs, skipped items, or unexpected behavior</li>
					<li>Temporary or permanent limits, locks, or other account restrictions</li>
					<li>Conflicts with Twitter’s terms of service or automated-activity rules</li>
					<li>Breakage after Twitter updates its pages or markup</li>
				</ul>
				<p>
					We do not promise that using these tools is allowed under Twitter’s rules for your account
					or region. You are responsible for complying with applicable terms and laws.
				</p>
			</LegalSection>

			<LegalSection title="Limitation of liability">
				<p>
					To the fullest extent permitted by law, the authors, maintainers, and operators of this
					project are not liable for any direct, indirect, incidental, special, consequential, or
					exemplary damages arising from your use of the site or bookmarklets. That includes loss of
					data, loss of content, account suspension, business interruption, or any other loss, even
					if we were advised that such damage was possible.
				</p>
				<p>
					If a jurisdiction does not allow certain exclusions, our liability is limited to the
					maximum extent that law allows. Because the tools are free, that amount is typically zero.
				</p>
			</LegalSection>

			<LegalSection title="Your responsibility">
				<p>By using this site or installing a bookmarklet, you agree that:</p>
				<ul className="list-disc space-y-2 pl-5">
					<li>You use the tools only on accounts you are allowed to control</li>
					<li>You understand the risks described on this page and in the on-site warnings</li>
					<li>You accept that we do not take responsibility for the results of your use</li>
				</ul>
			</LegalSection>

			<LegalSection title="Changes">
				<p>
					This Disclaimer may be updated from time to time. The “Last updated” date at the top of
					this page will change when we revise it. Continued use after an update means you accept
					the revised Disclaimer.
				</p>
			</LegalSection>

			<LegalSection title="Related">
				<p>
					For how information is handled, see the{' '}
					<Link to="/privacy" className="text-twitter hover:underline">
						Privacy Policy
					</Link>
					.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
