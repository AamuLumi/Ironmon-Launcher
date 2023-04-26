import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Button, { BigButton, ROMButton } from '@atoms/Button';
import Page from '@atoms/Page';
import * as Constants from '@constants';
import DataManager, { RomsObject } from '@dataManager';
import RulesIcon from '@atoms/SVG/RulesIcon';
import HiddenItemsIcon from '@atoms/SVG/HiddenItemsIcon';
import MapIcon from '@atoms/SVG/MapIcon';
import SettingsIcon from '@atoms/SVG/SettingsIcon';
import GithubIcon from '@atoms/SVG/GithubIcon';
import DiscordIcon from '@atoms/SVG/DiscordIcon';
import WalkthroughIcon from '@atoms/SVG/WalkthroughIcon';
import TrainerIcon from '@atoms/SVG/TrainerIcon';

const ROMS_ENTRY = [
	{
		key: Constants.ROMS.FRLG,
		imagePath: new URL('../../assets/mew.png', import.meta.url),
		text: '1G+',
	},
	{
		key: Constants.ROMS.HGSS,
		imagePath: new URL('../../assets/celebi.png', import.meta.url),
		text: '2G+',
	},
	{
		key: Constants.ROMS.RSE,
		imagePath: new URL('../../assets/jirachi.png', import.meta.url),
		text: '3G',
	},
	{
		key: Constants.ROMS.ORSA,
		imagePath: new URL('../../assets/jirachi.png', import.meta.url),
		text: '3G+',
	},
	{
		key: Constants.ROMS.DPP,
		imagePath: new URL('../../assets/manaphy.png', import.meta.url),
		text: '4G',
	},
	{
		key: Constants.ROMS.BW,
		imagePath: new URL('../../assets/paldeo.png', import.meta.url),
		text: '5G',
	},
	{
		key: Constants.ROMS.B2W2,
		imagePath: new URL('../../assets/meloetta.png', import.meta.url),
		text: '5G 2',
	},
	{
		key: Constants.ROMS.XY,
		imagePath: new URL('../../assets/diancie.png', import.meta.url),
		text: '6G',
	},
];

type Props = {};

export default function Dashboard(props: Props) {
	const [roms, setRoms] = useState(DataManager.getRomsData());
	const [specificURLs, setSpecificURLs] = useState({});

	const updateRoms = useCallback((roms: RomsObject) => {
		setRoms({ ...roms });

		const selectedRomKey = Object.keys(roms).find((key) => roms[key].selected);

		if (selectedRomKey) {
			setSpecificURLs(Constants.URLS[selectedRomKey]);
		}
	}, []);

	const selectRom = useCallback((key: Constants.RomKey) => {
		DataManager.setSelectedRom(key);
	}, []);

	useEffect(() => {
		const selectedRomKey = Object.keys(roms).find((key) => roms[key].selected);

		if (selectedRomKey) {
			setSpecificURLs(Constants.URLS[selectedRomKey]);
		}

		DataManager.addListener(Constants.LISTENER_KEYS.ROMS, updateRoms);

		return () => {
			DataManager.removeListener(Constants.LISTENER_KEYS.ROMS, updateRoms);
		};
	}, []);

	return (
		<Page
			title="Let's start a new run !"
			additionalElement={
				<div className="flex flex-row items-center overflow-x-auto">
					{ROMS_ENTRY.map((romEntry) => {
						return (
							!!roms[romEntry.key] && (
								<ROMButton
									key={romEntry.key}
									onClick={selectRom}
									value={romEntry.key}
									selected={roms[romEntry.key]?.selected}
									img={romEntry.imagePath}>
									{romEntry.text}
								</ROMButton>
							)
						);
					})}
				</div>
			}>
			<div className="flex flex-col justify-between items-center h-full">
				<div className="flex flex-col items-center">
					<div className="grid grid-cols-4 justify-items-start gap-2">
						<BigButton
							onClick={() => {
								window.electronAPI.openInAnotherWindowURL(
									Constants.URLS.IRONMON_RULES,
								);
							}}>
							<RulesIcon />

							<div className="mt-4">Rules</div>
						</BigButton>
						{specificURLs?.HIDDEN_ITEMS && (
							<BigButton
								onClick={() => {
									window.electronAPI.openInAnotherWindowURL(
										specificURLs.HIDDEN_ITEMS,
									);
								}}>
								<HiddenItemsIcon />

								<div className="mt-4">Hidden items</div>
							</BigButton>
						)}
						{specificURLs?.WALKTHROUGH && (
							<BigButton
								onClick={() => {
									window.electronAPI.openInAnotherWindowURL(
										specificURLs.WALKTHROUGH,
									);
								}}>
								<WalkthroughIcon />

								<div className="mt-4">Walkthrough</div>
							</BigButton>
						)}
						{specificURLs?.MAP && (
							<BigButton
								onClick={() => {
									window.electronAPI.openInAnotherWindowURL(specificURLs.MAP);
								}}>
								<MapIcon />

								<div className="mt-4">Map</div>
							</BigButton>
						)}
						{specificURLs?.TRAINER_GUIDE && (
							<BigButton
								onClick={() => {
									window.electronAPI.openInAnotherWindowURL(
										specificURLs.TRAINER_GUIDE,
									);
								}}>
								<TrainerIcon />

								<div className="mt-4">Trainer guide</div>
							</BigButton>
						)}
						<BigButton
							onClick={() => {
								DataManager.pushPage(Constants.PAGES.SETTINGS);
							}}>
							<SettingsIcon />

							<div className="mt-4">Settings</div>
						</BigButton>
					</div>

					<div className="flex justify-center mt-8">
						<Button onClick={() => {}} size="xl">
							Start a run !
						</Button>
					</div>
				</div>

				<div className="flex flex-row h-12 mb-4">
					<Button
						onClick={() => {
							window.electronAPI.openExternalURL(
								Constants.URLS.LAUNCHER_GITHUB_REPOSITORY,
							);
						}}
						className="mx-2 bg-black border-black hover:text-slate-300 hover:bg-slate-800">
						<div className="flex flex-row items-center">
							<GithubIcon className="h-8 w-8 mr-2" />
							Source code
						</div>
					</Button>

					<Button
						onClick={() => {
							window.electronAPI.openExternalURL(Constants.URLS.IRONMON_DISCORD);
						}}
						className="mx-2 bg-discord border-discord hover:text-slate-300 hover:bg-slate-800">
						<div className="flex flex-row items-center">
							<DiscordIcon className="h-8 w-8 mr-2" />
							Ironmon Discord
						</div>
					</Button>
				</div>
			</div>
		</Page>
	);
}
