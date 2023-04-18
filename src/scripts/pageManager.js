const PAGES = {
	DASHBOARD: 'dashboard',
	DOWNLOAD: 'download-screen',
	INITIAL_SETUP: 'initial-setup',
	ROMS_LOCATION: 'roms-location',
};

let currentLoadedPage = window.localStorage.getItem('currentLoadedPage');
let previousPage = window.localStorage.getItem('previousPage');
let setupFinished = window.localStorage.getItem('setup');
let currentLoadedComponent = null;
let previousComponent = null;

function _loadPage(component) {
	if (currentLoadedComponent) {
		currentLoadedComponent.classList.add('hidden');
		previousComponent = currentLoadedComponent;
		window.localStorage.setItem('previousPage', previousComponent.id);
	}

	currentLoadedComponent = component;
	window.localStorage.setItem('currentLoadedPage', component.id);

	if (currentLoadedComponent) {
		currentLoadedComponent.classList.remove('hidden');
	}
}

function loadPage(pageName) {
	_loadPage(document.querySelector(`#${pageName}`));
}

function goBack() {
	if (previousComponent) {
		_loadPage(previousComponent);
	}
}

window.electronAPI.onSetupLoaded((strData) => {
	const data = JSON.parse(strData);

	Object.keys(data.locations).forEach((key) => {
		_setInitialLocationValue(key, data.locations[key]);
	});

	Object.keys(data.roms).forEach((key) => {
		_setInitialRomValue(key, data.roms[key]);
	});
});

addEventListener('DOMContentLoaded', (event) => {
	if (currentLoadedPage) {
		loadPage(currentLoadedPage);
	} else if (!areAllNeededLocationsCompleted() || !isOneRomLoaded()) {
		loadPage(PAGES.INITIAL_SETUP);
	} else {
		loadPage(PAGES.DASHBOARD);
	}

	updateWizardComponentsStates();

	if (previousPage) {
		previousComponent = document.querySelector(`#${previousPage}`);
	}
});
