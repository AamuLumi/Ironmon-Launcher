import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Page from '@atoms/Page';
import * as Constants from '@constants';
import DataManager, { RomsObject } from '@dataManager';

import RomComponent from './RomComponent';

type Props = {};

export default function RomSettings(props: Props) {
	const [roms, setRoms] = useState(DataManager.getRomsData());

	const updateRoms = useCallback((roms: RomsObject) => {
		setRoms({ ...roms });
	}, []);

	useEffect(() => {
		DataManager.addListener(Constants.LISTENER_KEYS.ROMS, updateRoms);

		return () => {
			DataManager.removeListener(Constants.LISTENER_KEYS.ROMS, updateRoms);
		};
	}, []);

	return (
		<Page title="ROMs locations">
			<div className="flex flex-col px-4">
				<RomComponent
					romKey={Constants.ROMS.FRLG}
					name="[1G+] Fire Red / Leaf Green"
					romEntry={roms[Constants.ROMS.FRLG]}
					fileExtension=".gba"
				/>
				<RomComponent
					romKey={Constants.ROMS.HGSS}
					name="[2G+] Heart Gold / Soul Silver"
					romEntry={roms[Constants.ROMS.HGSS]}
					fileExtension=".nds"
				/>
				<RomComponent
					romKey={Constants.ROMS.RSE}
					name="[3G] Ruby / Sapphire / Emerald"
					romEntry={roms[Constants.ROMS.RSE]}
					fileExtension=".gba"
				/>
				<RomComponent
					romKey={Constants.ROMS.ORSA}
					name="[3G+] Omega Ruby / Alpha Sapphire"
					romEntry={roms[Constants.ROMS.ORSA]}
					fileExtension=".3ds"
				/>
				<RomComponent
					romKey={Constants.ROMS.DPP}
					name="[4G] Diamond / Pearl / Platinum"
					romEntry={roms[Constants.ROMS.DPP]}
					fileExtension=".nds"
				/>
				<RomComponent
					romKey={Constants.ROMS.BW}
					name="[5G] Black / White"
					romEntry={roms[Constants.ROMS.BW]}
					fileExtension=".nds"
				/>
				<RomComponent
					romKey={Constants.ROMS.B2W2}
					name="[5G] Black 2 / White 2"
					romEntry={roms[Constants.ROMS.B2W2]}
					fileExtension=".nds"
				/>
				<RomComponent
					romKey={Constants.ROMS.XY}
					name="[6G] X / Y"
					romEntry={roms[Constants.ROMS.XY]}
					fileExtension=".3ds"
				/>
			</div>
		</Page>
	);
}
