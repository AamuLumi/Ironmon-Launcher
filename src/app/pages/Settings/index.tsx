import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Page from '@atoms/Page';
import * as Constants from '@constants';
import DataManager, { RomsObject } from '@dataManager';
import Button from '@atoms/Button';

type Props = {};

export default function Settings(props: Props) {
	return (
		<Page title="Settings">
			<div className="flex flex-col px-4">
				<Button
					onClick={() => {
						DataManager.pushPage(Constants.PAGES.TOOLS_LOCATION);
					}}>
					Open tools configuration
				</Button>

				<Button
					className="mt-2"
					onClick={() => {
						DataManager.pushPage(Constants.PAGES.ROMS_LOCATION);
					}}>
					Open roms configuration
				</Button>
			</div>
		</Page>
	);
}
