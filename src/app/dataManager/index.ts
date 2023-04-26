import * as Constants from './Constants';

type Listener = (value: any) => void;

export type ToolEntry = {
	downloadLink?: string;
	path: string;
	status: Constants.ToolStatusKey;
	statusInformation?: string;
};

export type ToolObject = { [K: Constants.ToolKey]: ToolEntry };

export type RomEntry = {
	path: string;
	selected: boolean;
};

export type RomsObject = { [K: Constants.RomKey]: RomEntry };

let listeners = {
	pages: [] as Array<Listener>,
	roms: [] as Array<Listener>,
	tools: [] as Array<Listener>,
};
let memory = {
	pages: [Constants.PAGES.INITIAL_SETUP] as Array<Constants.PageKey>,
	roms: {} as RomsObject,
	tools: {} as ToolObject,
};

function triggerListeners(listenerKey: Constants.ListenerKey, value: any) {
	listeners[listenerKey].forEach((f) => f(value));
}

function addListener(key: Constants.ListenerKey, cb: Listener) {
	listeners[key].push(cb);
}

function removeListener(key: Constants.ListenerKey, cb: Listener) {
	const index = listeners[key].indexOf(cb);

	if (index !== -1) {
		listeners[key].splice(index, 1);
	}
}

function popPage() {
	memory.pages.pop();

	triggerListeners(Constants.LISTENER_KEYS.PAGES, memory.pages);
	window.electronAPI.setMemory(memory);
}

function pushPage(pageName: Constants.PageKey) {
	memory.pages.push(pageName);

	triggerListeners(Constants.LISTENER_KEYS.PAGES, memory.pages);
	window.electronAPI.setMemory(memory);
}

function setPage(pageName: Constants.PageKey) {
	memory.pages = [pageName];

	triggerListeners(Constants.LISTENER_KEYS.PAGES, memory.pages);
	window.electronAPI.setMemory(memory);
}

function canGoBack() {
	return memory.pages.length > 1;
}

function getCurrentPage() {
	return memory.pages[0];
}

function setRomLocation(key: Constants.RomKey, value: string) {
	if (!memory.roms[key]) {
		memory.roms[key] = { path: value, selected: false };
	} else {
		memory.roms[key].path = value;
	}

	if (Object.keys(memory.roms).every((k) => !memory.roms[k].selected)) {
		memory.roms[key].selected = true;
	}

	triggerListeners(Constants.LISTENER_KEYS.ROMS, memory.roms);
	window.electronAPI.setMemory(memory);
}

function getRomsData() {
	return memory.roms;
}

function isOneRomSetup() {
	const romKeys = Object.keys(memory.roms);

	if (romKeys.length === 0) {
		return false;
	}

	return romKeys.some((key) => {
		const romEntry = memory.roms[key];

		return romEntry.path;
	});
}

function setSelectedRom(key: Constants.RomKey) {
	Object.keys(memory.roms).forEach((romKey) => {
		memory.roms[romKey].selected = false;
	});

	memory.roms[key].selected = true;

	console.log('select', key);

	triggerListeners(Constants.LISTENER_KEYS.ROMS, memory.roms);
}

function setToolLocation(key: Constants.ToolKey, value: string) {
	if (!memory.tools[key]) {
		memory.tools[key] = { path: value, status: Constants.TOOL_STATUS.READY };
	} else {
		memory.tools[key].path = value;
		memory.tools[key].status = Constants.TOOL_STATUS.READY;
	}

	triggerListeners(Constants.LISTENER_KEYS.TOOLS, memory.tools);
	window.electronAPI.setMemory(memory);
}

function getToolsData() {
	return memory.tools;
}

function areToolsSetup() {
	const toolKeys = Object.keys(memory.tools);

	if (toolKeys.length < Object.keys(Constants.TOOLS).length) {
		return false;
	}

	return toolKeys.every((key) => {
		const toolEntry = memory.tools[key];

		return toolEntry.path && toolEntry.status === Constants.TOOL_STATUS.READY;
	});
}

function download(key, url) {
	window.electronAPI.download(key, url);
}

function downloadAll() {
	Object.keys(Constants.TOOLS).forEach((key) => {
		download(Constants.TOOLS[key], Constants.URLS[Constants.TOOLS[key]]);
	});
}

function updateDownloadDetails(eventType, key, axiosProgressEvent) {
	if (!memory.tools[key]) {
		memory.tools[key] = {
			path: '',
			status: Constants.TOOL_STATUS.NOT_FOUND,
		};
	}

	switch (eventType) {
		case 'download-progress':
			if (memory.tools[key].status !== Constants.TOOL_STATUS.DOWNLOAD) {
				memory.tools[key].status = Constants.TOOL_STATUS.DOWNLOAD;
			}

			memory.tools[
				key
			].statusInformation = `(${axiosProgressEvent.loaded} / ${axiosProgressEvent.total})`;
			break;
		case 'extracting':
			memory.tools[key].status = Constants.TOOL_STATUS.EXTRACT;
			memory.tools[key].statusInformation = null;

			break;
		case 'tool-ready':
			memory.tools[key].status = Constants.TOOL_STATUS.READY;
			memory.tools[key].statusInformation = null;
			memory.tools[key].downloadLink = Constants.URLS[key];

			window.electronAPI.setMemory(memory);

			break;
	}

	triggerListeners(Constants.LISTENER_KEYS.TOOLS, memory.tools);
}

function startSetup() {
	window.electronAPI.onSetupLoaded((data) => {
		try {
			memory = data;
		} catch (e) {
			memory = {
				pages: [Constants.PAGES.INITIAL_SETUP] as Array<Constants.PageKey>,
				roms: {} as RomsObject,
				tools: {} as ToolObject,
			};
		}

		triggerListeners(Constants.LISTENER_KEYS.PAGES, memory.pages);
		triggerListeners(Constants.LISTENER_KEYS.ROMS, memory.roms);
		triggerListeners(Constants.LISTENER_KEYS.TOOLS, memory.tools);
	});
	window.electronAPI.onDownloadProgress(updateDownloadDetails);
	window.electronAPI.onLocationChange(setToolLocation);
	window.electronAPI.loadSetup();
}

export default {
	Constants,

	startSetup,

	addListener,
	removeListener,

	canGoBack,
	getCurrentPage,
	popPage,
	pushPage,
	setPage,

	isOneRomSetup,
	getRomsData,
	setRomLocation,
	setSelectedRom,

	areToolsSetup,
	getToolsData,
	setToolLocation,

	download,
	downloadAll,
	updateDownloadDetails,
};
