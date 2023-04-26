import React, { useCallback } from 'react';

import * as Constants from '@constants';
import DataManager, { RomEntry } from '@dataManager';
import FileInput from '@atoms/FileInput';

type Props = {
	fileExtension: string;
	name: string;
	romEntry: RomEntry;
	romKey: Constants.RomKey;
};

export default function RomComponent(props: Props) {
	return (
		<div className="bg-slate-900 px-4 py-4 rounded-md my-2">
			<div className="font-semibold text-xl mb-2">{props.name}</div>
			<FileInput
				accept={props.fileExtension}
				name={props.romKey}
				onClick={(path) => {
					if (path) {
						DataManager.setRomLocation(props.romKey, path);
					}
				}}>
				{props.romEntry?.path || 'No file'}
			</FileInput>
		</div>
	);
}
