import React, { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import cx from 'classnames';

type Props = {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	img?: URL;
	size?: 'sm' | 'md' | 'xl';
	value?: string;

	onClick(value?: string): void;
};

export default function Button(props: Props) {
	const onClick = useCallback(() => {
		props.onClick(props.value);
	}, [props.onClick, props.value]);

	return (
		<button
			className={twMerge(
				cx(
					'bg-indigo-500 text-white font-semibold rounded-full border-2 border-indigo-500 transition ease-in-out duration-250 hover:bg-transparent hover:text-indigo-300',
					{
						'px-4 py-1': !props.size || props.size === 'sm',
						'px-8': props.size === 'xl',
						'py-2': props.size === 'xl',
						'text-2xl': props.size === 'xl',
					},
					props.className,
				),
			)}
			disabled={props.disabled}
			onClick={onClick}>
			{props.children}
		</button>
	);
}

type ROMButtonProps = Props & {
	img: URL;
	selected?: boolean;
};

export function ROMButton(props: ROMButtonProps) {
	const onClick = useCallback(() => {
		props.onClick(props.value);
	}, [props.onClick, props.value]);

	return (
		<button
			className={cx(
				'flex flex-row shrink-0 items-center font-semibold cursor-pointer mx-1 mb-1 px-4 py-1 rounded-full border-2',
				{
					'px-4 py-1': !props.size || props.size === 'sm',
					'px-8': props.size === 'xl',
					'py-2': props.size === 'xl',
					'text-2xl': props.size === 'xl',
					'bg-green-600': !!props.selected,
					'border-green-600': !!props.selected,
					'bg-slate-900': !props.selected,
					'border-indigo-500': !props.selected,
					'hover:bg-transparent hover:text-indigo-300': !props.selected,
				},
			)}
			onClick={onClick}>
			{props.img && (
				<img
					src={props.img as any}
					className={cx('-my-2 -mx-2 mr-0', {
						'rom-button-selected': !!props.selected,
					})}
				/>
			)}

			{props.children}
		</button>
	);
}

type BigButton = Props & {
	children: React.ReactNode;
	disabled?: boolean;
	img?: URL;
	value?: string;

	onClick(value?: string): void;
};

export function BigButton(props: Props) {
	const onClick = useCallback(() => {
		props.onClick(props.value);
	}, [props.onClick, props.value]);

	return (
		<button
			className={cx(
				'flex flex-col justify-center items-center px-8 py-4 mx-1 text-white font-semibold rounded-md  transition ease-in-out duration-250 hover:bg-slate-500',
				{
					'px-4 py-1': !props.size || props.size === 'sm',
					'px-8': props.size === 'xl',
					'py-2': props.size === 'xl',
					'text-2xl': props.size === 'xl',
				},
			)}
			disabled={props.disabled}
			onClick={onClick}>
			{props.children}
		</button>
	);
}
