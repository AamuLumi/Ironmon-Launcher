import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Page from '@atoms/Page';
import * as Constants from '@constants';
import DataManager, { ToolObject } from '@dataManager';

import ToolComponent from './ToolComponent';
import Button from '@atoms/Button';

type Props = {};

export default function ToolsLocations(props: Props) {
	const [tools, setTools] = useState(DataManager.getToolsData());

	const updateTools = useCallback((tools: ToolObject) => {
		setTools({ ...tools });
	}, []);

	useEffect(() => {
		DataManager.addListener(Constants.LISTENER_KEYS.TOOLS, updateTools);

		return () => {
			DataManager.removeListener(Constants.LISTENER_KEYS.TOOLS, updateTools);
		};
	}, []);

	return (
		<Page
			title="Downloading tools"
			additionalElement={
				<Button onClick={() => DataManager.downloadAll()}>Download all</Button>
			}>
			<div className="flex flex-col px-4">
				<ToolComponent
					toolKey={Constants.TOOLS.BIZHAWK}
					name="Bizhawk"
					description="Universal emulator used to run ROMs and trackers."
					toolEntry={tools[Constants.TOOLS.BIZHAWK]}
					fileExtension=".exe"
					searchedFileName="EmuHawk.exe"
				/>
				<ToolComponent
					toolKey={Constants.TOOLS.POKEMON_RANDOMIZER}
					name="Pokemon Randomizer DX"
					description="Software creating new Pokemon ROMs based on a set of rules."
					toolEntry={tools[Constants.TOOLS.POKEMON_RANDOMIZER]}
					fileExtension=".jar"
					searchedFileName="PokeRandoZX.jar"
				/>
				<ToolComponent
					toolKey={Constants.TOOLS.JAVA}
					name="Java SE"
					description="Pokemon Randomizer DX uses Java to be executed. We only setup a portable installation of Java, so Java will be not installed on the system."
					toolEntry={tools[Constants.TOOLS.JAVA]}
					fileExtension=".exe"
					searchedFileName="java.exe"
				/>
				<ToolComponent
					toolKey={Constants.TOOLS.TRACKER_3G}
					name="Ironmon Tracker (1G+ - 3G)"
					description="Tool tracking a lot of your run's data for you, running directly in Bizhawk."
					toolEntry={tools[Constants.TOOLS.TRACKER_3G]}
					fileExtension=".lua"
					searchedFileName="Ironmon-Tracker.lua"
				/>
				<ToolComponent
					toolKey={Constants.TOOLS.TRACKER_4G}
					name="Ironmon Tracker (2G+ - 3G+ - 4G - 5G)"
					description="Tool tracking a lot of your run's data for you, running directly in Bizhawk."
					toolEntry={tools[Constants.TOOLS.TRACKER_4G]}
					fileExtension=".lua"
					searchedFileName="Ironmon-Tracker.lua"
				/>
			</div>
		</Page>
	);
}
