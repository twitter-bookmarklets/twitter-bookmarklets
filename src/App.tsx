import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { Disclaimer } from './pages/Disclaimer';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';

const titles: Record<string, string> = {
	'/': 'Twitter Bookmarklets',
	'/privacy': 'Privacy Policy — Twitter Bookmarklets',
	'/disclaimer': 'Disclaimer — Twitter Bookmarklets',
};

function DocumentTitle() {
	const { pathname } = useLocation();

	useEffect(() => {
		document.title = titles[pathname] ?? 'Twitter Bookmarklets';
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default function App() {
	return (
		<BrowserRouter>
			<DocumentTitle />
			<SiteShell>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/disclaimer" element={<Disclaimer />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</SiteShell>
		</BrowserRouter>
	);
}
