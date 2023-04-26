import React, { useCallback } from 'react';
import cx from 'classnames';

type Props = {
	accept?: string;
	children: React.ReactNode;
	name: string;

	onClick(value?: string): void;
};

export default function FileInput(props: Props) {
	const onClick = useCallback(
		(e) => {
			if (e.currentTarget.files?.length) {
				props.onClick((e.currentTarget.files[0] as any).path);
			}
		},
		[props.onClick],
	);

	return (
		<>
			<label
				htmlFor={props.name}
				className="cursor-pointer px-4 py-1 text-white font-semibold rounded-sm border-2 border-indigo-500 transition ease-in-out duration-250 hover:bg-transparent hover:text-indigo-300">
				{props.children}
			</label>
			<input
				className="hidden"
				id={props.name}
				type="file"
				onChange={onClick}
				accept={props.accept}
			/>
		</>
	);
}
