import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Seo } from './components/Seo';
import { SiteShell } from './components/SiteShell';
import { Disclaimer } from './pages/Disclaimer';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return null;
}

export default function App() {
	return (
		<BrowserRouter>
			<Seo />
			<ScrollToTop />
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
