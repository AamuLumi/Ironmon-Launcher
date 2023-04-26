import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '@atoms/Button';
import Chips from '@atoms/Chips';
import Page from '@atoms/Page';
import { BigTitle } from '@atoms/Title';
import * as Constants from '@constants';
import DataManager, { RomsObject, ToolObject } from '@dataManager';

import Step from './Step';

type Props = {};

export default function SetupWizard(props: Props) {
	const [toolsOk, setToolsOk] = useState(DataManager.areToolsSetup());
	const [romsOk, setRomsOk] = useState(DataManager.isOneRomSetup());

	const updateRomsStatus = useCallback((roms: RomsObject) => {
		setRomsOk(DataManager.isOneRomSetup());
	}, []);

	const updateToolsStatus = useCallback((tools: ToolObject) => {
		setToolsOk(DataManager.areToolsSetup());
	}, []);

	useEffect(() => {
		DataManager.addListener(Constants.LISTENER_KEYS.ROMS, updateRomsStatus);
		DataManager.addListener(Constants.LISTENER_KEYS.TOOLS, updateToolsStatus);

		return () => {
			DataManager.removeListener(Constants.LISTENER_KEYS.ROMS, updateRomsStatus);
			DataManager.removeListener(Constants.LISTENER_KEYS.TOOLS, updateToolsStatus);
		};
	}, []);

	return (
		<Page noHeader>
			<div className="h-full flex flex-col justify-between">
				<BigTitle>Initial setup</BigTitle>

				<Step
					buttonText="Locate or download tools"
					onButtonClick={() => {
						DataManager.pushPage(DataManager.Constants.PAGES.TOOLS_LOCATION);
					}}>
					Ironmon Launcher needs Pokemon Randomizer ZX to generate ROMs, Bizhawk to run
					ROMs and Ironmon Tracker to help you during runs.
					<div className="flex flex-row mt-2">
						{toolsOk ? (
							<Chips className="bg-green-700">Completed</Chips>
						) : (
							<Chips className="bg-red-700">Missing tools</Chips>
						)}
					</div>
				</Step>

				<Step
					buttonText="Locate ROMs"
					onButtonClick={() => {
						DataManager.pushPage(DataManager.Constants.PAGES.ROMS_LOCATION);
					}}>
					Ironmon Launcher needs original Pokemon ROMs to create randomized ROMs. We don't
					provide any ROMs with the Launcher.
					<div className="flex flex-row mt-2">
						{romsOk ? (
							<Chips className="bg-green-700">Completed</Chips>
						) : (
							<Chips className="bg-red-700">Need at least one rom</Chips>
						)}
					</div>
				</Step>

				<Step
					buttonText="Open settings"
					onButtonClick={() => {
						DataManager.pushPage(DataManager.Constants.PAGES.ROMS_LOCATION);
					}}>
					Totally optional step, but maybe you want to set some things to have a better
					experience.
				</Step>

				<div className="px-4 py-8 flex flex-row items-center justify-center">
					<Button
						size="xl"
						disabled={!romsOk || !toolsOk}
						onClick={() => {
							DataManager.setPage(DataManager.Constants.PAGES.DASHBOARD);
						}}>
						Here we go !
					</Button>
				</div>
			</div>
		</Page>
	);
}
