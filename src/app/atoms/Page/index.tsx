import React, { useCallback } from 'react';
import cx from 'classnames';

import DataManager from '@dataManager';

type Props = {
	additionalElement?: React.ReactNode;
	children: React.ReactNode;
	noHeader?: boolean;
	title?: string;
};

export default function Page(props: Props) {
	return (
		<div className={cx('flex flex-col h-full')}>
			{!props.noHeader && (
				<div className="flex flex-row py-4 px-4 items-center justify-between">
					<div className="flex flex-row items-center shrink-0">
						{DataManager.canGoBack() && (
							<button
								onClick={DataManager.popPage}
								className="bg-indigo-500 px-4 py-1 text-white font-semibold rounded-full border-2 border-indigo-500 transition ease-in-out duration-250 hover:bg-transparent hover:text-indigo-300">
								&lt; Back
							</button>
						)}
						<h1 className="font-bold text-center text-white px-4 text-2xl">
							{props.title}
						</h1>
					</div>

					{props.additionalElement}
				</div>
			)}

			{props.children}
		</div>
	);
}
