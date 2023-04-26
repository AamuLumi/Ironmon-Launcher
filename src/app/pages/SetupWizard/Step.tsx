import React, { useCallback } from 'react';

type Props = { buttonText: string; children: React.ReactNode; onButtonClick(): void };

export default function Step(props: Props) {
	return (
		<div id="step-1" className="px-4 py-8 flex flex-row items-center">
			<div className="flex flex-col items-center w-1/3 min-w-[33%]">
				<button
					className="bg-indigo-500 px-4 py-1 text-white font-semibold rounded-full border-2 border-indigo-500 transition ease-in-out duration-250 hover:bg-transparent hover:text-indigo-300"
					onClick={props.onButtonClick}>
					{props.buttonText}
				</button>
			</div>
			<div className="px-4">
				<div className="font-semibold">{props.children}</div>
				<div className="flex flex-row mt-2">
					<div
						id="step-1-valid"
						className="bg-green-700 font-semibold px-2 py-1 rounded-sm hidden">
						Completed
					</div>
					<div
						id="step-1-missing-files"
						className="bg-red-700 font-semibold px-2 py-1 rounded-sm hidden">
						Missing files
					</div>
				</div>
			</div>
		</div>
	);
}
