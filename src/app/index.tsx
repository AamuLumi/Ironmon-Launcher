import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

declare global {
	interface Window {
		electronAPI: {
			onDownloadProgress(cb): void;
			onLocationChange(cb): void;
			onSetupLoaded(cb): void;

			download(key: string, url: string): void;
			loadSetup(): void;
			openExternalURL(url: string): void;
			openInAnotherWindowURL(url: string): void;
			setMemory(memory: any): void;
			setLocation(key: string, url: string): void;
			setRom(key: string, value: string): void;
		};
	}
}
