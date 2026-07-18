import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Bookmark } from 'lucide-react';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const TWITTER = '#1d9bf0';
const INK = '#14171a';
const BACKGROUND = '#ffffff';

type Variant = {
	fileName: string;
	width: number;
	height: number;
} & (
	| {
			/** Hero lockup: icon + title */
			kind: 'lockup';
			fontSize: number;
			iconSize: number;
			gap: number;
	  }
	| {
			/** Summary card: icon only */
			kind: 'icon';
			iconSize: number;
	  }
);

/** Match hero: size-6 icon + text-2xl + gap-2 (24 / 24 / 8) */
function lockupSizes(fontSize: number) {
	return {
		fontSize,
		iconSize: fontSize,
		gap: Math.round(fontSize * (8 / 24)),
	};
}

const variants: Variant[] = [
	{
		/** Twitter `summary_large_image` */
		kind: 'lockup',
		fileName: 'ogp.png',
		width: 1200,
		height: 630,
		...lockupSizes(72),
	},
	{
		/** Twitter `summary` */
		kind: 'icon',
		fileName: 'ogp-summary.png',
		width: 800,
		height: 800,
		iconSize: 320,
	},
];

function bookmarkDataUri() {
	const markup = renderToStaticMarkup(
		createElement(Bookmark, {
			size: 24,
			color: TWITTER,
			fill: TWITTER,
			strokeWidth: 0,
		}),
	);
	return `data:image/svg+xml;base64,${Buffer.from(markup).toString('base64')}`;
}

function buildElement(iconSrc: string, variant: Variant): ReactNode {
	const icon = createElement('img', {
		src: iconSrc,
		width: variant.iconSize,
		height: variant.iconSize,
	});

	const content =
		variant.kind === 'icon'
			? icon
			: createElement(
					'div',
					{
						style: {
							display: 'flex',
							alignItems: 'center',
							gap: variant.gap,
						},
					},
					icon,
					createElement(
						'div',
						{
							style: {
								display: 'flex',
								fontSize: variant.fontSize,
								fontWeight: 700,
								letterSpacing: '-0.025em',
								color: INK,
								lineHeight: 1,
							},
						},
						'Twitter Bookmarklets',
					),
				);

	return createElement(
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
		content,
	);
}

async function renderPng(font: Buffer, iconSrc: string, variant: Variant) {
	const svg = await satori(buildElement(iconSrc, variant), {
		width: variant.width,
		height: variant.height,
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
			value: variant.width,
		},
	});

	return resvg.render().asPng();
}

async function main() {
	const font = await readFile(path.join(__dirname, 'assets/Inter-Bold.ttf'));
	const iconSrc = bookmarkDataUri();
	const outDir = path.join(root, 'public');
	await mkdir(outDir, { recursive: true });

	for (const variant of variants) {
		const png = await renderPng(font, iconSrc, variant);
		const outPath = path.join(outDir, variant.fileName);
		await writeFile(outPath, png);
		console.log(`Generated ${path.relative(root, outPath)} (${variant.width}×${variant.height})`);
	}
}

void main();
