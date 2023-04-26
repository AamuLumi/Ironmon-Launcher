const { contextBridge, ipcRenderer } = require('electron');

const setupListeners = [];
const downloadListeners = [];
const locationListeners = [];

contextBridge.exposeInMainWorld('electronAPI', {
	onDownloadProgress: (cb) => {
		downloadListeners.push(cb);
	},
	onLocationChange: (cb) => {
		locationListeners.push(cb);
	},
	onSetupLoaded: (cb) => {
		setupListeners.push(cb);
	},

	download: (key, url) => ipcRenderer.send('download', key, url),
	loadSetup: () => ipcRenderer.send('started'),
	openExternalURL: (url) => ipcRenderer.send('open-external-url', url),
	openInAnotherWindowURL: (url) => ipcRenderer.send('open-another-window-url', url),
	setMemory: (memory) => ipcRenderer.send('set-memory', memory),
	setLocation: (key, value) => ipcRenderer.send('set-location', key, value),
	setRom: (key, value) => ipcRenderer.send('set-rom', key, value),
});

window.addEventListener('DOMContentLoaded', () => {
	ipcRenderer.on('setup-configuration', (event, strData) => {
		setupListeners.forEach((f) => f(strData));
	});

	ipcRenderer.on('download-progress', (event, key, axiosStrProgressData) => {
		const data = JSON.parse(axiosStrProgressData);

		downloadListeners.forEach((f) => f('download-progress', key, data));
	});
	ipcRenderer.on('tool-ready', (event, key) => {
		downloadListeners.forEach((f) => f('tool-ready', key));
	});
	ipcRenderer.on('extracting', (event, key) => {
		downloadListeners.forEach((f) => f('extracting', key));
	});
	ipcRenderer.on('location-change', (event, key, value) => {
		locationListeners.forEach((f) => f(key, value));
	});
});
