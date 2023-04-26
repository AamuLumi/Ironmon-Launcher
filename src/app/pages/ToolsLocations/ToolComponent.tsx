import React, { useCallback } from 'react';

import Button from '@atoms/Button';
import * as Constants from '@constants';
import DataManager, { ToolEntry } from '@dataManager';
import FileInput from '@atoms/FileInput';

type Props = {
	description?: string;
	fileExtension: string;
	name: string;
	searchedFileName: string;
	toolEntry: ToolEntry;
	toolKey: Constants.ToolKey;
};

export default function ToolComponent(props: Props) {
	const url = Constants.URLS[props.toolKey];
	let statusInformation = 'Not found';

	if (props.toolEntry) {
		switch (props.toolEntry.status) {
			case Constants.TOOL_STATUS.DOWNLOAD:
				statusInformation = 'Downloading';
				break;
			case Constants.TOOL_STATUS.EXTRACT:
				statusInformation = 'Extracting';
				break;
			case Constants.TOOL_STATUS.NOT_FOUND:
				statusInformation = 'Not found';
				break;
			case Constants.TOOL_STATUS.READY:
				statusInformation = 'Ready';
				break;
		}
	}

	return (
		<div className="bg-slate-900 px-4 py-4 rounded-md my-2">
			<div className="flex flex-row justify-between items-start">
				<div>
					<div className="font-semibold text-xl">{props.name}</div>
					<div className="my-2">{props.description}</div>
					<div className="mb-2">File needed : {props.searchedFileName}</div>
				</div>

				<Button
					onClick={() => {
						DataManager.download(props.toolKey, url);
					}}>
					Download
				</Button>
			</div>

			<FileInput
				accept={props.fileExtension}
				name={props.toolKey}
				onClick={(path) => {
					if (path) {
						DataManager.setToolLocation(props.toolKey, path);
					}
				}}>
				{props.toolEntry?.path || 'No file'}
			</FileInput>

			<div className="font-semibold mt-4">Download link used</div>
			<div className="text-sm">{url}</div>

			<div className="w-full mt-4 text-sm font-bold">
				{statusInformation} {props.toolEntry?.statusInformation}
			</div>
		</div>
	);
}
