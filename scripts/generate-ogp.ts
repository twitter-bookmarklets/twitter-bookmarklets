import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/** Twitter `summary_large_image` recommended size */
const WIDTH = 1200;
const HEIGHT = 630;

const TWITTER = '#1d9bf0';
const INK = '#14171a';
const BACKGROUND = '#ffffff';

/** Match hero: size-6 icon + text-2xl + gap-2 (24 / 24 / 8) */
const FONT_SIZE = 72;
const ICON_SIZE = FONT_SIZE;
const GAP = Math.round(FONT_SIZE * (8 / 24));

const BOOKMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${TWITTER}"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`;

async function main() {
	const font = await readFile(path.join(__dirname, 'assets/Inter-Bold.ttf'));
	const iconSrc = `data:image/svg+xml;base64,${Buffer.from(BOOKMARK_SVG).toString('base64')}`;

	const element = createElement(
		'div',
		{
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: BACKGROUND,
			},
		},
		createElement(
			'div',
			{
				style: {
					display: 'flex',
					alignItems: 'center',
					gap: GAP,
				},
			},
			createElement('img', {
				src: iconSrc,
				width: ICON_SIZE,
				height: ICON_SIZE,
			}),
			createElement(
				'div',
				{
					style: {
						display: 'flex',
						fontSize: FONT_SIZE,
						fontWeight: 700,
						letterSpacing: '-0.025em',
						color: INK,
						lineHeight: 1,
					},
				},
				'Twitter Bookmarklets',
			),
		),
	);

	const svg = await satori(element, {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{
				name: 'Inter',
				data: font,
				weight: 700,
				style: 'normal',
			},
		],
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: WIDTH,
		},
	});
	const png = resvg.render().asPng();

	const outDir = path.join(root, 'public');
	await mkdir(outDir, { recursive: true });
	const outPath = path.join(outDir, 'ogp.png');
	await writeFile(outPath, png);

	console.log(`Generated ${path.relative(root, outPath)} (${WIDTH}×${HEIGHT})`);
}

void main();
