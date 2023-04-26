import React, { useCallback, useEffect, useState } from 'react';

import DataManager from '@dataManager';
import Dashboard from '@pages/Dashboard';
import SetupWizard from '@pages/SetupWizard';
import RomsSettings from '@pages/RomsSettings';
import Settings from '@pages/Settings';
import ToolsLocations from '@pages/ToolsLocations';

import './styles/main.css';

export function App() {
	const [currentPage, setCurrentPage] = useState('');
	const extractCurrentPage = useCallback((pages: Array<string>) => {
		setCurrentPage(pages[pages.length - 1]);
	}, []);

	useEffect(() => {
		DataManager.addListener('pages', extractCurrentPage);
		DataManager.startSetup();

		return () => {
			DataManager.removeListener('pages', extractCurrentPage);
		};
	}, []);

	switch (currentPage) {
		case DataManager.Constants.PAGES.DASHBOARD:
			return <Dashboard />;
		case DataManager.Constants.PAGES.INITIAL_SETUP:
			return <SetupWizard />;
		case DataManager.Constants.PAGES.ROMS_LOCATION:
			return <RomsSettings />;
		case DataManager.Constants.PAGES.TOOLS_LOCATION:
			return <ToolsLocations />;
		case DataManager.Constants.PAGES.SETTINGS:
			return <Settings />;
		default:
			return null;
	}
}
