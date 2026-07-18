import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
	base: 'inline-flex items-center justify-center gap-1.5 rounded-md border-2 text-sm font-semibold transition-all ease-in-out',
	variants: {
		variant: {
			primary: 'border-transparent bg-twitter text-white hover:bg-twitter-hover',
			secondary: 'border-line text-ink hover:border-twitter hover:text-twitter',
			muted: 'border-transparent bg-surface text-ink hover:bg-line hover:text-twitter',
		},
		icon: {
			true: 'aspect-square size-10 shrink-0 p-0',
			false: 'px-4 py-2.5',
		},
	},
	defaultVariants: {
		variant: 'primary',
		icon: false,
	},
});

type ButtonVariants = VariantProps<typeof button>;

type CommonProps = ButtonVariants & {
	className?: string;
	children: ReactNode;
};

type ButtonAsButton = CommonProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
		href?: never;
	};

type ButtonAsLink = CommonProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
		href: string;
	};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
	return typeof props.href === 'string';
}

function isJavascriptHref(href: string) {
	return /^javascript:/i.test(href);
}

export function Button(props: ButtonProps) {
	const classes = button({
		variant: props.variant,
		icon: props.icon,
		className: props.className,
	});

	if (isLinkProps(props)) {
		const {
			variant: _variant,
			icon: _icon,
			className: _className,
			children,
			href,
			...anchorProps
		} = props;
		const bookmarklet = isJavascriptHref(href);

		return (
			<a
				ref={
					bookmarklet
						? (node) => {
								// React blocks javascript: URLs on the href prop; set it on the DOM for bookmarklets.
								if (node) node.setAttribute('href', href);
							}
						: undefined
				}
				{...(bookmarklet ? {} : { href })}
				className={classes}
				{...anchorProps}
			>
				{children}
			</a>
		);
	}

	const {
		variant: _variant,
		icon: _icon,
		className: _className,
		children,
		type = 'button',
		...buttonProps
	} = props;

	return (
		<button type={type} className={classes} {...buttonProps}>
			{children}
		</button>
	);
}
