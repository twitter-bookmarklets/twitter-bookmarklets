import { Link } from 'react-router-dom';
import { LegalPage, LegalSection } from '../components/LegalPage';

export function Privacy() {
	return (
		<LegalPage
			title="Privacy Policy"
			description="How this site and its bookmarklets handle information."
			updated="July 19, 2026"
		>
			<LegalSection title="Summary">
				<p>
					This site is a static page that helps you install bookmarklets. We do not run a backend
					that collects personal data, and the bookmarklets themselves run only in your browser on
					Twitter pages you open.
				</p>
			</LegalSection>

			<LegalSection title="What this site does not do">
				<p>We do not:</p>
				<ul className="list-disc space-y-2 pl-5">
					<li>Ask you to sign in or create an account on this site</li>
					<li>Collect Twitter passwords, cookies, or API tokens</li>
					<li>Store your likes, tweets, or other account content on our servers</li>
					<li>Sell or share personal information with third parties for advertising</li>
				</ul>
			</LegalSection>

			<LegalSection title="Bookmarklets">
				<p>
					When you copy or install a bookmarklet, the script is stored as a bookmark in your
					browser. When you run it, it interacts with the Twitter page that is already open in your
					browser. That activity happens locally between your browser and Twitter. We do not receive
					a copy of what the bookmarklet does on your account.
				</p>
			</LegalSection>

			<LegalSection title="Hosting and technical data">
				<p>
					Like most websites, the server or CDN that hosts this site may automatically process basic
					request data such as IP address, browser type, and the pages you visit. That processing is
					controlled by the hosting provider and is used to deliver and operate the site.
				</p>
			</LegalSection>

			<LegalSection title="External links">
				<p>
					This site may link to third-party sites such as GitHub or Minagishl. Their privacy
					practices are governed by their own policies, not this one.
				</p>
			</LegalSection>

			<LegalSection title="Changes">
				<p>
					We may update this Privacy Policy from time to time. The “Last updated” date at the top of
					this page will change when we do. Continued use of the site after an update means you
					accept the revised policy.
				</p>
			</LegalSection>

			<LegalSection title="Contact">
				<p>
					Questions about this policy can be raised through the project on{' '}
					<a
						href="https://github.com/twitter-bookmarklets"
						target="_blank"
						rel="noreferrer"
						className="text-twitter hover:underline"
					>
						GitHub
					</a>{' '}
					or via{' '}
					<a
						href="https://minagishl.com"
						target="_blank"
						rel="noreferrer"
						className="text-twitter hover:underline"
					>
						Minagishl
					</a>
					. See also the{' '}
					<Link to="/disclaimer" className="text-twitter hover:underline">
						Disclaimer
					</Link>
					.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
