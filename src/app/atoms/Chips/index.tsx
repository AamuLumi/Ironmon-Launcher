import React, { useCallback } from 'react';
import cx from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
};

export default function Chips(props: Props) {
	return (
		<div className={cx('font-semibold px-2 py-1 rounded-sm mr-2', props.className)}>
			{props.children}
		</div>
	);
}
